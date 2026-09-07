"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#services", label: "Therapies" },
  { href: "/#gallery", label: "Spa" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/blog", label: "Journal" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          solid
            ? "border-b border-gold-lt/10 bg-ink/80 backdrop-blur-xl py-3"
            : "border-b border-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label={site.name}>
            <Logo />
            <span className="flex flex-col leading-none">
              <span className="display text-[1.35rem] tracking-wide text-cream">
                The Nature <span className="gold-text">Spa</span>
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-cream-dim/70">
                Gurugram
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative text-[13px] uppercase tracking-[0.18em] text-cream/75 transition-colors hover:text-cream"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-gold-dk to-gold-lt transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+${site.phoneRaw}`}
              className="hidden items-center gap-2 text-[13px] tracking-wide text-cream/75 transition-colors hover:text-gold md:flex"
            >
              <Phone size={14} strokeWidth={1.6} />
              {site.phoneDisplay}
            </a>

            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden overflow-hidden rounded-full border border-gold-lt/40 px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:text-ink sm:block"
            >
              <span className="absolute inset-0 -translate-y-full bg-gradient-to-br from-gold-lt to-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative">Book Now</span>
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-lt/25 text-cream transition-colors hover:border-gold-lt/60 lg:hidden"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-70 bg-ink/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-6 sm:px-8">
              <span className="display text-[1.35rem] text-cream">
                The Nature <span className="gold-text">Spa</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-gold-lt/25 text-cream"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-6 flex flex-col px-5 sm:px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-cream/8"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 display text-4xl text-cream/90"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 px-5 sm:px-8">
              <a
                href={whatsappLink(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-br from-gold-lt to-gold px-6 py-4 text-center text-[12px] uppercase tracking-[0.24em] text-ink"
              >
                Book on WhatsApp
              </a>
              <a
                href={`tel:+${site.phoneRaw}`}
                className="rounded-full border border-gold-lt/30 px-6 py-4 text-center text-[12px] uppercase tracking-[0.24em] text-cream"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <span className="relative grid h-11 w-11 shrink-0 place-items-center">
      <span className="absolute inset-0 rounded-full border border-gold-lt/30" />
      <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-gold-lt/12 to-transparent" />
      <svg viewBox="0 0 32 32" className="relative h-6 w-6" aria-hidden>
        <defs>
          <linearGradient id="leafG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2ddab" />
            <stop offset="55%" stopColor="#d9b866" />
            <stop offset="100%" stopColor="#7fae95" />
          </linearGradient>
        </defs>
        <path
          d="M16 3c-6 4.2-9.5 9-9.5 14.2A9.5 9.5 0 0 0 16 29a9.5 9.5 0 0 0 9.5-11.8C25.5 12 22 7.2 16 3Z"
          fill="url(#leafG)"
          opacity="0.9"
        />
        <path d="M16 8v17" stroke="#07100d" strokeWidth="1.1" opacity="0.5" />
        <path d="M16 15l4.5-3.4M16 20l-4.5-3.4" stroke="#07100d" strokeWidth="1" opacity="0.4" />
      </svg>
    </span>
  );
}
