"use client";

import { m } from "framer-motion";

import ImageCard from "@/components/ImageCard";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

type Chapter = {
  day: string;
  shortDay: string;
  dayNumber: string;
  date: string;
  location: string;
  country: string;
  tagline: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  links?: { label: string; note?: string; copyValue?: string; href?: string }[];
  isSpecial?: boolean;
  specialLabel?: string;
};

type TheJourneyProps = {
  days?: never;
};

const chapters: Chapter[] = [
  {
    day: "Day 01",
    shortDay: "Fri",
    dayNumber: "25",
    date: "25 April",
    location: "Bern",
    country: "Switzerland",
    tagline: "Where the journey begins",
    description:
      "We meet in Bern city center for lunch before starting the drive south together.",
    highlights: ["Bern city center lunch", "Parking nearby", "Restaurant details coming soon"],
    imageSrc: "/images/trip/bern.jpg",
    imageAlt: "Bern old town and the Aare river in Switzerland",
    links: [
      {
        label: "Parking",
        note: "Kochergasse 1, 3011 Bern, Switzerland",
        copyValue: "Kochergasse 1, 3011 Bern, Switzerland",
        href: "https://maps.app.goo.gl/6uF9LTbXEYPFh6tq8",
      },
      {
        label: "Restaurant",
        note: "To be shared soon",
      },
    ],
  },
  {
    day: "Day 01 · Evening",
    shortDay: "Fri",
    dayNumber: "25",
    date: "25 April · Evening",
    location: "Annecy",
    country: "France",
    tagline: "The Venice of the Alps",
    description:
      "By evening we reach Annecy for canals, lake light, and our first French dinner together.",
    highlights: ["Overnight stop", "Canal-side dinner", "Lac d'Annecy at dusk"],
    imageSrc: "/images/trip/annecy.jpg",
    imageAlt: "Annecy old town canal and lake in France",
    links: [
      {
        label: "Stay",
        note: "16, rue du Champ de la Taillee, 74600 Annecy, France",
        href: "https://www.booking.com/Share-V4sOGr",
      },
    ],
  },
  {
    day: "Day 02",
    shortDay: "Sat",
    dayNumber: "26",
    date: "26 April",
    location: "Roquebrune-sur-Argens",
    country: "Provence, France",
    tagline: "The road to the villa",
    description:
      "This day is spent on the road from Annecy to our villa in Roquebrune-sur-Argens, arriving in Provence by evening.",
    highlights: ["Drive from Annecy", "Villa arrival", "Check-in and settle in"],
    imageSrc: "/images/trip/villa.jpeg",
    imageAlt: "Villa in Roquebrune-sur-Argens, Provence",
    links: [
      {
        label: "Villa details",
        note: "Address and check-in details",
        href: "https://www.airbnb.com/trips/shared/3db89ab8-14da-447e-b328-aaf30e58fd38?confCode=HMJKJ34CWQ&principal_token=006e4da2-556c-4a6f-9ae1-91e85bc3beb4&s=67&unique_share_id=6e361074-cbdd-4c7d-848e-974542e195fd",
      },
    ],
  },
  {
    day: "Day 03",
    shortDay: "Sun",
    dayNumber: "27",
    date: "27 April",
    location: "Nice & Monaco",
    country: "Cote d'Azur",
    tagline: "The glamour of the coast",
    description:
      "We start the day by driving to Monaco and spending an hour or so there, then continue to Eze for lunch before heading to Nice for the rest of the day.",
    highlights: [
      "Morning in Monaco",
      "Lunch in Eze",
      "Afternoon and evening in Nice",
    ],
    imageSrc: "/images/trip/nice-monaco.jpg",
    imageAlt: "French Riviera coastline around Nice and Monaco",
    links: [
      {
        label: "Parking Monaco",
        href: "https://maps.app.goo.gl/4bo1uCaqbViqNFaH6",
      },
      {
        label: "Parking Eze",
        href: "https://maps.app.goo.gl/4hiX8hu85isr2Qnd9",
      },
      {
        label: "Parking Nice",
        href: "https://maps.app.goo.gl/T4XTN87FkvGfQocm7",
      },
    ],
  },
  {
    day: "Day 04",
    shortDay: "Mon",
    dayNumber: "28",
    date: "28 April",
    location: "Saint-Tropez",
    country: "Cote d'Azur",
    tagline: "The port, the market, the light",
    description:
      "The plan is to casually explore St Tropez without any time pressure, then head to a beach before returning home for the evening Indian themed dinner.",
    highlights: [
      "Slow day in St Tropez",
      "Beach stop at Plage de Cavaliere",
      "Back home for the Indian themed dinner",
    ],
    imageSrc: "/images/trip/st-tropez.jpg",
    imageAlt: "Saint-Tropez harbour on the French Riviera",
    links: [
      {
        label: "Parking St Tropez",
        href: "https://maps.app.goo.gl/oeCiZ5fRx5qaHuFo7",
      },
      {
        label: "Beach",
        note: "Plage de Cavaliere",
        href: "https://maps.app.goo.gl/j5ihyD7gBU2oR9CD8",
      },
    ],
  },
  {
    day: "Day 04 · Evening",
    shortDay: "Mon",
    dayNumber: "28",
    date: "28 April · 7:00 PM",
    location: "Indian Evening",
    country: "Roquebrune-sur-Argens",
    tagline: "A vibrant night back at the villa",
    description:
      "After a long day spent outdoors in St Tropez, we come back home, dress up, enjoy some finger foods, and have a good time together for our Indian themed evening starting at 7 PM.",
    highlights: ["Starts at 7 PM", "Finger foods and drinks", "Dress up and unwind together"],
    imageSrc: "/images/dress-code-indian-evening.jpg",
    imageAlt: "Indian evening dress code inspiration",
    isSpecial: true,
    specialLabel: "Evening Event",
  },
  {
    day: "Day 05",
    shortDay: "Tue",
    dayNumber: "29",
    date: "29 April",
    location: "The Main Event",
    country: "Provence, France",
    tagline: "Ten years. Again, yes.",
    description:
      "We spend the morning decorating the villa, then gather at 12 PM to take our vows again in front of you all. After that, the rest of the day is for relaxing at the villa, enjoying good food, music, and good vibes together. Dress code: Riviera Chic in soft summer pastels.",
    highlights: [
      "Morning villa setup",
      "Vow renewal at 12 PM",
      "Relaxed afternoon at the villa",
      "Good food, music, and good vibes",
    ],
    imageSrc: "/images/dress-code-main-event.png",
    imageAlt: "Main event dress code inspiration",
    isSpecial: true,
    specialLabel: "Our Anniversary",
    links: [
      {
        label: "Palette",
        note: "Light blue, sage, blush, lavender, soft grey",
      },
      {
        label: "Ladies",
        note: "Flowing dresses in soft tones",
      },
      {
        label: "Gentlemen",
        note: "Light suits or linen, no tie required",
      },
      {
        label: "Please avoid",
        note: "Totally white and dark colors",
      },
    ],
  },
  {
    day: "Day 06",
    shortDay: "Wed",
    dayNumber: "30",
    date: "30 April",
    location: "The Villa",
    country: "Provence, France",
    tagline: "Nowhere to be",
    description:
      "A quiet recovery day of pool time, a long lunch, and one last slow evening together.",
    highlights: ["Pool and rest", "Long lunch", "Last group evening"],
    imageSrc: "/images/trip/villa.jpeg",
    imageAlt: "Roquebrune-sur-Argens villa in Provence",
  },
  {
    day: "Day 07",
    shortDay: "Thu",
    dayNumber: "1",
    date: "1 May",
    location: "Lausanne",
    country: "Switzerland",
    tagline: "The road north begins",
    description:
      "We drive north through the Alps and stop above Lac Leman for one last overnight together.",
    highlights: ["Departure from Provence", "Lake-side overnight stop", "Final dinner together"],
    imageSrc: "/images/trip/lausanne.jpg",
    imageAlt: "Lausanne above Lake Geneva in Switzerland",
    links: [
      {
        label: "Stay",
        note: "En Bellevue, 1163 Etoy, Switzerland",
        href: "https://www.booking.com/Share-MOCew6X",
      },
    ],
  },
  {
    day: "Day 08",
    shortDay: "Fri",
    dayNumber: "2",
    date: "2 May",
    location: "Bern",
    country: "Switzerland",
    tagline: "Until next time",
    description:
      "One final stop for coffee and hugs in Bern before the cars part in different directions.",
    highlights: ["Farewell coffee", "Final group stop", "Drive home with full hearts"],
    imageSrc: "/images/trip/bern-farewell.jpg",
    imageAlt: "Bern old town farewell stop in Switzerland",
  },
];

