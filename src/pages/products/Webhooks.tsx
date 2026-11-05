import { Icon } from "@/components/Icon";
import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./webhooks.css";

/* Two directions: the hero is cut down the middle, IN on one side and OUT on the other, with events crossing it. Then a delivery that keeps trying, a seal, and who hears about what. */

const INBOUND = ["payment succeeded", "new push", "form submitted", "order shipped", "message received"];
const OUTBOUND = ["orders.created", "orders.updated", "user.created", "orders.deleted", "invoices.created"];
const ATTEMPTS: [string, string][] = [["First try", "No answer"], ["Second try", "Server error"], ["Third try", "Delivered"]];
const ROUTES: [string, string][] = [["orders.created", "Your warehouse"], ["user.created", "Your CRM"], ["orders.updated", "Your analytics"], ["orders.deleted", "Your warehouse"]];
const SENDERS = ["Payments", "Source control", "Forms", "Shipping"];

function Lane({ words, side }: { words: string[]; side: "in" | "out" }) {
  return (
    <div className={`wh-lane ${side}`} aria-hidden="true">
      <div>{[...words, ...words, ...words].map((word, i) => <span key={i}>{word}</span>)}</div>
    </div>
  );
}

function Attempts() {
  const reached = useTicker(1500, ATTEMPTS.length) % (ATTEMPTS.length + 2);
  return (
    <ol className="wh-attempts" aria-hidden="true">
      {ATTEMPTS.map(([name, result], i) => (
        <li key={name} className={`${i < reached ? "seen" : ""} ${i === ATTEMPTS.length - 1 ? "ok" : ""}`}>
          <b>{name}</b>
          <span>{i < reached ? result : "Waiting"}</span>
        </li>
      ))}
    </ol>
  );
}

export default function WebhooksPage() {
  const lit = useTicker(1400) % ROUTES.length;
  return (
    <ProductFrame name="Webhooks" description="Inbound webhooks that start flows, and signed, retried outbound events with a history of every delivery.">
      <section className="ix-hero wh-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="wh-copy">
          <h1 id="product-title" data-reveal="up">Talk to other services, both ways.</h1>
          <HeroActions />
        </div>
        <div className="wh-split">
          <div className="wh-side in">
            <b aria-hidden="true">IN</b>
            <p>Receive webhooks that start flows.</p>
            <Lane words={INBOUND} side="in" />
            <Lane words={[...INBOUND].reverse()} side="in" />
          </div>
          <div className="wh-side out">
            <b aria-hidden="true">OUT</b>
            <p>Send signed events to the services you use.</p>
            <Lane words={OUTBOUND} side="out" />
            <Lane words={[...OUTBOUND].reverse()} side="out" />
          </div>
        </div>
      </section>

      <Band label="Retries and signatures" className="wh-trust">
        <div className="wh-keep">
          <h2>A delivery that fails is tried again.</h2>
          <Attempts />
        </div>
        <div className="wh-seal-wrap">
          <div className="wh-seal" aria-hidden="true">
            <svg className="wh-ring" viewBox="0 0 200 200"><defs><path id="wh-ring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" /></defs><text><textPath href="#wh-ring">SIGNED BY PAWABASE · SIGNED BY PAWABASE · SIGNED ·</textPath></text></svg>
            <Icon name="policies" size={44} variant="Linear" />
          </div>
          <h3>Every delivery is signed.</h3>
          <p>Receivers can confirm it really came from you.</p>
        </div>
      </Band>

      <Band label="Event subscriptions" className="wh-routes">
        <h2>Choose which events go where.</h2>
        <ul>
          {ROUTES.map(([event, target], i) => (
            <li key={event} className={i === lit ? "lit" : ""}><code>{event}</code><i /><span>{target}</span></li>
          ))}
        </ul>
        <p>See every delivery, and how the receiver answered.</p>
      </Band>

      <Band label="Receive them too" className="wh-inbound">
        <div>
          <h2>A URL for each service that needs to reach you.</h2>
          <p>Make sure a webhook really came from who it says, then start a flow when it calls.</p>
        </div>
        <ul>
          {SENDERS.map((sender) => <li key={sender}><span>{sender}</span><em>Verified</em><b><Icon name="automation" size={15} variant="Linear" />Starts a flow</b></li>)}
        </ul>
      </Band>
    </ProductFrame>
  );
}
