import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Cormorant_Garamond, Jost } from "next/font/google";

import "./globals.css";

const AmbientLight = dynamic(() => import("@/components/AmbientLight"), {
  ssr: false,
});

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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%232C2416'/%3E%3Ctext x='32' y='39' text-anchor='middle' font-size='26' fill='%23D4A853'%3E%E2%97%86%3C/text%3E%3C/svg%3E",
      },
    ],
  },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AmbientLight />
        {children}
      </body>
    </html>
  );
}
