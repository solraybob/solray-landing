"use client";

/**
 * LifeLayer v2: the cosmos edition.
 *
 * Progressive enhancement only. Renders nothing; on mount it decorates the
 * already-rendered DOM. Works identically for / and /es because it reads the
 * page by class, not by component tree. Without JavaScript, or with reduced
 * motion, the page is exactly the still page that shipped before this file.
 *
 * v2 turns the page into one continuous night sky:
 *  - a fixed full-page canvas cosmos behind everything (z-index -1): three
 *    parallax depth bands of stars, drifting nebula fields that change hue
 *    as you travel down the page, and rare shooting stars
 *  - a slowly turning astronomical instrument ring behind the hero
 *  - the headline writes itself letter by letter, blur to sharp
 *  - constellation dividers that draw themselves between sections
 *  - the closing invocation lights up word by word as you read it
 *  - magnetic primary buttons, self-drawing card glyphs, aurora borders
 *  - everything from v1: reveals, Oracle replay, counting bars, tilt
 *
 * Performance contract: ONE rAF loop for the cosmos (parked when the tab is
 * hidden), one IntersectionObserver for reveals, scroll work is rAF-gated,
 * transforms and opacity only, zero layout reads inside frames.
 */

import { useEffect } from "react";

type RGB = [number, number, number];

const STAR_PALETTE: [string, number][] = [
  ["242,236,216", 0.55], // pearl
  ["243,146,48", 0.16],  // amber
  ["155,134,160", 0.14], // wisteria
  ["155,171,185", 0.15], // mist
];

// Nebula hue journey down the page: forest-amber dawn at the hero, deep
// indigo-wisteria night around the Oracle, ember warmth by the pricing close.
const NEBULA_STOPS: { at: number; a: RGB; b: RGB }[] = [
  { at: 0.0, a: [243, 146, 48], b: [156, 175, 120] },
  { at: 0.35, a: [106, 134, 146], b: [155, 134, 160] },
  { at: 0.7, a: [155, 134, 160], b: [212, 122, 82] },
  { at: 1.0, a: [212, 122, 82], b: [243, 146, 48] },
];

function lerp(a: number, b: number, k: number) { return a + (b - a) * k; }
function lerpRGB(a: RGB, b: RGB, k: number): RGB {
  return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
}
function nebulaAt(progress: number): { a: RGB; b: RGB } {
  for (let i = 0; i < NEBULA_STOPS.length - 1; i++) {
    const s0 = NEBULA_STOPS[i], s1 = NEBULA_STOPS[i + 1];
    if (progress <= s1.at) {
      const k = (progress - s0.at) / (s1.at - s0.at || 1);
      return { a: lerpRGB(s0.a, s1.a, k), b: lerpRGB(s0.b, s1.b, k) };
    }
  }
  return { a: NEBULA_STOPS[3].a, b: NEBULA_STOPS[3].b };
}

function pickStarColor(): string {
  let r = Math.random();
  for (const [rgb, w] of STAR_PALETTE) {
    if ((r -= w) <= 0) return rgb;
  }
  return STAR_PALETTE[0][0];
}

