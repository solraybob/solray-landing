import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LifeLayer from "./components/LifeLayer";

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
  title: "Solray. Know Yourself at a Soul Level",
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
  metadataBase: new URL("https://solray.ai"),
  openGraph: {
    title: "Solray. Your Higher Self, Calculated.",
    description:
      "A spiritual companion powered by live astrology, Human Design, and Gene Keys. Your chart. Your reading. Every day.",
    type: "website",
    url: "https://solray.ai",
    siteName: "Solray",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Solray. You were born under a specific sky. It is still speaking.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solray. Your Higher Self, Calculated.",
    description:
      "Live astrology, Human Design, and Gene Keys, read together against your exact birth moment. Every morning.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://solray.ai",
    languages: {
      "en": "https://solray.ai",
      "es": "https://solray.ai/es",
      "x-default": "https://solray.ai",
    },
  },
};

// Kill the white flash on load: color-scheme dark makes the browser's very
// first paint (before any CSS arrives) a dark canvas instead of white, and
// theme-color darkens the surrounding browser chrome to match.
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050f08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Solray",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: "https://solray.ai",
    description:
      "Western astrology, Human Design, and Gene Keys calculated together against your exact birth moment. A daily reading and an Oracle that remembers you.",
    offers: {
      "@type": "Offer",
      price: "23.00",
      priceCurrency: "USD",
      description: "Three days free, then $23 per month. One tier, everything included.",
    },
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      style={{ backgroundColor: "#050f08" }}
    >
      <body>
        {/* Pre-paint guard against the hydration flash: without this, the
            plain server-rendered hero paints first, then LifeLayer hides it
            and replays the entrance, a visible old-page/new-page swap. This
            parser-blocking inline script runs BEFORE the hero paints, hiding
            the hero from the very first frame for motion-enabled visitors.
            LifeLayer removes the class when its cascade takes over, and the
            script's own timeout reverts to the still page if LifeLayer never
            arrives, so nothing can stay hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('alive-pre');setTimeout(function(){d.classList.remove('alive-pre')},3000);}}catch(e){}",
          }}
        />
        <LifeLayer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
