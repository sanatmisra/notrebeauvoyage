import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import "./globals.css";

const BASE_URL = "https://www.notrebeauvoyage.com";

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
  metadataBase: new URL(BASE_URL),
  title: "Notre Beau Voyage · Sneha & Sanat · Côte d'Azur 2025",
  description:
    "Join us on the French Riviera as we celebrate ten years together. St. Tropez to Nice, 25 April – 2 May 2025.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3CclipPath id='c'%3E%3Ccircle cx='32' cy='32' r='30'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23c)'%3E%3Crect x='2' y='2' width='20' height='60' fill='%230055A4'/%3E%3Crect x='22' y='2' width='20' height='60' fill='%23FFFFFF'/%3E%3Crect x='42' y='2' width='20' height='60' fill='%23EF4135'/%3E%3C/g%3E%3Ccircle cx='32' cy='32' r='30' fill='none' stroke='rgba(44,36,22,0.28)' stroke-width='2'/%3E%3C/svg%3E",
      },
    ],
  },
  openGraph: {
    title: "Sneha & Sanat · 10 Year Anniversary",
    description:
      "You are warmly invited to celebrate our vow renewal on the Côte d'Azur. April 2025 · Notre Beau Voyage",
    url: BASE_URL,
    siteName: "Notre Beau Voyage",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sneha & Sanat · Notre Beau Voyage · Côte d'Azur 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneha & Sanat · 10 Year Anniversary",
    description:
      "You are warmly invited to celebrate our vow renewal on the Côte d'Azur. April 2025 · Notre Beau Voyage",
    images: ["/opengraph-image"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.style.setProperty('--animation-play-state','paused');window.addEventListener('DOMContentLoaded',function(){document.documentElement.style.setProperty('--animation-play-state','running');});})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
