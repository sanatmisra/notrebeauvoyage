"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

const grainOverlay =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

const polaroids = [
  {
    src: "/images/couple/7fb8057d-687b-486f-82d6-fbecb7fb69f5.jpg",
    alt: "Sneha and Sanat together",
    className:
      "left-[3%] top-[16%] hidden w-40 -rotate-[11deg] md:block lg:w-48 xl:w-56",
  },
  {
    src: "/images/couple/DSC05137.jpeg",
    alt: "Sneha and Sanat portrait",
    className:
      "left-[10%] bottom-[12%] hidden w-44 rotate-[8deg] md:block lg:w-52 xl:w-60",
  },
  {
    src: "/images/couple/IMG_0045.jpg",
    alt: "Sneha and Sanat candid moment",
    className:
      "right-[8%] top-[14%] hidden w-44 rotate-[10deg] md:block lg:w-52 xl:w-60",
  },
  {
    src: "/images/couple/IMG_5960.JPG",
    alt: "Sneha and Sanat travelling together",
    className:
      "right-[3%] bottom-[10%] hidden w-40 -rotate-[8deg] md:block lg:w-48 xl:w-56",
  },
  {
    src: "/images/couple/IMG_7306.jpg",
    alt: "Sneha and Sanat travel memory",
    className:
      "left-1/2 top-[8%] hidden w-36 -translate-x-1/2 rotate-[2deg] lg:block xl:w-44",
  },
];

const textTransition = {
  duration: 0.8,
  ease: [0.21, 0.47, 0.32, 0.98] as const,
};

function FloralDecoration({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <m.svg
      viewBox="0 0 800 180"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut", delay: 0.8 }}
      className={className}
    >
      <path
        d="M88 166 C 164 90, 248 34, 400 22 C 552 34, 636 90, 712 166"
        fill="none"
        stroke="rgba(212,168,83,0.6)"
        strokeWidth="1"
      />
      <path
        d="M122 166 C 112 186, 114 198, 126 208"
        fill="none"
        stroke="rgba(139,158,138,0.5)"
        strokeWidth="1"
      />
      <path
        d="M678 166 C 688 186, 686 198, 674 208"
        fill="none"
        stroke="rgba(139,158,138,0.5)"
        strokeWidth="1"
      />

      {[
        { x: 138, y: 134, r: -36, w: 10, h: 22 },
        { x: 166, y: 116, r: -28, w: 11, h: 24 },
        { x: 198, y: 98, r: -21, w: 9, h: 21 },
        { x: 236, y: 79, r: -18, w: 10, h: 24 },
        { x: 278, y: 61, r: -12, w: 11, h: 26 },
        { x: 330, y: 42, r: -8, w: 12, h: 28 },
        { x: 374, y: 29, r: -4, w: 10, h: 22 },
        { x: 426, y: 29, r: 4, w: 10, h: 22 },
        { x: 470, y: 42, r: 8, w: 12, h: 28 },
        { x: 522, y: 61, r: 12, w: 11, h: 26 },
        { x: 564, y: 79, r: 18, w: 10, h: 24 },
        { x: 602, y: 98, r: 21, w: 9, h: 21 },
        { x: 634, y: 116, r: 28, w: 11, h: 24 },
        { x: 662, y: 134, r: 36, w: 10, h: 22 },
      ].map((leaf, index) => (
        <ellipse
          key={`leaf-${index}`}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.w / 2}
          ry={leaf.h / 2}
          transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
          fill="rgba(139,158,138,0.7)"
        />
      ))}

      {[
        { x: 152, y: 150, size: 14 },
        { x: 226, y: 86, size: 13 },
        { x: 310, y: 50, size: 14 },
        { x: 358, y: 31, size: 12 },
        { x: 442, y: 31, size: 12 },
        { x: 490, y: 50, size: 14 },
        { x: 574, y: 86, size: 13 },
        { x: 648, y: 150, size: 14 },
      ]
        .slice(0, compact ? 4 : 8)
        .map((flower, index) => (
          <g key={`small-flower-${index}`} transform={`translate(${flower.x} ${flower.y})`}>
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-6"
                rx={flower.size / 4.6}
                ry={flower.size / 2.7}
                transform={`rotate(${angle})`}
                fill="rgba(245,239,230,0.75)"
              />
            ))}
            <circle cx="0" cy="0" r={flower.size / 5} fill="rgba(212,168,83,0.9)" />
          </g>
        ))}

      {[
        { x: 110, y: 162, size: 24 },
        { x: 400, y: 18, size: 28 },
        { x: 690, y: 162, size: 24 },
      ]
        .slice(0, compact ? 2 : 3)
        .map((flower, index) => (
          <g key={`accent-flower-${index}`} transform={`translate(${flower.x} ${flower.y})`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy={-(flower.size / 2.8)}
                rx={flower.size / 6.3}
                ry={flower.size / 3}
                transform={`rotate(${angle})`}
                fill="rgba(201,135,106,0.65)"
              />
            ))}
            <circle cx="0" cy="0" r={flower.size / 6} fill="rgba(212,168,83,1)" />
          </g>
        ))}

      {[
        [182, 108],
        [256, 72],
        [342, 40],
        [458, 40],
        [544, 72],
        [618, 108],
      ]
        .slice(0, compact ? 3 : 6)
        .map(([x, y], index) => (
          <circle
            key={`berry-${index}`}
            cx={x}
            cy={y}
            r={compact ? 2 : 3}
            fill="rgba(212,168,83,0.5)"
          />
        ))}

      {!compact && (
        <>
          <ellipse
            cx="120"
            cy="183"
            rx="4"
            ry="10"
            transform="rotate(-24 120 183)"
            fill="rgba(139,158,138,0.6)"
          />
          <ellipse
            cx="131"
            cy="198"
            rx="4"
            ry="9"
            transform="rotate(18 131 198)"
            fill="rgba(139,158,138,0.6)"
          />
          <ellipse
            cx="680"
            cy="183"
            rx="4"
            ry="10"
            transform="rotate(24 680 183)"
            fill="rgba(139,158,138,0.6)"
          />
          <ellipse
            cx="669"
            cy="198"
            rx="4"
            ry="9"
            transform="rotate(-18 669 198)"
            fill="rgba(139,158,138,0.6)"
          />
        </>
      )}
    </m.svg>
  );
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="rgba(212,168,83,0.45)"
      strokeWidth="1"
    >
      <path d="M18 2 H7 Q4 2 2 4 V15" />
      <path d="M12 2 L18 2 L18 8" />
      <path d="M8.7 8.7 L10 7.4 L11.3 8.7 L10 10 Z" fill="rgba(212,168,83,0.45)" stroke="none" />
    </svg>
  );
}

