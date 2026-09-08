"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import ScrollVideo from "@/components/hero/ScrollVideo";
import { site } from "@/lib/site";
import { Eyebrow, Pill, Sprig } from "./ui";

/**
 * The /home1 hero.
 *
 * The film is lifted verbatim from the original hero — same sources, same
 * poster, same sticky scroll stage and the same `mix-blend-multiply` wrapper
 * sitting directly on a painted paper ground. That blend is what drops the
 * clip's white studio backdrop out of the page, and it switches off silently
 * if the wrapper picks up a transform or a `perspective` ancestor, so nothing
 * new is nested around it here. Only the copy beside it is new.
 */
export default function Hero1() {
  const stage = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.3,
    restDelta: 0.0008,
  });

  const cueOpacity = useTransform(p, [0, 0.12], [1, 0], { clamp: true });

  return (
    <section
      ref={stage}
      className="relative h-[190vh] bg-ivory sm:h-[240vh] lg:h-[300vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* paper ground — painted first so the film has something to multiply into */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(176deg,#fdfcf7_0%,#faf8ef_52%,#f5f3e8_100%)]"
        />

        {/* botanical flourishes, kept clear of the film's footprint */}
        <Sprig
          className="absolute -left-10 -top-6 z-[5] hidden h-64 w-48 -rotate-[18deg] text-leaf sm:block lg:h-80 lg:w-60"
          opacity={0.14}
        />
        <Sprig
          className="absolute -left-16 bottom-[6%] z-[5] hidden h-56 w-44 rotate-[152deg] text-forest lg:block"
          opacity={0.1}
        />

        {/* the film */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[38svh] mix-blend-multiply sm:h-[46svh] lg:inset-y-0 lg:bottom-[7%] lg:left-auto lg:right-0 lg:h-auto lg:w-[64%]">
          <ScrollVideo
            p={p}
            sources={[
              { src: "/spaa-720.webm", type: "video/webm" },
              { src: "/spaa.mp4", type: "video/mp4" },
            ]}
            poster="/hero-poster.jpg"
            className="h-full w-full"
            mediaClassName="object-cover object-[52%_100%] lg:object-contain lg:object-bottom lg:scale-[1.06] lg:origin-bottom"
            mask="none"
          />
        </div>

        {/* ------------------------------ copy ------------------------------ */}
        <div className="relative z-20 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center px-5 pb-[38svh] pt-[calc(var(--nav-h)+0.5rem)] sm:px-8 sm:pb-[46svh] lg:pb-6 lg:pt-[var(--nav-h)]">
          <div className="text-center lg:max-w-[34rem] lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Eyebrow>Natural, Holistic, You.</Eyebrow>
            </motion.div>

            <h1 className="mt-4 sm:mt-6">
              <span className="sr-only">
                {site.name} — where nature meets your wellbeing
              </span>
              <span aria-hidden className="block">
                {["Where Nature", "Meets Your", "Wellbeing."].map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 1.15,
                        delay: 0.13 * i + 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="display block text-[clamp(2.3rem,7.4vw,4.9rem)] leading-[1.02]"
                    >
                      {i === 2 ? <span className="accent-text">{line}</span> : line}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-4 max-w-sm text-[13px] leading-[1.75] text-body sm:mt-6 sm:text-[14.5px] sm:leading-[1.9] lg:mx-0"
            >
              Therapeutic spa experiences designed to restore balance, renew your
              energy and bring you closer to yourself — in the heart of{" "}
              {site.address.city}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-9 sm:gap-3 lg:justify-start"
            >
              <Pill href="#services">Explore Treatments</Pill>
              <Pill href="#experience" variant="outline">
                Discover Our Rituals
              </Pill>
            </motion.div>
          </div>
        </div>

        {/* the promise, set on the right edge like a margin note */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-8 top-[34%] z-20 hidden w-28 text-right lg:block xl:right-14"
        >
          <p className="display text-[1.45rem] italic leading-[1.25] text-forest/80">
            Care
            <br />
            Comes
            <br />
            Naturally
          </p>
          <span className="mt-3 ml-auto block h-px w-16 bg-bronze/45" />
        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 left-8 z-20 hidden lg:block xl:left-[max(2rem,calc((100vw-1440px)/2+2rem))]"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="flex items-center gap-3 text-muted"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-8 w-8 place-items-center rounded-full border border-forest/18"
            >
              <ArrowDown size={13} strokeWidth={1.4} />
            </motion.span>
            <span className="text-[9px] uppercase tracking-[0.3em] sm:text-[10px]">
              Scroll to explore
            </span>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
