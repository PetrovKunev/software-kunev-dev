import type { MetadataRoute } from "next";
import { getAvailableGrades, subjectPath } from "@/lib/curriculum";

const BASE_URL = "https://software.kunev.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const subjectPages = getAvailableGrades().flatMap((grade) =>
    grade.subjects.map((subject) => ({
      url: `${BASE_URL}${subjectPath(grade.id, subject.id)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...subjectPages,
  ];
}
