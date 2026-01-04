import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { fetchEntryBySlug, fetchPublishedEntryMetas } from "@/lib/portfolioEntries";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const entries = await fetchPublishedEntryMetas();
  return entries.map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const entry = await fetchEntryBySlug(params.slug);
  if (!entry) {
    return {
      title: "Project not found",
    };
  }
  return {
    title: `${entry.title} | Justin Napolitano`,
    description: entry.summary ?? `Case study for ${entry.title}`,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const entry = await fetchEntryBySlug(params.slug);
  if (!entry) {
    notFound();
  }

  return (
    <main className="page-shell page-shell--narrow">
      <ProjectDetail entry={entry} />
    </main>
  );
}
