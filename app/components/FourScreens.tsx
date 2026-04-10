const screens = [
  {
    name: "Today",
    tagline: "What the sky is saying to you.",
    description:
      "Every morning, a reading built only for you. Your cycles, your transits, your energy levels. Calculated for today. Nobody else on earth gets this exact forecast.",
    symbol: "☀",
  },
  {
    name: "Chat",
    tagline: "The conversation you have been waiting for.",
    description:
      "An AI that knows your complete chart and remembers every session. Ask it anything. It answers from who you actually are, not from generic wisdom. The more you talk, the better it knows you.",
    symbol: "◉",
  },
  {
    name: "Souls",
    tagline: "The people who shape you.",
    description:
      "Connect with the people in your life and see the real dynamic between your charts. A shared reading where your Higher Self speaks to both of you at once.",
    symbol: "✦",
  },
  {
    name: "Profile",
    tagline: "Every layer of who you are.",
    description:
      "Your complete chart. Every planet, every Human Design gate, every Gene Key. A world map showing where your energy is strongest on Earth. Tap anything to go deeper.",
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
            Inside the app
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
