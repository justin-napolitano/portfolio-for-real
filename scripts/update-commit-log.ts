import { writeFileSync } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import { fetchGithubCommits } from "../lib/githubCommits";

const projectRoot = process.cwd();
loadEnv({ path: path.join(projectRoot, ".env.local"), override: false });
loadEnv();

const LIMIT = Number(process.env.COMMIT_LOG_LIMIT ?? 10);
const token = process.env.GITHUB_TOKEN;
const username =
  process.env.GITHUB_USERNAME ??
  process.env.GITHUB_USER ??
  process.env.GH_USERNAME ??
  process.env.USER;

if (!token) {
  throw new Error("Provide GITHUB_TOKEN so the script can query the GitHub API");
}

if (!username) {
  throw new Error("Provide GITHUB_USERNAME so the script knows which author to query");
}

const resolvedToken = token;
const resolvedUsername = username;

async function main() {
  const commits = await fetchGithubCommits({
    token: resolvedToken,
    username: resolvedUsername,
    limit: LIMIT,
  });

  const payload = {
    updatedAt: new Date().toISOString(),
    source: "github-search",
    username: resolvedUsername,
    commits,
  };

  const outputPath = path.join(projectRoot, "data", "recent-commits.json");
  writeFileSync(outputPath, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${commits.length} commits for ${username} to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
