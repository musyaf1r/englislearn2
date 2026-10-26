// Pengacakan dengan seed tetap, supaya hasil server dan browser sama.
export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  let s = seed * 9301 + 49297;
  const next = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Pengacakan yang dijamin tidak sama dengan urutan jawaban.
export function shuffleNotSame(answer: readonly string[], extra: readonly string[], seed: number): string[] {
  const all = [...answer, ...extra];
  for (let k = 0; k < 10; k++) {
    const shuffled = seededShuffle(all, seed + k * 13);
    if (shuffled.join(" ") !== answer.join(" ")) return shuffled;
  }
  return all.reverse();
}
