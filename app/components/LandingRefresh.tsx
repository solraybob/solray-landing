"use client";

import Image from "next/image";

const APP_URL = "https://app.solray.ai/onboard";

export default function LandingRefresh() {
  return (
    <>
      {/* Nav */}
      <nav className="top-nav">
        <div className="brand">
          <span className="mark" aria-hidden="true">
            <Image src="/icon-512.png" alt="" width={32} height={32} priority />
          </span>
          <span>Solray</span>
        </div>
        <div className="links">
          <a href="#map">The Map</a>
          <a href="#oracle">The Oracle</a>
          <a href="#today">Today</a>
          <a href="#philosophy">Living By Design</a>
          <a href={APP_URL} className="btn primary nav-cta">
            Begin
          </a>
        </div>
        <div className="links cta-only">
          <a href={APP_URL} className="btn primary nav-cta">
            Begin
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="starfield"></div>
        <div className="hero-inner">
          <div className="sun-mark" aria-hidden="true">
            <Image src="/icon-512.png" alt="" width={150} height={150} priority />
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
            <a href={APP_URL} className="btn primary">
              Begin your journey
            </a>
            <a href="#map" className="btn ghost">
              See what it reads
            </a>
          </div>
          <div className="hero-tag">Five days free. $23 a month after. Cancel any time.</div>

          {/* Specimen card */}
          <div className="specimen">
            <div className="row">
              <span className="label">Born</span>
              <span className="value">4 August 1979, 23:47</span>
            </div>
            <div className="row">
              <span className="label">In</span>
              <span className="value">Reykjavik, Iceland</span>
            </div>
            <div className="row">
              <span className="label">Sun in</span>
              <span className="value">Leo, 11°42&apos;</span>
            </div>
            <div className="row">
              <span className="label">Type</span>
              <span className="value">Manifesting Generator, 3/5</span>
            </div>
            <div className="row">
              <span className="label">Life path</span>
              <span className="value">5, freedom and adventure</span>
            </div>
            <div className="row">
              <span className="label">Today&apos;s sky</span>
              <span className="value">Venus trine your Mars, 0°18&apos; orb</span>
            </div>
          </div>
        </div>
      </section>

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
              <div className="glyph">☉</div>
              <h3 className="card-heading">Western Astrology</h3>
              <p>
                Planets, houses, aspects, transits, progressions. Nature-based sign interpretation, not tabloid horoscope. Mercury, Venus, Mars read through the body they actually rule. Earth gets Taurus back. Ceres gets Virgo.
              </p>
              <div className="note">Nature-based rulerships</div>
            </div>
            <div className="card">
              <div className="glyph">&#x25B3;</div>
              <h3 className="card-heading">Human Design</h3>
              <p>
                Type, authority, profile, defined and open centers, the channels you broadcast, the gates you absorb. A mechanical map of how your energy actually works, so you stop forcing the shape you think you should be.
              </p>
              <div className="note">Bodygraph, unaltered</div>
            </div>
            <div className="card">
              <div className="glyph">◯</div>
              <h3 className="card-heading">Gene Keys</h3>
              <p>
                Your four primary gates read as shadow, gift, siddhi. Contemplation, not prescription. The current you&apos;re being asked to turn toward, the frequency under it, the grace waiting on the other side.
              </p>
              <div className="note">Lifework + primary 11</div>
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
                <div className="chat-avatar"></div>
                <div className="chat-handle">Higher Self</div>
                <div className="chat-kicker">Oracle · remembers everything</div>
                <div className="chat-scroll">
                  <div className="bubble user">Why have I been so restless this week?</div>
                  <div className="bubble oracle">
                    Mars entered your 3rd house on Tuesday and is squaring your natal Moon. You feel it as pressure to move, to say something, to stop circling. That is your open Root center amplifying the transit. It is not a flaw. It is <em>information</em>.
                  </div>
                  <div className="bubble user">What do I do with it?</div>
                  <div className="bubble oracle">
                    Short walks. Hard edges on small decisions. You are a 3/5, you learn by contact. Pick one thing today and bump into it on purpose. By Friday Mars moves off the square and the pressure drops.
                  </div>
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
                Ask anything. Today&apos;s sky, a hard conversation, the pattern you keep running, the decision you&apos;re stalling on. The Oracle answers from inside your specific chart, your current transits, and what you&apos;ve told it before. Not a generic horoscope. Not a chatbot. A conversation with the version of the sky that&apos;s watching you.
              </p>
              <div className="quote">
                &ldquo;You are not here to be everyone&apos;s Generator. You&apos;re a 3/5 Manifesting Generator. Your work is to try, fail visibly, and become useful to the people watching.&rdquo;
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
                Each morning Solray computes what the sky is doing against your birth chart specifically, names the aspects, measures the energy across four channels you can feel, and gives you one clear sentence about how to spend the day. No vague affirmations. Actual positions, actual orbs, actual guidance.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Read it in forty seconds. Carry it all day.
              </p>
            </div>

            <div className="today-widget">
              <div className="date">Monday, 20 April</div>
              <div className="sky">Venus trine Mars · Moon waxing in Cancer</div>

              <div className="bar-row">
                <span className="bar-label">Clarity</span>
                <div className="bar">
                  <span className="fill-amber" style={{ width: "78%" }}></span>
                </div>
                <span className="bar-pct">78</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Connection</span>
                <div className="bar">
                  <span className="fill-wist" style={{ width: "88%" }}></span>
                </div>
                <span className="bar-pct">88</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Drive</span>
                <div className="bar">
                  <span className="fill-ember" style={{ width: "54%" }}></span>
                </div>
                <span className="bar-pct">54</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Stillness</span>
                <div className="bar">
                  <span className="fill-mist" style={{ width: "41%" }}></span>
                </div>
                <span className="bar-pct">41</span>
              </div>

              <div className="insight">
                A soft Venus-Mars trine is passing over your chart today. The easy thing is the right thing. Reach out to the person you&apos;ve been meaning to. Don&apos;t force the other three.
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
          <div className="today-layout" style={{ alignItems: "stretch" }}>
            <div className="souls-canvas">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="soulsSunGrad" cx="38%" cy="34%">
                    <stop offset="0%" stopColor="#fad48a" />
                    <stop offset="55%" stopColor="#f39230" />
                    <stop offset="100%" stopColor="#6a2e0a" />
                  </radialGradient>
                </defs>

                <circle cx="200" cy="150" r="130" fill="none" stroke="#1a3020" strokeWidth="0.5" />
                <circle cx="200" cy="150" r="95" fill="none" stroke="#1a3020" strokeWidth="0.5" strokeDasharray="3 4" />
                <circle cx="200" cy="150" r="60" fill="none" stroke="#1a3020" strokeWidth="0.5" />

                <line x1="200" y1="150" x2="320" y2="100" stroke="#f39230" strokeWidth="0.6" opacity="0.6" />
                <line x1="200" y1="150" x2="90" y2="120" stroke="#9b86a0" strokeWidth="0.6" opacity="0.55" />
                <line x1="200" y1="150" x2="140" y2="220" stroke="#9babb9" strokeWidth="0.6" opacity="0.45" />

                <circle cx="200" cy="150" r="22" fill="url(#soulsSunGrad)" />
                <circle cx="200" cy="150" r="22" fill="none" stroke="rgba(243,146,48,0.35)" strokeWidth="0.8" />
                <text x="200" y="155" fill="#ece4cf" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="13" textAnchor="middle">
                  you
                </text>

                <g>
                  <circle cx="320" cy="100" r="14" fill="#0e2416" stroke="#f39230" strokeWidth="0.9" />
                  <text x="320" y="104" fill="#f5a44a" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="11" textAnchor="middle">
                    Eva
                  </text>
                </g>
                <g>
                  <circle cx="90" cy="120" r="14" fill="#0e2416" stroke="#9b86a0" strokeWidth="0.9" />
                  <text x="90" y="124" fill="#9b86a0" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="11" textAnchor="middle">
                    Jon
                  </text>
                </g>
                <g>
                  <circle cx="140" cy="220" r="14" fill="#0e2416" stroke="#9babb9" strokeWidth="0.9" />
                  <text x="140" y="224" fill="#9babb9" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="11" textAnchor="middle">
                    Mom
                  </text>
                </g>

                <text x="260" y="130" fill="#8a9e8d" fontFamily="Inter" fontSize="8" letterSpacing="2">
                  TRINE · VENUS
                </text>
                <text x="120" y="142" fill="#8a9e8d" fontFamily="Inter" fontSize="8" letterSpacing="2">
                  CHANNEL 1-8
                </text>
                <text x="160" y="195" fill="#8a9e8d" fontFamily="Inter" fontSize="8" letterSpacing="2">
                  MOON CONJ.
                </text>
              </svg>
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
                Only you ever see it. Their data stays on your device.
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
            This is the Japanese way. Strip until only the essential remains. Trust the material. Make the whole thing livable before you make it beautiful, and then let beauty emerge on its own, because it will.
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
            No feature tiers. No hidden unlocks. One price, the whole map.
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
                <span className="tick">✓</span> The Oracle, chat counsel that reads your chart and remembers you
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
              <a href={APP_URL} className="btn primary">
                Begin your five days
              </a>
            </div>
          </div>
          <p className="note">Calculated with Swiss Ephemeris precision. Your data stays yours.</p>
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
              href="https://www.youtube.com/@Solray_ai"
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
          </nav>
        </div>
      </footer>
    </>
  );
}
