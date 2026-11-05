import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./policies.css";

/* A rule you can read: three reels roll a sentence together in the hero. Then rows that vanish for whoever isn't allowed, one rule across five places, and conditions nested like the logic they are. */

const WHO = ["The record's owner", "Signed-in users", "Admins", "Anyone", "Same organization"];
const CAN = ["edit", "read", "delete", "list", "create"];
const WHAT = ["orders", "invoices", "files", "channels", "profiles"];
const ROWS: [string, string][] = [["Order 1042", "ada"], ["Order 1043", "grace"], ["Order 1044", "ada"], ["Order 1045", "alan"], ["Order 1046", "grace"], ["Order 1047", "ada"]];
const ASKING: { name: string; sees: (owner: string) => boolean }[] = [
  { name: "Ada", sees: (owner) => owner === "ada" },
  { name: "Grace", sees: (owner) => owner === "grace" },
  { name: "An admin", sees: () => true },
  { name: "Someone signed out", sees: () => false },
];
const PLACES = ["Tables", "Files", "Channels", "Flows", "Routes"];

function Reel({ words, at }: { words: string[]; at: number }) {
  return (
    <span className="po-reel">
      <span className="po-reel-track" style={{ transform: `translateY(${-(at % words.length) * 1.2}em)` }}>
        {words.map((word) => <span key={word}>{word}</span>)}
      </span>
    </span>
  );
}

function Sentence() {
  const tick = useTicker(1500);
  return (
    <p className="po-sentence" aria-hidden="true">
      <span className="po-let">Let</span>
      <Reel words={WHO} at={Math.floor((tick + 2) / 3)} />
      <Reel words={CAN} at={Math.floor((tick + 1) / 3)} />
      <Reel words={WHAT} at={Math.floor(tick / 3)} />
    </p>
  );
}

function Rows() {
  const asking = ASKING[useTicker(2600) % ASKING.length];
  const count = ROWS.filter(([, owner]) => asking.sees(owner)).length;
  return (
    <div className="po-rows" aria-hidden="true">
      <p><b>{asking.name}</b> asks for orders<span>{count} of {ROWS.length}</span></p>
      <ul>
        {ROWS.map(([label, owner]) => (
          <li key={label} className={asking.sees(owner) ? "" : "gone"}><span>{label}</span><small>{owner}</small></li>
        ))}
      </ul>
    </div>
  );
}

export default function PoliciesPage() {
  const pulse = useTicker(1200) % PLACES.length;
  return (
    <ProductFrame name="Access policies" description="Named access rules reused across tables, files, channels, flows and routes, enforced in the database.">
      <section className="ix-hero po-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="po-copy">
          <h1 id="product-title" data-reveal="up">Write who can see what, once.</h1>
          <Sentence />
          <p className="po-line" data-reveal="up">Named rules you attach to tables, files, flows and routes, checked on every request.</p>
          <HeroActions />
        </div>
      </section>

      <Band label="Filtered in the database" className="po-filter">
        <div>
          <h2>Everyone gets a different list.</h2>
          <p>Lists only return the rows a caller may see, filtered in the database, so pages and counts stay correct.</p>
        </div>
        <Rows />
      </Band>

      <Band label="One rule, many places" className="po-once">
        <h2><span className="po-chip">owner-only</span> One rule, five places. Change it once and they all follow.</h2>
        <div className="po-places" aria-hidden="true">
          {PLACES.map((place, i) => <b key={place} className={i === pulse ? "lit" : ""}>{place}</b>)}
        </div>
      </Band>

      <Band label="Combine conditions" className="po-logic">
        <div className="po-tree" aria-hidden="true">
          <div className="po-group"><em>All of</em>
            <span>Signed in</span>
            <div className="po-group"><em>Any of</em>
              <span>Role is admin</span>
              <span>Owns the record</span>
            </div>
            <div className="po-group"><em>None of</em>
              <span>Account is suspended</span>
            </div>
          </div>
        </div>
        <div className="po-logic-copy">
          <h2>As simple or as deep as you need.</h2>
          <p>Start from the common cases, or group your own conditions.</p>
          <ul>
            <li>Different rules for listing, reading, creating, editing and deleting</li>
            <li>Roles, from admins to guests</li>
            <li>Let people work with only their own records</li>
            <li>Tell users apart from services and agents</li>
          </ul>
        </div>
      </Band>
    </ProductFrame>
  );
}
