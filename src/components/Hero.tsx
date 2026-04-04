"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

const grainOverlay =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

export default function Hero() {
  const reduceMotion = !!useReducedMotion();
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(212,168,83,0.22),transparent_30%),linear-gradient(180deg,#efe2d2_0%,#eadbc8_44%,#e2cfbc_72%,#dac4b1_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: grainOverlay }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,249,239,0.45),transparent_34%)]" />
      <div className="pointer-events-none absolute left-[-8%] top-[14%] h-64 w-64 rounded-full bg-[rgba(201,135,106,0.15)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-[22%] h-72 w-72 rounded-full bg-[rgba(212,168,83,0.14)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[10%] h-64 bg-[radial-gradient(circle,rgba(201,135,106,0.16),transparent_68%)] blur-3xl" />

      <div className="section-shell relative z-10 py-24 text-center md:py-32">
        <div className="mx-auto max-w-5xl rounded-[2.2rem] border border-[rgba(212,168,83,0.24)] bg-[linear-gradient(180deg,rgba(44,36,22,0.94),rgba(36,29,18,0.92))] px-6 py-14 text-ivory shadow-[0_28px_80px_rgba(44,36,22,0.28)] backdrop-blur-[18px] sm:px-10 md:px-16 md:py-20">
          <p
            className="mx-auto max-w-4xl font-body text-[0.8rem] font-medium uppercase leading-7 tracking-[0.24em] text-gold md:text-[0.92rem] md:leading-8"
          >
            You are warmly invited to our 10 year wedding anniversary celebration
          </p>

          <h1
            className="mt-6 font-display font-light italic leading-[0.9] text-ivory"
            style={{ fontSize: "clamp(3.9rem, 10vw, 7.2rem)" }}
          >
            Sneha &amp; Sanat
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3 text-gold">
            <span className="text-xs" aria-hidden="true">
              ◆
            </span>
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="text-xs" aria-hidden="true">
              ◆
            </span>
          </div>

          <p
            className="mt-7 font-body text-[1rem] font-medium uppercase tracking-[0.28em] text-ivory/80 md:text-[1.06rem]"
          >
            29 April 2025
          </p>

          <p
            className="mt-4 font-display text-[1.45rem] italic text-gold md:text-[1.8rem]"
          >
            C&#244;te d&apos;Azur
          </p>

          <p
            className="mx-auto mt-9 max-w-3xl text-[1.08rem] leading-8 text-ivory/78 md:text-[1.24rem] md:leading-9"
          >
            We want to start the next decade of memories with you all - our close and beloved ones.
            In your presence during this trip, we will symbolically renew our vows to one
            another and mark the beginning of the next decade of love, friendship, and
            shared memories.
          </p>
        </div>

        <m.div
          style={{ opacity: scrollCueOpacity }}
          className="mt-10 flex flex-col items-center motion-safe:transform-gpu"
        >
          <p className="font-body text-[0.85rem] font-semibold uppercase tracking-[0.24em] text-espresso/60">
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
    </section>
  );
}
