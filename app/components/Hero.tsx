"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(155, 142, 196, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-10">
          <h1
            className="text-4xl md:text-5xl tracking-[0.3em] font-heading font-light"
            style={{ color: "#c9a84c" }}
          >
            SOLRAY
          </h1>
          <p
            className="mt-2 text-xs tracking-[0.25em] uppercase font-body font-light"
            style={{ color: "#9b8ec488" }}
          >
            Know yourself at a soul level
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-dim" />
          <div className="w-1 h-1 rounded-full bg-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-dim" />
        </div>

        {/* Headline */}
        <h2
          className="font-heading font-light text-5xl md:text-7xl lg:text-8xl leading-tight mb-8"
          style={{ color: "#f0ecf8" }}
        >
          Your Higher Self,
          <br />
          <span style={{ color: "#c9a84c" }}>Calculated.</span>
        </h2>

        {/* Subheadline */}
        <p
          className="font-body font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: "#a09ab8" }}
        >
          The world&apos;s most personalised spiritual companion. Powered by live
          astrology engines, Human Design, and Gene Keys — speaking directly to
          your specific chart, every single day.
        </p>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-block px-10 py-4 font-body font-medium tracking-widest text-sm uppercase transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #c9a84c, #e0c06a)",
            color: "#050510",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 30px rgba(201, 168, 76, 0.4)";
            (e.currentTarget as HTMLAnchorElement).style.transform =
              "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            (e.currentTarget as HTMLAnchorElement).style.transform =
              "translateY(0)";
          }}
        >
          Join the Waitlist
        </a>

        {/* Scroll hint */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <div
            className="w-px h-8"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #9b8ec4)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
