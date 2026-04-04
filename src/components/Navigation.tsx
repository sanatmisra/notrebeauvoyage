"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { getFadeIn } from "@/lib/animations";
import type { NavItem } from "@/types";

type NavigationProps = {
  items: NavItem[];
};

const SECTION_OFFSET = 80;

export default function Navigation({ items }: NavigationProps) {
  const reduceMotion = !!useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<NavItem["href"]>(items[0]?.href ?? "#invitation");
  const fadeIn = useMemo(() => getFadeIn(), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const smoothScrollTo = (href: NavItem["href"]) => {
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-center rounded-[1.75rem] border px-4 py-3 transition-all duration-500 md:justify-between md:px-5 ${
          isScrolled
            ? "border-[#d8c6b1] bg-[rgba(248,241,232,0.94)] shadow-[0_18px_44px_rgba(44,36,22,0.12)] backdrop-blur-xl"
            : "border-[rgba(255,248,238,0.55)] bg-[rgba(250,245,239,0.78)] shadow-[0_14px_32px_rgba(44,36,22,0.08)] backdrop-blur-md"
        }`}
      >
        <button
          type="button"
          onClick={() => smoothScrollTo("#home")}
          className="min-h-11 shrink-0 px-2 text-center text-espresso"
        >
          <span className="block font-display text-[1.15rem] italic leading-none tracking-wide md:text-[1.6rem]">
            Notre Beau Voyage
          </span>
          <span className="mt-1 block font-body text-[0.62rem] font-medium uppercase tracking-[0.2em] text-espresso/58 md:text-[0.72rem]">
            Our beautiful journey
          </span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => smoothScrollTo(item.href)}
              className={`min-h-11 px-2 text-sm uppercase tracking-[0.24em] transition-colors duration-300 ${
                item.href === activeHref ? "text-terracotta" : "text-espresso/68 hover:text-terracotta"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
