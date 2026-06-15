"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import InstallBar from "./InstallBar";
import SkyTaste from "./SkyTaste";
import SkyNow from "./SkyNow";

const SIGNOS: Record<string, string> = {
  Capricorn: "Capricornio", Aquarius: "Acuario", Pisces: "Piscis",
  Aries: "Aries", Taurus: "Tauro", Gemini: "Géminis", Cancer: "Cáncer",
  Leo: "Leo", Virgo: "Virgo", Libra: "Libra", Scorpio: "Escorpio",
  Sagittarius: "Sagitario",
};

function signoSolar(d: Date): string {
  const m = d.getMonth() + 1, day = d.getDate();
  const signs: [number, number, string][] = [
    [1, 20, "Capricorn"], [2, 19, "Aquarius"], [3, 21, "Pisces"],
    [4, 20, "Aries"], [5, 21, "Taurus"], [6, 21, "Gemini"],
    [7, 23, "Cancer"], [8, 23, "Leo"], [9, 23, "Virgo"],
    [10, 23, "Libra"], [11, 22, "Scorpio"], [12, 22, "Sagittarius"],
  ];
  let en = "Capricorn";
  for (const [mm, cutoff, sign] of signs) {
    if (m === mm) { en = day < cutoff ? sign : signs[mm % 12][2]; break; }
  }
  return SIGNOS[en];
}

function faseLunar(d: Date): string {
  const ref = Date.UTC(2000, 0, 6, 18, 14);
  const days = (d.getTime() - ref) / 86400000;
  const phase = ((days % 29.53059) + 29.53059) % 29.53059;
  return phase < 14.765 ? "creciente" : "menguante";
}

// LandingRefreshES, Spanish (Latin American neutral) landing page.
//
// Parallel to LandingRefresh.tsx with the same DNA and CSS class names
// so it inherits all visual treatment from globals.css. Copy is the only
// thing that differs. Kept as its own file rather than parameterising
// LandingRefresh so each translation can own its own cadence, idiomatic
// turns of phrase, and tone without forcing every other language into
// the same English-shaped sentences.

const APP_URL = "https://app.solray.ai/onboard";
const LOGIN_URL = "https://app.solray.ai/login";

