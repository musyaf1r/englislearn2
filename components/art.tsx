import type { ReactNode } from "react";
import type { BodyPart, FoodName, Visual } from "@/lib/content";

const INK = "#0b3954";
const SKIN = "#f1b88a";
const SHIRT = "#2f9ec9";
const SHORTS = "#c9a15b";
const HAIR = "#5b3a29";
const MARK = "#ffc02e";

function Ring({ children }: { children: (p: { fill: string; stroke: string; strokeWidth: number }) => ReactNode }) {
  return (
    <g>
      {children({ fill: "none", stroke: INK, strokeWidth: 7 })}
      {children({ fill: "rgba(255,192,46,0.4)", stroke: MARK, strokeWidth: 3.5 })}
    </g>
  );
}

function ArmSet({ marked }: { marked?: BodyPart }) {
  return (
    <g>
      <line x1="136" y1="100" x2="150" y2="124" stroke={SHIRT} strokeWidth="24" strokeLinecap="round" />
      <line x1="146" y1="118" x2="168" y2="166" stroke={SKIN} strokeWidth="14" strokeLinecap="round" />
      <circle cx="172" cy="176" r="11" fill={SKIN} />
      <g stroke={SKIN} strokeWidth="5" strokeLinecap="round">
        <line x1="165" y1="184" x2="163" y2="201" />
        <line x1="170" y1="187" x2="170" y2="206" />
        <line x1="176" y1="187" x2="177" y2="205" />
        <line x1="181" y1="184" x2="184" y2="200" />
      </g>
      {marked === "arm" && (
        <Ring>
          {(p) => <ellipse cx="157" cy="142" rx="15" ry="34" transform="rotate(-24.6 157 142)" {...p} />}
        </Ring>
      )}
      {marked === "hand" && <Ring>{(p) => <circle cx="172" cy="176" r="15" {...p} />}</Ring>}
      {marked === "fingers" && <Ring>{(p) => <ellipse cx="173" cy="195" rx="15" ry="14" {...p} />}</Ring>}
    </g>
  );
}

function LegSet({ marked }: { marked?: BodyPart }) {
  return (
    <g>
      <line x1="116" y1="214" x2="120" y2="288" stroke={SKIN} strokeWidth="18" strokeLinecap="round" />
      <ellipse cx="130" cy="302" rx="18" ry="8" fill={SKIN} />
      <g fill={SKIN}>
        <circle cx="150" cy="296" r="3.4" />
        <circle cx="154" cy="300.5" r="3.4" />
        <circle cx="154" cy="305" r="3.4" />
        <circle cx="150" cy="309" r="3.4" />
      </g>
      {marked === "leg" && <Ring>{(p) => <ellipse cx="118" cy="251" rx="15" ry="42" {...p} />}</Ring>}
      {marked === "foot" && <Ring>{(p) => <ellipse cx="128" cy="302" rx="22" ry="12" {...p} />}</Ring>}
      {marked === "toes" && <Ring>{(p) => <ellipse cx="152" cy="302.5" rx="8" ry="12" {...p} />}</Ring>}
    </g>
  );
}

export function BodyFigure({ part, className = "" }: { part?: BodyPart; className?: string }) {
  return (
    <svg viewBox="0 0 200 330" className={className} role="img" aria-label="Gambar anak laki-laki">
      {/* kaki kiri (cermin dari kanan) */}
      <g transform="translate(200 0) scale(-1 1)">
        <LegSet />
      </g>
      <LegSet marked={part} />

      {/* badan */}
      <rect x="62" y="88" width="76" height="96" rx="14" fill={SHIRT} />
      <rect x="62" y="176" width="76" height="46" rx="8" fill={SHORTS} />
      <line x1="100" y1="204" x2="100" y2="222" stroke={INK} strokeWidth="2" />

      {/* lengan */}
      <g transform="translate(200 0) scale(-1 1)">
        <ArmSet />
      </g>
      <ArmSet marked={part} />

      {/* kepala */}
      <rect x="90" y="78" width="20" height="16" fill={SKIN} />
      <circle cx="100" cy="52" r="32" fill={SKIN} />
      <path d="M68 48 Q70 16 100 16 Q130 16 132 48 Q118 34 100 34 Q82 34 68 48Z" fill={HAIR} />
      <circle cx="88" cy="50" r="3" fill={INK} />
      <circle cx="112" cy="50" r="3" fill={INK} />
      <circle cx="100" cy="58" r="4" fill="#e39a6c" />
      <path d="M88 68 Q100 76 112 68" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />

      {part === "head" && <Ring>{(p) => <ellipse cx="100" cy="50" rx="40" ry="42" {...p} />}</Ring>}
      {part === "nose" && <Ring>{(p) => <circle cx="100" cy="58" r="11" {...p} />}</Ring>}
      {part === "tummy" && <Ring>{(p) => <ellipse cx="100" cy="140" rx="28" ry="30" {...p} />}</Ring>}
    </svg>
  );
}

const FOOD_FILL = {
  carrot: "#f28a1b",
  tomato: "#e5432b",
  apple: "#d64045",
  orange: "#f7941d",
  leaf: "#1b7f52",
};

