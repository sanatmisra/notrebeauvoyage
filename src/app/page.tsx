"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Navigation from "@/components/Navigation";
import TheJourney from "@/components/TheJourney";
import ThemeSection from "@/components/ThemeSection";

import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Invitation", href: "#invitation" },
  { label: "Theme", href: "#theme" },
  { label: "The Journey", href: "#the-journey" },
];

export default function Home() {
  const reduceMotion = !!useReducedMotion();

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <motion.main
          key="notre-beau-voyage"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 overflow-x-hidden"
        >
          <Navigation items={navItems} />
          <Hero />
          <Invitation />
          <ThemeSection />
          <TheJourney />
          <Footer />
          <BackToTop />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
