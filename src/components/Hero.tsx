"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeUp, scaleUp, slideLeft, slideRight, viewport } from "@/lib/animations";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32"
    >
      <div className="absolute inset-0 -z-20 bg-sun-wash" />
      <div className="absolute left-1/2 top-24 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideLeft}
          className="max-w-2xl"
        >
          <span className="section-label">Sanat & Sneha</span>
          <h1 className="font-display text-6xl font-light leading-[0.88] tracking-tight text-espresso sm:text-7xl lg:text-[7.5rem]">
            Notre
            <span className="block italic text-terracotta">Beau Voyage</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-espresso/78 md:text-xl">
            A vow renewal journey along the French Riviera, from St. Tropez to Nice, as
            we celebrate ten years together and welcome a new chapter by the sea.
          </p>

          <div className="mt-8 flex flex-col gap-4 text-sm uppercase tracking-[0.28em] text-espresso/70 sm:flex-row sm:items-center">
            <span>26 April to 1 May 2025</span>
            <span className="hidden h-1 w-1 rounded-full bg-terracotta sm:block" />
            <span>Anniversary on 29 April</span>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#invitation"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-4 text-sm uppercase tracking-[0.26em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
            >
              Read Our Invitation
            </a>
            <a
              href="#journey"
              className="inline-flex items-center justify-center rounded-full border border-token px-8 py-4 text-sm uppercase tracking-[0.26em] text-espresso transition-colors duration-300 hover:bg-ivory/70"
            >
              Explore the Itinerary
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideRight}
          className="relative min-h-[32rem]"
        >
          <motion.div
            variants={scaleUp}
            className="absolute right-0 top-0 w-[72%] overflow-hidden rounded-[2.5rem] border border-token bg-ivory p-3 shadow-card"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/riviera-arch.svg"
                alt="Riviera archway and coastline illustration"
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="card-surface absolute bottom-2 left-0 w-[62%] rounded-[2rem] p-3"
          >
            <div className="relative aspect-[5/6] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/anniversary-bouquet.svg"
                alt="Anniversary bouquet illustration"
                fill
                sizes="(max-width: 1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="card-surface absolute bottom-6 right-8 max-w-xs rounded-[1.75rem] px-6 py-5"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-terracotta">29 April</p>
            <p className="mt-3 font-display text-3xl italic leading-tight text-espresso">
              Ten years, one shoreline, and vows renewed under the Riviera sun.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
