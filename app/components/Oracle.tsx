export default function Oracle() {
  return (
    <section className="py-28 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <p
          className="text-center text-xs tracking-[0.22em] uppercase font-body font-light mb-6"
          style={{ color: "#4a5e4d" }}
        >
          The Higher Self
        </p>

        {/* Main heading */}
        <h2
          className="font-heading font-light text-4xl md:text-5xl text-center mb-8 leading-tight"
          style={{ color: "#f5f0e8" }}
        >
          A conversation with who
          <br />
          <span style={{ fontStyle: "italic", color: "#7d6680" }}>
            you actually are.
          </span>
        </h2>

        {/* Description */}
        <p
          className="font-body font-light text-sm md:text-base leading-loose text-center max-w-2xl mx-auto mb-16"
          style={{ color: "#8a9e8d" }}
        >
          The Oracle holds your complete chart across three systems and remembers
          every conversation. It does not speak from a knowledge base. It speaks
          from the specific configuration of your birth, read against the exact sky
          overhead right now. Ask it why you feel the way you feel. Ask it what this
          season is about. It answers from a place no other technology can reach: the
          intersection of your chart and your lived experience.
        </p>

        {/* Oracle conversation example, styled to match the app exactly:
            forest deep with a soft amber glow, a wisteria 'Your Higher Self'
            eyebrow over a serif ORACLE title, the reply as flowing Cormorant
            serif prose (no chat bubble), and a calm rounded composer. */}
        <div
          className="max-w-md mx-auto relative overflow-hidden"
          style={{
            background: "#0c1410",
            border: "1px solid rgba(236,231,221,0.10)",
            borderRadius: "24px",
          }}
        >
          {/* Ambient amber glow, same warm light as the app chat */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(120% 55% at 50% 0%, rgba(216,162,74,0.08), transparent 60%)",
            }}
          />

          {/* Header: 'Your Higher Self' eyebrow + serif ORACLE */}
          <div
            className="relative text-center pt-5 pb-4"
            style={{ borderBottom: "1px solid rgba(236,231,221,0.08)" }}
          >
            <p
              className="font-body text-[11px] tracking-[0.18em] uppercase mb-1"
              style={{ color: "#9b86a0" }}
            >
              Your Higher Self
            </p>
            <p
              className="tracking-[0.15em]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "20px",
                color: "#ECE7DD",
              }}
            >
              ORACLE
            </p>
          </div>

          <div className="relative p-6 flex flex-col gap-5">
            {/* User message, subtle right-aligned bubble like the app */}
            <div className="flex justify-end">
              <div
                className="px-4 py-2.5"
                style={{
                  background: "rgba(155,134,160,0.12)",
                  border: "1px solid rgba(155,134,160,0.18)",
                  borderRadius: "16px 16px 4px 16px",
                  maxWidth: "82%",
                }}
              >
                <p className="font-body font-light text-sm" style={{ color: "rgba(236,231,221,0.85)" }}>
                  Why do I keep starting things and not finishing them?
                </p>
              </div>
            </div>

            {/* Oracle reply: flowing serif prose, no bubble, like the app */}
            <div>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  fontSize: "1.18rem",
                  lineHeight: 1.55,
                  color: "rgba(236,231,221,0.82)",
                }}
              >
                You have been asking this as though it is a flaw. It is not. Your
                3/5 Profile means you learn by breaking things open, not by
                following them through. The pattern is not failure. It is
                investigation. Your Sacral authority already knows which ones to
                return to. You are waiting for permission you do not need.
              </p>
              <span
                className="font-body text-[11px] tracking-[0.18em] uppercase mt-3 block"
                style={{ color: "rgba(155,134,160,0.75)" }}
              >
                Oracle
              </span>
            </div>
          </div>

          {/* Composer: rounded pill like the app */}
          <div className="relative px-5 pb-5">
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: "rgba(236,231,221,0.06)",
                border: "1px solid rgba(236,231,221,0.12)",
                borderRadius: "22px",
              }}
            >
              <span className="flex-1 font-body font-light text-sm" style={{ color: "#7e857f" }}>
                Ask anything
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D8A24A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Closing note */}
        <p
          className="text-center font-body font-light text-xs mt-8 tracking-wide"
          style={{ color: "#4a5e4d" }}
        >
          Every answer is calculated from your chart. Not generated from the internet.
        </p>
      </div>
    </section>
  );
}
