"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { getFadeUp, getStaggerContainer, viewport } from "@/lib/animations";

export default function Invitation() {
  const reduceMotion = !!useReducedMotion();
  const fadeUp = useMemo(() => getFadeUp(!!reduceMotion), [reduceMotion]);
  const staggerContainer = useMemo(() => getStaggerContainer(!!reduceMotion), [reduceMotion]);

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
          data-cursor-target
        >
          <p className="font-display text-3xl font-light italic leading-tight text-terracotta md:text-4xl">
            After ten years of marriage, we want to celebrate our story by remembering
            the journey so far and beginning a new chapter with you beside us.
          </p>
          <div className="mt-8 space-y-6 text-base leading-8 text-espresso/80 md:text-lg">
            <p>
              After ten years of being married to each other, we want to relive and
              remember the memories that have shaped us, together with the people who
              have been closest to our hearts through it all.
            </p>
            <p>
              In your presence, we will symbolically renew our vows to one another and
              mark the beginning of the next decade of love, friendship, and shared
              memories.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
