"use client";

import { m } from "framer-motion";

import { fadeUp, slideLeft, slideRight, viewport } from "@/lib/animations";

const storyNotes = [
  "From our first chapter in India to the life we have built together in Munich.",
  "Ten years of shared meals, late-night plans, airport departures, and everyday tenderness.",
  "A promise renewed not for spectacle, but for the quiet certainty that still feels new.",
];

export default function OurStory() {
  return (
    <section id="our-story" className="py-20 md:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <m.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={slideLeft}
          className="rounded-[2.5rem] border border-token bg-espresso px-8 py-10 text-ivory shadow-card motion-safe:transform-gpu md:px-10 md:py-14"
          data-cursor-target
        >
          <span className="section-label !text-gold before:!bg-gold/60">Our Story</span>
          <h2 className="font-display text-5xl font-light leading-none tracking-tight md:text-6xl">
            Ten years,
            <span className="block italic text-gold">still becoming.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-ivory/78 md:text-lg">
            We have always loved places that carry a little beauty in their edges. The
            French Riviera felt right for the same reason our life together has felt right:
            it is warm, textured, elegant, and best enjoyed slowly.
          </p>
        </m.div>

        <m.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={slideRight}
          className="space-y-6 motion-safe:transform-gpu"
        >
          {storyNotes.map((note, index) => (
            <m.article
              key={note}
              variants={fadeUp}
              className="card-surface rounded-[2rem] px-7 py-8 md:px-8"
              data-cursor-target
            >
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                Chapter {index + 1}
              </p>
              <p className="mt-4 font-display text-3xl font-light leading-tight text-espresso md:text-4xl">
                {note}
              </p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
