"use client";

import { useEffect, useState } from "react";
import type { Quiz, QuizQuestion } from "@/data/types";

interface SavedResult {
  last: number;
  best: number;
  total: number;
  date: string;
}

function sameSet(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, i) => value === sortedB[i]);
}

function isCorrect(question: QuizQuestion, selected: number[] | undefined) {
  return selected !== undefined && sameSet(selected, question.correct);
}

function verdict(score: number, total: number): string {
  const pct = (score / total) * 100;
  if (pct >= 90) return "Отличен резултат!";
  if (pct >= 75) return "Много добър резултат!";
  if (pct >= 60) return "Добър резултат.";
  if (pct >= 50) return "Среден резултат — прегледай грешките по-долу.";
  return "Прегледай теорията и опитай отново.";
}

function loadSaved(storageKey: string): SavedResult | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as SavedResult) : null;
  } catch {
    return null;
  }
}

export default function QuizPlayer({
  quiz,
  storageKey,
}: {
  quiz: Quiz;
  storageKey: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState<SavedResult | null>(null);

  // localStorage се чете едва след mount — избягва hydration разминаване.
  useEffect(() => {
    setSaved(loadSaved(storageKey));
  }, [storageKey]);

  const total = quiz.questions.length;
  const answeredCount = quiz.questions.filter(
    (q) => (answers[q.id] ?? []).length > 0
  ).length;
  const score = quiz.questions.filter((q) =>
    isCorrect(q, answers[q.id])
  ).length;

  function toggleChoice(question: QuizQuestion, choiceIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const multi = question.correct.length > 1;
      const current = prev[question.id] ?? [];
      const next = multi
        ? current.includes(choiceIndex)
          ? current.filter((i) => i !== choiceIndex)
          : [...current, choiceIndex]
        : [choiceIndex];
      return { ...prev, [question.id]: next };
    });
  }

  function submit() {
    setSubmitted(true);
    const result: SavedResult = {
      last: score,
      best: Math.max(score, saved?.best ?? 0),
      total,
      date: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(result));
    } catch {
      // локалното хранилище е недостъпно (напр. частен режим) — тестът работи и без него
    }
    setSaved(result);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div>
      {saved && !submitted && (
        <p className="mb-4 font-mono text-[12px] text-faint">
          Последен резултат: {saved.last}/{saved.total} · Най-добър:{" "}
          {saved.best}/{saved.total}
        </p>
      )}

      <ol className="space-y-6">
        {quiz.questions.map((question, qIndex) => {
          const selected = answers[question.id] ?? [];
          const multi = question.correct.length > 1;
          const correct = isCorrect(question, selected);
          const frame = !submitted
            ? "border-edge"
            : correct
              ? "border-accent-dim"
              : "border-red-500/50";

          return (
            <li
              key={question.id}
              className={`rounded-xl border ${frame} bg-surface-raised p-5`}
            >
              <p className="font-semibold text-foreground">
                <span className="mr-2 font-mono text-accent">
                  {qIndex + 1}.
                </span>
                {question.text}
                {multi && (
                  <span className="ml-2 font-mono text-[11px] font-normal text-faint">
                    (повече от един верен отговор)
                  </span>
                )}
              </p>

              <div className="mt-4 space-y-2">
                {question.choices.map((choice, cIndex) => {
                  const isSelected = selected.includes(cIndex);
                  const isRight = question.correct.includes(cIndex);
                  const highlight = submitted
                    ? isRight
                      ? "border-accent-dim bg-accent-deep/20 text-accent-bright"
                      : isSelected
                        ? "border-red-500/50 bg-red-500/10 text-red-300"
                        : "border-edge text-muted opacity-60"
                    : isSelected
                      ? "border-accent-dim bg-surface text-foreground"
                      : "border-edge text-muted hover:border-edge-bright hover:text-foreground";

                  return (
                    <label
                      key={cIndex}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-2.5 text-sm transition-colors ${highlight} ${submitted ? "cursor-default" : ""}`}
                    >
                      <input
                        type={multi ? "checkbox" : "radio"}
                        name={question.id}
                        checked={isSelected}
                        onChange={() => toggleChoice(question, cIndex)}
                        disabled={submitted}
                        className="accent-accent mt-0.5 shrink-0"
                      />
                      <span>{choice}</span>
                      {submitted && isRight && (
                        <span className="ml-auto shrink-0 font-mono text-[11px] text-accent">
                          ✓ верен
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {submitted && question.explanation && (
                <p className="mt-3 rounded-lg border border-edge bg-surface p-3 text-sm text-muted">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-accent uppercase">
                    Обяснение:{" "}
                  </span>
                  {question.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8">
        {!submitted ? (
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={submit}
              disabled={answeredCount < total}
              className="glow-teal rounded-lg border border-accent-dim bg-accent-deep/40 px-6 py-3 font-semibold text-accent-bright transition-colors hover:bg-accent-deep/60 disabled:cursor-not-allowed disabled:border-edge disabled:bg-surface disabled:text-faint disabled:shadow-none"
            >
              Провери отговорите
            </button>
            <span className="font-mono text-[12px] text-faint">
              {answeredCount}/{total} отговорени
            </span>
          </div>
        ) : (
          <div className="glow-teal rounded-xl border border-accent-dim bg-surface p-6">
            <p className="text-2xl font-bold text-foreground">
              {score}/{total}{" "}
              <span className="text-base font-normal text-muted">
                ({Math.round((score / total) * 100)}%) · {verdict(score, total)}
              </span>
            </p>
            <button
              onClick={reset}
              className="mt-4 rounded-lg border border-edge bg-surface-raised px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent-dim hover:text-accent-bright"
            >
              Реши отново
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
