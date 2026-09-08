"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import Lightbox from "@/components/Lightbox";
import { galleryPhotos } from "@/lib/galleryPhotos";
import { Eyebrow, Pill } from "./ui";

export default function PhotoGallery() {
  const tiles = galleryPhotos.slice(0, 4);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="photo-gallery" className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="mx-auto">Gallery</Eyebrow>
          <h2 className="display mt-5 text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.14]">
            A closer look
            <br className="hidden sm:block" /> around the spa.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {tiles.map((photo, i) => (
              <Tile key={photo.src} photo={photo} onClick={() => setOpenIndex(i)} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-10 flex justify-center">
          <Pill href="/gallery">View All</Pill>
        </Reveal>
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={tiles}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </section>
  );
}

function Tile({
  photo,
  className = "",
  onClick,
}: {
  photo: (typeof galleryPhotos)[number];
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View full photo: ${photo.caption}`}
      className={`group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] bg-sand shadow-[0_26px_54px_-38px_rgba(23,56,26,0.65)] ${className}`}
    >
      <SmartImage
        src={photo.resolved}
        alt={photo.alt}
        tone={photo.tone}
        fit="contain"
        sizes="(max-width: 1024px) 46vw, 30vw"
        className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(9,26,15,0.72))]"
      />
      <span className="display absolute bottom-3.5 left-4 right-4 text-left text-[0.95rem] leading-tight text-ivory sm:bottom-4 sm:left-5 sm:text-[1.1rem]">
        {photo.caption}
      </span>
    </button>
  );
}
