interface StackListProps {
  label: string;
  items?: string[];
}

export default function StackList({ label, items }: StackListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="stack-list">
      <p className="stack-list__label">{label}</p>
      <div className="stack-list__items">
        {items.map((item) => (
          <span className="stack-list__pill" key={`${label}-${item}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
