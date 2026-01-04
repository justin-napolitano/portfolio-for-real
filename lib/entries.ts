// lib/entries.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Portfolio entries primarily behave like "note" entries today, but we keep the
// historical kinds to avoid downstream type errors while we still render legacy
// tabs (projects/logs/links) in the UI.
export type EntryKind = "note" | "project" | "log" | "link";
export type EntryStatus = "draft" | "published";

export interface EntryMeta {
  id: string; // slug, matches folder name (folder name under content/entries)
  title: string;
  date: string; // ISO date string (yyyy-mm-dd)
  kind: EntryKind;
  tags: string[];
  skills: string[];
  tools: string[];
  domains: string[];
  dataSources: string[];
  topic_family?: string | null;
  status: EntryStatus;
  publishAt?: string | null;
  summary?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  repo?: string | null;
  submodulePath?: string | null;
  readmePath?: string | null;
  href: string; // URL for this entry, based on slug
}

export interface Entry extends EntryMeta {
  body: string; // MD/MDX body, without frontmatter
}

type EntryFrontmatter = {
  [key: string]: unknown;
  title?: string;
  date?: string;
  kind?: string;
  tags?: unknown;
  skills?: unknown;
  tools?: unknown;
  domains?: unknown;
  dataSources?: unknown;
  status?: string;
  publishAt?: string;
  publish_at?: string;
  summary?: string;
  githubUrl?: string;
  github_url?: string;
  liveUrl?: string;
  live_url?: string;
  repo?: string;
  submodulePath?: string;
  readmePath?: string;
  topic_family?: string;
  topicFamily?: string;
};

const ENTRIES_ROOT = path.join(process.cwd(), "content", "entries");
const TOPIC_FAMILIES_PATH = path.join(
  process.cwd(),
  "data",
  "topic-families.json",
);

// ---- topic-family config (from JSON) ------------------------

type TopicFamilyConfig = {
  id: string;
  label?: string;
  description?: string;
  color?: string;
  example_slugs?: string[];
};

let topicFamiliesCache: TopicFamilyConfig[] | null = null;

function loadTopicFamilies(): TopicFamilyConfig[] {
  if (topicFamiliesCache) return topicFamiliesCache;

  try {
    if (!fs.existsSync(TOPIC_FAMILIES_PATH)) {
      topicFamiliesCache = [];
      return topicFamiliesCache;
    }

    const raw = fs.readFileSync(TOPIC_FAMILIES_PATH, "utf8");
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      topicFamiliesCache = parsed as TopicFamilyConfig[];
    } else if (
      typeof parsed === "object" &&
      parsed !== null &&
      Array.isArray((parsed as { families?: unknown }).families)
    ) {
      const familiesValue = (parsed as { families?: TopicFamilyConfig[] }).families;
      topicFamiliesCache = familiesValue ?? [];
    } else {
      topicFamiliesCache = [];
    }
  } catch {
    topicFamiliesCache = [];
  }

  return topicFamiliesCache;
}

function inferTopicFamilyForSlug(slug: string): string | null {
  const families = loadTopicFamilies();
  for (const fam of families) {
    const slugs: string[] = Array.isArray(fam.example_slugs)
      ? fam.example_slugs
      : [];
    if (slugs.includes(slug) && typeof fam.id === "string") {
      return fam.id;
    }
  }
  return null;
}

// ---- filesystem helpers -------------------------------------

function isDir(p: string): boolean {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

export function getAllEntryDirs(): string[] {
  if (!fs.existsSync(ENTRIES_ROOT)) return [];

  return fs
    .readdirSync(ENTRIES_ROOT)
    .map((name) => path.join(ENTRIES_ROOT, name))
    .filter(isDir);
}

/**
 * Resolve the actual entry file within a directory.
 * Prefer index.mdx, then index.md. Returns null if neither exists.
 */
function resolveEntryFile(dirPath: string): string | null {
  const mdxPath = path.join(dirPath, "index.mdx");
  const mdPath = path.join(dirPath, "index.md");

  if (fs.existsSync(mdxPath)) return mdxPath;
  if (fs.existsSync(mdPath)) return mdPath;

  return null;
}

// ---- meta construction --------------------------------------

function normalizeKind(raw?: unknown): EntryKind {
  if (typeof raw === "string") {
    const value = raw.toLowerCase();
    if (value === "project" || value === "log" || value === "link") {
      return value;
    }
  }
  return "note";
}

function normalizeTags(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    return [raw.trim()].filter(Boolean);
  }
  return [String(raw).trim()].filter(Boolean);
}

