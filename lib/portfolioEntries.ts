import { sql } from "@vercel/postgres";
import { initDb, type PostKind } from "./db";

export type EntryKind = Extract<PostKind, "project" | "note" | "log" | "link">;
export type EntryStatus = "draft" | "published";

export interface EntryMeta {
  id: string;
  title: string;
  date: string;
  kind: EntryKind;
  tags: string[];
  skills: string[];
  tools: string[];
  domains: string[];
  dataSources: string[];
  topic_family: string | null;
  status: EntryStatus;
  publishAt: string | null;
  summary: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  repo: string | null;
  submodulePath: string | null;
  readmePath: string | null;
  href: string;
}

export interface Entry extends EntryMeta {
  body: string;
}

type DbEntryRow = {
  id: number;
  entry_slug: string | null;
  title: string | null;
  kind: string | null;
  summary: string | null;
  topic_family: string | null;
  tags: unknown;
  skills: unknown;
  tools: unknown;
  domains: unknown;
  data_sources: unknown;
  repo: string | null;
  github_url: string | null;
  live_url: string | null;
  status: string | null;
  publish_at: string | null;
  created_at: string;
  body?: string | null;
};

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry)).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed.length) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((entry) => String(entry)).filter(Boolean);
      }
    } catch {
      return trimmed
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function normalizeDate(value: string | Date | null | undefined): string {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function normalizeIso(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
}

function normalizeKind(value: string | null | undefined): EntryKind {
  switch ((value ?? "project").toLowerCase()) {
    case "project":
      return "project";
    case "note":
      return "note";
    case "log":
      return "log";
    case "link":
      return "link";
    default:
      return "project";
  }
}

function normalizeStatus(value: string | null | undefined): EntryStatus {
  return value === "draft" ? "draft" : "published";
}

function rowToMeta(row: DbEntryRow): EntryMeta {
  const slug = row.entry_slug ?? `portfolio-${row.id}`;
  const publishIso = normalizeIso(row.publish_at);
  const dateSource = publishIso ?? row.publish_at ?? row.created_at;

  return {
    id: slug,
    title: row.title ?? slug,
    date: normalizeDate(dateSource),
    kind: normalizeKind(row.kind),
    tags: normalizeArray(row.tags),
    skills: normalizeArray(row.skills),
    tools: normalizeArray(row.tools),
    domains: normalizeArray(row.domains),
    dataSources: normalizeArray(row.data_sources),
    topic_family: row.topic_family ?? null,
    status: normalizeStatus(row.status),
    publishAt: publishIso,
    summary: row.summary ?? null,
    githubUrl: row.github_url ?? null,
    liveUrl: row.live_url ?? null,
    repo: row.repo ?? null,
    submodulePath: null,
    readmePath: null,
    href: `/projects/${slug}`,
  };
}

function rowToEntry(row: DbEntryRow): Entry {
  const meta = rowToMeta(row);
  return {
    ...meta,
    body: row.body ?? "",
  };
}

function isPublished(row: DbEntryRow): boolean {
  if (normalizeStatus(row.status) === "draft") {
    return false;
  }

  if (row.publish_at) {
    const date = new Date(row.publish_at);
    if (!Number.isNaN(date.getTime()) && date.getTime() > Date.now()) {
      return false;
    }
  }

  return true;
}

export async function fetchPublishedEntryMetas(): Promise<EntryMeta[]> {
  try {
    await initDb();
    const { rows } = await sql<DbEntryRow>`
      SELECT
        id,
        entry_slug,
        title,
        kind,
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
        created_at
      FROM posts
      WHERE entry_slug IS NOT NULL AND source = 'portfolio'
      ORDER BY COALESCE(publish_at, created_at) DESC
    `;

    const published = rows.filter(isPublished).map(rowToMeta);
    if (published.length) {
      return published;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to fetch entry metadata", error);
    }
  }

  return [];
}

export async function fetchEntryBySlug(slug: string): Promise<Entry | null> {
  if (!slug) {
    return null;
  }

  try {
    await initDb();
    const { rows } = await sql<DbEntryRow>`
      SELECT
        id,
        entry_slug,
        title,
        kind,
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
        created_at,
        body
      FROM posts
      WHERE entry_slug = ${slug} AND source = 'portfolio'
      LIMIT 1
    `;

    if (!rows.length) {
      return null;
    }

    const row = rows[0];
    if (!isPublished(row)) {
      return null;
    }

    return rowToEntry(row);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Failed to fetch entry ${slug}`, error);
    }
  }

  return null;
}
