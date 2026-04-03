import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Notre Beau Voyage · Sanat & Sneha · Côte d'Azur 2025",
  description:
    "Join us on the French Riviera as we celebrate ten years together. St. Tropez to Nice, 26 April – 1 May 2025.",
  openGraph: {
    title: "Notre Beau Voyage · Sanat & Sneha · Côte d'Azur 2025",
    description:
      "Join us on the French Riviera as we celebrate ten years together. St. Tropez to Nice, 26 April – 1 May 2025.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C9876A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
