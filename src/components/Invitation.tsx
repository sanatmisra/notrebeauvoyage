"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

export default function Invitation() {
  return (
    <motion.section
      id="invitation"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
      className="py-20 md:py-28"
    >
      <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <motion.div variants={fadeUp}>
          <span className="section-label">Invitation</span>
          <h2 className="section-title">Come away with us.</h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="card-surface rounded-[2.25rem] px-7 py-8 md:px-10 md:py-12"
        >
          <p className="font-display text-3xl font-light italic leading-tight text-terracotta md:text-4xl">
            Join us for a week shaped by blue water, old harbors, and the joy of
            celebrating how far love can travel.
          </p>
          <div className="mt-8 space-y-6 text-base leading-8 text-espresso/80 md:text-lg">
            <p>
              After ten beautiful years together in Munich, we are returning to the kind
              of coastline that invites reflection, delight, and a little romance. From
              St. Tropez to Nice, each stop has been chosen as part of a quiet vow renewal
              journey that feels intimate, sun-washed, and full of gratitude.
            </p>
            <p>
              This is not a formal wedding weekend. It is a celebration in motion: a table
              set late, a view worth pausing for, and a sequence of days we would love to
              share with the people who know our story best.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
