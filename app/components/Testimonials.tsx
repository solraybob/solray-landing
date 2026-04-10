const testimonials = [
  {
    quote:
      "I've tried every astrology app. Nothing comes close to what Solray does. It knows me. The Higher Self chat gave me more clarity in one conversation than years of reading my chart alone.",
    name: "Sofia R.",
    location: "Barcelona",
    tag: "Scorpio Sun · Projector",
  },
  {
    quote:
      "The Human Design + Gene Keys combination is unlike anything else. I finally understand why I've been exhausted — and what to do about it.",
    name: "James K.",
    location: "London",
    tag: "Pisces Sun · Manifestor",
  },
  {
    quote:
      "I opened the app expecting generic horoscopes. Instead it told me something about myself I'd never articulated. Within minutes. I haven't stopped using it.",
    name: "Layla M.",
    location: "Dubai",
    tag: "Gemini Sun · Generator",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className="font-heading font-light text-5xl md:text-6xl"
            style={{ color: "#f5f0e8" }}
          >
            What people are saying
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="flex-shrink-0 p-8 min-w-full md:min-w-0"
              style={{
                background: "#0a1f12",
                border: "1px solid #1a3020",
                borderRadius: "2px",
              }}
            >
              {/* Quote */}
              <p
                className="font-body font-light text-sm leading-loose mb-8"
                style={{ color: "#d4ccc2" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Name and location */}
              <div className="mb-3">
                <p
                  className="font-heading font-light text-lg"
                  style={{ color: "#f5f0e8" }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="font-body font-light text-xs"
                  style={{ color: "#8a9e8d" }}
                >
                  {testimonial.location}
                </p>
              </div>

              {/* Tag */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-body font-light"
                style={{
                  background: "#1a3020",
                  color: "#e8821a",
                  borderRadius: "9999px",
                }}
              >
                {testimonial.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
