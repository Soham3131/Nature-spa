"use client";

import { Star, Quote, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { reviews, type Review } from "@/lib/reviews";
import { site } from "@/lib/site";

const u = (id: string, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Ambient photographs beside the heading. */
const moodShots = [
  {
    src: u("1741714297621-9ff218799077"),
    alt: "A guest resting with her eyes closed after a treatment",
  },
  {
    src: u("1775133263714-848c8fe09e73"),
    alt: "Warm oil poured slowly across the brow during a shirodhara ritual",
  },
];

export default function Reviews() {
  const rowA = [...reviews, ...reviews];
  const rowB = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section id="reviews" className="relative overflow-hidden bg-sand py-16 sm:py-22 lg:py-30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 78% 6%, rgba(143,194,74,0.2), transparent 66%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ---------------- heading ---------------- */}
        <div>
          <Reveal>
            <p className="eyebrow">Guest Reviews</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display mt-4 max-w-xl text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.03]">
              What people say after
              <span className="accent-text italic"> they walk back out</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl card px-6 py-5">
              <span className="flex items-center gap-2.5">
                <GoogleMark />
                <span className="display text-3xl leading-none">{site.rating.value}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-butter text-butter" />
                  ))}
                </span>
              </span>
              <span className="h-7 w-px bg-forest/12" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-body">
                {site.rating.count}+ reviews on Google
              </span>
              <a
                href={site.socials.google}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-forest-2 transition-colors hover:text-leaf"
              >
                Read all <ExternalLink size={12} strokeWidth={1.8} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <a
              href={site.socials.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-forest transition-all duration-500 hover:border-leaf hover:text-leaf"
            >
              Leave us a review <ExternalLink size={13} strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>

        {/* ---------------- mood photographs ---------------- */}
        <Reveal delay={120}>
          <div className="scene-3d relative mx-auto aspect-4/3 w-full max-w-lg">
            <div className="layer-3d absolute left-0 top-0 h-[74%] w-[62%] -rotate-3 overflow-hidden rounded-[1.5rem] border border-forest/10 shadow-[0_28px_60px_-30px_rgba(31,74,34,0.4)]">
              <SmartImage
                src={moodShots[0].src}
                alt={moodShots[0].alt}
                className="h-full w-full"
                sizes="(max-width: 1024px) 62vw, 26vw"
              />
            </div>
            <div className="layer-3d absolute bottom-0 right-0 h-[68%] w-[56%] rotate-3 overflow-hidden rounded-[1.4rem] border border-forest/10 shadow-[0_28px_60px_-30px_rgba(31,74,34,0.45)]">
              <SmartImage
                src={moodShots[1].src}
                alt={moodShots[1].alt}
                className="h-full w-full"
                sizes="(max-width: 1024px) 56vw, 24vw"
              />
            </div>
            <span
              aria-hidden
              className="absolute -left-4 bottom-8 rounded-2xl card px-5 py-4"
            >
              <span className="display block text-3xl leading-none accent-text">
                {site.rating.value}
              </span>
              <span className="mt-1.5 block text-[9.5px] uppercase tracking-[0.22em] text-muted">
                Average rating
              </span>
            </span>
          </div>
        </Reveal>
      </div>

      {/* ---------------- the carousel ---------------- */}
      <div className="scene-3d relative mt-16 space-y-5">
        <MarqueeRow items={rowA} duration={70} tilt={3} />
        <MarqueeRow items={rowB} duration={84} reverse tilt={-3} />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sand to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sand to-transparent sm:w-32"
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
  tilt = 0,
}: {
  items: Review[];
  duration: number;
  reverse?: boolean;
  tilt?: number;
}) {
  return (
    <div className="group flex overflow-hidden" style={{ transform: `rotateX(${tilt}deg)` }}>
      <div
        className="flex shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
        {items.map((r, i) => (
          <ReviewCard key={`dup-${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="relative flex w-[80vw] shrink-0 flex-col rounded-[1.4rem] card p-6 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf/45 sm:w-[25rem]">
      <div className="flex items-start justify-between">
        <Quote size={20} strokeWidth={1.4} className="text-leaf/40" />
        {r.sample && (
          <span className="rounded-full bg-butter/25 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-bronze">
            Sample
          </span>
        )}
      </div>

      <div className="mt-3.5 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < r.rating ? "fill-butter text-butter" : "text-forest/15"}
          />
        ))}
      </div>

      <blockquote className="mt-3.5 flex-1 text-[14px] leading-[1.75] text-body">
        “{r.text}”
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-forest/10 pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-leaf to-forest text-[12px] tracking-wide text-ivory">
          {r.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13.5px] text-forest">{r.name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] text-muted">
            <GoogleMark size={11} />
            {r.source} · {r.date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Google's four-colour G, so the source of the rating is unmistakable. */
function GoogleMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className="shrink-0">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.1h12.1c-.2 1.8-1.6 4.6-4.5 6.4l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8 41.2 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 9.9l7.1-5.5z"
      />
      <path
        fill="#EA4335"
        d="M24 10.3c4.1 0 6.9 1.8 8.5 3.3l6.1-6C34.9 4.1 29.9 2 24 2 15.4 2 8 6.8 4.4 14.1l7.1 5.5c1.8-5.3 6.7-9.3 12.5-9.3z"
      />
    </svg>
  );
}
