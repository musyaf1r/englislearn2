"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LESSONS } from "@/lib/content";
import { useAppState } from "@/lib/store";
import { TONE_BG } from "./LessonRunner";
import { Icon, LinkButton, Page, ProgressBar } from "./ui";

export function Hub() {
  const router = useRouter();
  const { state, ready } = useAppState();

  useEffect(() => {
    if (ready && !state.name) router.replace("/");
  }, [ready, state.name, router]);

  if (!ready || !state.name) {
    return (
      <Page>
        <p className="py-16 text-center font-display text-xl font-bold">Sebentar ya...</p>
      </Page>
    );
  }

  const doneCount = LESSONS.filter((l) => state.done.includes(l.slug)).length;
  const allDone = doneCount === LESSONS.length;

  return (
    <Page>
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 font-display text-lg font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Icon name="home" className="size-5" />
        Beranda
      </Link>

      <h1 className="font-display text-4xl font-extrabold leading-tight">Halo, {state.name}</h1>
      <p className="mt-1">Selesaikan keempat materi, lalu kerjakan soal uji.</p>

      <div className="mt-4 rounded-2xl border-[3px] border-ink bg-white p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="font-display text-lg font-bold">Kemajuanmu</p>
          <p className="font-display text-lg font-bold">
            {doneCount} dari {LESSONS.length} materi
          </p>
        </div>
        <ProgressBar value={doneCount} max={LESSONS.length} />
      </div>

      <ul className="mt-5 space-y-3">
        {LESSONS.map((l) => {
          const done = state.done.includes(l.slug);
          return (
            <li key={l.slug}>
              <Link
                href={`/belajar/${l.slug}`}
                className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-white p-3 shadow-[0_4px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-1 active:shadow-none"
              >
                <span
                  className={`inline-flex size-14 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink font-display text-3xl font-extrabold ${TONE_BG[l.tone]}`}
                >
                  {l.no}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-bold leading-tight">{l.title}</span>
                  <span className="block text-base leading-snug">{l.blurb}</span>
                </span>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full border-[3px] border-ink px-2 py-0.5 font-display text-sm font-bold ${
                    done ? "bg-palm text-white" : "bg-sand"
                  }`}
                >
                  {done && <Icon name="check" className="size-4" />}
                  {done ? "Selesai" : "Belum"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-2xl border-[3px] border-ink bg-sand p-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex size-14 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink ${
              allDone ? "bg-sun" : "bg-white"
            }`}
          >
            <Icon name={allDone ? "star" : "lock"} filled={allDone} className="size-8" />
          </span>
          <div>
            <p className="font-display text-xl font-bold leading-tight">Soal Uji</p>
            <p className="text-base leading-snug">
              {allDone
                ? "20 soal untuk menguji pemahamanmu."
                : `Selesaikan ${LESSONS.length - doneCount} materi lagi untuk membukanya.`}
            </p>
          </div>
        </div>
        {allDone && (
          <div className="mt-4">
            <LinkButton href="/ujian" className="w-full">
              Kerjakan soal uji
              <Icon name="right" className="size-5" />
            </LinkButton>
            {state.best !== null && (
              <p className="mt-3 text-center font-display text-lg font-bold">Nilai terbaikmu: {state.best}</p>
            )}
          </div>
        )}
      </div>
    </Page>
  );
}
