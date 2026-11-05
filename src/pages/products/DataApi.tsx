import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./dataapi.css";

/* The URL is the hero: a real request builds itself in huge type, one parameter at a time. Then the five endpoints as five columns, the same query in every client, and the parameters as tiles. */

const PARAMS: [string, string][] = [
  ["filter[status]=eq.paid", "Only paid orders"],
  ["expand=customer", "With their customer"],
  ["sort=-created_at", "Newest first"],
  ["select=id,total", "Just these fields"],
  ["page=2&per_page=50", "Fifty at a time"],
];
const ENDPOINTS = ["List", "Get", "Create", "Update", "Delete"];
const CLIENTS: [string, string][] = [
  ["TypeScript", `const orders = await pb.from("orders")\n  .eq("status", "paid")\n  .all();`],
  ["Python", `orders = (pb.from_("orders")\n    .eq("status", "paid")\n    .all())`],
  ["HTTP", `curl -G "$URL/rest/v1/orders" \\\n  -d "filter[status]=eq.paid" \\\n  -H "apikey: $KEY"`],
];
const TILES: [string, string, string][] = [
  ["filter[ ]", "Filters and sorting", "Narrow and order results with readable parameters."],
  ["expand=", "Relations in one call", "Bring related records along instead of making extra requests."],
  ["search=", "Full-text search", "Search across the text fields you choose."],
  ["page=", "Pages", "Move through large tables without loading everything."],
  ["/openapi", "Documented as you build", "An OpenAPI document and an explorer that always match your tables."],
  ["/rest/v2", "Versions side by side", "Serve the next version of your API beside the current one."],
];

function Request() {
  const tick = useTicker(1700, PARAMS.length);
  const shown = tick % (PARAMS.length + 2);
  return (
    <div className="ap-request" aria-hidden="true">
      <p className="ap-line first"><b>GET</b> /rest/v1/orders{shown === 0 && <i className="ap-caret" />}</p>
      {PARAMS.map(([param, said], i) => (
        <p key={param} className={`ap-line ${i < shown ? "on" : ""} ${i === shown - 1 ? "new" : ""}`}>
          <span>{i === 0 ? "?" : "&"}{param}{i === shown - 1 && <i className="ap-caret" />}</span>
          <small>{said}</small>
        </p>
      ))}
    </div>
  );
}

function Endpoints() {
  const off = useTicker(2600) % ENDPOINTS.length;
  return (
    <div className="ap-verbs" aria-hidden="true">
      {ENDPOINTS.map((verb, i) => (
        <div key={verb} className={`ap-verb ${i === off ? "off" : ""}`}>
          <span className="ap-switch"><i /></span>
          <b>{verb}</b>
        </div>
      ))}
    </div>
  );
}

export default function DataApiPage() {
  return (
    <ProductFrame name="Data API" description="A REST API for every table: filters, sorting, relations, search, pages, OpenAPI docs and side-by-side versions.">
      <section className="ix-hero ap-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="ap-top">
          <h1 id="product-title" data-reveal="up">An API for every table.</h1>
          <p data-reveal="up">Create a table and call it straight away.</p>
        </div>
        <Request />
        <HeroActions className="ap-actions" />
      </section>

      <Band label="Five endpoints" className="ap-five">
        <div className="ap-five-copy">
          <h2>Five endpoints per table.</h2>
          <p>Switch each one on or off. Every request is checked against your access rules, on the server, so it is safe to call from the browser.</p>
        </div>
        <Endpoints />
      </Band>

      <Band label="Call it from anywhere" className="ap-clients">
        {CLIENTS.map(([name, code]) => (
          <article key={name}>
            <h3>{name}</h3>
            <pre><code>{code}</code></pre>
          </article>
        ))}
      </Band>

      <Band label="Everything in the Data API" className="ap-tiles">
        {TILES.map(([param, title, line]) => (
          <article key={title}>
            <span className="ap-param" aria-hidden="true">{param}</span>
            <h3>{title}</h3>
            <p>{line}</p>
          </article>
        ))}
      </Band>
    </ProductFrame>
  );
}
