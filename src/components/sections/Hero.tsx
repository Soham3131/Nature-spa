"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Star, ArrowDown } from "lucide-react";
import OilPourScene from "@/components/hero/OilPourScene";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

const words = ["Breathe.", "Unwind.", "Return."];

/** Captions that narrate the pour as it happens. */
const captions = [
  { at: [0.0, 0.2] as const, text: "Shoulders that have not let go all week" },
  { at: [0.3, 0.5] as const, text: "Warm oil, poured slowly" },
  { at: [0.6, 0.78] as const, text: "The knots begin to give" },
  { at: [0.88, 1.0] as const, text: "Completely, finally at ease" },
];

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);

  /**
   * Progress through the tall hero section. The sticky child stays pinned for
   * the section's whole range, so 0 → 1 maps onto "just pinned" → "about to
   * release" — which is exactly what the scene animates against.
   */
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });

  /* the copy drifts gently while the scene does the work */
  const copyY = useTransform(p, [0, 1], [0, -24]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0], { clamp: true });

  return (
    <section ref={stage} className="relative h-[300vh] bg-ivory">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden grain">
        {/* soft green bloom behind everything */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 52% at 76% 44%, rgba(143,194,74,0.20), transparent 68%), radial-gradient(46% 44% at 12% 18%, rgba(87,166,60,0.13), transparent 70%), linear-gradient(180deg, #fbfaf5 0%, #f4f5ec 100%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-4 px-5 pt-20 sm:gap-6 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:pt-0">
          {/* ------------------------------ copy ------------------------------ */}
          <motion.div
            style={{ y: copyY }}
            className="relative z-10 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-forest/10 bg-paper/80 px-4 py-2 shadow-sm backdrop-blur lg:mx-0"
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

            <h1 className="mt-7">
              <span className="sr-only">
                {site.name} — {site.tagline}
              </span>
              <span aria-hidden className="block">
                {words.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 44 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.14 * i + 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="display block text-[clamp(2.15rem,7vw,5.4rem)] leading-[0.95]"
                  >
                    {i === 1 ? <span className="accent-text italic">{w}</span> : w}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-5 max-w-md text-[13.5px] leading-[1.7] text-body sm:text-[15px] sm:leading-[1.8] lg:mx-0"
            >
              A luxury body spa in the heart of Gurugram. Certified therapists,
              private candlelit suites, and rituals drawn from Bali, Thailand
              and Morocco.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3 sm:justify-center lg:justify-start"
            >
              <a
                href={whatsappLink(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full overflow-hidden rounded-full bg-forest px-8 py-3.5 text-[11.5px] uppercase tracking-[0.22em] text-ivory shadow-[0_14px_34px_-14px_rgba(31,74,34,0.7)] transition-transform duration-500 hover:scale-[1.03] sm:py-4 sm:text-[12px] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-lime/40 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
                <span className="relative">Book on WhatsApp</span>
              </a>

              <a
                href="#services"
                className="w-full rounded-full border border-forest/20 px-8 py-3.5 text-[11.5px] uppercase tracking-[0.22em] text-forest transition-all duration-500 hover:border-forest/50 hover:bg-paper sm:py-4 sm:text-[12px] sm:w-auto"
              >
                View Therapies
              </a>
            </motion.div>

            {/* narration */}
            <div className="relative mt-9 hidden h-6 lg:block">
              {captions.map((c) => (
                <Caption key={c.text} p={p} at={c.at} text={c.text} />
              ))}
            </div>
          </motion.div>

          {/* ------------------------------ scene ------------------------------ */}
          <div className="relative flex w-full justify-center lg:block">
            <OilPourScene
              p={p}
              className="h-[32svh] w-auto drop-shadow-[0_30px_60px_rgba(31,74,34,0.10)] sm:h-[38svh] lg:h-auto lg:w-full"
            />
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="flex flex-col items-center gap-2 text-body/70"
          >
            <span className="text-[9px] uppercase tracking-[0.32em]">
              Scroll to pour
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
