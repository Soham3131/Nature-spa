"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * The hero story, told with one scroll.
 *
 *   0.00 → 0.14   at rest — shoulders and upper back, tension held
 *   0.14 → 0.36   the bottle tips over the right shoulder
 *   0.32 → 0.62   warm oil runs down and lands
 *   0.44 → 0.82   the oil spreads and catches the light
 *   0.54 → 0.84   the knots let go
 *   0.68 → 1.00   ease settles in and lifts off the skin
 *
 * Plain SVG driven by scroll-linked motion values — no WebGL, no video, no
 * external assets. `p` is 0 → 1 progress through the pinned hero.
 *
 * Geometry notes: the bottle tips about its base rather than its middle.
 * Motion owns `transform-origin` on the elements it animates, so the pivot has
 * to be set through originX/originY (a plain `transformOrigin` in style is
 * overwritten). With transform-box: fill-box those are fractions of the
 * group's bounding box, so the oil inside is clipped to the glass — that keeps
 * the box exactly the bottle, x 406-454 by y 46-212, and 0.5/1 lands on the
 * base. At the final -124° plus its travel the mouth reaches (338, 258): clear
 * of the head and right above the shoulder blade, where the stream, the pool
 * and the shine are all aimed.
 */

type Props = { p: MotionValue<number>; className?: string };

/** Map hero progress onto a clamped sub-range. Named use* — it wraps a hook. */
const useSeg = (
  p: MotionValue<number>,
  from: number,
  to: number,
  out: [number, number],
) => useTransform(p, [from, to], out, { clamp: true });

