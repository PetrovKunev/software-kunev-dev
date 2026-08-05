import fs from "fs";
import path from "path";

/**
 * Дългите учебни текстове (теория) живеят като MDX файлове извън кода:
 * content/<клас>/<предмет>/<тема>/teoria.mdx
 * Четат се при build (страниците са статични).
 */
function theoryFilePath(
  gradeId: string,
  subjectId: string,
  topicId: string
): string {
  return path.join(process.cwd(), "content", gradeId, subjectId, topicId, "teoria.mdx");
}

export function hasTheory(
  gradeId: string,
  subjectId: string,
  topicId: string
): boolean {
  return fs.existsSync(theoryFilePath(gradeId, subjectId, topicId));
}

export function readTheory(
  gradeId: string,
  subjectId: string,
  topicId: string
): string | null {
  try {
    return fs.readFileSync(theoryFilePath(gradeId, subjectId, topicId), "utf8");
  } catch {
    return null;
  }
}
