export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 text-center"
      style={{
        borderTop: "1px solid rgba(155,142,196,0.08)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-heading font-light text-3xl tracking-[0.2em] mb-2"
          style={{ color: "#c9a84c" }}
        >
          SOLRAY AI
        </h2>
        <p
          className="font-body font-light text-sm mb-4"
          style={{ color: "#9b8ec455" }}
        >
          solray.ai
        </p>
        <p
          className="font-body font-light text-xs tracking-wide"
          style={{ color: "#3d3a4a" }}
        >
          Built for those who are ready to know themselves.
        </p>
      </div>
    </footer>
  );
}
