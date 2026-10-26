export type BodyPart =
  | "head"
  | "nose"
  | "arm"
  | "hand"
  | "fingers"
  | "tummy"
  | "leg"
  | "foot"
  | "toes";

export type FoodName =
  | "carrots"
  | "tomatoes"
  | "milk"
  | "apples"
  | "yogurt"
  | "oranges";

export type Visual =
  | { kind: "body"; part: BodyPart }
  | { kind: "birds"; total: number; active: number }
  | { kind: "food"; item: FoodName }
  | { kind: "face"; mood: "happy" | "sad" };

export type Slug = "move" | "like" | "birds" | "doing";
export type Tone = "sea" | "coral" | "palm" | "sun";

export type LessonMeta = {
  slug: Slug;
  no: number;
  title: string;
  id: string;
  blurb: string;
  tone: Tone;
};

export const LESSONS: LessonMeta[] = [
  {
    slug: "move",
    no: 1,
    title: "Different Ways to Move",
    id: "Gerakan Tubuh",
    blurb: "Kenali bagian tubuh dan perintah gerakan.",
    tone: "sea",
  },
  {
    slug: "like",
    no: 2,
    title: "Like and Don't Like",
    id: "Suka dan Tidak Suka",
    blurb: "Ceritakan kegiatan dan makanan yang kamu suka.",
    tone: "coral",
  },
  {
    slug: "birds",
    no: 3,
    title: "All, Most, Some, Can and Can't",
    id: "Semua, Kebanyakan, Beberapa",
    blurb: "Belajar tentang burung dan hal yang bisa mereka lakukan.",
    tone: "palm",
  },
  {
    slug: "doing",
    no: 4,
    title: "Describing Ongoing Actions",
    id: "Sedang Melakukan Apa",
    blurb: "Pakai is dan are bersama kata berakhiran -ing.",
    tone: "sun",
  },
];

export type Option = { label?: string; visual?: Visual; aria?: string };

export type Round = {
  question: string;
  hint?: string;
  speak?: string;
  visuals?: Visual[];
  options: Option[];
  answer: number;
  explain: string;
};

export type ChoiceGameData = {
  type: "choice";
  title: string;
  intro: string;
  rounds: Round[];
};

export type BuildRound = {
  meaning: string;
  words: string[];
  extra?: string[];
  explain?: string;
};

export type BuildGameData = {
  type: "build";
  title: string;
  intro: string;
  rounds: BuildRound[];
};

export type GameData = ChoiceGameData | BuildGameData;

const words = (...w: string[]): Option[] => w.map((label) => ({ label }));
const fig = (part: BodyPart, n: number): Option => ({
  visual: { kind: "body", part },
  aria: `Gambar ${n}`,
});

