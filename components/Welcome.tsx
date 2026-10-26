"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { resetPlayer, setPlayerName, useAppState } from "@/lib/store";
import { Sun } from "./art";
import { Button, Icon, LinkButton, Page } from "./ui";

export function Welcome() {
  const router = useRouter();
  const { state, ready } = useAppState();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const clean = name.trim();
    if (clean.length < 2) {
      setError("Tulis namamu dulu ya, minimal 2 huruf.");
      return;
    }
    setPlayerName(clean);
    router.push("/belajar");
  }

  function changePlayer() {
    if (window.confirm("Ganti nama? Kemajuan belajar di HP ini akan dihapus.")) {
      resetPlayer();
      setName("");
    }
  }

  return (
    <Page>
      <div className="relative pt-2">
        <Sun className="absolute -right-3 -top-1 size-28 sm:size-32" />
        <p className="font-display text-lg font-bold">Kelas 2 SD</p>
        <h1 className="mt-1 max-w-[12ch] font-display text-5xl font-extrabold leading-[1.05]">
          Sunny Beach English
        </h1>
        <p className="mt-3 max-w-[22rem]">
          Belajar bahasa Inggris sambil bermain di pantai. Ada materi, game, dan 20 soal untuk menguji
          kemampuanmu.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border-[3px] border-ink bg-white p-5">
        {!ready ? (
          <p className="py-6 text-center font-display text-lg font-bold">Sebentar ya...</p>
        ) : state.name ? (
          <div>
            <p className="text-base">Selamat datang kembali,</p>
            <p className="font-display text-3xl font-extrabold leading-tight">{state.name}</p>
            <div className="mt-5 flex flex-col gap-3">
              <LinkButton href="/belajar">
                Lanjut belajar
                <Icon name="right" className="size-5" />
              </LinkButton>
              <Button variant="plain" onClick={changePlayer}>
                Bukan {state.name}? Ganti nama
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label htmlFor="name" className="font-display text-2xl font-bold">
              Siapa namamu?
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              maxLength={20}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "name-error" : undefined}
              className="mt-2 w-full rounded-xl border-[3px] border-ink bg-sand px-4 py-3 font-display text-2xl font-bold placeholder:font-sans placeholder:text-lg placeholder:font-normal placeholder:text-ink/50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
              placeholder="Tulis namamu di sini"
            />
            {error && (
              <p id="name-error" role="alert" className="mt-2 font-bold text-coral">
                {error}
              </p>
            )}
            <Button type="submit" className="mt-4 w-full">
              Mulai belajar
              <Icon name="right" className="size-5" />
            </Button>
            <p className="mt-3 text-sm">Namamu hanya disimpan di HP ini.</p>
          </form>
        )}
      </div>
    </Page>
  );
}
