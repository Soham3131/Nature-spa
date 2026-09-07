"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

const faqs = [
  {
    q: "Do I need to book in advance?",
    a: "Walk-ins are welcome when a therapist is free, but evenings and weekends fill up quickly. Message us on WhatsApp a day or two ahead and we will hold a slot for you.",
  },
  {
    q: "How long is a typical session?",
    a: "Most therapies run 60 or 90 minutes. Foot reflexology is 45 minutes, and the Moroccan hammam ritual runs 75. Add about 10 minutes on either side for changing and settling.",
  },
  {
    q: "Can I choose the pressure?",
    a: "Absolutely, and you should. Tell your therapist at the start whether you want light, medium or firm, and speak up during the session if you want it changed. Nothing should ever hurt.",
  },
  {
    q: "Is there a couple's room?",
    a: "Yes — a private suite with two tables and two therapists, set for a synchronised session. It is our most requested room for anniversaries and birthdays, so book ahead.",
  },
  {
    q: "What about hygiene?",
    a: "Fresh linen for every guest, rooms sanitised between sessions, single-use disposables where relevant, and certified therapists. You are welcome to see the room before you commit.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Cash, UPI, and all major debit and credit cards. Gift cards are available if you would like to give a session to someone else.",
  },
  {
    q: "I'm pregnant / have an injury. Can I still book?",
    a: "In most cases yes, with the therapy adapted. Tell us when you book and note it on the health form so your therapist can adjust the technique, pressure and oils appropriately.",
  },
  {
    q: "Where exactly are you located?",
    a: `We are in ${site.address.city} — ${site.address.line1}, ${site.address.line2}. Message us on WhatsApp and we will send you a live location pin.`,
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-ink-2 py-28 sm:py-36">
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Good to Know</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-5 text-[clamp(2.4rem,5.4vw,4rem)] leading-[1.02] text-cream">
              Questions,
              <span className="gold-text italic"> answered plainly</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-cream-dim/75">
              Anything we have not covered? Send us a message — a real person reads
              it and replies.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href={whatsappLink("Hi The Nature Spa! I have a question:")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full border border-gold-lt/30 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-cream transition-all duration-500 hover:border-gold-lt/70 hover:text-gold"
            >
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>

        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-b border-cream/8">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-400 hover:text-gold"
                  >
                    <span className="text-[15.5px] leading-snug text-cream">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-lt/25 text-gold"
                    >
                      <Plus size={15} strokeWidth={1.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-12 text-[14px] leading-[1.85] text-cream-dim/78">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { faqs };
