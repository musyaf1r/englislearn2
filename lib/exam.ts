export type ExamQuestion =
  | { type: "choice"; part: 1; prompt: string; options: string[]; answer: number }
  | { type: "tf"; part: 2; prompt: string; answer: boolean }
  | {
      type: "fill";
      part: 3;
      before: string;
      after: string;
      options: string[];
      answers: string[];
    }
  | {
      type: "build";
      part: 4;
      prompt: string;
      meaning: string;
      words: string[];
      extra: string[];
    }
  | { type: "multi"; part: 4; prompt: string; hint: string; options: string[]; answers: string[] };

export const PARTS: Record<1 | 2 | 3 | 4, { roman: string; title: string; help: string }> = {
  1: {
    roman: "I",
    title: "Choose the correct answer.",
    help: "Pilih satu jawaban yang paling tepat.",
  },
  2: {
    roman: "II",
    title: "Is it True or False?",
    help: "Pilih True kalau benar. Pilih False kalau salah.",
  },
  3: {
    roman: "III",
    title: "Fill in the blanks.",
    help: "Ketik jawabanmu, atau ketuk salah satu kata di bawahnya.",
  },
  4: {
    roman: "IV",
    title: "Answer the questions.",
    help: "Ikuti petunjuk di setiap soal.",
  },
};

export const EXAM: ExamQuestion[] = [
  // Bagian I: pilihan ganda
  { type: "choice", part: 1, prompt: "A fish can ...", options: ["swim", "hop", "run", "dance"], answer: 0 },
  {
    type: "choice",
    part: 1,
    prompt: "I ... ice cream. It is cold and yummy!",
    options: ["like", "don't like", "can", "can't"],
    answer: 0,
  },
  {
    type: "choice",
    part: 1,
    prompt: "... animals need food and water.",
    options: ["All", "Some", "More", "Few"],
    answer: 0,
  },
  {
    type: "choice",
    part: 1,
    prompt: "An ostrich is a bird, but it ... fly.",
    options: ["can", "can't", "like", "don't like"],
    answer: 1,
  },
  {
    type: "choice",
    part: 1,
    prompt: "Look! The girls are ... bikes.",
    options: ["ride", "rides", "riding", "ridding"],
    answer: 2,
  },

  // Bagian II: benar atau salah
  { type: "tf", part: 2, prompt: "A cow can fly in the sky.", answer: false },
  { type: "tf", part: 2, prompt: "We use \"doesn't\" with he and she.", answer: true },
  { type: "tf", part: 2, prompt: "All birds can swim.", answer: false },
  { type: "tf", part: 2, prompt: "A penguin is a bird that can't fly.", answer: true },
  { type: "tf", part: 2, prompt: "\"She are eating an apple.\" is a correct sentence.", answer: false },

  // Bagian III: isian
  {
    type: "fill",
    part: 3,
    before: "A cat can run, but a fish can",
    after: "in the sea.",
    options: ["swim", "fly", "climb", "sing"],
    answers: ["swim"],
  },
  {
    type: "fill",
    part: 3,
    before: "Dina is",
    after: "milk. (drink)",
    options: ["drinking", "drink", "drinks"],
    answers: ["drinking"],
  },
  {
    type: "fill",
    part: 3,
    before: "We",
    after: "like rainy days. We can't play outside. (don't / doesn't)",
    options: ["don't", "doesn't"],
    answers: ["don't", "dont"],
  },
  {
    type: "fill",
    part: 3,
    before: "",
    after: "birds can fly, but a few birds can't. (All / Most)",
    options: ["All", "Most", "Some"],
    answers: ["most"],
  },
  {
    type: "fill",
    part: 3,
    before: "A penguin",
    after: "swim, but it can't fly. (can / can't)",
    options: ["can", "can't"],
    answers: ["can"],
  },

  // Bagian IV: jawaban singkat
  {
    type: "multi",
    part: 4,
    prompt: "Choose 2 things a rabbit can do.",
    hint: "Pilih 2 jawaban.",
    options: ["fly", "hop", "sing", "run"],
    answers: ["hop", "run"],
  },
  {
    type: "build",
    part: 4,
    prompt: "Write this sentence in English.",
    meaning: "Semua hewan butuh air.",
    words: ["All", "animals", "need", "water"],
    extra: ["Some", "can"],
  },
  {
    type: "build",
    part: 4,
    prompt: "Rani is at the beach. She has an ice cream. What is she doing?",
    meaning: "Susun jawabannya dalam bahasa Inggris.",
    words: ["She", "is", "eating", "ice", "cream"],
    extra: ["are", "drinking"],
  },
  {
    type: "build",
    part: 4,
    prompt: "Write this sentence in English.",
    meaning: "Aku tidak suka susu panas.",
    words: ["I", "don't", "like", "hot", "milk"],
    extra: ["likes"],
  },
  {
    type: "multi",
    part: 4,
    prompt: "Choose 2 things we can do with our feet.",
    hint: "Pilih 2 jawaban.",
    options: ["wave", "kick", "nod", "hop"],
    answers: ["kick", "hop"],
  },
];
