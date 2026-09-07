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
 * A horizontal gallery driven by vertical scroll. The section is tall, the
 * stage inside it is pinned, and progress through the section slides the row
 * sideways while each card turns slightly in 3D as it passes the middle.
 *
 * The stage reserves room for the nav and the heading before the row starts,
 * so nothing is ever clipped under the header.
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
    restDelta: 0.0005,
  });

  /* slide just far enough to bring the last card fully into view */
  const x = useTransform(p, [0, 1], ["0%", "-64%"]);

  return (
    <section
      id="gallery"
      ref={section}
      className="relative bg-ivory"
      style={{ height: `${gallery.length * 40 + 60}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 50% at 50% 8%, rgba(143,194,74,0.16), transparent 70%)",
          }}
        />

        {/* heading — sits below the fixed nav, never clipped */}
        <div className="relative mx-auto w-full max-w-[1400px] shrink-0 px-5 pt-28 sm:px-8 sm:pt-32">
          <Reveal>
            <p className="eyebrow">Inside The Spa</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06]">
              Where the city finally
              <span className="accent-text italic"> goes quiet</span>
            </h2>
          </Reveal>
        </div>

        {/* the row */}
        <div className="scene-3d relative flex flex-1 items-center">
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-5 will-change-transform sm:gap-8 sm:pl-8"
          >
            {gallery.map((shot, i) => (
              <Card key={shot.src} i={i} n={gallery.length} p={p} shot={shot} />
            ))}
          </motion.div>
        </div>

        {/* progress */}
        <div className="relative mx-auto mb-10 flex w-full max-w-[1400px] shrink-0 items-center gap-4 px-5 sm:px-8">
          <span className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-muted">
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
}: {
  i: number;
  n: number;
  p: MotionValue<number>;
  shot: (typeof gallery)[number];
}) {
  const centre = n > 1 ? i / (n - 1) : 0.5;
  const span = 0.36;

  const rotateY = useTransform(p, [centre - span, centre, centre + span], [13, 0, -13], {
    clamp: true,
  });
  const scale = useTransform(p, [centre - span, centre, centre + span], [0.94, 1, 0.94], {
    clamp: true,
  });
  const z = useTransform(p, [centre - span, centre, centre + span], [-70, 0, -70], {
    clamp: true,
  });

  return (
    <motion.figure
      style={{ rotateY, scale, z, transformStyle: "preserve-3d" }}
      className="group w-[76vw] shrink-0 overflow-hidden rounded-[1.5rem] card sm:w-[42vw] lg:w-[27vw]"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <SmartImage
          src={shot.resolved}
          alt={shot.alt}
          tone={shot.tone}
          label={shot.caption}
          className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes="(max-width: 640px) 76vw, (max-width: 1024px) 42vw, 27vw"
        />
      </div>

      {/* caption on white — always legible, whatever the photo */}
      <figcaption className="flex items-center justify-between gap-4 px-6 py-5">
        <span>
          <span className="display block text-xl leading-tight">{shot.caption}</span>
          <span className="mt-1.5 block h-px w-9 bg-leaf" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
          {String(i + 1).padStart(2, "0")}
        </span>
      </figcaption>
    </motion.figure>
  );
}
