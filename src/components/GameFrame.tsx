"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Вгражда самостоятелна HTML игра от public/games/ в iframe на цялата
 * височина на екрана, с бутони „Цял екран“ (за проектор) и „Отвори отделно“.
 * Играта е от същия домейн и сама следва светлия/тъмния режим на сайта.
 */
export default function GameFrame({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    // Напр. Safari на iPhone не позволява цял екран за iframe — тогава скриваме бутона.
    setCanFullscreen(Boolean(document.fullscreenEnabled));
  }, []);

  function enterFullscreen() {
    frameRef.current?.requestFullscreen().catch(() => {
      // Браузърът е отказал — играта остава вградена в страницата.
    });
  }

  const buttonClass =
    "rounded-lg border border-edge bg-surface px-4 py-2 font-mono text-[12px] text-muted transition-colors hover:border-accent-dim hover:text-accent-bright";

  return (
    <div id="igra" className="scroll-mt-[4.5rem]">
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        {canFullscreen && (
          <button type="button" onClick={enterFullscreen} className={buttonClass}>
            ⛶ Цял екран
          </button>
        )}
        <a href={src} target="_blank" rel="noopener" className={buttonClass}>
          Отвори в отделен раздел ↗
        </a>
      </div>
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        allow="fullscreen"
        allowFullScreen
        className="block h-[calc(100dvh-5rem)] min-h-[560px] w-full rounded-xl border border-edge-bright bg-surface"
      />
    </div>
  );
}
