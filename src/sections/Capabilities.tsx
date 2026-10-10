import { useState } from "react";
import { Reveal } from "../lib";
import { docs } from "../config";

const CAPS = [
  { name: "Identity", line: "Password and OAuth sign-in, TOTP MFA, sessions, organizations, roles and permissions.", path: "auth/overview", image: "identity" },
  { name: "Records", line: "Tables served as REST with filters, sorting, relations and generated OpenAPI documentation.", path: "data/resources", image: "records" },
  { name: "Policies", line: "Named access rules for every operation, with supported filters pushed down to SQL.", path: "policies/overview", image: "policies" },
  { name: "Files", line: "Object storage with bucket policies, direct uploads and signed URLs.", path: "storage/overview", image: "files" },
  { name: "Realtime", line: "Broadcast, presence, history and live resource changes over WebSocket.", path: "realtime/overview", image: "realtime" },
  { name: "Flows", line: "Visual backend workflows with triggers, steps and an error path on every block.", path: "flows/overview", image: "flows" },
  { name: "Code", line: "Python functions and custom routes, tested locally and deployed from the command line.", path: "code/overview", image: "code" },
  { name: "Events and queues", line: "Events, subscriptions, queued jobs, schedules and webhooks in both directions.", path: "events/overview", image: "events-queues" },
  { name: "Mail and secrets", line: "Transactional mail, encrypted secrets and scoped API keys.", path: "mail/overview", image: "mail-secrets" },
] as const;

export function Capabilities() {
  const [on, setOn] = useState(0);
  return (
    <section className="caps" id="platform" aria-labelledby="caps-title">
      <div className="caps-wrap">
        <div className="caps-head">
          <Reveal as="h2" delay={60} className="display"><span id="caps-title">Identity, data, files, realtime and backend logic.</span></Reveal>
        </div>
        <Reveal as="ol" kind="fade" className="caps-rail">
          {CAPS.map((c, i) => {
            const active = i === on;
            return (
              <li key={c.name} className={`cap-card ${active ? "on" : ""}`}>
                <img src={`/images/capabilities/${c.image}.webp`} alt="" width="1400" height="933" loading="lazy" decoding="async" />
                <span className="cap-shade" aria-hidden="true" />
                <button
                  type="button"
                  className="cap-toggle"
                  aria-expanded={active}
                  aria-controls={`cap-detail-${i}`}
                  onClick={() => setOn(i)}
                >
                  <span className="cap-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cap-name">{c.name}</span>
                </button>
                <div id={`cap-detail-${i}`} className="cap-detail" aria-hidden={!active}>
                  <p>{c.line}</p>
                  <a href={docs(c.path)}>Explore {c.name.toLowerCase()} <span aria-hidden="true">→</span></a>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
