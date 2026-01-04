import Link from "next/link";
import type { EntryMeta } from "@/lib/portfolioEntries";
import StackList from "@/components/StackList";

function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

interface ProjectCardProps {
  entry: EntryMeta;
}

export default function ProjectCard({ entry }: ProjectCardProps) {
  const dateLabel = formatDate(entry.publishAt ?? entry.date);
  const stack = entry.skills.length ? entry.skills : entry.tools;

  return (
    <article className="project-card">
      <div className="project-card__header">
        <p className="eyebrow">{entry.topic_family ?? entry.kind}</p>
        {dateLabel ? <span>{dateLabel}</span> : null}
      </div>
      <h3>
        <Link href={entry.href}>{entry.title}</Link>
      </h3>
      <p className="project-card__summary">
        {entry.summary ?? "Case study coming soon."}
      </p>
      <StackList label="Focus" items={stack.slice(0, 4)} />
      <div className="project-card__footer">
        <Link href={entry.href} className="text-link">
          Read case study →
        </Link>
      </div>
    </article>
  );
}
