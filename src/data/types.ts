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
  /** Акценти от учебната програма — при 3-седмичен диапазон обикновено по един на седмица. */
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
