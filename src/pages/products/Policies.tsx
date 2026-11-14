import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { Shield } from "@/components/home/Platform";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { ProductHero } from "@/components/product/sections";

import "./policies.css";

/*
 * Access policies, told as rules you can read. The hero is the shield. Then: a rule written as a sentence you can change word by word;
 * the same list as three different people see it; and one rule wired to the five places it guards. Nothing here appears on another
 * product page.
 */

const WHO = ["The record's owner", "Signed-in people", "Admins", "The same organization", "Anyone"];
const CAN = ["read", "list", "edit", "create", "delete"];
const WHAT = ["orders", "invoices", "files", "channels", "profiles"];

function Sentence() {
  const [w, setW] = useState(0);
  const [c, setC] = useState(0);
  const [t, setT] = useState(0);
  const drum = (words: string[], at: number, set: (n: number) => void, label: string) => (
    <button type="button" className="po-drum" aria-label={`${label}: ${words[at]}. Change`} onClick={() => set((at + 1) % words.length)}>
      <span className="po-drum-track" style={{ transform: `translateY(${-at * 1.3}em)` }}>{words.map((x) => <span key={x}>{x}</span>)}</span>
      <Icon name="refresh" size={14} variant="Linear" />
    </button>
  );
  const name = `${["owner", "signed-in", "admin", "same-org", "anyone"][w]}-${CAN[c]}`;
  return (
    <section className="ix-section" aria-labelledby="po-sentence-title" data-plain="">
      <SectionHead id="po-sentence-title" title="A rule you can read out loud" lead="Access is written the way you would say it. Click a word to change it, and the rule it makes gets a name you can use anywhere." />
      <div className="po-sentence" data-reveal="up">
        <p className="po-words"><span>Let</span>{drum(WHO, w, setW, "Who")}{drum(CAN, c, setC, "Action")}{drum(WHAT, t, setT, "What")}</p>
        <div className="po-named"><span>Saved as</span><code>{name}</code><small>on {WHAT[t]}</small></div>
      </div>
    </section>
  );
}

const ORDERS: [string, string][] = [["Order 1042", "ada"], ["Order 1043", "grace"], ["Order 1044", "ada"], ["Order 1045", "alan"], ["Order 1046", "grace"], ["Order 1047", "ada"]];
const VIEWERS: { name: string; rule: string; sees: (owner: string) => boolean }[] = [
  { name: "Ada", rule: "Owner only", sees: (o) => o === "ada" },
  { name: "An admin", rule: "Admins see all", sees: () => true },
  { name: "Signed out", rule: "No session", sees: () => false },
];

function ThreeViews() {
  return (
    <section className="ix-section ix-band" aria-labelledby="po-views-title" data-plain="">
      <SectionHead id="po-views-title" title="One list, three answers" lead="The same request for orders, from three people. Rows are filtered in the database, so each person's page and count are right." />
      <div className="po-views" data-reveal="up" aria-hidden="true">
        {VIEWERS.map((v) => {
          const count = ORDERS.filter(([, o]) => v.sees(o)).length;
          return (
            <div key={v.name} className="po-view">
              <header><b>{v.name}</b><small>{v.rule}</small></header>
              <div className="po-list">
                {ORDERS.map(([order, owner]) => <span key={order} className={v.sees(owner) ? "" : "gone"}><i />{order}<em>{owner}</em></span>)}
              </div>
              <footer>{count} of {ORDERS.length} orders</footer>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const PLACES: [string, string][] = [["table", "Tables"], ["storage", "Files"], ["realtime", "Channels"], ["automation", "Flows"], ["code", "Routes"]];

function OneRule() {
  const beat = useTicker(3200, 0);
  return (
    <section className="ix-section" aria-labelledby="po-once-title" data-plain="">
      <SectionHead id="po-once-title" title="Change it once, everywhere follows" lead="A rule has a name. Tables, files, channels, flows and routes can all use it, and an edit reaches every one of them at once." />
      <div className="po-hub" data-reveal="up" aria-hidden="true">
        <svg className="po-wires" viewBox="0 0 1000 340" preserveAspectRatio="none">
          {PLACES.map((_, i) => <path key={i} d={`M500 90 C500 200, ${100 + i * 200} 160, ${100 + i * 200} 270`} pathLength="100" className={beat % 2 === 0 ? "run" : ""} style={{ animationDelay: `${i * 0.08}s` }} />)}
        </svg>
        <span key={beat} className="po-rule"><Icon name="policies" size={18} variant="Linear" />owner-only<em>edited just now</em></span>
        <div className="po-places">
          {PLACES.map(([icon, name]) => <span key={name}><Icon name={icon} size={20} variant="Linear" />{name}</span>)}
        </div>
      </div>
    </section>
  );
}

export default function PoliciesPage() {
  return (
    <ProductFrame
      name="Access policies"
      description="Named access rules reused across tables, files, channels, flows and routes, enforced in the database."
      hero={
        <ProductHero
          title="Write who can see what,"
          quiet="once."
          lead="Named rules you attach to tables, files, flows and routes, checked on every request."
          art={<Shield />}
          notes={["owner-only", "Checked on every request", "Filtered in the database"]}
        />
      }
    >
      <Sentence />
      <ThreeViews />
      <OneRule />
    </ProductFrame>
  );
}
