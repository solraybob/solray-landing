"use client";

import { useState } from "react";

const API_URL = "https://solray-backend-production.up.railway.app";
const APP_URL = "https://app.solray.ai/onboard";

// One free computed line, before any signup. The visitor types a birth date
// and the backend (/public/sky-taste, rate-limited, no AI, no storage)
// answers with today's sky against THEIR natal Sun. The entire product
// premise is "this is about you specifically"; this is the first place a
// stranger gets to feel that, thirty seconds before we ask for anything.

const STRINGS = {
  en: {
    eyebrow: "Try it",
    heading: "What is today doing to your sky?",
    sub: "Type your birth date. One real line, computed from the actual sky, before you sign up for anything.",
    button: "Read today",
    loading: "Reading the sky...",
    error: "The sky is busy right now. Try again in a moment.",
    cta: "Read the rest of your sky",
    privacy: "Date only. Computed and forgotten, nothing stored.",
  },
  es: {
    eyebrow: "Pruébalo",
    heading: "¿Qué le está haciendo el día de hoy a tu cielo?",
    sub: "Escribe tu fecha de nacimiento. Una línea real, calculada del cielo de verdad, antes de registrarte en nada.",
    button: "Leer hoy",
    loading: "Leyendo el cielo...",
    error: "El cielo está ocupado ahora mismo. Inténtalo en un momento.",
    cta: "Lee el resto de tu cielo",
    privacy: "Solo la fecha. Se calcula y se olvida, no se guarda nada.",
  },
};

export default function SkyTaste({ locale = "en" }: { locale?: "en" | "es" }) {
  const t = STRINGS[locale];
  const [date, setDate] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{ headline: string; line: string } | null>(null);

  const read = async () => {
    if (!date || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch(
        `${API_URL}/public/sky-taste?birth_date=${encodeURIComponent(date)}`
      );
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setResult({ headline: data.headline, line: data.line });
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="taste" id="taste">
      <div className="narrow">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="section" style={{ marginTop: 14 }}>
          {t.heading}
        </h2>
        <p className="body taste-sub">{t.sub}</p>

        <div className="taste-card">
          <div className="taste-controls">
            <input
              type="date"
              value={date}
              max={new Date().toISOString().slice(0, 10)}
              min="1900-01-01"
              onChange={(e) => setDate(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && read()}
              aria-label={locale === "es" ? "Fecha de nacimiento" : "Birth date"}
              className="taste-input"
            />
            <button
              onClick={read}
              disabled={!date || state === "loading"}
              className="btn primary taste-btn"
            >
              {state === "loading" ? t.loading : t.button}
            </button>
          </div>

          {state === "error" && <div className="taste-error">{t.error}</div>}

          {state === "done" && result && (
            <div className="taste-result">
              <div className="taste-headline">{result.headline}</div>
              <p className="taste-line">{result.line}</p>
              <a href={APP_URL} className="btn ghost taste-cta">
                {t.cta} →
              </a>
            </div>
          )}

          <div className="taste-privacy">{t.privacy}</div>
        </div>
      </div>
    </section>
  );
}
