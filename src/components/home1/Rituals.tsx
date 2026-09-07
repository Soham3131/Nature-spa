import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { rituals } from "@/lib/home1";
import { whatsappLink } from "@/lib/site";
import { Eyebrow, TextLink, ArrowBadge } from "./ui";

/**
 * Seven rituals in a deliberately uneven grid. The first card runs the full
 * height of the left column and the last one runs double width, which fills
 * the odd count exactly at both two and three columns.
 */
export default function Rituals() {
  const [lead, ...rest] = rituals;
  const lastIndex = rest.length - 1;

  return (
    <section id="rituals" className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <Eyebrow>Our Signature Rituals</Eyebrow>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display max-w-2xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.14]">
              Therapies for a body
              <br className="hidden sm:block" /> that deserves to slow down.
            </h2>
            <TextLink href="/#services" className="pb-2">
              View All Treatments
            </TextLink>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3">
          <Reveal className="lg:row-span-2" delay={60}>
            <RitualCard ritual={lead} lead />
          </Reveal>

          {rest.map((r, i) => (
            <Reveal
              key={r.slug}
              delay={120 + i * 70}
              className={i === lastIndex ? "col-span-2" : ""}
            >
              <RitualCard ritual={r} wide={i === lastIndex} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RitualCard({
  ritual,
  lead = false,
  wide = false,
}: {
  ritual: (typeof rituals)[number];
  lead?: boolean;
  /** the double-width card that closes the grid */
  wide?: boolean;
}) {
  return (
    <a
      href={whatsappLink(
        `Hi! I'd like to book the ${ritual.name} (${ritual.duration}) at The Nature Spa.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-forest/10 bg-paper sm:rounded-[1.5rem] ${wide ? "lg:flex-row" : ""} shadow-[0_1px_2px_rgba(23,56,26,0.04),0_26px_54px_-34px_rgba(23,56,26,0.4)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-forest/20 hover:shadow-[0_1px_2px_rgba(23,56,26,0.05),0_36px_68px_-32px_rgba(23,56,26,0.5)]`}
    >
      <span
        className={`relative block overflow-hidden ${
          lead ? "lg:min-h-0 lg:flex-1" : wide ? "lg:w-[54%] lg:shrink-0" : ""
        }`}
      >
        <SmartImage
          src={ritual.image}
          alt={ritual.alt}
          tone={ritual.tone}
          sizes={wide ? "(max-width: 1024px) 94vw, 62vw" : "(max-width: 1024px) 46vw, 30vw"}
          className={`w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] ${
            lead
              ? "aspect-[4/3] lg:aspect-auto lg:h-full"
              : wide
                ? "aspect-[16/9] lg:aspect-auto lg:h-full"
                : "aspect-[4/3] sm:aspect-[16/10]"
          }`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(15,44,23,0.28))] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </span>

      <span
        className={`flex flex-1 flex-col p-3.5 sm:p-6 ${
          lead ? "lg:flex-none" : wide ? "lg:justify-center" : ""
        }`}
      >
        <span className="display block text-[0.95rem] leading-snug text-forest sm:text-[1.3rem]">
          {ritual.name}
        </span>
        <span className="mb-4 mt-1.5 block text-[11px] leading-[1.55] text-muted sm:mb-6 sm:mt-2 sm:text-[12.5px] sm:leading-[1.7]">
          {ritual.short}
        </span>

        <span
          className={`flex items-center justify-between gap-2 border-t border-forest/8 pt-3 sm:gap-4 sm:pt-4 ${
            wide ? "mt-auto lg:mt-7" : "mt-auto"
          }`}
        >
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10.5px] tracking-wide text-body sm:gap-2.5 sm:text-[11.5px]">
            {ritual.duration}
            <span className="hidden h-3 w-px bg-forest/15 sm:block" />
            <span className="text-forest">{ritual.price}</span>
          </span>
          <ArrowBadge sizeClass="h-7 w-7 sm:h-9 sm:w-9" />
        </span>
      </span>
    </a>
  );
}
