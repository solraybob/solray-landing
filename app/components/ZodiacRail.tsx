"use client";

import { useEffect, useRef } from "react";

/**
 * ZodiacRail: the page as a wheel of the year. Twelve zodiac glyphs run
 * down the right edge as scroll milestones; the signs you have passed
 * stay lit, the current one glows amber, and clicking any glyph carries
 * you to that depth of the descent. Desktop only (hidden by CSS below
 * 1100px).
 *
 * State lives in the DOM (classList), not React state, matching how
 * LifeLayer and GalaxyField drive their scroll work: one rAF-gated
 * scroll handler mutating classes directly, nothing re-renders.
 */
const SIGNS: [string, string][] = [
  ["♈", "Aries"], ["♉", "Taurus"], ["♊", "Gemini"],
  ["♋", "Cancer"], ["♌", "Leo"], ["♍", "Virgo"],
  ["♎", "Libra"], ["♏", "Scorpio"], ["♐", "Sagittarius"],
  ["♑", "Capricorn"], ["♒", "Aquarius"], ["♓", "Pisces"],
];
const SIGNS_ES: string[] = [
  "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo",
  "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis",
];

export default function ZodiacRail({ locale = "en" }: { locale?: "en" | "es" }) {
  const hostRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const glyphs = Array.from(host.querySelectorAll<HTMLElement>(".zr-glyph"));
    let raf = 0;

    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      const active = Math.min(Math.round(p * (glyphs.length - 1)), glyphs.length - 1);
      glyphs.forEach((g, i) => {
        g.classList.toggle("zr-passed", i < active);
        g.classList.toggle("zr-active", i === active);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const travel = (i: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: (i / (SIGNS.length - 1)) * max, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <aside
      className="zodiac-rail"
      aria-label={locale === "es" ? "Progreso de la página" : "Page progress"}
      ref={hostRef}
    >
      {SIGNS.map(([glyph, name], i) => {
        const label = locale === "es" ? SIGNS_ES[i] : name;
        const pct = Math.round((i / (SIGNS.length - 1)) * 100);
        return (
          <button
            key={name}
            type="button"
            className="zr-glyph"
            title={label}
            aria-label={locale === "es" ? `Ir a ${label}, ${pct}% de la página` : `Travel to ${label}, ${pct}% of the page`}
            onClick={() => travel(i)}
          >
            {`${glyph}︎`}
          </button>
        );
      })}
    </aside>
  );
}
