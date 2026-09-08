"use client";

import { useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";
import type { Shot } from "@/lib/gallery";

type Props = {
  photos: Shot[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/** Full-screen, uncropped view of a gallery photo with keyboard + click navigation. */
export default function Lightbox({ photos, index, onClose, onIndexChange }: Props) {
  const photo = photos[index];

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % photos.length),
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(9,26,15,0.94)] p-4 sm:p-8"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory/60 sm:right-6 sm:top-6"
      >
        <X size={20} strokeWidth={1.6} />
      </button>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory/60 sm:left-6"
          >
            <ChevronLeft size={22} strokeWidth={1.6} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory/60 sm:right-6"
          >
            <ChevronRight size={22} strokeWidth={1.6} />
          </button>
        </>
      )}

      <div
        className="relative flex h-full max-h-[80vh] w-full max-w-5xl flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <SmartImage
          key={photo.src}
          src={photo.resolved}
          alt={photo.alt}
          tone={photo.tone}
          sizes="90vw"
          fit="contain"
          className="h-full w-full"
        />
        <p className="mt-4 text-center text-[12px] uppercase tracking-[0.22em] text-ivory/80">
          {photo.caption} — {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