export default function LandingRefreshES() {
  return (
    <>
      <InstallBar
        text="Añade Solray a tu pantalla de inicio"
        iosHint="Toca el botón Compartir en la barra del navegador y elige Añadir a pantalla de inicio."
        dismissLabel="Descartar"
      />
      {/* Nav */}
      <nav className="top-nav">
        <div className="brand">
          <span className="wordmark">SOLRAY</span>
        </div>
        <div className="links">
          <a href="#map">El Mapa</a>
          <a href="#oracle">El Oráculo</a>
          <a href="#today">Hoy</a>
          <a href="#philosophy">Vivir por diseño</a>
          <a href="/" className="lang-switch" aria-label="English version">EN</a>
          <a href={LOGIN_URL} className="btn primary nav-cta">
            Iniciar sesión
          </a>
        </div>
        <div className="links cta-only">
          <a href="/" className="lang-switch" aria-label="English version">EN</a>
          <a href={LOGIN_URL} className="btn primary nav-cta">
            Iniciar sesión
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="starfield"></div>
        <div className="hero-inner">
          <div className="sun-mark" aria-hidden="true">
            <Image src="/solray-sun.png" alt="" width={150} height={150} priority />
          </div>
          <div className="brand-lockup">
            <div className="name">Solray</div>
            <div className="tagline">Vivir por diseño</div>
          </div>
          <h1 className="display">
            Naciste bajo
            <br />
            un cielo específico.
            <br />
            <span className="amber-accent">Todavía está hablando.</span>
          </h1>
          <p className="hero-sub">
            Solray lee el instante exacto en que llegaste contra el cielo de este momento. Astrología occidental, Diseño Humano y Gene Keys, calculados juntos, sólo contra tu carta. Cada mañana, en tu propio idioma.
          </p>
          <div className="hero-ctas">
            <a href={APP_URL} className="btn primary hero-primary">
              Empieza tu camino
            </a>
            <a href="#oracle" className="btn ghost oracle-cta">
              Conoce al Oráculo
            </a>
          </div>
          <div className="hero-tag">Cinco días gratis. $23 al mes después. Cancela cuando quieras.</div>

          <div className="specimen">
            <div className="row">
              <span className="label">Nacido</span>
              <span className="value">5 de septiembre de 1989</span>
            </div>
            <div className="row">
              <span className="label">En</span>
              <span className="value">Reikiavik, Islandia</span>
            </div>
            <div className="row">
              <span className="label">Sol en</span>
              <span className="value">Virgo, 12°26&apos;</span>
            </div>
            <div className="row">
              <span className="label">Tipo</span>
              <span className="value">Generador, 2/4</span>
            </div>
            <div className="row">
              <span className="label">Camino de vida</span>
              <span className="value">5, libertad y aventura</span>
            </div>
            <div className="row">
              <span className="label">Cielo de hoy</span>
              <span className="value">Luna en trígono a tu Sol, orbe 0°22&apos;</span>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      <SkyNow locale="es" />

      <div className="rule"></div>

      <SkyTaste locale="es" />

      <div className="rule"></div>

      {/* El Mapa */}
      <section id="map">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">El Mapa</span>
            <h2 className="section">Tres sistemas. Una carta. Tu carta.</h2>
            <p className="lead">
              La astrología te dice en qué estación llegaste. El Diseño Humano te dice cómo está cableado tu cuerpo para moverse. Las Gene Keys te dicen qué viniste a transmutar. Solray calcula los tres desde un único momento de nacimiento y los deja hablarse entre sí, para que dejes de leer cuatro apps y empieces a entender a una persona.
            </p>
          </div>

          <div className="three">
            <div className="card">
              <div className="glyph astro" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9.4" />
                  <circle cx="12" cy="12" r="3.8" />
                  <line x1="2.6" y1="12" x2="21.4" y2="12" />
                  <line x1="12" y1="2.6" x2="12" y2="21.4" />
                </svg>
              </div>
              <h3 className="card-heading">Astrología occidental</h3>
              <p>
                Planetas, casas, aspectos, tránsitos, progresiones, leídos como un mapa vivo de dónde llegaste y lo que el cielo le está haciendo ahora. Calculado al grado exacto desde tu momento de nacimiento, no sacado de una columna de signo solar.
              </p>
              <div className="note astro">Al grado exacto</div>
            </div>
            <div className="card">
              <div className="glyph hd" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M7 3 L17 3 L12 7.5 Z" />
                  <line x1="12" y1="7.5" x2="12" y2="9" />
                  <rect x="9.5" y="9" width="5" height="5" />
                  <line x1="12" y1="14" x2="12" y2="15.5" />
                  <path d="M12 15.5 L15 18 L12 20.5 L9 18 Z" />
                </svg>
              </div>
              <h3 className="card-heading">Diseño Humano</h3>
              <p>
                Tipo, autoridad, perfil, centros definidos y abiertos, los canales que emites, las puertas que absorbes. Un mapa mecánico de cómo funciona realmente tu energía, para que dejes de forzar la forma que crees que deberías tener.
              </p>
              <div className="note hd">Bodygraph, sin alterar</div>
            </div>
            <div className="card">
              <div className="glyph gk" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4.2" width="7" height="1.2" rx="0.4" />
                  <rect x="13" y="4.2" width="7" height="1.2" rx="0.4" />
                  <rect x="4" y="7.4" width="16" height="1.2" rx="0.4" />
                  <rect x="4" y="10.6" width="7" height="1.2" rx="0.4" />
                  <rect x="13" y="10.6" width="7" height="1.2" rx="0.4" />
                  <rect x="4" y="13.8" width="16" height="1.2" rx="0.4" />
                  <rect x="4" y="17" width="7" height="1.2" rx="0.4" />
                  <rect x="13" y="17" width="7" height="1.2" rx="0.4" />
                  <rect x="4" y="20.2" width="16" height="1.2" rx="0.4" />
                </svg>
              </div>
              <h3 className="card-heading">Gene Keys</h3>
              <p>
                Tus cuatro puertas principales leídas como sombra, don, siddhi. Contemplación, no prescripción. La corriente que se te pide mirar, la frecuencia debajo de ella, la gracia esperando del otro lado.
              </p>
              <div className="note gk">El perfil hologenético</div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      {/* Oracle */}
      <section id="oracle">
        <div className="wrap">
          <div className="oracle-frame">
            <div className="phone">
              <div className="phone-screen">
                <div className="chat-handle">Tu Yo Superior</div>
                <div className="chat-kicker">ORÁCULO</div>
                <div className="chat-scroll">
                  <div className="bubble user">¿Por qué he estado tan inquieta esta semana?</div>
                  <div className="msg-label">Tú</div>
                  <div className="bubble oracle">
                    Marte entró en tu casa 3 el martes y está cuadrando a tu Luna natal. Lo sientes como presión para moverte, para decir algo, para dejar de dar vueltas. Eso es tu centro Raíz abierto amplificando el tránsito. No es un defecto. Es <em>información</em>.
                  </div>
                  <div className="msg-label">Oráculo</div>
                  <div className="bubble user">¿Qué hago con eso?</div>
                  <div className="msg-label">Tú</div>
                  <div className="bubble oracle">
                    Caminatas cortas. Bordes duros en decisiones pequeñas. Eres una 2/4: la claridad llega cuando cierras la puerta, y las respuestas vienen de la gente que ya te quiere. Tómate una hora a solas hoy, y luego contesta la llamada que te encuentre. El viernes Marte sale de la cuadratura y la presión cae.
                  </div>
                  <div className="msg-label">Oráculo</div>
                </div>
                <div className="chat-input">
                  <div className="box">Habla con libertad…</div>
                  <div className="mic">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="3" width="6" height="12" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="8" y1="22" x2="16" y2="22" />
                    </svg>
                  </div>
                  <div className="send">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="oracle-copy">
              <span className="eyebrow">El Oráculo</span>
              <h2 className="section" style={{ marginTop: 14 }}>
                Una consejera que lee tu carta
                <br />
                y te recuerda.
              </h2>
              <p className="body">
                Pregunta lo que sea. El cielo de hoy, una conversación difícil, el patrón que repites, la decisión que estás postergando. El Oráculo responde desde dentro de tu carta específica, tus tránsitos del momento y todo lo que ya le has contado. Habla desde la configuración exacta de tu nacimiento, como lo haría alguien que te conoce desde hace años, si además pudiera leer el cielo.
              </p>
              <div className="quote">
                &ldquo;No estás aquí para ser la Generadora de todos. Eres una Generadora 2/4. Tu trabajo es cerrar la puerta, hacer la cosa, y esperar a que los que ya están cerca te saquen.&rdquo;
              </div>
              <div className="attr">Oráculo, martes 11:14</div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      {/* Today */}
      <section id="today">
        <div className="wrap">
          <div className="today-layout">
            <div className="today-copy">
              <span className="eyebrow">Hoy</span>
              <h2 className="section" style={{ marginTop: 14 }}>
                El reporte del clima
                <br />
                para tu carta.
              </h2>
              <p className="body">
                Cada mañana Solray calcula qué está haciendo el cielo contra tu carta natal específicamente, nombra los aspectos, mide la energía en cuatro canales que puedes sentir, y te da una frase clara sobre cómo pasar el día. Cada línea remite a una posición real en el cielo, medida al grado.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Léelo en cuarenta segundos. Cárgalo todo el día.
              </p>
            </div>

            <div className="today-widget">
              <TodayHeaderES />

              <div className="bar-row">
                <span className="bar-label">Mental</span>
                <div className="bar">
                  <span className="fill-mental" style={{ width: "82%" }}></span>
                </div>
                <span className="bar-pct">82</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Emocional</span>
                <div className="bar">
                  <span className="fill-emotional" style={{ width: "64%" }}></span>
                </div>
                <span className="bar-pct">64</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Físico</span>
                <div className="bar">
                  <span className="fill-physical" style={{ width: "71%" }}></span>
                </div>
                <span className="bar-pct">71</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Intuitivo</span>
                <div className="bar">
                  <span className="fill-intuitive" style={{ width: "88%" }}></span>
                </div>
                <span className="bar-pct">88</span>
              </div>

              <div className="insight">
                Un trígono suave de Luna pasa sobre tu Sol hoy. Lo fácil es lo correcto. Haz una cosa tranquila que tu cuerpo de verdad quiera, la gente que ya está cerca notará el resultado. No fuerces las otras tres.
              </div>
              <div className="insight-attr">Solray diario · calculado a las 05:12 local</div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      {/* Souls */}
      <section>
        <div className="wrap">
          <div className="today-layout">
            <div className="souls-canvas">
              <div className="bond-mock" aria-hidden="true">
                <div className="bond-eyebrow">Dinámicas</div>
                <h3 className="bond-heading">Donde dos cartas se encuentran.</h3>

                <div className="bond-pills">
                  <div className="bond-pill you">
                    <div className="bond-avatar you-avatar">B</div>
                    <span>Tú</span>
                  </div>
                  <div className="bond-pill partner">
                    <span className="bond-star">✦</span>
                    <div className="bond-avatar partner-avatar">E</div>
                    <span>Eva</span>
                    <span className="bond-remove">×</span>
                  </div>
                </div>

                <div className="bond-whisper">☉ Libra · Proyector 3/5</div>

                <div className="bond-lens-label">Lente</div>
                <div className="bond-lens-pills">
                  <span className="bond-lens-pill">Familia</span>
                  <span className="bond-lens-pill">Amistad</span>
                  <span className="bond-lens-pill active">Romance</span>
                  <span className="bond-lens-pill">Trabajo</span>
                </div>

                <div className="bond-cta">Lee la Dinámica →</div>
              </div>
            </div>

            <div className="souls-copy">
              <span className="eyebrow">Almas</span>
              <h2 className="section" style={{ marginTop: 14 }}>
                Mira la forma entre tú
                <br />
                y las personas que amas.
              </h2>
              <p className="body">
                Agrega los datos de nacimiento de una pareja, una amiga, un familiar. Solray calcula sinastría en los tres sistemas, nombra los aspectos exactos que tienen entre ustedes, los canales que comparten, las puertas que se abren en ti. Entiende la relación como la dibujó el cielo, no como se sintió la pelea.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Sólo tú ves la lectura. Nunca creamos una cuenta para ellos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      {/* Philosophy */}
      <section className="philosophy" id="philosophy">
        <div className="narrow">
          <span className="eyebrow">Vivir por diseño</span>
          <h2 className="section" style={{ marginTop: 14 }}>
            No es horóscopo. Es arquitectura.
          </h2>

          <p className="lede">
            Tu carta no es un pronóstico. Es un plano dibujado en el momento en que llegaste, en un lenguaje más antiguo que las palabras, que te muestra cómo fuiste construida, lo que viniste a atravesar, y de qué está hecha realmente la corriente de tu vida.
          </p>

          <p>
            La mayoría carga ese plano sin leer. Llaman a sus patrones estados de ánimo, a su timing mala suerte, a sus dones debilidades. Solray se construye sobre una premisa. Si aprendes a leerlo, dejas de pelear contigo, y empiezas a moverte con lo que te hizo.
          </p>

          <p>
            Esto es vivir por diseño. Quita hasta que sólo quede lo esencial. Confía en el material. Haz que todo sea habitable antes de hacerlo bello, y luego deja que la belleza emerja sola, porque lo hará.
          </p>
        </div>
      </section>

      <div className="rule"></div>

      {/* Pricing */}
      <section className="pricing" id="begin">
        <div className="narrow">
          <span className="eyebrow">Empezar</span>
          <h2 className="section" style={{ marginTop: 14 }}>
            Un solo plan. Todo dentro.
          </h2>
          <p className="kicker" style={{ marginTop: 16 }}>
            Un precio abre el mapa entero. Nada espera detrás de un nivel superior.
          </p>

          <div className="pricing-card">
            <div className="label">Membresía Solray</div>
            <div className="amount">
              $23<span className="per">por mes</span>
            </div>
            <div className="trial">Cinco días gratis. Cancela en cualquier momento antes de que termine la prueba.</div>

            <ul>
              <li>
                <span className="tick">✓</span> Tu carta natal completa, bodygraph de Diseño Humano y obra de vida en Gene Keys
              </li>
              <li>
                <span className="tick">✓</span> Pronóstico diario calculado contra tu carta de nacimiento, con una acción para el día
              </li>
              <li>
                <span className="tick">✓</span> El Oráculo, un consejo en chat que responde desde dentro de tu carta y recuerda cada conversación
              </li>
              <li>
                <span className="tick">✓</span> Entrada de voz, para que hables la pregunta en lugar de escribirla
              </li>
              <li>
                <span className="tick">✓</span> Almas, sinastría con cualquiera cuyos datos de nacimiento conozcas
              </li>
              <li>
                <span className="tick">✓</span> Astrocartografía, los lugares de la tierra donde tu carta es más fuerte
              </li>
              <li>
                <span className="tick">✓</span> Ciclos de largo alcance, los tránsitos plurianuales que ya están dando forma a tu capítulo
              </li>
            </ul>

            <div className="cta">
              <a href={APP_URL} className="btn primary pricing-cta">
                Empieza cinco días gratis
              </a>
            </div>
          </div>
          <p className="note">Preciso al grado. Tus datos siguen siendo tuyos.</p>
        </div>
      </section>

      {/* Closing invocation */}
      <section className="invocation">
        <div className="wrap">
          <p>
            El cielo seguirá hablando
            <br />
            lo escuches o no.
            <br />
            Solray es la habitación tranquila
            <br />
            donde por fin lo oyes.
          </p>
          <div className="sig">Solray, vivir por diseño</div>
        </div>
      </section>

      <FaqSectionES />

      {/* Footer */}
      <footer className="site">
        <div className="wrap">
          <div className="brand">Solray</div>
          <div>Islandia. Calculado con Swiss Ephemeris. Hecho para personas, no para mercados.</div>
          <div className="socials" aria-label="Sigue a Solray">
            <a href="https://www.instagram.com/solray.ai/" target="_blank" rel="noopener noreferrer" aria-label="Solray en Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.x.com/solray_ai" target="_blank" rel="noopener noreferrer" aria-label="Solray en X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <nav>
            <a href="/legal">Privacidad</a>
            <a href="/legal">Términos</a>
            <a href="mailto:hello@solray.ai">Contacto</a>
            <a href="/">English</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

function TodayHeaderES() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) {
    return (
      <>
        <div className="date">Hoy</div>
        <div className="sky">Calculado contra tu carta cada mañana</div>
      </>
    );
  }
  const date = now.toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long",
  });
  const cap = date.charAt(0).toUpperCase() + date.slice(1);
  return (
    <>
      <div className="date">{cap}</div>
      <div className="sky">
        Sol en {signoSolar(now)} · Luna {faseLunar(now)}
      </div>
    </>
  );
}

