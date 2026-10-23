import { posix } from "node:path";
import type { DocSource, RepoDocument } from "./federated-docs";

/** Resolve published repository links locally and other files against their source revision. */
export function resolveDocLink(value: string, document: RepoDocument, source: DocSource, documents: RepoDocument[], sources: DocSource[], image = false): string {
  if (!value || value.startsWith("#")) return value;
  if (value.startsWith("//")) return "https:" + value;
  let currentSource = source;
  let candidate = value;
  if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
    let url: URL;
    try { url = new URL(value); } catch { return ""; }
    if (!["https:", "http:", "mailto:"].includes(url.protocol)) return "";
    if (url.hostname !== "github.com" || image) return value;
    const match = sources.find(s => url.pathname.startsWith(`/${s.owner}/${s.repo}/blob/`));
    if (!match) return value;
    const prefix = `/${match.owner}/${match.repo}/blob/`;
    let rest: string;
    try { rest = decodeURIComponent(url.pathname.slice(prefix.length)); } catch { return ""; }
    const ref = [match.branch, match.commit].find(ref => rest.startsWith(ref + "/"));
    if (!ref) return value;
    currentSource = match;
    candidate = "/" + rest.slice(ref.length + 1) + url.search + url.hash;
  }
  const hashIndex = candidate.indexOf("#");
  const fragment = hashIndex < 0 ? "" : candidate.slice(hashIndex);
  const file = (hashIndex < 0 ? candidate : candidate.slice(0, hashIndex)).split("?")[0];
  let decoded: string;
  try { decoded = decodeURIComponent(file); } catch { return ""; }
  if (!decoded || decoded.includes("\\") || /[\u0000-\u001f]/.test(decoded)) return "";
  const target = posix.normalize(decoded.startsWith("/") ? decoded.slice(1) : posix.join(posix.dirname(document.path), decoded));
  if (target === ".." || target.startsWith("../") || target.startsWith("/")) return "";
  const local = documents.find(d => d.repo === currentSource.repo && d.path === target)
    ?? documents.find(d => d.repo === currentSource.repo && ["README.md", "readme.md", "index.md"].some(name => d.path === posix.join(target, name)));
  if (!image && local) return local.href + fragment;
  const encoded = target.split("/").map(encodeURIComponent).join("/");
  return image
    ? `https://raw.githubusercontent.com/${currentSource.owner}/${currentSource.repo}/${currentSource.commit}/${encoded}${fragment}`
    : `https://github.com/${currentSource.owner}/${currentSource.repo}/blob/${currentSource.commit}/${encoded}${fragment}`;
}
