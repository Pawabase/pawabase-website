import { useEffect, useState } from "react";

import { Icon } from "@/components/Icon";

import { Rule, SectionHead } from "./Home";
import "./bento.css";

/*
 * The "every part works with every other part" bento, in the Cloudflare bento's layout: two rows on a dotted ground
 * with corner squares; a wide tile beside a solid orange one, then a narrow tile beside a wide one. Tiles are square,
 * separated by a small gap, with the title and line set low.
 */

/** Requests against a table's API, newest first. Uses the real query syntax. */
const CALLS: [string, string][] = [
  ["GET /orders", "filter[status]=eq.paid"],
  ["GET /orders/{id}", "expand=customer"],
  ["GET /customers", "page=2&per_page=50"],
  ["GET /orders", "sort=-created_at"],
  ["GET /orders", "search=refund"],
];

function Requests() {
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setHead((h) => h + 1), 2600);
    return () => window.clearInterval(timer);
  }, []);
  const rows = [0, 1, 2, 3].map((k) => {
    const n = head - k;
    return { n, call: CALLS[((n % CALLS.length) + CALLS.length) % CALLS.length] };
  });
  return (
    <ol className="cf-rows" aria-hidden="true">
      {rows.map(({ n, call }, k) => (
        <li key={n} className={k === 0 ? "pending" : ""}>
          <span className="cf-row-a">{call[0]}</span>
          <span className="cf-row-b">{call[1]}</span>
          <span className="cf-row-c">
            {k === 0 ? <>Pending<i className="cf-spin" /></> : <>200<i className="cf-ok"><Check /></i></>}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Elbow() {
  return (
    <svg className="cf-elbow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 2v7a2 2 0 0 0 2 2h8m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AGENT_CALLS: [string, string, string][] = [
  ["flow", "refund-order", "Anthropic"],
  ["endpoint", "POST /support", "OpenAI"],
  ["route", "/help", "Google Gemini"],
];

export function Highlights() {
  return (
    <section className="ix-section" aria-labelledby="highlights-title" data-plain="">
      <Rule />
      <SectionHead id="highlights-title" title="Every part works with every other part" />
      <div className="ix-panel cf-panel" data-reveal="up">
        <Rule />
        <div className="cf-bento">
          <i className="cf-corner tl" /><i className="cf-corner tr" /><i className="cf-corner bl" /><i className="cf-corner br" />

          <article className="cf-tile cf-api">
            <div className="cf-api-top">
              <span className="cf-app" aria-hidden="true">
                <i className="cf-app-mark" />
                <span className="cf-app-badge"><Icon name="code" size={14} variant="Linear" /></span>
              </span>
              <Requests />
            </div>
            <div className="cf-copy">
              <h3>Tables that are already APIs</h3>
              <p>Create a table and get endpoints with filters, relations and pages.</p>
            </div>
          </article>

          <article className="cf-tile cf-solid">
            <Icon name="users" size={28} variant="Linear" />
            <div className="cf-copy top">
              <h3>Auth for your app, built in</h3>
              <p>Sign-in, two-step, organizations and roles, ready for your users from day one.</p>
            </div>
          </article>

          <article className="cf-tile cf-rule">
            <span className="cf-shield" aria-hidden="true"><i /></span>
            <div className="cf-copy">
              <Icon name="policies" size={24} variant="Linear" />
              <h3>Write the rule once</h3>
              <p>One policy guards endpoints, tables, files, flows and agents.</p>
            </div>
          </article>

          <article className="cf-tile cf-agents">
            <div className="cf-copy top narrow">
              <h3>Agents, called from anywhere</h3>
              <p>Call an agent from a flow, an endpoint or a route, with the model you choose.</p>
            </div>
            <div className="cf-term" aria-hidden="true">
              <div className="cf-term-log">
                <p className="hot"><i className="cf-dot" />3 callers connected</p>
                <ul>
                  {AGENT_CALLS.map(([kind, name, model]) => (
                    <li key={kind}><Elbow /><code>{kind}</code><span className="cf-arrow">→</span>{name}<span className="cf-sep">•</span>{model}</li>
                  ))}
                </ul>
                <p className="hot"><i className="cf-grid" /><span>Waiting for the model<span className="cf-ellipsis" /></span></p>
              </div>
              <div className="cf-term-dots" />
              <div className="cf-term-input">
                <span>&gt;</span>
                <b>Enter <kbd>↵</kbd></b>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
