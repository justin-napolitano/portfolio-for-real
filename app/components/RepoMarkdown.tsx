import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import GithubSlugger from "github-slugger";
import type { Element, RootContent, Text } from "hast";
import { resolveDocLink } from "@/lib/doc-links";
import type { DocSource, RepoDocument } from "@/lib/federated-docs";

function textOf(node: Element | RootContent): string {
  return node.type === "text" ? (node as Text).value : "children" in node ? node.children.map(textOf).join("") : "";
}
/** Render escaped Markdown with GFM, source links and anchors; execute no source HTML or MDX. */
export default function RepoMarkdown({ document, source, documents, sources, images = true }: { images?: boolean; document: RepoDocument; source: DocSource; documents: RepoDocument[]; sources: DocSource[] }) {
  const slugger = new GithubSlugger();
  return <div className="wiki-prose prose"><ReactMarkdown skipHtml remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
    urlTransform={(url, key) => defaultUrlTransform(resolveDocLink(url, document, source, documents, sources, key === "src"))}
    components={{
      h1: ({ node, children }) => <h2 id={slugger.slug(node ? textOf(node) : String(children))}>{children}</h2>,
      h2: ({ node, children }) => <h2 id={slugger.slug(node ? textOf(node) : String(children))}>{children}</h2>,
      h3: ({ node, children }) => <h3 id={slugger.slug(node ? textOf(node) : String(children))}>{children}</h3>,
      h4: ({ node, children }) => <h4 id={slugger.slug(node ? textOf(node) : String(children))}>{children}</h4>,
      h5: ({ node, children }) => <h5 id={slugger.slug(node ? textOf(node) : String(children))}>{children}</h5>,
      h6: ({ node, children }) => <h6 id={slugger.slug(node ? textOf(node) : String(children))}>{children}</h6>,
      a: ({ children, href }) => <a href={href} rel={href?.startsWith("http") ? "noreferrer" : undefined}>{children}</a>,
      img: ({ src, alt, title }) => images && typeof src === "string" ? <img src={src} alt={alt ?? ""} title={title} loading="lazy" /> : null,
    }}>{document.body}</ReactMarkdown></div>;
}
