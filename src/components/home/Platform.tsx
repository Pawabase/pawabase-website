import type { ReactNode } from "react";
import { SiGithub, SiLinear, SiNotion, SiStripe } from "@icons-pack/react-simple-icons";
import { Sms } from "iconsax-react";

import { Icon } from "@/components/Icon";
import { DOCS } from "@/lib/links";

import "./platform.css";

/*
 * Everything in Pawabase, as a bento in the manner of Clerk's "Auth that keeps evolving": three staggered columns (short over
 * tall, tall over short, short over tall), then a narrow card beside a wide one. Each card holds one object and almost no text:
 * a grid of cells, a shield button in its groove, a portrait card, a hub with its nodes, a phone, a picture and its copy, an
 * envelope on its tray, an agent under a spotlight. The objects are matte and lit from above; thin lines run off the card's edges.
 * Grey throughout, with orange as a rare small accent. No example data: no names, rows or messages.
 */

function Card({ title, line, art, top = false, side = false, className = "" }: {
  title: string; line: ReactNode; art: ReactNode; top?: boolean; side?: boolean; className?: string;
}) {
  return (
    <article className={`pf-card ${side ? "side" : top ? "text-top" : "text-bottom"} ${className}`}>
      <div className="pf-art" aria-hidden="true">{art}</div>
      <div className="pf-copy">
        <h3>{title}</h3>
        <p>{line}</p>
      </div>
    </article>
  );
}

/* ── the objects ───────────────────────────────────────────────────────────────────────────────────────────────────── */

/** Tables: a grid of recessed cells, one of them lit. */
export function Cells() {
  return (
    <div className="po-cells">
      {Array.from({ length: 15 }, (_, i) => <i key={i} style={{ ["--i" as string]: [7, 2, 11, 4, 13, 0, 9, 6, 14, 1, 10, 3, 12, 5, 8][i] }} />)}
    </div>
  );
}

/** Policies: a shield button sitting in its groove on a line, with nodes further down the line. */
export function Shield() {
  return (
    <div className="po-shield">
      <span className="po-line" />
      <span className="po-button"><Icon name="apiSecurity" size={34} variant="Linear" /></span>
      <span className="po-node n1" /><span className="po-node n2" /><span className="po-node n3" />
    </div>
  );
}

function Silhouette() {
  return (
    <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M32 46c-8.5 0-14-7.5-14-17s5.5-16 14-16 14 6.5 14 16-5.5 17-14 17Z" />
      <path d="M8 80c1.5-14 11-22 24-22s22.5 8 24 22" />
    </svg>
  );
}

/** Sign-in and organizations: a person's portrait card on a horizon, with their organization's badge. */
export function Portrait() {
  return (
    <div className="po-portrait">
      <span className="po-horizon" />
      <span className="po-card"><Silhouette /><span className="po-badge"><Icon name="users" size={14} variant="Linear" /></span></span>
      <span className="po-bars"><i /><i /></span>
    </div>
  );
}

/** Flows: a hub, and lines out to the things that start it and the steps it runs. */
export function Hub() {
  return (
    <div className="po-hub">
      <svg className="po-wires" viewBox="0 0 400 166" preserveAspectRatio="none">
        <path d="M0 40 H60 L96 76 H168 M400 40 H340 L304 76 H232 M140 76 V166 M260 76 V166 M184 0 V48 M216 0 V48" />
        <path className="po-run" d="M0 40 H60 L96 76 H168" pathLength="100" />
        <path className="po-run late" d="M232 76 H304 L340 40 H400" pathLength="100" />
      </svg>
      <span className="po-dot" style={{ left: "17%", top: "24%" }}><Icon name="events" size={17} variant="Linear" /></span>
      <span className="po-dot" style={{ left: "83%", top: "24%" }}><Sms size={17} color="currentColor" variant="Linear" /></span>
      <span className="po-dot small" style={{ left: "35%", top: "72%" }}><Icon name="scheduling" size={14} variant="Linear" /></span>
      <span className="po-dot small" style={{ left: "65%", top: "72%" }}><Icon name="webhooks" size={14} variant="Linear" /></span>
      <span className="po-core"><Icon name="automation" size={24} variant="Linear" /></span>
    </div>
  );
}

