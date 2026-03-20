const steps = [
  {
    number: "01",
    title: "Enter your birth details",
    body: "Name, date, time, and city. That's all we need.",
  },
  {
    number: "02",
    title: "We calculate your blueprint",
    body: "Three engines run simultaneously. Your complete chart is ready in seconds.",
  },
  {
    number: "03",
    title: "Your Higher Self awakens",
    body: "Every morning, a forecast built for you. Every conversation, an AI that actually knows you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(10,10,26,0.95) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body font-light mb-4"
            style={{ color: "#9b8ec466" }}
          >
            How It Works
          </p>
          <h2
            className="font-heading font-light text-4xl md:text-5xl"
            style={{ color: "#f0ecf8" }}
          >
            Three steps to know yourself
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(155,142,196,0.2), rgba(201,168,76,0.2), transparent)",
            }}
          />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className="font-heading font-light text-6xl leading-none mb-3"
                    style={{ color: "rgba(201,168,76,0.2)" }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="font-heading font-light text-2xl md:text-3xl mb-3"
                    style={{ color: "#e8e4f0" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body font-light text-sm leading-loose"
                    style={{ color: "#7a748e" }}
                  >
                    {step.body}
                  </p>
                </div>

                {/* Center node */}
                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background:
                        i === 2 ? "#c9a84c" : "rgba(155,142,196,0.4)",
                      boxShadow:
                        i === 2
                          ? "0 0 12px rgba(201,168,76,0.5)"
                          : "0 0 8px rgba(155,142,196,0.2)",
                    }}
                  />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
