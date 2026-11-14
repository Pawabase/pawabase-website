import { useState } from "react";

import { SectionHead } from "@/components/home/Home";
import { Phone } from "@/components/home/Platform";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { ProductHero } from "@/components/product/sections";

import "./realtime.css";

/*
 * Realtime, told through screens that agree. The hero is a phone with something new. Then: one change landing on three screens at
 * once; a room where people come and go and type; and the two kinds of connection drawn as one line with traffic both ways and one
 * with traffic one way. Nothing here appears on another product page.
 */

const ITEMS = ["Lamp", "Chair", "Desk", "Shelf", "Rug", "Mirror"];

function Screens() {
  const tick = useTicker(2400, 3);
  const sold = 41 + tick;
  const last = ITEMS[tick % ITEMS.length];
  return (
    <section className="ix-section" aria-labelledby="rt-screens-title" data-plain="">
      <SectionHead id="rt-screens-title" title="One change. Every screen, at once." lead="A record changes and every page showing it updates in the same moment. No refresh, no polling, no socket server of your own." />
      <div className="rt-screens" data-reveal="up" aria-hidden="true">
        {["laptop", "phone", "tablet"].map((d) => (
          <div key={d} className={`rt-device ${d}`}>
            <div key={tick} className="rt-glass">
              <small>Orders today</small>
              <b>{sold}</b>
              <span className="rt-toast">New order · {last}</span>
            </div>
          </div>
        ))}
        <span className="rt-source"><i />orders · insert</span>
      </div>
    </section>
  );
}

const CREW: [string, string][] = [["AL", "Ada"], ["GH", "Grace"], ["AT", "Alan"], ["KJ", "Katherine"], ["ED", "Edsger"]];

function Room() {
  const tick = useTicker(1600, 2);
  const here = CREW.slice(0, 2 + (tick % 4));
  const typing = here[tick % here.length];
  return (
    <section className="ix-section ix-band" aria-labelledby="rt-room-title" data-plain="">
      <SectionHead id="rt-room-title" title="Who is here, as it changes" lead="Presence tells your app who is online, who is typing and who is looking at the same thing, and keeps it current for you." />
      <div className="rt-room" data-reveal="up" aria-hidden="true">
        <div className="rt-door"><span>room</span><b>support</b><small>{here.length} here</small></div>
        <div className="rt-people">
          {CREW.map(([initials, name]) => {
            const on = here.some(([i]) => i === initials);
            return (
              <div key={initials} className={`rt-person ${on ? "on" : ""}`}>
                <i>{initials}</i>
                <span>{name}</span>
                <em>{!on ? "away" : typing[0] === initials ? "typing…" : "viewing"}</em>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pipes() {
  const [pick, setPick] = useState<"ws" | "sse">("ws");
  return (
    <section className="ix-section" aria-labelledby="rt-pipes-title" data-plain="">
      <SectionHead id="rt-pipes-title" title="Two ways to stay connected" lead="WebSockets carry messages both ways, for apps that also send. Server-sent events carry them one way, for pages that only listen. Same channels, same rules.">
        <div className="rt-pick" role="radiogroup" aria-label="Connection">
          <button type="button" role="radio" aria-checked={pick === "ws"} onClick={() => setPick("ws")}>WebSockets</button>
          <button type="button" role="radio" aria-checked={pick === "sse"} onClick={() => setPick("sse")}>Server-sent events</button>
        </div>
      </SectionHead>
      <div className={`rt-pipes ${pick}`} data-reveal="up" aria-hidden="true">
        <div className="rt-end"><b>Pawabase</b><small>channels · presence · history</small></div>
        <div className="rt-line">
          <span className="down"><i /><i /><i /></span>
          <span className="up"><i /><i /></span>
        </div>
        <div className="rt-end"><b>Your app</b><small>{pick === "ws" ? "listens and publishes" : "listens"}</small></div>
      </div>
    </section>
  );
}

export default function RealtimePage() {
  return (
    <ProductFrame
      name="Realtime"
      description="Live table changes, channels, presence and durable message history, over WebSockets or server-sent events."
      hero={
        <ProductHero
          title="Live updates,"
          quiet="no socket server."
          lead="Your app hears about changes the moment they happen, on channels with rules about who may listen and who may publish."
          art={<Phone />}
          notes={["Live table changes", "Presence", "Message history"]}
        />
      }
    >
      <Screens />
      <Room />
      <Pipes />
    </ProductFrame>
  );
}
