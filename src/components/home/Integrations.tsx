import { SiGithub, SiLinear, SiNotion, SiShopify, SiStripe } from "@icons-pack/react-simple-icons";

import { Icon } from "@/components/Icon";

import { Arrow, SectionHead } from "./Home";
import "./integrations.css";
import { DOCS } from "@/lib/links";

/*
 * Agents that use your tools: three cards in the bento's manner (one matte object each, the words beneath), telling the whole
 * story in order: connect an app once with its own key; agents use it as a tool; anything permanent waits for a person. Under
 * them, one quiet line of the apps it works with. No orbits, no sparkles, no wall of logos.
 */

function Connect() {
  return (
    <div className="ag-connect">
      <span className="ag-tile app"><SiGithub size={26} color="currentColor" /></span>
      <span className="ag-wire"><i className="ag-key"><Icon name="apiSecurity" size={13} variant="Linear" /></i></span>
      <span className="ag-tile core"><i /></span>
    </div>
  );
}

function Use() {
  const rows: [typeof SiNotion, string][] = [[SiNotion, "a"], [SiLinear, "b"], [SiStripe, "c"]];
  return (
    <div className="ag-use">
      {rows.map(([Mark, k]) => (
        <span key={k} className={`ag-row ${k}`}><b><Mark size={14} color="currentColor" /></b><i /><em /></span>
      ))}
    </div>
  );
}

function Approve() {
  return (
    <div className="ag-approve">
      <span className="ag-ring" />
      <span className="ag-confirm"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="ix-section ix-band ag" aria-labelledby="integrations-title" data-plain="">
      <SectionHead id="integrations-title" title="Agents that use your tools"
        lead="Connect the apps your team already works in. Agents use them as tools, and anything permanent waits for you.">
        <a href={DOCS} className="btn">Read the docs <Arrow /></a>
      </SectionHead>

      <div className="ag-cards" data-reveal="up">
        <article className="ag-card"><div className="ag-art" aria-hidden="true"><Connect /></div>
          <h3>Connect once</h3><p>Each app gets its own key, and every agent in the project can use it.</p></article>
        <article className="ag-card"><div className="ag-art" aria-hidden="true"><Use /></div>
          <h3>Agents use it</h3><p>Agents search, read and write in your apps as part of their work.</p></article>
        <article className="ag-card"><div className="ag-art" aria-hidden="true"><Approve /></div>
          <h3>You approve what matters</h3><p>Refunds, deletions and messages wait for a person to say yes.</p></article>
      </div>

      <p className="ag-works">
        Works with
        <span aria-hidden="true">
          <SiGithub size={16} color="currentColor" /><SiNotion size={16} color="currentColor" /><SiLinear size={16} color="currentColor" />
          <SiStripe size={16} color="currentColor" /><SiShopify size={16} color="currentColor" />
        </span>
        GitHub, Notion, Linear, Stripe, Shopify and any MCP server.
      </p>
    </section>
  );
}
