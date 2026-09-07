import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { rituals } from "@/lib/home1";
import { whatsappLink } from "@/lib/site";
import { Eyebrow, TextLink, ArrowBadge } from "./ui";

/**
 * Five rituals in a deliberately uneven grid: the first card runs the full
 * height of the left column, the other four fill two rows beside it.
 */
export default function Rituals() {
  const [lead, ...rest] = rituals;

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

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="lg:row-span-2" delay={60}>
            <RitualCard ritual={lead} lead />
          </Reveal>

          {rest.map((r, i) => (
            <Reveal key={r.slug} delay={120 + i * 70}>
              <RitualCard ritual={r} />
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
}: {
  ritual: (typeof rituals)[number];
  lead?: boolean;
}) {
  return (
    <a
      href={whatsappLink(
        `Hi! I'd like to book the ${ritual.name} (${ritual.duration}) at The Nature Spa.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-forest/10 bg-paper shadow-[0_1px_2px_rgba(23,56,26,0.04),0_26px_54px_-34px_rgba(23,56,26,0.4)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-forest/20 hover:shadow-[0_1px_2px_rgba(23,56,26,0.05),0_36px_68px_-32px_rgba(23,56,26,0.5)]"
    >
      <span
        className={`relative block overflow-hidden ${lead ? "lg:min-h-0 lg:flex-1" : ""}`}
      >
        <SmartImage
          src={ritual.image}
          alt={ritual.alt}
          tone={ritual.tone}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className={`w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] ${
            lead ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[16/10]"
          }`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(15,44,23,0.28))] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </span>

      <span
        className={`flex flex-1 flex-col p-5 sm:p-6 ${lead ? "lg:flex-none" : ""}`}
      >
        <span className="display block text-[1.15rem] leading-snug text-forest sm:text-[1.3rem]">
          {ritual.name}
        </span>
        <span className="mb-6 mt-2 block text-[12.5px] leading-[1.7] text-muted">
          {ritual.short}
        </span>

        <span className="mt-auto flex items-center justify-between gap-4 border-t border-forest/8 pt-4">
          <span className="flex items-baseline gap-2.5 text-[11.5px] tracking-wide text-body">
            {ritual.duration}
            <span className="h-3 w-px bg-forest/15" />
            <span className="text-forest">{ritual.price}</span>
          </span>
          <ArrowBadge />
        </span>
      </span>
    </a>
  );
}
