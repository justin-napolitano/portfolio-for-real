import fs from "node:fs";
import path from "node:path";

/** Immutable public-repository revision represented by the generated snapshot. */
export interface DocSource {
  owner: string; repo: string; branch: string; commit: string; commitDate: string;
  topics: string[]; contentHash: string; syncedAt: string; documentCount: number;
}
/** Repository-owned Markdown is untrusted content, never executable MDX. */
export interface RepoDocument {
  repo: string; path: string; title: string; href: string; body: string; section: string;
}
export interface DocsCatalog {
  version: number; generatedAt: string; sources: DocSource[]; documents: RepoDocument[];
}
let catalog: DocsCatalog | undefined;
/** Load the generated snapshot without a live GitHub or database dependency. */
export function getDocsCatalog(): DocsCatalog {
  if (!catalog) {
    catalog = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/federated/catalog.json"), "utf8")) as DocsCatalog;
    if (catalog.version !== 1) throw new Error("Unsupported documentation snapshot");
  }
  return catalog;
}
/** Build a pinned source URL, or an edit link against the current source branch. */
export function sourceUrl(source: DocSource, document: RepoDocument, edit = false): string {
  const ref = edit ? source.branch : source.commit;
  return `https://github.com/${source.owner}/${source.repo}/${edit ? "edit" : "blob"}/${encodeURIComponent(ref)}/${document.path.split("/").map(encodeURIComponent).join("/")}`;
}
