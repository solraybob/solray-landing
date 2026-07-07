import LandingRefreshES from "../components/LandingRefreshES";

// /es, Spanish (Latin American neutral) landing page.
//
// Lives parallel to the English landing at /. Same DNA, translated copy.
// English page is unchanged (LandingRefresh.tsx is left bit-identical),
// so any regression to the English flow is impossible from this commit.
//
// To add another language later: create app/{locale}/page.tsx that
// imports a similar parallel component, e.g. LandingRefreshPT for
// Portuguese. The pattern is intentionally simple at this stage so
// each translation owns its own tone and visual cadence rather than
// being forced through a generic copy object.

export const metadata = {
  title: "Solray, Vivir por diseño",
  description: "Tu mapa cósmico personal. Astrología, Diseño Humano y Gene Keys, calculados juntos contra tu carta natal. Tres días gratis.",
  alternates: {
    canonical: "https://solray.ai/es",
    languages: {
      "en": "https://solray.ai",
      "es": "https://solray.ai/es",
      "x-default": "https://solray.ai",
    },
  },
};

export default function HomeES() {
  return <LandingRefreshES />;
}
