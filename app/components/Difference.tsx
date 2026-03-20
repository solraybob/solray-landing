const items = [
  {
    title: "Not a horoscope",
    body: "Every person born at the same moment in the same place gets the same horoscope. Solray calculates your exact chart — down to the degree — and reads today's sky against your specific placements.",
    symbol: "♈",
  },
  {
    title: "Live engines, not templates",
    body: "Three live calculation engines run every morning: Western Astrology using Swiss Ephemeris, Human Design, and Gene Keys. Your daily reading is calculated fresh, never pre-written.",
    symbol: "⟳",
  },
  {
    title: "Your Higher Self speaks",
    body: "An AI trained to know you at a soul level. It knows your authority, your shadows, your gifts. When you ask it anything, it answers from your chart — not from a knowledge base.",
    symbol: "◈",
  },
];

export default function Difference() {
  return (
    <section className="relative py-24 px-6">
      {/* Subtle top border */}
      <div className="max-w-6xl mx-auto">
        <div
          className="h-px w-full mb-20 mx-auto"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(155,142,196,0.2), transparent)",
          }}
        />

        {/* Section label */}
        <p
          className="text-center text-xs tracking-[0.3em] uppercase font-body font-light mb-16"
          style={{ color: "#9b8ec466" }}
        >
          The Difference
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative group"
            >
              {/* Divider line (desktop) */}
              {i > 0 && (
                <div
                  className="hidden md:block absolute left-0 top-0 h-full w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(155,142,196,0.15), transparent)",
                  }}
                />
              )}

              <div className="md:px-8 text-center md:text-left">
                {/* Symbol */}
                <div
                  className="font-heading text-3xl mb-6 mx-auto md:mx-0 w-fit"
                  style={{ color: "#c9a84c55" }}
                >
                  {item.symbol}
                </div>

                <h3
                  className="font-heading font-light text-2xl md:text-3xl mb-4 leading-tight"
                  style={{ color: "#e8e4f0" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-body font-light text-sm leading-loose"
                  style={{ color: "#7a748e" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="h-px w-full mt-20 mx-auto"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(155,142,196,0.2), transparent)",
          }}
        />
      </div>
    </section>
  );
}
