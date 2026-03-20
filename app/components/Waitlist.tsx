import WaitlistForm from "./WaitlistForm";

export default function Waitlist() {
  return (
    <section id="waitlist" className="relative py-32 px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Divider top */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(201,168,76,0.3))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "#c9a84c" }}
          />
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(201,168,76,0.3))",
            }}
          />
        </div>

        <h2
          className="font-heading font-light text-5xl md:text-6xl mb-4"
          style={{ color: "#f0ecf8" }}
        >
          Be among the first.
        </h2>

        <p
          className="font-body font-light text-sm leading-loose mb-10 max-w-sm mx-auto"
          style={{ color: "#7a748e" }}
        >
          Solray AI is launching soon. Join the waitlist to get early access and
          founding member pricing.
        </p>

        <WaitlistForm />

        {/* Divider bottom */}
        <div className="flex items-center justify-center gap-4 mt-14">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(155,142,196,0.2))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(155,142,196,0.3)" }}
          />
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(155,142,196,0.2))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
