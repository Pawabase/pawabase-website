import { Sky } from "@/components/home/Home";
import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./releases.css";

/* A climb: the hero is a staircase from development up to production, and a change walks up it. Then the review it has to pass, two API versions running side by side, and the backups behind it all. */

const STAIRS: [string, string][] = [["Development", "Try anything."], ["Staging", "Check it before it's live."], ["Production", "Your users, your live data."]];
const REVIEW: { sign: string; text: string; state: string; bad?: boolean }[] = [
  { sign: "+", text: "New table: invoices", state: "Will be added" },
  { sign: "+", text: "New field: orders.discount", state: "Will be added" },
  { sign: "~", text: "Flow: send receipt", state: "Will change" },
  { sign: "!", text: "Field type: orders.total", state: "Refused: would break live data", bad: true },
];
const BACKUPS = 18;

function Stairs() {
  const at = useTicker(2200) % STAIRS.length;
  return (
    <div className="en-stairs" aria-hidden="true">
      {STAIRS.map(([name, line], i) => (
        <div key={name} className={`en-step s${i}`}>
          {i === at && <span className="en-change" key={at}>A new flow</span>}
          <b>{name}</b>
          <small>{line}</small>
        </div>
      ))}
    </div>
  );
}

function Backups() {
  const picked = 13 - (useTicker(1500) % 5);
  return (
    <div className="en-backups" aria-hidden="true">
      {Array.from({ length: BACKUPS }, (_, i) => <i key={i} className={i === picked ? "on" : i > picked ? "after" : ""} />)}
    </div>
  );
}

export default function EnvironmentsPage() {
  return (
    <ProductFrame name="Environments" description="Separate development, staging and production, reviewed promotion, short-lived previews, side-by-side API versions and backups.">
      <section className="ix-hero en-hero" aria-labelledby="product-title" data-plain="">
        <Sky seed={73} />
        <SiteNav />
        <div className="en-climb">
          <div className="en-copy">
            <h1 id="product-title" data-reveal="up">Ship changes without breaking what's live.</h1>
            <p data-reveal="up">Each environment keeps its own data and its own keys.</p>
            <HeroActions />
          </div>
          <Stairs />
        </div>
      </section>

      <Band label="Promote with a review" className="en-review">
        <div className="en-review-copy">
          <h2>See every change first.</h2>
          <p>Move changes forward with a clear list of what will happen. Ones that would break live data are refused.</p>
        </div>
        <ul aria-hidden="true">
          {REVIEW.map((row) => (
            <li key={row.text} className={row.bad ? "bad" : ""}><i>{row.sign}</i><span>{row.text}</span><small>{row.state}</small></li>
          ))}
        </ul>
      </Band>

      <Band label="API versions" className="en-versions">
        <div className="en-track" aria-hidden="true"><code>/rest/v1</code><i><u /></i><span>Your older apps</span></div>
        <div className="en-track next" aria-hidden="true"><code>/rest/v2</code><i><u /></i><span>Your new app</span></div>
        <div className="en-versions-copy">
          <h2>The next API, beside the current one.</h2>
          <p>Same tables. Keep older apps working while the API moves on.</p>
        </div>
      </Band>

      <Band label="Backups and previews" className="en-safety">
        <article>
          <Backups />
          <h3>Backups you can restore</h3>
          <p>Bring back an environment's definitions and its data.</p>
        </article>
        <article className="en-preview">
          <div className="en-fading" aria-hidden="true"><b>preview-214</b><small>Cleans up after itself</small></div>
          <h3>Previews</h3>
          <p>Short-lived environments for trying one change.</p>
        </article>
      </Band>
    </ProductFrame>
  );
}
