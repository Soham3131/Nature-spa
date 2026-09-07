import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { journey } from "@/lib/home1";
import { Eyebrow } from "./ui";

export default function Journey() {
  return (
    <section id="journey" className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <Eyebrow>Your Wellbeing Journey</Eyebrow>
          <h2 className="display mt-5 text-[clamp(1.7rem,3.8vw,2.6rem)] leading-[1.15]">
            A simple path to a better you.
          </h2>
        </Reveal>

        <div className="relative mt-14 sm:mt-16">
          {/* the thread the four steps hang from */}
          <span
            aria-hidden
            className="absolute left-[12%] right-[12%] top-8 z-0 hidden border-t border-dashed border-forest/20 lg:block"
          />

          <ol className="relative grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
            {journey.map((s, i) => (
              <Reveal key={s.step} delay={i * 90}>
                <li className="relative z-10 flex items-center gap-4">
                  <span className="relative shrink-0 rounded-full bg-ivory p-1.5">
                    <SmartImage
                      src={s.image}
                      alt={s.alt}
                      tone={s.tone}
                      sizes="80px"
                      className="h-14 w-14 rounded-full ring-1 ring-forest/12 sm:h-16 sm:w-16"
                    />
                  </span>

                  <span className="min-w-0 bg-ivory pr-3">
                    <span className="flex items-baseline gap-2.5">
                      <span className="display text-[0.95rem] text-bronze">{s.step}</span>
                      <span className="text-[11.5px] uppercase tracking-[0.24em] text-forest">
                        {s.title}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-[1.7] text-muted">
                      {s.line}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
