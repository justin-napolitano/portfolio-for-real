import Link from "next/link";
import ProjectLog from "@/components/ProjectLog";
import { getProjects } from "@/lib/projects";
export const metadata = { title: "Project log", description: "A searchable record of projects, experiments, forks, and archives." };
/** Browse every public repository while leaving lifecycle claims to its owner. */
export default function ProjectLogPage() {
  const projects = getProjects();
  return <main className="page-shell wiki-home"><header className="wiki-intro"><p className="wiki-meta">Project log</p><h1>The work, over time.</h1><p>A record of projects, experiments, and things I have explored. Each entry links to its repository and available documentation.</p><p className="wiki-meta">{projects.length} public repositories · <Link href="/docs/portfolio-for-real/docs/documentation-standard.md">How projects are documented</Link></p></header><ProjectLog projects={projects} /></main>;
}