export default function Hero() {
  const reduceMotion = !!useReducedMotion();
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-espresso"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: grainOverlay }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(212,168,83,0.16),transparent_34%),radial-gradient(circle_at_15%_82%,rgba(201,135,106,0.12),transparent_28%),radial-gradient(circle_at_88%_22%,rgba(212,168,83,0.14),transparent_32%)]" />

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-35">
        {polaroids.map((photo) => (
          <div
            key={photo.src}
            className={`absolute rounded-[0.4rem] bg-[rgba(253,250,246,0.92)] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] ${photo.className}`}
          >
            <div className="overflow-hidden rounded-[0.18rem] bg-espresso/40">
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover saturate-[0.92] sepia-[0.12]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="section-shell relative z-10 flex min-h-[100dvh] items-center justify-center py-24 text-center md:py-28">
        <div className="w-full">
          <m.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={
              reduceMotion ? undefined : { duration: 1, ease: "easeOut", delay: 0.3 }
            }
            className="relative mx-auto w-[clamp(340px,85vw,820px)] overflow-visible rounded-[4px] border border-[rgba(212,168,83,0.35)] bg-[rgba(44,36,22,0.65)] px-7 pb-14 pt-16 text-center text-ivory shadow-[0_32px_90px_rgba(12,8,4,0.48)] backdrop-blur-[8px] sm:px-10 md:px-14 md:pb-14 md:pt-16"
          >
            <FloralDecoration className="pointer-events-none absolute left-1/2 top-0 z-[11] h-[180px] w-full -translate-x-1/2 overflow-visible max-md:scale-[0.85]" />
            <FloralDecoration className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[80px] w-[70%] -translate-x-1/2 rotate-180 overflow-visible md:block" compact />

            <div className="pointer-events-none absolute inset-[14px] border border-[rgba(212,168,83,0.2)]" />
            <CornerFlourish className="pointer-events-none absolute left-[12px] top-[12px] hidden h-5 w-5 md:block" />
            <CornerFlourish className="pointer-events-none absolute right-[12px] top-[12px] hidden h-5 w-5 rotate-90 md:block" />
            <CornerFlourish className="pointer-events-none absolute bottom-[12px] left-[12px] hidden h-5 w-5 -rotate-90 md:block" />
            <CornerFlourish className="pointer-events-none absolute bottom-[12px] right-[12px] hidden h-5 w-5 rotate-180 md:block" />

            <div className="relative z-10">
              <m.p
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { ...textTransition, delay: 0.6 }}
                className="font-body text-[0.68rem] font-light uppercase leading-7 tracking-[0.28em] text-gold/80"
              >
                <span className="block">You are warmly invited to our</span>
                <span className="block">10 year wedding anniversary celebration</span>
              </m.p>

              <m.h1
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { ...textTransition, delay: 0.72 }}
                className="mt-6 font-display font-light italic leading-[0.95] text-[#FDFAF6]"
                style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)" }}
              >
                Sneha &amp; Sanat
              </m.h1>

              <m.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { ...textTransition, delay: 0.82 }}
                className="mt-5 flex items-center justify-center gap-3 text-gold"
              >
                <span className="text-xs" aria-hidden="true">
                  ◆
                </span>
                <span className="h-px w-10 bg-gold" aria-hidden="true" />
                <span className="text-xs" aria-hidden="true">
                  ◆
                </span>
              </m.div>

              <m.p
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { ...textTransition, delay: 0.92 }}
                className="mt-6 font-body text-[0.8rem] font-light uppercase tracking-[0.28em] text-ivory/85"
              >
                29 April 2025
              </m.p>

              <m.p
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { ...textTransition, delay: 1.02 }}
                className="mt-3 font-display text-[1.4rem] italic text-gold"
              >
                C&#244;te d&apos;Azur
              </m.p>

              <m.p
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { ...textTransition, delay: 1.12 }}
                className="mx-auto mt-7 max-w-[520px] font-body text-[0.88rem] font-light leading-[1.85] text-ivory/70 md:text-[0.92rem]"
              >
                We want to start the next decade of memories with you all - our close and beloved ones.
                In your presence during this trip, we will symbolically renew our vows to one
                another and mark the beginning of the next decade of love, friendship, and
                shared memories.
              </m.p>
            </div>
          </m.div>

          <m.div
            style={{ opacity: scrollCueOpacity }}
            className="mt-10 flex flex-col items-center motion-safe:transform-gpu"
          >
            <p className="font-body text-[0.85rem] font-semibold uppercase tracking-[0.24em] text-ivory/70">
              Scroll
            </p>
            <m.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }
              className="mt-3 h-14 w-[2px] bg-gold"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
