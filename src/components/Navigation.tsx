"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { fadeIn, fadeUp, viewport } from "@/lib/animations";
import type { NavItem } from "@/types";

type NavigationProps = {
  items: NavItem[];
};

export default function Navigation({ items }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 ${
          isScrolled
            ? "border-token bg-ivory/80 shadow-card backdrop-blur-xl"
            : "border-transparent bg-ivory/45 backdrop-blur-md"
        }`}
      >
        <a href="#home" className="font-display text-2xl italic tracking-wide text-espresso">
          Notre Beau Voyage
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-token bg-ivory/70 md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-espresso transition-all ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-full bg-espresso transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-full bg-espresso transition-all ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.24em] text-espresso/70 transition-colors duration-300 hover:text-terracotta"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeUp}
            viewport={viewport}
            className="mx-auto mt-3 flex max-w-7xl flex-col gap-4 rounded-[2rem] border border-token bg-ivory/95 p-6 shadow-card backdrop-blur-xl md:hidden"
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.3em] text-espresso/80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
