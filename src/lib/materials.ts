import { materialsRegistry } from "@/data/materials";
import type { TopicMaterials } from "@/data/types";

export function materialsKey(
  gradeId: string,
  subjectId: string,
  topicId: string
): string {
  return `${gradeId}/${subjectId}/${topicId}`;
}

export function getMaterials(
  gradeId: string,
  subjectId: string,
  topicId: string
): TopicMaterials | undefined {
  return materialsRegistry[materialsKey(gradeId, subjectId, topicId)];
}
