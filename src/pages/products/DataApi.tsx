import { useState } from "react";

import { SectionHead } from "@/components/home/Home";
import { ProductFrame } from "@/components/product/ProductFrame";
import { EndpointArt } from "@/components/product/objects";
import { ProductHero } from "@/components/product/sections";

import "./dataapi.css";

/*
 * Data API, told through a request. The hero is a request and its answer. Then: a query you build by clicking, the address and the
 * answer changing as you do; the five endpoints of a table as five plates with their own switches; the same call in three languages;
 * and v1 and v2 served side by side. Nothing here appears on another product page.
 */

type Part = { key: string; label: string; query: string };
const PARTS: Part[] = [
  { key: "status", label: "Only paid", query: "filter[status]=eq.paid" },
  { key: "sort", label: "Biggest first", query: "sort=-total" },
  { key: "expand", label: "With the customer", query: "expand=customer" },
  { key: "page", label: "Page 2", query: "page=2" },
];
const ORDERS: { id: string; total: number; status: string; who: string }[] = [
  { id: "1042", total: 128, status: "paid", who: "Ada" },
  { id: "1043", total: 64.5, status: "shipped", who: "Grace" },
  { id: "1044", total: 212, status: "pending", who: "Alan" },
  { id: "1045", total: 310, status: "paid", who: "Radia" },
  { id: "1046", total: 39.99, status: "paid", who: "Katherine" },
];

function Builder() {
  const [on, setOn] = useState<string[]>(["status"]);
  const toggle = (key: string) => setOn((o) => (o.includes(key) ? o.filter((k) => k !== key) : [...o, key]));
  const has = (k: string) => on.includes(k);
  let rows = ORDERS.filter((o) => !has("status") || o.status === "paid");
  if (has("sort")) rows = [...rows].sort((a, b) => b.total - a.total);
  if (has("page")) rows = rows.slice(2);
  const query = PARTS.filter((p) => has(p.key)).map((p) => p.query).join("&");
  return (
    <section className="ix-section" aria-labelledby="ap-build-title" data-plain="">
      <SectionHead id="ap-build-title" title="Say what you want in the address" lead="Filters, order, related records and pages are plain words in the URL. Click a few and watch the request and its answer change." />
      <div className="ap-build" data-reveal="up">
        <div className="ap-parts" role="group" aria-label="Parts of the request">
          {PARTS.map((p) => <button key={p.key} type="button" aria-pressed={has(p.key)} onClick={() => toggle(p.key)}>{p.label}</button>)}
        </div>
        <div className="ap-url"><b>GET</b><code>/rest/v1/orders{query ? `?${query}` : ""}</code></div>
        <div className="ap-answer" aria-live="polite">
          <span className="ap-status">200 · {rows.length} {rows.length === 1 ? "row" : "rows"}</span>
          <pre>{rows.length === 0 ? "[]" : `[\n${rows.map((r) => `  { "id": "${r.id}", "total": ${r.total.toFixed(2)}, "status": "${r.status}"${has("expand") ? `,\n    "customer": { "name": "${r.who}" }` : ""} }`).join(",\n")}\n]`}</pre>
        </div>
      </div>
    </section>
  );
}

const DOORS: [string, string, string][] = [
  ["GET", "List", "/orders"],
  ["GET", "Read", "/orders/{id}"],
  ["POST", "Create", "/orders"],
  ["PATCH", "Update", "/orders/{id}"],
  ["DELETE", "Delete", "/orders/{id}"],
];

function Doors() {
  const [open, setOpen] = useState([true, true, true, true, false]);
  return (
    <section className="ix-section ix-band" aria-labelledby="ap-doors-title" data-plain="">
      <SectionHead id="ap-doors-title" title="Five endpoints, each with its own switch" lead="Every table gets list, read, create, update and delete. Turn off the ones a table should not offer, and the gateway refuses them." />
      <div className="ap-doors" data-reveal="up">
        {DOORS.map(([method, name, path], i) => (
          <button key={name} type="button" className={`ap-door ${open[i] ? "" : "shut"}`} aria-pressed={open[i]} onClick={() => setOpen(open.map((v, j) => (j === i ? !v : v)))}>
            <span className="ap-method">{method}</span>
            <b>{name}</b>
            <code>{path}</code>
            <span className="ap-toggle" aria-hidden="true"><i /></span>
            <small>{open[i] ? "Answering" : "Refused: switched off"}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

const SNIPPETS: [string, string][] = [
  ["TypeScript", `const orders = await pb.from("orders")\n  .eq("status", "paid")\n  .all();`],
  ["Python", `orders = (pb.from_("orders")\n    .eq("status", "paid")\n    .all())`],
  ["HTTP", `curl -G "$URL/rest/v1/orders" \\\n  -d "filter[status]=eq.paid" \\\n  -H "apikey: $KEY"`],
];

function Languages() {
  return (
    <section className="ix-section" aria-labelledby="ap-langs-title" data-plain="">
      <SectionHead id="ap-langs-title" title="Three ways to ask for the same rows" lead="The SDKs read like a sentence. Plain HTTP works from anything else. All three get the same answer, through the same rules." />
      <div className="ap-langs" data-reveal="up">
        {SNIPPETS.map(([name, code], i) => (
          <figure key={name} className="ap-lang" style={{ ["--i" as string]: i }}>
            <figcaption>{name}</figcaption>
            <pre><code>{code}</code></pre>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Versions() {
  return (
    <section className="ix-section ix-band" aria-labelledby="ap-versions-title" data-plain="">
      <SectionHead id="ap-versions-title" title="The next API, beside the one you have" lead="Serve v2 next to v1 on the same tables. Apps already in people's hands keep working while new ones move on." />
      <div className="ap-versions" data-reveal="up" aria-hidden="true">
        <div className="ap-track"><code>/rest/v1</code><span className="ap-lane"><i /><i /><i /></span><span className="ap-who">The app already installed</span></div>
        <div className="ap-track next"><code>/rest/v2</code><span className="ap-lane"><i /><i /><i /></span><span className="ap-who">The app you are shipping</span></div>
        <div className="ap-tables"><span>orders</span><span>customers</span><span>products</span></div>
      </div>
    </section>
  );
}

export default function DataApiPage() {
  return (
    <ProductFrame
      name="Data API"
      description="A REST API for every table: filters, sorting, relations, search, pages, OpenAPI docs and side-by-side versions."
      hero={
        <ProductHero
          title="An API for every table."
          quiet="Create it, call it."
          lead="Every table answers on a REST API the moment it exists, documented in OpenAPI, with your access rules checked on every request."
          art={<EndpointArt path="/rest/v1/orders?status=paid" />}
          notes={["No server code", "Safe from the browser", "OpenAPI included"]}
        />
      }
    >
      <Builder />
      <Doors />
      <Languages />
      <Versions />
    </ProductFrame>
  );
}
