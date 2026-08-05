import type { MetadataRoute } from "next";
import {
  flattenTopics,
  getAvailableGrades,
  subjectPath,
  topicPath,
} from "@/lib/curriculum";

const BASE_URL = "https://software.kunev.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const subjectPages = getAvailableGrades().flatMap((grade) =>
    grade.subjects.map((subject) => ({
      url: `${BASE_URL}${subjectPath(grade.id, subject.id)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const topicPages = getAvailableGrades().flatMap((grade) =>
    grade.subjects.flatMap((subject) =>
      flattenTopics(subject).map(({ topic }) => ({
        url: `${BASE_URL}${topicPath(grade.id, subject.id, topic.id)}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    )
  );

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...subjectPages,
    ...topicPages,
  ];
}
