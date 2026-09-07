"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Star, ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

const SpaScene = dynamic(() => import("@/components/three/SpaScene"), { ssr: false });

const words = ["Breathe.", "Unwind.", "Return."];

/** Viewport height, kept in sync with resize and mobile URL-bar changes. */
function useViewportHeight() {
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const update = () => setVh(window.innerHeight || 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return vh;
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Driven off absolute scroll distance rather than a measured element range.
   * A range-based `scrollYProgress` can resolve to 1 before layout settles,
   * which would fade the headline out while the page is still at the top —
   * this cannot: at scrollY 0 the hero is always fully visible.
   */
  const { scrollY } = useScroll();
  const vh = useViewportHeight();

  const SPRING = { stiffness: 90, damping: 24, mass: 0.5 };
  const yTitle = useSpring(useTransform(scrollY, [0, vh], [0, -140]), SPRING);
  const ySub = useSpring(useTransform(scrollY, [0, vh], [0, -70]), SPRING);
  const opacity = useTransform(scrollY, [0, vh * 0.72], [1, 0], { clamp: true });
  const scale = useTransform(scrollY, [0, vh], [1, 1.12], { clamp: true });
  const blur = useTransform(scrollY, [0, vh], ["blur(0px)", "blur(6px)"], {
    clamp: true,
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden grain"
    >
      {/* WebGL layer */}
      <SpaScene className="pointer-events-none absolute inset-0 -z-10" />

      {/* light bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(46% 38% at 50% 46%, rgba(7,16,13,0.72), transparent 72%), radial-gradient(75% 55% at 50% 40%, rgba(217,184,102,0.10), transparent 70%), radial-gradient(90% 70% at 50% 108%, rgba(7,16,13,0.98), transparent 60%)",
        }}
      />

      <motion.div
        style={{ opacity, scale, filter: blur }}
        className="scene-3d relative z-10 mx-auto w-full max-w-[1200px] px-5 pt-28 pb-24 text-center sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-fit items-center gap-2.5 rounded-full glass px-4 py-2"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className="fill-gold text-gold" />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.26em] text-cream/85">
            {site.rating.value} · Loved in Gurugram
          </span>
        </motion.div>

        <motion.h1 style={{ y: yTitle }} className="layer-3d mt-9">
          <span className="sr-only">
            {site.name} — {site.tagline}
          </span>

          <span aria-hidden className="block">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 60, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.3,
                  delay: 0.16 * i + 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="display block text-[clamp(3.1rem,12vw,10rem)] leading-[0.92] text-cream"
                style={{ transformStyle: "preserve-3d" }}
              >
                {i === 1 ? <span className="gold-text italic">{w}</span> : w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div style={{ y: ySub }} className="layer-3d">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-cream-dim/85 sm:text-base"
          >
            A luxury body spa in the heart of Gurugram. Certified therapists,
            private candlelit suites, and rituals drawn from Bali, Thailand and Morocco.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-br from-gold-lt via-gold to-gold-dk px-9 py-4 text-[12px] uppercase tracking-[0.24em] text-ink shadow-[0_18px_50px_-16px_rgba(217,184,102,0.75)] transition-transform duration-500 hover:scale-[1.04] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/35 blur-md transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
              <span className="relative">Book on WhatsApp</span>
            </a>

            <a
              href="#services"
              className="w-full rounded-full border border-cream/22 px-9 py-4 text-[12px] uppercase tracking-[0.24em] text-cream/90 transition-all duration-500 hover:border-gold-lt/70 hover:text-gold sm:w-auto"
            >
              View Therapies
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue — outer div owns the scroll fade, inner owns the entrance */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#experience"
          aria-label="Scroll to explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="flex flex-col items-center gap-2.5 text-cream/55 transition-colors hover:text-gold"
        >
          <span className="text-[9px] uppercase tracking-[0.34em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={15} strokeWidth={1.3} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
