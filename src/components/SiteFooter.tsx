export default function SiteFooter() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-center text-sm text-faint sm:flex-row sm:justify-between sm:text-left">
        <p>
          Паралелка „Разработка на софтуер“ · код 061303 · направление 0613
        </p>
        <p className="font-mono text-[12px]">
          <a
            href="https://kunev.dev"
            className="transition-colors hover:text-accent"
          >
            kunev.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
