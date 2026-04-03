"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import ImageCard from "@/components/ImageCard";
import {
  getFadeUp,
  getScaleUp,
  getStaggerContainer,
  viewport,
} from "@/lib/animations";

type Chapter = {
  day: string;
  date: string;
  location: string;
  country: string;
  tagline: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  isSpecial?: boolean;
  specialLabel?: string;
};

type TheJourneyProps = {
  days?: never;
};

const chapters: Chapter[] = [
  {
    day: "Day 01",
    date: "25 April",
    location: "Bern",
    country: "Switzerland",
    tagline: "Where the journey begins",
    description:
      "We leave our homes — Sanat from Munich, our friends from Frankfurt — and meet for the first time in Bern. The old city with its arcaded streets and the Aare river below is the perfect place to begin. A quick lunch, a walk, and then we point the cars south.",
    highlights: [
      "Meeting point for the whole group",
      "Old City of Bern — UNESCO World Heritage",
      "Lunch at the Zytglogge",
    ],
    imageSrc: "/images/trip/bern.jpg",
    imageAlt: "Bern old city arcades Switzerland",
  },
  {
    day: "Day 01 · continued",
    date: "25 April · Evening",
    location: "Annecy",
    country: "France",
    tagline: "The Venice of the Alps",
    description:
      "We cross into France as the afternoon light turns gold and arrive in Annecy by evening. The old town, the canals, the lake — it is almost unreasonably beautiful. Our first night together, our first French dinner.",
    highlights: [
      "Overnight stop in Annecy",
      "Canal-side dinner in the Vieille Ville",
      "Lac d'Annecy at dusk",
    ],
    imageSrc: "/images/trip/annecy.jpg",
    imageAlt: "Annecy canal old town France",
  },
  {
    day: "Day 02",
    date: "26 April",
    location: "Roquebrune-sur-Argens",
    country: "Provence, France",
    tagline: "Our home for the week",
    description:
      "We drive south through Provence, the landscape shifting from alpine to Mediterranean. By afternoon we arrive at our villa — our base for the next five nights. The garden, the pool, the Provençal air. We are not in a hurry any more.",
    highlights: [
      "Villa arrival — our home for five nights",
      "First evening around the table together",
      "Roquebrune village exploration",
    ],
    imageSrc: "/images/trip/villa.jpeg",
    imageAlt: "Our villa in Roquebrune-sur-Argens Provence",
  },
  {
    day: "Day 03",
    date: "27 April",
    location: "Nice & Monaco",
    country: "Côte d'Azur",
    tagline: "The glamour of the coast",
    description:
      "Our first day trip to the Riviera. Nice in the morning — the Cours Saleya flower market, the old port, the Promenade des Anglais. Then east along the Grande Corniche to Monaco, because some experiences need to be had at least once.",
    highlights: [
      "Cours Saleya flower market, Nice",
      "Promenade des Anglais",
      "Monaco — the harbour, the casino square",
    ],
    imageSrc: "/images/trip/nice-monaco.jpg",
    imageAlt: "Nice Promenade des Anglais and Monaco harbour",
  },
  {
    day: "Day 04",
    date: "28 April",
    location: "Saint-Tropez",
    country: "Côte d'Azur",
    tagline: "The port, the market, the light",
    description:
      "West along the coast to Saint-Tropez. The morning market at Place des Lices, the old port with its painted boats, Pampelonne Beach in the afternoon. This is what the Riviera has always been about — slow time in beautiful places.",
    highlights: [
      "Marché de la Place des Lices",
      "Port Saint-Tropez",
      "Plage de Pampelonne",
    ],
    imageSrc: "/images/trip/st-tropez.jpg",
    imageAlt: "Saint-Tropez port and Place des Lices market",
  },
  {
    day: "Day 05",
    date: "29 April",
    location: "Roquebrune-sur-Argens",
    country: "Provence, France",
    tagline: "Ten years. Again, yes.",
    description:
      "We do not go anywhere today. Today, the villa is the whole world. A private ceremony in the garden, the people we love most gathered around us, champagne in the afternoon light. Ten years ago we said yes. Today, we mean it even more.",
    highlights: [
      "Private vow renewal ceremony",
      "Champagne celebration in the garden",
      "Gala dinner under the Provençal sky",
    ],
    imageSrc: "/images/trip/villa.jpeg",
    imageAlt: "Vow renewal at the villa Roquebrune",
    isSpecial: true,
    specialLabel: "Our Anniversary  ◆",
  },
  {
    day: "Day 06",
    date: "30 April",
    location: "The Villa",
    country: "Provence, France",
    tagline: "Nowhere to be",
    description:
      "After the celebration, a day of pure rest. The pool, a long lazy lunch, an afternoon nap, an evening walk through the village. This is what we came for — time that moves slowly and belongs entirely to us.",
    highlights: [
      "Rest and relaxation at the villa",
      "Roquebrune village walk",
      "Last evening together as a group",
    ],
    imageSrc: "/images/trip/villa.jpeg",
    imageAlt: "Relaxing at the villa in Provence",
  },
  {
    day: "Day 07",
    date: "1 May",
    location: "Lausanne",
    country: "Switzerland",
    tagline: "The road north begins",
    description:
      "We check out of the villa and begin the journey home — but not in a rush. We drive north through the Alps and stop for the night in Lausanne, above Lac Léman. One last dinner together, the lake below us, the mountains ahead.",
    highlights: [
      "Departure from Roquebrune villa",
      "Lausanne — overnight stop",
      "Dinner above Lac Léman",
    ],
    imageSrc: "/images/trip/lausanne.jpg",
    imageAlt: "Lausanne above Lake Geneva Switzerland",
  },
  {
    day: "Day 08",
    date: "2 May",
    location: "Bern",
    country: "Switzerland",
    tagline: "Until next time",
    description:
      "We drive from Lausanne to Bern for one last stop — a coffee, an embrace, and then we part ways. Sanat heads south-east to Munich. Our friends head north to Frankfurt. The cars drive away in different directions, full of the same memories.",
    highlights: [
      "Final group stop in Bern",
      "Farewell coffee at the Zytglogge",
      "The drive home — full of good memories",
    ],
    imageSrc: "/images/trip/bern-farewell.jpg",
    imageAlt: "Bern Switzerland farewell stop",
  },
];

