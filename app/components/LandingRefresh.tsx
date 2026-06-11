"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SkyTaste from "./SkyTaste";
import SkyNow from "./SkyNow";

const APP_URL = "https://app.solray.ai/onboard";
const LOGIN_URL = "https://app.solray.ai/login";

// Real current date + sun sign + moon phase for the Today specimen, so the
// page that promises "to the exact degree" never shows last April. Sun sign
// by date range and moon phase by synodic approximation are both exact
// enough at sign/phase level; the numbers in the card stay illustrative.
function sunSignFor(d: Date): string {
  const m = d.getMonth() + 1, day = d.getDate();
  const signs: [number, number, string][] = [
    [1, 20, "Capricorn"], [2, 19, "Aquarius"], [3, 21, "Pisces"],
    [4, 20, "Aries"], [5, 21, "Taurus"], [6, 21, "Gemini"],
    [7, 23, "Cancer"], [8, 23, "Leo"], [9, 23, "Virgo"],
    [10, 23, "Libra"], [11, 22, "Scorpio"], [12, 22, "Sagittarius"],
  ];
  for (const [mm, cutoff, sign] of signs) {
    if (m === mm) return day < cutoff ? sign : signs[mm % 12][2];
  }
  return "Capricorn";
}

function moonPhaseWord(d: Date): string {
  // New moon reference: 2000-01-06 18:14 UTC; synodic month 29.53059 days.
  const ref = Date.UTC(2000, 0, 6, 18, 14);
  const days = (d.getTime() - ref) / 86400000;
  const phase = ((days % 29.53059) + 29.53059) % 29.53059;
  return phase < 14.765 ? "waxing" : "waning";
}

