import Link from "next/link";
import HighlightStat, { type HighlightStatProps } from "@/components/HighlightStat";

interface HeroProps {
  kicker: string;
  title: string;
  description: string;
  note?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: HighlightStatProps[];
}

export default function Hero({
  kicker,
  title,
  description,
  note,
  primaryCta,
  secondaryCta,
  stats,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__copy">
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p className="hero__lead">{description}</p>
        <div className="hero__actions">
          <Link href={primaryCta.href} className="button button--primary">
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="button button--ghost">
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="hero__meta">
        {note ? <p className="hero__note">{note}</p> : null}
        {stats && stats.length ? (
          <div className="hero__stats">
            {stats.map((stat) => (
              <HighlightStat key={stat.label} {...stat} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
