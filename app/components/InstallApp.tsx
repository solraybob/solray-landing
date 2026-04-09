"use client";

import { useState } from "react";

const iphoneSteps = [
  "Open app.solray.ai in Safari",
  "Tap the Share button (the box with an arrow pointing up)",
  'Scroll down and tap "Add to Home Screen"',
  'Tap "Add"',
];

const androidSteps = [
  "Open app.solray.ai in Chrome",
  "Tap the three-dot menu in the top right",
  'Tap "Add to Home Screen"',
  'Tap "Add"',
];

// Apple SVG icon
function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

// Android SVG icon
function AndroidIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M17.523 15.341a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-11.046 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM3.93 8.003l1.58-2.733A.75.75 0 0 1 6.8 5.62L8.48 8.5A9.026 9.026 0 0 1 12 7.75c1.24 0 2.42.25 3.52.75l1.68-2.88a.75.75 0 0 1 1.29.75l-1.58 2.733A8.993 8.993 0 0 1 21 15.75H3a8.993 8.993 0 0 1 .93-7.747zM3 17.25h18v1.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-1.5z" />
    </svg>
  );
}

// External link icon
function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

type Platform = "iphone" | "android" | null;

export default function InstallApp() {
  const [active, setActive] = useState<Platform>(null);

  const toggle = (platform: Platform) => {
    setActive((prev) => (prev === platform ? null : platform));
  };

  const steps = active === "iphone" ? iphoneSteps : active === "android" ? androidSteps : [];
  const platformLabel = active === "iphone" ? "iPhone (Safari)" : "Android (Chrome)";

  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1a3020" }}>
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase font-body font-light mb-4"
            style={{ color: "#4a5e4d" }}
          >
            Install
          </p>
          <h2
            className="font-heading font-light text-4xl md:text-5xl mb-5"
            style={{ color: "#f5f0e8" }}
          >
            Available on all devices
          </h2>
          <p
            className="font-body font-light text-sm leading-loose"
            style={{ color: "#8a9e8d" }}
          >
            No App Store required.&nbsp; Install directly to your home screen.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* iPhone */}
          <button
            onClick={() => toggle("iphone")}
            aria-expanded={active === "iphone"}
            className="flex items-center justify-center gap-3 px-7 py-4 text-sm font-body font-light tracking-widest uppercase transition-all duration-200"
            style={{
              border: `1px solid ${active === "iphone" ? "#e8821a" : "#1a3020"}`,
              color: active === "iphone" ? "#e8821a" : "#8a9e8d",
              background: active === "iphone" ? "rgba(232,130,26,0.06)" : "transparent",
              minWidth: "180px",
            }}
          >
            <AppleIcon />
            Add to iPhone
          </button>

          {/* Android */}
          <button
            onClick={() => toggle("android")}
            aria-expanded={active === "android"}
            className="flex items-center justify-center gap-3 px-7 py-4 text-sm font-body font-light tracking-widest uppercase transition-all duration-200"
            style={{
              border: `1px solid ${active === "android" ? "#e8821a" : "#1a3020"}`,
              color: active === "android" ? "#e8821a" : "#8a9e8d",
              background: active === "android" ? "rgba(232,130,26,0.06)" : "transparent",
              minWidth: "180px",
            }}
          >
            <AndroidIcon />
            Add to Android
          </button>

          {/* Open Web */}
          <a
            href="https://app.solray.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-7 py-4 text-sm font-body font-light tracking-widest uppercase transition-all duration-200"
            style={{
              border: "1px solid #1a3020",
              color: "#8a9e8d",
              minWidth: "180px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e8821a";
              (e.currentTarget as HTMLAnchorElement).style.color = "#e8821a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a3020";
              (e.currentTarget as HTMLAnchorElement).style.color = "#8a9e8d";
            }}
          >
            <ExternalLinkIcon />
            Open the App
          </a>
        </div>

        {/* Step-by-step guide */}
        {active && (
          <div
            className="mt-10 p-8"
            style={{
              border: "1px solid #1a3020",
              background: "rgba(232,130,26,0.03)",
            }}
          >
            <p
              className="text-xs tracking-[0.25em] uppercase font-body font-light mb-6"
              style={{ color: "#4a5e4d" }}
            >
              {platformLabel} · How to install
            </p>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <span
                    className="font-heading font-light text-2xl leading-none flex-shrink-0 w-8"
                    style={{ color: "#e8821a" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-body font-light text-sm leading-loose pt-1"
                    style={{ color: "#8a9e8d" }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
