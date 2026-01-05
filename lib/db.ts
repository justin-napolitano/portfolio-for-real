// src/lib/db.ts
import { sql } from "@vercel/postgres";

export type PostKind =
  | "text"
  | "photo"
  | "link"
  | "project"
  | "note"
  | "log";

export type Post = {
  id: number;
  created_at: string;
  kind: PostKind;
  body: string;
  image_data: string | null;

  // External / source metadata
  source: "local" | "mastodon" | string;
  external_id: string | null;
  external_url: string | null;
  source_deleted: boolean;

  // For link-style posts
  link_url: string | null;

  // Cross-post tracking
  mastodon_url: string | null;
  bluesky_uri: string | null;

  // Portfolio / entry metadata
  title: string | null;
  summary: string | null;
  topic_family: string | null;
  tags: string[];
  skills: string[];
  tools: string[];
  domains: string[];
  data_sources: string[];
  repo: string | null;
  github_url: string | null;
  live_url: string | null;
  status: string;
  publish_at: string | null;
  entry_slug: string | null;
};

export async function initDb() {
  // Idempotent: safe to call multiple times
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      kind TEXT NOT NULL CHECK (kind IN ('text', 'photo', 'link', 'project', 'note', 'log')),
      body TEXT NOT NULL,
      image_data TEXT,
      source TEXT NOT NULL DEFAULT 'local',
      external_id TEXT,
      external_url TEXT,
      source_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      link_url TEXT,
      mastodon_url TEXT,
      bluesky_uri TEXT,
      title TEXT,
      summary TEXT,
      topic_family TEXT,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      skills JSONB NOT NULL DEFAULT '[]'::jsonb,
      tools JSONB NOT NULL DEFAULT '[]'::jsonb,
      domains JSONB NOT NULL DEFAULT '[]'::jsonb,
      data_sources JSONB NOT NULL DEFAULT '[]'::jsonb,
      repo TEXT,
      github_url TEXT,
      live_url TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      publish_at TIMESTAMPTZ,
      entry_slug TEXT
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_created_at
    ON posts (created_at DESC);
  `;

  // Ensure columns exist on older databases without recreating tables.
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS title TEXT;`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS summary TEXT;`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS topic_family TEXT;`;
  await sql`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS tags JSONB NOT NULL DEFAULT '[]'::jsonb;
  `;
  await sql`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS skills JSONB NOT NULL DEFAULT '[]'::jsonb;
  `;
  await sql`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS tools JSONB NOT NULL DEFAULT '[]'::jsonb;
  `;
  await sql`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS domains JSONB NOT NULL DEFAULT '[]'::jsonb;
  `;
  await sql`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS data_sources JSONB NOT NULL DEFAULT '[]'::jsonb;
  `;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS repo TEXT;`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS github_url TEXT;`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS live_url TEXT;`;
  await sql`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
  `;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS entry_slug TEXT;`;

  const { rows: slugConstraint } = await sql<{ exists: boolean }>`
    SELECT 1 AS exists
    FROM information_schema.table_constraints
    WHERE constraint_name = 'posts_entry_slug_key'
      AND table_name = 'posts'
      AND table_schema = current_schema()
    LIMIT 1
  `;
  if (!slugConstraint.length) {
    await sql`
      ALTER TABLE posts
      ADD CONSTRAINT posts_entry_slug_key UNIQUE (entry_slug);
    `;
  }

  // Portfolio entries need full bodies; drop the legacy length constraint if present.
  await sql`ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_body_check;`;

  // Expand kind constraint to include project/log/note data.
  await sql`ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_kind_check;`;
  await sql`
    ALTER TABLE posts
    ADD CONSTRAINT posts_kind_check CHECK (
      kind IN ('text', 'photo', 'link', 'project', 'note', 'log')
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_kind
    ON posts (kind);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_topic_family
    ON posts (topic_family);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_publish_at
    ON posts (publish_at DESC);
  `;

  await sql`DROP INDEX IF EXISTS idx_posts_entry_slug;`;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_entry_slug_all
    ON posts (entry_slug);
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS commit_logs (
      sha TEXT PRIMARY KEY,
      repo TEXT,
      repo_url TEXT,
      author TEXT,
      message TEXT,
      commit_at TIMESTAMPTZ,
      url TEXT,
      inserted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_commit_logs_commit_at
    ON commit_logs (commit_at DESC NULLS LAST);
  `;
}

const FILTERABLE_KINDS: PostKind[] = [
  "text",
  "photo",
  "link",
  "project",
  "note",
  "log",
];

export type PostFilters = {
  source?: string; // "local" | "mastodon" | "portfolio" | etc | "all"
  kind?: PostKind | "all";
  tag?: string;    // without '#'
  q?: string;      // free-text search
};

export async function fetchPostsPage(
  cursor: number | null,
  limit: number,
  filters: PostFilters = {},
): Promise<Post[]> {
  const hasSource = !!filters.source && filters.source !== "all";
  const hasKind =
    !!filters.kind &&
    filters.kind !== "all" &&
    FILTERABLE_KINDS.includes(filters.kind);
  const shouldHidePortfolio = !hasSource;

  const hasTag = !!(filters.tag && filters.tag.trim() !== "");
  const hasQ = !!(filters.q && filters.q.trim() !== "");

  const tagPattern =
    "%" +
    "#" +
    (filters.tag ? filters.tag.trim().replace(/^#/, "") : "") +
    "%";

  const qPattern = "%" + (filters.q ? filters.q.trim() : "") + "%";

  const { rows } = await sql<Post>`
    SELECT *
    FROM posts
    WHERE
      (${cursor === null} OR id < ${cursor}) AND
      (${!hasSource} OR source = ${filters.source}) AND
      (${!shouldHidePortfolio} OR source <> 'portfolio') AND
      (${!hasKind} OR kind = ${filters.kind}) AND
      (${!hasTag} OR body ILIKE ${tagPattern}) AND
      (${
        !hasQ
      } OR (
        body ILIKE ${qPattern}
        OR COALESCE(link_url, '') ILIKE ${qPattern}
        OR source ILIKE ${qPattern}
        OR kind ILIKE ${qPattern}
      ))
    ORDER BY id DESC
    LIMIT ${limit}
  `;

  return rows;
}
