import { Leaf, Rabbit, Sparkles, Hand } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { art, promises } from "@/lib/home1";
import { whatsappLink } from "@/lib/site";
import { Eyebrow, Pill, Sprig } from "./ui";

const icons = [Leaf, Rabbit, Sparkles, Hand];

export default function Products() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(178deg,#f7f3e8,#efe7d6)]">
      <Sprig
        className="absolute -left-16 bottom-0 h-80 w-60 rotate-[8deg] text-leaf"
        opacity={0.1}
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-28">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <SmartImage
              src={art.product.image}
              alt={art.product.alt}
              tone={art.product.tone}
              sizes="(max-width: 1024px) 88vw, 40vw"
              className="aspect-[4/5] rounded-[1.75rem] shadow-[0_44px_86px_-50px_rgba(23,56,26,0.6)]"
            />
            <div className="absolute -bottom-6 -right-4 hidden w-36 overflow-hidden rounded-[1.25rem] border-4 border-[#f4efe2] shadow-[0_28px_56px_-32px_rgba(23,56,26,0.55)] sm:block lg:-right-8 lg:w-44">
              <SmartImage
                src={art.productDetail.image}
                alt={art.productDetail.alt}
                tone={art.productDetail.tone}
                sizes="180px"
                className="aspect-square w-full"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={130}>
          <Eyebrow>Nature at Home</Eyebrow>

          <h2 className="display mt-5 text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.14]">
            Bring the ritual home.
          </h2>

          <p className="mt-6 max-w-lg text-[13.5px] leading-[1.95] text-body sm:text-[14.5px]">
            Our skincare range is blended with the same oils and botanicals we
            reach for in the treatment room — so the calm of a session carries on
            long after you have left it.
          </p>

          <div className="mt-9">
            <Pill
              href={whatsappLink(
                "Hi! I'd like to know more about The Nature Spa skincare range.",
              )}
              external
            >
              Explore Our Products
            </Pill>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-forest/10 pt-10 sm:grid-cols-4 sm:gap-x-4">
            {promises.map((p, i) => {
              const Icon = icons[i];
              return (
                <li key={p.title} className="text-center sm:text-left">
                  <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-forest/12 text-leaf sm:mx-0">
                    <Icon size={16} strokeWidth={1.4} />
                  </span>
                  <span className="mt-3.5 block text-[11px] uppercase tracking-[0.16em] text-forest">
                    {p.title}
                  </span>
                  <span className="mt-1.5 block text-[11.5px] leading-[1.6] text-muted">
                    {p.note}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
