"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

interface SearchDocument { title: string; repo: string; href: string; text: string; topics: string[] }
/** Search the public snapshot with repository/topic filters and a retryable loading state. */
export default function DocsSearch() {
  const [query, setQuery] = useState("");
  const [repo, setRepo] = useState("");
  const [topic, setTopic] = useState("");
  const [documents, setDocuments] = useState<SearchDocument[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/search-index.json", { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Search unavailable"); return response.json(); })
      .then(setDocuments)
      .catch(error => { if (error.name !== "AbortError") setError(true); });
    return () => controller.abort();
  }, [attempt]);
  const filtered = useMemo(() => (documents ?? []).filter(d => (!repo || d.repo === repo) && (!topic || d.topics.includes(topic))), [documents, repo, topic]);
  const engine = useMemo(() => new Fuse(filtered, { keys: [{ name: "title", weight: 3 }, { name: "repo", weight: 2 }, "text"], threshold: 0.3, ignoreLocation: true, minMatchCharLength: 2 }), [filtered]);
  const active = query.trim().length >= 2 || Boolean(repo || topic);
  const results = query.trim().length >= 2 ? engine.search(query.trim(), { limit: 20 }).map(result => result.item) : filtered.slice(0, 20);
  return <section className="wiki-search" id="search" aria-label="Search repository documentation">
    <label htmlFor="docs-query">Search all documentation</label>
    <input id="docs-query" type="search" maxLength={200} placeholder="Search a project, concept, or command…" value={query} onChange={event => setQuery(event.target.value)} />
    <div className="wiki-filters">
      <label>Repository<select value={repo} onChange={event => setRepo(event.target.value)}><option value="">All repositories</option>{[...new Set((documents ?? []).map(d => d.repo))].sort().map(name => <option key={name}>{name}</option>)}</select></label>
      <label>Topic<select value={topic} onChange={event => setTopic(event.target.value)}><option value="">All topics</option>{[...new Set((documents ?? []).flatMap(d => d.topics))].sort().map(name => <option key={name}>{name}</option>)}</select></label>
    </div>
    <div aria-live="polite">{error ? <p>Search could not load. <button onClick={() => { setError(false); setAttempt(attempt + 1); }}>Try again</button></p> : !documents ? <p>Loading search…</p> : active ? <>
      <p className="wiki-meta">{results.length ? `${results.length} results${results.length === 20 ? " · showing the first 20" : ""}` : "No matching documentation. Try a different term or filter."}</p>
      <ul className="wiki-results">{results.map(result => <li key={result.href}><a href={result.href}>{result.title}</a><span>{result.repo}</span></li>)}</ul>
    </> : <p className="wiki-meta">Search the full text, or choose a repository or topic.</p>}</div>
  </section>;
}
