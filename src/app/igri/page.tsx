import type { Metadata } from "next";
import Link from "next/link";
import { GAMES_PATH, gamePath, getGames } from "@/lib/games";

const description =
  "Учебни игри за паралелка „Разработка на софтуер“ — игровизация в часа: отборни мисии, точки, жокери и значки, които упражняват материала от уроците.";

export const metadata: Metadata = {
  title: "Учебни игри",
  description,
  alternates: { canonical: GAMES_PATH },
  openGraph: {
    title: "Учебни игри · Разработка на софтуер",
    description,
    url: GAMES_PATH,
  },
};

export default function GamesPage() {
  const games = getGames();

  return (
    <main>
      {/* Херо */}
      <section className="cyber-grid border-b border-edge">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Игровизация
          </p>
          <h1 className="text-glow mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            Учебни игри
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Материалът от уроците — като мисия за отбора. Събирайте точки,
            пазете жокерите и отключвайте значки. Всичко работи в браузъра,
            без регистрация.
          </p>
        </div>
      </section>

      {/* Каталог */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-faint uppercase">
          Избери игра
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {games.map((game) => (
            <Link
              key={game.id}
              href={gamePath(game.id)}
              className="group glow-teal flex flex-col rounded-xl border border-edge-bright bg-surface p-6 transition-colors hover:border-accent-dim"
            >
              <span className="font-mono text-[12px] text-faint">
                {[game.subject, game.grade].filter(Boolean).join(" · ")} ·{" "}
                {game.format}
              </span>
              <span className="mt-2 text-2xl font-bold text-foreground group-hover:text-accent-bright">
                {game.title}
              </span>
              <span className="mt-3 flex-1 text-sm text-muted">
                {game.tagline}
              </span>
              <span className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
                {game.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-full border border-edge bg-surface-raised px-3 py-1 text-muted"
                  >
                    {concept}
                  </span>
                ))}
              </span>
              <span className="mt-6 font-semibold text-accent group-hover:text-accent-bright">
                Играй →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
