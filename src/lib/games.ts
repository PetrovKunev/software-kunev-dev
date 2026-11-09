import { games } from "@/data/games";
import type { Game } from "@/data/types";

export const GAMES_PATH = "/igri";

export function getGames(): Game[] {
  return games;
}

export function getGame(gameId: string): Game | undefined {
  return games.find((game) => game.id === gameId);
}

export function gamePath(gameId: string): string {
  return `${GAMES_PATH}/${gameId}`;
}
