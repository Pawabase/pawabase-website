import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./database.css";

/* A table you can see: the hero's table runs rail to rail with new rows landing in it, then the field types as type, Postgres as a solid band, a schema change waiting for review, and a ledger. */

const PEOPLE: [string, string, string, boolean][] = [
  ["Ada Lovelace", "128.00", "paid", true],
  ["Grace Hopper", "64.50", "shipped", true],
  ["Alan Turing", "212.00", "pending", false],
  ["Katherine Johnson", "39.99", "paid", true],
  ["Edsger Dijkstra", "87.25", "pending", false],
  ["Radia Perlman", "310.00", "shipped", true],
  ["Linus Pauling", "18.40", "paid", true],
];
const COLUMNS: [string, string][] = [["id", "ULID"], ["customer", "Reference"], ["total", "Decimal"], ["status", "Text"], ["paid", "Yes or no"]];
const TYPES = ["Text", "Long text", "Whole number", "Decimal", "Yes or no", "Date", "Date and time", "Email", "URL", "UUID", "ULID", "JSON", "List", "Object", "Reference", "Vector"];
const CHANGES: [string, string, string][] = [
  ["Add", "discount", "Waiting for you"],
  ["Add index", "orders by status", "Applied"],
  ["Add", "shipped_at", "Applied"],
  ["Create table", "orders", "Applied"],
];
const LEDGER: [string, string][] = [
  ["An editor for your rows", "Browse, filter and edit data without writing a query."],
  ["An API for every table", "Ready to call from your app, with access rules applied."],
  ["Relations", "Link records across tables and fetch them together."],
  ["Vector search", "Keep embeddings beside your data and find similar records."],
  ["SQL when you want it", "Query any table and save the queries you use often."],
  ["Data per environment", "Development, staging and production never share data."],
];

function LiveTable() {
  const head = useTicker(2200);
  const rows = Array.from({ length: 6 }, (_, k) => {
    const n = head - k;
    return { n, person: PEOPLE[((n % PEOPLE.length) + PEOPLE.length) % PEOPLE.length] };
  });
  return (
    <div className="db-table" role="presentation" aria-hidden="true">
      <div className="db-row db-head">
        {COLUMNS.map(([name, kind]) => <span key={name}><b>{name}</b><small>{kind}</small></span>)}
      </div>
      {rows.map(({ n, person }, k) => (
        <div key={n} className={`db-row ${k === 0 ? "new" : ""}`}>
          <span className="id">01JC{String(9000 + (((n % 900) + 900) % 900)).padStart(4, "0")}</span>
          <span>{person[0]}</span>
          <span className="num">{person[1]}</span>
          <span><i className={`db-status ${person[2]}`}>{person[2]}</i></span>
          <span>{person[3] ? "Yes" : "No"}</span>
        </div>
      ))}
    </div>
  );
}

function FieldTypes() {
  const lit = useTicker(900) % TYPES.length;
  return (
    <p className="db-types">
      {TYPES.map((type, i) => <span key={type} className={i === lit ? "lit" : ""}>{type}{i < TYPES.length - 1 ? "," : "."} </span>)}
    </p>
  );
}

export default function DatabasePage() {
  return (
    <ProductFrame name="Database" description="Postgres tables with an API, access rules, an editor, relations, vector search and safe schema changes.">
      <section className="ix-hero db-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="db-intro">
          <h1 id="product-title" data-reveal="up">Real Postgres tables,<br /><em>ready to use.</em></h1>
          <div data-reveal="up">
            <p>Every table comes with an API, access rules and an editor from the moment you create it.</p>
            <HeroActions />
          </div>
        </div>
        <LiveTable />
      </section>

      <Band label="Field types" className="db-types-band">
        <div className="db-types-count" aria-hidden="true">16</div>
        <div>
          <h2>Sixteen field types. Every value checked on every write.</h2>
          <FieldTypes />
        </div>
      </Band>

      <Band label="Postgres underneath" className="db-solid">
        <span className="db-solid-word" aria-hidden="true">POSTGRES</span>
        <h2>Postgres underneath.</h2>
        <p>Use the database we run for you, or bring your own.</p>
      </Band>

      <Band label="Schema changes" className="db-changes">
        <div className="db-changes-copy">
          <h2>See every change before it runs.</h2>
          <p>Preview what a change will do, keep a history of the ones you made, and undo a dropped table.</p>
        </div>
        <ol className="db-timeline" aria-hidden="true">
          {CHANGES.map(([verb, what, state], i) => (
            <li key={what} className={i === 0 ? "now" : ""}>
              <i />
              <span><b>{verb}</b> {what}</span>
              <small>{state}</small>
            </li>
          ))}
        </ol>
      </Band>

      <Band label="Everything in Database" className="db-ledger">
        <dl>
          {LEDGER.map(([title, line]) => (
            <div key={title}><dt>{title}</dt><dd>{line}</dd></div>
          ))}
        </dl>
      </Band>
    </ProductFrame>
  );
}
