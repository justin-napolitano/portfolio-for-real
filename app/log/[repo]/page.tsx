import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import { getDocsCatalog } from "@/lib/federated-docs";
export const dynamicParams = false;
export function generateStaticParams() { return getProjects().map(p => ({ repo: p.repo })); }
export async function generateMetadata({ params }: { params: Promise<{ repo: string }> }) {
  const { repo } = await params;
  return { title: getProjects().find(p => p.repo === repo)?.title ?? "Project not found" };
}
/** Show an evidence-based overview with links into the repository-owned docs. */
export default async function ProjectPage({ params }: { params: Promise<{ repo: string }> }) {
  const { repo } = await params;
  const project = getProjects().find(p => p.repo === repo);
  if (!project) notFound();
  const docs = getDocsCatalog().documents.filter(d => d.repo === repo);
  const source = (file: string) => `${project.url}/blob/${encodeURIComponent(project.branch)}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return <main className="page-shell wiki-home project-overview"><header className="wiki-intro"><Link href="/log">All projects</Link><p className="wiki-meta">{project.repo}{project.fork ? " · Fork" : ""}{project.archived ? " · Archived repository" : ""}</p><h1>{project.title}</h1>{project.summary && <p>{project.summary}</p>}<p className="wiki-meta">{project.language ?? "Language not reported"} · {project.status === "unreported" ? "Project status not yet documented" : project.status.replaceAll("-", " ")}</p></header>
    <section><h2>Repository</h2><p><a href={project.url}>Source code</a> · <a href={`${project.url}/commits/${encodeURIComponent(project.branch)}`}>Development history</a> · <a href={source("README.md")}>README</a></p><p className="wiki-meta">{project.pushedAt ? `Last repository push ${project.pushedAt.slice(0, 10)}. ` : ""}Repository activity is separate from project lifecycle.</p>{project.topics.length > 0 && <p>{project.topics.join(" · ")}</p>}</section>
    <section><h2>Documentation</h2>{docs.length ? <p><Link href={`/docs/${repo}`}>Read {docs.length} documents in the wiki</Link></p> : <p>Documentation is available in the source repository; it has not been imported into the wiki.</p>}
      {Object.keys(project.docs).length > 0 && <ul>{Object.entries(project.docs).map(([section, file]) => <li key={section}><a href={docs.find(d => d.path === file)?.href ?? source(file)}>{section[0].toUpperCase() + section.slice(1)}</a></li>)}</ul>}
      {!project.hasManifest && <p className="wiki-meta">This entry uses repository metadata. Its owner can add a <Link href="/docs/portfolio-for-real/docs/documentation-standard.md">project manifest</Link> to supply a summary, status, and reading order.</p>}</section>
  </main>;
}
