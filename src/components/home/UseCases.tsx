import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { SIGN_UP } from "@/lib/links";

import { Arrow, SectionHead } from "./Home";
import "./platform.css";
import "./usecases.css";

/*
 * What people build on Pawabase, as a marquee of tall cards in the platform section's materials: across the top, the parts of
 * Pawabase the case leans on (icons, named for screen readers); in the middle, one matte object lit from above that moves a little;
 * at the foot, a title and one short line. No example data.
 */

const PART_NAMES: Partial<Record<IconName, string>> = {
  users: "Sign-in", building: "Organizations", code: "APIs", database: "Data", webhooks: "Webhooks", mail: "Mail", realtime: "Realtime",
  storage: "Storage", policies: "Policies", automation: "Flows", sparkle: "Agents", layers: "Blueprints",
};

function Case({ title, line, art, parts }: { title: string; line: string; art: ReactNode; parts: IconName[] }) {
  return (
    <article className="pf-card text-bottom uc-card">
      <ul className="uc-parts" aria-label={`Built with ${parts.map((p) => PART_NAMES[p]).join(", ")}`}>
        {parts.map((p) => <li key={p} title={PART_NAMES[p]}><Icon name={p} size={14} variant="Linear" /></li>)}
      </ul>
      <div className="pf-art" aria-hidden="true">{art}</div>
      <div className="pf-copy">
        <h3>{title}</h3>
        <p>{line}</p>
      </div>
    </article>
  );
}

/** SaaS: an app window with its sidebar, and the organizations that sign in to it. */
function Window() {
  return (
    <div className="uo-window">
      <span className="uo-frame">
        <i className="uo-dots"><b /><b /><b /></i>
        <i className="uo-side"><b className="on" /><b /><b /><b /></i>
        <i className="uo-main"><b /><b /><b /></i>
      </span>
      <span className="uo-orgs"><b /><b /><b className="on" /></span>
    </div>
  );
}

/** Stores: a bag on its tray, with a price tag. */
function Bag() {
  return (
    <div className="uo-bag">
      <span className="uo-tray" />
      <span className="uo-handle" />
      <span className="uo-body"><i className="uo-clasp" /></span>
      <span className="uo-tag"><i /></span>
    </div>
  );
}

/** Web and mobile apps: a laptop and a phone sharing one backend. */
function Devices() {
  return (
    <div className="uo-devices">
      <span className="uo-laptop"><i /></span>
      <span className="uo-base" />
      <span className="uo-phone"><i /></span>
    </div>
  );
}

/** Internal tools: rows waiting on a person, one approved. */
function Rows() {
  return (
    <div className="uo-rows">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`uo-row ${i === 1 ? "on" : ""}`}>
          <i className="uo-box">{i === 1 && <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</i>
          <i className="uo-bar" />
          <i className="uo-pill" />
        </span>
      ))}
    </div>
  );
}

/** AI assistants: a question, an answer being written, the agent's mark. */
function Chat() {
  return (
    <div className="uo-chat">
      <span className="uo-bubble me"><i /></span>
      <span className="uo-bubble ai"><i /><i /><em className="uo-typing"><b /><b /><b /></em></span>
      <span className="uo-mark"><Icon name="sparkle" size={16} variant="Linear" /></span>
    </div>
  );
}

/** Communities: people around a feed, one with something new. */
function People() {
  return (
    <div className="uo-people">
      <span className="uo-feed"><i /><i /></span>
      {[[18, 30], [82, 30], [12, 72], [88, 72]].map(([x, y], i) => (
        <span key={i} className={`uo-face ${i === 1 ? "on" : ""}`} style={{ left: `${x}%`, top: `${y}%` }}><Icon name="users" size={14} variant="Linear" /></span>
      ))}
    </div>
  );
}

/** Client work: one blueprint, stamped into a project per client. */
function Projects() {
  return (
    <div className="uo-projects">
      <span className="uo-print"><Icon name="layers" size={22} variant="Linear" /></span>
      <span className="uo-wire" />
      <span className="uo-stack"><i /><i /><i className="on" /></span>
    </div>
  );
}

const CASES: { title: string; line: string; art: ReactNode; parts: IconName[] }[] = [
  { title: "SaaS products", line: "Organizations, roles, company sign-in and an API your customers can call.", art: <Window />, parts: ["users", "building", "code"] },
  { title: "Stores and marketplaces", line: "Products, orders, payment webhooks and the emails that follow.", art: <Bag />, parts: ["database", "webhooks", "mail"] },
  { title: "Web and mobile apps", line: "One backend for every screen, with live updates.", art: <Devices />, parts: ["users", "realtime", "storage"] },
  { title: "Internal tools", line: "Back offices and approvals your whole team can use.", art: <Rows />, parts: ["database", "policies", "automation"] },
  { title: "AI assistants", line: "Agents that answer from your data and act within your rules.", art: <Chat />, parts: ["sparkle", "database", "policies"] },
  { title: "Communities", line: "Profiles, feeds, follows and notifications.", art: <People />, parts: ["users", "realtime", "mail"] },
  { title: "Client projects", line: "Agencies start every client from the same blueprint, in its own project.", art: <Projects />, parts: ["layers", "building", "policies"] },
];

export function UseCases() {
  return (
    <section className="ix-section pf uc" aria-labelledby="usecases-title" data-plain="">
      <SectionHead id="usecases-title" title="Whatever you're building" lead="Start small or start big. The same backend grows with it.">
        <a href={SIGN_UP} className="btn">Start free <Arrow /></a>
      </SectionHead>

      {/* The cards run past in a loop; the second copy only closes the loop, so screen readers skip it. Hover pauses it. */}
      <div className="uc-marquee" data-reveal="up">
        <div className="uc-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="uc-set" aria-hidden={copy === 1 || undefined}>
              {CASES.map((c) => <Case key={c.title} title={c.title} line={c.line} art={c.art} parts={c.parts} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
