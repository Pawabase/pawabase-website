import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/Icon";

import { APP, Arrow, DOCS, Rule } from "./Home";
import "./sections.css";

/* ── one message: developers build it, everyone runs it. The message in one large tile; beside it, a tile for each
      kind of user, each with one big outlined verb that a slow orange glint passes through ──────────────────────────── */

const WHO: { icon: IconName; who: string; line: string; verb: string }[] = [
  { icon: "code", who: "Developers", line: "Build the data, rules, flows and agents.", verb: "Build" },
  { icon: "users", who: "Your team", line: "Manage the data, users and content.", verb: "Run" },
  { icon: "sparkle", who: "Apps and agents", line: "Use it through the API and MCP.", verb: "Use" },
];

export function Everyone() {
  return (
    <section className="ix-section" aria-labelledby="everyone-title" data-plain="">
      <Rule />
      <div className="ix-panel ev-panel" data-reveal="up">
        <Rule />
        <div className="ev-grid">
          <i className="ev-corner tl" /><i className="ev-corner tr" /><i className="ev-corner bl" /><i className="ev-corner br" />
          <div className="ev-tile ev-lead">
            <h2 id="everyone-title">
              <span>Developers build it.</span>
              <span className="hot">Everyone runs it.</span>
            </h2>
            <div className="ev-actions">
              <a href={APP} className="ix-btn primary">Start building <Arrow /></a>
              <a href={DOCS} className="ix-link">Read the docs</a>
            </div>
          </div>
          {WHO.map((w, i) => (
            <article key={w.who} className="ev-tile ev-who" style={{ "--i": i } as CSSProperties}>
              <span className="ev-icon"><Icon name={w.icon} size={20} variant="Linear" /></span>
              <div className="ev-text">
                <h3>{w.who}</h3>
                <p>{w.line}</p>
              </div>
              <span className="ev-verb" aria-hidden="true">{w.verb}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── the closing band: the hero's sky again, so the page ends where it began ────────────────────────────────────────── */

export function Closing() {
  return (
    <section className="ix-section ix-closing-band" aria-labelledby="closing-title" data-plain="">
      <Rule />
      <div className="ix-closing-sky" aria-hidden="true">
        <svg className="ix-clouds" preserveAspectRatio="none">
          <filter id="ix-closing-clouds" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0034 0.006" numOctaves="5" seed="4" />
            <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.89  0 0 0 1.35 -0.62" />
          </filter>
          <rect width="100%" height="100%" filter="url(#ix-closing-clouds)" />
        </svg>
      </div>
      <div className="ix-closing" data-reveal="up">
        <h2 id="closing-title">Build your app's APIs, auth<br />and storage in one place.</h2>
        <div className="ix-closing-actions">
          <a href={DOCS} className="ix-btn">Read the docs</a>
          <a href={APP} className="ix-btn primary">Start building <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
