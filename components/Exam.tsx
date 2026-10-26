"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LESSONS } from "@/lib/content";
import { EXAM, PARTS, type ExamQuestion } from "@/lib/exam";
import { shuffleNotSame } from "@/lib/shuffle";
import { saveBestScore, useAppState } from "@/lib/store";
import { WordBuilder } from "./games";
import { Button, Icon, LinkButton, Page, Panel, ProgressBar } from "./ui";

const POINTS = 100 / EXAM.length;

type Ans =
  | { t: "choice"; v: number | null }
  | { t: "tf"; v: boolean | null }
  | { t: "fill"; v: string }
  | { t: "build"; v: number[] }
  | { t: "multi"; v: string[] };

const POOLS: string[][] = EXAM.map((q, i) => (q.type === "build" ? shuffleNotSame(q.words, q.extra, i + 5) : []));

function initial(q: ExamQuestion): Ans {
  switch (q.type) {
    case "choice":
      return { t: "choice", v: null };
    case "tf":
      return { t: "tf", v: null };
    case "fill":
      return { t: "fill", v: "" };
    case "build":
      return { t: "build", v: [] };
    case "multi":
      return { t: "multi", v: [] };
  }
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function isAnswered(q: ExamQuestion, a: Ans): boolean {
  switch (a.t) {
    case "choice":
    case "tf":
      return a.v !== null;
    case "fill":
      return a.v.trim().length > 0;
    case "build":
      return q.type === "build" && a.v.length >= q.words.length;
    case "multi":
      return a.v.length === 2;
  }
}

function isCorrect(q: ExamQuestion, a: Ans, index: number): boolean {
  if (q.type === "choice" && a.t === "choice") return a.v === q.answer;
  if (q.type === "tf" && a.t === "tf") return a.v === q.answer;
  if (q.type === "fill" && a.t === "fill") return q.answers.some((x) => norm(x) === norm(a.v));
  if (q.type === "build" && a.t === "build")
    return a.v.map((k) => POOLS[index][k]).join(" ") === q.words.join(" ");
  if (q.type === "multi" && a.t === "multi")
    return a.v.length === q.answers.length && q.answers.every((x) => a.v.includes(x));
  return false;
}

function correctText(q: ExamQuestion): string {
  switch (q.type) {
    case "choice":
      return q.options[q.answer];
    case "tf":
      return q.answer ? "True" : "False";
    case "fill":
      return q.answers[0];
    case "build":
      return `${q.words.join(" ")}.`;
    case "multi":
      return q.answers.join(", ");
  }
}

function questionText(q: ExamQuestion): string {
  switch (q.type) {
    case "choice":
    case "tf":
    case "multi":
      return q.prompt;
    case "fill":
      return `${q.before} ____ ${q.after}`.trim();
    case "build":
      return `${q.prompt} ${q.meaning}`;
  }
}

const LETTERS = ["a", "b", "c", "d"];

function QuestionBody({ q, a, index, onChange }: { q: ExamQuestion; a: Ans; index: number; onChange: (a: Ans) => void }) {
  if (q.type === "choice" && a.t === "choice") {
    return (
      <div>
        <p className="font-display text-2xl font-bold leading-snug">{q.prompt}</p>
        <div className="mt-4 grid gap-3">
          {q.options.map((o, k) => (
            <button
              key={o}
              type="button"
              onClick={() => onChange({ t: "choice", v: k })}
              aria-pressed={a.v === k}
              className={`flex items-center gap-3 rounded-xl border-[3px] border-ink px-3 py-3 text-left font-display text-xl font-bold shadow-[0_4px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-1 active:shadow-none ${
                a.v === k ? "bg-sun" : "bg-white"
              }`}
            >
              <span
                className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border-[3px] border-ink ${
                  a.v === k ? "bg-ink text-white" : "bg-sand"
                }`}
              >
                {LETTERS[k]}
              </span>
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (q.type === "tf" && a.t === "tf") {
    return (
      <div>
        <p className="font-display text-2xl font-bold leading-snug">{q.prompt}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: "True", sub: "Benar", value: true },
            { label: "False", sub: "Salah", value: false },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => onChange({ t: "tf", v: o.value })}
              aria-pressed={a.v === o.value}
              className={`rounded-xl border-[3px] border-ink px-3 py-4 font-display text-2xl font-extrabold leading-tight shadow-[0_4px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-1 active:shadow-none ${
                a.v === o.value ? "bg-sun" : "bg-white"
              }`}
            >
              {o.label}
              <span className="block font-sans text-base font-normal">{o.sub}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (q.type === "fill" && a.t === "fill") {
    return (
      <div>
        <p className="font-display text-2xl font-bold leading-[2.4rem]">
          {q.before}{" "}
          <input
            type="text"
            value={a.v}
            onChange={(e) => onChange({ t: "fill", v: e.target.value })}
            aria-label="Jawabanmu"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            maxLength={14}
            className="mx-1 inline-block w-36 rounded-lg border-[3px] border-ink bg-sand px-2 py-0.5 text-center font-display text-2xl font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
          />{" "}
          {q.after}
        </p>
        <p className="mt-4 text-base">Ketik jawabanmu, atau ketuk salah satu kata:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {q.options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => onChange({ t: "fill", v: o })}
              className={`rounded-lg border-[3px] border-ink px-3 py-1 font-display text-xl font-bold shadow-[0_3px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-0.5 active:shadow-none ${
                norm(a.v) === norm(o) ? "bg-sun" : "bg-sea-soft"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (q.type === "build" && a.t === "build") {
    return (
      <div>
        <p className="font-display text-2xl font-bold leading-snug">{q.prompt}</p>
        <p className="mt-1 text-lg">{q.meaning}</p>
        <div className="mt-4">
          <WordBuilder pool={POOLS[index]} chosen={a.v} onChange={(v) => onChange({ t: "build", v })} />
        </div>
      </div>
    );
  }

  if (q.type === "multi" && a.t === "multi") {
    const toggle = (o: string) => {
      if (a.v.includes(o)) onChange({ t: "multi", v: a.v.filter((x) => x !== o) });
      else if (a.v.length < 2) onChange({ t: "multi", v: [...a.v, o] });
    };
    return (
      <div>
        <p className="font-display text-2xl font-bold leading-snug">{q.prompt}</p>
        <p className="mt-1 text-base">{q.hint}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {q.options.map((o) => {
            const on = a.v.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                aria-pressed={on}
                className={`flex items-center justify-center gap-2 rounded-xl border-[3px] border-ink px-3 py-3 font-display text-xl font-bold shadow-[0_4px_0_0_var(--color-ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-1 active:shadow-none ${
                  on ? "bg-sun" : "bg-white"
                }`}
              >
                {on && <Icon name="check" className="size-5" />}
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export function Exam() {
  const router = useRouter();
  const { state, ready } = useAppState();
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Ans[]>(() => EXAM.map(initial));

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

  const allDone = LESSONS.every((l) => state.done.includes(l.slug));
  if (!allDone) {
    return (
      <Page>
        <Panel className="text-center">
          <span className="mx-auto inline-flex size-16 items-center justify-center rounded-xl border-[3px] border-ink bg-sand">
            <Icon name="lock" className="size-9" />
          </span>
          <h1 className="mt-3 font-display text-2xl font-extrabold">Soal uji belum terbuka</h1>
          <p className="mt-1">Selesaikan semua materi dan game dulu, ya.</p>
          <div className="mt-4">
            <LinkButton href="/belajar">Kembali ke materi</LinkButton>
          </div>
        </Panel>
      </Page>
    );
  }

  const total = EXAM.length;
  const q = EXAM[i];
  const a = answers[i];
  const part = PARTS[q.part];
  const firstOfPart = i === 0 || EXAM[i - 1].part !== q.part;

  function setAnswer(next: Ans) {
    setAnswers((prev) => prev.map((x, k) => (k === i ? next : x)));
  }

  function goTo(n: number) {
    setI(n);
    window.scrollTo({ top: 0 });
  }

  function finish() {
    const correct = EXAM.filter((qq, k) => isCorrect(qq, answers[k], k)).length;
    saveBestScore(Math.round(correct * POINTS));
    setPhase("result");
    window.scrollTo({ top: 0 });
  }

  function restart() {
    setAnswers(EXAM.map(initial));
    setI(0);
    setPhase("intro");
    window.scrollTo({ top: 0 });
  }

  if (phase === "intro") {
    return (
      <Page>
        <h1 className="font-display text-4xl font-extrabold leading-tight">Soal Uji</h1>
        <Panel className="mt-4">
          <ul className="space-y-2 text-lg">
            <li>Ada 20 soal dalam 4 bagian.</li>
            <li>Setiap soal bernilai 5 poin. Nilai penuh 100.</li>
            <li>Jawaban benar dan salah baru kelihatan di akhir.</li>
            <li>Kamu boleh kembali ke soal sebelumnya.</li>
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Button onClick={() => setPhase("quiz")}>
              Mulai
              <Icon name="right" className="size-5" />
            </Button>
            <LinkButton href="/belajar" variant="plain">
              Kembali ke materi
            </LinkButton>
          </div>
        </Panel>
      </Page>
    );
  }

  if (phase === "result") {
    const results = EXAM.map((qq, k) => isCorrect(qq, answers[k], k));
    const correct = results.filter(Boolean).length;
    const score = Math.round(correct * POINTS);
    const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
    const message =
      score >= 90
        ? "Luar biasa, bahasa Inggrismu hebat."
        : score >= 70
          ? "Bagus sekali, sedikit lagi sempurna."
          : score >= 50
            ? "Lumayan. Baca materinya sekali lagi supaya makin lancar."
            : "Jangan menyerah. Ulangi materinya, lalu coba lagi.";
    const wrong = EXAM.map((qq, k) => ({ qq, k })).filter(({ k }) => !results[k]);

    return (
      <Page>
        <Panel className="text-center">
          <p className="font-display text-xl font-bold">Hasil {state.name}</p>
          <p className="mt-1 font-display text-7xl font-extrabold leading-none text-sea">{score}</p>
          <p className="mt-1 text-base">
            {correct} dari {total} soal benar
          </p>
          <div className="mt-3 flex justify-center gap-1" role="img" aria-label={`${stars} dari 3 bintang`}>
            {[0, 1, 2].map((s) => (
              <Icon
                key={s}
                name="star"
                filled
                className={`size-10 ${s < stars ? "text-sun [stroke:var(--color-ink)]" : "text-sand-deep"}`}
              />
            ))}
          </div>
          <p className="mt-3 font-display text-xl font-bold leading-snug">{message}</p>
          <div className="mt-5 flex flex-col gap-3">
            <Button onClick={restart}>
              <Icon name="retry" className="size-5" />
              Kerjakan lagi
            </Button>
            <LinkButton href="/belajar" variant="plain">
              Kembali ke materi
            </LinkButton>
          </div>
        </Panel>

        {wrong.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-2xl font-bold">Soal yang perlu dipelajari lagi</h2>
            <ul className="mt-3 space-y-3">
              {wrong.map(({ qq, k }) => (
                <li key={k} className="rounded-xl border-[3px] border-ink bg-white p-3">
                  <p className="text-base">Soal {k + 1}</p>
                  <p className="font-display text-xl font-bold leading-snug">{questionText(qq)}</p>
                  <p className="mt-1 flex items-start gap-2 text-lg">
                    <Icon name="check" className="mt-1 size-5 shrink-0 text-palm" />
                    <span>
                      Jawaban benar: <strong>{correctText(qq)}</strong>
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Page>
    );
  }

  const last = i === total - 1;
  const ok = isAnswered(q, a);

  return (
    <Page>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold">
          Soal {i + 1} dari {total}
        </p>
        <div className="w-32">
          <ProgressBar value={i} max={total} />
        </div>
      </div>

      {firstOfPart && (
        <div className="mb-3 rounded-xl border-[3px] border-ink bg-sea p-3 text-white">
          <p className="font-display text-xl font-bold leading-tight">
            Part {part.roman}. {part.title}
          </p>
          <p className="text-base">{part.help}</p>
        </div>
      )}

      <Panel>
        <QuestionBody q={q} a={a} index={i} onChange={setAnswer} />
      </Panel>

      <div className="mt-4 flex gap-3">
        <Button variant="plain" onClick={() => goTo(i - 1)} disabled={i === 0} aria-label="Soal sebelumnya">
          <Icon name="left" className="size-5" />
        </Button>
        {last ? (
          <Button onClick={finish} disabled={!ok} className="flex-1">
            Selesai
            <Icon name="check" className="size-5" />
          </Button>
        ) : (
          <Button onClick={() => goTo(i + 1)} disabled={!ok} className="flex-1">
            Lanjut
            <Icon name="right" className="size-5" />
          </Button>
        )}
      </div>
      {!ok && <p className="mt-2 text-center text-base">Jawab dulu untuk lanjut.</p>}
    </Page>
  );
}
