"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Leaf, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { gallery } from "@/lib/gallery";
import { services } from "@/lib/services";

const pillars = [
  {
    icon: Leaf,
    title: "Certified therapists",
    body: "Every therapist is trained in their discipline and briefed on your health form before you enter the room.",
  },
  {
    icon: ShieldCheck,
    title: "Spotless & private",
    body: "Fresh linen for every guest, sanitised rooms between sessions, and a door that stays closed.",
  },
  {
    icon: Sparkles,
    title: "Authentic rituals",
    body: "Balinese, Thai, Swedish and Moroccan hammam traditions — practised the way they are meant to be.",
  },
  {
    icon: HeartHandshake,
    title: "Your pressure, your pace",
    body: "Nothing is one-size-fits-all. Tell us what your body needs and we shape the hour around it.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yA = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const rotB = useTransform(scrollYProgress, [0, 1], [6, -6]);

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-24 on-emerald relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(46% 58% at 22% 44%, rgba(140,198,63,0.3), transparent 68%), radial-gradient(42% 52% at 82% 62%, rgba(168,120,63,0.28), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        {/* --- 3D photo stack --- */}
        <div className="scene-3d order-2 lg:order-1">
          <div className="relative mx-auto aspect-4/5 w-full max-w-lg">
            <motion.div
              style={{ y: yA, rotate: rot }}
              className="layer-3d absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem] border border-lime/15 shadow-[0_28px_66px_-30px_rgba(31,74,34,0.30)]"
            >
              <SmartImage
                src={gallery[2].resolved}
                alt={gallery[2].alt}
                tone={gallery[2].tone}
                label="Treatment suite"
                className="h-full w-full"
                sizes="(max-width: 1024px) 70vw, 32vw"
              />
            </motion.div>

            <motion.div
              style={{ y: yB, rotate: rotB }}
              className="layer-3d absolute bottom-0 right-0 h-[62%] w-[58%] overflow-hidden rounded-[1.75rem] border border-lime/25 shadow-[0_28px_66px_-30px_rgba(31,74,34,0.32)]"
            >
              <SmartImage
                src={gallery[3].resolved}
                alt={gallery[3].alt}
                tone={gallery[3].tone}
                label="In the details"
                className="h-full w-full"
                sizes="(max-width: 1024px) 56vw, 26vw"
              />
            </motion.div>

            <motion.div
              style={{ y: yA }}
              className="absolute -left-3 bottom-10 z-10 rounded-2xl border border-lime/25 bg-emerald-2/90 px-5 py-4"
            >
              <p className="display text-4xl text-lime!">{services.length}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-mist/85">
                Signature therapies
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- copy --- */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-lime!">The Experience</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display mt-5 text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02] text-mist!">
              An hour that belongs
              <span className="accent-text-light italic"> entirely to you</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-mist/85">
              Gurugram moves fast. The Nature Spa was built as the counterweight — a
              quiet, gold-lit space a few steps off the noise, where the phone goes
              away and someone who knows exactly what they are doing takes the weight
              out of your shoulders.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-mist/85">
              You will be greeted, offered tea, shown the room, and asked what your
              week has been like. Everything after that is shaped around your answer.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={260 + i * 70}>
                <div className="group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime/30 bg-lime/10 text-lime transition-all duration-500 group-hover:-translate-y-1 group-hover:border-lime/70">
                    <p.icon size={18} strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-4 text-[15px] tracking-wide text-mist">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist/80">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
