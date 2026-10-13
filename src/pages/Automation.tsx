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
        lede="Orchestrate business processes: react to events, run on schedules, call external services and retry what fails, with flows, queues and workers working as one system."
        figure="steps"
        figureLabel="A stair of five treads. The tread under the pointer lifts."
        primary={{ href: docs("flows/overview"), label: "Read about Flows" }}
        secondary={{ href: docs("events/overview"), label: "Events" }}
      />

      <section className="section" aria-labelledby="triggers">
        <div className="wrap">
          <h2 id="triggers" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            Start a flow in the way that fits.
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
        <div className="wrap two">
          <div className="blurb">
            <h2 id="events" className="h1">Add behaviour without touching what already works.</h2>
          </div>
          <div className="blurb">
            <p className="lede">One event can start a flow, call your functions, notify partners and update live screens. Subscribers are independent of the code that raised the event.</p>
            <p className="small">Every message is delivered at least once, so build reactions that are safe to repeat.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="queues">
        <div className="wrap">
          <h2 id="queues" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            Background work that survives failures.
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
