/**
 * A tiny module-level store so the WebGL canvas can read scroll + pointer
 * without re-rendering React on every frame.
 */
export const vp = {
  /** 0 → 1 across the whole document */
  scroll: 0,
  /** -1 → 1, normalised pointer position */
  px: 0,
  py: 0,
  /** smoothed values, updated inside the render loop */
  spx: 0,
  spy: 0,
};

let bound = false;

export function bindViewport() {
  if (bound || typeof window === "undefined") return () => {};
  bound = true;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    vp.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };
  const onPointer = (e: PointerEvent) => {
    vp.px = (e.clientX / window.innerWidth) * 2 - 1;
    vp.py = (e.clientY / window.innerHeight) * 2 - 1;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });

  return () => {
    bound = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("pointermove", onPointer);
  };
}

export const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));
