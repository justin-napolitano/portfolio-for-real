/** No application rows or connection details are read by these readiness checks. */
export type SchemaQuery = (query: string) => Promise<{ rows: Record<string, unknown>[] }>;

const REQUIRED_COLUMNS = `SELECT
 id, created_at, kind, body, image_data, source, external_id, external_url,
 source_deleted, link_url, mastodon_url, bluesky_uri, title, summary,
 topic_family, tags, skills, tools, domains, data_sources, repo, github_url,
 live_url, status, publish_at, entry_slug
 FROM posts LIMIT 0`;

const REQUIRED_CONSTRAINTS = `SELECT
 EXISTS (
   SELECT 1 FROM pg_constraint c
   JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
   WHERE c.conrelid = 'posts'::regclass AND c.contype = 'u'
     AND c.convalidated AND a.attname = 'entry_slug' AND cardinality(c.conkey) = 1
 ) AS unique_slug,
 EXISTS (
   SELECT 1 FROM pg_constraint c
   WHERE c.conrelid = 'posts'::regclass AND c.contype = 'c'
     AND c.convalidated AND c.conname = 'posts_kind_check'
 ) AS kind_check,
 EXISTS (
   SELECT 1 FROM pg_constraint c
   JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
   WHERE c.conrelid = 'commit_logs'::regclass AND c.contype = 'p'
     AND c.convalidated AND a.attname = 'sha' AND cardinality(c.conkey) = 1
 ) AS commit_sha_key,
 NOT EXISTS (
   SELECT 1 FROM pg_constraint c
   WHERE c.conrelid = 'posts'::regclass AND c.conname = 'posts_body_check'
 ) AS full_body_ready`;

export function createSchemaInitializer(query: SchemaQuery) {
  let readiness: Promise<void> | undefined;
  return function initDb(): Promise<void> {
    if (!readiness) {
      readiness = (async () => {
        await query(REQUIRED_COLUMNS);
        await query("SELECT sha, repo, repo_url, author, message, commit_at, url, inserted_at FROM commit_logs LIMIT 0");
        const { rows } = await query(REQUIRED_CONSTRAINTS);
        const row = rows[0];
        if (!row?.unique_slug || !row.kind_check || !row.full_body_ready || !row.commit_sha_key) {
          throw new Error("Required posts schema constraints are unavailable");
        }
      })().catch(() => {
        readiness = undefined;
        // Avoid echoing SQL errors or connection details to callers/logs.
        throw new Error("Posts schema is not ready. An operator must review and run the explicit db:migrate:schema migration before serving this application.");
      });
    }
    return readiness;
  };
}
