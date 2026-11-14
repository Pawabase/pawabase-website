import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/Icon";

import "./objects.css";

/*
 * Objects for the product pages, in the home bento's material (platform.css): matte faces lit from above, sitting in grooves; wells
 * pressed into the card; thin lines running off its edges. Grey, with orange only for what is happening. Each fills the box it is put
 * in (position: absolute; inset: 0) and centres itself, so the same object works in a hero card, a bento tile or a tour panel.
 * No example data beyond a word or two: no names, no numbers to read.
 */

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/** A matte tile in its groove where two lines cross, small nodes riding the lines. */
export function GlyphArt({ icon }: { icon: IconName }) {
  return (
    <div className="pa pa-glyph">
      <span className="pa-line h" /><span className="pa-line v" />
      <i className="pa-node a" /><i className="pa-node b" /><i className="pa-node c" />
      <span className="pa-tile big"><Icon name={icon} size={30} variant="Linear" /></span>
    </div>
  );
}

/** A small panel of rows, one lit at a time. */
export function RowsArt({ icons }: { icons: IconName[] }) {
  return (
    <div className="pa pa-rows">
      <div className="pa-panel" style={v({ "--n": icons.length })}>
        {icons.map((icon, i) => (
          <span key={i} className="pa-row" style={v({ "--i": i })}>
            <b><Icon name={icon} size={14} variant="Linear" /></b><i style={v({ "--w": `${58 + ((i * 17) % 34)}%` })} /><em />
          </span>
        ))}
      </div>
    </div>
  );
}

/** A round button in its groove, a ring of light going round it. */
export function RingArt({ icon }: { icon: IconName }) {
  return (
    <div className="pa pa-ring">
      <span className="pa-halo" />
      <span className="pa-tile round"><Icon name={icon} size={30} variant="Linear" /></span>
    </div>
  );
}

/** Bars pressed into wells, rising and falling; one of them lit. */
export function BarsArt({ count = 14 }: { count?: number }) {
  return (
    <div className="pa pa-bars">
      {Array.from({ length: count }, (_, i) => <i key={i} className={i === count - 4 ? "lit" : ""} style={v({ "--h": `${28 + ((i * 37) % 60)}%`, "--d": `${-(i * 0.37) % 3}s` })} />)}
    </div>
  );
}

/** Words as matte chips on two lines, one lit at a time. */
export function ChipsArt({ words }: { words: string[] }) {
  return (
    <div className="pa pa-chips" style={v({ "--n": words.length })}>
      <div>{words.map((w, i) => <span key={w} style={v({ "--i": i })}>{w}</span>)}</div>
    </div>
  );
}

/** Settings as rows with switches, switching in turn. */
export function SwitchArt({ labels }: { labels: string[] }) {
  return (
    <div className="pa pa-switch">
      <div className="pa-panel">
        {labels.map((l, i) => <span key={l} className="pa-set" style={v({ "--i": i })}><span>{l}</span><i /></span>)}
      </div>
    </div>
  );
}

/** A vertical line of changes, newest at the top and waiting. */
export function TimelineArt({ items }: { items: string[] }) {
  return (
    <div className="pa pa-timeline">
      <ol>{items.map((item, i) => <li key={item} className={i === 0 ? "now" : ""}><i /><span>{item}</span></li>)}</ol>
    </div>
  );
}

/** Data API: a request on a matte bar, its answer below in wells, a 200 pill. */
export function EndpointArt({ method = "GET", path = "/rest/v1/orders" }: { method?: string; path?: string }) {
  return (
    <div className="pa pa-endpoint">
      <div className="pa-req"><b>{method}</b><code>{path}</code><span className="pa-send"><Icon name="arrowRight" size={14} /></span></div>
      <div className="pa-res">
        <span className="pa-ok">200</span>
        {[72, 54, 64, 40, 58].map((w, i) => <i key={i} style={v({ "--w": `${w}%`, "--i": i })} />)}
      </div>
    </div>
  );
}

/** API security: a key as a matte card, its prefix and its limits in wells, a lock in a groove. */
export function KeyArt() {
  return (
    <div className="pa pa-key">
      <div className="pa-keycard">
        <span className="pa-lock"><Icon name="apiSecurity" size={20} variant="Linear" /></span>
        <code>pb_pk_••••••••••</code>
        <div className="pa-scopes"><span>orders · read</span><span>files · write</span></div>
        <div className="pa-meter"><i /></div>
      </div>
    </div>
  );
}

/** Queues: jobs as a stack of matte cards; the front one is working. */
export function StackArt() {
  return (
    <div className="pa pa-stack">
      {[3, 2, 1, 0].map((k) => (
        <span key={k} className="pa-job" style={v({ "--k": k })}>
          <b><Icon name="queues" size={14} variant="Linear" /></b><i /><em />
          {k === 0 && <u />}
        </span>
      ))}
    </div>
  );
}

/** Webhooks: your app and another service, joined by a wire; a sealed event travels along it. */
export function RelayArt() {
  return (
    <div className="pa pa-relay">
      <span className="pa-tile mark"><i /></span>
      <span className="pa-wire"><span className="pa-env"><Icon name="mail" size={13} variant="Linear" /></span></span>
      <span className="pa-tile"><Icon name="webhooks" size={26} variant="Linear" /></span>
      <span className="pa-seal">signed</span>
    </div>
  );
}

/** Environments: three plates rising, the change moving up them. */
export function EnvArt() {
  return (
    <div className="pa pa-env-stack">
      {["development", "staging", "production"].map((name, i) => (
        <span key={name} className={`pa-plate p${i}`}><i />{name}</span>
      ))}
      <span className="pa-promote"><Icon name="arrowRight" size={13} /></span>
    </div>
  );
}

/** Observability: a matte screen with a line drawn over a dotted ground and a dashed limit across it. */
export function MonitorArt() {
  return (
    <div className="pa pa-monitor">
      <div className="pa-screen">
        <svg viewBox="0 0 300 120" preserveAspectRatio="none">
          <path className="pa-limit" d="M0 34 H300" />
          <path className="pa-area" d="M0 96 L30 88 L60 92 L90 70 L120 78 L150 52 L180 66 L210 28 L240 58 L270 50 L300 62 L300 120 L0 120 Z" />
          <path className="pa-trace" d="M0 96 L30 88 L60 92 L90 70 L120 78 L150 52 L180 66 L210 28 L240 58 L270 50 L300 62" pathLength="100" />
        </svg>
        <span className="pa-peak" />
      </div>
    </div>
  );
}

/** Database: a table as a matte panel: column heads, rows pressed in as wells, the newest row lit as it lands. */
export function TableArt({ columns = ["id", "customer", "total", "status"] }: { columns?: string[] }) {
  return (
    <div className="pa pa-table">
      <div className="pa-sheet" style={v({ "--c": columns.length })}>
        <div className="pa-th">{columns.map((c) => <span key={c}>{c}</span>)}</div>
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} className={`pa-tr ${r === 0 ? "new" : ""}`}>
            {columns.map((c, i) => <i key={c} style={v({ "--w": `${40 + ((r * 13 + i * 29) % 50)}%` })} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A short piece of code on a matte panel, with a file tab and a caret. */
export function CodeArt({ code, tab }: { code: string; tab: string }) {
  return (
    <div className="pa pa-code">
      <div className="pa-editor">
        <span className="pa-tab">{tab}</span>
        <pre><code>{code}</code><i /></pre>
      </div>
    </div>
  );
}
