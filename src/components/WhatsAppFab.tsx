"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "lucide-react";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

/**
 * The two ways to reach us, stacked in the corner once the hero is behind you:
 * a call button riding above the WhatsApp one.
 *
 * Only the WhatsApp button pulses — two pinging circles in the same corner read
 * as noise rather than as an invitation.
 */
export default function WhatsAppFab() {
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setHint(true), 900);
    const t2 = setTimeout(() => setHint(false), 6500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-60 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
        >
          <a
            href={`tel:+${site.phoneRaw}`}
            aria-label={`Call ${site.name} on ${site.phoneDisplay}`}
            className="group grid h-12 w-12 place-items-center rounded-full bg-forest text-ivory shadow-[0_10px_34px_-8px_rgba(23,56,26,0.75)] transition-transform duration-300 hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
          >
            <Phone
              size={20}
              strokeWidth={1.7}
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12"
            />
          </a>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {hint && (
                <motion.span
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  className="hidden rounded-full border border-leaf/20 bg-ivory/90 px-4 py-2 text-[11px] tracking-[0.14em] text-forest/85 backdrop-blur-md sm:block"
                >
                  Chat with us — we reply fast
                </motion.span>
              )}
            </AnimatePresence>

            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${site.name} on WhatsApp`}
              className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_10px_40px_-6px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35" />
              <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white" aria-hidden>
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.05 22l5.34-1.4a9.83 9.83 0 0 0 4.65 1.18h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2Zm0 18.03h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.33c0-4.52 3.68-8.19 8.2-8.19a8.14 8.14 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.16-8.19 8.16Z" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
