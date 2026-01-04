import { NextResponse } from "next/server";
import { fetchGithubCommits } from "@/lib/githubCommits";
import { replaceCommitLogs } from "@/lib/commitLog";

const CRON_SECRET = process.env.CRON_SECRET;
const USERNAME =
  process.env.GITHUB_USERNAME ??
  process.env.GITHUB_USER ??
  process.env.GH_USERNAME ??
  process.env.USER ??
  "";

export const runtime = "nodejs";

function validateSecret(request: Request): NextResponse | null {
  if (!CRON_SECRET) {
    return null;
  }
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (key !== CRON_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const maybeError = validateSecret(request);
  if (maybeError) {
    return maybeError;
  }

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is required to sync commit logs" },
      { status: 500 },
    );
  }

  if (!USERNAME) {
    return NextResponse.json(
      { error: "Set GITHUB_USERNAME so the commit log knows which author to query" },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const limitParam = url.searchParams.get("limit");
  const limit =
    limitParam && !Number.isNaN(Number(limitParam))
      ? Math.max(1, Math.min(Number(limitParam), 100))
      : 10;

  try {
    const commits = await fetchGithubCommits({
      token: process.env.GITHUB_TOKEN,
      username: USERNAME,
      limit,
    });

    await replaceCommitLogs(commits);

    return NextResponse.json({
      updated: commits.length,
      username: USERNAME,
      limit,
      at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("commit log sync failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error while syncing commits",
      },
      { status: 500 },
    );
  }
}
