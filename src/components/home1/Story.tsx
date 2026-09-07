import { Leaf } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { art } from "@/lib/home1";
import { site } from "@/lib/site";
import { Eyebrow, TextLink, Sprig } from "./ui";

export default function Story() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand">
      <Sprig
        className="absolute -right-14 -top-10 h-72 w-56 rotate-[24deg] text-forest"
        opacity={0.07}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 xl:grid-cols-[1fr_1fr_9rem] xl:gap-14">
          <Reveal>
            <Eyebrow>{site.name}</Eyebrow>

            <h2 className="display mt-5 text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.14]">
              Rituals inspired by nature,
              <br className="hidden sm:block" /> designed for modern wellbeing.
            </h2>

            <p className="mt-6 max-w-md text-[13.5px] leading-[1.95] text-body sm:text-[14.5px]">
              We blend the wisdom of nature with modern therapeutic care — warm
              oils, herbal compresses and slow, deliberate hands — to create
              treatments that heal, relax and rejuvenate the mind, body and
              soul.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-forest/8 text-leaf">
                <Leaf size={15} strokeWidth={1.5} />
              </span>
              <TextLink href="#experience">Our Story</TextLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              {/* the photograph, held in a soft arch */}
              <div className="relative ml-auto w-full max-w-lg">
                <SmartImage
                  src={art.story.image}
                  alt={art.story.alt}
                  tone={art.story.tone}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="aspect-[5/4] rounded-[1.75rem] shadow-[0_40px_80px_-48px_rgba(23,56,26,0.55)]"
                />

                {/* the offset tile that overlaps its lower-left corner */}
                <div className="absolute -bottom-7 -left-4 hidden w-32 overflow-hidden rounded-[1.25rem] border-4 border-sand shadow-[0_26px_52px_-30px_rgba(23,56,26,0.55)] sm:block lg:-left-9 lg:w-40">
                  <SmartImage
                    src={art.storyDetail.image}
                    alt={art.storyDetail.alt}
                    tone={art.storyDetail.tone}
                    sizes="160px"
                    className="aspect-square w-full"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="hidden xl:block">
            <p className="display text-[1.4rem] italic leading-[1.3] text-forest/75">
              A more
              <br />
              mindful you,
              <br />
              naturally.
            </p>
            <span className="mt-4 block h-px w-14 bg-bronze/45" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
