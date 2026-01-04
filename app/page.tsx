import Link from "next/link";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import recentCommits from "@/data/recent-commits.json";
import topicFamilies from "@/data/topic-families.json";
import { fetchCommitLogEntries } from "@/lib/commitLog";
import type { EntryMeta } from "@/lib/portfolioEntries";
import { fetchPublishedEntryMetas } from "@/lib/portfolioEntries";

function buildHeroStats(entries: EntryMeta[]) {
  if (!entries.length) return [];
  const domainSet = new Set<string>();
  const stackSet = new Set<string>();

  entries.forEach((entry) => {
    entry.domains.forEach((domain) => domainSet.add(domain));
    [...entry.skills, ...entry.tools].forEach((item) => stackSet.add(item));
  });

  return [
    { value: `${entries.length}+`, label: "Case studies shipped" },
    { value: `${Math.max(domainSet.size, 1)}+`, label: "Industries navigated" },
    { value: `${Math.max(stackSet.size, 1)}+`, label: "Tools & datasets orchestrated" },
  ];
}

function formatUpdateDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

const provenanceBadges = [
  "Field tested",
  "Internal only",
  "Sanitized workbook",
  "Signal boost",
];

export default async function HomePage() {
  const entries = await fetchPublishedEntryMetas();
  const featured = entries.slice(0, 3);
  const stats = buildHeroStats(entries);
  const latest = entries[0];
  const latestLabel = latest ? formatUpdateDate(latest.publishAt ?? latest.date) : null;
  const heroNote = latestLabel ? `Updated ${latestLabel}` : "Docs refreshed weekly";
  const docs = topicFamilies.families;
  const storedCommits = await fetchCommitLogEntries(10);
  const commits = storedCommits.length ? storedCommits : recentCommits.commits;
  const commitOwner = storedCommits.length
    ? process.env.GITHUB_USERNAME ?? process.env.GITHUB_USER ?? process.env.GH_USERNAME
    : recentCommits.username;

  return (
    <main className="page-shell">
      <Hero
        kicker="Docs & Field Guides"
        title="Living documentation for data-forward playbooks"
        description="This is the working notebook for prototypes, civic data platforms, and integration scripts. Treat it like an open operations manual—complete with patterns, references, and narrative case studies."
        note={heroNote}
        primaryCta={{ label: "Browse the docs", href: "/projects" }}
        secondaryCta={{ label: "Email for support", href: "mailto:hello@justin.is" }}
        stats={stats}
      />

      <section className="section doc-overview">
        <div>
          <p className="eyebrow">About these docs</p>
          <h2>Field notes plus reproducible recipes</h2>
          <p>
            Every entry captures the actual stack, naming decisions, and rituals behind a project. If
            something shipped, it shows up here with evidence: queries, prototypes, and interface
            stories you can reuse.
          </p>
          <ul className="doc-overview__list">
            <li>Structured like a knowledge base so you can scan by family or search.</li>
            <li>Cross-links into MDX case studies for deeper architecture notes.</li>
            <li>Includes “why we changed it” commentary for future audits.</li>
          </ul>
        </div>
        <div className="doc-overview__callouts">
          <div>
            <p className="doc-card__meta-label">Source of truth</p>
            <p className="doc-card__meta-value">Git-backed MDX + datasets</p>
            <p>
              Markdown snapshots live with the repos that power the work, so diffs double as change
              logs.
            </p>
          </div>
          <div>
            <p className="doc-card__meta-label">When to use it</p>
            <p className="doc-card__meta-value">Reference + onboarding</p>
            <p>
              Colleagues borrow these notes when reviving a prototype, validating a stack, or
              answering scope questions.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Documentation</p>
            <h2>Stacks, experiments, and routines</h2>
            <p>
              Each collection bundles the tools, datasets, and rituals used across the work. Start
              with a family that mirrors your workflow, then drill into the linked case studies.
            </p>
          </div>
          <Link className="text-link" href="/projects">
            View full archive →
          </Link>
        </div>
        <div className="doc-nav">
          {docs.map((family, index) => {
            const badge = provenanceBadges[index % provenanceBadges.length];
            const [primaryTag, secondaryTag] = family.suggested_tags;
            return (
              <article className="doc-card" key={family.id}>
                <div className="doc-card__header">
                  <span>Collection</span>
                  <span className="doc-card__badge">{badge}</span>
                </div>
                <div className="doc-card__annotation">
                  <span className="doc-card__signal" aria-hidden="true" />
                  {family.example_slugs.length} internal references synced
                </div>
                <h3>{family.label}</h3>
                <p>{family.description}</p>
                <div className="doc-card__meta">
                  <div>
                    <p className="doc-card__meta-label">Pattern</p>
                    <p className="doc-card__meta-value">{primaryTag ?? "workflow"}</p>
                  </div>
                  <div>
                    <p className="doc-card__meta-label">Signal</p>
                    <p className="doc-card__meta-value">{secondaryTag ?? "ritual"}</p>
                  </div>
                </div>
                <div className="doc-card__tags">
                  {family.suggested_tags.slice(0, 4).map((tag) => (
                    <span key={`${family.id}-${tag}`} className="doc-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="doc-card__footer">
                  <span>{family.example_slugs.length} references</span>
                  <Link href={`/projects?topic=${family.id}`} className="text-link">
                    Explore →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section doc-split">
        <div className="doc-panel">
          <p className="eyebrow">Release notes</p>
          <h2>Latest working memos</h2>
          <p>
            Snapshot of the most recent walkthroughs and prototypes. Each entry links to the full
            build notes, architecture decisions, and integration checklists.
          </p>
          {featured.length ? (
            <ul className="doc-updates">
              {featured.map((entry) => (
                <li key={entry.id} className="doc-updates__item">
                  <span className="doc-updates__date">
                    {formatUpdateDate(entry.publishAt ?? entry.date) ?? "Draft"}
                  </span>
                  <Link href={entry.href}>
                    <strong>{entry.title}</strong>
                  </Link>
                  <p>{entry.summary ?? "Case study coming soon."}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>Connect your database to stream the latest updates.</p>
            </div>
          )}
          <Link className="text-link" href="/projects">
            Browse changelog →
          </Link>
        </div>
        <div className="doc-panel doc-panel--accent">
          <p className="eyebrow">Getting started</p>
          <h3>Ship your own toolkit</h3>
          <ul className="doc-checklist">
            <li>Audit your current stack and naming systems.</li>
            <li>Map datasets to owners, refresh cadence, and trust level.</li>
            <li>Prototype decision aids that mirror how teams actually talk.</li>
            <li>Document the rituals so handoffs stay lightweight.</li>
          </ul>
        </div>
      </section>

      <section className="section commit-log" aria-label="Recent repository commits">
        <div className="section__header">
          <div>
            <p className="eyebrow">Version history</p>
            <h2>Latest commits from {commitOwner ?? "GitHub"}</h2>
            <p>
              Data refreshes whenever the `/api/integrations/github-commit-log` job runs (ping it
              via cron or GitHub Actions once a day).
            </p>
          </div>
        </div>
        {commits.length ? (
          <ol className="commit-log__list">
            {commits.map((commit) => (
              <li key={commit.sha} className="commit-log__item">
                <div>
                  {commit.repo ? (
                    <p className="commit-log__repo">{commit.repo}</p>
                  ) : null}
                  <p className="commit-log__message">{commit.message}</p>
                  <p className="commit-log__meta">
                    <span>{commit.shortSha}</span>
                    <span>·</span>
                    <span>{commit.author}</span>
                    <span>·</span>
                    <span>{formatUpdateDate(commit.date) ?? commit.date}</span>
                  </p>
                </div>
                {commit.url ? (
                  <Link href={commit.url} className="text-link" target="_blank" rel="noreferrer">
                    View →
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty-state">
            <p>Run `npm run update:commits` after your first push to populate this log.</p>
          </div>
        )}
      </section>

      {featured.length ? (
        <section className="section">
          <div className="section__header">
            <div>
              <p className="eyebrow">Case notes</p>
              <h2>Reference implementations</h2>
            </div>
            <Link className="text-link" href="/projects">
              View everything →
            </Link>
          </div>
          <div className="project-grid">
            {featured.map((entry) => (
              <ProjectCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      ) : null}

      <CTASection
        heading="Need extra annotations or missing context?"
        body="If you spot a gap, send the file path, dataset, or commit hash that needs more narrative. I'll update the docs so the next person has the full story."
        primaryCta={{ label: "Request an update", href: "mailto:hello@justin.is" }}
        secondaryCta={{ label: "Documentation index", href: "/projects" }}
      />
    </main>
  );
}