/** Realtime: the top of a phone, its apps, one with something new. */
export function Phone() {
  return (
    <div className="po-phone">
      <span className="po-lock"><Icon name="apiSecurity" size={11} variant="Bold" /></span>
      <div className="po-apps">
        <b><Icon name="realtime" size={19} variant="Linear" /></b>
        <b><Icon name="mail" size={19} variant="Linear" /><em /></b>
        <b><Icon name="users" size={19} variant="Linear" /></b>
        <b><Icon name="database" size={19} variant="Linear" /></b>
      </div>
    </div>
  );
}

function Landscape() {
  return (
    <svg viewBox="0 0 120 90" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 90 L36 50 L56 68 L82 38 L120 78 L120 90 Z" />
      <circle cx="90" cy="24" r="7" />
    </svg>
  );
}

/** Storage and images: a picture, and the smaller copy made from it, on a horizon. */
export function Picture() {
  return (
    <div className="po-picture">
      <span className="po-horizon" />
      <span className="po-photo big"><Landscape /></span>
      <span className="po-photo small"><Landscape /></span>
    </div>
  );
}

/** Mail: an envelope button on its tray. */
export function Envelope() {
  return (
    <div className="po-mail">
      <span className="po-tray"><i /></span>
      <span className="po-button small"><Sms size={26} color="currentColor" variant="Linear" /></span>
    </div>
  );
}

/** AI agents: a spotlight from above, the agent at its centre, the tools it uses on the arcs around it. */
export function Spotlight() {
  const tools: [typeof SiGithub, number, number][] = [[SiGithub, 30, 52], [SiNotion, 70, 52], [SiLinear, 18, 82], [SiStripe, 82, 82]];
  return (
    <div className="po-spot">
      <span className="po-beam" />
      <span className="po-arc a1" /><span className="po-arc a2" /><span className="po-arc a3" />
      <span className="po-eye"><Icon name="sparkle" size={16} variant="Linear" /></span>
      {tools.map(([Mark, x, y]) => <span key={`${x}-${y}`} className="po-dot small" style={{ left: `${x}%`, top: `${y}%` }}><Mark size={14} color="currentColor" /></span>)}
      {[[42, 30], [58, 34], [10, 60], [90, 62], [50, 70]].map(([x, y]) => <i key={`${x}-${y}`} className="po-star" style={{ left: `${x}%`, top: `${y}%` }} />)}
    </div>
  );
}

/* ── the section ───────────────────────────────────────────────────────────────────────────────────────────────────── */

export function Platform() {
  return (
    <section className="ix-section ix-band pf" aria-labelledby="platform-title" data-plain="">
      <header className="pf-head" data-reveal="up">
        <div>
          <p className="pf-label">Platform</p>
          <h2 id="platform-title">Every part works with every other part</h2>
          <p className="pf-lead">
            Data, sign-in, rules, files, flows and agents <b>share one model</b>, so a rule you write once guards all of them, and{" "}
            <b>nothing needs gluing together.</b>
          </p>
        </div>
        <a href={DOCS} className="pf-explore">
          Explore the platform
          <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden="true"><path d="M1 1l6 4-6 4z" fill="currentColor" /></svg>
        </a>
      </header>

      <div className="pf-grid" data-reveal="up">
        <div className="pf-col">
          <Card title="Tables with an API" line="Create a table and your app can read and write it straight away, with filters and relations." art={<Cells />} />
          <Card top className="tall" title="Access policies" line="Write who may do what once, for people and API keys alike. The same rule guards tables, endpoints, files, flows and agents." art={<Shield />} />
        </div>
        <div className="pf-col">
          <Card top className="tall" title="Sign-in and organizations" line="Passwords, social and company logins, two-step verification, and organizations with roles. Each customer's people use their own login." art={<Portrait />} />
          <Card title="Flows" line="Run work when a request, an event, a schedule or a webhook comes in." art={<Hub />} />
        </div>
        <div className="pf-col">
          <Card title="Realtime" line="Live updates, channels and presence over one connection." art={<Phone />} />
          <Card top className="tall" title="Storage and images" line="Files behind access rules, and images resized and re-encoded from their URL." art={<Picture />} />
        </div>

        <Card title="Mail" line="Email from templates you design, with a delivery log and one-click resend." art={<Envelope />} />
        <Card side className="span2" title="AI agents" line="Agents with the model you choose, using your tables, flows and apps as tools. Build with them from Claude or Cursor over MCP." art={<Spotlight />} />
      </div>
    </section>
  );
}
