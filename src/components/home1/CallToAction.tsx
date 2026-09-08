import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { art } from "@/lib/home1";
import { whatsappLink, defaultWhatsAppMessage } from "@/lib/site";
import { Pill } from "./ui";

export default function CallToAction() {
  return (
    <section id="contact" className="relative overflow-hidden bg-emerald">
      <div aria-hidden className="absolute inset-0">
        <SmartImage
          src={art.fern.image}
          alt=""
          tone={art.fern.tone}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(94deg,rgba(8,23,13,0.94)_0%,rgba(10,29,16,0.84)_38%,rgba(12,36,20,0.46)_100%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="max-w-lg">
              <h2 className="display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.12] text-ivory">
                Your time to reconnect
                <br className="hidden sm:block" /> with yourself.
              </h2>
              <p className="mt-5 max-w-md text-[13px] leading-[1.9] text-ivory/70 sm:text-[14px]">
                Book your session today and take the first step towards a
                calmer, healthier, happier you.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Pill href={whatsappLink(defaultWhatsAppMessage)} external variant="light">
                Book Your Experience
              </Pill>
              <Pill href="#services" variant="outline-light">
                Explore Treatments
              </Pill>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