function normalizeStringArray(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((value) => (value == null ? "" : String(value).trim()))
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }
  return [String(raw).trim()].filter(Boolean);
}

function normalizeDateString(dateLike: unknown): string | null {
  if (!dateLike) return null;
  const s = String(dateLike);
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  // yyyy-mm-dd
  return d.toISOString().slice(0, 10);
}

function buildMetaFromData(slug: string, data: EntryFrontmatter): EntryMeta {
  const kind: EntryKind = normalizeKind(data.kind);
  const tags: string[] = normalizeTags(data.tags);
  const skills = normalizeStringArray(data.skills);
  const tools = normalizeStringArray(data.tools);
  const domains = normalizeStringArray(data.domains);
  const dataSources = normalizeStringArray(data.dataSources);

  const status: EntryStatus =
    data.status === "draft" ? "draft" : "published";

  // Topic families
  const families = loadTopicFamilies();
  const validFamilyIds = new Set(families.map((f) => f.id));

  // Accept either topic_family or topicFamily from frontmatter
  let explicitTopicFamily: string | null = null;
  if (
    typeof data.topic_family === "string" &&
    validFamilyIds.has(data.topic_family)
  ) {
    explicitTopicFamily = data.topic_family;
  } else if (
    typeof data.topicFamily === "string" &&
    validFamilyIds.has(data.topicFamily)
  ) {
    explicitTopicFamily = data.topicFamily;
  }

  const inferredTopicFamily = inferTopicFamilyForSlug(slug);
  const topic_family: string | null =
    explicitTopicFamily ?? inferredTopicFamily ?? null;

  const publishAt: string | null =
    typeof data.publishAt === "string" ? data.publishAt : null;

  const summary: string | null =
    typeof data.summary === "string" ? data.summary : null;

  const githubUrl: string | null =
    typeof data.githubUrl === "string" ? data.githubUrl : null;

  const liveUrl: string | null =
    typeof data.liveUrl === "string" ? data.liveUrl : null;

  const repo: string | null =
    typeof data.repo === "string" ? data.repo : null;

  const submodulePath: string | null =
    typeof data.submodulePath === "string" ? data.submodulePath : null;

  const readmePath: string | null =
    typeof data.readmePath === "string" ? data.readmePath : null;

  // date: prefer explicit date, then publishAt, else today
  let date: string;
  const fromData = normalizeDateString(data.date);
  const fromPublish = publishAt ? normalizeDateString(publishAt) : null;
  if (fromData) {
    date = fromData;
  } else if (fromPublish) {
    date = fromPublish;
  } else {
    date = new Date().toISOString().slice(0, 10);
  }

  const title: string =
    typeof data.title === "string" && data.title.trim().length
      ? data.title
      : slug.replace(/-/g, " ");

  const href = `/projects/${slug}`;

  return {
    id: slug,
    title,
    date,
    kind,
    tags,
    skills,
    tools,
    domains,
    dataSources,
    topic_family,
    status,
    publishAt,
    summary,
    githubUrl,
    liveUrl,
    repo,
    submodulePath,
    readmePath,
    href,
  };
}

// ---- public API ---------------------------------------------

export function readEntryMetaFromDir(dirPath: string): EntryMeta | null {
  const filePath = resolveEntryFile(dirPath);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const slug = path.basename(dirPath);

  return buildMetaFromData(slug, data);
}

export function getAllEntriesRaw(): EntryMeta[] {
  const dirs = getAllEntryDirs();
  const entries: EntryMeta[] = [];

  for (const dir of dirs) {
    const meta = readEntryMetaFromDir(dir);
    if (meta) entries.push(meta);
  }

  return entries;
}

function isEntryVisible(meta: EntryMeta, now = new Date()): boolean {
  if (meta.status === "draft") return false;

  if (meta.publishAt) {
    const publishDate = new Date(meta.publishAt);
    if (publishDate.getTime() > now.getTime()) {
      return false;
    }
  }

  return true;
}

export function getPublishedEntries(): EntryMeta[] {
  const now = new Date();
  return getAllEntriesRaw()
    .filter((e) => isEntryVisible(e, now))
    .sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da; // newest first
    });
}

export function getTopTags(entries: EntryMeta[], limit = 8): string[] {
  const counts: Record<string, number> = {};
  for (const e of entries) {
    for (const tag of e.tags) {
      const key = tag.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, limit).map(([tag]) => tag);
}

export function getEntryBySlug(slug: string): Entry | null {
  const dirPath = path.join(ENTRIES_ROOT, slug);
  const filePath = resolveEntryFile(dirPath);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta = buildMetaFromData(slug, data);

  return {
    ...meta,
    body: content,
  };
}
