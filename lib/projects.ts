import fs from "node:fs";
import path from "node:path";

/** Repository-owned metadata, distinct from inferred GitHub activity. */
export interface Project {
  repo: string; owner: string; title: string; summary: string; status: string;
  topics: string[]; docs: Record<string, string>; visibility: "public" | "private";
  fork: boolean; archived: boolean; language: string | null; pushedAt: string | null;
  createdAt: string | null; branch: string; url: string; hasManifest: boolean;
}
/** Public builds fail closed if an inventory contains a private repository. */
export function getProjects(): Project[] {
  const value = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/federated/projects.json"), "utf8"));
  if (value.version !== 1 || value.audience !== "public" || value.projects.some((p: Project) => p.visibility !== "public")) throw new Error("Invalid public project inventory");
  return value.projects;
}
