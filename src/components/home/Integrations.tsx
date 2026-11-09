import { useEffect, useState } from "react";

import { Arrow, Rule, SectionHead } from "./Home";
import "./integrations.css";
import { DOCS } from "@/lib/links";

/*
 * The tools an agent can use: the 24 apps Studio's agent builder offers, each with its real mark in the company's own colours
 * (public/integrations, bundled so the page makes no third-party image requests) on a white app-icon tile. DeepWiki and Context7
 * have no openly licensed mark, so they get a plain icon, as in Studio. A tile lights up now and then, one at a time; hovering
 * one lifts it. A line of orange dots runs along the head.
 */

type Item = { name: string; logo: string } | { name: string; icon: "book" | "code" };

const APPS: Item[] = [
  { name: "Notion", logo: "notion" }, { name: "Linear", logo: "linear" }, { name: "Jira & Confluence", logo: "atlassian" }, { name: "monday.com", logo: "monday" },
  { name: "Airtable", logo: "airtable" }, { name: "Zapier", logo: "zapier" }, { name: "GitHub", logo: "github" }, { name: "Sentry", logo: "sentry" },
  { name: "Supabase", logo: "supabase" }, { name: "Neon", logo: "neon" }, { name: "Postman", logo: "postman" }, { name: "Cloudflare", logo: "cloudflare" },
  { name: "DeepWiki", icon: "book" }, { name: "Context7", icon: "code" }, { name: "Stripe", logo: "stripe" }, { name: "Shopify", logo: "shopify" },
  { name: "Intercom", logo: "intercom" }, { name: "PostHog", logo: "posthog" }, { name: "Tavily", logo: "tavily" }, { name: "Exa", logo: "exa" },
  { name: "Firecrawl", logo: "firecrawl" }, { name: "Apify", logo: "apify" }, { name: "Hugging Face", logo: "huggingface" }, { name: "Any MCP server", logo: "mcp" },
];
const COLUMNS = 8;

function Glyph({ icon }: { icon: "book" | "code" }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#121316" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon === "book" ? <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 5.5v16M8.5 8h7" /> : <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />}
    </svg>
  );
}

function Cell({ item, index, lit }: { item: Item; index: number; lit: boolean }) {
  return (
    <li className={`int-cell${lit ? " lit" : ""}`} style={{ ["--d" as string]: `${((index % COLUMNS) * 0.05 + Math.floor(index / COLUMNS) * 0.08).toFixed(3)}s` }}>
      <span className="int-tile">
        {"logo" in item ? <img src={`/integrations/${item.logo}.svg`} alt="" width="30" height="30" loading="lazy" decoding="async" /> : <Glyph icon={item.icon} />}
      </span>
      <span className="int-name">{item.name}</span>
    </li>
  );
}

export function Integrations() {
  const [lit, setLit] = useState<number | null>(null);

  // now and then a tile lights up
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setLit((on) => {
      let next = Math.floor(Math.random() * APPS.length);
      if (next === on) next = (next + 1) % APPS.length;
      return next;
    }), 1300);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="ix-section" aria-labelledby="integrations-title" data-plain="">
      <Rule />
      <SectionHead id="integrations-title" title="Agents that use your tools">
        <a href={DOCS} className="ix-btn caps">Read the docs <Arrow /></a>
      </SectionHead>
      <div className="ix-panel int-panel" data-reveal="up">
        <Rule />
        <header className="int-head">
          <h3>Agent apps</h3>
          <span className="int-count">{APPS.length}</span>
          <p>Connect an app once, with its own key, and any agent can search, read and write in it.</p>
          <span className="int-flow" aria-hidden="true" />
        </header>
        <ul className="int-grid" aria-label="Apps an agent can use">
          {APPS.map((item, i) => <Cell key={item.name} item={item} index={i} lit={lit === i} />)}
        </ul>
      </div>
    </section>
  );
}
