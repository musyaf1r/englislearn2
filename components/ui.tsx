import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Waves } from "./art";

const ICONS = {
  check: "m4.5 12.75 6 6 9-13.5",
  x: "M6 18 18 6M6 6l12 12",
  right: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
  left: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18",
  lock: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
  star: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
  home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  retry: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  speaker:
    "M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z",
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className = "size-6",
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 1.2 : 2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-ink px-5 py-3 font-display text-lg font-bold leading-tight select-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink";
const raised = "shadow-[0_4px_0_0_var(--color-ink)]";

const VARIANTS = {
  primary: "bg-sun text-ink",
  sea: "bg-sea text-white",
  plain: "bg-white text-ink",
} as const;

export type Variant = keyof typeof VARIANTS;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      {...props}
      className={`${base} ${raised} ${VARIANTS[variant]} enabled:active:translate-y-1 enabled:active:shadow-none disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
    />
  );
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${raised} ${VARIANTS[variant]} active:translate-y-1 active:shadow-none ${className}`}
    >
      {children}
    </Link>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border-[3px] border-ink bg-white p-4 sm:p-5 ${className}`}>
      {children}
    </section>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div
      className="h-4 w-full overflow-hidden rounded-full border-[3px] border-ink bg-white"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="h-full bg-sun" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-xl px-4 pb-10 pt-5">{children}</div>;
}

export function BeachFooter() {
  return (
    <footer aria-hidden="true">
      <Waves className="block h-10 w-full sm:h-14" />
      <div className="h-6 bg-sand" />
    </footer>
  );
}
