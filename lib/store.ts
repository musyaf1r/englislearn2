import { useSyncExternalStore } from "react";

export type AppState = {
  name: string;
  done: string[];
  best: number | null;
};

const KEY = "sunny-beach-english-v1";
const EMPTY: AppState = { name: "", done: [], best: null };

let cache: AppState = EMPTY;
let cacheRaw: string | null = null;
let memoryRaw: string | null = null;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return memoryRaw;
  }
}

function parse(raw: string | null): AppState {
  if (!raw) return EMPTY;
  try {
    const p = JSON.parse(raw) as Partial<AppState>;
    return {
      name: typeof p.name === "string" ? p.name : "",
      done: Array.isArray(p.done)
        ? p.done.filter((x): x is string => typeof x === "string")
        : [],
      best: typeof p.best === "number" ? p.best : null,
    };
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): AppState {
  const raw = readRaw();
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    cache = parse(raw);
  }
  return cache;
}

function getServerSnapshot(): AppState {
  return EMPTY;
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: AppState) {
  const raw = JSON.stringify(next);
  memoryRaw = raw;
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    // Penyimpanan diblokir: data tetap hidup selama halaman terbuka.
  }
  emit();
}

const noopSubscribe = () => () => {};

export function useAppState() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return { state, ready };
}

export function setPlayerName(name: string) {
  write({ ...getSnapshot(), name: name.trim() });
}

export function markLessonDone(slug: string) {
  const s = getSnapshot();
  if (s.done.includes(slug)) return;
  write({ ...s, done: [...s.done, slug] });
}

export function saveBestScore(score: number) {
  const s = getSnapshot();
  if (s.best !== null && s.best >= score) return;
  write({ ...s, best: score });
}

export function resetPlayer() {
  write(EMPTY);
}
