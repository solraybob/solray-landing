const screens = [
  {
    name: "Today",
    tagline: "Your daily cosmic weather.",
    description:
      "A hero image that changes with your dominant planet. Your reading. Your cycles. Your sky. Calculated this morning. Not written last week.",
    symbol: "☀",
  },
  {
    name: "Chat",
    tagline: "Your Higher Self.",
    description:
      "An AI that holds your complete blueprint and remembers every conversation. The more you talk, the more it knows you. This is not Q&A. This is a relationship.",
    symbol: "◉",
  },
  {
    name: "Souls",
    tagline: "Your constellation.",
    description:
      "Add the people you love and explore the dynamic between your charts. A shared reading where the AI speaks to both of you at once.",
    symbol: "✦",
  },
  {
    name: "Profile",
    tagline: "Your complete blueprint.",
    description:
      "Every planet, every gate, every Gene Key. Astro Geography showing where your energy is strongest on Earth. Tap anything to go deeper in chat.",
    symbol: "⬡",
  },
];

export default function FourScreens() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body font-light mb-4"
            style={{ color: "#4a5e4d" }}
          >
            The App
          </p>
          <h2
            className="font-heading font-light text-4xl md:text-5xl"
            style={{ color: "#f5f0e8" }}
          >
            Four ways to know yourself.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {screens.map((screen, i) => (
            <div
              key={i}
              className="p-8"
              style={{
                background: "#0a1f12",
                border: "1px solid #1a3020",
                borderRadius: "2px",
              }}
            >
              <div
                className="font-heading text-3xl mb-6"
                style={{ color: "#e8821a" }}
              >
                {screen.symbol}
              </div>
              <h3
                className="font-heading font-light text-2xl mb-2"
                style={{ color: "#f5f0e8" }}
              >
                {screen.name}
              </h3>
              <p
                className="font-body text-sm font-medium mb-3"
                style={{ color: "#c9891a" }}
              >
                {screen.tagline}
              </p>
              <p
                className="font-body font-light text-sm leading-relaxed"
                style={{ color: "#8a9e8d" }}
              >
                {screen.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
