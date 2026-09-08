"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { art } from "@/lib/home1";
import { reviews } from "@/lib/reviews";
import { Eyebrow, Sprig } from "./ui";

/**
 * One review at a time.
 *
 * These entries still carry `sample: true` from src/lib/reviews.ts, so the card
 * keeps showing its "Sample" chip. Swap that file for real Google reviews and
 * the chip disappears on its own — see the note at the top of reviews.ts.
 */
export default function Testimonial() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const r = reviews[i];

  const go = (step: number) => {
    setDir(step);
    setI((n) => (n + step + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="relative bg-ivory pb-20 sm:pb-24 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-sand">
          <Sprig
            className="absolute -right-6 top-1/2 hidden h-64 w-48 -translate-y-1/2 rotate-[200deg] text-forest lg:block"
            opacity={0.12}
          />

          <div className="relative grid sm:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.62fr_1.38fr]">
            <SmartImage
              src={art.guest.image}
              alt={art.guest.alt}
              tone={art.guest.tone}
              sizes="(max-width: 640px) 100vw, 34vw"
              className="aspect-[16/10] w-full sm:aspect-auto sm:h-full"
            />

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <div className="flex items-center gap-3">
                <Eyebrow>What People Say</Eyebrow>
                {r.sample && (
                  <span className="rounded-full border border-forest/15 px-2 py-0.5 text-[8.5px] uppercase tracking-[0.18em] text-muted">
                    Sample
                  </span>
                )}
              </div>

              <div className="relative mt-6 min-h-[11rem] sm:min-h-[9rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.blockquote
                    key={r.name}
                    initial={{ opacity: 0, x: dir * 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -26 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="display text-[clamp(1.1rem,2.2vw,1.7rem)] leading-[1.42] text-forest">
                      &ldquo;{r.text}&rdquo;
                    </p>

                    <footer className="mt-7 flex items-center gap-3.5">
                      <Avatar name={r.name} initials={r.initials} src={r.avatar} />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="text-[12.5px] tracking-wide text-forest">
                            {r.name}
                          </span>
                          <span
                            aria-hidden
                            className="flex gap-0.5"
                            title={`${r.rating} out of 5`}
                          >
                            {Array.from({ length: r.rating }).map((_, n) => (
                              <Star key={n} size={11} className="fill-butter text-butter" />
                            ))}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[11px] tracking-wide text-muted">
                          {r.date}
                        </span>
                      </span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <NavButton label="Previous review" onClick={() => go(-1)}>
                  <ArrowLeft size={15} strokeWidth={1.5} />
                </NavButton>
                <NavButton label="Next review" onClick={() => go(1)}>
                  <ArrowRight size={15} strokeWidth={1.5} />
                </NavButton>
                <span className="ml-2 text-[11px] tracking-[0.18em] text-muted">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(reviews.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The reviewer's photograph, falling back to an initials badge — most real
 * reviews arrive without one, so the card has to look finished either way.
 */
function Avatar({
  name,
  initials,
  src,
}: {
  name: string;
  initials: string;
  src?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest/8 text-[12px] tracking-wide text-forest/70"
      >
        {initials}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={44}
      height={44}
      onError={() => setFailed(true)}
      className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-forest/10"
    />
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-forest/18 text-forest/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-forest hover:bg-forest hover:text-ivory"
    >
      {children}
    </button>
  );
}
