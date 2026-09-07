"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * The hero's ground: a slow mesh of coloured light, a botanical layer that
 * parallaxes at three different depths, and a gold horizon line.
 *
 * It stays deliberately light. The hero video is composited with
 * `mix-blend-mode: multiply`, which turns the clip's white studio background
 * transparent — but multiply only reads as "white disappears" over a pale
 * ground. Darken this and the subject goes with it.
 */

type Props = { p: MotionValue<number> };

const leaves = [
  { x: "4%", y: "16%", s: 0.62, r: -18, depth: 90, tint: "#2c6b2f", o: 0.2 },
  { x: "13%", y: "76%", s: 0.44, r: 24, depth: 40, tint: "#4e9e36", o: 0.26 },
  { x: "62%", y: "9%", s: 0.5, r: 132, depth: 60, tint: "#8cc63f", o: 0.3 },
  { x: "86%", y: "86%", s: 0.72, r: -160, depth: 120, tint: "#2c6b2f", o: 0.16 },
  { x: "40%", y: "88%", s: 0.34, r: 62, depth: 20, tint: "#a8783f", o: 0.26 },
  { x: "95%", y: "34%", s: 0.4, r: -60, depth: 30, tint: "#4e9e36", o: 0.2 },
];

export default function HeroBackdrop({ p }: Props) {
  const meshY = useTransform(p, [0, 1], ["0%", "-14%"]);
  const leafY = useTransform(p, [0, 1], [0, -180]);
  const leafYSlow = useTransform(p, [0, 1], [0, -70]);
  const horizon = useTransform(p, [0, 1], [0.35, 0]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* warm paper base */}
      <div className="absolute inset-0 bg-[linear-gradient(174deg,#fefdf7_0%,#f6f2e2_38%,#e7efd8_74%,#dfeacf_100%)]" />

      {/* coloured light, drifting */}
      <motion.div style={{ y: meshY }} className="absolute inset-[-18%]">
        <span className="animate-mesh absolute left-[52%] top-[6%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,rgba(140,198,63,0.6),transparent_72%)]" />
        <span
          className="animate-mesh absolute left-[4%] top-[38%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(44,107,47,0.55),transparent_72%)]"
          style={{ animationDelay: "-9s" }}
        />
        <span
          className="animate-mesh absolute right-[2%] top-[54%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(220,169,86,0.62),transparent_72%)]"
          style={{ animationDelay: "-17s" }}
        />
      </motion.div>

      {/* botanicals, three depths */}
      <div className="scene-3d absolute inset-0">
        {leaves.map((l, i) => (
          <motion.span
            key={i}
            style={{
              left: l.x,
              top: l.y,
              y: l.depth > 60 ? leafYSlow : leafY,
              transform: `translateZ(${l.depth}px)`,
              opacity: l.o,
            }}
            className="absolute"
          >
            <svg
              width={190 * l.s}
              height={190 * l.s}
              viewBox="0 0 120 120"
              style={{ transform: `rotate(${l.r}deg)` }}
            >
              <path
                d="M12 108 C10 62 34 22 108 12 C104 76 66 106 12 108 Z"
                fill={l.tint}
              />
              <path
                d="M12 108 C44 74 74 46 106 14"
                stroke="#fdfbf4"
                strokeOpacity="0.55"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </motion.span>
        ))}
      </div>

      {/* fine grain */}
      <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(23,56,26,0.05)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* gold horizon that fades as the pour begins */}
      <motion.span
        style={{ opacity: horizon }}
        className="absolute inset-x-0 bottom-[13%] h-px bg-[linear-gradient(90deg,transparent,rgba(168,120,63,0.55)_28%,rgba(220,192,138,0.8)_50%,rgba(168,120,63,0.55)_72%,transparent)]"
      />

      {/* vignette so the edges sit down */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_88%_at_50%_46%,transparent_52%,rgba(23,56,26,0.2)_100%)]" />
    </div>
  );
}
