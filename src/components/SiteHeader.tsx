import Link from "next/link";
import { getAvailableGrades, subjectPath } from "@/lib/curriculum";

export default function SiteHeader() {
  const grades = getAvailableGrades();

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="glow-teal flex size-9 items-center justify-center rounded-md border border-edge-bright bg-surface font-mono text-sm font-bold text-accent">
            {"</>"}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground group-hover:text-accent-bright">
              Разработка на софтуер
            </span>
            <span className="font-mono text-[11px] text-faint">
              software.kunev.dev
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            Начало
          </Link>
          {grades.flatMap((grade) =>
            grade.subjects.map((subject) => (
              <Link
                key={`${grade.id}-${subject.id}`}
                href={subjectPath(grade.id, subject.id)}
                className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-accent-bright"
              >
                {grade.label}
              </Link>
            ))
          )}
        </nav>
      </div>
    </header>
  );
}
