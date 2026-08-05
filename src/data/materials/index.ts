import type { TopicMaterials } from "@/data/types";
import { tema1 } from "./8/digitalni-tehnologii/tema-1";

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
};
