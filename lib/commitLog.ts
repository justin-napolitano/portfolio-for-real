import { sql } from "@vercel/postgres";
import { initDb } from "./db";
import type { GithubCommitEntry } from "./githubCommits";

export type CommitLogEntry = GithubCommitEntry;

export async function replaceCommitLogs(entries: CommitLogEntry[]) {
  await initDb();
  await sql`DELETE FROM commit_logs`;

  for (const entry of entries) {
    await sql`
      INSERT INTO commit_logs (
        sha,
        repo,
        repo_url,
        author,
        message,
        commit_at,
        url
      )
      VALUES (
        ${entry.sha},
        ${entry.repo || null},
        ${entry.repoUrl || null},
        ${entry.author || null},
        ${entry.message},
        ${entry.date ? new Date(entry.date).toISOString() : null},
        ${entry.url || null}
      )
      ON CONFLICT (sha) DO UPDATE SET
        repo = EXCLUDED.repo,
        repo_url = EXCLUDED.repo_url,
        author = EXCLUDED.author,
        message = EXCLUDED.message,
        commit_at = EXCLUDED.commit_at,
        url = EXCLUDED.url
    `;
  }
}

export async function fetchCommitLogEntries(limit = 10): Promise<CommitLogEntry[]> {
  await initDb();
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const { rows } = await sql<{
    sha: string;
    repo: string | null;
    repo_url: string | null;
    author: string | null;
    message: string;
    commit_at: string | null;
    url: string | null;
  }>`
    SELECT sha, repo, repo_url, author, message, commit_at, url
    FROM commit_logs
    ORDER BY commit_at DESC NULLS LAST, sha DESC
    LIMIT ${safeLimit}
  `;

  return rows.map((row) => ({
    sha: row.sha,
    shortSha: row.sha?.slice(0, 7) ?? row.sha,
    repo: row.repo ?? "",
    repoUrl: row.repo_url,
    author: row.author ?? "",
    message: row.message,
    date: row.commit_at,
    url: row.url,
  }));
}
