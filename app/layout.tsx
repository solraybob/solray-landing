import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solray AI. Know Yourself at a Soul Level",
  description:
    "The world's most personalised spiritual companion. Powered by live astrology engines, Human Design, and Gene Keys, speaking directly to your specific chart, every single day.",
  keywords: [
    "astrology",
    "human design",
    "gene keys",
    "spiritual AI",
    "birth chart",
    "personalised horoscope",
  ],
  openGraph: {
    title: "Solray AI. Your Higher Self, Calculated.",
    description:
      "A spiritual companion powered by live astrology, Human Design, and Gene Keys. Your chart. Your reading. Every day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
