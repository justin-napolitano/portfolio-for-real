const GITHUB_API_URL = "https://api.github.com";

export type GithubCommitEntry = {
  sha: string;
  shortSha: string;
  repo: string;
  repoUrl: string | null;
  author: string;
  date: string | null;
  message: string;
  url: string | null;
};

export interface GithubCommitFetchOptions {
  token: string;
  username: string;
  limit?: number;
}

function sanitizeMessage(message: string | null | undefined): string {
  if (!message) return "Untitled commit";
  const firstLine = message.split("\n")[0]?.trim();
  return firstLine?.length ? firstLine : "Untitled commit";
}

function normalizeIso(date: string | null | undefined): string | null {
  if (!date) return null;
  const iso = new Date(date);
  return Number.isNaN(iso.getTime()) ? null : iso.toISOString();
}

export async function fetchGithubCommits(
  options: GithubCommitFetchOptions,
): Promise<GithubCommitEntry[]> {
  const limit = Math.max(1, Math.min(options.limit ?? 10, 100));
  const url = new URL("/search/commits", GITHUB_API_URL);
  url.searchParams.set("q", `author:${options.username}`);
  url.searchParams.set("sort", "committer-date");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(limit));

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${options.token}`,
      "User-Agent": "portfolio-commit-log",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub commit search failed (${response.status} ${response.statusText}): ${body}`,
    );
  }

  const payload = (await response.json()) as {
    items?: Array<{
      sha: string;
      html_url?: string;
      commit: {
        message?: string;
        author?: { name?: string | null; date?: string | null };
        committer?: { date?: string | null };
      };
      repository?: { full_name?: string; html_url?: string };
    }>;
  };

  return (payload.items ?? []).slice(0, limit).map((item) => {
    const repoName = item.repository?.full_name ?? "";
    const date =
      normalizeIso(item.commit.author?.date) ??
      normalizeIso(item.commit.committer?.date);

    return {
      sha: item.sha,
      shortSha: item.sha.slice(0, 7),
      repo: repoName,
      repoUrl: item.repository?.html_url ?? null,
      author: item.commit.author?.name ?? options.username,
      date,
      message: sanitizeMessage(item.commit.message),
      url: item.html_url ?? null,
    };
  });
}
