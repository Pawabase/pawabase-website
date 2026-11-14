import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { TableArt } from "@/components/product/objects";
import { ProductHero } from "@/components/product/sections";

import "./database.css";

/*
 * Database, told through the table itself. The hero is a table. Then: the same table blown up with notes pinned to its parts;
 * a value being tried against a field's type and refused when it does not fit; the history of changes as a rail you can step back
 * along; and a switch between the Postgres we run and the one you bring. Nothing here appears on another product page.
 */

const COLS: [string, string][] = [["id", "ULID"], ["customer", "Reference"], ["total", "Decimal"], ["status", "Text"]];
const ROWS: [string, string, string, string][] = [
  ["01JC9A41", "Ada Lovelace", "128.00", "paid"],
  ["01JC9A40", "Grace Hopper", "64.50", "shipped"],
  ["01JC9A3F", "Alan Turing", "212.00", "pending"],
  ["01JC9A3E", "Radia Perlman", "310.00", "paid"],
];

function Annotated() {
  return (
    <section className="ix-section" aria-labelledby="db-anatomy-title" data-plain="">
      <SectionHead id="db-anatomy-title" title="One table, four jobs" lead="A table in Pawabase is more than rows. Each part of it does something for your app the moment it exists." />
      <div className="db-anatomy" data-reveal="up">
        <div className="db-sheet" aria-hidden="true">
          <div className="db-sheet-head">
            {COLS.map(([name, type]) => <span key={name}><b>{name}</b><small>{type}</small></span>)}
            <span className="db-lock"><Icon name="lock" size={14} variant="Linear" /></span>
          </div>
          {ROWS.map((r, i) => (
            <div key={r[0]} className={`db-sheet-row ${i === 2 ? "hidden" : ""}`}>
              <code>{r[0]}</code>
              <span className="db-ref"><Icon name="link" size={12} variant="Linear" />{r[1]}</span>
              <span className="num">{r[2]}</span>
              <span><i className={`db-pill ${r[3]}`}>{r[3]}</i></span>
            </div>
          ))}
          <div className="db-endpoint"><b>GET</b><code>/rest/v1/orders</code></div>
        </div>
        <p className="db-pin p1"><b>Every column has a type.</b> A total is a decimal, a date is a date. Wrong values never get in.</p>
        <p className="db-pin p2"><b>Linked records.</b> A customer is a reference, fetched together with the order when you ask.</p>
        <p className="db-pin p3"><b>Only the rows you may see.</b> A rule on the table hides the rest, in the database.</p>
        <p className="db-pin p4"><b>An address from day one.</b> The table answers on the Data API without a line of server code.</p>
      </div>
    </section>
  );
}

const TRIES: [string, string, boolean][] = [
  ["Decimal", "128.00", true],
  ["Decimal", "a lot", false],
  ["Email", "ada@example.com", true],
  ["Date", "next tuesday", false],
  ["Date", "2026-11-14", true],
  ["Email", "ada at example", false],
];

function Gate() {
  const at = useTicker(1900, 0) % TRIES.length;
  const [type, value, ok] = TRIES[at];
  return (
    <section className="ix-section ix-band" aria-labelledby="db-gate-title" data-plain="">
      <SectionHead id="db-gate-title" title="Bad data stops at the door" lead="Each field knows what it holds. A write that does not fit is refused before it reaches the table, and your app is told why." />
      <div className="db-gate" data-reveal="up">
        <div className="db-types" aria-hidden="true">
          {["Text", "Decimal", "Whole number", "Date", "Email", "URL", "JSON", "Reference", "Vector"].map((t) => <span key={t} className={t === type ? "on" : ""}>{t}</span>)}
        </div>
        <div className="db-try" aria-live="polite">
          <span className="db-field">{type}</span>
          <span key={at} className={`db-value ${ok ? "ok" : "no"}`}>{value}</span>
          <span key={`v${at}`} className={`db-verdict ${ok ? "ok" : "no"}`}>{ok ? "Saved" : `Refused: not a ${type.toLowerCase()}`}</span>
        </div>
      </div>
    </section>
  );
}

const CHANGES: [string, string][] = [
  ["Create table orders", "Applied"],
  ["Add field shipped_at", "Applied"],
  ["Index orders by status", "Applied"],
  ["Drop field coupon", "Applied"],
  ["Add field discount", "Waiting for you"],
];

function History() {
  const [at, setAt] = useState(CHANGES.length - 1);
  return (
    <section className="ix-section" aria-labelledby="db-history-title" data-plain="">
      <SectionHead id="db-history-title" title="Every change, kept and undoable" lead="Preview a change before it runs. Step back through the ones you made. A dropped field or table can come back." />
      <div className="db-history" data-reveal="up">
        <ol className="db-rail">
          {CHANGES.map(([what, state], i) => (
            <li key={what} className={`${i === at ? "at" : ""} ${i > at ? "after" : ""}`}>
              <button type="button" onClick={() => setAt(i)} aria-pressed={i === at}>
                <i />
                <span>{what}</span>
                <small>{state}</small>
              </button>
            </li>
          ))}
        </ol>
        <div className="db-history-card">
          <small>Your table as of</small>
          <b>{CHANGES[at][0]}</b>
          <p>{at === CHANGES.length - 1 ? "This change is waiting. Read what it will do, then apply it." : `${CHANGES.length - 1 - at} later change${CHANGES.length - 1 - at === 1 ? "" : "s"} would be undone. Nothing runs until you say so.`}</p>
          <span className="btn btn-light btn-sm">{at === CHANGES.length - 1 ? "Apply change" : "Restore to here"}</span>
        </div>
      </div>
    </section>
  );
}

function Hosting() {
  const [own, setOwn] = useState(false);
  return (
    <section className="ix-section ix-band" aria-labelledby="db-host-title" data-plain="">
      <SectionHead id="db-host-title" title="Postgres, ours or yours" lead="Your tables are Postgres tables. Use the database Pawabase runs for you, or connect your own and keep everything else the same.">
        <div className="db-switch" role="radiogroup" aria-label="Where Postgres runs">
          <button type="button" role="radio" aria-checked={!own} onClick={() => setOwn(false)}>We run it</button>
          <button type="button" role="radio" aria-checked={own} onClick={() => setOwn(true)}>Bring your own</button>
        </div>
      </SectionHead>
      <div className={`db-host ${own ? "own" : ""}`} data-reveal="up" aria-hidden="true">
        <div className="db-box">
          <span className="db-box-name">Pawabase</span>
          <div className="db-box-parts">{["API", "Rules", "Editor", "Flows"].map((p) => <span key={p}>{p}</span>)}</div>
          <div className="db-pg in"><Icon name="database" size={20} variant="Linear" /> Postgres</div>
        </div>
        <span className="db-wire"><i /></span>
        <div className="db-pg out"><Icon name="database" size={20} variant="Linear" /> Your Postgres</div>
      </div>
    </section>
  );
}

export default function DatabasePage() {
  return (
    <ProductFrame
      name="Database"
      description="Postgres tables with an API, access rules, an editor, relations, vector search and safe schema changes."
      hero={
        <ProductHero
          title="Real Postgres tables,"
          quiet="ready to use."
          lead="Every table comes with an API, access rules and an editor from the moment you create it."
          art={<TableArt />}
          notes={["Postgres", "An API from day one", "Access rules on every row"]}
        />
      }
    >
      <Annotated />
      <Gate />
      <History />
      <Hosting />
    </ProductFrame>
  );
}
