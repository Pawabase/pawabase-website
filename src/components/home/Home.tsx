import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { CurrencyPicker } from "@/components/pricing/CurrencyPicker";
import { SiteNav } from "@/components/site/SiteNav";
import { usePlans } from "@/hooks/usePlans";
import { useCurrency } from "@/lib/currency";

import "./home.css";
import { DOCS, SIGN_UP } from "@/lib/links";


/* ── the frame: rules that bleed past the page, crosses where they meet the rails ──────────────────────────────────── */

/** A horizontal rule across the whole window, with a cross on each rail and a small square on each inner rail. */
export function Rule({ at = "top" }: { at?: "top" | "bottom" }) {
  return (
    <span className={`ix-rule ${at}`} aria-hidden="true">
      <i className="ix-rule-line" />
      <i className="ix-plus l" />
      <i className="ix-plus r" />
      <i className="ix-sq l" />
      <i className="ix-sq r" />
    </span>
  );
}

/** The two dashed inner rails, running the height of the page. */
export function InnerRails() {
  return (
    <span className="ix-inner-rails" aria-hidden="true">
      <i className="l" />
      <i className="r" />
    </span>
  );
}

type V = [x: number, y1: number, y2: number];
type H = [y: number, x1: number, x2: number];
type M = [x: number, y: number, kind?: "plus" | "sq"];

/** A panel's inner lines, in fractions of the panel: dashed dividers, crosses where they meet, squares on its edge. */
export function Lines({ v = [], h = [], marks = [] }: { v?: V[]; h?: H[]; marks?: M[] }) {
  return (
    <span className="ix-lines" aria-hidden="true">
      {v.map(([x, a, b], i) => <i key={`v${i}`} className="ix-dv" style={{ left: `${x * 100}%`, top: `${a * 100}%`, height: `${(b - a) * 100}%` }} />)}
      {h.map(([y, a, b], i) => <i key={`h${i}`} className="ix-dh" style={{ top: `${y * 100}%`, left: `${a * 100}%`, width: `${(b - a) * 100}%` }} />)}
      {marks.map(([x, y, kind = "plus"], i) => <i key={`m${i}`} className={`ix-m ${kind}`} style={{ left: `${x * 100}%`, top: `${y * 100}%` }} />)}
    </span>
  );
}

/* ── shared pieces ─────────────────────────────────────────────────────────────────────────────────────────────────── */


export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4 12.5 8l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A section's opening: the heading on the left, any actions on the right. */
export function SectionHead({ title, id, children }: { title: string; id: string; children?: ReactNode }) {
  return (
    <header className="ix-head" data-reveal="up">
      <h2 id={id}>{title}</h2>
      {children && <div className="ix-head-actions">{children}</div>}
    </header>
  );
}

/* ── hero ──────────────────────────────────────────────────────────────────────────────────────────────────────────── */


/** Where the sky's points of light sit (% across, % down) and when each first lights (s). */
const TWINKLES: [number, number, number][] = [
  [14, 22, 0], [27, 58, 2.6], [41, 14, 4.1], [63, 18, 1.3], [78, 52, 3.4], [88, 26, 5.2], [55, 70, 6.1],
];

