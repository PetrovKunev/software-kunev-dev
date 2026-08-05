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
  topicPath,
} from "@/lib/curriculum";
import { getMaterials } from "@/lib/materials";
import { hasTheory } from "@/lib/theory";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAvailableGrades().flatMap((grade) =>
    grade.subjects.map((subject) => ({
      grade: grade.id,
      subject: subject.id,
    }))
  );
}

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

function AvailabilityBadges({
  gradeId,
  subjectId,
  topic,
}: {
  gradeId: string;
  subjectId: string;
  topic: Topic;
}) {
  const materials = getMaterials(gradeId, subjectId, topic.id);
  const badges = [
    { label: "теория", available: hasTheory(gradeId, subjectId, topic.id) },
    { label: "задачи", available: Boolean(materials?.tasks?.length) },
    { label: "тест", available: Boolean(materials?.quiz) },
  ].filter((badge) => badge.available);

  if (badges.length === 0) {
    return (
      <span className="rounded-full border border-edge px-2.5 py-0.5 font-mono text-[10px] text-faint">
        материали предстоят
      </span>
    );
  }

  return (
    <>
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="rounded-full border border-accent-deep bg-accent-deep/20 px-2.5 py-0.5 font-mono text-[10px] text-accent-bright"
        >
          ✓ {badge.label}
        </span>
      ))}
    </>
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
              <Link
                key={topic.id}
                href={topicPath(grade.id, subject.id, topic.id)}
                className="group flex items-center gap-4 rounded-xl border border-edge bg-surface-raised p-5 transition-colors hover:border-accent-dim"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-edge-bright bg-surface font-mono text-sm font-bold text-accent">
                  {topic.number}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-foreground group-hover:text-accent-bright">
                    {topic.title}
                  </span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[12px] text-faint">
                      {formatWeeks(topic.weeks)}
                    </span>
                    <AvailabilityBadges
                      gradeId={grade.id}
                      subjectId={subject.id}
                      topic={topic}
                    />
                  </span>
                </span>
                <span className="select-none text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
