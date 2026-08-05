export default function StrandList({
  label,
  accentClass,
  items,
}: {
  label: string;
  accentClass: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-edge bg-surface p-4">
      <h4
        className={`font-mono text-xs font-bold tracking-[0.2em] uppercase ${accentClass}`}
      >
        {label}
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-1 select-none ${accentClass}`}>▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
