import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameFrame from "@/components/GameFrame";
import { GAMES_PATH, gamePath, getGame, getGames } from "@/lib/games";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGames().map((game) => ({ game: game.id }));
}

interface GameParams {
  params: Promise<{ game: string }>;
}

export async function generateMetadata({
  params,
}: GameParams): Promise<Metadata> {
  const { game: gameId } = await params;
  const game = getGame(gameId);
  if (!game) return {};
  const path = gamePath(game.id);

  return {
    title: `${game.title} · Учебни игри`,
    description: game.tagline,
    alternates: { canonical: path },
    openGraph: {
      title: `${game.title} · Учебни игри`,
      description: game.tagline,
      url: path,
    },
  };
}

function NotesBlock({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items?: string[];
  ordered?: boolean;
}) {
  if (!items?.length) return null;
  const List = ordered ? "ol" : "ul";

  return (
    <div className="rounded-xl border border-edge bg-surface p-6">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <List
        className={`mt-3 space-y-2 pl-5 text-sm text-muted ${ordered ? "list-decimal" : "list-disc"} marker:text-accent`}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </div>
  );
}

export default async function GamePage({ params }: GameParams) {
  const { game: gameId } = await params;
  const game = getGame(gameId);
  if (!game) notFound();
  const notes = game.teacherNotes;

  return (
    <main className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Трохи */}
        <nav className="font-mono text-[12px] text-faint">
          <Link href="/" className="transition-colors hover:text-accent">
            Начало
          </Link>
          <span className="mx-2">/</span>
          <Link href={GAMES_PATH} className="transition-colors hover:text-accent">
            Игри
          </Link>
          <span className="mx-2">/</span>
          <span className="text-muted">{game.title}</span>
        </nav>

        {/* Заглавие */}
        <header className="mt-6">
          <p className="font-mono text-sm font-bold text-accent">Учебна игра</p>
          <h1 className="text-glow mt-2 text-3xl font-bold sm:text-4xl">
            {game.title}
          </h1>
          <p className="mt-4 max-w-3xl text-muted">{game.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[12px]">
            <span className="rounded-full border border-accent-deep bg-accent-deep/30 px-3 py-1 text-accent-bright">
              {[game.subject, game.grade].filter(Boolean).join(" · ")}
            </span>
            <span className="rounded-full border border-edge bg-surface px-3 py-1 text-muted">
              {game.format}
            </span>
            {game.concepts.map((concept) => (
              <span
                key={concept}
                className="rounded-full border border-edge bg-surface px-3 py-1 text-muted"
              >
                {concept}
              </span>
            ))}
          </div>
          {notes && (
            <nav className="mt-6 flex flex-wrap gap-2">
              <a
                href="#igra"
                className="rounded-lg border border-edge bg-surface px-4 py-2 font-mono text-[12px] text-muted transition-colors hover:border-accent-dim hover:text-accent-bright"
              >
                Играта
              </a>
              <a
                href="#za-uchitelya"
                className="rounded-lg border border-edge bg-surface px-4 py-2 font-mono text-[12px] text-muted transition-colors hover:border-accent-dim hover:text-accent-bright"
              >
                За учителя
              </a>
            </nav>
          )}
        </header>
      </div>

      {/* Играта — по-широка от текста, за да има място за картата с модулите */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <GameFrame src={game.src} title={`Игра „${game.title}“`} />
      </section>

      {notes && (
        <section className="mx-auto mt-14 max-w-5xl px-6">
          <h2 id="za-uchitelya" className="scroll-mt-24 border-b border-edge pb-3">
            <span className="block font-mono text-xs font-bold tracking-[0.25em] text-accent uppercase">
              За учителя
            </span>
            <span className="mt-1 block text-2xl font-bold text-foreground">
              Как се провежда
            </span>
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <NotesBlock title="Цели" items={notes.goals} />
            <NotesBlock title="Ход на играта" items={notes.flow} ordered />
            <NotesBlock title="Точкуване" items={notes.scoring} />
            <NotesBlock title="Практически бележки" items={notes.tips} />
          </div>
        </section>
      )}
    </main>
  );
}