export default function OilPourScene({ p, className = "" }: Props) {
  /* ---------------- bottle ---------------- */
  const bottleX = useSeg(p, 0.14, 0.36, [0, 45]);
  const bottleY = useSeg(p, 0.14, 0.36, [0, -46]);
  const bottleRot = useSeg(p, 0.14, 0.36, [-4, -124]);
  const bottleLift = useSeg(p, 0.84, 1, [0, -46]);
  const bottleUnpour = useSeg(p, 0.84, 1, [0, 104]);

  const bx = useTransform([bottleX, bottleLift], ([a, b]: number[]) => a + b * 0.5);
  const by = useTransform([bottleY, bottleLift], ([a, b]: number[]) => a + b);
  const brot = useTransform([bottleRot, bottleUnpour], ([a, b]: number[]) => a + b);


  /* Oil obeys gravity: it sits at the base upright, runs to the mouth as the
     bottle tips, then drains away as it pours. Local +y is toward the base, so
     "toward the mouth" means a smaller y. */
  const oilY = useSeg(p, 0.14, 0.36, [148, 52]);
  const oilH = useSeg(p, 0.34, 0.72, [64, 20]);

  /* ---------------- stream ---------------- */
  const streamDraw = useSeg(p, 0.32, 0.5, [1, 0]); // normalised dashoffset
  const streamFade = useSeg(p, 0.66, 0.82, [1, 0]);
  const streamWidth = useSeg(p, 0.33, 0.46, [1.2, 6.5]);

  /* ---------------- landing ---------------- */
  const poolScale = useSeg(p, 0.44, 0.82, [0.45, 1]);
  const poolOpacity = useSeg(p, 0.42, 0.58, [0, 1]);
  const glossY = useSeg(p, 0.56, 0.94, [-190, 250]);
  const glossOpacity = useTransform(p, [0.54, 0.64, 0.9, 1], [0, 0.9, 0.9, 0], {
    clamp: true,
  });

  /* ---------------- tension → ease ---------------- */
  const tension = useSeg(p, 0.52, 0.8, [1, 0]);
  const tensionLift = useSeg(p, 0.52, 0.8, [0, -16]);
  const ease = useSeg(p, 0.68, 0.94, [0, 1]);
  const easeRise = useSeg(p, 0.68, 1, [18, -24]);
  const settle = useSeg(p, 0.6, 0.96, [0, 6]);
  const breath = useSeg(p, 0.7, 1, [1, 1.014]);

  /* ---------------- ambience ---------------- */
  const washScale = useSeg(p, 0, 1, [1, 1.14]);
  const leafRise = useSeg(p, 0.66, 1, [30, -78]);
  const leafFade = useTransform(p, [0.66, 0.78, 0.95, 1], [0, 1, 1, 0], {
    clamp: true,
  });

  return (
    <svg
      viewBox="0 0 560 700"
      className={className}
      role="img"
      aria-label="An illustration of warm oil being poured onto a guest's shoulders during a massage, and the tension melting away."
    >
      <defs>
        <linearGradient id="skin" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#efd3b6" />
          <stop offset="42%" stopColor="#e0b892" />
          <stop offset="100%" stopColor="#c1926b" />
        </linearGradient>

        <linearGradient id="skinArm" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#d9ac83" />
          <stop offset="100%" stopColor="#bd8a63" />
        </linearGradient>

        <linearGradient id="oil" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#f0cd77" />
          <stop offset="55%" stopColor="#d8a53c" />
          <stop offset="100%" stopColor="#b8842a" />
        </linearGradient>

        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#6d9c4e" />
          <stop offset="38%" stopColor="#42722f" />
          <stop offset="100%" stopColor="#255020" />
        </linearGradient>

        <linearGradient id="towel" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eaeee2" />
        </linearGradient>

        <radialGradient id="wash" cx="0.5" cy="0.42" r="0.62">
          <stop offset="0%" stopColor="#8fc24a" stopOpacity="0.32" />
          <stop offset="58%" stopColor="#57a63c" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#57a63c" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="poolG" cx="0.42" cy="0.34" r="0.68">
          <stop offset="0%" stopColor="#f3d68a" stopOpacity="0.92" />
          <stop offset="48%" stopColor="#dcaa4a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c08c2e" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff8e4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* keeps the oil inside the glass — and pins the bottle's bounding box */}
        <clipPath id="bottleClip">
          <path d="M408 200 v-84 c0 -12 6 -14 6 -22 v-12 h32 v12 c0 8 6 10 6 22 v84 c0 8 -8 12 -22 12 s-22 -4 -22 -12 Z" />
        </clipPath>

        {/* keeps oil and shine inside the back */}
        <clipPath id="backClip">
          <path d="M168 336 C176 306 214 292 252 288 L308 288 C346 292 384 306 392 336 C398 380 380 470 356 552 L204 552 C180 470 162 380 168 336 Z" />
        </clipPath>

        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="softSm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ------------------------------------------------ ambience */}
      <motion.ellipse
        cx="280"
        cy="360"
        rx="252"
        ry="272"
        fill="url(#wash)"
        style={{ transformBox: "fill-box", transformOrigin: "center", scale: washScale }}
      />

      {/* ------------------------------------------------ bed */}
      <ellipse cx="282" cy="668" rx="188" ry="17" fill="#1f4a22" opacity="0.08" />
      <rect x="92" y="176" width="376" height="484" rx="40" fill="url(#towel)" />
      <rect
        x="92"
        y="176"
        width="376"
        height="484"
        rx="40"
        fill="none"
        stroke="#1f4a22"
        strokeOpacity="0.09"
      />
      <path d="M92 206 H468" stroke="#1f4a22" strokeOpacity="0.06" strokeWidth="2" />

      {/* ------------------------------------------------ the guest */}
      <motion.g style={{ y: settle }}>
        {/* neck, behind the head */}
        <rect x="250" y="262" width="60" height="40" rx="18" fill="#cf9f76" />

        {/* hair */}
        <path
          d="M280 178 C316 178 326 206 326 234 C326 258 316 276 300 282 C294 272 288 268 280 268 C272 268 266 272 260 282 C244 276 234 258 234 234 C234 206 244 178 280 178 Z"
          fill="#2b2320"
        />
        <path
          d="M280 186 C304 186 314 204 318 222 C306 206 294 198 280 198 C266 198 254 206 242 222 C246 204 256 186 280 186 Z"
          fill="#463930"
          opacity="0.75"
        />

        {/* arms, resting alongside */}
        <path
          d="M172 344 C150 374 142 432 148 488 C151 518 157 542 164 558 L198 552 C190 524 185 492 184 458 C183 414 188 374 198 352 Z"
          fill="url(#skinArm)"
        />
        <path
          d="M388 344 C410 374 418 432 412 488 C409 518 403 542 396 558 L362 552 C370 524 375 492 376 458 C377 414 372 374 362 352 Z"
          fill="url(#skinArm)"
        />

        {/* the back */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "50% 20%", scale: breath }}
        >
          <path
            d="M168 336 C176 306 214 292 252 288 L308 288 C346 292 384 306 392 336 C398 380 380 470 356 552 L204 552 C180 470 162 380 168 336 Z"
            fill="url(#skin)"
          />

          <g clipPath="url(#backClip)">
            {/* shoulder blades */}
            <ellipse cx="228" cy="374" rx="40" ry="52" fill="#c08c62" opacity="0.3" filter="url(#soft)" />
            <ellipse cx="332" cy="374" rx="40" ry="52" fill="#c08c62" opacity="0.3" filter="url(#soft)" />
            {/* spine */}
            <path
              d="M280 300 C284 372 283 460 278 552"
              stroke="#ad7c55"
              strokeOpacity="0.45"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              filter="url(#softSm)"
            />
            {/* rim light down the left edge */}
            <path
              d="M180 330 C168 404 172 486 192 552"
              stroke="#fbe7d1"
              strokeOpacity="0.8"
              strokeWidth="16"
              fill="none"
              filter="url(#soft)"
            />

            {/* ---------- the oil, once it lands ---------- */}
            <motion.g
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                scale: poolScale,
                opacity: poolOpacity,
              }}
            >
              <ellipse cx="318" cy="374" rx="96" ry="78" fill="url(#poolG)" filter="url(#soft)" />
              <ellipse cx="262" cy="430" rx="110" ry="88" fill="url(#poolG)" filter="url(#soft)" opacity="0.85" />
              <ellipse cx="296" cy="500" rx="94" ry="64" fill="url(#poolG)" filter="url(#soft)" opacity="0.65" />
            </motion.g>

            {/* light sweeping down the oiled skin */}
            <motion.rect
              x="150"
              y="280"
              width="270"
              height="120"
              fill="url(#gloss)"
              style={{ y: glossY, opacity: glossOpacity }}
            />
          </g>
        </motion.g>

        {/* towel over the lower back */}
        <path
          d="M186 524 C244 512 316 512 374 524 L394 656 C316 670 244 670 166 656 Z"
          fill="url(#towel)"
        />
        <path
          d="M186 524 C244 512 316 512 374 524"
          stroke="#1f4a22"
          strokeOpacity="0.12"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M178 580 C242 568 318 568 382 580"
          stroke="#1f4a22"
          strokeOpacity="0.07"
          strokeWidth="2"
          fill="none"
        />
      </motion.g>

      {/* ------------------------------------------------ tension, letting go */}
      <motion.g style={{ opacity: tension, y: tensionLift }}>
        {[
          { x: 224, y: 330 },
          { x: 336, y: 330 },
          { x: 280, y: 312 },
        ].map((k, i) => (
          <g key={i} transform={`translate(${k.x} ${k.y})`}>
            <path
              d="M-14 0 L-7 -9 L0 4 L7 -9 L14 0"
              stroke="#c4705a"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        ))}
      </motion.g>

      {/* ------------------------------------------------ ease, settling in */}
      <motion.g style={{ opacity: ease, y: easeRise }}>
        <circle cx="280" cy="392" r="118" fill="#8fc24a" opacity="0.13" filter="url(#soft)" />
        {[
          { r: 74, o: 0.3 },
          { r: 108, o: 0.16 },
        ].map((a, i) => (
          <circle
            key={i}
            cx="280"
            cy="392"
            r={a.r}
            fill="none"
            stroke="#57a63c"
            strokeOpacity={a.o}
            strokeWidth="1.4"
            filter="url(#softSm)"
          />
        ))}
      </motion.g>

      {/* drifting leaves */}
      <motion.g style={{ opacity: leafFade, y: leafRise }}>
        {[
          { x: 132, y: 452, s: 1, r: -26 },
          { x: 428, y: 418, s: 0.82, r: 34 },
          { x: 158, y: 292, s: 0.6, r: 10 },
        ].map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
            <path d="M0 0 C16 -21 41 -25 53 -14 C45 6 20 15 0 0 Z" fill="#57a63c" opacity="0.5" />
            <path
              d="M0 0 C18 -8 37 -13 51 -15"
              stroke="#2f6b2a"
              strokeOpacity="0.4"
              strokeWidth="1.4"
              fill="none"
            />
          </g>
        ))}
      </motion.g>

      {/* ------------------------------------------------ the stream */}
      <motion.g style={{ opacity: streamFade }}>
        <motion.path
          d="M344 258 C340 290 334 322 332 358"
          stroke="url(#oil)"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          style={{ strokeDashoffset: streamDraw, strokeWidth: streamWidth }}
        />
        <Droplet p={p} from={0.4} cx={338} cy={306} r={4.6} />
        <Droplet p={p} from={0.5} cx={334} cy={334} r={3.6} />
      </motion.g>

      {/* ------------------------------------------------ the bottle */}
      <motion.g style={{ x: bx, y: by, rotate: brot, originX: 0.5, originY: 1 }}>
        <g>
          {/* body */}
          <path
            d="M408 200 v-84 c0 -12 6 -14 6 -22 v-12 h32 v12 c0 8 6 10 6 22 v84 c0 8 -8 12 -22 12 s-22 -4 -22 -12 Z"
            fill="url(#glass)"
          />
          {/* oil inside, dropping as it pours */}
          <g clipPath="url(#bottleClip)">
            <motion.rect
              x="404"
              width="52"
              height={oilH}
              fill="#d8a53c"
              opacity="0.5"
              style={{ y: oilY }}
            />
          </g>
          {/* highlight */}
          <path
            d="M417 124 c-3 26 -3 50 0 70"
            stroke="#e2f2d3"
            strokeOpacity="0.6"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* label */}
          <rect x="406" y="140" width="48" height="34" rx="6" fill="#fbfaf5" />
          <path d="M424 164 c0 -11 6 -17 15 -18 c0 11 -6 17 -15 18 Z" fill="#57a63c" />
          <path
            d="M424 164 c4 -5 9 -9 15 -10"
            stroke="#2f6b2a"
            strokeWidth="1.2"
            fill="none"
          />
          {/* neck + cap */}
          <rect x="422" y="62" width="16" height="22" rx="4" fill="#2f5a24" />
          <rect x="416" y="46" width="28" height="18" rx="6" fill="#a17a4e" />
          <rect x="416" y="46" width="28" height="6" rx="3" fill="#c2a06a" />
        </g>
      </motion.g>
    </svg>
  );
}

/** A bead of oil that appears, falls a little, and fades. */
function Droplet({
  p,
  from,
  cx,
  cy,
  r,
}: {
  p: MotionValue<number>;
  from: number;
  cx: number;
  cy: number;
  r: number;
}) {
  const opacity = useTransform(
    p,
    [from, from + 0.03, from + 0.12, from + 0.18],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const y = useTransform(p, [from, from + 0.18], [0, 30], { clamp: true });

  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      rx={r}
      ry={r * 1.3}
      fill="url(#oil)"
      style={{ opacity, y }}
    />
  );
}
