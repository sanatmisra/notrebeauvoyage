import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import GuestInfo from "@/components/GuestInfo";
import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Navigation from "@/components/Navigation";
import OurStory from "@/components/OurStory";
import TheJourney from "@/components/TheJourney";

import type { GalleryItem, ItineraryDay, NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Invitation", href: "#invitation" },
  { label: "Our Story", href: "#our-story" },
  { label: "The Journey", href: "#journey" },
  { label: "Guest Notes", href: "#guest-info" },
  { label: "Gallery", href: "#gallery" },
];

const itinerary: ItineraryDay[] = [
  {
    date: "26 April",
    location: "St. Tropez",
    title: "Arrival by the sea",
    description:
      "We begin in St. Tropez with a slow afternoon check-in, a harbor stroll, and sunset aperitifs as the Riviera sets the tone.",
    highlights: ["Arrival and hotel check-in", "Old Port promenade", "Golden hour dinner"],
  },
  {
    date: "27 April",
    location: "Ramatuelle & Pampelonne",
    title: "Sunlight, sand, and long lunches",
    description:
      "A relaxed day between beach clubs, village lanes, and the pale blue horizon that first made us dream about this journey.",
    highlights: ["Pampelonne beach escape", "Ramatuelle village stop", "Evening under lantern light"],
  },
  {
    date: "28 April",
    location: "Cannes",
    title: "A glamour-lined coast",
    description:
      "We drift east toward Cannes for café terraces, artful detours, and the kind of promenade that makes every step feel cinematic.",
    highlights: ["Transfer along the coast", "La Croisette walk", "Rooftop toast at dusk"],
  },
  {
    date: "29 April",
    location: "Antibes",
    title: "Our anniversary",
    description:
      "Ten years together. We mark the day in Antibes with a vow renewal moment, fresh flowers, and dinner beside the water.",
    highlights: ["Private vow renewal", "Champagne and flowers", "Anniversary dinner by the marina"],
    featured: true,
  },
  {
    date: "30 April",
    location: "Èze & Monaco",
    title: "Clifftops and candlelight",
    description:
      "The route turns dramatic: hilltop gardens, winding corniches, and an evening made for dressing up and lingering over dessert.",
    highlights: ["Morning in Èze", "Scenic drive on the corniche", "Monaco evening excursion"],
  },
  {
    date: "1 May",
    location: "Nice",
    title: "A graceful finale",
    description:
      "We close in Nice with market flowers, a final promenade on the Baie des Anges, and one last meal before goodbye.",
    highlights: ["Cours Saleya market", "Promenade des Anglais", "Farewell déjeuner"],
  },
];

const galleryItems: GalleryItem[] = [
  {
    src: "/images/riviera-arch.svg",
    alt: "A Mediterranean archway framing the Riviera coast",
    title: "Riviera Light",
    caption: "Terracotta walls, pale skies, and the first breeze off the water.",
  },
  {
    src: "/images/anniversary-bouquet.svg",
    alt: "An anniversary bouquet in warm terracotta and gold tones",
    title: "29 April",
    caption: "A floral tribute to ten years together and the vows we renew beside the sea.",
  },
  {
    src: "/images/postcard-map.svg",
    alt: "A postcard-style map tracing the French Riviera route",
    title: "From St. Tropez to Nice",
    caption: "A slow ribbon of days along the Côte d'Azur, stitched together by memory.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navigation items={navItems} />
      <Hero />
      <Invitation />
      <OurStory />
      <TheJourney days={itinerary} />
      <GuestInfo />
      <Gallery items={galleryItems} />
      <Footer />
    </main>
  );
}
