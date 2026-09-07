"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees */
  intensity?: number;
  /** how far the content lifts toward the viewer, in px */
  lift?: number;
  glare?: boolean;
};

/**
 * Real 3D card tilt, from two sources added together.
 *
 * A pointer contributes tilt on hover, and the card's travel through the
 * viewport contributes a smaller, constant tilt of its own. On a phone there is
 * no hover, so the pointer term stays at rest and the scroll term is the whole
 * effect — which is why the cards still turn in 3D on touch, where a
 * hover-only implementation was simply flat.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 11,
  lift = 40,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 180, damping: 20, mass: 0.4 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  /* scroll term: leans back on the way in, forward on the way out */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollTilt = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [intensity * 0.9, 0, -intensity * 0.9]),
    { stiffness: 90, damping: 24, mass: 0.4 },
  );

  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const pointerTiltX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateX = useTransform(
    [pointerTiltX, scrollTilt],
    ([a, b]: number[]) => a + b,
  );
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(38% 55% at ${x}% ${y}%, rgba(255,246,220,0.5), transparent 70%)`,
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="scene-3d h-full">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative ${className}`}
      >
        <div
          className="h-full"
          style={{ transform: `translateZ(${lift}px)`, transformStyle: "preserve-3d" }}
        >
          {children}
        </div>

        {glare && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
