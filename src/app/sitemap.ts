import type { MetadataRoute } from "next";
import {
  flattenTopics,
  getAvailableGrades,
  subjectPath,
  topicPath,
} from "@/lib/curriculum";
import { GAMES_PATH, gamePath, getGames } from "@/lib/games";

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

  const gamePages = getGames().map((game) => ({
    url: `${BASE_URL}${gamePath(game.id)}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...subjectPages,
    ...topicPages,
    {
      url: `${BASE_URL}${GAMES_PATH}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...gamePages,
  ];
}
