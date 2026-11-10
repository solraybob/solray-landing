"use client";

/**
 * Passes a visitor's source on to the app, so a sign-up that starts on
 * solray.ai is credited to where the visitor really came from (an ad, a
 * post, a search) instead of to solray.ai itself.
 *
 * On load, every link to app.solray.ai gets this page's utm_* tags and the
 * referring site's hostname (as sref). Hostname only, never the full URL.
 * Nothing is stored here; the app keeps the first touch on the device.
 */

import { useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export default function ForwardAttribution() {
  useEffect(() => {
    try {
      const here = new URLSearchParams(window.location.search);
      const extra = new URLSearchParams();
      for (const k of UTM_KEYS) {
        const v = here.get(k);
        if (v) extra.set(k, v.slice(0, 64));
      }
      let ref = "";
      try {
        ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
      } catch { /* ignore */ }
      if (ref && !ref.endsWith("solray.ai")) extra.set("sref", ref.slice(0, 80));
      if (extra.toString() === "") return;

      document.querySelectorAll<HTMLAnchorElement>('a[href^="https://app.solray.ai"]').forEach((a) => {
        try {
          const u = new URL(a.href);
          extra.forEach((v, k) => { if (!u.searchParams.has(k)) u.searchParams.set(k, v); });
          a.href = u.toString();
        } catch { /* ignore */ }
      });
    } catch { /* attribution is best effort */ }
  }, []);
  return null;
}
