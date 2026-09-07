"use client";

import { Star, Quote, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import { reviews, type Review } from "@/lib/reviews";
import { site } from "@/lib/site";

export default function Reviews() {
  // duplicated so the marquee loops seamlessly
  const rowA = [...reviews, ...reviews];
  const rowB = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section id="reviews" className="relative overflow-hidden bg-sand py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(143,194,74,0.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">Guest Reviews</p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="display mx-auto mt-5 max-w-3xl text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02] text-forest">
            What people say after
            <span className="accent-text italic"> they walk back out</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-9 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full glass px-7 py-4">
            <span className="flex items-center gap-2">
              <span className="display text-3xl accent-text">{site.rating.value}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-bronze text-bronze" />
                ))}
              </span>
            </span>
            <span className="h-6 w-px bg-forest/15" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-body/75">
              {site.rating.count}+ Google reviews
            </span>
            <a
              href={site.socials.google}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-bronze transition-opacity hover:opacity-70"
            >
              Read all <ExternalLink size={12} strokeWidth={1.6} />
            </a>
          </div>
        </Reveal>
      </div>

      {/* --- 3D marquee rows --- */}
      <div className="scene-3d relative mt-16 space-y-6">
        <MarqueeRow items={rowA} duration={64} tilt={4} />
        <MarqueeRow items={rowB} duration={78} reverse tilt={-4} />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-sand to-transparent sm:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-sand to-transparent sm:w-40"
        />
      </div>

      <div className="relative mx-auto mt-14 max-w-[1400px] px-5 text-center sm:px-8">
        <Reveal>
          <a
            href={site.socials.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-leaf/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-forest transition-all duration-500 hover:border-leaf/70 hover:text-bronze"
          >
            Leave us a review on Google <ExternalLink size={13} strokeWidth={1.5} />
          </a>
        </Reveal>
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
        className="flex shrink-0 gap-6 pr-6 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
        {items.map((r, i) => (
          <ReviewCard key={`dup-${r.name}-${i}`} r={r} aria-hidden />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r }: { r: Review; "aria-hidden"?: boolean }) {
  return (
    <figure className="relative flex w-[80vw] shrink-0 flex-col rounded-[1.5rem] glass p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf/45 sm:w-[26rem]">
      <Quote size={22} strokeWidth={1.2} className="text-bronze/45" />

      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < r.rating ? "fill-bronze text-bronze" : "text-forest/20"}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-[14px] leading-[1.8] text-body/85">
        “{r.text}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-forest/8 pt-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-leaf/25 to-leaf/20 text-[12px] tracking-wide text-forest">
          {r.initials}
        </span>
        <span>
          <span className="block text-[13.5px] text-forest">{r.name}</span>
          <span className="block text-[10.5px] uppercase tracking-[0.18em] text-body/55">
            {r.source} · {r.date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
