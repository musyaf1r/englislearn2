"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { BuildGameData, ChoiceGameData } from "@/lib/content";
import { shuffleNotSame } from "@/lib/shuffle";
import { speak } from "@/lib/speech";
import { VisualView } from "./art";
import { Button, Icon, Panel, ProgressBar } from "./ui";

export function SpeakButton({ text, label = "Dengarkan" }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={`${label}: ${text}`}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-sea-soft text-ink focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-0.5"
    >
      <Icon name="speaker" className="size-6" />
    </button>
  );
}

function Feedback({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      role="status"
      className={`mt-4 flex items-start gap-3 rounded-xl border-[3px] border-ink p-3 ${
        ok ? "bg-palm-soft" : "bg-sand"
      }`}
    >
      <span
        className={`mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border-[3px] border-ink ${
          ok ? "bg-palm text-white" : "bg-coral text-white"
        }`}
      >
        <Icon name={ok ? "check" : "x"} className="size-5" />
      </span>
      <div>
        <p className="font-display text-xl font-bold leading-tight">{ok ? "Benar!" : "Belum tepat."}</p>
        <p className="text-base">{children}</p>
      </div>
    </div>
  );
}

export function GameResult({
  score,
  total,
  onRetry,
  footer,
}: {
  score: number;
  total: number;
  onRetry: () => void;
  footer?: ReactNode;
}) {
  const ratio = score / total;
  const message =
    ratio === 1 ? "Sempurna, semua benar." : ratio >= 0.6 ? "Bagus sekali." : "Ayo coba sekali lagi supaya makin lancar.";
  return (
    <Panel className="text-center">
      <p className="font-display text-xl font-bold">Game selesai</p>
      <p className="mt-1 font-display text-6xl font-extrabold leading-none text-sea">
        {score}
        <span className="text-3xl text-ink"> / {total}</span>
      </p>
      <p className="mt-3">{message}</p>
      <div className="mt-5 flex flex-col gap-3">
        {footer}
        <Button variant="plain" onClick={onRetry}>
          <Icon name="retry" className="size-5" />
          Main lagi
        </Button>
      </div>
    </Panel>
  );
}

