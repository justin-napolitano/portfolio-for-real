import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RepoMarkdown from "@/components/RepoMarkdown";
import { getDocsCatalog, sourceUrl } from "@/lib/federated-docs";

type Params = { repo: string; slug?: string[] };
export const dynamicParams = false;
/** Build source document routes and repository indexes, including repos without a README. */
export function generateStaticParams(): Params[] {
  const catalog = getDocsCatalog();
  const params: Params[] = catalog.sources.map(source => ({ repo: source.repo, slug: [] }));
  for (const document of catalog.documents) {
    const segments = document.href.split("/").slice(3).map(decodeURIComponent);
    if (segments.length) params.push({ repo: document.repo, slug: segments });
  }
  return params;
}
function resolve(params: Params) {
  const catalog = getDocsCatalog();
  const source = catalog.sources.find(s => s.repo === params.repo);
  const href = `/docs/${encodeURIComponent(params.repo)}` + (params.slug?.length ? "/" + params.slug.map(encodeURIComponent).join("/") : "");
  return { catalog, source, document: catalog.documents.find(d => d.repo === params.repo && d.href === href) };
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { source, document } = resolve(await params);
  return { title: document?.title ?? source?.repo ?? "Document not found" };
}
/** Read source documentation with immutable provenance and repository navigation. */
export default async function DocumentPage({ params }: { params: Promise<Params> }) {
  const values = await params;
  const { catalog, source, document } = resolve(values);
  if (!source || (!document && values.slug?.length)) notFound();
  const siblings = catalog.documents.filter(d => d.repo === source.repo);
  const sections = [...new Set(siblings.map(d => d.section))];
  return <main className="page-shell wiki-layout"><aside className="wiki-sidebar"><Link href="/docs">All repositories</Link>
    <nav aria-label={`${source.repo} documentation`}><h2>{source.repo}</h2>
      {sections.map(section => <div key={section}><h3>{section}</h3><ul>{siblings.filter(d => d.section === section).map(d => <li key={d.path}><Link href={d.href} aria-current={document?.href === d.href ? "page" : undefined}>{d.title}</Link></li>)}</ul></div>)}
    </nav></aside>
    <article className="wiki-document"><header className="wiki-document-header">
      <p className="wiki-meta"><a href={`https://github.com/${source.owner}/${source.repo}`}>{source.owner}/{source.repo}</a>{document ? ` / ${document.path}` : ""}</p>
      <h1>{document?.title ?? source.repo}</h1>
      <div className="wiki-source-links">{document && <><a href={sourceUrl(source, document)}>View source</a><a href={sourceUrl(source, document, true)}>Edit source</a></>}<a href={`https://github.com/${source.owner}/${source.repo}/commit/${source.commit}`}>Revision {source.commit.slice(0, 7)}</a></div>
      <p className="wiki-meta">Synced {new Date(source.syncedAt).toISOString().slice(0, 10)} · Updates are made in the source repository.</p>
    </header>
      {document ? <RepoMarkdown document={document} source={source} documents={catalog.documents} sources={catalog.sources} /> : <><p>Choose a document from this repository.</p><ul>{siblings.map(d => <li key={d.path}><Link href={d.href}>{d.title}</Link></li>)}</ul></>}
      <footer className="wiki-footer"><Link href="/docs">Browse repositories</Link>{document && <a href={sourceUrl(source, document, true)}>Suggest an improvement in the source repo</a>}</footer>
    </article></main>;
}
