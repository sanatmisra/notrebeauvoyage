"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import type { GalleryItem } from "@/types";

type GalleryProps = {
  items: GalleryItem[];
};

export default function Gallery({ items }: GalleryProps) {
  return (
    <motion.section
      id="gallery"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
      className="py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div variants={fadeUp} className="max-w-2xl">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Postcards from the week ahead.</h2>
          <p className="section-copy mt-6">
            A small moodboard for the journey: arches warmed by the sun, flowers for the
            anniversary, and a hand-drawn sense of direction from one harbor to the next.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr_0.95fr]">
          {items.map((item, index) => (
            <motion.figure
              key={item.title}
              variants={fadeUp}
              className={`card-surface overflow-hidden rounded-[2rem] p-3 ${
                index === 0 ? "lg:translate-y-8" : ""
              } ${index === 2 ? "lg:-translate-y-8" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="px-3 pb-2 pt-5">
                <p className="font-display text-3xl font-light text-espresso">{item.title}</p>
                <p className="mt-3 text-base leading-7 text-espresso/72">{item.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
