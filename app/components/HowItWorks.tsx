const steps = [
  {
    number: "01",
    title: "See your chart before you sign up.",
    body: "Enter your birth date, time and city. We calculate your Sun, Moon, Rising and Human Design type instantly. No account. No email. Just your chart.",
  },
  {
    number: "02",
    title: "Your full blueprint in seconds.",
    body: "Three engines run simultaneously: Western Astrology, Human Design, Gene Keys. Your complete chart is ready the moment you finish onboarding.",
  },
  {
    number: "03",
    title: "Your Higher Self wakes up with you.",
    body: "Every morning a forecast built only for you. Every conversation an AI that knows your chart, remembers your sessions, and speaks to who you actually are.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body font-light mb-4"
            style={{ color: "#4a5e4d" }}
          >
            How It Works
          </p>
          <h2
            className="font-heading font-light text-4xl md:text-5xl"
            style={{ color: "#f5f0e8" }}
          >
            Three steps to know yourself.
          </h2>
        </div>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-8 items-start">
              <div
                className="font-heading font-light text-4xl leading-none flex-shrink-0 w-12"
                style={{ color: "#e8821a" }}
              >
                {step.number}
              </div>
              <div className="pt-1">
                <h3
                  className="font-heading font-light text-2xl md:text-3xl mb-3"
                  style={{ color: "#f5f0e8" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body font-light text-sm leading-loose"
                  style={{ color: "#8a9e8d" }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