export function FoodIcon({ item, className = "" }: { item: FoodName; className?: string }) {
  const common = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={item}>
      {item === "carrots" && (
        <g {...common}>
          <path d="M22 14 L28 6 M25 14 L25 4 M28 14 L33 7" fill="none" stroke={FOOD_FILL.leaf} strokeWidth="3" />
          <path d="M15 17 Q25 11 35 17 L25 45 Z" fill={FOOD_FILL.carrot} />
          <path d="M21 22 L26 23 M24 29 L28 30 M23 36 L25 37" fill="none" />
        </g>
      )}
      {item === "tomatoes" && (
        <g {...common}>
          <circle cx="24" cy="28" r="16" fill={FOOD_FILL.tomato} />
          <path d="M14 15 Q24 23 34 15 Q24 10 14 15Z" fill={FOOD_FILL.leaf} />
        </g>
      )}
      {item === "milk" && (
        <g {...common}>
          <path d="M14 15 L24 6 L34 15 Z" fill="#fff" />
          <rect x="14" y="15" width="20" height="30" fill="#fff" />
          <rect x="14" y="26" width="20" height="10" fill="#0f7fae" />
        </g>
      )}
      {item === "apples" && (
        <g {...common}>
          <path d="M24 16 Q8 12 9 30 Q11 44 24 41 Q37 44 39 30 Q40 12 24 16Z" fill={FOOD_FILL.apple} />
          <path d="M24 16 L26 7" fill="none" />
          <path d="M26 11 Q33 6 37 10 Q31 15 26 11Z" fill={FOOD_FILL.leaf} />
        </g>
      )}
      {item === "yogurt" && (
        <g {...common}>
          <path d="M12 18 H36 L33 44 H15 Z" fill="#fff" />
          <rect x="10" y="12" width="28" height="6" rx="2" fill="#ffc02e" />
          <rect x="15" y="26" width="18" height="9" fill="#f4a6c0" stroke="none" />
        </g>
      )}
      {item === "oranges" && (
        <g {...common}>
          <circle cx="24" cy="28" r="16" fill={FOOD_FILL.orange} />
          <path d="M25 13 Q33 8 38 12 Q31 18 25 13Z" fill={FOOD_FILL.leaf} />
        </g>
      )}
    </svg>
  );
}

export function Face({ mood, className = "" }: { mood: "happy" | "sad"; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={mood === "happy" ? "Wajah senang" : "Wajah sedih"}
    >
      <circle cx="32" cy="32" r="28" fill="#ffc02e" stroke={INK} strokeWidth="3" />
      <circle cx="23" cy="26" r="3.2" fill={INK} />
      <circle cx="41" cy="26" r="3.2" fill={INK} />
      {mood === "happy" ? (
        <path d="M18 38 Q32 53 46 38" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M19 48 Q32 35 45 48" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function Bird({ active, className = "" }: { active: boolean; className?: string }) {
  const body = active ? "#0f7fae" : "#e4eaee";
  const wing = active ? "#0b5f84" : "#c3ced5";
  const line = active ? INK : "#9fb0ba";
  return (
    <svg viewBox="0 0 46 40" className={className} aria-hidden="true">
      <g stroke={line} strokeWidth="1.6" strokeLinejoin="round">
        <polygon points="7,22 0,16 3,27" fill={wing} />
        <ellipse cx="19" cy="24" rx="13" ry="9" fill={body} />
        <circle cx="31" cy="14" r="7" fill={body} />
        <polygon points="37,12.5 44,15 37,17.5" fill={active ? "#ffc02e" : "#d3dbe0"} />
        <path d="M10 24 Q18 11 26 26 Z" fill={wing} />
      </g>
      <circle cx="33" cy="12.5" r="1.4" fill={active ? "#fff" : "#9fb0ba"} />
    </svg>
  );
}

export function BirdRow({ total, active, label }: { total: number; active: number; label?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[17rem]">
      <div
        className="grid grid-cols-5 gap-x-2 gap-y-3 rounded-2xl border-[3px] border-ink bg-white p-3"
        role="img"
        aria-label={`${active} dari ${total} burung berwarna`}
      >
        {Array.from({ length: total }, (_, i) => (
          <Bird key={i} active={i < active} className="h-9 w-full" />
        ))}
      </div>
      {label && (
        <p className="mt-1 text-center text-sm">
          Berwarna: {active} dari {total}
        </p>
      )}
    </div>
  );
}

export function VisualView({ visual, size = "md" }: { visual: Visual; size?: "sm" | "md" }) {
  switch (visual.kind) {
    case "body":
      return <BodyFigure part={visual.part} className={size === "sm" ? "mx-auto h-36 w-auto" : "mx-auto h-60 w-auto"} />;
    case "birds":
      return <BirdRow total={visual.total} active={visual.active} label />;
    case "food":
      return <FoodIcon item={visual.item} className={size === "sm" ? "mx-auto size-16" : "mx-auto size-24"} />;
    case "face":
      return <Face mood={visual.mood} className={size === "sm" ? "mx-auto size-16" : "mx-auto size-24"} />;
  }
}

export function Sun({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true">
      <g stroke="#ffc02e" strokeWidth="6" strokeLinecap="round">
        {rays.map((a) => (
          <line key={a} x1="0" y1="-40" x2="0" y2="-54" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r="32" fill="#ffc02e" stroke="#0b3954" strokeWidth="3" />
    </svg>
  );
}

export function Waves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 40 Q90 10 180 40 T360 40 T540 40 T720 40 T900 40 T1080 40 T1260 40 T1440 40 V90 H0Z"
        fill="#a9dff0"
      />
      <path
        d="M0 56 Q90 30 180 56 T360 56 T540 56 T720 56 T900 56 T1080 56 T1260 56 T1440 56 V90 H0Z"
        fill="#0f7fae"
      />
      <path
        d="M0 72 Q90 52 180 72 T360 72 T540 72 T720 72 T900 72 T1080 72 T1260 72 T1440 72 V90 H0Z"
        fill="#f8ebc8"
      />
    </svg>
  );
}
