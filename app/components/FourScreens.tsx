const screens = [
  {
    name: "Today",
    tagline: "Your daily cosmic weather.",
    description:
      "A personalised forecast calculated fresh every morning from where the planets actually are.",
    symbol: "☀",
  },
  {
    name: "Chat",
    tagline: "Your Higher Self.",
    description:
      "An AI that holds your complete blueprint and speaks to you directly from it.",
    symbol: "◉",
  },
  {
    name: "Souls",
    tagline: "Your constellation.",
    description:
      "Add people you love and explore the dynamic between your charts.",
    symbol: "✦",
  },
  {
    name: "Chart",
    tagline: "Your blueprint.",
    description:
      "Every planet, every gate, every Gene Key. Your complete energetic map.",
    symbol: "⬡",
  },
];

export default function FourScreens() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
            Four ways to know yourself
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
              {/* Symbol */}
              <div
                className="font-heading text-3xl mb-6"
                style={{ color: "#e8821a" }}
              >
                {screen.symbol}
              </div>

              {/* Screen name */}
              <h3
                className="font-heading font-light text-2xl mb-2"
                style={{ color: "#f5f0e8" }}
              >
                {screen.name}
              </h3>

              {/* Tagline */}
              <p
                className="font-body text-sm font-medium mb-3"
                style={{ color: "#c9891a" }}
              >
                {screen.tagline}
              </p>

              {/* Description */}
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
