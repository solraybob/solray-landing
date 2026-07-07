"use client";

import { useEffect, useRef } from "react";

/**
 * ConstellationChapters: the descent has chapters, and each chapter has a
 * constellation. Six zodiac asterisms live at the page's edges; as you
 * scroll into a chapter its stars kindle and the lines draw themselves,
 * then it dissolves as you pass. Sequenced with the zodiac rail so the
 * page reads as one wheel of the year.
 *
 * Pure DOM + one rAF-gated scroll handler. Lines use pathLength=1 with a
 * dashoffset that retreats as the chapter progresses. Fixed layer behind
 * all content, pointer-events none, hidden on small screens by CSS.
 */

type Constellation = {
  name: string;
  band: [number, number];        // scroll progress window
  at: { left?: string; right?: string; top: string };
  size: number;                  // px box (width; height = size * 1.1)
  lines: number[][][];           // polylines of [x, y] in 0..1 space
  stars: number[][];             // [x, y, r]
};

const CONSTELLATIONS: Constellation[] = [
  {
    name: "Aries",
    band: [0.03, 0.15],
    at: { right: "7vw", top: "24vh" },
    size: 210,
    lines: [[[0.08, 0.78], [0.42, 0.52], [0.74, 0.34], [0.9, 0.12]]],
    stars: [[0.08, 0.78, 2.6], [0.42, 0.52, 1.8], [0.74, 0.34, 2.2], [0.9, 0.12, 1.5]],
  },
  {
    name: "Gemini",
    band: [0.17, 0.3],
    at: { right: "6vw", top: "30vh" },
    size: 230,
    lines: [
      [[0.26, 0.08], [0.32, 0.34], [0.28, 0.6], [0.36, 0.88]],
      [[0.72, 0.06], [0.66, 0.32], [0.7, 0.58], [0.6, 0.86]],
      [[0.32, 0.34], [0.66, 0.32]],
    ],
    stars: [
      [0.26, 0.08, 2.4], [0.72, 0.06, 2.4], [0.32, 0.34, 1.6], [0.66, 0.32, 1.6],
      [0.28, 0.6, 1.5], [0.7, 0.58, 1.5], [0.36, 0.88, 2.0], [0.6, 0.86, 2.0],
    ],
  },
  {
    name: "Leo",
    band: [0.32, 0.45],
    at: { left: "5vw", top: "26vh" },
    size: 250,
    lines: [
      [[0.62, 0.16], [0.46, 0.08], [0.32, 0.16], [0.3, 0.32], [0.42, 0.42], [0.58, 0.4]],
      [[0.58, 0.4], [0.86, 0.52], [0.72, 0.78], [0.42, 0.42]],
    ],
    stars: [
      [0.62, 0.16, 1.6], [0.46, 0.08, 1.8], [0.32, 0.16, 1.5], [0.3, 0.32, 1.7],
      [0.42, 0.42, 2.6], [0.58, 0.4, 1.6], [0.86, 0.52, 1.8], [0.72, 0.78, 2.2],
    ],
  },
  {
    name: "Libra",
    band: [0.47, 0.58],
    at: { left: "6vw", top: "30vh" },
    size: 210,
    lines: [
      [[0.5, 0.14], [0.24, 0.46]],
      [[0.5, 0.14], [0.76, 0.4]],
      [[0.24, 0.46], [0.76, 0.4]],
      [[0.24, 0.46], [0.18, 0.82]],
      [[0.76, 0.4], [0.7, 0.78]],
    ],
    stars: [
      [0.5, 0.14, 2.2], [0.24, 0.46, 2.0], [0.76, 0.4, 2.0], [0.18, 0.82, 1.5], [0.7, 0.78, 1.5],
    ],
  },
  {
    name: "Sagittarius",
    band: [0.6, 0.72],
    at: { right: "6vw", top: "28vh" },
    size: 240,
    lines: [
      [[0.3, 0.5], [0.5, 0.4], [0.66, 0.5], [0.56, 0.72], [0.34, 0.68], [0.3, 0.5]],
      [[0.3, 0.5], [0.14, 0.34]],
      [[0.66, 0.5], [0.82, 0.4]],
      [[0.5, 0.4], [0.47, 0.22]],
    ],
    stars: [
      [0.3, 0.5, 1.8], [0.5, 0.4, 1.6], [0.66, 0.5, 1.8], [0.56, 0.72, 1.6],
      [0.34, 0.68, 1.5], [0.14, 0.34, 2.2], [0.82, 0.4, 1.8], [0.47, 0.22, 1.5],
    ],
  },
  {
    name: "Aquarius",
    band: [0.74, 0.88],
    at: { left: "6vw", top: "26vh" },
    size: 240,
    lines: [
      [[0.14, 0.34], [0.3, 0.44], [0.46, 0.34], [0.62, 0.44], [0.78, 0.34]],
      [[0.2, 0.6], [0.36, 0.7], [0.52, 0.6], [0.68, 0.7], [0.84, 0.6]],
      [[0.46, 0.12], [0.46, 0.34]],
    ],
    stars: [
      [0.14, 0.34, 1.8], [0.46, 0.34, 2.0], [0.78, 0.34, 1.8],
      [0.2, 0.6, 1.5], [0.52, 0.6, 1.6], [0.84, 0.6, 1.5], [0.46, 0.12, 2.2],
    ],
  },
];

const NAMES_ES: Record<string, string> = {
  Aries: "Aries", Gemini: "Géminis", Leo: "Leo",
  Libra: "Libra", Sagittarius: "Sagitario", Aquarius: "Acuario",
};

export default function ConstellationChapters({ locale = "en" }: { locale?: "en" | "es" }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const groups = Array.from(host.querySelectorAll<HTMLElement>(".constellation"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      const smooth = (t: number) => {
        const k = Math.min(Math.max(t, 0), 1);
        return k * k * (3 - 2 * k); // smoothstep
      };
      groups.forEach((g, gi) => {
        const [a, b] = CONSTELLATIONS[gi].band;
        const local = (p - a) / (b - a);
        // Gentle bell: a long smooth breath in over the first 40% of the
        // chapter, a slow exhale over the last 40%. Nothing pops.
        const vis = local <= 0 || local >= 1
          ? 0
          : smooth(local / 0.4) * smooth((1 - local) / 0.4);
        g.style.opacity = (vis * 0.4).toFixed(3);
        // The lines take most of the chapter to finish drawing, eased, so
        // the figure forms at reading pace instead of snapping together.
        const draw = reduced ? 0 : 1 - smooth(local / 0.8);
        g.style.setProperty("--cst-draw", draw.toFixed(3));
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

  return (
    <div ref={hostRef} className="constellation-field" aria-hidden="true">
      {CONSTELLATIONS.map((c) => (
        <div
          key={c.name}
          className="constellation"
          style={{ ...c.at, width: c.size, height: c.size * 1.1 }}
        >
          <svg viewBox="0 0 100 110" width="100%" height="100%">
            {c.lines.map((line, li) => (
              <polyline
                key={li}
                className="cst-line"
                points={line.map(([x, y]) => `${x * 100},${y * 100}`).join(" ")}
                pathLength={1}
              />
            ))}
            {c.stars.map(([x, y, r], si) => (
              <circle key={si} className="cst-star" cx={x * 100} cy={y * 100} r={r} />
            ))}
          </svg>
          <div className="cst-name">{locale === "es" ? NAMES_ES[c.name] : c.name}</div>
        </div>
      ))}
    </div>
  );
}
