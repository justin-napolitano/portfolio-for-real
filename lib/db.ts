import { createSchemaInitializer } from "./schema-readiness";
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

// Runtime readiness never migrates schema or reads application rows.
export const initDb = createSchemaInitializer((query) => sql.query(query));

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
