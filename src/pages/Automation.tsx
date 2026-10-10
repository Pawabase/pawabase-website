import { Next } from "../components/Next";
import { PageHead } from "../components/PageHead";
import { docs } from "../config";

const triggers = [
  ["HTTP", "A request to a route, or a direct call to the flow."],
  ["Event", "A platform event from a flow, a function or the platform."],
  ["Schedule", "A cron expression or a fixed interval."],
  ["Resource", "A record created, updated or deleted."],
  ["Webhook", "A verified payload from an external service."],
  ["Realtime", "A client publishing to a matching channel."],
  ["Job", "The flow dispatched as a background job."],
  ["Manual", "Run from Studio or the platform API."],
];

const queues = [
  ["events", "Event fan-out"],
  ["flows", "Flow runs"],
  ["functions", "Function calls"],
  ["webhooks", "Outbound webhook deliveries"],
  ["mail", "Email sends"],
  ["default", "Everything else"],
];

export default function Automation() {
  return (
    <>
      <PageHead
        title="Automation"
        lede="Something happens. Pawabase publishes an event, and flows, functions and webhooks react with retries."
        figure="steps"
        figureLabel="A stair of five treads. The tread under the pointer lifts."
        primary={{ href: docs("flows/overview"), label: "Read about Flows" }}
        secondary={{ href: docs("events/overview"), label: "Events" }}
      />

      <section className="section" aria-labelledby="triggers">
      <i className="fx dots patch tr" aria-hidden="true" />
        <div className="wrap">
          <h2 id="triggers" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            Eight ways to start a run.
          </h2>
          <div className="sheet">
            <table className="spec">
              <tbody>
                {triggers.map(([a, b]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section deep" aria-labelledby="events">
      <i className="fx rings big tr" aria-hidden="true" />
        <div className="wrap two">
          <div className="blurb">
            <h2 id="events" className="h1">Add a reaction without touching the cause.</h2>
          </div>
          <div className="blurb">
            <p className="lede">One event reaches every matching subscriber: flows, functions, signed webhooks and realtime channels.</p>
            <p className="small">Delivery is at least once, so consumers should be idempotent.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="queues">
      <i className="fx ticks strip-h tl" aria-hidden="true" />
        <div className="wrap">
          <h2 id="queues" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            One queue system for background work.
          </h2>
          <div className="sheet">
            <table className="spec">
              <tbody>
                {queues.map(([a, b]) => (
                  <tr key={a}><td><code>{a}</code></td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Next current="automation" docsHref={docs("flows/overview")} docsLabel="Flows" />
    </>
  );
}
