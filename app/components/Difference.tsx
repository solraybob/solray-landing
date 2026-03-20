const items = [
  {
    title: "Not a horoscope",
    body: "Every person born at the same moment in the same place gets the same horoscope. Solray calculates your exact chart, down to the degree, and reads today's sky against your specific placements.",
  },
  {
    title: "Live engines, not templates",
    body: "Three live calculation engines run every morning: Western Astrology using Swiss Ephemeris, Human Design, and Gene Keys. Your daily reading is calculated fresh, never pre-written.",
  },
  {
    title: "Your Higher Self speaks",
    body: "An AI trained to know you at a soul level. It knows your authority, your shadows, your gifts. When you ask it anything, it answers from your chart, not from a knowledge base.",
  },
];

export default function Difference() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p
          className="text-center text-xs tracking-[0.3em] uppercase font-body font-light mb-16"
          style={{ color: "#4a5e4d" }}
        >
          The Difference
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-8"
              style={{
                background: "#0a1f12",
                borderTop: "2px solid #e8821a",
                borderRadius: "2px",
              }}
            >
              <h3
                className="font-heading font-light text-2xl md:text-3xl mb-4 leading-tight"
                style={{ color: "#f5f0e8" }}
              >
                {item.title}
              </h3>
              <p
                className="font-body font-light text-sm leading-loose"
                style={{ color: "#8a9e8d" }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
