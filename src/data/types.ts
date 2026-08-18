/**
 * Модел на данните за учебната програма.
 *
 * Йерархия: клас → предмет → раздел → тема → седмици (теория/практика).
 * Разширяема за следващи години: нов клас или нов предмет се добавя
 * само с данни в src/data/curriculum.ts, без промени по компонентите.
 */

export interface WeekRange {
  from: number;
  to: number;
}

/** Теория или практика в рамките на една тема. */
export interface TopicStrand {
  /**
   * Акценти от учебната програма — по един на двуседмичен цикъл.
   * Часът е 1 седмично с редуване: items[i] от теорията се взема в седмица
   * weeks.from + 2i, а съответният items[i] от практиката — седмица по-късно.
   */
  items: string[];
}

export interface Topic {
  /** Стабилен идентификатор, напр. "tema-1". */
  id: string;
  number: number;
  title: string;
  weeks: WeekRange;
  theory: TopicStrand;
  practice: TopicStrand;
}

export interface Section {
  /** Стабилен идентификатор, напр. "razdel-1". */
  id: string;
  number: number;
  title: string;
  topics: Topic[];
}

export interface SubjectHours {
  theory: number;
  practice: number;
}

export interface Subject {
  /** URL slug, напр. "digitalni-tehnologii". */
  id: string;
  name: string;
  /** Кратко описание за карти и metadata. */
  tagline: string;
  hours: SubjectHours;
  /** Нормативно основание — учебна програма/ТУП. */
  frameworkNote?: string;
  sections: Section[];
}

export interface Grade {
  /** URL сегмент, напр. "8". */
  id: string;
  number: number;
  /** Показвано име, напр. "VIII клас". */
  label: string;
  /** false → показва се като „очаквайте скоро“, без страници. */
  available: boolean;
  /** Пояснение за неактивните класове. */
  comingSoonNote?: string;
  subjects: Subject[];
}

export interface Curriculum {
  grades: Grade[];
}

/* ---------------------------------------------------------------------------
 * Материали към тема: тест за самопроверка и практически задачи.
 * Дългият учебен текст (теория) живее отделно като MDX файл:
 * content/<клас>/<предмет>/<тема>/teoria.mdx
 * ------------------------------------------------------------------------- */

export interface QuizQuestion {
  id: string;
  text: string;
  choices: string[];
  /** 0-базирани индекси на верните отговори; един елемент = единичен избор. */
  correct: number[];
  /** Показва се след проверката. */
  explanation?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface PracticeTask {
  id: string;
  title: string;
  /** Какво трябва да се постигне. */
  goal: string;
  steps: string[];
  /** Какво се предава/показва като краен резултат. */
  deliverable?: string;
  hint?: string;
}

/** Домашна работа — задача за самостоятелна подготовка към една седмица от темата. */
export interface HomeworkAssignment {
  id: string;
  /**
   * Учебна седмица от годината, в диапазона weeks на темата — седмицата
   * с часа по теория; домашното се проверява в часа по практика след нея.
   */
  week: number;
  title: string;
  /** Какво се очаква ученикът да направи самостоятелно. */
  description: string;
  steps?: string[];
  /** Какво се носи/показва в следващия час. */
  deliverable?: string;
  hint?: string;
}

export interface TopicMaterials {
  quiz?: Quiz;
  tasks?: PracticeTask[];
  homework?: HomeworkAssignment[];
}
