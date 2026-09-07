"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { bindViewport } from "@/lib/viewportStore";

export default function SmoothScroll() {
  useEffect(() => {
    const unbind = bindViewport();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return unbind;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Make in-page anchor links glide instead of jump
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href*='#']") as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.4 });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      unbind();
    };
  }, []);

  return null;
}
