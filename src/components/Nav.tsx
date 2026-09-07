"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#services", label: "Therapies" },
  { href: "/#gallery", label: "Our Spa" },
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
            ? "nav-solid py-2"
            : "border-b border-transparent py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
            <Image
              src="/logo.png"
              alt=""
              width={132}
              height={121}
              priority
              className={`w-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                solid ? "h-11" : "h-14"
              }`}
            />
            <span className="flex flex-col leading-none">
              <span className="display text-[1.05rem] tracking-wide sm:text-[1.3rem]">
                The Nature <span className="accent-text">Spa</span>
              </span>
              <span className="mt-1 text-[7px] uppercase tracking-[0.26em] text-bronze sm:mt-1.5 sm:text-[8.5px] sm:tracking-[0.34em]">
                Rejuvenate Naturally
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative text-[12.5px] uppercase tracking-[0.16em] text-body transition-colors hover:text-forest"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-leaf transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+${site.phoneRaw}`}
              className="hidden items-center gap-2 text-[13px] tracking-wide text-body transition-colors hover:text-forest md:flex"
            >
              <Phone size={14} strokeWidth={1.6} />
              {site.phoneDisplay}
            </a>

            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden overflow-hidden rounded-full bg-forest px-5 py-2.5 text-[11.5px] uppercase tracking-[0.18em] text-ivory transition-transform duration-500 hover:scale-[1.04] sm:block"
            >
              <span className="absolute inset-0 -translate-x-full bg-lime/40 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
              <span className="relative">Book Now</span>
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:border-forest/40 lg:hidden"
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
            className="fixed inset-0 z-70 bg-ivory lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 40% at 90% 8%, rgba(143,194,74,0.22), transparent 70%)",
              }}
            />

            <div className="relative flex items-center justify-between px-5 py-5 sm:px-8">
              <Image src="/logo.png" alt="" width={120} height={110} className="h-12 w-auto" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="relative mt-4 flex flex-col px-5 sm:px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * i + 0.06,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-forest/8"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-4 text-[2.1rem]"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="relative mt-8 flex flex-col gap-3 px-5 sm:px-8">
              <a
                href={whatsappLink(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-forest px-6 py-4 text-center text-[12px] uppercase tracking-[0.22em] text-ivory"
              >
                Book on WhatsApp
              </a>
              <a
                href={`tel:+${site.phoneRaw}`}
                className="rounded-full border border-forest/20 px-6 py-4 text-center text-[12px] uppercase tracking-[0.22em] text-forest"
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
