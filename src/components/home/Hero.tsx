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

type Bar = { x: number; y: number; h: number; w: number; o: number; warm: boolean; d: number; t: number };

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
      });
    }
  }
  return bars;
})();

function Field() {
  return (
    <div className="hx-field" aria-hidden="true">
      {BARS.map((b, i) => (
        <i
          key={i}
          className={b.warm ? "warm" : ""}
          style={{ left: `${b.x}%`, top: `${b.y}%`, height: `${b.h}%`, width: `${b.w}px`, opacity: b.o, animationDelay: `${b.d}s`, animationDuration: `${b.t}s` }}
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
          <h1 id="hero-title" data-reveal="up">
            Data, auth, agents and APIs.
            <span>One system, every team.</span>
          </h1>
          <div className="hx-actions" data-reveal="up">
            <a href={SIGN_UP} className="btn btn-light btn-lg">Start building</a>
            <a href={DOCS} className="btn btn-lg">Read the docs</a>
          </div>
        </div>
      </div>

    </header>
  );
}
