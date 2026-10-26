"use client";

import { useState, type ReactNode } from "react";
import type { BodyPart, FoodName, Slug } from "@/lib/content";
import { BirdRow, BodyFigure, Face, FoodIcon } from "./art";
import { SpeakButton } from "./games";
import { Panel } from "./ui";

function H({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-2xl font-bold leading-tight">{children}</h3>;
}

function Say({ en, id, strong }: { en: string; id?: string; strong?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border-[3px] border-ink bg-white px-3 py-2">
      <div className="min-w-0">
        <p className={`font-display leading-tight ${strong ? "text-2xl font-extrabold" : "text-xl font-bold"}`}>{en}</p>
        {id && <p className="text-base">{id}</p>}
      </div>
      <SpeakButton text={en} />
    </li>
  );
}

function Rule({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-[3px] border-ink bg-sun px-4 py-3 font-display text-lg font-bold leading-snug">
      {children}
    </div>
  );
}

/* ---------- Materi 1 ---------- */

const PARTS: { en: BodyPart; id: string }[] = [
  { en: "head", id: "kepala" },
  { en: "nose", id: "hidung" },
  { en: "arm", id: "lengan" },
  { en: "hand", id: "telapak tangan" },
  { en: "fingers", id: "jari tangan" },
  { en: "tummy", id: "perut" },
  { en: "leg", id: "kaki (paha sampai pergelangan)" },
  { en: "foot", id: "telapak kaki" },
  { en: "toes", id: "jari kaki" },
];

function BodyExplorer() {
  const [part, setPart] = useState<BodyPart>("nose");
  const info = PARTS.find((p) => p.en === part)!;
  return (
    <Panel>
      <div className="flex items-center gap-4">
        <BodyFigure part={part} className="h-52 w-auto shrink-0" />
        <div className="min-w-0">
          <p className="font-display text-4xl font-extrabold leading-none">{info.en}</p>
          <p className="mt-1 text-base">{info.id}</p>
          <div className="mt-3">
            <SpeakButton text={info.en} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-base">Ketuk nama di bawah ini untuk melihat bagian tubuhnya.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {PARTS.map((p) => (
          <button
            key={p.en}
            type="button"
            onClick={() => setPart(p.en)}
            aria-pressed={part === p.en}
            className={`rounded-lg border-[3px] border-ink px-3 py-1 font-display text-lg font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink ${
              part === p.en ? "bg-sun" : "bg-white"
            }`}
          >
            {p.en}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function LearnMove() {
  return (
    <div className="space-y-5">
      <H>Bagian tubuh</H>
      <BodyExplorer />
      <H>Perintah gerakan</H>
      <p>Perintah dimulai dengan kata kerja. Dengarkan lalu coba lakukan gerakannya.</p>
      <ul className="space-y-2">
        <Say en="Touch your nose." id="Sentuh hidungmu." />
        <Say en="Wave your hand." id="Lambaikan tanganmu." />
        <Say en="Wiggle your finger." id="Goyangkan jarimu." />
        <Say en="Hop on one foot." id="Melompatlah dengan satu kaki." />
        <Say en="Stand on your toes." id="Berjinjitlah." />
        <Say en="Flap your arms." id="Kepakkan lenganmu." />
        <Say en="Nod your head." id="Anggukkan kepalamu." />
      </ul>
      <Rule>Your artinya milikmu. Your nose = hidungmu.</Rule>
    </div>
  );
}

/* ---------- Materi 2 ---------- */

const ACTIVITIES = [
  { en: "walking", id: "berjalan" },
  { en: "running", id: "berlari" },
  { en: "dancing", id: "menari" },
  { en: "biking", id: "bersepeda" },
  { en: "playing football", id: "bermain sepak bola" },
  { en: "skipping rope", id: "lompat tali" },
];

const FOODS: { en: FoodName; id: string }[] = [
  { en: "carrots", id: "wortel" },
  { en: "tomatoes", id: "tomat" },
  { en: "milk", id: "susu" },
  { en: "apples", id: "apel" },
  { en: "yogurt", id: "yogurt" },
  { en: "oranges", id: "jeruk" },
];

function LearnLike() {
  return (
    <div className="space-y-5">
      <H>Suka dan tidak suka</H>
      <div className="grid grid-cols-2 gap-3">
        <Panel className="text-center">
          <Face mood="happy" className="mx-auto size-16" />
          <p className="mt-2 font-display text-2xl font-extrabold leading-tight">I like</p>
          <p className="text-base">Aku suka</p>
        </Panel>
        <Panel className="text-center">
          <Face mood="sad" className="mx-auto size-16" />
          <p className="mt-2 font-display text-2xl font-extrabold leading-tight">I don&apos;t like</p>
          <p className="text-base">Aku tidak suka</p>
        </Panel>
      </div>
      <ul className="space-y-2">
        <Say en="I like apples." id="Aku suka apel." />
        <Say en="I don't like tomatoes." id="Aku tidak suka tomat." />
      </ul>

      <H>Activities (kegiatan)</H>
      <ul className="grid gap-2">
        {ACTIVITIES.map((a) => (
          <Say key={a.en} en={a.en} id={a.id} />
        ))}
      </ul>

      <H>Healthy food (makanan sehat)</H>
      <div className="grid grid-cols-2 gap-3">
        {FOODS.map((f) => (
          <Panel key={f.en} className="flex flex-col items-center gap-1 text-center">
            <FoodIcon item={f.en} className="size-16" />
            <p className="font-display text-xl font-bold leading-tight">{f.en}</p>
            <p className="text-base">{f.id}</p>
            <SpeakButton text={f.en} />
          </Panel>
        ))}
      </div>

      <H>Menceritakan orang lain</H>
      <Panel className="overflow-x-auto">
        <table className="w-full text-left text-lg">
          <thead>
            <tr className="font-display">
              <th className="pb-2 pr-3">Siapa</th>
              <th className="pb-2 pr-3">Suka</th>
              <th className="pb-2">Tidak suka</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr className="border-t-2 border-ink/20">
              <td className="py-2 pr-3">I, we, they</td>
              <td className="py-2 pr-3 font-bold">like</td>
              <td className="py-2 font-bold">don&apos;t like</td>
            </tr>
            <tr className="border-t-2 border-ink/20">
              <td className="py-2 pr-3">he, she</td>
              <td className="py-2 pr-3 font-bold">likes</td>
              <td className="py-2 font-bold">doesn&apos;t like</td>
            </tr>
          </tbody>
        </table>
      </Panel>
      <ul className="space-y-2">
        <Say en="She likes yogurt." id="Dia suka yogurt." />
        <Say en="He doesn't like running." id="Dia tidak suka berlari." />
      </ul>
    </div>
  );
}

/* ---------- Materi 3 ---------- */

function LearnBirds() {
  return (
    <div className="space-y-5">
      <H>All, most, dan some</H>
      <p>Burung yang berwarna adalah burung yang ikut dibicarakan.</p>
      <Panel>
        <p className="font-display text-2xl font-extrabold leading-tight">all</p>
        <p className="mb-2 text-base">semua</p>
        <BirdRow total={10} active={10} />
      </Panel>
      <Panel>
        <p className="font-display text-2xl font-extrabold leading-tight">most</p>
        <p className="mb-2 text-base">kebanyakan, hampir semua</p>
        <BirdRow total={10} active={8} />
      </Panel>
      <Panel>
        <p className="font-display text-2xl font-extrabold leading-tight">some</p>
        <p className="mb-2 text-base">beberapa, sebagian kecil</p>
        <BirdRow total={10} active={3} />
      </Panel>
      <ul className="space-y-2">
        <Say en="All birds have feathers." id="Semua burung punya bulu." />
        <Say en="Most birds can fly." id="Kebanyakan burung bisa terbang." />
        <Say en="Some birds can't fly." id="Beberapa burung tidak bisa terbang." />
      </ul>

      <H>Can dan can&apos;t</H>
      <div className="grid grid-cols-2 gap-3">
        <Panel className="text-center">
          <p className="font-display text-3xl font-extrabold">can</p>
          <p className="text-base">bisa</p>
        </Panel>
        <Panel className="text-center">
          <p className="font-display text-3xl font-extrabold">can&apos;t</p>
          <p className="text-base">tidak bisa</p>
        </Panel>
      </div>
      <ul className="space-y-2">
        <Say en="A duck can swim." id="Bebek bisa berenang." />
        <Say en="A penguin can't fly." id="Pinguin tidak bisa terbang." />
        <Say en="All animals can move." id="Semua hewan bisa bergerak." />
        <Say en="All animals need water." id="Semua hewan butuh air." />
      </ul>
      <Rule>Setelah can dan can&apos;t, pakai kata kerja biasa. A bird can fly.</Rule>
    </div>
  );
}

/* ---------- Materi 4 ---------- */

function LearnDoing() {
  return (
    <div className="space-y-5">
      <H>Sedang melakukan sesuatu</H>
      <p>Untuk kegiatan yang sedang terjadi sekarang, pakai am, is, atau are, lalu kata berakhiran -ing.</p>
      <Panel className="overflow-x-auto">
        <table className="w-full text-left text-lg">
          <thead>
            <tr className="font-display">
              <th className="pb-2 pr-3">Siapa</th>
              <th className="pb-2 pr-3">Pakai</th>
              <th className="pb-2">Contoh</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr className="border-t-2 border-ink/20">
              <td className="py-2 pr-3">I</td>
              <td className="py-2 pr-3 font-bold">am</td>
              <td className="py-2">I am eating.</td>
            </tr>
            <tr className="border-t-2 border-ink/20">
              <td className="py-2 pr-3">he, she</td>
              <td className="py-2 pr-3 font-bold">is</td>
              <td className="py-2">She is kicking.</td>
            </tr>
            <tr className="border-t-2 border-ink/20">
              <td className="py-2 pr-3">we, they</td>
              <td className="py-2 pr-3 font-bold">are</td>
              <td className="py-2">They are playing.</td>
            </tr>
          </tbody>
        </table>
      </Panel>
      <ul className="space-y-2">
        <Say en="What are they doing?" id="Mereka sedang apa?" />
        <Say en="They are playing football." id="Mereka sedang bermain sepak bola." />
        <Say en="He is clapping." id="Dia sedang bertepuk tangan." />
        <Say en="We are eating ice cream." id="Kami sedang makan es krim." />
      </ul>

      <H>Cara menambah -ing</H>
      <Panel>
        <p className="font-display text-xl font-bold">1. Kata biasa: tambah -ing</p>
        <p className="mb-3 text-lg">play, playing. eat, eating. buy, buying. kick, kicking.</p>
        <p className="font-display text-xl font-bold">2. Berakhiran e: buang e, tambah -ing</p>
        <p className="mb-3 text-lg">ride, riding. dance, dancing.</p>
        <p className="font-display text-xl font-bold">3. Satu vokal lalu satu konsonan: konsonan dobel</p>
        <p className="text-lg">skip, skipping. clap, clapping. run, running.</p>
      </Panel>
      <ul className="grid gap-2">
        <Say en="playing" />
        <Say en="riding" />
        <Say en="skipping" />
      </ul>
    </div>
  );
}

export function LessonLearn({ slug }: { slug: Slug }) {
  switch (slug) {
    case "move":
      return <LearnMove />;
    case "like":
      return <LearnLike />;
    case "birds":
      return <LearnBirds />;
    case "doing":
      return <LearnDoing />;
  }
}
