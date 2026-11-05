import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./realtime.css";

/* Everything moves: the hero stands on a floor of pulsing bars, events run past in opposite lanes, people come and go from a room, and three screens change at the same instant. */

const BARS = 72;
const LANE_A = ["orders created", "profile updated", "message sent", "invoice paid", "ticket closed", "cart updated", "comment added"];
const LANE_B = ["Ada joined", "room: support", "Grace is typing", "record deleted", "channel: orders", "Alan left", "status changed"];
const NAMES: [string, string][] = [["AL", "Ada"], ["GH", "Grace"], ["AT", "Alan"], ["KJ", "Katherine"], ["ED", "Edsger"], ["RP", "Radia"]];
const FACTS: [string, string][] = [
  ["Live table changes", "Show new and changed records without a refresh."],
  ["Channels", "Send your own messages to everyone in a room."],
  ["Message history", "Durable channels remember what was sent."],
  ["Flows from messages", "A message on a channel can start a flow."],
  ["Access rules", "Decide who may listen and who may publish."],
  ["WebSockets or server-sent events", "Use the connection that suits the client."],
];

function Lane({ words, back = false }: { words: string[]; back?: boolean }) {
  return (
    <div className={`rt-lane ${back ? "back" : ""}`} aria-hidden="true">
      <div>
        {[...words, ...words, ...words, ...words].map((word, i) => <span key={i}><i />{word}</span>)}
      </div>
    </div>
  );
}

function Room() {
  const tick = useTicker(1800);
  const inside = NAMES.filter((_, i) => ((tick + i * 3) % 8) < 6);
  const typing = inside[tick % Math.max(1, inside.length)]?.[1];
  return (
    <div className="rt-room" aria-hidden="true">
      <div className="rt-faces">
        {NAMES.map(([initials, name], i) => <span key={name} className={inside.some((p) => p[1] === name) ? "in" : ""} style={{ zIndex: 10 - i }}>{initials}</span>)}
      </div>
      <b>{inside.length}</b>
      <p>{typing ? <>{typing} is typing<i className="rt-dots"><u /><u /><u /></i></> : "Quiet for now"}</p>
    </div>
  );
}

function Screens() {
  const n = 1284 + useTicker(1600) * 3;
  const value = n.toLocaleString("en-US");
  return (
    <div className="rt-screens" aria-hidden="true">
      {["Phone", "Dashboard", "Wall display"].map((name) => (
        <div key={name} className="rt-screen">
          <small>{name}</small>
          <b key={value}>{value}</b>
          <span>orders today</span>
        </div>
      ))}
    </div>
  );
}

export default function RealtimePage() {
  return (
    <ProductFrame name="Realtime" description="Live table changes, channels, presence and durable message history, over WebSockets or server-sent events.">
      <section className="ix-hero rt-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="rt-copy">
          <h1 id="product-title" data-reveal="up">Live updates,<br />no socket server.</h1>
          <p data-reveal="up">Your app hears about changes the moment they happen.</p>
          <HeroActions />
        </div>
        <div className="rt-bars" aria-hidden="true">
          {Array.from({ length: BARS }, (_, i) => <i key={i} style={{ animationDelay: `${-((i * 37) % 23) / 10}s`, animationDuration: `${1.5 + ((i * 13) % 17) / 10}s` }} />)}
        </div>
      </section>

      <section className="ix-section rt-lanes" aria-label="Events" data-plain="">
        <Lane words={LANE_A} />
        <Lane words={LANE_B} back />
      </section>

      <Band label="Presence" className="rt-presence">
        <div>
          <h2>See who is in the room, as it changes.</h2>
          <p>Online, typing and viewing, kept up to date for you.</p>
        </div>
        <Room />
      </Band>

      <Band label="The same number everywhere" className="rt-same">
        <h2>One change. Every screen, at once.</h2>
        <Screens />
      </Band>

      <Band label="Everything in Realtime" className="rt-facts">
        {FACTS.map(([title, line]) => (
          <article key={title}>
            <i className="rt-live" />
            <div><h3>{title}</h3><p>{line}</p></div>
          </article>
        ))}
      </Band>
    </ProductFrame>
  );
}
