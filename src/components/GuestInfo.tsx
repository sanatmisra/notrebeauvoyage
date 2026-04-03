"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { getFadeUp, getSlideLeft, getSlideRight, viewport } from "@/lib/animations";

const notes = [
  {
    title: "Weather",
    body: "Late April on the Côte d'Azur is usually mild and bright, with daytime temperatures around 16 to 21°C. Bring a light layer for breezy evenings near the water.",
  },
  {
    title: "Dress",
    body: "Think Riviera elegance without formality: linen, soft tailoring, easy dresses, and one look you would love to wear for an anniversary dinner.",
  },
  {
    title: "Packing",
    body: "Comfortable walking shoes, sunglasses, sunscreen, and a compact wrap or jacket will take you through village streets, marina dinners, and coastal drives.",
  },
  {
    title: "Travel Rhythm",
    body: "Our base shifts gradually eastward, so keep luggage light and layered. Expect leisurely mornings, scenic transfers, and late meals.",
  },
];

export default function GuestInfo() {
  const reduceMotion = !!useReducedMotion();
  const fadeUp = useMemo(() => getFadeUp(!!reduceMotion), [reduceMotion]);
  const slideLeft = useMemo(() => getSlideLeft(!!reduceMotion), [reduceMotion]);
  const slideRight = useMemo(() => getSlideRight(!!reduceMotion), [reduceMotion]);

  return (
    <section id="guests" className="py-20 md:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideLeft}
          className="card-surface rounded-[2.5rem] px-8 py-10 md:px-10 md:py-12"
          data-cursor-target
        >
          <span className="section-label">Guest Notes</span>
          <h2 className="font-display text-5xl font-light leading-none tracking-tight text-espresso md:text-6xl">
            Practical, but still
            <span className="block italic text-sage">beautiful.</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-espresso/76 md:text-lg">
            This trip is designed to feel easy and unhurried. A little planning will make
            the week even more graceful, especially as we move from St. Tropez toward Nice.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideRight}
          className="grid gap-5 sm:grid-cols-2"
        >
          {notes.map((note) => (
            <motion.article
              key={note.title}
              variants={fadeUp}
              className="rounded-[1.75rem] border border-token bg-ivory/78 px-6 py-7"
              data-cursor-target
            >
              <p className="text-xs uppercase tracking-[0.28em] text-terracotta">{note.title}</p>
              <p className="mt-4 text-base leading-8 text-espresso/75">{note.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
