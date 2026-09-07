"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** stagger, in ms */
  delay?: number;
};

/**
 * Lightweight scroll reveal. IntersectionObserver + a CSS transition, so it
 * costs nothing on the main thread while scrolling. Honours reduced motion.
 */
export default function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
