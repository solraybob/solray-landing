import WaitlistForm from "./WaitlistForm";

export default function Waitlist() {
  return (
    <section
      id="waitlist"
      className="py-32 px-6"
      style={{ borderTop: "1px solid #1a3020" }}
    >
      <div className="max-w-md mx-auto text-center">
        <h2
          className="font-heading font-light text-5xl md:text-6xl mb-4"
          style={{ color: "#f5f0e8" }}
        >
          Join the Oracle.
        </h2>

        <p
          className="font-body font-light text-sm leading-loose mb-10"
          style={{ color: "#8a9e8d" }}
        >
          Enter your email to receive cosmic intelligence directly. Early access, founding member pricing, and the oracle speaks.
        </p>

        <WaitlistForm />
      </div>
    </section>
  );
}
