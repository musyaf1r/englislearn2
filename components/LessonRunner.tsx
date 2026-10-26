"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { GAMES, LESSONS, type Slug, type Tone } from "@/lib/content";
import { markLessonDone, useAppState } from "@/lib/store";
import { BuildGame, ChoiceGame } from "./games";
import { LessonLearn } from "./lesson";
import { Button, Icon, LinkButton, Page } from "./ui";

export const TONE_BG: Record<Tone, string> = {
  sea: "bg-sea text-white",
  coral: "bg-coral text-white",
  palm: "bg-palm text-white",
  sun: "bg-sun text-ink",
};

const STEPS = ["Belajar", "Game 1", "Game 2"];

export function LessonRunner({ slug }: { slug: Slug }) {
  const router = useRouter();
  const { state, ready } = useAppState();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);

  const lesson = LESSONS.find((l) => l.slug === slug)!;
  const [game1, game2] = GAMES[slug];
  const alreadyDone = state.done.includes(slug);

  useEffect(() => {
    if (ready && !state.name) router.replace("/");
  }, [ready, state.name, router]);

  function go(n: number) {
    setStep(n);
    setReached((r) => Math.max(r, n));
    window.scrollTo({ top: 0 });
  }

  if (!ready || !state.name) {
    return (
      <Page>
        <p className="py-16 text-center font-display text-xl font-bold">Sebentar ya...</p>
      </Page>
    );
  }

  const renderGame = (game: typeof game1, footer: ReactNode, onFinish?: () => void) =>
    game.type === "choice" ? (
      <ChoiceGame key={`${slug}-${step}`} data={game} footer={footer} onFinish={onFinish} />
    ) : (
      <BuildGame key={`${slug}-${step}`} data={game} footer={footer} onFinish={onFinish} />
    );

  return (
    <Page>
      <Link
        href="/belajar"
        className="mb-4 inline-flex items-center gap-1 font-display text-lg font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Icon name="left" className="size-5" />
        Daftar materi
      </Link>

      <header className="mb-4 flex items-center gap-3">
        <span
          className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink font-display text-2xl font-extrabold ${TONE_BG[lesson.tone]}`}
        >
          {lesson.no}
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-extrabold leading-tight">{lesson.title}</h1>
          <p className="text-base">{lesson.id}</p>
        </div>
      </header>

      <nav aria-label="Langkah materi" className="mb-5 grid grid-cols-3 gap-2">
        {STEPS.map((label, n) => {
          const open = alreadyDone || n <= reached;
          return (
            <button
              key={label}
              type="button"
              disabled={!open}
              onClick={() => go(n)}
              aria-current={step === n ? "step" : undefined}
              className={`rounded-xl border-[3px] border-ink px-2 py-2 font-display text-base font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                step === n ? "bg-sun" : "bg-white"
              } disabled:opacity-45`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {step === 0 && (
        <div>
          <LessonLearn slug={slug} />
          <div className="mt-6">
            <Button onClick={() => go(1)} className="w-full">
              Mulai Game 1
              <Icon name="right" className="size-5" />
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl font-bold">{game1.title}</h2>
          <p className="mb-4">{game1.intro}</p>
          {renderGame(
            game1,
            <Button onClick={() => go(2)}>
              Lanjut ke Game 2
              <Icon name="right" className="size-5" />
            </Button>,
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-2xl font-bold">{game2.title}</h2>
          <p className="mb-4">{game2.intro}</p>
          {renderGame(
            game2,
            <LinkButton href="/belajar">
              <Icon name="check" className="size-5" />
              Selesai, kembali ke daftar materi
            </LinkButton>,
            () => markLessonDone(slug),
          )}
        </div>
      )}
    </Page>
  );
}
