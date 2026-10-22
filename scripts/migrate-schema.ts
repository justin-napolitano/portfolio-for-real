/** Operator-only historical schema migration. Never imported by runtime code. */
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
loadEnvConfig(process.cwd());

async function migrateSchema() {
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


if (process.argv.slice(2).length !== 1 || process.argv[2] !== "--apply") {
  console.error("No schema changes made. Review scripts/migrate-schema.ts and backup/recovery first. Run npm run db:migrate:schema -- --apply only during a coordinated migration window.");
  process.exitCode = 1;
} else {
  migrateSchema().catch(() => {
    console.error("Schema migration failed; inspect database state before retrying.");
    process.exitCode = 1;
  });
}
