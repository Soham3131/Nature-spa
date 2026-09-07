import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { spaceTiles } from "@/lib/home1";
import { site } from "@/lib/site";
import { Eyebrow, TextLink } from "./ui";

export default function Space() {
  return (
    <section id="gallery" className="relative bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>Our Space</Eyebrow>

            <h2 className="display mt-5 text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.14]">
              A sanctuary
              <br className="hidden sm:block" /> in the heart of the city.
            </h2>

            <p className="mt-6 max-w-sm text-[13.5px] leading-[1.95] text-body sm:text-[14.5px]">
              Step into a serene space designed to settle your mind the moment
              you arrive — low light, warm stone and the quiet of{" "}
              {site.address.line1}, with the city left at the door.
            </p>

            <div className="mt-9">
              <TextLink href={site.socials.google}>Take a virtual tour</TextLink>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="grid grid-cols-2 grid-rows-[repeat(3,minmax(0,1fr))] gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2">
              <Tile tile={spaceTiles[0]} className="row-span-2 lg:col-span-1" />
              <Tile tile={spaceTiles[1]} className="lg:col-span-2" />
              <Tile tile={spaceTiles[2]} />
              <Tile tile={spaceTiles[3]} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tile({
  tile,
  className = "",
}: {
  tile: (typeof spaceTiles)[number];
  className?: string;
}) {
  return (
    <div
      className={`group relative min-h-[9rem] overflow-hidden rounded-[1.25rem] shadow-[0_26px_54px_-38px_rgba(23,56,26,0.65)] sm:min-h-[11rem] ${className}`}
    >
      <SmartImage
        src={tile.image}
        alt={tile.alt}
        tone={tile.tone}
        sizes="(max-width: 1024px) 46vw, 30vw"
        className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(9,26,15,0.72))]"
      />
      <span className="display absolute bottom-3.5 left-4 right-4 text-[0.95rem] leading-tight text-ivory sm:bottom-4 sm:left-5 sm:text-[1.1rem]">
        {tile.caption}
      </span>
    </div>
  );
}
