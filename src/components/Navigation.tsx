"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SECTION_OFFSET = 80;

export default function Navigation() {
  const reduceMotion = !!useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothScrollTo = (href: `#${string}`) => {
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-center rounded-[1.75rem] border px-4 py-3 transition-all duration-500 md:px-5 ${
          isScrolled
            ? "border-[#5b4d31] bg-[rgba(44,36,22,0.94)] shadow-[0_18px_44px_rgba(44,36,22,0.3)] backdrop-blur-xl"
            : "border-[rgba(212,168,83,0.28)] bg-[rgba(44,36,22,0.88)] shadow-[0_14px_32px_rgba(44,36,22,0.24)] backdrop-blur-md"
        }`}
      >
        <button
          type="button"
          onClick={() => smoothScrollTo("#home")}
          className="min-h-11 shrink-0 px-2 text-center text-ivory"
        >
          <span className="block font-display text-[1.15rem] italic leading-none tracking-wide text-ivory md:text-[1.6rem]">
            Notre Beau Voyage
          </span>
          <span className="mt-1 block font-body text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold/85 md:text-[0.72rem]">
            Our beautiful journey
          </span>
        </button>
      </div>
    </header>
  );
}
