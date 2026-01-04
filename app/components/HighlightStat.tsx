export type HighlightStatProps = {
  value: string;
  label: string;
  description?: string;
};

export default function HighlightStat({
  value,
  label,
  description,
}: HighlightStatProps) {
  return (
    <div className="hero-stat">
      <p className="hero-stat__value">{value}</p>
      <p className="hero-stat__label">{label}</p>
      {description ? (
        <p className="hero-stat__description">{description}</p>
      ) : null}
    </div>
  );
}
