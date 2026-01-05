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

type ParamsProps = { params: Params } | { params: Promise<Params> };

async function resolveParams(params: Params | Promise<Params>): Promise<Params> {
  if (typeof (params as Promise<Params>).then === "function") {
    return params as Promise<Params>;
  }
  return params as Params;
}

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const entry = await fetchEntryBySlug(slug);
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

export default async function ProjectPage({ params }: ParamsProps) {
  const { slug } = await resolveParams(params);
  const entry = await fetchEntryBySlug(slug);
  if (!entry) {
    notFound();
  }

  return (
    <main className="page-shell page-shell--narrow">
      <ProjectDetail entry={entry} />
    </main>
  );
}