export function ChoiceGame({
  data,
  footer,
  onFinish,
}: {
  data: ChoiceGameData;
  footer?: ReactNode;
  onFinish?: (score: number) => void;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = data.rounds.length;
  const round = data.rounds[i];
  const answered = picked !== null;
  const correct = picked === round.answer;
  const visualOptions = round.options.some((o) => o.visual);

  function choose(idx: number) {
    if (answered) return;
    setPicked(idx);
    if (idx === round.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 < total) {
      setI(i + 1);
      setPicked(null);
    } else {
      setDone(true);
      onFinish?.(score);
    }
  }

  function restart() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) return <GameResult score={score} total={total} onRetry={restart} footer={footer} />;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold">
          Soal {i + 1} dari {total}
        </p>
        <div className="w-32">
          <ProgressBar value={i + (answered ? 1 : 0)} max={total} />
        </div>
      </div>

      <Panel>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold leading-snug">{round.question}</h3>
          {round.speak && <SpeakButton text={round.speak} />}
        </div>
        {round.hint && <p className="mt-1 text-base">{round.hint}</p>}

        {round.visuals && (
          <div className="my-4 flex flex-wrap items-end justify-center gap-4">
            {round.visuals.map((v, k) => (
              <div key={k} className="min-w-0">
                <VisualView visual={v} />
              </div>
            ))}
          </div>
        )}

        <div
          className={`mt-4 grid gap-3 ${
            visualOptions ? "grid-cols-3" : round.options.length === 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {round.options.map((o, idx) => {
            const state = !answered ? "idle" : idx === round.answer ? "right" : idx === picked ? "wrong" : "dim";
            const tone =
              state === "right"
                ? "bg-palm text-white"
                : state === "wrong"
                  ? "bg-coral text-white"
                  : state === "dim"
                    ? "bg-white opacity-55"
                    : "bg-white";
            return (
              <button
                key={idx}
                type="button"
                onClick={() => choose(idx)}
                disabled={answered}
                aria-label={o.aria}
                className={`relative flex min-h-16 items-center justify-center gap-2 rounded-xl border-[3px] border-ink p-2 font-display text-xl font-bold shadow-[0_4px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink enabled:active:translate-y-1 enabled:active:shadow-none ${tone}`}
              >
                {o.visual && (
                  <span className="block w-full">
                    <VisualView visual={o.visual} size="sm" />
                  </span>
                )}
                {o.label}
                {state === "right" && <Icon name="check" className="size-6 shrink-0" />}
                {state === "wrong" && <Icon name="x" className="size-6 shrink-0" />}
              </button>
            );
          })}
        </div>

        {answered && <Feedback ok={correct}>{round.explain}</Feedback>}
      </Panel>

      {answered && (
        <div className="mt-4">
          <Button onClick={next} className="w-full">
            {i + 1 < total ? "Lanjut" : "Lihat hasil"}
            <Icon name="right" className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function WordBuilder({
  pool,
  chosen,
  onChange,
  locked = false,
  tail = ".",
}: {
  pool: string[];
  chosen: number[];
  onChange: (next: number[]) => void;
  locked?: boolean;
  tail?: string;
}) {
  return (
    <div>
      <div
        className="flex min-h-16 flex-wrap items-center gap-2 rounded-xl border-[3px] border-dashed border-ink bg-sand p-3"
        aria-label="Kalimatmu"
      >
        {chosen.length === 0 && <span className="text-base opacity-70">Ketuk kata di bawah ini</span>}
        {chosen.map((poolIdx, pos) => (
          <button
            key={`${poolIdx}-${pos}`}
            type="button"
            disabled={locked}
            onClick={() => onChange(chosen.filter((_, k) => k !== pos))}
            className="rounded-lg border-[3px] border-ink bg-white px-3 py-1 font-display text-xl font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {pool[poolIdx]}
          </button>
        ))}
        {chosen.length > 0 && <span className="font-display text-xl font-bold">{tail}</span>}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {pool.map((w, idx) => {
          const used = chosen.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              disabled={used || locked}
              onClick={() => onChange([...chosen, idx])}
              className={`rounded-lg border-[3px] border-ink px-3 py-1 font-display text-xl font-bold shadow-[0_3px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink enabled:active:translate-y-0.5 enabled:active:shadow-none ${
                used ? "bg-sand-deep opacity-40 shadow-none" : "bg-sea-soft"
              }`}
            >
              {w}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BuildGame({
  data,
  footer,
  onFinish,
}: {
  data: BuildGameData;
  footer?: ReactNode;
  onFinish?: (score: number) => void;
}) {
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = data.rounds.length;
  const round = data.rounds[i];
  const pools = useMemo(
    () => data.rounds.map((r, k) => shuffleNotSame(r.words, r.extra ?? [], k + 3)),
    [data],
  );
  const pool = pools[i];
  const answer = round.words.join(" ");
  const locked = checked !== null;

  function check() {
    const sentence = chosen.map((k) => pool[k]).join(" ");
    const ok = sentence === answer;
    setChecked(ok);
    if (ok) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 < total) {
      setI(i + 1);
      setChosen([]);
      setChecked(null);
    } else {
      setDone(true);
      onFinish?.(score);
    }
  }

  function restart() {
    setI(0);
    setChosen([]);
    setChecked(null);
    setScore(0);
    setDone(false);
  }

  if (done) return <GameResult score={score} total={total} onRetry={restart} footer={footer} />;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold">
          Soal {i + 1} dari {total}
        </p>
        <div className="w-32">
          <ProgressBar value={i + (locked ? 1 : 0)} max={total} />
        </div>
      </div>

      <Panel>
        <p className="text-base">Susun kalimat bahasa Inggris untuk:</p>
        <h3 className="mt-1 font-display text-2xl font-bold leading-snug">{round.meaning}</h3>

        <div className="mt-4">
          <WordBuilder pool={pool} chosen={chosen} onChange={setChosen} locked={locked} />
        </div>

        {checked === null ? (
          <div className="mt-4 flex gap-3">
            <Button variant="plain" onClick={() => setChosen([])} disabled={chosen.length === 0}>
              Ulang
            </Button>
            <Button onClick={check} disabled={chosen.length < round.words.length} className="flex-1">
              Periksa
            </Button>
          </div>
        ) : (
          <>
            <Feedback ok={checked}>
              {checked ? "" : `Jawaban yang benar: ${answer}. `}
              {round.explain}
            </Feedback>
            <div className="mt-3 flex items-center gap-3">
              <SpeakButton text={`${answer}.`} />
              <span className="text-base">Dengarkan kalimatnya.</span>
            </div>
          </>
        )}
      </Panel>

      {locked && (
        <div className="mt-4">
          <Button onClick={next} className="w-full">
            {i + 1 < total ? "Lanjut" : "Lihat hasil"}
            <Icon name="right" className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
