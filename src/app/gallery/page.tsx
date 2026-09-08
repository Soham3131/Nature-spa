import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryPhotos } from "@/lib/galleryPhotos";
import { whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery — Inside The Nature Spa",
  description:
    "A look inside The Nature Spa — the lounge, treatment rooms and quiet corners guests unwind in.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="relative bg-ivory pb-28 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] opacity-70"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(143,194,74,0.14), transparent 70%), radial-gradient(40% 45% at 12% 25%, rgba(87,166,60,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Gallery</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6.5vw,5rem)] leading-[1.0] text-forest">
            A closer look
            <span className="accent-text italic"> inside the spa</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-body/78">
            From the lounge to the last quiet corner of a treatment room —
            here is what waits for you at The Nature Spa.
          </p>
        </Reveal>

        <GalleryGrid photos={galleryPhotos} />

        <Reveal>
          <div className="mt-20 overflow-hidden rounded-[2rem] glass p-10 text-center sm:p-14">
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] leading-tight text-forest">
              Seen enough photos?
              <span className="accent-text italic"> Come experience it.</span>
            </h2>
            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-forest px-9 py-4 text-[12px] uppercase tracking-[0.22em] text-ivory transition-transform duration-400 hover:scale-[1.03]"
            >
              Book on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
