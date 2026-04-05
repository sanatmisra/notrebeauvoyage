"use client";

import { m } from "framer-motion";

import { fadeUp, viewport } from "@/lib/animations";

function FooterFloral({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <svg viewBox="0 0 800 180" aria-hidden="true" className={className}>
      <path
        d="M116 154 L116 66 Q116 34 148 34 L286 34"
        fill="none"
        stroke="rgba(212,168,83,0.42)"
        strokeWidth="1"
      />
      <path
        d="M684 154 L684 66 Q684 34 652 34 L514 34"
        fill="none"
        stroke="rgba(212,168,83,0.42)"
        strokeWidth="1"
      />
      <path
        d="M310 34 L400 34 L490 34"
        fill="none"
        stroke="rgba(212,168,83,0.32)"
        strokeWidth="1"
      />
      {[
        { x: 126, y: 132, r: -28, w: 10, h: 22 },
        { x: 154, y: 50, r: -34, w: 10, h: 22 },
        { x: 248, y: 34, r: -90, w: 11, h: 24 },
        { x: 330, y: 34, r: -94, w: 10, h: 22 },
        { x: 470, y: 34, r: 94, w: 10, h: 22 },
        { x: 552, y: 34, r: 90, w: 11, h: 24 },
        { x: 646, y: 50, r: 34, w: 10, h: 22 },
        { x: 674, y: 132, r: 28, w: 10, h: 22 },
      ]
        .slice(0, compact ? 5 : 8)
        .map((leaf, index) => (
          <ellipse
            key={`leaf-${index}`}
            cx={leaf.x}
            cy={leaf.y}
            rx={leaf.w / 2}
            ry={leaf.h / 2}
            transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
            fill="rgba(139,158,138,0.58)"
          />
        ))}
      {[
        { x: 140, y: 142, size: 13 },
        { x: 288, y: 34, size: 13 },
        { x: 400, y: 34, size: 24 },
        { x: 512, y: 34, size: 13 },
        { x: 660, y: 142, size: 13 },
      ]
        .slice(0, compact ? 3 : 5)
        .map((flower, index) => (
          <g key={`flower-${index}`} transform={`translate(${flower.x} ${flower.y})`}>
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy={-(flower.size / 2.8)}
                rx={flower.size / 5}
                ry={flower.size / 2.7}
                transform={`rotate(${angle})`}
                fill={flower.size > 20 ? "rgba(201,135,106,0.58)" : "rgba(245,239,230,0.68)"}
              />
            ))}
            <circle cx="0" cy="0" r={flower.size / 6} fill="rgba(212,168,83,0.92)" />
          </g>
        ))}
    </svg>
  );
}

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
        <div className="relative overflow-visible rounded-[2.5rem] border border-token bg-espresso px-8 py-12 text-center text-ivory md:px-12 md:py-16">
          <FooterFloral className="pointer-events-none absolute left-1/2 top-[-34px] hidden h-[132px] w-[78%] -translate-x-1/2 md:block" />
          <FooterFloral className="pointer-events-none absolute bottom-[-18px] left-1/2 hidden h-[90px] w-[78%] -translate-x-1/2 rotate-180 md:block" compact />
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