/** The hero sky: drifting clouds between the dashed rails, and a few points of orange light coming and going. */
export function Sky({ seed = 11 }: { seed?: number }) {
  const id = `ix-cloud-filter-${seed}`;
  return (
    <div className="ix-sky" aria-hidden="true">
      <svg className="ix-clouds" preserveAspectRatio="none">
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0032 0.0055" numOctaves="5" seed={seed} />
          <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.89  0 0 0 1.35 -0.62" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
      {TWINKLES.map(([x, y, delay], i) => <i key={i} className="ix-twinkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }} />)}
    </div>
  );
}

export function Hero() {
  return (
    <section className="ix-hero" aria-labelledby="hero-title" data-plain="">
      <Sky />
      <SiteNav />

      <div className="ix-hero-copy">
        <h1 id="hero-title" data-reveal="up">
          Data, auth, agents and APIs.
          <br />
          One system, every team.
        </h1>
        <p data-reveal="up">APIs, auth and storage for your apps, with the flows and agents behind them.</p>
        <a href={SIGN_UP} className="ix-btn primary" data-reveal="up">Start building <Arrow /></a>
      </div>
    </section>
  );
}

/* ── statement ─────────────────────────────────────────────────────────────────────────────────────────────────────── */

/** A word in the statement, set in a chip with its icon. */
function Word({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <span className="ix-word">
      <span className="ix-word-icon"><Icon name={icon} size={18} variant="Linear" /></span>
      {children}
    </span>
  );
}

/** What's in the system, running along the statement's horizon. */
const PARTS: [IconName, string][] = [
  ["database", "Tables"],
  ["code", "REST APIs"],
  ["policies", "Policies"],
  ["automation", "Flows"],
  ["sparkle", "Agents"],
  ["users", "Users and teams"],
  ["storage", "Storage"],
  ["image", "Image transforms"],
  ["mail", "Mail"],
  ["realtime", "Realtime"],
  ["webhooks", "Webhooks"],
  ["scheduling", "Schedules"],
  ["queues", "Background jobs"],
  ["search", "Vector search"],
  ["apiSecurity", "API keys"],
  ["policies", "Rate limits"],
  ["activity", "Logs and traces"],
];

export function Statement() {
  return (
    <section className="ix-section" aria-labelledby="statement-title" data-plain="">
      <Rule />
      <div className="ix-statement" data-reveal="up">
        {/* a sun of lit dots rising from the horizon below, in a faint field of ivory ones */}
        <span className="ix-sunrise" aria-hidden="true"><i className="field" /><i className="sun" /></span>
        <h2 id="statement-title">
          Pawabase gives your apps <Word icon="code">APIs</Word> <Word icon="users">auth</Word> <Word icon="storage">storage</Word> and{" "}
          <Word icon="sparkle">agents</Word> in one system every team can use.
        </h2>
        <a href={DOCS} className="ix-btn caps">Read the docs <Arrow /></a>
      </div>
      <div className="ix-marquee" aria-label="What's in Pawabase">
        <ul className="ix-marquee-track">
          {[...PARTS, ...PARTS].map(([icon, label], i) => (
            <li key={i} aria-hidden={i >= PARTS.length}><Icon name={icon} size={15} variant="Linear" />{label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── features live in Features.tsx ── */

/* ── the stack lives in Stack.tsx ── */

/* ── pricing ───────────────────────────────────────────────────────────────────────────────────────────────────────── */

export function Pricing({ title = "Start free", compare = "/pricing" }: { title?: string; compare?: string }) {
  const { plans } = usePlans();
  const { show } = useCurrency();
  const cuts = plans.slice(1).map((_, i) => (i + 1) / plans.length);
  return (
    <section id="pricing" className="ix-section" aria-labelledby="pricing-title" data-plain="">
      <Rule />
      <SectionHead id="pricing-title" title={title}>
        <div className="ix-pricing-tools"><CurrencyPicker /><a href={compare} className="ix-link">Compare every limit</a></div>
      </SectionHead>
      <div className="ix-panel ix-plans" style={{ "--plans": plans.length } as CSSProperties} data-reveal="up">
        <Rule />
        <Lines v={cuts.map((x) => [x, 0, 1] as V)} marks={cuts.flatMap((x) => [[x, 0, "sq"], [x, 1, "sq"]] as M[])} />
        {plans.map((plan) => (
          <article key={plan.name} className={`ix-cell ix-plan ${plan.featured ? "featured" : ""}`}>
            <div className="ix-plan-name"><h3>{plan.name}</h3>{plan.featured && <span className="ix-caps">Popular</span>}</div>
            <p>{plan.description}</p>
            <div className="ix-price"><b>{show(Number(plan.price))}</b><span>/ month</span></div>
            <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <a href={SIGN_UP} className={`ix-btn ${plan.featured ? "primary" : ""}`}>Get started</a>
          </article>
        ))}
      </div>
    </section>
  );
}
