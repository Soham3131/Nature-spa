"use client";

import { useEffect, useRef, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "motion/react";

type Props = {
  /** 0 → 1 progress that drives playback position */
  p: MotionValue<number>;
  /** VP9/WebM first — it is far smaller and seeks roughly twice as fast */
  sources: { src: string; type: string }[];
  poster: string;
  className?: string;
};

/**
 * A video scrubbed by scroll rather than played on a clock.
 *
 * Seeking on every scroll event is what makes this effect stutter: it asks the
 * decoder for a fresh random frame dozens of times a second. So scroll only
 * ever sets a *target* time; a rAF loop eases the real currentTime toward it
 * and skips the seek entirely when the gap is under a frame. The loop is also
 * parked whenever the hero is off screen, so it costs nothing further down the
 * page.
 *
 * The clip was shot on white. The hero wraps this component in a
 * `mix-blend-mode: multiply` layer so that white drops out and the subject
 * sits directly on the page rather than in a boxed rectangle — the blend has
 * to be on a wrapper with no transform of its own, or the transform's stacking
 * context isolates it from the backdrop. A radial mask here feathers the
 * edges. If the browser cannot decode the clip, or the visitor asked for
 * reduced motion, the poster stands in and the hero is never blank.
 */
export default function ScrollVideo({ p, sources, poster, className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const visible = useRef(true);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  /* Decided once, on the client, so no state update bounces through an effect. */
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useMotionValueEvent(p, "change", (v) => {
    target.current = Math.min(1, Math.max(0, v));
  });

  /* park the loop when the hero scrolls away */
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;

    let raf = 0;
    let current = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible.current) return;

      const duration = el.duration;
      if (!duration || Number.isNaN(duration)) return;

      const want = target.current * duration;
      // ease toward the target so a fast scroll does not thrash the decoder
      current += (want - current) * 0.16;

      // one frame at 30fps; below this a seek is not worth its cost
      if (Math.abs(current - el.currentTime) > 1 / 30) {
        el.currentTime = current;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* One elliptical mask, offset low and right to follow the subject, so every
     straight edge of the crop dissolves. A second composited mask looked no
     better and cost another surface to rasterise. */
  const mask = "radial-gradient(66% 86% at 52% 48%, #000 30%, transparent 82%)";
  const feather = { maskImage: mask, WebkitMaskImage: mask } as const;

  return (
    <div ref={host} className={`relative ${className}`} style={feather}>
      {/* poster underneath: covers first paint, and the whole fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt="A therapist dispensing The Nature Spa treatment cream onto a guest's shoulder"
        className="absolute inset-0 h-full w-full object-contain"
        aria-hidden={ready && !failed && !reduced ? true : undefined}
      />

      {!reduced && !failed && (
        <video
          ref={video}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => setReady(true)}
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
          className="relative h-full w-full object-contain transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
