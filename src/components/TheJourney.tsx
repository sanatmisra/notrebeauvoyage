"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import type { ItineraryDay } from "@/types";

type TheJourneyProps = {
  days: ItineraryDay[];
};

export default function TheJourney({ days }: TheJourneyProps) {
  return (
    <motion.section
      id="journey"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
      className="py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div variants={fadeUp} className="max-w-3xl">
          <span className="section-label">The Journey</span>
          <h2 className="section-title">A coastline told in six days.</h2>
          <p className="section-copy mt-6">
            We are tracing the Riviera eastward, beginning in St. Tropez and ending in
            Nice, with room for long lunches, sea views, and one unforgettable anniversary
            on 29 April.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {days.map((day) => (
            <motion.article
              key={`${day.date}-${day.location}`}
              variants={fadeUp}
              className={`rounded-[2rem] border px-7 py-8 transition-transform duration-500 hover:-translate-y-1 md:px-8 ${
                day.featured
                  ? "border-terracotta bg-gradient-to-br from-terracotta/10 via-gold/10 to-ivory shadow-card"
                  : "card-surface"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{day.date}</p>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <p className="text-xs uppercase tracking-[0.3em] text-espresso/55">{day.location}</p>
              </div>
              <h3 className="mt-5 font-display text-4xl font-light leading-tight text-espresso">
                {day.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-espresso/75">{day.description}</p>
              <ul className="mt-6 space-y-3">
                {day.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm uppercase tracking-[0.16em] text-espresso/68"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
