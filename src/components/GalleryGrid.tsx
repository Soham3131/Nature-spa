"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import Lightbox from "@/components/Lightbox";
import type { Shot } from "@/lib/gallery";

export default function GalleryGrid({ photos }: { photos: Shot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} delay={i * 70}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View full photo: ${photo.caption}`}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[1.4rem] bg-sand shadow-[0_26px_54px_-38px_rgba(23,56,26,0.65)]"
            >
              <SmartImage
                src={photo.resolved}
                alt={photo.alt}
                tone={photo.tone}
                fit="contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(9,26,15,0.72))]"
              />
              <span className="display absolute bottom-3.5 left-4 right-4 text-left text-[0.95rem] leading-tight text-ivory sm:bottom-4 sm:left-5 sm:text-[1.1rem]">
                {photo.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
