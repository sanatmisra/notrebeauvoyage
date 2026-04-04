"use client";

import { m } from "framer-motion";

import { fadeUp, viewport } from "@/lib/animations";

export default function Footer() {
  return (
    <m.footer
      id="footer"
      initial={false}
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      className="pb-10 pt-8 motion-safe:transform-gpu"
    >
      <div className="section-shell">
        <div className="rounded-[2.5rem] border border-token bg-espresso px-8 py-10 text-center text-ivory md:px-12 md:py-14">
          <p className="text-xs uppercase tracking-[0.34em] text-gold">
            25 April to 2 May 2025
          </p>
          <p className="mt-5 font-display text-5xl font-light italic leading-tight md:text-6xl">
            With love,
            <span className="block not-italic">Sneha & Sanat</span>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ivory/76 md:text-lg">
            Thank you for being part of a week that means so much to us. We cannot wait to
            celebrate our anniversary on the Côte d&apos;Azur with the people we hold close.
          </p>
        </div>
      </div>
    </m.footer>
  );
}
