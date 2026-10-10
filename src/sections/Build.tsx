import { useState } from "react";
import { Reveal } from "../lib";

const KINDS = [
  { key: "saas", name: "SaaS products", note: "Workspaces, members, plans, and the permissions between them." },
  { key: "market", name: "Marketplaces", note: "Two sides, one catalogue, and money that moves after the order." },
  { key: "commerce", name: "Commerce", note: "Catalogues, carts, orders and the follow-up after checkout." },
  { key: "mobile", name: "Mobile apps", note: "The same REST and realtime surface the web uses. No native SDK required." },
  { key: "ops", name: "Internal tools", note: "Queues, approvals and records for the people who run the business." },
] as const;

function Initials({ a, tone }: { a: string; tone: string }) { return <span className="av" style={{ background: tone }}>{a}</span>; }

function SaaS() {
  const rows = [["Ada Okafor", "Owner", "#cfc9ff"], ["Tomi Bello", "Admin", "#8be0cf"], ["Ife Danjuma", "Member", "#ffd2ba"], ["Zainab Musa", "Viewer", "#e1e0ff"]];
  return <div className="sc sc-saas"><aside><b className="logo-dot" />{["Projects", "Members", "Billing", "Audit"].map((t, i) => <span key={t} className={i === 1 ? "on" : ""}>{t}</span>)}</aside>
    <main><header><h4>Members</h4><button>Invite</button></header>
      {rows.map(([n, r, c]) => <div className="row" key={n}><Initials a={n.split(" ").map(x => x[0]).join("")} tone={c} /><span>{n}</span><em>{r}</em></div>)}
      <div className="usage"><span>Seats</span><i><u style={{ width: "62%" }} /></i><span>8 of 13</span></div></main></div>;
}
function Market() {
  const tiles = [["Indigo cloth", "₦18,500", "linear-gradient(135deg,#5b4ed3,#a89fff)"], ["Brass lamp", "₦42,000", "linear-gradient(135deg,#f3b98f,#ffd2ba)"], ["Clay vase", "₦9,800", "linear-gradient(135deg,#6fc7b5,#8be0cf)"]];
  return <div className="sc sc-market"><div className="split"><section><small>BUYER</small><div className="grid">{tiles.map(([n, p, g]) => <figure key={n}><div style={{ background: g }} /><figcaption>{n}<b>{p}</b></figcaption></figure>)}</div></section>
    <section><small>SELLER</small><div className="payout"><span>Order paid</span><b>₦42,000</b><i /><span>Payout scheduled</span><em>Fri</em></div></section></div></div>;
}
function Commerce() {
  return <div className="sc sc-commerce"><div className="shot" /><div className="info"><small>NEW IN</small><h4>Field jacket</h4><p>₦64,000</p><div className="sizes">{["S", "M", "L", "XL"].map((s, i) => <span key={s} className={i === 1 ? "on" : ""}>{s}</span>)}</div><button>Add to cart</button>
    <ol><li className="done">Paid</li><li className="done">Packed</li><li>Out for delivery</li></ol></div></div>;
}
function Mobile() {
  return <div className="sc sc-mobile"><div className="phone"><div className="notch" /><small>Order #4821</small><h4>Arriving today</h4><div className="map"><i /><i /><i /></div>
    <ol><li className="done">Confirmed</li><li className="done">Packed</li><li className="now">On the way <span className="live" /></li><li>Delivered</li></ol></div></div>;
}
function Ops() {
  const rows = [["Refund request", "Waiting", "peach"], ["Supplier invoice", "Approved", "mint"], ["Stock transfer", "Waiting", "peach"], ["New staff access", "Approved", "mint"]];
  return <div className="sc sc-ops"><header><h4>Needs a decision</h4><span>4 open</span></header>{rows.map(([n, s, t], i) => <div className="row" key={n}><span>{n}</span><em className={t}>{s}</em><button className={s === "Waiting" ? "go" : ""} disabled={s !== "Waiting"}>{s === "Waiting" ? "Approve" : "Done"}</button></div>)}</div>;
}
const SCENES = { saas: SaaS, market: Market, commerce: Commerce, mobile: Mobile, ops: Ops };

export function Build() {
  const [on, setOn] = useState(0);
  const Scene = SCENES[KINDS[on].key];
  return (
    <section className="build" id="build" aria-labelledby="build-title">
      <div className="build-wrap">
        <div className="build-list">
          <Reveal as="h2" delay={60} className="display"><span id="build-title">SaaS, marketplaces, commerce and internal tools.</span></Reveal>
          <ul>
            {KINDS.map((k, i) => (
              <li key={k.key}>
                <button className={i === on ? "on" : ""} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} aria-pressed={i === on}>
                  <span className="name">{k.name}</span>
                  <span className="note">{k.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Reveal kind="fade" className="build-stage">
          <div className="stage-bg" aria-hidden="true" />
          <div className="stage-frame" key={KINDS[on].key}><Scene /></div>
          <p className="stage-tag">Illustrative interface. Pawabase provides the backend; you design the product.</p>
        </Reveal>
      </div>

      <div className="built">
        <div className="built-grid">
          <Reveal kind="mask" className="built-portal">
            <img src="/media/studio/portal.webp" width="1440" height="900" alt="A school portal showing a student's end-of-term report, built on Pawabase" loading="lazy" />
          </Reveal>
          <div className="built-copy">
            <Reveal as="h3" className="display">A school platform. A multi-store marketplace.</Reveal>
            <Reveal as="p" delay={80}>A school platform uses Pawabase for seven roles, eleven access policies, report cards and a family portal. Sell4me runs a multi-store commerce experience on the same foundation: 54 resources and 181 routes, with flows, transactional mail and a storefront on top.</Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
