import Link from "next/link";

type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

interface CTASectionProps {
  heading: string;
  body: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  eyebrow?: string;
}

export default function CTASection({
  heading,
  body,
  primaryCta,
  secondaryCta,
  eyebrow = "Support desk",
}: CTASectionProps) {
  return (
    <section className="cta">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{body}</p>
      </div>
      <div className="cta__actions">
        <Link
          href={primaryCta.href}
          className={`button button--primary`}
        >
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className="button button--ghost"
          >
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
