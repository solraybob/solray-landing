const screens = [
  {
    name: "Today",
    tagline: "Your daily cosmic weather.",
    description:
      "A personalised forecast calculated fresh every morning from where the planets actually are.",
    icon: "☀",
    gradient: "from-amber-900/20 to-transparent",
    accent: "#c9a84c",
  },
  {
    name: "Chat",
    tagline: "Your Higher Self.",
    description:
      "An AI that holds your complete blueprint and speaks to you directly from it.",
    icon: "◉",
    gradient: "from-violet-900/20 to-transparent",
    accent: "#9b8ec4",
  },
  {
    name: "Souls",
    tagline: "Your constellation.",
    description:
      "Add people you love and explore the dynamic between your charts.",
    icon: "✦",
    gradient: "from-rose-900/20 to-transparent",
    accent: "#c49b9b",
  },
  {
    name: "Chart",
    tagline: "Your blueprint.",
    description:
      "Every planet, every gate, every Gene Key — your complete energetic map.",
    icon: "⬡",
    gradient: "from-cyan-900/20 to-transparent",
    accent: "#8ec4c4",
  },
];

export default function FourScreens() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body font-light mb-4"
            style={{ color: "#9b8ec466" }}
          >
            The App
          </p>
          <h2
            className="font-heading font-light text-4xl md:text-5xl"
            style={{ color: "#f0ecf8" }}
          >
            Four ways to know yourself
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {screens.map((screen, i) => (
            <div
              key={i}
              className="relative overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15,15,40,0.9), rgba(5,5,16,0.95))",
                border: "1px solid rgba(155,142,196,0.1)",
                borderRadius: "4px",
              }}
            >
              {/* Glow top-left corner */}
              <div
                className="absolute top-0 left-0 w-full h-32 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 120% 80% at 0% 0%, ${screen.accent}18, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                className="font-heading text-4xl mb-5 relative z-10"
                style={{ color: screen.accent }}
              >
                {screen.icon}
              </div>

              {/* Screen name */}
              <h3
                className="font-heading font-light text-2xl mb-2 relative z-10"
                style={{ color: "#e8e4f0" }}
              >
                {screen.name}
              </h3>

              {/* Tagline */}
              <p
                className="font-body text-sm font-medium mb-3 relative z-10"
                style={{ color: screen.accent }}
              >
                {screen.tagline}
              </p>

              {/* Description */}
              <p
                className="font-body font-light text-sm leading-relaxed relative z-10"
                style={{ color: "#6a6480" }}
              >
                {screen.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${screen.accent}44, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
