import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Topic } from "@/data/types";
import {
  countTopics,
  formatWeeks,
  getAvailableGrades,
  getSubject,
  subjectPath,
  toRoman,
} from "@/lib/curriculum";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string; subject: string }>;
}): Promise<Metadata> {
  const { grade: gradeId, subject: subjectId } = await params;
  const found = getSubject(gradeId, subjectId);
  if (!found) return {};
  const { grade, subject } = found;
  const path = subjectPath(grade.id, subject.id);

  return {
    title: `${subject.name} · ${grade.label}`,
    description: subject.tagline,
    alternates: { canonical: path },
    openGraph: {
      title: `${subject.name} · ${grade.label}`,
      description: subject.tagline,
      url: path,
    },
  };
}

export function generateStaticParams() {
  return getAvailableGrades().flatMap((grade) =>
    grade.subjects.map((subject) => ({
      grade: grade.id,
      subject: subject.id,
    }))
  );
}

function StrandList({
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

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <details
      id={topic.id}
      className="group rounded-xl border border-edge bg-surface-raised transition-colors open:border-accent-dim"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-edge-bright bg-surface font-mono text-sm font-bold text-accent">
          {topic.number}
        </span>
        <span className="flex-1">
          <span className="block font-semibold text-foreground group-open:text-accent-bright">
            {topic.title}
          </span>
          <span className="mt-1 block font-mono text-[12px] text-faint">
            {formatWeeks(topic.weeks)}
          </span>
        </span>
        <span className="select-none text-faint transition-transform group-open:rotate-90">
          ›
        </span>
      </summary>

      <div className="grid gap-4 border-t border-edge p-5 md:grid-cols-2">
        <StrandList
          label="Теория"
          accentClass="text-accent"
          items={topic.theory.items}
        />
        <StrandList
          label="Практика"
          accentClass="text-cyan-glow"
          items={topic.practice.items}
        />
      </div>
    </details>
  );
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ grade: string; subject: string }>;
}) {
  const { grade: gradeId, subject: subjectId } = await params;
  const found = getSubject(gradeId, subjectId);
  if (!found) notFound();
  const { grade, subject } = found;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Трохи */}
      <nav className="font-mono text-[12px] text-faint">
        <Link href="/" className="transition-colors hover:text-accent">
          Начало
        </Link>
        <span className="mx-2">/</span>
        <span>{grade.label}</span>
        <span className="mx-2">/</span>
        <span className="text-muted">{subject.name}</span>
      </nav>

      {/* Заглавие на предмета */}
      <header className="mt-6 border-b border-edge pb-8">
        <h1 className="text-glow text-3xl font-bold sm:text-4xl">
          {subject.name}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{subject.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[12px]">
          <span className="rounded-full border border-accent-deep bg-accent-deep/30 px-3 py-1 text-accent-bright">
            {grade.label}
          </span>
          <span className="rounded-full border border-edge bg-surface px-3 py-1 text-muted">
            {subject.hours.theory} ч. теория
          </span>
          <span className="rounded-full border border-edge bg-surface px-3 py-1 text-muted">
            {subject.hours.practice} ч. практика
          </span>
          <span className="rounded-full border border-edge bg-surface px-3 py-1 text-muted">
            {countTopics(subject)} теми
          </span>
        </div>
        {subject.frameworkNote && (
          <p className="mt-4 font-mono text-[11px] text-faint">
            {subject.frameworkNote}
          </p>
        )}
      </header>

      {/* Раздели и теми */}
      {subject.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-12">
          <h2 className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-accent">
              Раздел {toRoman(section.number)}
            </span>
            <span className="text-xl font-semibold text-foreground">
              {section.title}
            </span>
          </h2>
          <div className="mt-5 space-y-4">
            {section.topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
