const pillars = [
  {
    title: "Your chart is not a personality quiz.",
    body: "Every Scorpio on earth reads the same forecast this morning. Solray calculates your exact planetary positions, your Human Design gates, your Gene Keys profile. The result is a reading that could not belong to anyone else alive.",
    accent: "#c4623a", // ember
  },
  {
    title: "The Oracle remembers you.",
    body: "Most apps forget you the moment you close them. Solray\u2019s Higher Self builds a relationship over time. Every conversation deepens its understanding of how you think, what you are working through, and what you need to hear next.",
    accent: "#7d6680", // wisteria
  },
  {
    title: "Three ancient systems. One living voice.",
    body: "Western Astrology maps your sky. Human Design maps your body. Gene Keys maps your potential. Solray reads all three and speaks to you in plain language, connecting patterns that no single system can see alone.",
    accent: "#6b7d4a", // moss
  },
];

export default function Philosophy() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-center text-xs tracking-[0.22em] uppercase font-body font-light mb-16"
          style={{ color: "#4a5e4d" }}
        >
          What makes this different
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, i) => (
            <div
              key={i}
              className="p-8"
              style={{
                background: "#0a1f12",
                borderTop: `2px solid ${item.accent}`,
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
