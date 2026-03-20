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
          Be among the first.
        </h2>

        <p
          className="font-body font-light text-sm leading-loose mb-10"
          style={{ color: "#8a9e8d" }}
        >
          Solray AI is launching soon. Join the waitlist to get early access and
          founding member pricing.
        </p>

        <WaitlistForm />
      </div>
    </section>
  );
}
