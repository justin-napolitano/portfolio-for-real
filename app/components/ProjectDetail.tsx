import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import type { Entry } from "@/lib/portfolioEntries";
import StackList from "@/components/StackList";
import CTASection from "@/components/CTASection";

interface ProjectDetailProps {
  entry: Entry;
}

function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date);
}

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [rehypeHighlight],
  },
};

export default function ProjectDetail({ entry }: ProjectDetailProps) {
  const dateLabel = formatDate(entry.publishAt ?? entry.date);
  const hasMeta =
    entry.skills.length ||
    entry.tools.length ||
    entry.domains.length ||
    entry.dataSources.length;
  const hasLinks = !!(entry.liveUrl || entry.githubUrl);

  return (
    <article className="project-detail">
      <header className="project-detail__header">
        <p className="eyebrow">{entry.topic_family ?? entry.kind}</p>
        <h1>{entry.title}</h1>
        {entry.summary ? <p className="project-detail__summary">{entry.summary}</p> : null}
        {dateLabel ? <p className="project-detail__date">Shipped {dateLabel}</p> : null}
        {hasLinks ? (
          <div className="project-detail__links">
            {entry.liveUrl ? (
            <Link
              href={entry.liveUrl}
              className="button button--primary"
              target="_blank"
              rel="noreferrer"
            >
              View live
            </Link>
          ) : null}
            {entry.githubUrl ? (
            <Link
              href={entry.githubUrl}
              className="button button--ghost"
              target="_blank"
              rel="noreferrer"
            >
              View repo
            </Link>
          ) : null}
          </div>
        ) : null}
      </header>

      {hasMeta ? (
        <section className="project-detail__meta">
          <StackList label="Skills" items={entry.skills} />
          <StackList label="Tools" items={entry.tools} />
          <StackList label="Domains" items={entry.domains} />
          <StackList label="Data Sources" items={entry.dataSources} />
        </section>
      ) : null}

      <section className="project-detail__body prose">
        <MDXRemote source={entry.body} options={mdxOptions} />
      </section>

      <CTASection
        eyebrow="Need more context?"
        heading="Want help adapting this playbook?"
        body="Send me the constraints and I'll annotate the relevant docs, share risks I see, and outline the first sprint so the work keeps moving."
        primaryCta={{ label: "Request a walkthrough", href: "mailto:hello@justin.is" }}
        secondaryCta={{ label: "Documentation index", href: "/projects" }}
      />
    </article>
  );
}
