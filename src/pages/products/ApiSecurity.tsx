import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { KeyArt } from "@/components/product/objects";
import { ProductHero } from "@/components/product/sections";

import "./apisecurity.css";

/*
 * API security, told through keys and the gate they pass. The hero is a key. Then: a keyring of three keys you can pick from; the
 * four checks every call goes through, with calls being turned away at each; and the audit log writing itself. Nothing here appears
 * on another product page.
 */

const KEYS = [
  { name: "Publishable", prefix: "pb_pk_", line: "Safe to ship in your web and mobile apps. Your access rules apply to everything it does.", rows: [["Goes in", "Browsers and apps"], ["Limited by", "Your access rules"], ["Can manage", "Nothing"]] },
  { name: "Secret", prefix: "pb_sk_", line: "Full access for your servers. It never goes in a browser.", rows: [["Goes in", "Your servers"], ["Limited by", "What you allow"], ["Can manage", "The environment"]] },
  { name: "Scoped", prefix: "pb_sk_", line: "Only the routes and addresses you name, until the day it expires.", rows: [["Routes", "GET /rest/v1/*"], ["Addresses", "Your office only"], ["Expires", "In 30 days"]] },
];

function Keyring() {
  const [front, setFront] = useState(0);
  const key = KEYS[front];
  return (
    <section className="ix-section" aria-labelledby="ks-ring-title" data-plain="">
      <SectionHead id="ks-ring-title" title="A key for each job" lead="Hand out the smallest key that does the job. Pick one to see where it goes and what holds it back." />
      <div className="ks-ring" data-reveal="up">
        <div className="ks-fan" role="tablist" aria-label="Kinds of key">
          {KEYS.map((k, i) => (
            <button key={k.name} type="button" role="tab" aria-selected={i === front} className={`ks-card c${(i - front + KEYS.length) % KEYS.length}`} onClick={() => setFront(i)}>
              <span className="ks-chip" aria-hidden="true" />
              <b>{k.name}</b>
              <code>{k.prefix}••••••••••</code>
            </button>
          ))}
        </div>
        <div className="ks-read" role="tabpanel">
          <h3>{key.name} key</h3>
          <p>{key.line}</p>
          <dl>{key.rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  );
}

const GATES: [string, string][] = [
  ["Real key", "Unknown, revoked or expired"],
  ["Allowed place", "An address or site you did not allow"],
  ["Within reach", "A route outside the key's scope"],
  ["Under the limit", "Too many calls on this route"],
];

function Gate() {
  const tick = useTicker(900, 0);
  return (
    <section className="ix-section ix-band" aria-labelledby="ks-gate-title" data-plain="">
      <SectionHead id="ks-gate-title" title="Four checks before your data" lead="Every call passes the same four gates at the edge of your API. Whatever fails is turned away with the reason, and never touches a table." />
      <div className="ks-gate" data-reveal="up">
        {GATES.map(([name, stops], i) => (
          <div key={name} className={`ks-post ${tick % 4 === i ? "stop" : ""}`}>
            <span className="ks-bar" aria-hidden="true"><i /></span>
            <b>{name}</b>
            <small>Stops: {stops}</small>
          </div>
        ))}
        <div className="ks-through"><Icon name="database" size={20} variant="Linear" /><span>Your data</span></div>
      </div>
    </section>
  );
}

const LOG: [string, string, string][] = [
  ["AL", "Ada", "revoked the key old-server"],
  ["GH", "Grace", "set a rate limit on /rest/v1/orders"],
  ["CI", "The deploy key", "updated a flow"],
  ["AT", "Alan", "created the key mobile-app"],
  ["AL", "Ada", "added an allowed address"],
];

function Audit() {
  const head = useTicker(2600, 0);
  const shown = Array.from({ length: 5 }, (_, k) => LOG[(head + LOG.length - k) % LOG.length]);
  return (
    <section className="ix-section" aria-labelledby="ks-audit-title" data-plain="">
      <SectionHead id="ks-audit-title" title="Who changed what, and when" lead="Every change to a key, a limit or an address is written down with who made it. People, servers and agents alike." />
      <div className="ks-audit" data-reveal="up" aria-hidden="true">
        {shown.map(([init, who, what], k) => (
          <div key={`${head}-${k}`} className={`ks-line ${k === 0 ? "new" : ""}`}>
            <i>{init}</i><span><b>{who}</b> {what}</span><small>{k === 0 ? "just now" : `${k * 4} min ago`}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ApiSecurityPage() {
  return (
    <ProductFrame
      name="API security"
      description="Publishable and secret keys, keys scoped to routes and addresses, expiring keys, rate limits and an audit log."
      hero={
        <ProductHero
          title="Your API, only for"
          quiet="the callers you choose."
          lead="Publishable and secret keys, scoped and expiring keys, and rate limits on every route."
          art={<KeyArt />}
          notes={["Scoped to routes", "Expires when you say", "Rate limited"]}
        />
      }
    >
      <Keyring />
      <Gate />
      <Audit />
    </ProductFrame>
  );
}
