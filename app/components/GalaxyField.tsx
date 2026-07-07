"use client";

import { useEffect, useRef } from "react";

/**
 * GalaxyField: a real WebGL spiral galaxy in the Solray palette that you
 * descend through as you scroll. The galaxy's vertical position is bound 1:1
 * to scroll progress, so the sky moves down with the page, completely
 * connected to it. A slow ambient rotation keeps it alive at rest, and the
 * pointer adds a little parallax. Fixed full-screen, behind all content.
 *
 * Resilience: three is dynamically imported (never blocks first paint, never
 * runs on the server). Reduced-motion renders a single still frame. The loop
 * parks when the tab is hidden. Mobile uses fewer particles and a capped DPR.
 * If WebGL is unavailable the CSS gradient on .galaxy-field shows instead.
 */
export default function GalaxyField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    import("three")
      .then((THREE) => {
        if (disposed || !host) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarse = window.matchMedia("(pointer: coarse)").matches;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          58,
          window.innerWidth / window.innerHeight,
          0.1,
          120
        );
        camera.position.set(0, 0.6, 9);

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !coarse, powerPreference: "high-performance" });
        } catch {
          return; // no WebGL: the CSS gradient fallback stays
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Full sharpness first: phones render near native density (the 1.3
        // cap read as "very pixelated" on 3x Androids). The adaptive guard
        // below steps resolution down ONLY if the device proves it cannot
        // hold the frame rate, so sharp stays the default and smooth stays
        // the floor.
        let pixelCap = coarse ? 2.25 : 2;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelCap));
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);

        // ---- the galaxy ----
        const COUNT = coarse ? 5200 : 15000;
        const RADIUS = 10;
        const BRANCHES = 4;
        const SPIN = 1.15;
        const RAND = 0.45;
        const RAND_POW = 3.0;
        const cCore = new THREE.Color("#d49a5e");   // soft amber core (subtle)
        const cMoss = new THREE.Color("#9caf78");   // moss
        const cIndigo = new THREE.Color("#6a8692"); // indigo
        const cWist = new THREE.Color("#9b86a0");   // wisteria rim
        const cEmber = new THREE.Color("#d47a52");  // ember sparkle
        // Full aged-pigment palette scattered through the cluster, including
        // the bright centre, so the core reads multi-coloured not just amber.
        const PAL = [
          new THREE.Color("#f3b968"), new THREE.Color("#9caf78"),
          new THREE.Color("#6a8692"), new THREE.Color("#9b86a0"),
          new THREE.Color("#9babb9"), new THREE.Color("#d47a52"),
          new THREE.Color("#ece4cf"),
        ];

        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const r = Math.pow(Math.random(), 0.8) * RADIUS;
          const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
          const spin = r * SPIN;
          const rx = Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * RAND * r;
          const ry = Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * RAND * r * 0.32;
          const rz = Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * RAND * r;
          positions[i3] = Math.cos(branch + spin) * r + rx;
          positions[i3 + 1] = ry;
          positions[i3 + 2] = Math.sin(branch + spin) * r + rz;
          const k = r / RADIUS;
          // Amber only at the tight core, then moss -> indigo -> wisteria out
          // through the arms, with occasional ember sparkles for warmth.
          const c =
            k < 0.16 ? cCore.clone().lerp(cMoss, k / 0.16)
            : k < 0.5 ? cMoss.clone().lerp(cIndigo, (k - 0.16) / 0.34)
            : cIndigo.clone().lerp(cWist, (k - 0.5) / 0.5);
          // Scatter palette colour everywhere, strongest in the centre cluster.
          const palChance = k < 0.18 ? 0.55 : 0.32;
          if (Math.random() < palChance) c.lerp(PAL[(Math.random() * PAL.length) | 0], 0.5);
          if (Math.random() < 0.06 && k < 0.45) c.lerp(cEmber, 0.5);
          colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
        }
        // ---- the birth ----
        // On first load the galaxy is not yet formed: every star begins in a
        // wide slow cloud far outside the spiral and CONVERGES into place
        // over the first ~2.6 seconds, opacity rising with it. You watch the
        // sky assemble itself behind the sun. Skipped for reduced-motion
        // (they get the formed galaxy immediately).
        const INTRO_S = 2.6;
        const scatter = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          // Spherical shell scatter, biased outward, so stars fall INTO the
          // spiral from all around rather than sliding in from one edge.
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const rr = RADIUS * (1.5 + Math.random() * 1.6);
          scatter[i3] = Math.sin(ph) * Math.cos(th) * rr;
          scatter[i3 + 1] = (Math.cos(ph) * rr) * 0.6;
          scatter[i3 + 2] = Math.sin(ph) * Math.sin(th) * rr;
        }
        const finalPos = positions.slice(); // keep the formed spiral
        const startScattered = !reduced;
        if (startScattered) positions.set(scatter);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({
          size: 0.04,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          transparent: true,
          opacity: 0.42,
        });
        const galaxy = new THREE.Points(geo, mat);
        galaxy.rotation.x = 0.58;
        scene.add(galaxy);

        // ---- faint deep starfield for parallax depth ----
        const sCount = coarse ? 800 : 1800;
        const sPos = new Float32Array(sCount * 3);
        const sCol = new Float32Array(sCount * 3);
        // Stars carry the aged-pigment palette: mostly pearl, then amber,
        // wisteria, mist, moss, indigo, like the rest of the brand.
        const STAR_COLORS = [
          new THREE.Color("#ece4cf"), new THREE.Color("#f3b968"),
          new THREE.Color("#9b86a0"), new THREE.Color("#9babb9"),
          new THREE.Color("#9caf78"), new THREE.Color("#6a8692"),
        ];
        // Reweighted 2026-07-07 (Bob): less plain pearl, more of the aged
        // pigments, so the deep field reads as OUR sky, not generic white.
        const STAR_W = [0.28, 0.19, 0.17, 0.12, 0.13, 0.11];
        const pickStar = () => {
          let rr = Math.random();
          for (let j = 0; j < STAR_COLORS.length; j++) if ((rr -= STAR_W[j]) <= 0) return STAR_COLORS[j];
          return STAR_COLORS[0];
        };
        for (let i = 0; i < sCount; i++) {
          const i3 = i * 3;
          sPos[i3] = (Math.random() - 0.5) * 70;
          sPos[i3 + 1] = (Math.random() - 0.5) * 70;
          sPos[i3 + 2] = (Math.random() - 0.5) * 50 - 16;
          const sc = pickStar();
          sCol[i3] = sc.r; sCol[i3 + 1] = sc.g; sCol[i3 + 2] = sc.b;
        }
        const sGeo = new THREE.BufferGeometry();
        sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
        sGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
        const sMat = new THREE.PointsMaterial({
          // Quieter deep field (Bob 2026-07-07): smaller, dimmer, additive so
          // the dots glow softly instead of sitting as grey squares.
          size: 0.04, vertexColors: true, sizeAttenuation: true,
          transparent: true, opacity: 0.16, depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const stars = new THREE.Points(sGeo, sMat);
        scene.add(stars);

        // ---- the colour journey ----
        // The whole cluster is tinted through the aged-pigment palette as you
        // descend: warm pearl at the top, moss through the middle chapters,
        // indigo as the page turns inward, wisteria at the closing, then back
        // to warm gold for the final invocation (the bookend: you arrive back
        // at the sun). Near-white tints so the vertex colours keep their
        // identity and the shift reads as atmosphere, not a filter.
        const TINTS = [
          new THREE.Color("#fff3e0"), // pearl-gold, hero
          new THREE.Color("#eaf2dc"), // moss, the map
          new THREE.Color("#dfe9f4"), // indigo, oracle/today
          new THREE.Color("#eee2f5"), // wisteria, philosophy/pricing
          new THREE.Color("#ffeccd"), // gold again, the invocation
        ];
        const tintNow = new THREE.Color();

        // ---- interaction ----
        let prog = 0, tProg = 0, pX = 0, tpX = 0, pY = 0, tpY = 0;
        let lastProg = 0, swirl = 0;

        // ---- sun alignment ----
        // The core must sit EXACTLY behind the hero sun logo at the top of
        // the page, on every viewport. Measure the sun's real screen
        // position and invert the projection (camera at (0,0.6,9) looking
        // at the origin, vertical fov 58) to find the galaxy Y that puts
        // the core's centre on the sun's centre. Re-measured on resize.
        let baseY = 1.82; // fallback if the sun is not in the DOM
        const TAN_HALF_FOV = Math.tan((58 / 2) * (Math.PI / 180));
        const alignToSun = () => {
          const sun = document.querySelector(".hero .sun-mark") as HTMLElement | null;
          if (!sun) return;
          const r = sun.getBoundingClientRect();
          // Document-space centre, as a fraction of the viewport at scroll 0.
          const docCenter = r.top + window.scrollY + r.height / 2;
          const frac = docCenter / window.innerHeight;
          if (frac <= 0 || frac >= 1) return;
          const ndc = 1 - 2 * frac;
          baseY = (ndc * TAN_HALF_FOV * 9) / (0.998 + ndc * TAN_HALF_FOV * 0.0666);
          if (reduced) frame();
        };
        const onScroll = () => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          tProg = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
          if (reduced) frame();
        };
        const onPointer = (e: PointerEvent) => {
          tpX = e.clientX / window.innerWidth - 0.5;
          tpY = e.clientY / window.innerHeight - 0.5;
        };
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          alignToSun();
          if (reduced) frame();
        };

        const clock = new THREE.Clock();
        let raf = 0;
        let introDone = !startScattered;
        const BASE_OPACITY = 0.42;
        if (startScattered) mat.opacity = 0.0;
        function frame() {
          const t = clock.getElapsedTime();
          prog += (tProg - prog) * 0.06;
          pX += (tpX - pX) * 0.05;
          pY += (tpY - pY) * 0.05;
          // the birth: converge scatter -> spiral with an ease-out, fading in
          if (!introDone) {
            const k = Math.min(t / INTRO_S, 1);
            const e = 1 - Math.pow(1 - k, 3); // easeOutCubic
            const posAttr = geo.getAttribute("position") as import("three").BufferAttribute;
            const arr = posAttr.array as Float32Array;
            for (let i = 0; i < arr.length; i++) {
              arr[i] = scatter[i] + (finalPos[i] - scatter[i]) * e;
            }
            posAttr.needsUpdate = true;
            mat.opacity = BASE_OPACITY * (0.25 + 0.75 * e);
            if (k >= 1) {
              arr.set(finalPos);
              posAttr.needsUpdate = true;
              mat.opacity = BASE_OPACITY;
              introDone = true;
            }
          }
          // ambient life + the stir: scrolling adds real angular momentum,
          // so the galaxy visibly turns beneath you while you travel and
          // settles back to its slow drift when you stop.
          const vel = prog - lastProg;
          lastProg = prog;
          swirl += vel * 1.9;
          galaxy.rotation.y = t * 0.035 + swirl;
          stars.rotation.y = t * 0.008 + swirl * 0.25;
          // colour journey by depth
          const seg = Math.min(Math.max(prog, 0), 1) * (TINTS.length - 1);
          const i0 = Math.min(Math.floor(seg), TINTS.length - 2);
          tintNow.copy(TINTS[i0]).lerp(TINTS[i0 + 1], seg - i0);
          mat.color.copy(tintNow);
          // descent: the galaxy travels DOWN as you scroll down, locked to
          // it. baseY is measured off the real sun logo (see alignToSun).
          galaxy.position.y = baseY - prog * 6.3;
          galaxy.rotation.x = 0.58 + prog * 0.22;
          // gentle push toward the plane + pointer parallax. The parallax is
          // DEPTH-GATED: zero at the top of the page (so the core never
          // drifts off the sun when the mouse moves, which read as "the
          // mouse thing is weird"), easing up to full strength as you
          // descend into the sky.
          const par = Math.min(prog * 2.2, 1);
          camera.position.x += (pX * 1.5 * par - camera.position.x) * 0.08;
          camera.position.y = 0.6 + pY * 0.9 * par - prog * 0.6;
          camera.position.z = 9 - prog * 1.6;
          camera.lookAt(0, -prog * 5.4, 0);
          renderer.render(scene, camera);
        }
        // Adaptive resolution: watch real frame times and step the pixel
        // ratio down (2.25 -> 1.8 -> 1.5 -> 1.3) only when the device
        // genuinely cannot keep up. Checks a rolling window, acts at most
        // every 2s, never steps back up (no oscillation).
        let ftSum = 0, ftN = 0, lastFt = 0, lastAdapt = 0;
        function adapt(now: number) {
          if (lastFt) { ftSum += now - lastFt; ftN++; }
          lastFt = now;
          if (ftN >= 60 && now - lastAdapt > 2000) {
            const avg = ftSum / ftN;
            ftSum = 0; ftN = 0;
            if (avg > 24 && pixelCap > 1.3) { // below ~42fps sustained
              pixelCap = pixelCap > 1.8 ? 1.8 : pixelCap > 1.5 ? 1.5 : 1.3;
              renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelCap));
              lastAdapt = now;
            }
          }
        }
        function loop() {
          adapt(performance.now());
          frame();
          if (!disposed) raf = requestAnimationFrame(loop);
        }
        onScroll();
        // Repeated passes while the page settles (fonts, install bar,
        // translate bars, anything that shifts layout after first paint),
        // plus a ResizeObserver so ANY later reflow re-centres the core on
        // the sun. The maths is cheap; misalignment is expensive.
        alignToSun();
        const alignTimers = [450, 1500, 3000, 6000].map((ms) => window.setTimeout(alignToSun, ms));
        let ro: ResizeObserver | null = null;
        try {
          ro = new ResizeObserver(() => alignToSun());
          ro.observe(document.body);
        } catch { /* older browsers: the timed passes cover it */ }
        if (reduced) {
          frame(); // single still frame, no loop
        } else {
          raf = requestAnimationFrame(loop);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        const onVis = () => {
          if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
          else if (!raf && !reduced && !disposed) { clock.getDelta(); raf = requestAnimationFrame(loop); }
        };
        document.addEventListener("visibilitychange", onVis);

        cleanup = () => {
          if (raf) cancelAnimationFrame(raf);
          alignTimers.forEach((t) => clearTimeout(t));
          ro?.disconnect();
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("pointermove", onPointer);
          window.removeEventListener("resize", onResize);
          document.removeEventListener("visibilitychange", onVis);
          geo.dispose(); mat.dispose(); sGeo.dispose(); sMat.dispose();
          renderer.dispose();
          renderer.domElement.parentNode?.removeChild(renderer.domElement);
        };
      })
      .catch((e) => {
        // Never swallow the sky silently again: a failed init leaves the
        // CSS-gradient fallback visible, but the reason must be loggable.
        console.error("[galaxy] init failed:", e);
      });

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={hostRef} className="galaxy-field" aria-hidden="true" />;
}
