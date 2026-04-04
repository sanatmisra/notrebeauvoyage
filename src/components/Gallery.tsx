"use client";

import { m } from "framer-motion";

import ImageCard from "@/components/ImageCard";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import type { GalleryItem } from "@/types";

type GalleryProps = {
  items: GalleryItem[];
};

export default function Gallery({ items }: GalleryProps) {
  return (
    <m.section
      id="gallery"
      initial={false}
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
      className="py-20 md:py-28 motion-safe:transform-gpu"
    >
      <div className="section-shell">
        <m.div variants={fadeUp} className="max-w-2xl">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Postcards from the week ahead.</h2>
          <p className="section-copy mt-6">
            A small moodboard for the journey: arches warmed by the sun, flowers for the
            anniversary, and a hand-drawn sense of direction from one harbor to the next.
          </p>
        </m.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr_0.95fr]">
          {items.map((item, index) => (
            <m.figure
              key={item.title}
              variants={fadeUp}
              className={`card-surface overflow-hidden rounded-[2rem] p-3 ${
                index === 0 ? "lg:translate-y-8" : ""
              } ${index === 2 ? "lg:-translate-y-8" : ""}`}
              data-cursor-target
            >
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <ImageCard
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="relative"
                  imageClassName="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="px-3 pb-2 pt-5">
                <p className="font-display text-3xl font-light text-espresso">{item.title}</p>
                <p className="mt-3 text-base leading-7 text-espresso/72">{item.caption}</p>
              </figcaption>
            </m.figure>
          ))}
        </div>
      </div>
    </m.section>
  );
}