export default function LifeLayer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("alive");

    const cleanups: (() => void)[] = [];
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    /* ------------------------------------------------------------------ */
    /* 0. Film grain: one static turbulence field over everything          */
    /* ------------------------------------------------------------------ */
    const grain = document.createElement("div");
    grain.className = "alv-grain";
    grain.setAttribute("aria-hidden", "true");
    document.body.appendChild(grain);
    cleanups.push(() => grain.remove());

    /* ------------------------------------------------------------------ */
    /* 1. The cosmos: full-page fixed canvas behind everything             */
    /* ------------------------------------------------------------------ */
    const cosmos = document.createElement("div");
    cosmos.className = "alv-cosmos";
    cosmos.setAttribute("aria-hidden", "true");
    const canvas = document.createElement("canvas");
    cosmos.appendChild(canvas);
    document.body.appendChild(cosmos);
    const ctx = canvas.getContext("2d");

    type Star = {
      x: number; y: number; r: number; rgb: string;
      base: number; amp: number; phase: number; speed: number;
      vx: number; vy: number; band: number; // 0 far, 1 mid, 2 near
    };
    let stars: Star[] = [];
    let w = 0, h = 0, dpr = 1, docH = 1;

    const seed = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      docH = Math.max(document.documentElement.scrollHeight - h, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const count = Math.round(Math.min(coarse ? 110 : 230, (w * h) / (coarse ? 11000 : 7000)));
      stars = Array.from({ length: count }, () => {
        const band = Math.random() < 0.45 ? 0 : Math.random() < 0.65 ? 1 : 2;
        const depth = [0.4, 0.7, 1][band];
        return {
          x: Math.random() * w,
          // Seed across one viewport plus parallax headroom.
          y: Math.random() * (h * 1.6),
          r: (0.35 + Math.random() * 1.1) * depth,
          rgb: pickStarColor(),
          base: 0.1 + Math.random() * 0.38,
          amp: 0.08 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.85,
          vx: (Math.random() - 0.5) * 0.01 * depth,
          vy: (Math.random() - 0.4) * 0.007 * depth,
          band,
        };
      });
    };
    seed();

    // Parallax rates per band: far stars barely move with scroll, near ones
    // travel, which is what gives the page its depth as you descend.
    const BAND_RATE = [0.04, 0.1, 0.18];
    const WRAP = () => h * 1.6;

    let shoot: { x: number; y: number; vx: number; vy: number; life: number; max: number } | null = null;
    let nextShootAt = performance.now() + 4500 + Math.random() * 6000;

    let px = 0, py = 0, tx = 0, ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = ((e.clientX - w / 2) / (w / 2)) * 8;
      ty = ((e.clientY - h / 2) / (h / 2)) * 6;
    };
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

    let rafId = 0;
    let last = performance.now();
    const frame = (now: number) => {
      rafId = 0;
      if (!ctx || document.hidden) return;
      const dt = Math.min(now - last, 50);
      last = now;
      const t = now / 1000;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / docH, 1);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Nebula fields: two vast soft radial blobs, hue keyed to where you
      // are on the page, drifting on slow sines. Painted first, far back.
      const { a, b } = nebulaAt(progress);
      const n1x = w * (0.28 + 0.1 * Math.sin(t * 0.05));
      const n1y = h * (0.3 + 0.08 * Math.cos(t * 0.04));
      const n2x = w * (0.74 + 0.08 * Math.cos(t * 0.045));
      const n2y = h * (0.66 + 0.09 * Math.sin(t * 0.06));
      const nr = Math.max(w, h) * 0.55;
      const g1 = ctx.createRadialGradient(n1x, n1y, 0, n1x, n1y, nr);
      g1.addColorStop(0, `rgba(${a[0] | 0},${a[1] | 0},${a[2] | 0},0.05)`);
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(n2x, n2y, 0, n2x, n2y, nr * 0.9);
      g2.addColorStop(0, `rgba(${b[0] | 0},${b[1] | 0},${b[2] | 0},0.045)`);
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Stars, three depth bands, scroll parallax via per-band offset.
      for (const s of stars) {
        s.x += s.vx * dt * 0.06;
        s.y += s.vy * dt * 0.06;
        if (s.x < -2) s.x = w + 2; else if (s.x > w + 2) s.x = -2;
        const wrap = WRAP();
        let sy = (s.y - scrollY * BAND_RATE[s.band]) % wrap;
        if (sy < -4) sy += wrap;
        if (sy > h + 4) continue;
        const alpha = s.base + s.amp * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Shooting star, page-wide, rare.
      if (!shoot && now > nextShootAt) {
        const fromLeft = Math.random() > 0.5;
        shoot = {
          x: fromLeft ? -20 : w * (0.3 + Math.random() * 0.6),
          y: h * (0.05 + Math.random() * 0.45),
          vx: (fromLeft ? 1 : 0.75) * (0.55 + Math.random() * 0.35),
          vy: 0.16 + Math.random() * 0.12,
          life: 0,
          max: 700 + Math.random() * 350,
        };
        nextShootAt = now + 9000 + Math.random() * 14000;
      }
      if (shoot) {
        shoot.life += dt;
        shoot.x += shoot.vx * dt;
        shoot.y += shoot.vy * dt;
        const k = shoot.life / shoot.max;
        const fade = k < 0.2 ? k / 0.2 : 1 - (k - 0.2) / 0.8;
        const len = 90;
        const grad = ctx.createLinearGradient(
          shoot.x, shoot.y, shoot.x - shoot.vx * len, shoot.y - shoot.vy * len
        );
        grad.addColorStop(0, `rgba(242,236,216,${(0.85 * fade).toFixed(3)})`);
        grad.addColorStop(1, "rgba(242,236,216,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(shoot.x, shoot.y);
        ctx.lineTo(shoot.x - shoot.vx * len, shoot.y - shoot.vy * len);
        ctx.stroke();
        if (k >= 1 || shoot.x > w + 40 || shoot.y > h + 40) shoot = null;
      }

      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      canvas.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    const onVis = () => {
      if (!document.hidden && !rafId) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        seed();
        return;
      }
      // Height-only resize = the mobile URL bar collapsing during scroll.
      // Resize the canvas and keep every star exactly where it was;
      // reseeding here made the whole sky jump back and forth on Android.
      h = window.innerHeight;
      docH = Math.max(document.documentElement.scrollHeight - h, 1);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
    };
    window.addEventListener("resize", onResize, { passive: true });
    cleanups.push(() => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      if (finePointer) window.removeEventListener("pointermove", onPointer);
      cosmos.remove();
    });

    /* ------------------------------------------------------------------ */
    /* 2. The instrument: a slowly turning astronomical ring in the hero   */
    /* ------------------------------------------------------------------ */
    const hero = document.querySelector("section.hero") as HTMLElement | null;
    if (hero) {
      const NS = "http://www.w3.org/2000/svg";
      const ring = document.createElementNS(NS, "svg");
      ring.setAttribute("viewBox", "0 0 1000 1000");
      ring.setAttribute("class", "alv-instrument");
      ring.setAttribute("aria-hidden", "true");
      const C = 500;
      const circle = (r: number, opacity: number, dash?: string) => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", String(C)); c.setAttribute("cy", String(C));
        c.setAttribute("r", String(r));
        c.setAttribute("fill", "none");
        c.setAttribute("stroke", "rgba(242,236,216,1)");
        c.setAttribute("stroke-opacity", String(opacity));
        c.setAttribute("stroke-width", "1");
        if (dash) c.setAttribute("stroke-dasharray", dash);
        ring.appendChild(c);
      };
      circle(478, 0.07);
      circle(430, 0.05, "1 7");
      circle(360, 0.06);
      // 12 house ticks + 60 minor ticks, an instrument bezel, no glyphs.
      for (let i = 0; i < 60; i++) {
        const major = i % 5 === 0;
        const ang = (i / 60) * Math.PI * 2;
        const r1 = major ? 452 : 466;
        const r2 = 478;
        const line = document.createElementNS(NS, "line");
        line.setAttribute("x1", String(C + r1 * Math.cos(ang)));
        line.setAttribute("y1", String(C + r1 * Math.sin(ang)));
        line.setAttribute("x2", String(C + r2 * Math.cos(ang)));
        line.setAttribute("y2", String(C + r2 * Math.sin(ang)));
        line.setAttribute("stroke", "rgba(242,236,216,1)");
        line.setAttribute("stroke-opacity", major ? "0.1" : "0.05");
        line.setAttribute("stroke-width", major ? "1.4" : "0.8");
        ring.appendChild(line);
      }
      // A few small diamonds riding the middle track, like markers.
      for (let i = 0; i < 4; i++) {
        const ang = (i / 4) * Math.PI * 2 + Math.PI / 6;
        const x = C + 430 * Math.cos(ang), y = C + 430 * Math.sin(ang);
        const d = document.createElementNS(NS, "path");
        d.setAttribute("d", `M ${x} ${y - 5} L ${x + 5} ${y} L ${x} ${y + 5} L ${x - 5} ${y} Z`);
        d.setAttribute("fill", "rgba(243,146,48,0.18)");
        ring.appendChild(d);
      }
      hero.insertBefore(ring, hero.firstChild);
      // Counter-rotating inner echo.
      const ring2 = ring.cloneNode(true) as SVGElement;
      ring2.setAttribute("class", "alv-instrument alv-instrument-inner");
      hero.insertBefore(ring2, hero.firstChild);
      cleanups.push(() => { ring.remove(); ring2.remove(); });
    }

    /* ------------------------------------------------------------------ */
    /* 3. Headline writes itself, letter by letter, blur to sharp          */
    /* ------------------------------------------------------------------ */
    const headline = hero?.querySelector("h1.display") as HTMLElement | null;
    if (headline) {
      let li = 0;
      const splitNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          for (const ch of node.textContent || "") {
            if (ch === " ") { frag.appendChild(document.createTextNode(" ")); continue; }
            const s = document.createElement("span");
            s.className = "alv-letter";
            s.style.setProperty("--ld", `${420 + li * 26}ms`);
            s.textContent = ch;
            frag.appendChild(s);
            li++;
          }
          node.parentNode?.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName !== "BR") {
          Array.from(node.childNodes).forEach(splitNode);
        }
      };
      Array.from(headline.childNodes).forEach(splitNode);
      headline.classList.add("alv-letters");
    }

    /* ------------------------------------------------------------------ */
    /* 4. Scroll reveals                                                   */
    /* ------------------------------------------------------------------ */
    const toReveal: HTMLElement[] = [];
    const mark = (el: Element, delayMs = 0) => {
      const h2 = el as HTMLElement;
      h2.classList.add("alv");
      if (delayMs) h2.style.setProperty("--alv-d", `${delayMs}ms`);
      toReveal.push(h2);
    };
    document
      .querySelectorAll(
        ".section-head, .oracle-copy, .today-copy, .souls-copy, .philosophy .narrow > *, .pricing .narrow > .eyebrow, .pricing .narrow > .section, .pricing .narrow > .kicker, .pricing-card, .pricing .note, .faq .narrow > *, .invocation .sig, .today-widget, .bond-mock, .phone"
      )
      .forEach((el) => mark(el));
    document.querySelectorAll(".three .card").forEach((el, i) => mark(el, i * 120));
    document.querySelectorAll(".pricing-card li").forEach((el, i) => mark(el, 80 + i * 70));
    document.querySelectorAll(".faq-item").forEach((el, i) => mark(el, i * 70));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("alv-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -7% 0px" }
    );
    toReveal.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* ------------------------------------------------------------------ */
    /* 5. Hero entrance cascade                                            */
    /* ------------------------------------------------------------------ */
    if (hero) {
      const order = [".sun-mark", ".brand-lockup", "h1.display", ".hero-sub", ".hero-ctas", ".hero-tag", ".specimen"];
      const els: HTMLElement[] = [];
      order.forEach((sel, i) => {
        const el = hero.querySelector(sel) as HTMLElement | null;
        if (!el) return;
        el.classList.add("alv", "alv-hero");
        el.style.setProperty("--alv-d", `${120 + i * 130}ms`);
        els.push(el);
      });
      hero.querySelectorAll(".specimen .row").forEach((row, i) => {
        const h3 = row as HTMLElement;
        h3.classList.add("alv", "alv-hero");
        h3.style.setProperty("--alv-d", `${1050 + i * 110}ms`);
        els.push(h3);
      });
      const revealHero = () =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            els.forEach((el) => el.classList.add("alv-in"));
            headline?.classList.add("alv-letters-in");
          })
        );
      if (document.hidden) {
        const once = () => {
          if (document.hidden) return;
          document.removeEventListener("visibilitychange", once);
          revealHero();
        };
        document.addEventListener("visibilitychange", once);
        cleanups.push(() => document.removeEventListener("visibilitychange", once));
      } else {
        revealHero();
      }
      const failsafe = setTimeout(() => {
        els.forEach((el) => el.classList.add("alv-in"));
        headline?.classList.add("alv-letters-in");
      }, 3000);
      cleanups.push(() => clearTimeout(failsafe));
      hero.querySelector(".specimen .row:last-child")?.classList.add("alv-live-row");
    }

    /* ------------------------------------------------------------------ */
    /* 6. Constellation dividers: each .rule draws a tiny asterism         */
    /* ------------------------------------------------------------------ */
    document.querySelectorAll(".rule").forEach((rule) => {
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", "0 0 160 24");
      svg.setAttribute("class", "alv-asterism");
      svg.setAttribute("aria-hidden", "true");
      // A five-point asterism, slightly irregular, like a real little cluster.
      const pts = [
        [14, 14], [52, 8], [80, 16], [108, 7], [146, 13],
      ];
      const path = document.createElementNS(NS, "path");
      path.setAttribute(
        "d",
        pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ")
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(242,236,216,0.22)");
      path.setAttribute("stroke-width", "0.7");
      path.setAttribute("pathLength", "1");
      path.setAttribute("class", "alv-asterism-line");
      svg.appendChild(path);
      pts.forEach(([x, y], i) => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", String(x)); c.setAttribute("cy", String(y));
        c.setAttribute("r", i === 2 ? "2" : "1.3");
        c.setAttribute("fill", i === 2 ? "rgba(243,146,48,0.8)" : "rgba(242,236,216,0.7)");
        c.setAttribute("class", "alv-asterism-star");
        (c as unknown as HTMLElement).style?.setProperty("--si", String(i));
        svg.appendChild(c);
      });
      rule.classList.add("alv-rule");
      rule.appendChild(svg);
      io.observe(rule);
      rule.classList.add("alv");
    });

    /* ------------------------------------------------------------------ */
    /* 7. Oracle conversation replay                                       */
    /* ------------------------------------------------------------------ */
    const phone = document.querySelector(".phone");
    const chat = document.querySelector(".chat-scroll");
    if (phone && chat) {
      const turns = Array.from(chat.children) as HTMLElement[];
      turns.forEach((el) => el.classList.add("alv-msg"));
      const timer: { id: ReturnType<typeof setTimeout> | null } = { id: null };

      // The Oracle WRITES. Collect an element's text nodes (keeping inline
      // tags like <em> intact), blank them, then refill character by
      // character with a human rhythm: faster mid-word, a breath at
      // sentence ends.
      const typeInto = (el: HTMLElement, done: () => void) => {
        const nodes: { node: Node; full: string }[] = [];
        const collect = (n: Node) => {
          if (n.nodeType === Node.TEXT_NODE) {
            nodes.push({ node: n, full: n.textContent || "" });
            n.textContent = "";
          } else {
            Array.from(n.childNodes).forEach(collect);
          }
        };
        collect(el);
        let ni = 0, ci = 0;
        const step = () => {
          if (ni >= nodes.length) { done(); return; }
          const cur = nodes[ni];
          if (ci >= cur.full.length) { ni++; ci = 0; timer.id = setTimeout(step, 0); return; }
          const ch = cur.full[ci];
          cur.node.textContent = cur.full.slice(0, ++ci);
          const pause =
            ch === "." || ch === "?" ? 190 :
            ch === "," ? 90 :
            10 + Math.random() * 18;
          timer.id = setTimeout(step, pause);
        };
        step();
      };

      const playFrom = (i: number) => {
        if (i >= turns.length) return;
        const el = turns[i];
        const isBubble = el.classList.contains("bubble");
        const isOracle = el.classList.contains("oracle");
        if (isBubble && isOracle) {
          const dots = document.createElement("div");
          dots.className = "alv-typing";
          dots.innerHTML = "<span></span><span></span><span></span>";
          el.before(dots);
          timer.id = setTimeout(() => {
            dots.remove();
            el.classList.add("alv-msg-in", "alv-writing");
            typeInto(el, () => {
              el.classList.remove("alv-writing");
              timer.id = setTimeout(() => playFrom(i + 1), 380);
            });
          }, 950);
        } else {
          el.classList.add("alv-msg-in");
          timer.id = setTimeout(() => playFrom(i + 1), isBubble ? 650 : 140);
        }
      };
      const chatIO = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            chatIO.disconnect();
            timer.id = setTimeout(() => playFrom(0), 350);
          }
        },
        { threshold: 0.45 }
      );
      chatIO.observe(phone);
      cleanups.push(() => {
        chatIO.disconnect();
        if (timer.id) clearTimeout(timer.id);
      });
    }

    /* ------------------------------------------------------------------ */
    /* 8. Energy bars fill + count                                         */
    /* ------------------------------------------------------------------ */
    const widget = document.querySelector(".today-widget");
    if (widget) {
      const rows = Array.from(widget.querySelectorAll(".bar-row")) as HTMLElement[];
      const targets: { fill: HTMLElement; pct: HTMLElement; value: number }[] = [];
      rows.forEach((row) => {
        const fill = row.querySelector(".bar span, .bar > span") as HTMLElement | null;
        const pct = row.querySelector(".bar-pct") as HTMLElement | null;
        if (!fill || !pct) return;
        const value = parseInt(pct.textContent || "0", 10) || 0;
        fill.style.width = "0%";
        fill.classList.add("alv-fill");
        pct.textContent = "0";
        targets.push({ fill, pct, value });
      });
      let counted = false;
      const barIO = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting || counted) return;
          counted = true;
          barIO.disconnect();
          targets.forEach(({ fill, pct, value }, i) => {
            setTimeout(() => {
              fill.style.width = `${value}%`;
              const t0 = performance.now();
              const dur = 1100;
              const tick = (now: number) => {
                const k = Math.min((now - t0) / dur, 1);
                pct.textContent = String(Math.round(value * (1 - Math.pow(1 - k, 3))));
                if (k < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            }, i * 140);
          });
        },
        { threshold: 0.5 }
      );
      barIO.observe(widget);
      cleanups.push(() => barIO.disconnect());
    }

    /* ------------------------------------------------------------------ */
    /* 9. Invocation lights up word by word as you read                    */
    /* ------------------------------------------------------------------ */
    const invocation = document.querySelector(".invocation p") as HTMLElement | null;
    const invocationSection = document.querySelector("section.invocation") as HTMLElement | null;
    if (invocation && invocationSection) {
      const words: HTMLElement[] = [];
      const split = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          (node.textContent || "").split(/(\s+)/).forEach((piece) => {
            if (!piece.trim()) { frag.appendChild(document.createTextNode(piece)); return; }
            const s = document.createElement("span");
            s.className = "alv-word";
            s.textContent = piece;
            frag.appendChild(s);
            words.push(s);
          });
          node.parentNode?.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName !== "BR") {
          Array.from(node.childNodes).forEach(split);
        }
      };
      Array.from(invocation.childNodes).forEach(split);

      let invRaf = 0;
      const onScrollInv = () => {
        if (invRaf) return;
        invRaf = requestAnimationFrame(() => {
          invRaf = 0;
          const rect = invocationSection.getBoundingClientRect();
          const vh = window.innerHeight;
          // 0 when the section enters from below, 1 when its center passes
          // the upper third. Words ignite in reading order behind that wave.
          const k = Math.min(Math.max((vh * 0.78 - rect.top) / (vh * 0.85), 0), 1);
          const lit = Math.floor(k * words.length + 0.5);
          words.forEach((wEl, i) => wEl.classList.toggle("alv-word-lit", i < lit));
        });
      };
      onScrollInv();
      window.addEventListener("scroll", onScrollInv, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScrollInv);
        if (invRaf) cancelAnimationFrame(invRaf);
      });
    }

    /* ------------------------------------------------------------------ */
    /* 10. Magnetic primary buttons (fine pointers)                        */
    /* ------------------------------------------------------------------ */
    if (finePointer) {
      const magnets = Array.from(document.querySelectorAll(".btn.primary")) as HTMLElement[];
      let magRaf = 0;
      const onMove = (e: PointerEvent) => {
        if (magRaf) return;
        magRaf = requestAnimationFrame(() => {
          magRaf = 0;
          for (const btn of magnets) {
            const r = btn.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const reach = 110;
            if (dist < reach) {
              const pull = (1 - dist / reach) * 5;
              btn.style.translate = `${((dx / dist) * pull).toFixed(1)}px ${((dy / dist) * pull).toFixed(1)}px`;
            } else if (btn.style.translate) {
              btn.style.translate = "";
            }
          }
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        if (magRaf) cancelAnimationFrame(magRaf);
      });
    }

    /* ------------------------------------------------------------------ */
    /* 11. Self-drawing card glyphs: normalize path lengths once           */
    /* ------------------------------------------------------------------ */
    document
      .querySelectorAll(".three .card .glyph svg *")
      .forEach((shape) => shape.setAttribute("pathLength", "1"));

    /* ------------------------------------------------------------------ */
    /* 12. Gentle 3D tilt on tactile objects                               */
    /* ------------------------------------------------------------------ */
    if (finePointer) {
      const tiltEls = document.querySelectorAll(".specimen, .phone, .bond-mock, .today-widget");
      tiltEls.forEach((node) => {
        const el = node as HTMLElement;
        el.classList.add("alv-tilt");
        let raf = 0;
        const onMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -2.4;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 2.4;
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0;
            el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
          });
        };
        const onLeave = () => {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    /* ------------------------------------------------------------------ */
    /* 13. Nav deepens on scroll                                           */
    /* ------------------------------------------------------------------ */
    const nav = document.querySelector("nav.top-nav");
    if (nav) {
      let navRaf = 0;
      const onScroll = () => {
        if (navRaf) return;
        navRaf = requestAnimationFrame(() => {
          navRaf = 0;
          nav.classList.toggle("alv-scrolled", window.scrollY > 24);
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
