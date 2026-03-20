"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div
          className="font-heading font-light text-4xl md:text-5xl mb-4"
          style={{ color: "#e8821a" }}
        >
          You&apos;re on the list.
        </div>
        <p
          className="font-body font-light text-base"
          style={{ color: "#8a9e8d" }}
        >
          We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={status === "loading"}
          className="w-full px-5 py-4 font-body font-light text-sm outline-none transition-colors duration-200"
          style={{
            background: "#0a1f12",
            border: "1px solid #8a9e8d",
            borderRadius: "2px",
            color: "#f5f0e8",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#e8821a";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#8a9e8d";
          }}
        />

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="w-full px-5 py-4 font-body font-light text-sm outline-none transition-colors duration-200"
          style={{
            background: "#0a1f12",
            border: "1px solid #8a9e8d",
            borderRadius: "2px",
            color: "#f5f0e8",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#e8821a";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#8a9e8d";
          }}
        />

        {status === "error" && (
          <p
            className="font-body text-xs text-center"
            style={{ color: "#c49b9b" }}
          >
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-10 py-4 font-body font-medium tracking-widest text-sm uppercase transition-opacity duration-200"
          style={{
            background: status === "loading" ? "#c9891a" : "#e8821a",
            color: "#050f08",
            borderRadius: "2px",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "Joining..." : "Join the Waitlist"}
        </button>
      </div>
    </form>
  );
}