export const GAMES: Record<Slug, [GameData, GameData]> = {
  move: [
    {
      type: "choice",
      title: "Tebak Bagian Tubuh",
      intro: "Lihat bagian tubuh yang diberi lingkaran kuning. Pilih nama yang tepat.",
      rounds: [
        {
          question: "What is this?",
          hint: "Bagian yang dilingkari kuning.",
          visuals: [{ kind: "body", part: "nose" }],
          options: words("nose", "head", "hand"),
          answer: 0,
          explain: "Itu nose. Nose artinya hidung.",
          speak: "nose",
        },
        {
          question: "What is this?",
          visuals: [{ kind: "body", part: "hand" }],
          options: words("fingers", "hand", "foot"),
          answer: 1,
          explain: "Itu hand. Hand artinya telapak tangan.",
          speak: "hand",
        },
        {
          question: "What is this?",
          visuals: [{ kind: "body", part: "tummy" }],
          options: words("tummy", "arm", "leg"),
          answer: 0,
          explain: "Itu tummy. Tummy artinya perut.",
          speak: "tummy",
        },
        {
          question: "What is this?",
          visuals: [{ kind: "body", part: "foot" }],
          options: words("toes", "hand", "foot"),
          answer: 2,
          explain: "Itu foot. Foot artinya telapak kaki.",
          speak: "foot",
        },
        {
          question: "What is this?",
          visuals: [{ kind: "body", part: "leg" }],
          options: words("arm", "leg", "head"),
          answer: 1,
          explain: "Itu leg. Leg artinya kaki, dari paha sampai pergelangan.",
          speak: "leg",
        },
        {
          question: "What are these?",
          visuals: [{ kind: "body", part: "toes" }],
          options: words("fingers", "toes", "arms"),
          answer: 1,
          explain: "Itu toes. Toes artinya jari-jari kaki.",
          speak: "toes",
        },
        {
          question: "What is this?",
          visuals: [{ kind: "body", part: "arm" }],
          options: words("arm", "leg", "nose"),
          answer: 0,
          explain: "Itu arm. Arm artinya lengan.",
          speak: "arm",
        },
        {
          question: "What are these?",
          visuals: [{ kind: "body", part: "fingers" }],
          options: words("toes", "hands", "fingers"),
          answer: 2,
          explain: "Itu fingers. Fingers artinya jari-jari tangan.",
          speak: "fingers",
        },
      ],
    },
    {
      type: "choice",
      title: "Ikuti Perintah",
      intro: "Baca perintahnya. Pilih gambar yang bagian tubuhnya dipakai untuk perintah itu.",
      rounds: [
        {
          question: "Touch your nose.",
          hint: "Sentuh hidungmu.",
          speak: "Touch your nose.",
          options: [fig("hand", 1), fig("nose", 2), fig("foot", 3)],
          answer: 1,
          explain: "Touch your nose artinya sentuh hidungmu.",
        },
        {
          question: "Wave your hand.",
          hint: "Lambaikan tanganmu.",
          speak: "Wave your hand.",
          options: [fig("hand", 1), fig("tummy", 2), fig("head", 3)],
          answer: 0,
          explain: "Wave your hand artinya lambaikan tanganmu.",
        },
        {
          question: "Wiggle your finger.",
          hint: "Goyangkan jarimu.",
          speak: "Wiggle your finger.",
          options: [fig("toes", 1), fig("leg", 2), fig("fingers", 3)],
          answer: 2,
          explain: "Wiggle your finger artinya goyangkan jarimu.",
        },
        {
          question: "Hop on one foot.",
          hint: "Melompatlah dengan satu kaki.",
          speak: "Hop on one foot.",
          options: [fig("arm", 1), fig("foot", 2), fig("nose", 3)],
          answer: 1,
          explain: "Hop on one foot artinya melompat dengan satu kaki.",
        },
        {
          question: "Stand on your toes.",
          hint: "Berdirilah dengan jari-jari kakimu.",
          speak: "Stand on your toes.",
          options: [fig("toes", 1), fig("fingers", 2), fig("head", 3)],
          answer: 0,
          explain: "Stand on your toes artinya berjinjit.",
        },
        {
          question: "Flap your arms.",
          hint: "Kepakkan lenganmu seperti sayap.",
          speak: "Flap your arms.",
          options: [fig("leg", 1), fig("tummy", 2), fig("arm", 3)],
          answer: 2,
          explain: "Flap your arms artinya kepakkan lenganmu.",
        },
        {
          question: "Nod your head.",
          hint: "Anggukkan kepalamu.",
          speak: "Nod your head.",
          options: [fig("head", 1), fig("hand", 2), fig("foot", 3)],
          answer: 0,
          explain: "Nod your head artinya anggukkan kepalamu.",
        },
      ],
    },
  ],

  like: [
    {
      type: "choice",
      title: "Suka atau Tidak Suka",
      intro: "Wajah senang berarti suka. Wajah sedih berarti tidak suka. Lengkapi kalimatnya.",
      rounds: [
        {
          question: "I ___ apples.",
          visuals: [
            { kind: "face", mood: "happy" },
            { kind: "food", item: "apples" },
          ],
          options: words("like", "don't like"),
          answer: 0,
          explain: "Wajahnya senang, jadi: I like apples.",
          speak: "I like apples.",
        },
        {
          question: "I ___ tomatoes.",
          visuals: [
            { kind: "face", mood: "sad" },
            { kind: "food", item: "tomatoes" },
          ],
          options: words("like", "don't like"),
          answer: 1,
          explain: "Wajahnya sedih, jadi: I don't like tomatoes.",
          speak: "I don't like tomatoes.",
        },
        {
          question: "I ___ dancing.",
          visuals: [{ kind: "face", mood: "happy" }],
          options: words("like", "don't like"),
          answer: 0,
          explain: "Wajahnya senang, jadi: I like dancing.",
          speak: "I like dancing.",
        },
        {
          question: "I ___ running.",
          visuals: [{ kind: "face", mood: "sad" }],
          options: words("like", "don't like"),
          answer: 1,
          explain: "Wajahnya sedih, jadi: I don't like running.",
          speak: "I don't like running.",
        },
        {
          question: "We ___ milk.",
          visuals: [
            { kind: "face", mood: "happy" },
            { kind: "food", item: "milk" },
          ],
          options: words("like", "don't like"),
          answer: 0,
          explain: "Wajahnya senang, jadi: We like milk.",
          speak: "We like milk.",
        },
        {
          question: "They ___ carrots.",
          visuals: [
            { kind: "face", mood: "sad" },
            { kind: "food", item: "carrots" },
          ],
          options: words("like", "don't like"),
          answer: 1,
          explain: "Wajahnya sedih, jadi: They don't like carrots.",
          speak: "They don't like carrots.",
        },
        {
          question: "We ___ skipping rope.",
          visuals: [{ kind: "face", mood: "happy" }],
          options: words("like", "don't like"),
          answer: 0,
          explain: "Wajahnya senang, jadi: We like skipping rope.",
          speak: "We like skipping rope.",
        },
        {
          question: "I ___ oranges.",
          visuals: [
            { kind: "face", mood: "sad" },
            { kind: "food", item: "oranges" },
          ],
          options: words("like", "don't like"),
          answer: 1,
          explain: "Wajahnya sedih, jadi: I don't like oranges.",
          speak: "I don't like oranges.",
        },
      ],
    },
    {
      type: "build",
      title: "Susun Kalimat",
      intro: "Ketuk kata-kata untuk menyusun kalimat bahasa Inggris. Hati-hati, ada kata yang tidak dipakai.",
      rounds: [
        {
          meaning: "Aku suka apel.",
          words: ["I", "like", "apples"],
          extra: ["doesn't"],
          explain: "Dengan I, pakai like.",
        },
        {
          meaning: "Aku tidak suka tomat.",
          words: ["I", "don't", "like", "tomatoes"],
          explain: "Dengan I, pakai don't like.",
        },
        {
          meaning: "Kami suka bermain sepak bola.",
          words: ["We", "like", "playing", "football"],
          extra: ["can"],
          explain: "Setelah like, pakai kata berakhiran -ing.",
        },
        {
          meaning: "Dia (perempuan) suka yogurt.",
          words: ["She", "likes", "yogurt"],
          extra: ["like"],
          explain: "Dengan she, pakai likes.",
        },
        {
          meaning: "Dia (laki-laki) tidak suka berlari.",
          words: ["He", "doesn't", "like", "running"],
          extra: ["don't"],
          explain: "Dengan he, pakai doesn't like.",
        },
      ],
    },
  ],

  birds: [
    {
      type: "choice",
      title: "Hitung Burung",
      intro: "Burung yang berwarna adalah burung yang melakukan hal itu. Pilih all, most, atau some.",
      rounds: [
        {
          question: "___ birds can fly.",
          hint: "Semua burung berwarna.",
          visuals: [{ kind: "birds", total: 10, active: 10 }],
          options: words("All", "Most", "Some"),
          answer: 0,
          explain: "Semua burung berwarna, jadi: All birds can fly.",
          speak: "All birds can fly.",
        },
        {
          question: "___ birds can swim.",
          hint: "Hanya sedikit burung yang berwarna.",
          visuals: [{ kind: "birds", total: 10, active: 3 }],
          options: words("All", "Most", "Some"),
          answer: 2,
          explain: "Hanya sedikit yang berwarna, jadi: Some birds can swim.",
          speak: "Some birds can swim.",
        },
        {
          question: "___ birds build nests.",
          hint: "Hampir semua burung berwarna.",
          visuals: [{ kind: "birds", total: 10, active: 9 }],
          options: words("All", "Most", "Some"),
          answer: 1,
          explain: "Hampir semua berwarna, jadi: Most birds build nests.",
          speak: "Most birds build nests.",
        },
        {
          question: "___ birds have feathers.",
          visuals: [{ kind: "birds", total: 10, active: 10 }],
          options: words("Some", "All", "Most"),
          answer: 1,
          explain: "Semua burung berwarna, jadi: All birds have feathers.",
          speak: "All birds have feathers.",
        },
        {
          question: "___ birds can fly.",
          visuals: [{ kind: "birds", total: 10, active: 8 }],
          options: words("Most", "Some", "All"),
          answer: 0,
          explain: "Kebanyakan berwarna, jadi: Most birds can fly.",
          speak: "Most birds can fly.",
        },
        {
          question: "___ birds can't fly.",
          visuals: [{ kind: "birds", total: 10, active: 2 }],
          options: words("All", "Some", "Most"),
          answer: 1,
          explain: "Hanya sedikit yang berwarna, jadi: Some birds can't fly.",
          speak: "Some birds can't fly.",
        },
      ],
    },
    {
      type: "choice",
      title: "Can atau Can't",
      intro: "Pilih kata yang membuat kalimat benar.",
      rounds: [
        {
          question: "A bird ___ fly.",
          options: words("can", "can't"),
          answer: 0,
          explain: "Burung bisa terbang. A bird can fly.",
          speak: "A bird can fly.",
        },
        {
          question: "A dog ___ fly.",
          options: words("can", "can't"),
          answer: 1,
          explain: "Anjing tidak bisa terbang. A dog can't fly.",
          speak: "A dog can't fly.",
        },
        {
          question: "A frog ___ hop.",
          options: words("can", "can't"),
          answer: 0,
          explain: "Katak bisa melompat. A frog can hop.",
          speak: "A frog can hop.",
        },
        {
          question: "A snake ___ walk with legs.",
          hint: "Ular tidak punya kaki.",
          options: words("can", "can't"),
          answer: 1,
          explain: "Ular tidak punya kaki. A snake can't walk with legs.",
          speak: "A snake can't walk with legs.",
        },
        {
          question: "A monkey ___ climb a tree.",
          options: words("can", "can't"),
          answer: 0,
          explain: "Monyet bisa memanjat pohon. A monkey can climb a tree.",
          speak: "A monkey can climb a tree.",
        },
        {
          question: "An elephant ___ climb a tree.",
          options: words("can", "can't"),
          answer: 1,
          explain: "Gajah tidak bisa memanjat pohon. An elephant can't climb a tree.",
          speak: "An elephant can't climb a tree.",
        },
        {
          question: "___ animals can move.",
          options: words("All", "Most", "Some"),
          answer: 0,
          explain: "Semua hewan bisa bergerak. All animals can move.",
          speak: "All animals can move.",
        },
        {
          question: "___ birds can talk, like a parrot.",
          hint: "Hanya sedikit burung yang bisa bicara.",
          options: words("All", "Most", "Some"),
          answer: 2,
          explain: "Hanya sedikit burung yang bisa bicara. Some birds can talk.",
          speak: "Some birds can talk, like a parrot.",
        },
      ],
    },
  ],

  doing: [
    {
      type: "choice",
      title: "Tambah -ing",
      intro: "Lihat kata dasarnya. Pilih bentuk -ing yang ejaannya benar.",
      rounds: [
        {
          question: "play",
          hint: "She is ___ football.",
          options: words("playing", "plaing", "playeing"),
          answer: 0,
          explain: "Kata biasa: tambahkan -ing. play menjadi playing.",
          speak: "playing",
        },
        {
          question: "eat",
          hint: "He is ___ rice.",
          options: words("eatting", "eating", "eatng"),
          answer: 1,
          explain: "Kata biasa: tambahkan -ing. eat menjadi eating.",
          speak: "eating",
        },
        {
          question: "ride",
          hint: "They are ___ bikes.",
          options: words("rideing", "ridding", "riding"),
          answer: 2,
          explain: "Kata berakhiran e: buang e, lalu tambah -ing. ride menjadi riding.",
          speak: "riding",
        },
        {
          question: "skip",
          hint: "We are ___ rope.",
          options: words("skipping", "skiping", "skipeing"),
          answer: 0,
          explain: "Huruf terakhir p dobel. skip menjadi skipping.",
          speak: "skipping",
        },
        {
          question: "clap",
          hint: "He is ___ his hands.",
          options: words("claping", "clapping", "clapeing"),
          answer: 1,
          explain: "Huruf terakhir p dobel. clap menjadi clapping.",
          speak: "clapping",
        },
        {
          question: "dance",
          hint: "She is ___ on the beach.",
          options: words("danceing", "dancking", "dancing"),
          answer: 2,
          explain: "Kata berakhiran e: buang e, lalu tambah -ing. dance menjadi dancing.",
          speak: "dancing",
        },
        {
          question: "buy",
          hint: "I am ___ fruit.",
          options: words("buying", "buiing", "buyying"),
          answer: 0,
          explain: "Kata berakhiran y setelah vokal: tambahkan -ing. buy menjadi buying.",
          speak: "buying",
        },
        {
          question: "run",
          hint: "They are ___ fast.",
          options: words("runing", "running", "runeing"),
          answer: 1,
          explain: "Huruf terakhir n dobel. run menjadi running.",
          speak: "running",
        },
      ],
    },
    {
      type: "build",
      title: "Apa yang Sedang Dilakukan?",
      intro: "Susun kalimat bahasa Inggris. Pilih is atau are dengan hati-hati.",
      rounds: [
        {
          meaning: "Mereka sedang bermain sepak bola.",
          words: ["They", "are", "playing", "football"],
          extra: ["is"],
          explain: "They selalu bersama are.",
        },
        {
          meaning: "Dia (perempuan) sedang menendang bola.",
          words: ["She", "is", "kicking", "the", "ball"],
          extra: ["are"],
          explain: "She bersama is.",
        },
        {
          meaning: "Kami sedang makan es krim.",
          words: ["We", "are", "eating", "ice", "cream"],
          extra: ["is"],
          explain: "We bersama are.",
        },
        {
          meaning: "Dia (laki-laki) sedang bertepuk tangan.",
          words: ["He", "is", "clapping"],
          extra: ["are"],
          explain: "He bersama is.",
        },
        {
          meaning: "Anak-anak sedang naik sepeda.",
          words: ["The", "children", "are", "riding", "bikes"],
          extra: ["is"],
          explain: "The children artinya banyak anak, jadi pakai are.",
        },
      ],
    },
  ],
};
