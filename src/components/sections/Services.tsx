"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ArrowUpRight, X, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SmartImage from "@/components/SmartImage";
import { services, type Service } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="scroll-mt-24 relative overflow-hidden bg-sand py-16 sm:py-22 lg:py-30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 10%, rgba(143,194,74,0.16), transparent 45%), radial-gradient(circle at 88% 82%, rgba(87,166,60,0.13), transparent 48%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Our Therapies</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.03]">
                Rituals for a body that
                <span className="accent-text italic"> forgot to rest</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-[14px] leading-relaxed text-body">
              Tap any therapy for the full description. Not sure which one you
              need? Message us and we will match you.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <TiltCard intensity={7} lift={18} className="h-full">
                <button
                  onClick={() => setActive(s)}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.1rem] card text-left transition-[border-color,box-shadow] duration-500 hover:border-leaf/45 sm:rounded-[1.4rem]"
                >
                  {/* photograph */}
                  <span className="relative block aspect-4/3 overflow-hidden">
                    <SmartImage
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest/45 to-transparent"
                    />
                    <span
                      aria-hidden
                      className="absolute left-3 top-3 h-2 w-2 rounded-full ring-4 ring-white/70 sm:left-4 sm:top-4 sm:h-2.5 sm:w-2.5"
                      style={{ background: s.accent }}
                    />
                    <span className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-white/90 sm:bottom-3.5 sm:left-4 sm:right-4 sm:gap-1.5 sm:text-[10.5px]">
                      <Clock size={10} strokeWidth={1.8} className="shrink-0" />
                      {s.duration}
                    </span>
                  </span>

                  {/* copy */}
                  <span className="flex flex-1 flex-col p-3.5 sm:p-5">
                    <span className="display block text-[0.98rem] leading-tight sm:text-[1.3rem]">
                      {s.name}
                    </span>
                    <span className="mt-1.5 line-clamp-2 block flex-1 text-[11.5px] leading-snug text-body sm:mt-2 sm:line-clamp-none sm:text-[13px] sm:leading-relaxed">
                      {s.short}
                    </span>
                    <span className="mt-3 flex items-center justify-between border-t border-forest/10 pt-2.5 sm:mt-5 sm:pt-3.5">
                      <span className="text-[11.5px] tracking-wide text-forest-2 sm:text-[13.5px]">
                        {s.price}
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest/6 text-forest transition-all duration-500 group-hover:bg-forest group-hover:text-ivory sm:h-7 sm:w-7">
                        <ArrowUpRight size={14} strokeWidth={1.6} />
                      </span>
                    </span>
                  </span>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-10 text-center text-[12.5px] tracking-wide text-muted">
            Prices are indicative — confirm current rates and offers on WhatsApp.
            Couple and package rates available.
          </p>
        </Reveal>
      </div>

      {/* --- detail modal --- */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-80 grid place-items-center bg-forest/45 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-[1.6rem] bg-paper shadow-[0_50px_120px_-40px_rgba(31,74,34,0.6)]"
            >
              <div className="relative aspect-16/9 overflow-hidden">
                <SmartImage
                  src={active.image}
                  alt={active.name}
                  className="h-full w-full"
                  sizes="(max-width: 640px) 100vw, 32rem"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest/75 to-transparent"
                />
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="text-[10.5px] uppercase tracking-[0.24em] text-lime">
                    {active.duration} · {active.price}
                  </p>
                  <h3 className="display mt-1.5 text-3xl leading-tight text-ivory">
                    {active.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-forest backdrop-blur transition-colors hover:bg-ivory"
              >
                <X size={16} strokeWidth={1.8} />
              </button>

              <div className="p-6 sm:p-8">
                <p className="text-[14.5px] leading-[1.85] text-body">
                  {active.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {active.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[13.5px] text-body">
                      <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-leaf" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(
                    `Hi The Nature Spa! I'd like to book the ${active.name} (${active.duration}). What slots do you have?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 block rounded-full bg-forest px-6 py-4 text-center text-[12px] uppercase tracking-[0.22em] text-ivory transition-transform duration-300 hover:scale-[1.02]"
                >
                  Book this on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
