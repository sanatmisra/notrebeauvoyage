"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import GuestInfo from "@/components/GuestInfo";
import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Navigation from "@/components/Navigation";
import OurStory from "@/components/OurStory";
import TheJourney from "@/components/TheJourney";

import type { GalleryItem, NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Invitation", href: "#invitation" },
  { label: "Our Story", href: "#our-story" },
  { label: "The Journey", href: "#the-journey" },
  { label: "Guest Notes", href: "#guests" },
  { label: "Gallery", href: "#gallery" },
];

const galleryItems: GalleryItem[] = [
  {
    src: "/images/riviera-arch.svg",
    alt: "A Mediterranean archway framing the Riviera coast",
    title: "Riviera Light",
    caption: "Terracotta walls, pale skies, and the first breeze off the water.",
  },
  {
    src: "/images/anniversary-bouquet.svg",
    alt: "An anniversary bouquet in warm terracotta and gold tones",
    title: "29 April",
    caption: "A floral tribute to ten years together and the vows we renew beside the sea.",
  },
  {
    src: "/images/postcard-map.svg",
    alt: "A postcard-style map tracing the French Riviera route",
    title: "From St. Tropez to Nice",
    caption: "A slow ribbon of days along the Côte d'Azur, stitched together by memory.",
  },
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
          className="relative overflow-x-hidden"
        >
          <Navigation items={navItems} />
          <Hero />
          <Invitation />
          <OurStory />
          <TheJourney />
          <GuestInfo />
          <Gallery items={galleryItems} />
          <Footer />
          <BackToTop />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
