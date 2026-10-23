"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

/** Search the entire project history, with explicit archive and fork filters. */
export default function ProjectLog({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("");
  const filtered = useMemo(() => projects.filter(p =>
    (kind !== "original" || !p.fork) && (kind !== "fork" || p.fork) &&
    (kind !== "archived" || p.archived) && (!status || p.status === status) &&
    `${p.title} ${p.repo} ${p.summary} ${p.topics.join(" ")} ${p.language ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? "") || a.repo.localeCompare(b.repo)), [projects, query, kind, status]);
  return <section className="wiki-search" aria-label="Project log">
    <label htmlFor="project-query">Find a project</label>
    <input id="project-query" type="search" maxLength={200} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, topics, or languages…" />
    <div className="wiki-filters"><label htmlFor="project-kind">Repository type<select id="project-kind" value={kind} onChange={e => setKind(e.target.value)}><option value="all">All repositories</option><option value="original">Original work</option><option value="fork">Forks</option><option value="archived">Archived repositories</option></select></label>
      <label htmlFor="project-status">Project status<select id="project-status" value={status} onChange={e => setStatus(e.target.value)}><option value="">All statuses</option>{[...new Set(projects.map(p => p.status))].sort().map(s => <option key={s} value={s}>{s === "unreported" ? "Not yet documented" : s.replaceAll("-", " ")}</option>)}</select></label></div>
    <p className="wiki-meta" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{filtered.length ? " · latest repository pushes first" : " · try another search or filter"}</p>
    <ul className="wiki-results project-log-results">{filtered.map(p => <li key={p.repo}><h2><Link href={`/log/${encodeURIComponent(p.repo)}`}>{p.title}</Link></h2>
      {p.summary && <p>{p.summary}</p>}<p className="wiki-meta">{[p.language, p.fork ? "Fork" : "Original", p.status === "unreported" ? "Status not yet documented" : p.status.replaceAll("-", " "), p.pushedAt ? `Last push ${p.pushedAt.slice(0, 10)}` : null].filter(Boolean).join(" · ")}</p></li>)}</ul>
  </section>;
}
