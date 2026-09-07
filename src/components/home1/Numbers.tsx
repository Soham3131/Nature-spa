import Reveal from "@/components/Reveal";
import { numbers } from "@/lib/home1";
import { Eyebrow } from "./ui";

export default function Numbers() {
  return (
    <section className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-18 sm:px-8 sm:py-22 lg:py-24">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>Trusted, Loved, Real</Eyebrow>
              <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15]">
                Our numbers tell a story.
              </h2>
            </div>
            <p className="max-w-sm text-[12.5px] leading-[1.9] text-muted lg:text-right">
              Years of care, thousands of unhurried hours, and a standing
              commitment to how you feel on the way out.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-12 grid grid-cols-2 gap-y-10 border-t border-forest/10 pt-10 sm:mt-14 lg:grid-cols-4 lg:gap-0">
            {numbers.map((n, i) => (
              <div
                key={n.label}
                className={`px-2 text-center sm:px-6 ${
                  i > 0 ? "lg:border-l lg:border-forest/10" : ""
                }`}
              >
                <dt className="sr-only">{n.label}</dt>
                <dd>
                  <span className="display block text-[clamp(2rem,4.6vw,2.9rem)] leading-none text-forest">
                    {n.value}
                  </span>
                  <span className="mt-3 block text-[10px] uppercase tracking-[0.22em] text-muted sm:text-[11px]">
                    {n.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
