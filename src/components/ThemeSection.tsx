"use client";

import { m } from "framer-motion";

import ImageCard from "@/components/ImageCard";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

const palette = [
  { label: "Light blue", className: "bg-sky-200" },
  { label: "Sage green", className: "bg-emerald-200" },
  { label: "Blush", className: "bg-rose-200" },
  { label: "Lavender", className: "bg-violet-200" },
  { label: "Soft grey", className: "bg-stone-300" },
  { label: "Ivory", className: "bg-[#f6f0e7]" },
];

export default function ThemeSection() {
  return (
    <m.section
      id="theme"
      initial={false}
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
      className="py-20 md:py-28 motion-safe:transform-gpu"
    >
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <m.div variants={fadeUp}>
          <span className="section-label">Theme</span>
          <h2 className="section-title">Theme for the celebration.</h2>
          <p className="section-copy mt-6">
            Dress code for the evening: Riviera Chic, in soft summer pastels.
          </p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-espresso/10 shadow-[0_18px_44px_rgba(44,36,22,0.08)]">
            <ImageCard
              src="/images/dress-code-main-event.png"
              alt="Main event dress code inspiration"
              width={1200}
              height={1600}
              sizes="(max-width: 1023px) 100vw, 32vw"
              className="relative aspect-[4/5] w-full"
              imageClassName="h-full w-full object-cover"
            />
          </div>
        </m.div>

        <m.div
          variants={fadeUp}
          className="card-surface rounded-[2.25rem] px-7 py-8 md:px-10 md:py-12"
          data-cursor-target
        >
          <p className="font-display text-3xl font-light italic leading-tight text-terracotta md:text-4xl">
            Dress Code – Riviera Chic (Pastel Edition)
          </p>

          <div className="mt-8 space-y-6 text-base leading-8 text-espresso/80 md:text-lg">
            <p>
              We invite you to dress in elegant, light summer attire inspired by the
              French Riviera.
            </p>
            <p>
              Guests are encouraged to wear soft pastels such as light blue, sage
              green, blush, lavender, and soft grey, paired with light, breathable
              fabrics. The bride and groom will be wearing ivory tones.
            </p>
            <p>Please avoid totally white and dark colors.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {palette.map((tone) => (
              <span
                key={tone.label}
                className="inline-flex items-center gap-3 rounded-full border border-espresso/10 bg-white/75 px-4 py-2 text-sm text-espresso/70"
              >
                <span className={`h-3 w-3 rounded-full ${tone.className}`} />
                {tone.label}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-terracotta/15 bg-terracotta/8 px-5 py-5">
              <p className="font-body text-[0.72rem] font-medium uppercase tracking-[0.24em] text-terracotta">
                Ladies
              </p>
              <p className="mt-3 text-base leading-7 text-espresso/75">
                Flowing dresses in soft tones.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-terracotta/15 bg-terracotta/8 px-5 py-5">
              <p className="font-body text-[0.72rem] font-medium uppercase tracking-[0.24em] text-terracotta">
                Gentlemen
              </p>
              <p className="mt-3 text-base leading-7 text-espresso/75">
                Light suits or linen combinations in pastel shades, no tie required.
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
}
