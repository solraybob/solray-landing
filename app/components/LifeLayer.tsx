"use client";

/**
 * LifeLayer: the motion soul of the landing page.
 *
 * Progressive enhancement only. Renders nothing; on mount it decorates the
 * already-rendered DOM with reveal choreography, a living canvas starfield,
 * an Oracle conversation replay, counting energy bars, and micro physics.
 * Works identically for /, /es and any future locale because it reads the
 * page by class, not by component tree. If JavaScript never arrives, or the
 * visitor prefers reduced motion, the page is exactly what it was before
 * this file existed.
 *
 * Performance contract: one IntersectionObserver for reveals, one rAF loop
 * for the starfield (parked when the hero leaves the viewport or the tab is
 * hidden), transforms and opacity only, no layout reads inside frames.
 */

import { useEffect } from "react";

const STAR_PALETTE: [string, number][] = [
  ["242,236,216", 0.55], // pearl
  ["243,146,48", 0.16],  // amber
  ["155,134,160", 0.14], // wisteria
  ["155,171,185", 0.15], // mist
];

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

    /* ------------------------------------------------------------------ */
    /* 1. Scroll reveals                                                   */
    /* ------------------------------------------------------------------ */
    const toReveal: HTMLElement[] = [];
    const mark = (el: Element, delayMs = 0) => {
      const h = el as HTMLElement;
      h.classList.add("alv");
      if (delayMs) h.style.setProperty("--alv-d", `${delayMs}ms`);
      toReveal.push(h);
    };

    // Section-level players.
    document
      .querySelectorAll(
        ".section-head, .oracle-copy, .today-copy, .souls-copy, .philosophy .narrow > *, .pricing .narrow > .eyebrow, .pricing .narrow > .section, .pricing .narrow > .kicker, .pricing-card, .pricing .note, .faq .narrow > *, .invocation .sig, .today-widget, .bond-mock, .phone"
      )
      .forEach((el) => mark(el));
    // Staggered families.
    document.querySelectorAll(".three .card").forEach((el, i) => mark(el, i * 120));
    document.querySelectorAll(".pricing-card li").forEach((el, i) => mark(el, 80 + i * 70));
    document.querySelectorAll(".faq-item").forEach((el, i) => mark(el, i * 70));
    document.querySelectorAll(".invocation p").forEach((el) => mark(el));

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
    /* 2. Hero entrance cascade (plays immediately, no observer)           */
    /* ------------------------------------------------------------------ */
    const hero = document.querySelector("section.hero");
    if (hero) {
      const order = [
        ".sun-mark",
        ".brand-lockup",
        "h1.display",
        ".hero-sub",
        ".hero-ctas",
        ".hero-tag",
        ".specimen",
      ];
      const els: HTMLElement[] = [];
      order.forEach((sel, i) => {
        const el = hero.querySelector(sel) as HTMLElement | null;
        if (!el) return;
        el.classList.add("alv", "alv-hero");
        el.style.setProperty("--alv-d", `${120 + i * 130}ms`);
        els.push(el);
      });
      // Specimen rows ripple in after the card itself.
      hero.querySelectorAll(".specimen .row").forEach((row, i) => {
        const h = row as HTMLElement;
        h.classList.add("alv", "alv-hero");
        h.style.setProperty("--alv-d", `${1050 + i * 110}ms`);
        els.push(h);
      });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => els.forEach((el) => el.classList.add("alv-in")))
      );
      // The living line: the one row computed from the real sky gets a pulse.
      const lastRow = hero.querySelector(".specimen .row:last-child");
      lastRow?.classList.add("alv-live-row");
    }

    /* ------------------------------------------------------------------ */
    /* 3. Canvas starfield: twinkle, drift, shooting stars                 */
    /* ------------------------------------------------------------------ */
    const field = document.querySelector(".starfield") as HTMLElement | null;
    let rafId = 0;
    if (field && hero) {
      const canvas = document.createElement("canvas");
      canvas.className = "starfield-canvas";
      field.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      type Star = {
        x: number; y: number; r: number; rgb: string;
        base: number; amp: number; phase: number; speed: number;
        vx: number; vy: number; depth: number;
      };
      let stars: Star[] = [];
      let w = 0, h = 0, dpr = 1;

      const seed = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = field.clientWidth;
        h = field.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        const count = Math.round(Math.min(170, (w * h) / 9000));
        stars = Array.from({ length: count }, () => {
          const depth = 0.35 + Math.random() * 0.65; // far..near
          return {
            x: Math.random() * w,
            y: Math.random() * h,
            r: (0.4 + Math.random() * 1.05) * depth,
            rgb: pickStarColor(),
            base: 0.12 + Math.random() * 0.4,
            amp: 0.1 + Math.random() * 0.38,
            phase: Math.random() * Math.PI * 2,
            speed: 0.25 + Math.random() * 0.8,
            vx: (Math.random() - 0.5) * 0.012 * depth,
            vy: (Math.random() - 0.35) * 0.008 * depth,
            depth,
          };
        });
      };
      seed();

      // Shooting star state.
      let shoot: { x: number; y: number; vx: number; vy: number; life: number; max: number } | null = null;
      let nextShootAt = performance.now() + 4500 + Math.random() * 6000;

      // Pointer parallax (whole-canvas transform, cheap).
      let px = 0, py = 0, tx = 0, ty = 0;
      const onPointer = (e: PointerEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        tx = ((e.clientX - cx) / cx) * 7;
        ty = ((e.clientY - cy) / cy) * 5;
      };
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

      let heroVisible = true;
      const heroIO = new IntersectionObserver(
        ([e]) => {
          heroVisible = e.isIntersecting;
          if (heroVisible && !rafId) rafId = requestAnimationFrame(frame);
        },
        { threshold: 0 }
      );
      heroIO.observe(hero);

      let last = performance.now();
      const frame = (now: number) => {
        rafId = 0;
        if (!ctx || !heroVisible || document.hidden) return;
        const dt = Math.min(now - last, 50);
        last = now;
        const t = now / 1000;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        for (const s of stars) {
          s.x += s.vx * dt * 0.06;
          s.y += s.vy * dt * 0.06;
          if (s.x < -2) s.x = w + 2; else if (s.x > w + 2) s.x = -2;
          if (s.y < -2) s.y = h + 2; else if (s.y > h + 2) s.y = -2;
          const a = s.base + s.amp * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.rgb},${a.toFixed(3)})`;
          ctx.fill();
        }

        // A shooting star, rarely, like the sky actually behaves.
        if (!shoot && now > nextShootAt) {
          const fromLeft = Math.random() > 0.5;
          shoot = {
            x: fromLeft ? -20 : w * (0.3 + Math.random() * 0.6),
            y: h * (0.05 + Math.random() * 0.3),
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

        // Ease the parallax.
        px += (tx - px) * 0.04;
        py += (ty - py) * 0.04;
        canvas.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;

        rafId = requestAnimationFrame(frame);
      };
      rafId = requestAnimationFrame(frame);

      const onVis = () => {
        if (!document.hidden && heroVisible && !rafId) {
          last = performance.now();
          rafId = requestAnimationFrame(frame);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      const onResize = () => seed();
      window.addEventListener("resize", onResize, { passive: true });

      cleanups.push(() => {
        if (rafId) cancelAnimationFrame(rafId);
        heroIO.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", onResize);
        if (finePointer) window.removeEventListener("pointermove", onPointer);
        canvas.remove();
      });
    }

    /* ------------------------------------------------------------------ */
    /* 4. Oracle conversation replay                                       */
    /* ------------------------------------------------------------------ */
    const phone = document.querySelector(".phone");
    const chat = document.querySelector(".chat-scroll");
    if (phone && chat) {
      const turns = Array.from(chat.children) as HTMLElement[];
      turns.forEach((el) => el.classList.add("alv-msg"));
      const timer: { id: ReturnType<typeof setTimeout> | null } = { id: null };

      const playFrom = (i: number) => {
        if (i >= turns.length) return;
        const el = turns[i];
        const isBubble = el.classList.contains("bubble");
        const isOracle = el.classList.contains("oracle");
        if (isBubble && isOracle) {
          // Typing breath before the Oracle speaks.
          const dots = document.createElement("div");
          dots.className = "alv-typing";
          dots.innerHTML = "<span></span><span></span><span></span>";
          el.before(dots);
          timer.id = setTimeout(() => {
            dots.remove();
            el.classList.add("alv-msg-in");
            timer.id = setTimeout(() => playFrom(i + 1), 420);
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
    /* 5. Energy bars: fill + count up when seen                           */
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
                const eased = 1 - Math.pow(1 - k, 3);
                pct.textContent = String(Math.round(value * eased));
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
    /* 6. Gentle 3D tilt on the tactile objects (fine pointers only)       */
    /* ------------------------------------------------------------------ */
    if (window.matchMedia("(pointer: fine)").matches) {
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
    /* 7. Nav: glass when the page starts moving                           */
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
