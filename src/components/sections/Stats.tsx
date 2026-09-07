"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Every figure here is read from src/lib/site.ts or the services list, so the
 * numbers on the page always match your real listing. Update those files
 * rather than hard-coding anything new in this component.
 */
const stats = [
  { value: site.rating.value, suffix: "", label: "Google rating", decimals: 1 },
  { value: site.rating.count, suffix: "+", label: "Guest reviews" },
  { value: services.length, suffix: "", label: "Signature therapies" },
  { value: 7, suffix: "days", label: "Open every week", gap: true },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(143,194,74,0.08), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="group relative text-center sm:text-left">
              <Counter
                to={s.value}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
                gap={s.gap ?? false}
              />
              <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-body/60">
                {s.label}
              </p>
              <span className="mt-5 block h-px w-full bg-forest/8">
                <span className="block h-full w-0 bg-gradient-to-r from-leaf to-forest transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Counter({
  to,
  suffix,
  decimals,
  gap = false,
}: {
  to: number;
  suffix: string;
  decimals: number;
  gap?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        // Reduced motion: land on the final value instead of counting up.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setN(to);
          return;
        }

        const start = performance.now();
        const dur = 1700;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          setN(to * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  const shown =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toLocaleString("en-IN");

  return (
    <p ref={ref} className="display text-[clamp(2.6rem,6vw,4rem)] leading-none">
      <span className="accent-text">{shown}</span>
      <span className="text-forest/60">
        {gap ? " " : ""}
        {suffix}
      </span>
    </p>
  );
}
