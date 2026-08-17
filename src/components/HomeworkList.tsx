import type { HomeworkAssignment } from "@/data/types";

export default function HomeworkList({
  homework,
}: {
  homework: HomeworkAssignment[];
}) {
  return (
    <ol className="space-y-5">
      {homework.map((assignment) => (
        <li
          key={assignment.id}
          className="rounded-xl border border-edge bg-surface-raised p-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="rounded-full border border-edge-bright bg-surface px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-400">
              Седмица {assignment.week}
            </span>
            <h3 className="font-semibold text-foreground">
              {assignment.title}
            </h3>
          </div>
          <p className="mt-2 text-sm text-muted">{assignment.description}</p>

          {assignment.steps && assignment.steps.length > 0 && (
            <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-sm text-muted">
              {assignment.steps.map((step) => (
                <li key={step} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          )}

          {assignment.deliverable && (
            <p className="mt-4 rounded-lg border border-edge bg-surface p-3 text-sm text-muted">
              <span className="font-mono text-[11px] font-bold tracking-wider text-amber-400 uppercase">
                Носи в час:{" "}
              </span>
              {assignment.deliverable}
            </p>
          )}

          {assignment.hint && (
            <details className="group mt-3">
              <summary className="cursor-pointer list-none font-mono text-[12px] text-faint transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                <span className="mr-1 inline-block transition-transform group-open:rotate-90">
                  ›
                </span>
                Насока
              </summary>
              <p className="mt-2 pl-4 text-sm text-muted">{assignment.hint}</p>
            </details>
          )}
        </li>
      ))}
    </ol>
  );
}
