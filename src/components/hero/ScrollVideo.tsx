"use client";

import { useEffect, useRef, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "motion/react";

type Props = {
  /** 0 → 1 progress that drives playback position */
  p: MotionValue<number>;
  src: string;
  poster: string;
  className?: string;
  /** how much of the clip to use, 0 → 1 (trims a dead tail if there is one) */
  end?: number;
};

/**
 * A video scrubbed by scroll rather than played on a clock.
 *
 * Seeking a video on every scroll event is what makes this kind of effect
 * stutter, so instead the scroll position only ever sets a *target* time; a
 * rAF loop eases the real currentTime toward it and skips the seek entirely
 * when the difference is below a frame. That keeps the decoder from being
 * asked for a new random frame dozens of times a second.
 *
 * If the browser will not decode the file, or the visitor asked for reduced
 * motion, the poster frame is shown instead — the hero never ends up blank.
 */
export default function ScrollVideo({
  p,
  src,
  poster,
  className = "",
  end = 1,
}: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
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

  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;

    let raf = 0;
    let current = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const duration = el.duration;
      if (!duration || Number.isNaN(duration)) return;

      const want = target.current * duration * end;
      // ease toward the target so fast scrolls do not thrash the decoder
      current += (want - current) * 0.18;

      // one frame at 30fps; below this a seek is not worth the cost
      if (Math.abs(current - el.currentTime) > 1 / 30) {
        el.currentTime = current;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, end]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* poster underneath: covers the first paint, and the whole fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt="A therapist dispensing The Nature Spa treatment cream onto a guest's shoulder"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden={ready && !failed && !reduced ? true : undefined}
      />

      {!reduced && !failed && (
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          // never plays on a clock — scroll owns the playhead
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
          className="relative h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}
    </div>
  );
}
