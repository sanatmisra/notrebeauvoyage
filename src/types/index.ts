export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type ItineraryDay = {
  date: string;
  location: string;
  title: string;
  description: string;
  highlights: string[];
  featured?: boolean;
};

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};
