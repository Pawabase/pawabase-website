import { useEffect, useRef } from "react";

import { SiteNav } from "@/components/site/SiteNav";
import { DOCS, SIGN_UP } from "@/lib/links";

import "./hero.css";

/*
 * The opening of the home page, after Neon's: a field of thin striped bars shimmering across the top (grey, a few warm), the
 * headline low on the left with two buttons under it. The hero is its own surface, a step lighter than the page, and it hands over
 * to the next section the way Clerk's bands do: its foot steps down in the middle with 45° shoulders. No glow, little text.
 */

/** A small seeded generator: the bars are the same on the server and in the browser. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Bar = { x: number; y: number; h: number; w: number; o: number; warm: boolean; d: number; t: number; p: number };

/** Bars in clusters, denser and taller towards the upper right, a few of them warm. */
const BARS: Bar[] = (() => {
  const r = seeded(7);
  const clusters = [[20, 30, 16], [36, 18, 26], [52, 26, 32], [68, 14, 30], [84, 30, 26], [62, 46, 20], [94, 50, 16], [44, 44, 16], [8, 50, 8]];
  const bars: Bar[] = [];
  for (const [cx, cy, n] of clusters) {
    for (let i = 0; i < n; i++) {
      bars.push({
        x: cx + (r() - 0.5) * 12,
        y: cy + (r() - 0.5) * 14,
        h: 8 + r() * 22,
        w: r() < 0.35 ? 4 : r() < 0.6 ? 3 : 2,
        o: 0.22 + r() * 0.55,
        warm: r() < 0.09,
        d: r() * 6,
        t: 3 + r() * 5,
        p: r() * Math.PI * 2,
      });
    }
  }
  return bars;
})();

/**
 * The field is alive without a cursor: an invisible focus wanders across it on its own path, the columns near it swell and glow warm,
 * and every few seconds a ring spreads out from it. Each column also breathes a little, and the whole field drifts up slowly as the
 * page scrolls. One animation frame writes a transform, an opacity and a warmth to each bar; it stops when the hero is off screen and
 * never starts when motion is reduced.
 */
function Field() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bars = Array.from(el.children) as HTMLElement[];
    let width = 1;
    let height = 1;
    const measure = () => {
      const box = el.getBoundingClientRect();
      width = box.width || 1;
      height = box.height || 1;
    };
    measure();
    window.addEventListener("resize", measure);

    let visible = true;
    const watch = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    watch.observe(el);

    const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
    const begin = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      const t = (now - begin) / 1000;
      // where the focus is, in percent of the field
      const fx = 55 + 32 * Math.sin(t * 0.31) + 8 * Math.sin(t * 0.83);
      const fy = 42 + 22 * Math.sin(t * 0.47 + 1) + 6 * Math.sin(t * 1.1);
      const ring = (t % 7) / 7; // 0 → 1 over seven seconds
      const reach = ring * 760;
      for (let i = 0; i < bars.length; i++) {
        const b = BARS[i];
        const dx = ((b.x - fx) / 100) * width;
        const dy = ((b.y + b.h / 2 - fy) / 100) * height;
        const d = Math.hypot(dx, dy);
        const near = Math.exp(-((d / 210) ** 2));
        const wave = Math.exp(-(((d - reach) / 46) ** 2)) * (1 - ring);
        const bar = bars[i];
        bar.style.transform = `scaleY(${(1 + 0.07 * Math.sin(t * 0.9 + b.p) + 0.5 * near + 0.28 * wave).toFixed(3)})`;
        bar.style.opacity = clamp(b.o * (1 + 0.9 * near) + 0.55 * wave).toFixed(3);
        bar.style.setProperty("--w", clamp(0.85 * near + 1.1 * wave).toFixed(3));
      }
      // a slow drift and fade as the page scrolls away from the hero
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${(y * 0.16).toFixed(1)}px, 0)`;
      el.style.setProperty("--fade", String(clamp(1 - y / 620, 0.15, 1)));
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      watch.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="hx-field" ref={root} aria-hidden="true">
      {BARS.map((b, i) => (
        <i
          key={i}
          className={b.warm ? "warm" : ""}
          style={{ left: `${b.x}%`, top: `${b.y}%`, height: `${b.h}%`, width: `${b.w}px`, opacity: b.o, animationDelay: `${(b.x * 0.011 + b.d * 0.04).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <header className="hx" aria-labelledby="hero-title">
      <a className="hx-news" href={`${DOCS}/auth/enterprise-sign-in`}>
        New: enterprise sign-in for every organization <span aria-hidden="true">›</span>
      </a>

      <SiteNav />

      <div className="hx-stage">
        <Field />
        <div className="hx-copy">
          <h1 id="hero-title">
            <span className="hx-l1">The complete backend</span>
            <span className="hx-l2">for anything you build.</span>
          </h1>
          <div className="hx-actions" data-reveal="up">
            <a href={SIGN_UP} className="btn btn-light btn-lg">Start free</a>
            <a href={DOCS} className="btn btn-lg">Read the docs</a>
          </div>
        </div>
      </div>

    </header>
  );
}