export default function LandingRefresh() {
  return (
    <>
      {/* Nav */}
      <nav className="top-nav">
        <div className="brand">
          <span className="wordmark">SOLRAY</span>
        </div>
        <div className="links">
          <a href="#map">The Map</a>
          <a href="#oracle">The Oracle</a>
          <a href="#today">Today</a>
          <a href="#philosophy">Living By Design</a>
          <a href="/es" className="lang-switch" aria-label="Versión en español">ES</a>
          <a href={LOGIN_URL} className="btn primary nav-cta">
            Log in
          </a>
        </div>
        <div className="links cta-only">
          {/* Mobile-only nav. The primary CTA in the header is Log in,
              not Begin. The giant 'Begin your journey' button sits
              just below the hero copy and serves new visitors. The
              header exists so returning users have an obvious path
              back into the app from any scroll position. Earlier
              version had Begin in the header and no Log in path on
              mobile; a paying user reported they got stuck. */}
          <a href="/es" className="lang-switch" aria-label="Versión en español">ES</a>
          <a href={LOGIN_URL} className="btn primary nav-cta">
            Log in
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
            <div className="tagline">Living by design</div>
          </div>
          <h1 className="display">
            You were born under
            <br />
            a specific sky.
            <br />
            <span className="amber-accent">It is still speaking.</span>
          </h1>
          <p className="hero-sub">
            Solray reads the exact moment you arrived against the sky overhead right now. Western astrology, Human Design, and Gene Keys, calculated together, against your chart alone. Every morning, in your own language.
          </p>
          <div className="hero-ctas">
            <a href={APP_URL} className="btn primary hero-primary">
              Begin your journey
            </a>
            <a href="#oracle" className="btn ghost oracle-cta">
              Meet the Oracle
            </a>
          </div>
          <div className="hero-tag">Five days free. $23 a month after. Cancel any time.</div>

          {/* Specimen card */}
          <div className="specimen">
            <div className="row">
              <span className="label">Born</span>
              <span className="value">5 September 1989</span>
            </div>
            <div className="row">
              <span className="label">In</span>
              <span className="value">Reykjavik, Iceland</span>
            </div>
            <div className="row">
              <span className="label">Sun in</span>
              <span className="value">Virgo, 12°26&apos;</span>
            </div>
            <div className="row">
              <span className="label">Type</span>
              <span className="value">Generator, 2/4</span>
            </div>
            <div className="row">
              <span className="label">Life path</span>
              <span className="value">5, freedom and adventure</span>
            </div>
            <div className="row">
              <span className="label">Today&apos;s sky</span>
              <span className="value">Moon trine your Sun, 0°22&apos; orb</span>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      <SkyNow locale="en" />

      <div className="rule"></div>

      <SkyTaste locale="en" />

      <div className="rule"></div>

      {/* The Map */}
      <section id="map">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The Map</span>
            <h2 className="section">Three systems. One chart. Your chart.</h2>
            <p className="lead">
              Astrology tells you what season you arrived in. Human Design tells you how your body is wired to move. Gene Keys tell you what you&apos;re here to transmute. Solray calculates all three from a single birth moment and lets them speak to one another, so you stop reading four apps and start understanding one person.
            </p>
          </div>

          <div className="three">
            <div className="card">
              <div className="glyph astro" aria-hidden="true">
                {/* Natal chart wheel: outer circle, inner house ring, ASC-DSC + MC-IC cross. */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9.4" />
                  <circle cx="12" cy="12" r="3.8" />
                  <line x1="2.6" y1="12" x2="21.4" y2="12" />
                  <line x1="12" y1="2.6" x2="12" y2="21.4" />
                </svg>
              </div>
              <h3 className="card-heading">Western Astrology</h3>
              <p>
                Planets, houses, aspects, transits, progressions, read as a living map of where you arrived and what the sky is doing to it now. Calculated to the exact degree from your birth moment, not pulled from a sun-sign column.
              </p>
              <div className="note astro">To the exact degree</div>
            </div>
            <div className="card">
              <div className="glyph hd" aria-hidden="true">
                {/* Simplified bodygraph skeleton: crown triangle, ajna square, G-center diamond. */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M7 3 L17 3 L12 7.5 Z" />
                  <line x1="12" y1="7.5" x2="12" y2="9" />
                  <rect x="9.5" y="9" width="5" height="5" />
                  <line x1="12" y1="14" x2="12" y2="15.5" />
                  <path d="M12 15.5 L15 18 L12 20.5 L9 18 Z" />
                </svg>
              </div>
              <h3 className="card-heading">Human Design</h3>
              <p>
                Type, authority, profile, defined and open centers, the channels you broadcast, the gates you absorb. A mechanical map of how your energy actually works, so you stop forcing the shape you think you should be.
              </p>
              <div className="note hd">Bodygraph, unaltered</div>
            </div>
            <div className="card">
              <div className="glyph gk" aria-hidden="true">
                {/* I-Ching hexagram 63 (Already Across): perfect alternation, yin above yang, reading top-down. Six lines, broken/solid/broken/solid/broken/solid. */}
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
                Your four primary gates read as shadow, gift, siddhi. Contemplation, not prescription. The current you&apos;re being asked to turn toward, the frequency under it, the grace waiting on the other side.
              </p>
              <div className="note gk">The hologenetic profile</div>
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
                <div className="chat-handle">Your Higher Self</div>
                <div className="chat-kicker">ORACLE</div>
                <div className="chat-scroll">
                  <div className="bubble user">Why have I been so restless this week?</div>
                  <div className="msg-label">You</div>
                  <div className="bubble oracle">
                    Mars entered your 3rd house on Tuesday and is squaring your natal Moon. You feel it as pressure to move, to say something, to stop circling. That is your open Root center amplifying the transit. It is not a flaw. It is <em>information</em>.
                  </div>
                  <div className="msg-label">Oracle</div>
                  <div className="bubble user">What do I do with it?</div>
                  <div className="msg-label">You</div>
                  <div className="bubble oracle">
                    Short walks. Hard edges on small decisions. You are a 2/4: clarity comes when you close the door, and the answers arrive through people who already love you. Take one hour alone today, then answer the call that finds you. By Friday Mars moves off the square and the pressure drops.
                  </div>
                  <div className="msg-label">Oracle</div>
                </div>
                <div className="chat-input">
                  <div className="box">Speak freely…</div>
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
              <span className="eyebrow">The Oracle</span>
              <h2 className="section" style={{ marginTop: 14 }}>
                A counsel that reads your chart
                <br />
                and remembers you.
              </h2>
              <p className="body">
                Ask anything. Today&apos;s sky, a hard conversation, the pattern you keep running, the decision you&apos;re stalling on. The Oracle answers from inside your specific chart, your current transits, and everything you have already told it. It speaks from the exact configuration of your birth, the way someone who has known you for years might, if they could also read the sky.
              </p>
              <div className="quote">
                &ldquo;You are not here to be everyone&apos;s Generator. You&apos;re a 2/4 Generator. Your work is to close the door, do the thing, and wait for the ones already near you to pull you back out.&rdquo;
              </div>
              <div className="attr">Oracle, Tuesday 11:14</div>
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
              <span className="eyebrow">Today</span>
              <h2 className="section" style={{ marginTop: 14 }}>
                The weather report
                <br />
                for your chart.
              </h2>
              <p className="body">
                Each morning Solray computes what the sky is doing against your birth chart specifically, names the aspects, measures the energy across four channels you can feel, and gives you one clear sentence about how to spend the day. Every line traces back to a real position in the sky, measured to the degree.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Read it in forty seconds. Carry it all day.
              </p>
            </div>

            <div className="today-widget">
              <TodayHeader />

              <div className="bar-row">
                <span className="bar-label">Mental</span>
                <div className="bar">
                  <span className="fill-mental" style={{ width: "82%" }}></span>
                </div>
                <span className="bar-pct">82</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Emotional</span>
                <div className="bar">
                  <span className="fill-emotional" style={{ width: "64%" }}></span>
                </div>
                <span className="bar-pct">64</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Physical</span>
                <div className="bar">
                  <span className="fill-physical" style={{ width: "71%" }}></span>
                </div>
                <span className="bar-pct">71</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Intuitive</span>
                <div className="bar">
                  <span className="fill-intuitive" style={{ width: "88%" }}></span>
                </div>
                <span className="bar-pct">88</span>
              </div>

              <div className="insight">
                A soft Moon trine is passing over your Sun today. The easy thing is the right thing. Do one quiet thing your body actually wants, the people already near you will notice the result. Don&apos;t force the other three.
              </div>
              <div className="insight-attr">Solray daily · calculated at 05:12 local</div>
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
              {/* Faithful mock of the BondCard component on /souls. Same
                  gradient, same indigo border, same pill grammar, same
                  Dynamic → CTA. The Romantic lens is the active one so
                  the whisper line tells you the partner's sun sign +
                  Human Design type, exactly as the real card does for
                  non-family bonds. */}
              <div className="bond-mock" aria-hidden="true">
                <div className="bond-eyebrow">Dynamics</div>
                <h3 className="bond-heading">Where two charts meet.</h3>

                <div className="bond-pills">
                  <div className="bond-pill you">
                    <div className="bond-avatar you-avatar">B</div>
                    <span>You</span>
                  </div>
                  <div className="bond-pill partner">
                    <span className="bond-star">✦</span>
                    <div className="bond-avatar partner-avatar">E</div>
                    <span>Eva</span>
                    <span className="bond-remove">×</span>
                  </div>
                </div>

                <div className="bond-whisper">☉ Libra · Projector 3/5</div>

                <div className="bond-lens-label">Lens</div>
                <div className="bond-lens-pills">
                  <span className="bond-lens-pill">Family</span>
                  <span className="bond-lens-pill">Friendship</span>
                  <span className="bond-lens-pill active">Romantic</span>
                  <span className="bond-lens-pill">Working</span>
                </div>

                <div className="bond-cta">Read the Dynamic →</div>
              </div>
            </div>

            <div className="souls-copy">
              <span className="eyebrow">Souls</span>
              <h2 className="section" style={{ marginTop: 14 }}>
                See the shape between you
                <br />
                and the people you love.
              </h2>
              <p className="body">
                Add the birth data of a partner, friend, or family member. Solray computes synastry across all three systems, names the exact aspects you&apos;re running with them, the channels you share, the gates they open in you. Understand the relationship the way the sky drew it, not the way the argument felt.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Only you ever see the reading. We never create an account for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      {/* Philosophy */}
      <section className="philosophy" id="philosophy">
        <div className="narrow">
          <span className="eyebrow">Living By Design</span>
          <h2 className="section" style={{ marginTop: 14 }}>
            Not horoscope. Architecture.
          </h2>

          <p className="lede">
            Your chart is not a forecast. It is a blueprint drawn the moment you arrived, in a language older than words, showing you how you were built, what you were built to move through, and what the current of your life is actually made of.
          </p>

          <p>
            Most people carry that blueprint unread. They call its patterns moods, its timing bad luck, its gifts weaknesses. Solray is built on one premise. If you learn to read it, you stop fighting yourself, and you start moving with the thing that made you.
          </p>

          <p>
            This is living by design. Strip until only the essential remains. Trust the material. Make the whole thing livable before you make it beautiful, and then let beauty emerge on its own, because it will.
          </p>

        </div>
      </section>

      <div className="rule"></div>

      {/* Pricing */}
      <section className="pricing" id="begin">
        <div className="narrow">
          <span className="eyebrow">Begin</span>
          <h2 className="section" style={{ marginTop: 14 }}>
            One tier. Everything in it.
          </h2>
          <p className="kicker" style={{ marginTop: 16 }}>
            One price opens the whole map. Nothing waits behind a higher tier.
          </p>

          <div className="pricing-card">
            <div className="label">Solray membership</div>
            <div className="amount">
              $23<span className="per">per month</span>
            </div>
            <div className="trial">Five days free. Cancel any time before the trial ends.</div>

            <ul>
              <li>
                <span className="tick">✓</span> Your full natal chart, Human Design body graph, and Gene Keys lifework
              </li>
              <li>
                <span className="tick">✓</span> Daily forecast computed against your birth chart, with a single action for the day
              </li>
              <li>
                <span className="tick">✓</span> The Oracle, a chat counsel that answers from inside your chart and recalls every conversation
              </li>
              <li>
                <span className="tick">✓</span> Voice input, so you can speak the question instead of typing it
              </li>
              <li>
                <span className="tick">✓</span> Souls, synastry with anyone whose birth data you know
              </li>
              <li>
                <span className="tick">✓</span> Astrocartography, the places on earth where your chart is strongest
              </li>
              <li>
                <span className="tick">✓</span> Long-range cycles, the multi-year transits already shaping your chapter
              </li>
            </ul>

            <div className="cta">
              <a href={APP_URL} className="btn primary pricing-cta">
                Start five days free
              </a>
            </div>
          </div>
          <p className="note">Precise to the degree. Your data stays yours.</p>
        </div>
      </section>

      {/* Closing invocation */}
      <section className="invocation">
        <div className="wrap">
          <p>
            The sky will keep speaking
            <br />
            whether you listen or not.
            <br />
            Solray is the quiet room
            <br />
            where you finally hear it.
          </p>
          <div className="sig">Solray, living by design</div>
        </div>
      </section>

      <FaqSection />

      {/* Footer */}
      <footer className="site">
        <div className="wrap">
          <div className="brand">Solray</div>
          <div>Iceland. Calculated with Swiss Ephemeris. Built for people, not markets.</div>
          <div className="socials" aria-label="Follow Solray">
            <a
              href="https://www.instagram.com/solray.ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solray on Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@solray.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solray on TikTok"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a
              href="https://www.x.com/solray_ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solray on X"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@solrayai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solray on YouTube"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61574304943930"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solray on Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103.532.064 1.016.133 1.141.195v3.325a8.623 8.623 0 00-.653-.036 26.805 26.805 0 00-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 00-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z" />
              </svg>
            </a>
          </div>
          <nav>
            <a href="/legal">Privacy</a>
            <a href="/legal">Terms</a>
            <a href="mailto:hello@solray.ai">Contact</a>
            <a href="/es">Español</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

function TodayHeader() {
  // Rendered client-side after mount so SSR and client never disagree
  // about "today" across a midnight boundary.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) {
    return (
      <>
        <div className="date">Today</div>
        <div className="sky">Computed against your chart each morning</div>
      </>
    );
  }
  const date = now.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });
  return (
    <>
      <div className="date">{date}</div>
      <div className="sky">
        Sun in {sunSignFor(now)} · Moon {moonPhaseWord(now)}
      </div>
    </>
  );
}

const FAQS: [string, string][] = [
  [
    "I don't know my exact birth time.",
    "Start with what you know. Your birth date and place already give Solray your Sun, your life path, your Gene Keys and the slower planets, exactly. The rising sign, houses and parts of Human Design sharpen once you add a time, and you can update it in settings whenever you find it (a birth certificate usually has it); everything recalculates instantly.",
  ],
  [
    "Is this AI making things up?",
    "The calculations are not AI. Every position is computed with Swiss Ephemeris, the same engine professional astrologers use, to the exact degree. The Oracle speaks from those computed facts, and every reply is checked against your actual chart before you see it. If a sentence does not match your sky, it does not reach you.",
  ],
  [
    "What happens to my data?",
    "Your birth data and your conversations stay yours. We do not sell data, we do not run ads, and the people you add in Souls never become accounts or get contacted. You can delete your account and everything in it at any time.",
  ],
  [
    "What if I want to cancel?",
    "Cancel inside the app in two taps, any time. Cancel during the five free days and you pay nothing at all. Cancel later and your access simply runs to the end of the month you already paid for.",
  ],
  [
    "How is this different from other astrology apps?",
    "Three complete systems, Western astrology, Human Design and Gene Keys, calculated together from one birth moment and allowed to speak to each other. A daily reading computed against your chart, not your sun sign. And an Oracle that remembers every conversation, so it gets more precise about you the longer you stay. No horoscope columns anywhere.",
  ],
];

function FaqSection() {
  return (
    <>
      <div className="rule"></div>
      <section className="faq" id="faq">
        <div className="narrow">
          <span className="eyebrow">Questions</span>
          <h2 className="section" style={{ marginTop: 14 }}>
            Asked, answered.
          </h2>
          <div className="faq-list">
            {FAQS.map(([q, a]) => (
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
