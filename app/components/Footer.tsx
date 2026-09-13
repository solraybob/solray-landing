import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 text-center"
      style={{ borderTop: "1px solid #E2DACA" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div
            className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: "1px solid #E2DACA" }}
          >
            <Image
              src="/solray-orb.png"
              alt="Solray"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <span
            className="font-body font-light text-sm tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            solray.ai
          </span>
        </div>

        <p
          className="font-body font-light text-xs tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          Built for those ready to know themselves.
        </p>

        <div className="flex items-center gap-6 mt-2">
          <a
            href="/legal"
            className="font-body font-light text-xs tracking-wider uppercase hover:opacity-80 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            Terms & Privacy
          </a>
          <span style={{ color: "#E2DACA" }}>·</span>
          <a
            href="mailto:support@solray.ai"
            className="font-body font-light text-xs tracking-wider uppercase hover:opacity-80 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            Contact
          </a>
          <span style={{ color: "#E2DACA" }}>·</span>
          <span
            className="font-body font-light text-xs tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            $23/month · 30-day refund
          </span>
        </div>
      </div>
    </footer>
  );
}
