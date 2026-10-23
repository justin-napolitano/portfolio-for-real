/** Export an owner-local wiki outside the public repository; never upload this output. */
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RepoMarkdown from "../app/components/RepoMarkdown";
import type { DocsCatalog } from "../lib/federated-docs";
import type { Project } from "../lib/projects";

const input = path.resolve(process.argv[2] ?? "");
const output = path.resolve(process.argv[3] ?? "");
const root = process.cwd();
if (process.argv.length !== 4 || [input, output].some(p => p === root || p.startsWith(root + path.sep))) throw new Error("Private input/output must be outside the public repository");
const catalog = JSON.parse(fs.readFileSync(path.join(input, "private-docs.json"), "utf8")) as DocsCatalog & { audience: string };
const inventory = JSON.parse(fs.readFileSync(path.join(input, "private-projects.json"), "utf8")) as { audience: string; projects: Project[] };
if (catalog.audience !== "private" || inventory.audience !== "private") throw new Error("Expected separate private catalogs");
fs.mkdirSync(output, { recursive: true });
fs.cpSync(path.join(root, "public/fonts"), path.join(output, "fonts"), { recursive: true });
fs.copyFileSync(path.join(root, "app/wiki.css"), path.join(output, "wiki.css"));
const css = `*{box-sizing:border-box}body{margin:0;background:#f4f0e8;color:#202820;font:16px/1.7 Inter,system-ui} @font-face{font-family:Inter;src:url('/fonts/Inter-Variable.ttf')}a{color:#356349}header.owner-header{max-width:1200px;margin:24px auto;padding:0 24px}.page-shell{margin:auto;max-width:1200px;padding:24px}.wiki-home{max-width:960px}h1{font:28px Georgia}h2{font-size:22px}ul.project-list{list-style:none;padding:0}ul.project-list li{border-top:1px solid #b5bfb1;padding:16px 0;overflow-wrap:anywhere}ul.project-list h2{font-size:19px;margin:0}.wiki-sidebar a{color:#356349}.wiki-prose{overflow-wrap:anywhere}`;
function write(route: string, title: string, content: React.ReactNode) {
  const parts = route.split("/").filter(Boolean).map(decodeURIComponent);
  if (parts.some(p => p === "." || p === ".." || p.includes("/") || p.includes("\\"))) throw new Error("Unsafe private route");
  const folder = path.join(output, ...parts);
  fs.mkdirSync(folder, { recursive: true });
  const html = renderToStaticMarkup(<html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex,nofollow"/><title>{`${title} · Private wiki`}</title><link rel="stylesheet" href="/wiki.css"/><style>{css}</style></head><body><header className="owner-header"><a href="/">Private project log</a><p>This owner-local preview stays on your computer. GitHub source links use your repository permissions.</p></header>{content}</body></html>);
  fs.writeFileSync(path.join(folder, "index.html"), "<!doctype html>" + html);
}
fs.writeFileSync(path.join(output, "search-index.json"), JSON.stringify(catalog.documents.map(d => ({ title: d.title, repo: d.repo, href: d.href, text: d.body }))));
fs.writeFileSync(path.join(output, "private-search.js"), `const input=document.querySelector('#private-query'),list=document.querySelector('#private-results');let docs=null;input.addEventListener('input',async()=>{const q=input.value.trim().toLowerCase();list.replaceChildren();if(q.length<2)return;try{if(!docs){const r=await fetch('/search-index.json');if(!r.ok)throw Error();docs=await r.json()}if(input.value.trim().toLowerCase()!==q)return;const hits=docs.filter(d=>(d.title+' '+d.repo+' '+d.text).toLowerCase().includes(q)).slice(0,30);const status=document.createElement('p');status.textContent=hits.length?hits.length+' document results (up to 30)':'No matching documentation';list.append(status);for(const d of hits){const li=document.createElement('li'),a=document.createElement('a');a.href=d.href;a.textContent=d.title+' · '+d.repo;li.append(a);list.append(li)}}catch{list.textContent='Search could not load. Change the query to retry.'}});`);
write("/", "All projects", <main className="page-shell wiki-home"><h1>All projects.</h1><p>{inventory.projects.length} repositories · {catalog.sources.length} private documentation sources · {catalog.documents.length} documents</p><section><label htmlFor="private-query">Search private documentation</label><input id="private-query" type="search" maxLength={200}/><ul id="private-results" aria-live="polite"/><script src="/private-search.js"/></section><ul className="project-list">{inventory.projects.map(p => <li key={p.repo}><h2><a href={catalog.sources.some(s => s.repo === p.repo) ? `/docs/${p.repo}` : p.url}>{p.title}</a></h2><p>{p.summary}</p><p>{p.visibility} · {p.status === "unreported" ? "Status not yet documented" : p.status}{p.fork ? " · Fork" : ""}</p><a href={p.url}>Source repository</a></li>)}</ul></main>);
for (const source of catalog.sources) {
  const documents = catalog.documents.filter(d => d.repo === source.repo);
  const sidebar = <aside className="wiki-sidebar"><h2>{source.repo}</h2><nav aria-label="Repository documentation"><ul>{documents.map(d => <li key={d.path}><a href={d.href}>{d.title}</a></li>)}</ul></nav></aside>;
  if (!documents.some(d => d.href === `/docs/${source.repo}`)) write(`/docs/${source.repo}`, source.repo, <main className="page-shell wiki-layout">{sidebar}<article><h1>{source.repo}</h1><p>Choose a document from the repository navigation.</p></article></main>);
  for (const document of documents) write(document.href, document.title, <main className="page-shell wiki-layout">{sidebar}<article className="wiki-document"><h1>{document.title}</h1><p>{document.path} · revision {source.commit.slice(0, 7)}</p><p><a href={`https://github.com/${source.owner}/${source.repo}/blob/${source.commit}/${document.path}`}>View source</a></p><RepoMarkdown document={document} source={source} documents={catalog.documents} sources={catalog.sources} images={false}/></article></main>);
}
console.log(JSON.stringify({ projects: inventory.projects.length, documents: catalog.documents.length, output, hosted: false }));
