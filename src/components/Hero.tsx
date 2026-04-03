"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

import { fadeUp } from "@/lib/animations";

const contentItems = [
  {
    key: "eyebrow",
    delay: 0.4,
    node: (
      <p className="mx-auto max-w-[18rem] font-body text-[0.62rem] font-light uppercase tracking-[0.22em] text-white/80 sm:max-w-none sm:text-[0.7rem] sm:tracking-[0.28em]">
        You are warmly invited to celebrate
      </p>
    ),
  },
  {
    key: "names",
    delay: 0.7,
    node: (
      <h1
        className="font-display font-light italic text-white"
        style={{ fontSize: "clamp(3.6rem, 15vw, 9.5rem)", lineHeight: 0.9 }}
      >
        Sanat &amp; Sneha
      </h1>
    ),
  },
  {
    key: "divider",
    delay: 1,
    node: (
      <div className="flex items-center justify-center gap-3 text-gold sm:gap-4">
        <span className="text-[0.6rem] sm:text-xs" aria-hidden="true">
          ◆
        </span>
        <span className="h-px w-10 bg-gold sm:w-12" aria-hidden="true" />
        <span className="text-[0.6rem] sm:text-xs" aria-hidden="true">
          ◆
        </span>
      </div>
    ),
  },
  {
    key: "date-location",
    delay: 1.2,
    node: (
      <p className="mx-auto max-w-[17rem] text-balance font-body text-[0.72rem] font-light uppercase leading-6 tracking-[0.14em] text-white/90 sm:max-w-none sm:text-[0.85rem] sm:tracking-[0.22em]">
        29 April 2025 &nbsp; &#183; &nbsp; C&#244;te d&apos;Azur
      </p>
    ),
  },
  {
    key: "route",
    delay: 1.4,
    node: (
      <p className="font-display text-[1.1rem] italic text-gold sm:text-[1.3rem]">
        St. Tropez &nbsp; &#8594; &nbsp; Nice
      </p>
    ),
  },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 200]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.92]);
  const overlayBackground = useMotionTemplate`linear-gradient(to bottom, rgba(44, 36, 22, ${useTransform(
    overlayOpacity,
    [0.92, 1],
    [0.51, 0.2],
  )}) 0%, rgba(44, 36, 22, ${useTransform(overlayOpacity, [0.92, 1], [0.88, 0.55])}) 100%)`;

  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <motion.div
        className="hero-bg absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #2C2416 0%, #C9876A 50%, #D4A853 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: overlayBackground,
        }}
      />

      <div className="section-shell relative z-10 flex flex-col items-center px-2 pt-20 text-center sm:pt-24">
        <div className="flex max-w-5xl flex-col items-center gap-4 sm:gap-5">
          {contentItems.map((item) => (
            <motion.div
              key={item.key}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: item.delay, duration: 0.9, ease: "easeOut" }}
              className="w-full"
            >
              {item.node}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center sm:bottom-10"
      >
        <p className="font-body text-[0.6rem] font-light uppercase tracking-[0.18em] text-white/50 sm:text-[0.65rem] sm:tracking-[0.2em]">
          Scroll
        </p>
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="mt-2 h-10 w-px bg-gold sm:mt-3 sm:h-12"
        />
      </motion.div>
    </section>
  );
}
