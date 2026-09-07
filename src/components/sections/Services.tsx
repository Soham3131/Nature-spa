"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ArrowUpRight, X, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { services, type Service } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="relative overflow-hidden bg-sand py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 12%, rgba(143,194,74,0.09), transparent 45%), radial-gradient(circle at 85% 80%, rgba(87,166,60,0.09), transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <Reveal>
              <p className="eyebrow">Our Therapies</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-5 max-w-2xl text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02] text-forest">
                Rituals for a body that
                <span className="accent-text italic"> forgot to rest</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-[14px] leading-relaxed text-body/70">
              Tap any therapy for the full description. Not sure which one you need?
              Message us and we will match you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <TiltCard intensity={9} lift={26} className="h-full">
                <button
                  onClick={() => setActive(s)}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] glass p-7 text-left transition-colors duration-500 hover:border-leaf/45"
                >
                  <span
                    aria-hidden
                    className="absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-25 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
                    style={{ background: s.accent }}
                  />

                  <span
                    aria-hidden
                    className="mb-6 block h-9 w-9 rounded-lg"
                    style={{
                      background: `linear-gradient(140deg, ${s.accent}, transparent 85%)`,
                      boxShadow: `0 8px 24px -10px ${s.accent}`,
                    }}
                  />

                  <h3 className="display text-2xl leading-tight text-forest">{s.name}</h3>

                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-body/72">
                    {s.short}
                  </p>

                  <span className="mt-7 flex items-center justify-between border-t border-forest/8 pt-4">
                    <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-body/60">
                      <Clock size={12} strokeWidth={1.5} />
                      {s.duration}
                    </span>
                    <span className="text-[13px] tracking-wide text-bronze">{s.price}</span>
                  </span>

                  <span className="absolute right-6 top-6 text-forest/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze">
                    <ArrowUpRight size={17} strokeWidth={1.4} />
                  </span>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-12 text-center text-[12.5px] tracking-wide text-body/55">
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
            className="fixed inset-0 z-80 grid place-items-center bg-ivory/85 p-5 backdrop-blur-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[1.8rem] border border-leaf/20 bg-paper p-8 shadow-[0_36px_90px_-34px_rgba(31,74,34,0.36)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span
                aria-hidden
                className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-35 blur-3xl"
                style={{ background: active.accent }}
              />

              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-forest/15 text-forest/70 transition-colors hover:border-leaf/50 hover:text-bronze"
              >
                <X size={16} strokeWidth={1.5} />
              </button>

              <p className="eyebrow relative">{active.duration} · {active.price}</p>
              <h3 className="display relative mt-3 text-4xl leading-tight text-forest">
                {active.name}
              </h3>
              <p className="relative mt-5 text-[14.5px] leading-[1.85] text-body/85">
                {active.description}
              </p>

              <ul className="relative mt-6 space-y-2.5">
                {active.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[13.5px] text-body/80">
                    <Check size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-bronze" />
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
                className="relative mt-8 block rounded-full bg-forest px-6 py-4 text-center text-[12px] uppercase tracking-[0.22em] text-ivory transition-transform duration-300 hover:scale-[1.02]"
              >
                Book this on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
