import Link from "next/link";
import DocsSearch from "@/components/DocsSearch";
import { getDocsCatalog } from "@/lib/federated-docs";

/** Browse repository-owned documentation through one generated public index. */
export default function HomePage() {
  const catalog = getDocsCatalog();
  return <main className="page-shell wiki-home">
    <header className="wiki-intro"><p className="wiki-meta">Repository documentation</p><h1>One place for the docs.</h1>
      <p>Browse and search documentation across my projects. Each repository owns its pages; updates flow here automatically.</p>
      <p className="wiki-meta">{catalog.sources.length} repositories · {catalog.documents.length} documents</p></header>
    <DocsSearch />
    <section className="wiki-repositories" aria-labelledby="repositories-title"><h2 id="repositories-title">Repositories</h2>
      {catalog.sources.length ? <ul>{catalog.sources.map(source => <li key={source.repo}>
        <div><h3><Link href={`/docs/${source.repo}`}>{source.repo}</Link></h3><p>{source.topics.join(" · ")}</p></div>
        <span>{source.documentCount} {source.documentCount === 1 ? "document" : "documents"}</span>
      </li>)}</ul> : <p>No documentation has been published yet.</p>}
    </section>
    <footer className="wiki-footer"><p>Found something to improve? Each page links back to its source file. Edit there and the next sync brings the change here.</p><a href="https://github.com/justin-napolitano/portfolio-for-real/blob/main/docs-sources.json">Documentation sources</a></footer>
  </main>;
}
