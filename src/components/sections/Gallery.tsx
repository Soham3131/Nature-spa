"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { gallery } from "@/lib/gallery";

/**
 * A horizontal gallery driven by vertical scroll, on every screen size.
 *
 * The section is tall, the stage inside it is pinned, and scrolling down slides
 * the row sideways while each card turns in 3D as it passes the middle. Phones
 * get a shorter scroll range and one card in view at a time; the behaviour is
 * otherwise identical, so it reads the same on a phone as it does on a desktop.
 */
export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });

  /* far enough to bring the last card fully into view at either card width */
  const x = useTransform(p, [0, 1], ["0%", "-82%"]);
  const xWide = useTransform(p, [0, 1], ["0%", "-64%"]);

  return (
    <section
      id="gallery"
      ref={section}
      className="scroll-mt-24 relative h-[230vh] bg-ivory sm:h-[250vh] lg:h-[280vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 50% at 50% 8%, rgba(140,198,63,0.16), transparent 70%)",
          }}
        />

        {/* heading — sits below the fixed nav, never clipped */}
        <div className="relative mx-auto w-full max-w-[1400px] shrink-0 px-5 pt-[calc(var(--nav-h)+0.5rem)] sm:px-8 lg:pt-[calc(var(--nav-h)+2rem)]">
          <Reveal>
            <p className="eyebrow">Inside The Spa</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-3 max-w-2xl text-[clamp(1.7rem,4.4vw,3.4rem)] leading-[1.06]">
              Where the city finally
              <span className="accent-text italic"> goes quiet</span>
            </h2>
          </Reveal>
        </div>

        {/* the row */}
        <div className="relative flex flex-1 items-center [perspective:1100px]">
          <motion.div
            style={{ x }}
            className="flex gap-4 pl-5 will-change-transform sm:gap-8 sm:pl-8 lg:hidden"
          >
            {gallery.map((shot, i) => (
              <Card key={shot.src} i={i} n={gallery.length} p={p} shot={shot} />
            ))}
          </motion.div>

          <motion.div
            style={{ x: xWide }}
            className="hidden gap-8 pl-8 will-change-transform lg:flex"
          >
            {gallery.map((shot, i) => (
              <Card key={shot.src} i={i} n={gallery.length} p={p} shot={shot} wide />
            ))}
          </motion.div>
        </div>

        {/* progress */}
        <div className="relative mx-auto mb-8 flex w-full max-w-[1400px] shrink-0 items-center gap-4 px-5 sm:px-8 lg:mb-10">
          <span className="shrink-0 text-[9px] uppercase tracking-[0.24em] text-muted sm:text-[10px] sm:tracking-[0.28em]">
            Keep scrolling
          </span>
          <div className="h-px flex-1 bg-forest/12">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-leaf to-forest"
              style={{ scaleX: p }}
            />
          </div>
          {/* room for the floating WhatsApp button */}
          <span className="w-16 shrink-0 sm:w-20" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function Card({
  i,
  n,
  p,
  shot,
  wide = false,
}: {
  i: number;
  n: number;
  p: MotionValue<number>;
  shot: (typeof gallery)[number];
  wide?: boolean;
}) {
  const centre = n > 1 ? i / (n - 1) : 0.5;
  const span = wide ? 0.36 : 0.22;

  const rotateY = useTransform(p, [centre - span, centre, centre + span], [26, 0, -26], {
    clamp: true,
  });
  const scale = useTransform(p, [centre - span, centre, centre + span], [0.88, 1, 0.88], {
    clamp: true,
  });
  const z = useTransform(p, [centre - span, centre, centre + span], [-120, 0, -120], {
    clamp: true,
  });
  const opacity = useTransform(
    p,
    [centre - span * 1.3, centre, centre + span * 1.3],
    [0.5, 1, 0.5],
    { clamp: true },
  );

  return (
    <motion.figure
      style={{ rotateY, scale, z, opacity, transformStyle: "preserve-3d" }}
      className={`group shrink-0 overflow-hidden rounded-[1.4rem] card ${
        wide ? "w-[27vw]" : "w-[74vw] sm:w-[44vw]"
      }`}
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <SmartImage
          src={shot.resolved}
          alt={shot.alt}
          tone={shot.tone}
          label={shot.caption}
          className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes={wide ? "27vw" : "(max-width: 640px) 74vw, 44vw"}
        />
      </div>

      <figcaption className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <span>
          <span className="display block text-lg leading-tight sm:text-xl">
            {shot.caption}
          </span>
          <span className="mt-1.5 block h-px w-9 bg-leaf" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
          {String(i + 1).padStart(2, "0")}
        </span>
      </figcaption>
    </motion.figure>
  );
}
