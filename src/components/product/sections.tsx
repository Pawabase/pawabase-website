import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { SiteNav } from "@/components/site/SiteNav";

import { HeroActions } from "./ProductFrame";
import "./sections.css";

/*
 * The product pages' sections, built from the home page's design system: the hero surface with its stepped foot, the silver
 * section head, bands, and Clerk's materials (cards lighter than the page, matte objects lit from above sitting in grooves, wells
 * pressed into the surface, thin lines running off the edges). Each page picks its own sections and its own order:
 *
 *   ProductHero   the opening: words low on the left, a big card on the right holding the product's object, notes pinned to it
 *   Bento         staggered cards, each with one object and almost no text; tiles can be wide or tall
 *   Tour          a guided look: tabs down the left, the chosen one opens as a large object beside its points
 *   Pipeline      how a thing moves: matte stages on a rail, a light running along it and waking each stage in turn
 *   Compare       two or three ways side by side, each a card with its rows
 *   Callout       one large sentence in silver, with matte chips set in the line
 */

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Head = { title: string; lead?: ReactNode; band?: boolean; actions?: ReactNode };

function Shell({ title, lead, band, actions, className = "", children }: Head & { className?: string; children: ReactNode }) {
  const id = `${slug(title)}-title`;
  return (
    <section className={`ix-section pd-sec ${band ? "ix-band" : ""} ${className}`} aria-labelledby={id} data-plain="">
      <SectionHead id={id} title={title} lead={lead}>{actions}</SectionHead>
      {children}
    </section>
  );
}

/* ── the hero ─────────────────────────────────────────────────────────────────────────────────────────────────────── */

/** The opening. `notes` are short facts pinned to the corners of the object's card. */
export function ProductHero({ title, quiet, lead, art, notes = [] }: { title: ReactNode; quiet?: ReactNode; lead: ReactNode; art: ReactNode; notes?: string[] }) {
  return (
    <header className="pdh" aria-labelledby="product-title">
      <SiteNav />
      <div className="pdh-stage">
        <div className="pdh-copy">
          <h1 id="product-title" data-reveal="up">{title}{quiet && <span>{quiet}</span>}</h1>
          <p data-reveal="up">{lead}</p>
          <HeroActions />
        </div>
        <div className="pdh-art" aria-hidden="true" data-reveal="up">
          <span className="pdh-rule h" />
          <span className="pdh-rule v" />
          <div className="pdh-card">{art}</div>
          {notes.map((note, i) => <span key={note} className={`pdh-note n${i}`}><i />{note}</span>)}
        </div>
      </div>
    </header>
  );
}

/* ── bento ────────────────────────────────────────────────────────────────────────────────────────────────────────── */

export type Tile = { title: string; line: string; art: ReactNode; size?: "wide" | "tall" | "big" };

/** Staggered cards in three columns: `wide` spans two columns, `tall` two rows, `big` both. */
export function Bento({ tiles, ...head }: Head & { tiles: Tile[] }) {
  return (
    <Shell {...head}>
      <div className="pb-grid" data-reveal="up">
        {tiles.map((t) => (
          <article key={t.title} className={`pb-tile ${t.size || ""}`}>
            <div className="pb-art" aria-hidden="true">{t.art}</div>
            <div className="pb-copy"><h3>{t.title}</h3><p>{t.line}</p></div>
          </article>
        ))}
      </div>
    </Shell>
  );
}

/* ── tour ─────────────────────────────────────────────────────────────────────────────────────────────────────────── */

export type Stop = { label: string; title: string; line: string; points: string[]; art: ReactNode };

/** A guided look: tabs on the left; the chosen one opens on the right as a large object beside its title, line and points. */
export function Tour({ stops, ...head }: Head & { stops: Stop[] }) {
  const [open, setOpen] = useState(0);
  const stop = stops[open];
  const key = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    setOpen((open + step + stops.length) % stops.length);
  };
  const id = `${slug(head.title)}-tour`;
  return (
    <Shell {...head}>
      <div className="pt-box" data-reveal="up">
        <div className="pt-tabs" role="tablist" aria-orientation="vertical" onKeyDown={key}>
          {stops.map((s, i) => (
            <button key={s.label} type="button" role="tab" id={`${id}-${i}`} aria-selected={i === open} aria-controls={`${id}-panel`} tabIndex={i === open ? 0 : -1} className="pt-tab" onClick={() => setOpen(i)}>
              <span className="pt-n">{String(i + 1).padStart(2, "0")}</span>{s.label}
              <span className="pt-bar" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="pt-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${open}`}>
          <div key={open} className="pt-body">
            <div className="pt-art" aria-hidden="true">{stop.art}</div>
            <div className="pt-copy">
              <h3>{stop.title}</h3>
              <p>{stop.line}</p>
              <ul>{stop.points.map((p) => <li key={p}><Tick />{p}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Tick() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
}

/* ── pipeline ─────────────────────────────────────────────────────────────────────────────────────────────────────── */

export type Stage = { icon: IconName; label: string; line: string };

/** How something moves through Pawabase: matte stages on one rail, a light running along it and waking each stage as it passes. */
export function Pipeline({ stages, ...head }: Head & { stages: Stage[] }) {
  return (
    <Shell {...head}>
      <div className="pp" style={{ "--n": stages.length } as CSSProperties} data-reveal="up">
        <div className="pp-rail" aria-hidden="true"><i /></div>
        <ol>
          {stages.map((s, i) => (
            <li key={s.label} style={{ "--i": i } as CSSProperties}>
              <span className="pp-tile" aria-hidden="true"><Icon name={s.icon} size={22} variant="Linear" /></span>
              <b>{s.label}</b>
              <small>{s.line}</small>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}

/* ── compare ──────────────────────────────────────────────────────────────────────────────────────────────────────── */

export type Side = { icon: IconName; title: string; line: string; rows: [string, string][]; lit?: boolean };

/** Two or three ways, side by side: each a card with a matte tile, a title, a line and its rows. */
export function Compare({ sides, ...head }: Head & { sides: Side[] }) {
  return (
    <Shell {...head}>
      <div className="pc" style={{ "--cols": sides.length } as CSSProperties} data-reveal="up">
        {sides.map((s) => (
          <article key={s.title} className={`pc-side ${s.lit ? "lit" : ""}`}>
            <header>
              <span className="pc-tile" aria-hidden="true"><Icon name={s.icon} size={22} variant="Linear" /></span>
              <div><h3>{s.title}</h3><p>{s.line}</p></div>
            </header>
            <dl>{s.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </article>
        ))}
      </div>
    </Shell>
  );
}

/* ── callout ──────────────────────────────────────────────────────────────────────────────────────────────────────── */

/** A matte chip set in a line of text: an icon and a word. */
export function Chip({ icon, children }: { icon: IconName; children: ReactNode }) {
  return <span className="pd-chip"><Icon name={icon} size={18} variant="Linear" />{children}</span>;
}

/** One large sentence in silver, centred, with chips set in it; a line under it if wanted. */
export function Callout({ label, children, line, band = false }: { label: string; children: ReactNode; line?: string; band?: boolean }) {
  return (
    <section className={`ix-section pd-sec pd-callout ${band ? "ix-band" : ""}`} aria-label={label} data-plain="">
      <p className="pd-callout-text" data-reveal="up">{children}</p>
      {line && <p className="pd-callout-line" data-reveal="up">{line}</p>}
    </section>
  );
}
