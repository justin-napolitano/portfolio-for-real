import CTASection from "@/components/CTASection";
import ProjectCard from "@/components/ProjectCard";
import { fetchPublishedEntryMetas } from "@/lib/portfolioEntries";

export const metadata = {
  title: "Documentation index",
  description: "Browse every project, workshop, and data platform that powers the docs.",
};

export default async function ProjectsPage() {
  const entries = await fetchPublishedEntryMetas();

  return (
    <main className="page-shell">
      <header className="section section--intro">
        <p className="eyebrow">Documentation index</p>
        <h1>Every project in one place</h1>
        <p>
          From data infrastructure firefights to long-form case studies, this index captures
          the working notes referenced across the documentation site. Filter it however you like
          and follow the breadcrumbs into the systems that matter to you.
        </p>
      </header>

      {entries.length ? (
        <div className="project-grid project-grid--dense">
          {entries.map((entry) => (
            <ProjectCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No projects yet—run the migration script once your database is ready.</p>
        </div>
      )}

      <CTASection
        eyebrow="Need a pointer?"
        heading="I've probably documented a similar workflow"
        body="Send a paragraph about the problem and I'll highlight the most relevant playbooks, datasets, and rituals to steal."
        primaryCta={{ label: "Email hello@justin.is", href: "mailto:hello@justin.is" }}
        secondaryCta={{ label: "Back to docs", href: "/" }}
      />
    </main>
  );
}
