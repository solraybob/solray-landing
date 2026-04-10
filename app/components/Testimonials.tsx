const testimonials = [
  {
    quote:
      "I have tried every astrology app. Nothing comes close to what Solray does. The Higher Self chat gave me more clarity in one conversation than years of reading my chart on my own. It actually knows me.",
    name: "Sofia R.",
    location: "Barcelona",
    tag: "Scorpio Sun · Projector",
  },
  {
    quote:
      "The Human Design and Gene Keys combination changed how I understand my energy. I finally get why I have been exhausted for years. And I know what to do about it.",
    name: "James K.",
    location: "London",
    tag: "Pisces Sun · Manifestor",
  },
  {
    quote:
      "I opened the app expecting generic horoscopes. Instead it told me something about myself I had never been able to put into words. Within minutes. I have not stopped using it.",
    name: "Layla M.",
    location: "Dubai",
    tag: "Gemini Sun · Generator",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body font-light mb-4"
            style={{ color: "#4a5e4d" }}
          >
            From the community
          </p>
          <h2
            className="font-heading font-light text-4xl md:text-5xl"
            style={{ color: "#f5f0e8" }}
          >
            What people are saying.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col p-8"
              style={{
                background: "#0a1f12",
                border: "1px solid #1a3020",
                borderRadius: "2px",
              }}
            >
              <p
                className="font-body font-light text-sm leading-loose mb-8 flex-1"
                style={{ color: "#d4ccc2" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <p
                  className="font-heading font-light text-lg mb-0.5"
                  style={{ color: "#f5f0e8" }}
                >
                  {t.name}
                </p>
                <p
                  className="font-body font-light text-xs mb-3"
                  style={{ color: "#8a9e8d" }}
                >
                  {t.location}
                </p>
                <span
                  className="inline-block px-3 py-1 text-xs font-body font-light"
                  style={{
                    background: "#1a3020",
                    color: "#e8821a",
                    borderRadius: "9999px",
                  }}
                >
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
