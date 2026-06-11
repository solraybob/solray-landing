"use client";

/**
 * SkyNow: the observatory.
 *
 * A live orrery of the actual sky, computed by the same Swiss Ephemeris
 * engine that runs the product. Ten bodies at their true longitudes, the
 * exact aspects forming between them with live orbs, the Moon drawn at her
 * real illumination, and one neutral weather sentence derived from the
 * tightest geometry. Connected to no chart. Just what is happening in the
 * stars while you read.
 *
 * Data: GET /public/sky-now (parameterless, cached server-side per ten
 * minutes). Refreshes itself on the same cadence. If the fetch fails the
 * section renders nothing; the landing page never shows a broken instrument.
 */

import { useEffect, useMemo, useState } from "react";

const API_URL = "https://solray-backend-production.up.railway.app";

type SkyPlanet = {
  name: string;
  lon: number;
  sign: string;
  sign_index: number;
  degree: number;
  minute: number;
  retrograde: boolean;
};
type SkyAspect = { a: string; b: string; aspect: string; orb: number; applying: boolean };
type SkyNowPayload = {
  computed_at: string;
  planets: SkyPlanet[];
  aspects: SkyAspect[];
  moon: { phase_en: string; phase_es: string; illumination: number; sign: string };
  weather_en: string;
  weather_es: string;
};

const STRINGS = {
  en: {
    eyebrow: "The sky, live",
    heading: "This is the sky right now.",
    sub: "Not an illustration. Every position below is computed from the real ephemeris at this minute, the same engine that reads your chart.",
    moonIn: "Moon in",
    illuminated: "illuminated",
    closing: "closing",
    easing: "easing",
    computedAt: "computed at",
    utc: "UTC, Swiss Ephemeris",
    retro: "retrograde",
  },
  es: {
    eyebrow: "El cielo, en vivo",
    heading: "Así está el cielo ahora mismo.",
    sub: "No es una ilustración. Cada posición está calculada con la efeméride real en este minuto, el mismo motor que lee tu carta.",
    moonIn: "Luna en",
    illuminated: "iluminada",
    closing: "acercándose",
    easing: "alejándose",
    computedAt: "calculado a las",
    utc: "UTC, Swiss Ephemeris",
    retro: "retrógrado",
  },
} as const;

const SIGNS_EN = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const SIGNS_ES = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
const PLANETS_ES: Record<string, string> = {
  Sun: "Sol", Moon: "Luna", Mercury: "Mercurio", Venus: "Venus", Mars: "Marte",
  Jupiter: "Júpiter", Saturn: "Saturno", Uranus: "Urano", Neptune: "Neptuno", Pluto: "Plutón",
};
const ASPECTS_ES: Record<string, string> = {
  conjunction: "conjunción", sextile: "sextil", square: "cuadratura", trine: "trígono", opposition: "oposición",
};

// Aged-pigment palette, planet voices.
const PLANET_COLOR: Record<string, string> = {
  Sun: "#f39230", Moon: "#ece4cf", Mercury: "#9babb9", Venus: "#9caf78",
  Mars: "#d47a52", Jupiter: "#f7b968", Saturn: "#6a8692", Uranus: "#9babb9",
  Neptune: "#9b86a0", Pluto: "#9b86a0",
};
const ASPECT_COLOR: Record<string, string> = {
  trine: "#9caf78", sextile: "#9babb9", square: "#d47a52",
  opposition: "#6a8692", conjunction: "#f39230",
};
const ASPECT_MAX_ORB: Record<string, number> = {
  conjunction: 6, sextile: 3, square: 5, trine: 5, opposition: 6,
};

// Chart convention: 0 degrees Aries at nine o'clock, longitudes increase
// counterclockwise (Cancer 0 at the bottom, Libra 0 at three o'clock,
// Capricorn 0 at the top), matching every printed ephemeris wheel.
// (180 - lon) mirrored the wheel vertically: with SVG's y axis growing
// downward, the minus sign sent rising longitudes clockwise instead.
function point(lon: number, r: number, c: number): [number, number] {
  const th = ((180 + lon) * Math.PI) / 180;
  return [c + r * Math.cos(th), c - r * Math.sin(th)];
}

/** SVG path for a moon disc of the given illumination (0..1), waxing lights
 *  the right limb. Two arcs: the outer limb and the elliptical terminator. */
