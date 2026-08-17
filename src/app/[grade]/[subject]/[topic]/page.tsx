import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HomeworkList from "@/components/HomeworkList";
import MdxContent from "@/components/MdxContent";
import QuizPlayer from "@/components/QuizPlayer";
import StrandList from "@/components/StrandList";
import TaskList from "@/components/TaskList";
import {
  formatWeeks,
  getAdjacentTopics,
  getAvailableGrades,
  getTopic,
  subjectPath,
  toRoman,
  topicPath,
} from "@/lib/curriculum";
import { getMaterials, materialsKey } from "@/lib/materials";
import { readTheory } from "@/lib/theory";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAvailableGrades().flatMap((grade) =>
    grade.subjects.flatMap((subject) =>
      subject.sections.flatMap((section) =>
        section.topics.map((topic) => ({
          grade: grade.id,
          subject: subject.id,
          topic: topic.id,
        }))
      )
    )
  );
}

interface TopicParams {
  params: Promise<{ grade: string; subject: string; topic: string }>;
}

export async function generateMetadata({
  params,
}: TopicParams): Promise<Metadata> {
  const { grade: gradeId, subject: subjectId, topic: topicId } = await params;
  const found = getTopic(gradeId, subjectId, topicId);
  if (!found) return {};
  const { grade, subject, topic } = found;
  const path = topicPath(gradeId, subjectId, topicId);
  const description = `${topic.title} — теория, практически задачи, домашна работа и тест за самопроверка. ${subject.name}, ${grade.label}, ${formatWeeks(topic.weeks).toLowerCase()}.`;

  return {
    title: `${topic.title} · ${subject.name}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${topic.title} · ${subject.name}`,
      description,
      url: path,
    },
  };
}

function SectionHeading({
  id,
  label,
  title,
}: {
  id: string;
  label: string;
  title: string;
}) {
  return (
    <h2 id={id} className="scroll-mt-24 border-b border-edge pb-3">
      <span className="block font-mono text-xs font-bold tracking-[0.25em] text-accent uppercase">
        {label}
      </span>
      <span className="mt-1 block text-2xl font-bold text-foreground">
        {title}
      </span>
    </h2>
  );
}

function ComingSoon({ what }: { what: string }) {
  return (
    <p className="rounded-xl border border-dashed border-edge bg-surface/40 p-6 text-sm text-faint">
      {what} за тази тема предстои.
    </p>
  );
}

export default async function TopicPage({ params }: TopicParams) {
  const { grade: gradeId, subject: subjectId, topic: topicId } = await params;
  const found = getTopic(gradeId, subjectId, topicId);
  if (!found) notFound();
  const { grade, subject, section, topic } = found;

  const theorySource = readTheory(gradeId, subjectId, topicId);
  const materials = getMaterials(gradeId, subjectId, topicId);
  const { prev, next } = getAdjacentTopics(subject, topicId);

  const anchors = [
    { id: "programa", label: "Учебна програма" },
    { id: "teoria", label: "Теория" },
    { id: "zadachi", label: "Задачи" },
    { id: "domashna", label: "Домашна работа" },
    { id: "test", label: "Тест" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* Трохи */}
      <nav className="font-mono text-[12px] text-faint">
        <Link href="/" className="transition-colors hover:text-accent">
          Начало
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={subjectPath(gradeId, subjectId)}
          className="transition-colors hover:text-accent"
        >
          {subject.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-muted">Тема {topic.number}</span>
      </nav>

      {/* Заглавие */}
      <header className="mt-6">
        <p className="font-mono text-sm font-bold text-accent">
          Тема {topic.number}
        </p>
        <h1 className="text-glow mt-2 text-3xl font-bold sm:text-4xl">
          {topic.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[12px]">
          <span className="rounded-full border border-accent-deep bg-accent-deep/30 px-3 py-1 text-accent-bright">
            {formatWeeks(topic.weeks)}
          </span>
          <span className="rounded-full border border-edge bg-surface px-3 py-1 text-muted">
            {grade.label}
          </span>
          <span className="rounded-full border border-edge bg-surface px-3 py-1 text-muted">
            Раздел {toRoman(section.number)} · {section.title}
          </span>
        </div>

        {/* Навигация по секции */}
        <nav className="mt-6 flex flex-wrap gap-2">
          {anchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="rounded-lg border border-edge bg-surface px-4 py-2 font-mono text-[12px] text-muted transition-colors hover:border-accent-dim hover:text-accent-bright"
            >
              {anchor.label}
            </a>
          ))}
        </nav>
      </header>

      {/* От учебната програма */}
      <section className="mt-12">
        <SectionHeading
          id="programa"
          label="Из учебната програма"
          title="Какво обхваща темата"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
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
      </section>

      {/* Теория — дълъг учебен материал (MDX) */}
      <section className="mt-14">
        <SectionHeading id="teoria" label="Теория" title="Учебен материал" />
        <div className="mt-6">
          {theorySource ? (
            <MdxContent source={theorySource} />
          ) : (
            <ComingSoon what="Учебният материал" />
          )}
        </div>
      </section>

      {/* Практически задачи */}
      <section className="mt-14">
        <SectionHeading
          id="zadachi"
          label="Практика"
          title="Практически задачи"
        />
        <div className="mt-6">
          {materials?.tasks?.length ? (
            <TaskList tasks={materials.tasks} />
          ) : (
            <ComingSoon what="Практическите задачи" />
          )}
        </div>
      </section>

      {/* Домашна работа — самостоятелна подготовка по седмици */}
      <section className="mt-14">
        <SectionHeading
          id="domashna"
          label="Самостоятелна подготовка"
          title="Домашна работа по седмици"
        />
        <div className="mt-6">
          {materials?.homework?.length ? (
            <HomeworkList homework={materials.homework} />
          ) : (
            <ComingSoon what="Домашната работа" />
          )}
        </div>
      </section>

      {/* Тест */}
      <section className="mt-14">
        <SectionHeading id="test" label="Тест" title="Провери знанията си" />
        <div className="mt-6">
          {materials?.quiz ? (
            <QuizPlayer
              quiz={materials.quiz}
              storageKey={`quiz:${materialsKey(gradeId, subjectId, topicId)}`}
            />
          ) : (
            <ComingSoon what="Тестът" />
          )}
        </div>
      </section>

      {/* Предишна/следваща тема */}
      <nav className="mt-16 flex flex-col gap-4 border-t border-edge pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={topicPath(gradeId, subjectId, prev.topic.id)}
            className="group rounded-xl border border-edge bg-surface-raised p-4 transition-colors hover:border-accent-dim sm:max-w-[48%]"
          >
            <span className="font-mono text-[11px] text-faint">
              ← Предишна тема
            </span>
            <span className="mt-1 block text-sm font-semibold text-muted group-hover:text-accent-bright">
              {prev.topic.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={topicPath(gradeId, subjectId, next.topic.id)}
            className="group rounded-xl border border-edge bg-surface-raised p-4 text-right transition-colors hover:border-accent-dim sm:max-w-[48%]"
          >
            <span className="font-mono text-[11px] text-faint">
              Следваща тема →
            </span>
            <span className="mt-1 block text-sm font-semibold text-muted group-hover:text-accent-bright">
              {next.topic.title}
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
