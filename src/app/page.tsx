import Link from "next/link";
import { countTopics, getGrades, subjectPath } from "@/lib/curriculum";

export default function Home() {
  const grades = getGrades();

  return (
    <main>
      {/* Херо */}
      <section className="cyber-grid border-b border-edge">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Професия · код 061303 · направление 0613
          </p>
          <h1 className="text-glow mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            Разработка на софтуер
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Учебен сайт на паралелката — материали по специалните предмети,
            подредени по класове, раздели, теми и седмици според официалната
            учебна програма.
          </p>
        </div>
      </section>

      {/* Селектор клас → предмет */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-faint uppercase">
          Избери клас
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {grades.map((grade) =>
            grade.available ? (
              <article
                key={grade.id}
                className="glow-teal flex flex-col rounded-xl border border-edge-bright bg-surface p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold text-foreground">
                    {grade.label}
                  </h3>
                  <span className="rounded-full border border-accent-deep bg-accent-deep/30 px-3 py-1 font-mono text-[11px] text-accent-bright">
                    активен
                  </span>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-3">
                  {grade.subjects.map((subject) => (
                    <li key={subject.id}>
                      <Link
                        href={subjectPath(grade.id, subject.id)}
                        className="group block rounded-lg border border-edge bg-surface-raised p-4 transition-colors hover:border-accent-dim"
                      >
                        <span className="font-semibold text-foreground group-hover:text-accent-bright">
                          {subject.name} →
                        </span>
                        <span className="mt-2 block font-mono text-[12px] text-faint">
                          {subject.hours.theory} ч. теория ·{" "}
                          {subject.hours.practice} ч. практика ·{" "}
                          {countTopics(subject)} теми
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ) : (
              <article
                key={grade.id}
                className="flex flex-col rounded-xl border border-dashed border-edge bg-surface/40 p-6 opacity-70"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold text-muted">
                    {grade.label}
                  </h3>
                  <span className="rounded-full border border-edge px-3 py-1 font-mono text-[11px] text-faint">
                    очаквайте скоро
                  </span>
                </div>
                <p className="mt-5 text-sm text-faint">{grade.comingSoonNote}</p>
              </article>
            )
          )}
        </div>

        <p className="mt-10 text-sm text-faint">
          В следващите класове се добавят предмети като „Програмиране“, „Основи
          на бази данни“, „Уеб и мобилно програмиране“ и др. по типовия учебен
          план на специалността.
        </p>
      </section>
    </main>
  );
}
