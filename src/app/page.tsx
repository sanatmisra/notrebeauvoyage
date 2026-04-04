"use client";

import { LazyMotion, domAnimation } from "framer-motion";

import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import TheJourney from "@/components/TheJourney";

export default function Home() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative z-10 overflow-x-hidden">
        <Navigation />
        <Hero />
        <TheJourney />
        <Footer />
        <BackToTop />
      </main>
    </LazyMotion>
  );
}
