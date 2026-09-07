"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { gallery } from "@/lib/gallery";

/**
 * Two presentations of the same set.
 *
 * On a large screen the section is tall, the stage inside it is pinned, and
 * scrolling down slides the row sideways while each card turns in 3D as it
 * passes the middle.
 *
 * On a phone that pattern is wrong: it costs three screens of scrolling to see
 * six pictures, and a thumb wants to swipe them anyway. So small screens get a
 * native snap-scrolling row instead, in normal flow — the same cards, a
 * fraction of the page height, and it works with the gesture people expect.
 */
export default function Gallery() {
  const section = useRef<HTMLElement>(null);

  /* phones: the rail's own horizontal scroll drives the cards' 3D */
  const rail = useRef<HTMLDivElement>(null);
  const railX = useMotionValue(0);
  const onRailScroll = () => {
    const el = rail.current;
    if (el) railX.set(el.scrollLeft);
  };

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

  const x = useTransform(p, [0, 1], ["0%", "-64%"]);

  return (
    <section
      id="gallery"
      ref={section}
      className="scroll-mt-24 relative bg-ivory lg:h-[280vh]"
      // the tall scroll range only exists on large screens
    >
      <div className="relative flex flex-col py-16 sm:py-20 lg:sticky lg:top-0 lg:h-[100svh] lg:justify-center lg:overflow-hidden lg:py-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 50% at 50% 8%, rgba(140,198,63,0.18), transparent 70%)",
          }}
        />

        {/* heading */}
        <div className="relative mx-auto w-full max-w-[1400px] shrink-0 px-5 sm:px-8 lg:pt-28">
          <Reveal>
            <p className="eyebrow">Inside The Spa</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-3 max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.06]">
              Where the city finally
              <span className="accent-text italic"> goes quiet</span>
            </h2>
          </Reveal>
        </div>

        {/* ---------------- phones: a swipeable row ---------------- */}
        <div className="relative mt-8 lg:hidden">
          <div
            ref={rail}
            onScroll={onRailScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [perspective:900px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.map((shot, i) => (
              <SwipeCard key={shot.src} i={i} shot={shot} rail={railX} />
            ))}
          </div>
          <p className="mt-1 px-5 text-[10px] uppercase tracking-[0.24em] text-muted">
            Swipe to see more
          </p>
        </div>

        {/* ---------------- large screens: pinned, scroll-driven ---------------- */}
        <div className="scene-3d relative hidden flex-1 items-center lg:flex">
          <motion.div style={{ x }} className="flex gap-8 pl-8 will-change-transform">
            {gallery.map((shot, i) => (
              <Card key={shot.src} i={i} n={gallery.length} p={p} shot={shot} />
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto mb-10 hidden w-full max-w-[1400px] shrink-0 items-center gap-4 px-8 lg:flex">
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
          <span className="w-20 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/**
 * A card in the phone rail. It turns and lifts according to how far it is from
 * the middle of the rail, so swiping produces the same 3D as scrolling does on
 * a desktop rather than a flat strip.
 */
function SwipeCard({
  i,
  shot,
  rail,
}: {
  i: number;
  shot: (typeof gallery)[number];
  rail: MotionValue<number>;
}) {
  const ref = useRef<HTMLElement>(null);

  const offset = useTransform(rail, (x) => {
    const el = ref.current;
    if (!el || !el.parentElement) return 0;
    const centre = el.offsetLeft + el.offsetWidth / 2;
    const view = x + el.parentElement.clientWidth / 2;
    return (centre - view) / el.offsetWidth;
  });

  const rotateY = useTransform(offset, [-1.1, 0, 1.1], [-34, 0, 34], { clamp: true });
  const scale = useTransform(offset, [-1.1, 0, 1.1], [0.82, 1, 0.82], { clamp: true });
  const z = useTransform(offset, [-1.1, 0, 1.1], [-150, 0, -150], { clamp: true });
  const cardOpacity = useTransform(offset, [-1.3, 0, 1.3], [0.45, 1, 0.45], {
    clamp: true,
  });

  return (
    <motion.figure
      ref={ref}
      style={{ rotateY, scale, z, opacity: cardOpacity, transformStyle: "preserve-3d" }}
      className="w-[74vw] shrink-0 snap-center overflow-hidden rounded-[1.4rem] card"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <SmartImage
          src={shot.resolved}
          alt={shot.alt}
          tone={shot.tone}
          label={shot.caption}
          className="h-full w-full"
          sizes="78vw"
        />
      </div>
      <Caption i={i} caption={shot.caption} />
    </motion.figure>
  );
}

function Caption({ i, caption }: { i: number; caption: string }) {
  return (
    <figcaption className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
      <span>
        <span className="display block text-lg leading-tight sm:text-xl">{caption}</span>
        <span className="mt-1.5 block h-px w-9 bg-leaf" />
      </span>
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
        {String(i + 1).padStart(2, "0")}
      </span>
    </figcaption>
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
      className="group w-[27vw] shrink-0 overflow-hidden rounded-[1.5rem] card"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <SmartImage
          src={shot.resolved}
          alt={shot.alt}
          tone={shot.tone}
          label={shot.caption}
          className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes="27vw"
        />
      </div>
      <Caption i={i} caption={shot.caption} />
    </motion.figure>
  );
}
