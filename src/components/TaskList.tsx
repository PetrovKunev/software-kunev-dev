import type { PracticeTask } from "@/data/types";

export default function TaskList({ tasks }: { tasks: PracticeTask[] }) {
  return (
    <ol className="space-y-5">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          className="rounded-xl border border-edge bg-surface-raised p-5"
        >
          <h3 className="font-semibold text-foreground">
            <span className="mr-2 font-mono text-cyan-glow">
              Задача {index + 1}.
            </span>
            {task.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{task.goal}</p>

          <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-sm text-muted">
            {task.steps.map((step) => (
              <li key={step} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>

          {task.deliverable && (
            <p className="mt-4 rounded-lg border border-edge bg-surface p-3 text-sm text-muted">
              <span className="font-mono text-[11px] font-bold tracking-wider text-cyan-glow uppercase">
                Краен резултат:{" "}
              </span>
              {task.deliverable}
            </p>
          )}

          {task.hint && (
            <details className="group mt-3">
              <summary className="cursor-pointer list-none font-mono text-[12px] text-faint transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                <span className="mr-1 inline-block transition-transform group-open:rotate-90">
                  ›
                </span>
                Насока
              </summary>
              <p className="mt-2 pl-4 text-sm text-muted">{task.hint}</p>
            </details>
          )}
        </li>
      ))}
    </ol>
  );
}
