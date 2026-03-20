import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #071510 0%, #050f08 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Nav-style logo row */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: "1px solid #1a3020" }}>
            <Image
              src="/logo.jpg"
              alt="Solray AI"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <span
            className="font-body font-light text-sm tracking-[0.25em] uppercase"
            style={{ color: "#8a9e8d" }}
          >
            SOLRAY AI
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-light text-5xl md:text-7xl lg:text-8xl leading-tight mb-8"
          style={{ color: "#f5f0e8" }}
        >
          Your Higher Self,
          <br />
          <span style={{ color: "#e8821a" }}>Calculated.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="font-body font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: "#8a9e8d" }}
        >
          The most personalised spiritual companion ever built. Powered by live
          calculation engines that know your exact chart. Not your sun sign.
        </p>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-block px-10 py-4 font-body font-medium tracking-widest text-sm uppercase"
          style={{
            background: "#e8821a",
            color: "#050f08",
            borderRadius: "2px",
          }}
        >
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}
