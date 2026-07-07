"use client";

import { useEffect, useRef } from "react";

/**
 * Meteors: rare shooting stars across the living sky. One streak every
 * 9 to 18 seconds, never more than one at a time, always behind content.
 * Pure CSS animation per streak; the component only spawns and removes
 * nodes. Disabled entirely for reduced-motion, and paused in hidden tabs
 * (setTimeout throttling makes that free).
 */
export default function Meteors() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    const spawn = () => {
      if (disposed || !host) return;
      if (!document.hidden) {
        const m = document.createElement("div");
        m.className = "meteor";
        // Start in the upper band, random horizontal entry, random scale.
        m.style.top = `${4 + Math.random() * 38}vh`;
        m.style.left = `${30 + Math.random() * 75}vw`;
        m.style.setProperty("--meteor-scale", (0.55 + Math.random() * 0.75).toFixed(2));
        m.addEventListener("animationend", () => m.remove());
        host.appendChild(m);
      }
      timer = setTimeout(spawn, 9000 + Math.random() * 9000);
    };
    timer = setTimeout(spawn, 3500 + Math.random() * 4000);

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return <div ref={hostRef} className="meteor-field" aria-hidden="true" />;
}
