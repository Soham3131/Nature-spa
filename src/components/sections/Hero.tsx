"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Star, ArrowDown, MapPin, Clock } from "lucide-react";
import HeroBackdrop from "@/components/hero/HeroBackdrop";
import ScrollVideo from "@/components/hero/ScrollVideo";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

const words = ["Breathe.", "Unwind.", "Return."];

/** Captions that narrate the clip as it plays out. */
const captions = [
  { at: [0.0, 0.2] as const, text: "Shoulders that have not let go all week" },
  { at: [0.3, 0.5] as const, text: "Our own blend, warmed and ready" },
  { at: [0.6, 0.78] as const, text: "The knots begin to give" },
  { at: [0.88, 1.0] as const, text: "Completely, finally at ease" },
];

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.3,
    restDelta: 0.0008,
  });

  /* depth: the copy, the film and the label all move at different rates */
  const copyY = useTransform(p, [0, 1], [0, -60]);
  const filmY = useTransform(p, [0, 1], [0, 40]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0], { clamp: true });
  const stripY = useTransform(p, [0, 1], [0, -22]);

  return (
    <section ref={stage} className="relative h-[190vh] bg-ivory sm:h-[240vh] lg:h-[320vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/*
          The backdrop sits inside this group on purpose. `mix-blend-mode` on
          the film blends it with whatever was painted below it *in the same
          stacking context*; with the backdrop outside, the clip's white studio
          ground had nothing to blend into and stayed a white rectangle.
        */}
        {/*
          No perspective / preserve-3d on this container: an element inside a 3D
          rendering context is composited on its own, which switches
          mix-blend-mode off. The backdrop keeps its own 3D context internally
          for the parallax leaves, where nothing needs to blend.
        */}
        <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center px-5 pt-20 sm:px-8 lg:pt-0">
          <HeroBackdrop p={p} />

          <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
            {/* ------------------------------ copy ------------------------------ */}
            <motion.div
              style={{ y: copyY }}
              className="relative z-20 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-forest/12 bg-paper/85 px-4 py-2 shadow-[0_10px_24px_-16px_rgba(23,56,26,0.5)] lg:mx-0"
              >
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="fill-butter text-butter" />
                  ))}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-body">
                  {site.rating.value} · Loved in Gurugram
                </span>
              </motion.div>

              <h1 className="relative mt-6 sm:mt-8">
                <span className="sr-only">
                  {site.name} — {site.tagline}
                </span>

                {/* oversized watermark behind the words */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-2 -top-10 hidden select-none text-[13rem] leading-none text-forest/7 lg:block"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  01
                </span>

                <span aria-hidden className="relative block">
                  {words.map((w, i) => (
                    <span key={w} className="block overflow-hidden">
                      <motion.span
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{
                          duration: 1.15,
                          delay: 0.13 * i + 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="display block text-[clamp(2.4rem,7.4vw,5.9rem)] leading-[0.96]"
                      >
                        {i === 1 ? (
                          <span className="accent-text italic">{w}</span>
                        ) : (
                          w
                        )}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.55 }}
                className="mx-auto mt-6 h-px w-24 bg-[linear-gradient(90deg,rgba(168,120,63,0.7),transparent)] lg:mx-0"
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-5 max-w-md text-[13.5px] leading-[1.75] text-body sm:text-[15px] sm:leading-[1.85] lg:mx-0"
              >
                A luxury body spa in the heart of Gurugram. Certified therapists,
                private candlelit suites, and rituals drawn from Bali, Thailand
                and Morocco.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3 lg:justify-start"
              >
                <a
                  href={whatsappLink(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full overflow-hidden rounded-full bg-forest px-8 py-3.5 text-[11.5px] uppercase tracking-[0.22em] text-ivory shadow-[0_18px_40px_-16px_rgba(23,56,26,0.8)] transition-transform duration-500 hover:scale-[1.03] sm:w-auto sm:py-4 sm:text-[12px]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(140,198,63,0.55),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
                  <span className="relative">Book on WhatsApp</span>
                </a>

                <a
                  href="#services"
                  className="w-full rounded-full border border-forest/20 bg-paper/50 px-8 py-3.5 text-[11.5px] uppercase tracking-[0.22em] text-forest transition-all duration-500 hover:border-forest/45 hover:bg-paper sm:w-auto sm:py-4 sm:text-[12px]"
                >
                  View Therapies
                </a>
              </motion.div>

              {/* narration */}
              <div className="relative mt-8 hidden h-6 lg:block">
                {captions.map((c) => (
                  <Caption key={c.text} p={p} at={c.at} text={c.text} />
                ))}
              </div>
            </motion.div>

            {/* ------------------------------ film ------------------------------ */}
            <div className="relative z-10 -mx-2 mix-blend-multiply sm:mx-0">
              <motion.div style={{ y: filmY }}>
                <ScrollVideo
                  p={p}
                  sources={[
                    { src: "/spaa-720.webm", type: "video/webm" },
                    { src: "/spaa.mp4", type: "video/mp4" },
                  ]}
                  poster="/hero-poster.jpg"
                  className="aspect-16/10 w-full"
                />
              </motion.div>
            </div>
          </div>

          {/* ------------------------------ detail strip ------------------------------ */}
          <motion.div
            style={{ y: stripY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mx-auto mt-6 hidden w-full max-w-3xl items-center justify-between gap-6 rounded-2xl glass px-7 py-4 lg:mx-0 lg:flex"
          >
            <Fact icon={MapPin} label="Where" value={site.address.city} />
            <span className="h-8 w-px bg-forest/12" />
            <Fact icon={Clock} label="Open" value="10:00 AM – 9:30 PM" />
            <span className="h-8 w-px bg-forest/12" />
            <Fact icon={Star} label="Rated" value={`${site.rating.value} on Google`} />
            <a
              href={`tel:+${site.phoneRaw}`}
              className="ml-auto text-[13px] tracking-wide text-forest-2 transition-colors hover:text-leaf"
            >
              {site.phoneDisplay}
            </a>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="flex flex-col items-center gap-2 text-muted"
          >
            <span className="text-[9px] uppercase tracking-[0.32em]">
              Scroll to begin
            </span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={15} strokeWidth={1.4} />
            </motion.span>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <span className="flex items-center gap-3">
      <Icon size={15} strokeWidth={1.6} className="shrink-0 text-bronze" />
      <span>
        <span className="block text-[9.5px] uppercase tracking-[0.22em] text-muted">
          {label}
        </span>
        <span className="mt-0.5 block text-[13px] text-forest">{value}</span>
      </span>
    </span>
  );
}

function Caption({
  p,
  at,
  text,
}: {
  p: MotionValue<number>;
  at: readonly [number, number];
  text: string;
}) {
  const [from, to] = at;
  const opacity = useTransform(p, [from - 0.04, from, to, to + 0.04], [0, 1, 1, 0], {
    clamp: true,
  });
  const y = useTransform(p, [from - 0.04, to + 0.04], [10, -10], { clamp: true });

  return (
    <motion.span
      style={{ opacity, y }}
      className="absolute inset-x-0 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-bronze"
    >
      <span className="h-px w-8 bg-bronze/50" />
      {text}
    </motion.span>
  );
}
