import { useEffect, useState, type ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { Arrow, SectionHead } from "@/components/home/Home";
import { Closing } from "@/components/home/Sections";
import { Footer } from "@/components/landing/Footer";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { PRODUCTS } from "@/components/site/SiteNav";
import { usePageMeta } from "@/hooks/usePageMeta";
import { DOCS, SIGN_UP } from "@/lib/links";

import "./frame.css";

/*
 * What every product page shares, in the home page's language: the hero sits on the home hero's lighter surface and hands over with
 * its stepped foot; sections open on the silver heading and line; content sits on Clerk-style cards (lighter than the page, a light
 * along the top edge); every other section is a band. A page brings its own hero picture and its own sections, in its own order, so
 * no two pages look alike; the kit below (Steps, Spec, Questions) gives each one depth without repeating a layout. Every capability a
 * page names exists in Pawabase today; the internals are left to the docs.
 */

export const still = () => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts up for as long as the page is open. For a visitor who asked for less motion it holds still at *rest*: the finished state. */
export function useTicker(ms: number, rest = 0) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still()) {
      setTick(rest);
      return;
    }
    const timer = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(timer);
  }, [ms, rest]);
  return tick;
}

/** The two buttons a product hero offers. */
export function HeroActions({ className = "" }: { className?: string }) {
  return (
    <div className={`pf-actions ${className}`} data-reveal="up">
      <a href={SIGN_UP} className="btn btn-light btn-lg">Start building <Arrow /></a>
      <a href={DOCS} className="btn btn-lg" target="_blank" rel="noreferrer">Read the docs</a>
    </div>
  );
}

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Head = { title?: string; lead?: ReactNode; actions?: ReactNode; band?: boolean };

/** A section in the home page's manner: an optional silver head, then a card. `band` draws it as a band (lighter, stepped edges). */
export function Band({ label, title, lead, actions, band = false, className = "", children }: Head & { label: string; className?: string; children: ReactNode }) {
  const id = `${slug(title || label)}-title`;
  return (
    <section className={`ix-section pd-sec ${band ? "ix-band" : ""} ${title ? "" : "bare"}`} aria-labelledby={title ? id : undefined} aria-label={title ? undefined : label} data-plain="">
      {title && <SectionHead id={id} title={title} lead={lead}>{actions}</SectionHead>}
      <div className={`pd-card ${className}`} data-reveal="up">{children}</div>
    </section>
  );
}

/** How it works, in three steps: each a card with its number in a matte tile, a title and a line. */
export function Steps({ title = "How it works", lead, steps, band = false }: Head & { steps: [string, string][] }) {
  const id = `${slug(title)}-title`;
  return (
    <section className={`ix-section pd-sec ${band ? "ix-band" : ""}`} aria-labelledby={id} data-plain="">
      <SectionHead id={id} title={title} lead={lead} />
      <ol className="pd-steps" data-reveal="up">
        {steps.map(([name, line], i) => (
          <li key={name} className="pd-step">
            <span className="pd-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3>{name}</h3>
            <p>{line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Everything in a product, as a sheet: a card of ruled rows in two columns, each with a tick, a name and a line. */
export function Spec({ title, lead, items, band = false, icon }: Head & { title: string; items: [string, string][]; icon?: IconName }) {
  const id = `${slug(title)}-title`;
  return (
    <section className={`ix-section pd-sec ${band ? "ix-band" : ""}`} aria-labelledby={id} data-plain="">
      <SectionHead id={id} title={title} lead={lead} />
      <div className="pd-card pd-spec" data-reveal="up">
        {icon && <span className="pd-spec-tile" aria-hidden="true"><Icon name={icon} size={24} variant="Linear" /></span>}
        <dl>
          {items.map(([name, line]) => (
            <div key={name}>
              <dt><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>{name}</dt>
              <dd>{line}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Questions people ask, opened one at a time, on a card. */
export function Questions({ title = "Questions", items, band = false }: Head & { items: [string, ReactNode][] }) {
  const id = `${slug(title)}-title`;
  return (
    <section className={`ix-section pd-sec ${band ? "ix-band" : ""}`} aria-labelledby={id} data-plain="">
      <SectionHead id={id} title={title} />
      <div className="pd-card pd-faq" data-reveal="up">
        {items.map(([q, a], i) => (
          <details key={q} open={i === 0}>
            <summary>{q}<span aria-hidden="true" /></summary>
            <div>{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** The next products to look at: the rest of this one's group first, then whatever follows, three in all. */
function related(name: string) {
  const all = PRODUCTS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));
  const at = all.findIndex((p) => p.label === name);
  const here = all[at];
  const same = all.filter((p) => p !== here && p.group === here?.group);
  const after = [...all.slice(at + 1), ...all.slice(0, Math.max(0, at))];
  return [...new Set([...same, ...after])].slice(0, 3);
}

/** A product page: its hero (full width, on the hero surface), its own sections, related products, the closing and the footer. */
export function ProductFrame({ name, description, hero, children }: { name: string; description: string; hero?: ReactNode; children: ReactNode }) {
  usePageMeta(`${name} | Pawabase`, description);
  return (
    <div className="ix-page pd">
      <ScrollMotion />
      {hero}
      <main className="ix-shell">
        {children}
        <section className="ix-section pd-sec" aria-labelledby="works-with-title" data-plain="">
          <SectionHead id="works-with-title" title="Works with the rest" lead={`${name} shares one model with every other part of Pawabase.`} />
          <nav className="pd-next" aria-label="Related products" data-reveal="up">
            {related(name).map((p) => (
              <a key={p.href} href={p.href} className="pd-next-item">
                <span className="pd-next-tile"><Icon name={p.icon} size={20} variant="Linear" /></span>
                <span className="pd-next-copy"><b>{p.label}</b><small>{p.line}</small></span>
                <Arrow />
              </a>
            ))}
          </nav>
        </section>
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
