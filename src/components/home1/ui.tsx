import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Small letter-spaced label that opens most sections. */
export function Eyebrow({
  children,
  tone = "bronze",
  className = "",
}: {
  children: ReactNode;
  tone?: "bronze" | "lime";
  className?: string;
}) {
  return (
    <span
      className={`block text-[10px] font-medium uppercase leading-none tracking-[0.34em] sm:text-[11px] ${
        tone === "lime" ? "text-lime/85" : "text-bronze"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** The filled pill — dark on light ground, ivory on dark. */
export function Pill({
  href,
  children,
  variant = "dark",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "outline-light";
  external?: boolean;
  className?: string;
}) {
  const skin = {
    dark: "bg-forest text-ivory shadow-[0_18px_38px_-18px_rgba(23,56,26,0.85)] hover:shadow-[0_22px_46px_-18px_rgba(23,56,26,0.95)]",
    light:
      "bg-paper text-forest shadow-[0_18px_38px_-18px_rgba(0,0,0,0.5)] hover:shadow-[0_22px_46px_-18px_rgba(0,0,0,0.6)]",
    outline: "border border-forest/25 text-forest hover:border-forest/50 hover:bg-forest/5",
    "outline-light":
      "border border-ivory/40 text-ivory hover:border-ivory/70 hover:bg-ivory/10",
  }[variant];

  const inner = (
    <>
      <span className="relative">{children}</span>
      <ArrowRight
        size={14}
        strokeWidth={1.6}
        className="relative shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      />
    </>
  );

  const classes = `group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-[10.5px] uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 sm:text-[11.5px] ${skin} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Understated text link with a rule that grows on hover. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
        tone === "light" ? "text-ivory/80 hover:text-ivory" : "text-forest/75 hover:text-forest"
      } ${className}`}
    >
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${
            tone === "light" ? "bg-lime" : "bg-bronze"
          }`}
        />
      </span>
      <ArrowRight
        size={13}
        strokeWidth={1.6}
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      />
    </Link>
  );
}

/**
 * Circular arrow badge that sits in the corner of a ritual card. The size lives
 * in `sizeClass` rather than the base string, because two competing `h-*`
 * utilities would be settled by stylesheet order, not by the order they are
 * written here.
 */
export function ArrowBadge({
  sizeClass = "h-9 w-9",
  className = "",
}: {
  sizeClass?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full border border-forest/18 text-forest/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-forest group-hover:bg-forest group-hover:text-ivory ${sizeClass} ${className}`}
    >
      <ArrowRight
        size={14}
        strokeWidth={1.5}
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
      />
    </span>
  );
}

/**
 * A drawn botanical sprig. Vector rather than photography so the corner
 * flourishes cost nothing to load and stay crisp at any size.
 */
export function Sprig({
  className = "",
  opacity = 0.16,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 260"
      fill="none"
      className={className}
      style={{ opacity }}
    >
      <path
        d="M100 258C100 258 96 170 96 118C96 66 108 20 132 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 44 + i * 34;
        const t = 1 - i * 0.11;
        return (
          <g key={i}>
            <path
              d={`M${98 + i} ${y} C ${60 - i * 4} ${y - 26 * t}, ${34 - i * 3} ${y + 6}, ${20 + i * 2} ${y + 30 * t} C ${52 - i * 2} ${y + 26 * t}, ${84 - i} ${y + 14}, ${98 + i} ${y}Z`}
              fill="currentColor"
            />
            <path
              d={`M${100 + i} ${y - 16} C ${140 + i * 4} ${y - 40 * t}, ${166 + i * 3} ${y - 10}, ${180 - i * 2} ${y + 14 * t} C ${148 + i * 2} ${y + 10 * t}, ${116 + i} ${y - 2}, ${100 + i} ${y - 16}Z`}
              fill="currentColor"
            />
          </g>
        );
      })}
    </svg>
  );
}
