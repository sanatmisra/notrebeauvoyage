"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { getFadeIn, getFadeUp } from "@/lib/animations";
import type { NavItem } from "@/types";

type NavigationProps = {
  items: NavItem[];
};

const SECTION_OFFSET = 80;

export default function Navigation({ items }: NavigationProps) {
  const reduceMotion = !!useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<NavItem["href"]>(items[0]?.href ?? "#invitation");
  const fadeIn = useMemo(() => getFadeIn(), []);
  const fadeUp = useMemo(() => getFadeUp(reduceMotion), [reduceMotion]);

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

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const match = items.find((item) => item.href === `#${visible.target.id}`);
        if (match) {
          setActiveHref(match.href);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const smoothScrollTo = (href: NavItem["href"]) => {
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 md:px-5 ${
          isScrolled
            ? "border-token bg-ivory/90 shadow-card backdrop-blur-xl"
            : "border-transparent bg-ivory/45 backdrop-blur-md"
        }`}
      >
        <button
          type="button"
          onClick={() => smoothScrollTo("#home")}
          className="min-h-11 shrink-0 px-2 text-left font-display text-xl italic tracking-wide text-espresso md:text-2xl"
        >
          Notre Beau Voyage
        </button>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-token bg-ivory/70 md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="relative block h-4 w-5">
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
            <button
              key={item.href}
              type="button"
              onClick={() => smoothScrollTo(item.href)}
              className={`min-h-11 px-2 text-sm uppercase tracking-[0.24em] transition-colors duration-300 ${
                item.href === activeHref ? "text-gold" : "text-espresso/70 hover:text-terracotta"
              }`}
            >
              {item.label}
            </button>
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
            className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-[2rem] border border-token bg-ivory/95 p-4 shadow-card backdrop-blur-xl md:hidden"
          >
            {items.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => smoothScrollTo(item.href)}
                className={`min-h-11 rounded-2xl px-4 py-3 text-left text-sm uppercase tracking-[0.3em] ${
                  item.href === activeHref ? "text-gold" : "text-espresso/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