function ChapterPanel({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const reduceMotion = !!useReducedMotion();
  const panelRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(panelRef, { margin: "-20% 0px -20% 0px" });
  const fadeUp = useMemo(() => getFadeUp(reduceMotion), [reduceMotion]);
  const stagger = useMemo(() => getStaggerContainer(reduceMotion), [reduceMotion]);
  const scaleUp = useMemo(() => getScaleUp(reduceMotion), [reduceMotion]);
  const [showHint, setShowHint] = useState(index === 0);
  const isEven = index % 2 === 1;

  useEffect(() => {
    if (index !== 0) {
      return;
    }

    const timeout = window.setTimeout(() => setShowHint(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [index]);

  return (
    <section
      ref={panelRef}
      className="relative min-h-auto md:min-h-[100dvh]"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className={`grid min-h-[100dvh] md:grid-cols-5 ${isEven ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}
      >
        <div className="relative md:col-span-3">
          <div className="absolute right-4 top-4 z-10 font-body text-[0.65rem] font-light uppercase tracking-[0.22em] text-gold md:hidden">
            {`${String(index + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`}
          </div>

          <motion.div
            variants={scaleUp}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 6, ease: "easeOut" }}
            className="relative h-full min-h-[42vh] md:min-h-[100dvh]"
          >
            <ImageCard
              src={chapter.imageSrc}
              alt={chapter.imageAlt}
              width={1600}
              height={1200}
              sizes="(max-width: 767px) 100vw, 60vw"
              className="relative h-full"
              imageClassName="h-full min-h-[42vh] w-full object-cover md:min-h-[100dvh]"
            />
            <div
              className={`absolute inset-0 ${
                isEven
                  ? "bg-gradient-to-b from-transparent via-transparent to-espresso md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-espresso"
                  : "bg-gradient-to-b from-transparent via-transparent to-espresso md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-espresso"
              }`}
            />
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={`relative flex flex-col justify-center bg-espresso px-5 py-10 md:col-span-2 md:px-16 md:py-20 ${
            chapter.isSpecial
              ? "before:absolute before:inset-6 before:border before:border-gold/40 before:content-['']"
              : ""
          }`}
          data-cursor-target
        >
          {chapter.isSpecial ? (
            <>
              {Array.from({ length: 6 }).map((_, dotIndex) => (
                <motion.span
                  key={dotIndex}
                  aria-hidden="true"
                  className="absolute h-1 w-1 rounded-full bg-gold/30"
                  style={{
                    top: `${16 + dotIndex * 11}%`,
                    left: `${12 + (dotIndex % 3) * 22}%`,
                  }}
                  animate={reduceMotion ? undefined : { y: [-10, 10, -10] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 4 + dotIndex * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: dotIndex * 0.15,
                        }
                  }
                />
              ))}
            </>
          ) : null}

          <motion.p
            variants={fadeUp}
            className="relative z-10 font-body text-[0.65rem] font-light uppercase tracking-[0.25em] text-gold"
          >
            {chapter.day}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="relative z-10 mt-3 font-body text-[0.72rem] font-light uppercase tracking-[0.2em] text-linen/40"
          >
            {chapter.date}
          </motion.p>
          {chapter.specialLabel ? (
            <motion.p
              variants={fadeUp}
              className="relative z-10 mt-5 font-display text-base italic tracking-[0.15em] text-gold"
            >
              {chapter.specialLabel}
            </motion.p>
          ) : null}
          <motion.h3
            variants={fadeUp}
            className="relative z-10 mt-4 font-display text-[clamp(2rem,8vw,2.8rem)] font-light leading-none text-linen md:text-[clamp(2.2rem,4vw,3.5rem)]"
          >
            {chapter.location}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="relative z-10 mt-3 font-body text-[0.72rem] font-light uppercase tracking-[0.18em] text-terracotta"
          >
            {chapter.country}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="relative z-10 mt-4 font-display text-[1.1rem] italic text-gold"
          >
            {chapter.tagline}
          </motion.p>
          <motion.div variants={fadeUp} className="relative z-10 my-5 h-px w-8 bg-gold" />
          <motion.p
            variants={fadeUp}
            className={`relative z-10 text-[0.88rem] font-light leading-[1.9] ${
              chapter.isSpecial ? "text-linen/85" : "text-linen/65"
            }`}
          >
            {chapter.description}
          </motion.p>
          <motion.ul variants={stagger} className="relative z-10 mt-6 space-y-3">
            {chapter.highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={fadeUp}
                className="flex items-start gap-3 text-[0.78rem] font-light leading-6 text-linen/50"
              >
                <span className="mt-0.5 text-gold">—</span>
                <span>{highlight}</span>
              </motion.li>
            ))}
          </motion.ul>

          {index === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: showHint ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 font-body text-[0.72rem] font-light uppercase tracking-[0.18em] text-linen/35 md:hidden"
            >
              Swipe or scroll to continue
            </motion.p>
          ) : null}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute left-[5%] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <motion.span
          className="relative block h-2.5 w-2.5 rounded-full bg-gold"
          animate={isInView && !reduceMotion ? { scale: [1, 1.12, 1] } : undefined}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <motion.span
            className="absolute inset-[-8px] rounded-full border border-gold/35"
            animate={isInView && !reduceMotion ? { scale: [0.9, 1.5, 0.9], opacity: [0.45, 0.1, 0.45] } : undefined}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.span>
      </div>
    </section>
  );
}

export default function TheJourney({}: TheJourneyProps) {
  const reduceMotion = !!useReducedMotion();
  const fadeUp = useMemo(() => getFadeUp(reduceMotion), [reduceMotion]);

  return (
    <section id="the-journey" className="relative bg-espresso py-24 md:py-32">
      <div className="pointer-events-none absolute bottom-0 left-[5%] top-0 hidden w-[2px] -translate-x-1/2 bg-gold/35 md:block" />

      <div className="section-shell mb-16 text-center md:mb-20">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="font-body text-[0.7rem] font-light uppercase tracking-[0.25em] text-gold"
        >
          25 April – 2 May 2025
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-5 font-display text-[clamp(3rem,6vw,5rem)] font-light text-linen"
        >
          The Journey
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mx-auto mt-5 max-w-5xl font-body text-[0.78rem] font-light tracking-[0.12em] text-linen/40"
        >
          Munich &amp; Frankfurt &nbsp; → &nbsp; Bern &nbsp; → &nbsp; Annecy
          &nbsp; → &nbsp; Provence &nbsp; → &nbsp; Riviera &nbsp; → &nbsp;
          Lausanne &nbsp; → &nbsp; Bern
        </motion.p>
      </div>

      <div>
        {chapters.map((chapter, index) => (
          <div key={`${chapter.day}-${chapter.location}`}>
            <ChapterPanel chapter={chapter} index={index} />
            {index < chapters.length - 1 ? (
              <div className="flex justify-center bg-espresso py-5 text-[0.6rem] tracking-[0.5em] text-gold/30">
                · · · · ·
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="section-shell px-8 py-20 text-center">
        <p className="font-display text-[1.4rem] font-light italic text-linen/50">
          And so the journey ends — until the next one.
        </p>
        <p className="mt-4 text-gold">◆</p>
      </div>
    </section>
  );
}
