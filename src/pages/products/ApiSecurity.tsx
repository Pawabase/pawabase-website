import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./apisecurity.css";

/* Keys as things you hold: one scrambles across the hero, three passes sit on a table, a meter fills to its limit, and the log writes itself. */

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
const LENGTH = 22;
const PASSES: { name: string; prefix: string; line: string; rows: [string, string][] }[] = [
  { name: "Publishable", prefix: "pb_pk_", line: "Safe to ship in your web and mobile apps.", rows: [["Goes in", "Browsers and apps"], ["Limited by", "Your access rules"]] },
  { name: "Secret", prefix: "pb_sk_", line: "Full access for your servers, never for your users.", rows: [["Goes in", "Your servers"], ["Limited by", "What you allow"]] },
  { name: "Scoped", prefix: "pb_sk_", line: "Only the routes and addresses you name, until the day it expires.", rows: [["Routes", "GET /rest/v1/*"], ["Expires", "In 30 days"]] },
];
const LOG = ["Ada revoked the key old-server", "Grace set a rate limit on /rest/v1/orders", "The deploy key updated a flow", "Alan created the key mobile-app", "Ada added an allowed origin"];
const TICKS = 48;
const LIMIT = 34;
const ALSO: [string, string][] = [
  ["Machine identities", "Keys and tokens for services and AI agents."],
  ["IP allow lists", "Refuse every other address."],
  ["Allowed origins", "Say which sites may use a key."],
  ["Revoke any time", "Switch off a key the moment you need to."],
];

function Key() {
  const tick = useTicker(90, LENGTH);
  const settled = Math.min(LENGTH, (tick % 150));
  const text = Array.from({ length: LENGTH }, (_, i) => (i < settled ? "•" : CHARS[(tick * (i + 7) * 31 + i * 17) % CHARS.length])).join("");
  return <p className="ks-key" aria-hidden="true"><b>pb_sk_</b>{text}</p>;
}

function Meter() {
  const filled = useTicker(170, LIMIT + 6) % (TICKS + 12);
  return (
    <div className="ks-meter" aria-hidden="true">
      <div className="ks-ticks">
        {Array.from({ length: TICKS }, (_, i) => <i key={i} className={`${i < filled ? "on" : ""} ${i >= LIMIT ? "over" : ""}`} />)}
        <em style={{ left: `${(LIMIT / TICKS) * 100}%` }}>Your limit</em>
      </div>
      <p>{filled > LIMIT ? "Slowed down. Everyone else is fine." : "Every request is welcome."}</p>
    </div>
  );
}

function Log() {
  const head = useTicker(2400);
  const rows = [0, 1, 2, 3].map((k) => {
    const n = head - k;
    return { n, text: LOG[((n % LOG.length) + LOG.length) % LOG.length] };
  });
  return (
    <ol className="ks-log" aria-hidden="true">
      {rows.map(({ n, text }, k) => <li key={n} className={k === 0 ? "typing" : ""}><span>{text}</span></li>)}
    </ol>
  );
}

export default function ApiSecurityPage() {
  return (
    <ProductFrame name="API security" description="Publishable and secret keys, keys scoped to routes and addresses, expiring keys, rate limits and an audit log.">
      <section className="ix-hero ks-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="ks-copy">
          <h1 id="product-title" data-reveal="up">Your API, only for the callers you choose.</h1>
          <Key />
          <div className="ks-foot" data-reveal="up">
            <p>Publishable and secret keys, scoped and expiring keys, and rate limits on every route.</p>
            <HeroActions />
          </div>
        </div>
      </section>

      <section className="ix-section" aria-label="The right key for each job" data-plain="">
        <div className="ix-panel ks-table">
          {PASSES.map((pass, i) => (
            <article key={pass.name} className={`ks-pass p${i}`}>
              <header><b>{pass.name}</b><code>{pass.prefix}•••</code></header>
              <p>{pass.line}</p>
              <dl>
                {pass.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <Band label="Rate limits" className="ks-limits">
        <h2>Rate limits per route.</h2>
        <p>Slow down abuse without writing any code.</p>
        <Meter />
      </Band>

      <Band label="Audit log" className="ks-audit">
        <div>
          <h2>Who changed what, and when.</h2>
          <ul>
            {ALSO.map(([title, line]) => <li key={title}><b>{title}</b><span>{line}</span></li>)}
          </ul>
        </div>
        <Log />
      </Band>
    </ProductFrame>
  );
}
