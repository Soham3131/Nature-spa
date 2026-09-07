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
  /** applied to the media itself, for fit and framing */
  mediaClassName?: string;
  /** CSS mask that feathers the crop */
  mask?: string;
};

const DEFAULT_MASK =
  "radial-gradient(70% 76% at 52% 62%, #000 44%, transparent 88%)";

/**
 * A video scrubbed by scroll rather than played on a clock.
 *
 * Seeking on every scroll event is what makes this effect stutter: it asks the
 * decoder for a fresh random frame dozens of times a second. So scroll only
 * sets a *target* time; a rAF loop eases the real currentTime toward it and
 * skips the seek when the gap is under a frame. The loop parks itself whenever
 * the hero is off screen.
 *
 * Two decoder rules matter. The element is revealed only once `readyState`
 * reaches HAVE_CURRENT_DATA, because a VP9 stream paints a bright green
 * initialisation frame if shown earlier; and no new seek is issued while one is
 * in flight, which is the other way that frame surfaces. Readiness is polled in
 * the loop rather than taken from a media event, since those can fire before
 * React has attached its handlers.
 *
 * The clip was shot on white. The hero wraps this in a `mix-blend-mode:
 * multiply` layer so the white drops out and the subject sits directly on the
 * page. That blend must be on a wrapper with no transform of its own, and with
 * no `perspective` ancestor, or it is silently switched off.
 */
export default function ScrollVideo({
  p,
  sources,
  poster,
  className = "",
  mediaClassName = "object-contain",
  mask = DEFAULT_MASK,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const visible = useRef(true);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useMotionValueEvent(p, "change", (v) => {
    target.current = Math.min(1, Math.max(0, v));
  });

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

      if (el.readyState >= 2) setReady(true);
      if (!visible.current) return;
      if (el.readyState < 2 || el.seeking) return;

      const duration = el.duration;
      if (!duration || Number.isNaN(duration)) return;

      const want = target.current * duration;
      current += (want - current) * 0.16;

      if (Math.abs(current - el.currentTime) > 1 / 30) {
        el.currentTime = current;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const feather = { maskImage: mask, WebkitMaskImage: mask } as const;

  return (
    <div ref={host} className={`relative ${className}`} style={feather}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt="A therapist dispensing The Nature Spa treatment cream onto a guest's shoulder"
        className={`absolute inset-0 h-full w-full ${mediaClassName}`}
        aria-hidden={ready && !failed && !reduced ? true : undefined}
      />

      {!reduced && !failed && (
        <video
          ref={video}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onError={() => setFailed(true)}
          className={`relative h-full w-full transition-opacity duration-700 ${mediaClassName}`}
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