const FAQS_ES: [string, string][] = [
  [
    "No sé mi hora exacta de nacimiento.",
    "Empieza con lo que sabes. Tu fecha y lugar de nacimiento ya le dan a Solray tu Sol, tu camino de vida, tus Claves Genéticas y los planetas lentos, con exactitud. El ascendente, las casas y partes del Diseño Humano se afinan cuando añades la hora, y puedes actualizarla en ajustes cuando la encuentres (un certificado de nacimiento suele tenerla); todo se recalcula al instante.",
  ],
  [
    "¿Esto es una IA inventando cosas?",
    "Los cálculos no son IA. Cada posición se calcula con Swiss Ephemeris, el mismo motor que usan los astrólogos profesionales, al grado exacto. El Oráculo habla desde esos hechos calculados, y cada respuesta se verifica contra tu carta real antes de que la veas. Si una frase no coincide con tu cielo, no te llega.",
  ],
  [
    "¿Qué pasa con mis datos?",
    "Tus datos de nacimiento y tus conversaciones son tuyos. No vendemos datos, no ponemos anuncios, y las personas que añades en Almas nunca se convierten en cuentas ni reciben mensajes. Puedes borrar tu cuenta y todo lo que contiene en cualquier momento.",
  ],
  [
    "¿Y si quiero cancelar?",
    "Cancela dentro de la app en dos toques, cuando quieras. Si cancelas durante los cinco días gratis no pagas nada. Si cancelas después, tu acceso simplemente llega hasta el final del mes que ya pagaste.",
  ],
  [
    "¿En qué se diferencia de otras apps de astrología?",
    "Tres sistemas completos, astrología occidental, Diseño Humano y Claves Genéticas, calculados juntos desde un mismo momento de nacimiento y puestos a dialogar entre sí. Una lectura diaria calculada contra tu carta, no contra tu signo solar. Y un Oráculo que recuerda cada conversación, así que se vuelve más preciso contigo cuanto más te quedas. Sin columnas de horóscopo en ningún sitio.",
  ],
];

function FaqSectionES() {
  return (
    <>
      <div className="rule"></div>
      <section className="faq" id="faq">
        <div className="narrow">
          <span className="eyebrow">Preguntas</span>
          <h2 className="section" style={{ marginTop: 14 }}>
            Preguntado, respondido.
          </h2>
          <div className="faq-list">
            {FAQS_ES.map(([q, a]) => (
              <details key={q} className="faq-item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
