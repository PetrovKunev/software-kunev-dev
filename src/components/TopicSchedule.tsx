import type { TopicStrand, WeekRange } from "@/data/types";

/**
 * Седмичен график на темата при 1 час седмично:
 * двойки от час по теория (нечетна седмица) и час по практика (четна).
 */
export default function TopicSchedule({
  weeks,
  theory,
  practice,
}: {
  weeks: WeekRange;
  theory: TopicStrand;
  practice: TopicStrand;
}) {
  const pairCount = Math.max(theory.items.length, practice.items.length);
  const pairs = Array.from({ length: pairCount }, (_, i) => [
    {
      week: weeks.from + 2 * i,
      label: "Теория",
      labelClass: "text-accent",
      item: theory.items[i],
    },
    {
      week: weeks.from + 2 * i + 1,
      label: "Практика",
      labelClass: "text-cyan-glow",
      item: practice.items[i],
    },
  ]);

  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-surface-raised">
      {pairs.map((pair, index) => (
        <div
          key={pair[0].week}
          className={index > 0 ? "border-t border-edge" : undefined}
        >
          {pair.map(
            (row) =>
              row.item && (
                <div
                  key={row.week}
                  className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="flex shrink-0 items-baseline gap-3 sm:w-44">
                    <span className="w-24 font-mono text-[11px] text-faint">
                      Седмица {row.week}
                    </span>
                    <span
                      className={`font-mono text-[11px] font-bold tracking-wider uppercase ${row.labelClass}`}
                    >
                      {row.label}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {row.item}
                  </span>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
}
