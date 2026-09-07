"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold-dk via-gold-lt to-gold-dk"
    />
  );
}
