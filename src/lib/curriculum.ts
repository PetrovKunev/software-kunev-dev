import { curriculum } from "@/data/curriculum";
import type { Grade, Section, Subject, Topic, WeekRange } from "@/data/types";

export function getGrades(): Grade[] {
  return curriculum.grades;
}

export function getAvailableGrades(): Grade[] {
  return curriculum.grades.filter((grade) => grade.available);
}

export function getGrade(gradeId: string): Grade | undefined {
  return curriculum.grades.find((grade) => grade.id === gradeId);
}

export function getSubject(
  gradeId: string,
  subjectId: string
): { grade: Grade; subject: Subject } | undefined {
  const grade = getGrade(gradeId);
  if (!grade || !grade.available) return undefined;
  const subject = grade.subjects.find((s) => s.id === subjectId);
  if (!subject) return undefined;
  return { grade, subject };
}

export function subjectPath(gradeId: string, subjectId: string): string {
  return `/${gradeId}/${subjectId}`;
}

export function topicPath(
  gradeId: string,
  subjectId: string,
  topicId: string
): string {
  return `/${gradeId}/${subjectId}/${topicId}`;
}

export interface TopicContext {
  grade: Grade;
  subject: Subject;
  section: Section;
  topic: Topic;
}

export function getTopic(
  gradeId: string,
  subjectId: string,
  topicId: string
): TopicContext | undefined {
  const found = getSubject(gradeId, subjectId);
  if (!found) return undefined;
  for (const section of found.subject.sections) {
    const topic = section.topics.find((t) => t.id === topicId);
    if (topic) return { ...found, section, topic };
  }
  return undefined;
}

/** Темите на предмета в учебен ред, със секцията им. */
export function flattenTopics(
  subject: Subject
): { section: Section; topic: Topic }[] {
  return subject.sections.flatMap((section) =>
    section.topics.map((topic) => ({ section, topic }))
  );
}

export function getAdjacentTopics(
  subject: Subject,
  topicId: string
): {
  prev?: { section: Section; topic: Topic };
  next?: { section: Section; topic: Topic };
} {
  const all = flattenTopics(subject);
  const index = all.findIndex((entry) => entry.topic.id === topicId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}

export function formatWeeks(weeks: WeekRange): string {
  return weeks.from === weeks.to
    ? `Седмица ${weeks.from}`
    : `Седмици ${weeks.from}–${weeks.to}`;
}

const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function toRoman(value: number): string {
  let rest = value;
  let result = "";
  for (const [num, sym] of ROMAN) {
    while (rest >= num) {
      result += sym;
      rest -= num;
    }
  }
  return result;
}

/** Общ брой теми в предмет — за карти и обобщения. */
export function countTopics(subject: Subject): number {
  return subject.sections.reduce(
    (sum, section) => sum + section.topics.length,
    0
  );
}
