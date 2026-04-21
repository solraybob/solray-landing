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
              <div className="note">Skywalker framework</div>
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

          <div className="author-strip">
            <div className="book">
              <span>Book one</span>
              <em>Skywalker</em>
            </div>
            <div className="book">
              <span>Book two</span>
              <em>God Is Watching</em>
            </div>
            <div className="book">
              <span>Book three</span>
              <em>Eat The Location</em>
            </div>
            <div className="book">
              <span>Book four</span>
              <em>Bright Days, Dark Nights</em>
            </div>
            <div className="book">
              <span>Book five</span>
              <em>Meditations</em>
            </div>
            <div className="book">
              <span>Book six</span>
              <em>Superior Physique</em>
            </div>
          </div>
          <p className="small" style={{ marginTop: 22 }}>
            The framework Solray reads from, in its full form, in the author&apos;s own words.
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
      <footer>
        <div className="wrap">
          <div className="brand">Solray</div>
          <div>Iceland. Calculated with Swiss Ephemeris. Built for people, not markets.</div>
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
