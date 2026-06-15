"use client";

// Slim "add to home screen" bar pinned above the landing header. Routes to the
// app on Android/desktop (where the install dialog fires on its own origin) and
// reveals the manual Share -> Add to Home Screen step on iOS. Dismissible, and
// only shows where it can do something. When visible it adds html.has-ibar so
// the fixed nav drops below it (see globals.css).

import { useEffect, useState } from "react";

const APP_LOGIN = "https://app.solray.ai/login";
const DISMISS_KEY = "solray_ibar_dismissed_at";
const RESHOW_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

export default function InstallBar({
  text,
  iosHint,
  dismissLabel,
}: {
  text: string;
  iosHint: string;
  dismissLabel: string;
}) {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = window.navigator as Navigator & { standalone?: boolean };
    const standalone =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      nav.standalone === true;
    if (standalone) return;
    try {
      const at = Number(localStorage.getItem(DISMISS_KEY) || 0);
      if (at && Date.now() - at < RESHOW_AFTER_MS) return;
    } catch {
      /* localStorage unavailable */
    }
    const ua = window.navigator.userAgent || "";
    const iOS =
      /iphone|ipad|ipod/i.test(ua) ||
      (/Macintosh/i.test(ua) && "ontouchend" in document);
    setIsIOS(iOS);
    // Show on touch devices (the home-screen audience). Desktop visitors get
    // the in-app install button instead, so we keep the landing bar mobile-only.
    const touch = iOS || /android/i.test(ua);
    if (touch) {
      setShow(true);
      document.documentElement.classList.add("has-ibar");
    }
    return () => document.documentElement.classList.remove("has-ibar");
  }, []);

  if (!show) return null;

  const onAct = (e: React.MouseEvent) => {
    if (isIOS) {
      e.preventDefault();
      setShowHint((v) => !v);
    }
    // Non-iOS: let the link navigate to the app, where the install button lives.
  };

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* localStorage unavailable */
    }
    document.documentElement.classList.remove("has-ibar");
    setShow(false);
  };

  return (
    <div className="solray-ibar">
      <a href={APP_LOGIN} className="solray-ibar-link" onClick={onAct}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span>{text}</span>
      </a>
      <button className="solray-ibar-x" onClick={dismiss} aria-label={dismissLabel}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {showHint && isIOS && <div className="solray-ibar-hint">{iosHint}</div>}
    </div>
  );
}
