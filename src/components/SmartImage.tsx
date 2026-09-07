"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** gradient shown while the photo loads */
  tone?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
};

const DEFAULT_TONE = "linear-gradient(140deg,#12211b,#5c6b52 48%,#c9b184)";

/**
 * next/image that always has something to show: a soft gradient tile holds the
 * space while the photo decodes, and stays put if the photo ever fails to load,
 * so the page never renders a broken image.
 *
 * Which file is requested (the spa's own photo vs. a stock stand-in) is decided
 * at build time — see resolvePhoto() in src/lib/gallery.ts.
 */
export default function SmartImage({
  src,
  alt,
  tone = DEFAULT_TONE,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  label,
}: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const current = failed ? undefined : src;

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span
        aria-hidden
        className="absolute inset-0 transition-opacity duration-700"
        style={{ background: tone, opacity: loaded ? 0 : 1 }}
      />

      {current ? (
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className="object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center px-4 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-cream/55">
            {label ?? "Photo coming soon"}
          </span>
        </span>
      )}
    </span>
  );
}
