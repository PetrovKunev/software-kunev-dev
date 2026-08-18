import type { TopicMaterials } from "@/data/types";
import { tema1 } from "./8/digitalni-tehnologii/tema-1";
import { tema2 } from "./8/digitalni-tehnologii/tema-2";
import { tema3 } from "./8/digitalni-tehnologii/tema-3";
import { tema4 } from "./8/digitalni-tehnologii/tema-4";
import { tema5 } from "./8/digitalni-tehnologii/tema-5";
import { tema6 } from "./8/digitalni-tehnologii/tema-6";

/**
 * Регистър на материалите по теми.
 *
 * Ключ: `<клас>/<предмет>/<тема>`, напр. "8/digitalni-tehnologii/tema-1".
 * Добавяне на материали за нова тема:
 *   1. Създайте src/data/materials/<клас>/<предмет>/<тема>.ts с export на TopicMaterials.
 *   2. Импортирайте го тук и го добавете в обекта.
 * Теорията (дълъг текст) се добавя отделно като content/<клас>/<предмет>/<тема>/teoria.mdx.
 */
export const materialsRegistry: Record<string, TopicMaterials> = {
  "8/digitalni-tehnologii/tema-1": tema1,
  "8/digitalni-tehnologii/tema-2": tema2,
  "8/digitalni-tehnologii/tema-3": tema3,
  "8/digitalni-tehnologii/tema-4": tema4,
  "8/digitalni-tehnologii/tema-5": tema5,
  "8/digitalni-tehnologii/tema-6": tema6,
};
