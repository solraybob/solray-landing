const items = [
  {
    title: "Your horoscope describes everyone.",
    body: "Every Scorpio on earth read the same thing this morning. Solray reads your exact birth moment against today's actual sky. The result is a forecast that could not belong to anyone else alive.",
  },
  {
    title: "It remembers you.",
    body: "Most apps forget you the moment you close them. Solray's Higher Self builds a relationship with you over time. Every conversation teaches it more about how you think, what you're working through, and what you need to hear.",
  },
  {
    title: "Three systems, one voice.",
    body: "Western Astrology, Human Design, Gene Keys. Three entirely different languages for understanding a person. Solray reads all three and speaks to you in plain English, connecting the patterns across all of them.",
  },
];

export default function Difference() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-center text-xs tracking-[0.3em] uppercase font-body font-light mb-16"
          style={{ color: "#4a5e4d" }}
        >
          Why it&apos;s different
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
