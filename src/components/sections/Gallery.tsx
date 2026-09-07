"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { gallery } from "@/lib/gallery";

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.5 });
  const x = useTransform(p, [0, 1], ["2%", "-72%"]);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative bg-ink"
      style={{ height: `${gallery.length * 62 + 80}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(217,184,102,0.10), transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Inside The Spa</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.04] text-cream">
              Gold light, marble calm,
              <span className="gold-text italic"> a door that closes</span>
            </h2>
          </Reveal>
        </div>

        <div className="scene-3d relative mt-12">
          <motion.div style={{ x }} className="flex gap-7 pl-5 will-change-transform sm:pl-8">
            {gallery.map((shot, i) => (
              <Card key={shot.src} i={i} n={gallery.length} progress={p} shot={shot} />
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto mt-10 flex w-full max-w-[1400px] items-center gap-4 px-5 sm:px-8">
          <div className="h-px flex-1 bg-cream/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-gold-dk to-gold-lt"
              style={{ scaleX: p }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-cream-dim/50">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

function Card({
  i,
  n,
  progress,
  shot,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  shot: (typeof gallery)[number];
}) {
  const center = n > 1 ? i / (n - 1) : 0.5;
  const span = 0.34;

  const rotateY = useTransform(
    progress,
    [center - span, center, center + span],
    [15, 0, -15],
    { clamp: true },
  );
  const scale = useTransform(
    progress,
    [center - span, center, center + span],
    [0.92, 1, 0.92],
    { clamp: true },
  );
  const z = useTransform(
    progress,
    [center - span, center, center + span],
    [-90, 0, -90],
    { clamp: true },
  );
  const bright = useTransform(
    progress,
    [center - span, center, center + span],
    [0.55, 1, 0.55],
    { clamp: true },
  );
  const filter = useTransform(bright, (b) => `brightness(${b})`);

  return (
    <motion.figure
      style={{ rotateY, scale, z, filter, transformStyle: "preserve-3d" }}
      className="group relative w-[74vw] shrink-0 sm:w-[46vw] lg:w-[32vw]"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-gold-lt/15 shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)]">
        <SmartImage
          src={shot.resolved}
          alt={shot.alt}
          tone={shot.tone}
          label={shot.caption}
          className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes="(max-width: 640px) 74vw, (max-width: 1024px) 46vw, 32vw"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent"
        />
        <figcaption className="absolute bottom-6 left-6 right-6">
          <span className="display block text-2xl text-cream">{shot.caption}</span>
          <span className="mt-1 block h-px w-10 bg-gold-lt/60" />
        </figcaption>
      </div>
    </motion.figure>
  );
}