function JourneyCard({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Keep the UI stable if clipboard access is blocked.
    }
  };

  return (
    <m.article
      variants={fadeUp}
      className={`relative grid gap-5 overflow-hidden rounded-[2rem] border border-espresso/10 bg-white/85 p-4 shadow-[0_20px_60px_rgba(44,36,22,0.08)] backdrop-blur motion-safe:transform-gpu md:grid-cols-[88px_minmax(0,260px)_1fr] md:gap-6 md:p-5 ${
        chapter.isSpecial
          ? "border-terracotta/25 bg-[linear-gradient(135deg,rgba(201,135,106,0.17),rgba(212,168,83,0.14),rgba(255,255,255,0.92))] ring-1 ring-terracotta/30 shadow-[0_28px_80px_rgba(201,135,106,0.18)]"
          : ""
      }`}
    >
      <div className="hidden md:flex md:flex-col md:items-center">
        <div
          className={`flex h-[88px] w-[88px] flex-col items-center justify-center rounded-[1.6rem] text-center shadow-inner ${
            chapter.isSpecial
              ? "bg-terracotta text-white"
              : "bg-linen"
          }`}
        >
          <span
            className={`font-body text-[0.68rem] uppercase tracking-[0.22em] ${
              chapter.isSpecial ? "text-white/75" : "text-espresso/50"
            }`}
          >
            {chapter.shortDay}
          </span>
          <span
            className={`mt-1 font-display text-[2rem] leading-none ${
              chapter.isSpecial ? "text-white" : "text-espresso"
            }`}
          >
            {chapter.dayNumber}
          </span>
        </div>
        {index < chapters.length - 1 ? (
          <div className="mt-3 h-full w-px bg-gradient-to-b from-terracotta/30 to-transparent" />
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div
          className={`absolute left-3 top-3 z-10 inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] shadow-sm ${
            chapter.isSpecial
              ? "bg-terracotta text-white"
              : "bg-white/90 text-espresso"
          }`}
        >
          {chapter.day}
        </div>
        <ImageCard
          src={chapter.imageSrc}
          alt={chapter.imageAlt}
          width={1600}
          height={1200}
          sizes="(max-width: 767px) 100vw, 260px"
          className="relative aspect-[4/3] h-full min-h-[220px] w-full"
          imageClassName="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.22em] text-terracotta">
              {chapter.date}
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-espresso/20 md:block" />
            <p className="text-sm text-espresso/55">{chapter.country}</p>
            {chapter.specialLabel ? (
              <span className="rounded-full bg-terracotta px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">
                {chapter.specialLabel}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 font-display text-[1.9rem] leading-none text-espresso md:text-[2.25rem]">
            {chapter.location}
          </h3>
          <p className="mt-3 font-display text-lg italic text-terracotta">
            {chapter.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-espresso/72">
            {chapter.description}
          </p>
          {chapter.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {chapter.links.map((link) =>
                link.copyValue ? (
                  <a
                    key={link.label}
                    onClick={() => handleCopy(link.copyValue!)}
                    href={link.href}
                    target={link.href ? "_blank" : undefined}
                    rel={link.href ? "noreferrer" : undefined}
                    className="inline-flex items-center rounded-full border border-terracotta/25 bg-terracotta/8 px-4 py-2 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta hover:text-white"
                  >
                    {link.label}
                    {link.note ? ` · ${link.note}` : ""}
                  </a>
                ) : link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-terracotta/25 bg-terracotta/8 px-4 py-2 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta hover:text-white"
                  >
                    {link.label}
                    {link.note ? ` · ${link.note}` : ""}
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="inline-flex items-center rounded-full border border-espresso/10 bg-linen/75 px-4 py-2 text-sm text-espresso/60"
                  >
                    {link.label}
                    {link.note ? ` · ${link.note}` : ""}
                  </span>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </m.article>
  );
}

export default function TheJourney({}: TheJourneyProps) {
  return (
    <section
      id="the-journey"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(212,168,83,0.18),transparent_24%),linear-gradient(180deg,#f7f0e6_0%,#f4ecdf_52%,#efe4d5_100%)] py-24 md:py-32"
    >
      <div className="section-shell">
        <m.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center motion-safe:transform-gpu"
        >
          <p className="section-label justify-center">Trip Flow</p>
          <h2 className="section-title text-espresso">The Journey</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-7 text-espresso/70">
            A tighter itinerary view for every stop, from the first meetup in Bern
            to the final farewell on the way home.
          </p>
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-espresso/10 bg-white/70 px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-espresso/60 shadow-[0_12px_30px_rgba(44,36,22,0.06)]">
            <span>25 Apr</span>
            <span>Bern</span>
            <span>Annecy</span>
            <span>Provence</span>
            <span>Riviera</span>
            <span>Lausanne</span>
            <span>2 May</span>
          </div>
        </m.div>

        <m.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="mt-14 grid gap-6 motion-safe:transform-gpu md:mt-16"
        >
          {chapters.map((chapter, index) => (
            <JourneyCard
              key={`${chapter.day}-${chapter.location}-${chapter.date}`}
              chapter={chapter}
              index={index}
            />
          ))}
        </m.div>

        <m.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-16 text-center motion-safe:transform-gpu"
        >
          <p className="font-display text-[1.35rem] italic text-espresso/56">
            And so the journey ends, until the next one.
          </p>
        </m.div>
      </div>
    </section>
  );
}