function moonPath(cx: number, cy: number, r: number, illum: number, waxing: boolean): string {
  const k = Math.max(0, Math.min(1, illum));
  // Terminator semi-axis: +r at full, -r at new (signed toward the lit limb).
  const tx = (2 * k - 1) * r;
  const side = waxing ? 1 : -1;
  // Outer limb semicircle on the lit side, then terminator ellipse back.
  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${waxing ? 1 : 0} ${cx} ${cy + r}`,
    `A ${Math.abs(tx)} ${r} 0 0 ${(side > 0) === (tx > 0) ? 1 : 0} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

export default function SkyNow({ locale }: { locale: "en" | "es" }) {
  const t = STRINGS[locale];
  const signNames = locale === "es" ? SIGNS_ES : SIGNS_EN;
  const [data, setData] = useState<SkyNowPayload | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let dead = false;
    const load = () =>
      fetch(`${API_URL}/public/sky-now`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((d) => { if (!dead) { setData(d); setFailed(false); } })
        .catch(() => { if (!dead) setFailed(true); });
    load();
    const iv = setInterval(load, 10 * 60 * 1000);
    const onVis = () => { if (!document.hidden) load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { dead = true; clearInterval(iv); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Geometry, memoized per payload.
  const S = 560, C = S / 2;
  const layout = useMemo(() => {
    if (!data) return null;
    // Cluster-aware radial nudge so conjunct planets never overlap.
    const sorted = [...data.planets].sort((a, b) => a.lon - b.lon);
    const radii = new Map<string, number>();
    let clusterStart = 0;
    for (let i = 0; i <= sorted.length; i++) {
      const gap = i === sorted.length
        ? 999
        : i === 0 ? 999 : Math.abs(sorted[i].lon - sorted[i - 1].lon);
      if (gap > 7) {
        const cluster = sorted.slice(clusterStart, i);
        cluster.forEach((p, j) => radii.set(p.name, 176 - j * 22));
        clusterStart = i;
      }
    }
    const dots = data.planets.map((p) => {
      const r = radii.get(p.name) ?? 176;
      const [x, y] = point(p.lon, r, C);
      const [lx, ly] = point(p.lon, r + 16, C);
      return { ...p, x, y, lx, ly, r };
    });
    const byName = new Map(dots.map((d) => [d.name, d]));
    const chords = data.aspects.map((a) => {
      const pa = byName.get(a.a)!;
      const pb = byName.get(a.b)!;
      const strength = 1 - a.orb / (ASPECT_MAX_ORB[a.aspect] || 6);
      return { ...a, x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y, strength };
    });
    const waxing = (() => {
      const sun = data.planets.find((p) => p.name === "Sun")!;
      const moon = data.planets.find((p) => p.name === "Moon")!;
      return ((moon.lon - sun.lon + 360) % 360) < 180;
    })();
    return { dots, chords, waxing };
  }, [data]);

  if (failed && !data) return null;

  const fmtPlanet = (n: string) => (locale === "es" ? PLANETS_ES[n] || n : n);
  const fmtAspect = (n: string) => (locale === "es" ? ASPECTS_ES[n] || n : n);

  return (
    <section className="skynow" id="sky-now">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="section">{t.heading}</h2>
          <p className="lead">{t.sub}</p>
        </div>

        <div className="skynow-frame">
          <div className="skynow-orrery" aria-hidden="true">
            <svg viewBox={`0 0 ${S} ${S}`} className={data ? "is-live" : "is-loading"}>
              <defs>
                <radialGradient id="snGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(243,146,48,0.08)" />
                  <stop offset="60%" stopColor="rgba(243,146,48,0.02)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <linearGradient id="snSweep" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(243,146,48,0)" />
                  <stop offset="100%" stopColor="rgba(243,146,48,0.16)" />
                </linearGradient>
              </defs>

              <circle cx={C} cy={C} r={250} fill="url(#snGlow)" />

              {/* Bezel */}
              <circle cx={C} cy={C} r={250} fill="none" stroke="rgba(242,236,216,0.3)" strokeWidth="1.2" />
              <circle cx={C} cy={C} r={214} fill="none" stroke="rgba(242,236,216,0.22)" strokeWidth="1" />
              <circle cx={C} cy={C} r={120} fill="none" stroke="rgba(242,236,216,0.05)" strokeWidth="1" strokeDasharray="1 6" />

              {/* Sign sectors + ticks */}
              {Array.from({ length: 12 }, (_, i) => {
                const [x1, y1] = point(i * 30, 214, C);
                const [x2, y2] = point(i * 30, 250, C);
                return <line key={`sep-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(242,236,216,0.26)" strokeWidth="1" />;
              })}
              {Array.from({ length: 72 }, (_, i) => {
                if (i % 6 === 0) return null;
                const [x1, y1] = point(i * 5, 244, C);
                const [x2, y2] = point(i * 5, 250, C);
                return <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(242,236,216,0.08)" strokeWidth="0.8" />;
              })}
              {signNames.map((name, i) => {
                const [x, y] = point(i * 30 + 15, 232, C);
                return (
                  <text key={name} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                    fill="rgba(242,236,216,0.72)"
                    style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
                    {name.slice(0, 3)}
                  </text>
                );
              })}

              {/* The minute hand of the observatory: one sweep per minute */}
              {data && (
                <g className="skynow-sweep">
                  <line x1={C} y1={C} x2={C + 210} y2={C} stroke="url(#snSweep)" strokeWidth="1.5" />
                </g>
              )}

              {/* Aspect chords, tightest brightest */}
              {layout?.chords.map((ch, i) => (
                <line key={`as-${ch.a}-${ch.b}`}
                  x1={ch.x1} y1={ch.y1} x2={ch.x2} y2={ch.y2}
                  stroke={ASPECT_COLOR[ch.aspect]}
                  strokeWidth={ch.aspect === "conjunction" ? 0 : 1.1}
                  strokeOpacity={0.22 + ch.strength * 0.55}
                  pathLength={1}
                  className="skynow-chord"
                  style={{ animationDelay: `${0.9 + i * 0.22}s` }}
                />
              ))}

              {/* Planets */}
              {layout?.dots.map((p, i) => (
                <g key={p.name} className="skynow-planet" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
                  <circle cx={p.x} cy={p.y} r={p.name === "Sun" ? 7 : p.name === "Moon" ? 5.5 : 4}
                    fill={PLANET_COLOR[p.name]}
                    className={p.name === "Sun" ? "skynow-sundot" : undefined}
                    style={{ filter: `drop-shadow(0 0 ${p.name === "Sun" ? 10 : 6}px ${PLANET_COLOR[p.name]})` }}
                  />
                  <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="central"
                    fill="rgba(242,236,216,0.78)"
                    style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
                    {fmtPlanet(p.name)}{p.retrograde ? " ·R" : ""}
                  </text>
                </g>
              ))}

              {/* The Moon at her true illumination, center stage */}
              {data && layout && (
                <g className="skynow-moon">
                  <circle cx={C} cy={C} r={34} fill="rgba(5,15,8,0.8)" stroke="rgba(242,236,216,0.16)" strokeWidth="1" />
                  <circle cx={C} cy={C} r={26} fill="rgba(236,228,207,0.1)" />
                  <path d={moonPath(C, C, 26, data.moon.illumination, layout.waxing)} fill="rgba(236,228,207,0.82)" />
                </g>
              )}
            </svg>
          </div>

          <div className="skynow-panel">
            {data ? (
              <>
                <div className="skynow-weather">
                  {locale === "es" ? data.weather_es : data.weather_en}
                </div>

                <div className="skynow-moonline">
                  {t.moonIn} {signNames[SIGNS_EN.indexOf(data.moon.sign)] || data.moon.sign} · {locale === "es" ? data.moon.phase_es : data.moon.phase_en} · {Math.round(data.moon.illumination * 100)}% {t.illuminated}
                </div>

                <div className="skynow-aspects">
                  {data.aspects.slice(0, 4).map((a) => (
                    <div className="skynow-aspect" key={`${a.a}-${a.b}-${a.aspect}`}>
                      <span className="dot" style={{ background: ASPECT_COLOR[a.aspect] }} />
                      <span className="pair">{fmtPlanet(a.a)} {fmtAspect(a.aspect)} {fmtPlanet(a.b)}</span>
                      <span className="orb">
                        {Math.floor(a.orb)}°{String(Math.round((a.orb % 1) * 60)).padStart(2, "0")}&apos; · {a.applying ? t.closing : t.easing}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="skynow-stamp">
                  {t.computedAt} {data.computed_at.slice(11, 16)} {t.utc}
                </div>
              </>
            ) : (
              <div className="skynow-loading" aria-hidden="true">
                <span /><span /><span />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
