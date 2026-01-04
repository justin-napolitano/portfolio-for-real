import process from "node:process";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";

// Ensure local Next-style env files (.env.local, etc.) are loaded when running via tsx.
loadEnvConfig(process.cwd());

import { initDb, type PostKind } from "../lib/db";
import {
  getAllEntriesRaw,
  getEntryBySlug,
  type Entry,
  type EntryMeta,
} from "../lib/entries";

interface CliOptions {
  dryRun: boolean;
  includeDrafts: boolean;
  limit: number;
  only: Set<string>;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  let dryRun = false;
  let includeDrafts = false;
  let limit = 0;
  const only = new Set<string>();

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--include-drafts") {
      includeDrafts = true;
    } else if (arg === "--limit" || arg === "--max" || arg === "--take") {
      const next = args[i + 1];
      if (!next) {
        throw new Error(`${arg} requires a numeric value`);
      }
      limit = parseInt(next, 10);
      if (Number.isNaN(limit) || limit < 0) {
        throw new Error(`${arg} must be a non-negative integer`);
      }
      i += 1;
    } else if (arg === "--only") {
      while (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        only.add(args[i + 1]);
        i += 1;
      }
    }
  }

  return { dryRun, includeDrafts, limit, only };
}

function toIsoString(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
}

function serializeArray(values: string[] | undefined): string {
  return JSON.stringify(values ?? []);
}

type PickResult = {
  entries: EntryMeta[];
  skippedDrafts: number;
};

function pickEntries(all: EntryMeta[], opts: CliOptions): PickResult {
  const filtered: EntryMeta[] = [];
  let skippedDrafts = 0;
  for (const meta of all) {
    if (!opts.includeDrafts && meta.status === "draft") {
      skippedDrafts += 1;
      continue;
    }
    if (opts.only.size > 0 && !opts.only.has(meta.id)) {
      continue;
    }
    filtered.push(meta);
  }

  const entries = opts.limit > 0 ? filtered.slice(0, opts.limit) : filtered;
  return { entries, skippedDrafts };
}

function detectKind(entry: Entry): PostKind {
  switch (entry.kind) {
    case "project":
    case "log":
    case "note":
    case "link":
      return entry.kind;
    default:
      return "project";
  }
}

async function entryExists(slug: string): Promise<boolean> {
  const { rows } = await sql<{ id: number }>`
    SELECT id FROM posts
    WHERE entry_slug = ${slug}
    LIMIT 1
  `;
  return rows.length > 0;
}

async function upsertEntry(entry: Entry, dryRun: boolean) {
  const exists = await entryExists(entry.id);

  if (dryRun) {
    console.log(
      `[dry-run] ${exists ? "update" : "insert"} ${entry.id} (${entry.title})`,
    );
    return exists ? "updated" : "inserted";
  }

  const publishAtIso = toIsoString(entry.publishAt) ?? toIsoString(entry.date);
  const createdAtIso = toIsoString(entry.date) ?? new Date().toISOString();
  const tagsJson = serializeArray(entry.tags);
  const skillsJson = serializeArray(entry.skills);
  const toolsJson = serializeArray(entry.tools);
  const domainsJson = serializeArray(entry.domains);
  const dataSourcesJson = serializeArray(entry.dataSources);

  await sql`
    INSERT INTO posts (
      created_at,
      kind,
      body,
      image_data,
      source,
      external_id,
      external_url,
      source_deleted,
      link_url,
      mastodon_url,
      bluesky_uri,
      title,
      summary,
      topic_family,
      tags,
      skills,
      tools,
      domains,
      data_sources,
      repo,
      github_url,
      live_url,
      status,
      publish_at,
      entry_slug
    ) VALUES (
      ${createdAtIso},
      ${detectKind(entry)},
      ${entry.body},
      NULL,
      'portfolio',
      ${entry.id},
      ${entry.liveUrl ?? null},
      FALSE,
      ${entry.liveUrl ?? null},
      NULL,
      NULL,
      ${entry.title},
      ${entry.summary ?? null},
      ${entry.topic_family ?? null},
      ${tagsJson}::jsonb,
      ${skillsJson}::jsonb,
      ${toolsJson}::jsonb,
      ${domainsJson}::jsonb,
      ${dataSourcesJson}::jsonb,
      ${entry.repo ?? null},
      ${entry.githubUrl ?? null},
      ${entry.liveUrl ?? null},
      ${entry.status},
      ${publishAtIso},
      ${entry.id}
    )
    ON CONFLICT (entry_slug) DO UPDATE SET
      created_at = EXCLUDED.created_at,
      kind = EXCLUDED.kind,
      body = EXCLUDED.body,
      image_data = EXCLUDED.image_data,
      source = EXCLUDED.source,
      external_id = EXCLUDED.external_id,
      external_url = EXCLUDED.external_url,
      source_deleted = EXCLUDED.source_deleted,
      link_url = EXCLUDED.link_url,
      mastodon_url = EXCLUDED.mastodon_url,
      bluesky_uri = EXCLUDED.bluesky_uri,
      title = EXCLUDED.title,
      summary = EXCLUDED.summary,
      topic_family = EXCLUDED.topic_family,
      tags = EXCLUDED.tags,
      skills = EXCLUDED.skills,
      tools = EXCLUDED.tools,
      domains = EXCLUDED.domains,
      data_sources = EXCLUDED.data_sources,
      repo = EXCLUDED.repo,
      github_url = EXCLUDED.github_url,
      live_url = EXCLUDED.live_url,
      status = EXCLUDED.status,
      publish_at = EXCLUDED.publish_at
  `;

  return exists ? "updated" : "inserted";
}

async function main() {
  const opts = parseArgs();
  await initDb();

  const rawMetas = getAllEntriesRaw();
  const { entries: metas, skippedDrafts } = pickEntries(rawMetas, opts);

  if (metas.length === 0) {
    console.log("[migrate-entries] No entries matched filters; exiting.");
    return;
  }

  let inserted = 0;
  let updated = 0;
  let missingBody = 0;

  for (const meta of metas) {
    const entry = getEntryBySlug(meta.id);
    if (!entry) {
      console.warn(`[migrate-entries] skipping ${meta.id}: unable to read body`);
      missingBody += 1;
      continue;
    }

    const result = await upsertEntry(entry, opts.dryRun);
    if (result === "inserted") {
      inserted += 1;
    } else {
      updated += 1;
    }
  }

  console.log(
    `[migrate-entries] ${opts.dryRun ? "simulated" : "processed"} ${metas.length} entries (${inserted} inserted, ${updated} updated, ${missingBody} missing body, ${skippedDrafts} drafts skipped).`,
  );
}

main().catch((err) => {
  console.error("[migrate-entries] fatal error", err);
  process.exit(1);
});
