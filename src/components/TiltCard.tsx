"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

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
 * Real 3D card tilt driven by pointer position, with a moving specular glare.
 * Falls back to a plain card on touch devices (no pointer hover).
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

  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
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
