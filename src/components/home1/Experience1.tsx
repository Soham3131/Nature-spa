import { Play } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { art } from "@/lib/home1";
import { Eyebrow, Pill } from "./ui";

/**
 * The dark band that breaks the page in half. The photograph runs full bleed
 * and a green wash is laid over it, heaviest on the left so the copy keeps its
 * contrast at every width.
 */
export default function Experience1() {
  return (
    <section id="experience" className="relative overflow-hidden bg-emerald">
      <div aria-hidden className="absolute inset-0">
        <SmartImage
          src={art.experience.image}
          alt={art.experience.alt}
          tone={art.experience.tone}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(96deg,rgba(9,26,15,0.93)_0%,rgba(10,29,17,0.82)_30%,rgba(12,35,20,0.42)_58%,rgba(12,35,20,0.12)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,26,15,0.55),transparent_38%,rgba(9,26,15,0.6))] sm:bg-none"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-28 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <Reveal className="max-w-xl">
            <Eyebrow tone="lime">The Nature Experience</Eyebrow>

            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-ivory">
              Slow down.
              <br />
              Breathe deeper.
              <br />
              <span className="accent-text-light">Feel restored.</span>
            </h2>

            <p className="mt-6 max-w-md text-[13.5px] leading-[1.95] text-ivory/72 sm:text-[14.5px]">
              Let go of the everyday and immerse yourself in a world of natural
              healing — calming rituals, warm hands and pure relaxation, an hour
              at a time.
            </p>

            <div className="mt-9">
              <Pill href="#journey" variant="outline-light">
                Discover the Experience
              </Pill>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <a
              href="#rituals"
              className="group flex items-center gap-4 text-ivory/85 transition-colors hover:text-ivory"
            >
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ivory/35 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-ivory group-hover:bg-ivory/12 sm:h-16 sm:w-16">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-ivory/25 animate-breathe"
                />
                <Play size={17} strokeWidth={1.4} className="ml-0.5 fill-current" />
              </span>
              <span className="text-[10px] uppercase leading-[1.7] tracking-[0.26em]">
                Watch
                <br />
                Our Story
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
