import type { ReactNode } from "react";

const STYLES = {
  info: {
    border: "border-edge-bright",
    label: "text-accent",
    defaultTitle: "Важно",
  },
  tip: {
    border: "border-accent-deep",
    label: "text-accent-bright",
    defaultTitle: "Съвет",
  },
  warn: {
    border: "border-amber-500/40",
    label: "text-amber-400",
    defaultTitle: "Внимание",
  },
} as const;

export type CalloutType = keyof typeof STYLES;

/** Използва се и директно в MDX: <Callout type="tip" title="...">...</Callout> */
export default function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLES[type];
  return (
    <aside className={`my-6 rounded-lg border ${style.border} bg-surface p-4`}>
      <p
        className={`font-mono text-xs font-bold tracking-[0.2em] uppercase ${style.label}`}
      >
        {title ?? style.defaultTitle}
      </p>
      <div className="mt-2 text-sm text-muted [&>p]:my-1">{children}</div>
    </aside>
  );
}
