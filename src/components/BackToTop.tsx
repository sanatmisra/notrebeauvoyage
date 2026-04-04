"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function BackToTop() {
  const reduceMotion = !!useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [500, 600], [0, 1]);
  const scale = useTransform(scrollY, [500, 600], [0.9, 1]);

  return (
    <m.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ opacity, scale }}
      animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 rgba(212,168,83,0.15)", "0 0 0 10px rgba(212,168,83,0)", "0 0 0 rgba(212,168,83,0.15)"] }}
      transition={reduceMotion ? undefined : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      className="fixed bottom-6 right-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ivory shadow-card motion-safe:transform-gpu md:bottom-8 md:right-8"
    >
      <span className="text-lg leading-none">↑</span>
    </m.button>
  );
}
