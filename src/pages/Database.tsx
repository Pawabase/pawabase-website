import { Code } from "../components/Code";
import { Figure } from "../components/Figure";
import { Next } from "../components/Next";
import { PageHead } from "../components/PageHead";
import { docs } from "../config";

const QUERY = `
const page = await pawabase
  .from("posts")
  .eq("status", "live")
  .order("created_at", "desc")
  .perPage(20);
`;

const OWN_ROWS = `
{
  "all": [
    { "authenticated": true },
    { "eq": ["$record.owner_id", "$auth.user_id"] }
  ]
}
`;

const drives = [
  ["Fields", "Validation, the response shape, the OpenAPI entry and the migration."],
  ["Operations", "Routes under /rest/v1, each with its own policy."],
  ["Relations", "?expand= for belongs_to and has_many. A hint, not a foreign key."],
  ["Events", "A successful write publishes an event, and optionally a realtime message."],
  ["Cache", "An optional cache time. A write to the resource clears it."],
];

export default function Database() {
  return (
    <>
      <PageHead
        title="Database"
        lede="A resource is a table, its operations and a policy for each, written as data."
        figure="records"
        figureLabel="The rows of a table as long strips on a plate. The row under the pointer slides out of the table."
        primary={{ href: docs("data/resources"), label: "Read about resources" }}
        secondary={{ href: docs("quickstart"), label: "Quickstart" }}
      />

      <section className="section" aria-labelledby="definition">
      <i className="fx dots patch tr" aria-hidden="true" />
        <div className="wrap">
          <h2 id="definition" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            One definition drives the rest.
          </h2>
          <div className="sheet">
            <table className="spec">
              <tbody>
                {drives.map(([a, b]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section deep" aria-labelledby="policy">
      <i className="fx rings big tr" aria-hidden="true" />
        <div className="wrap split">
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="policy" className="h1">
              Policies decide. The database filters.
            </h2>
            <p className="lede">For a list, part of the policy becomes SQL, so pagination stays correct.</p>
          </div>
          <div className="c7 stack" style={{ ["--gap" as string]: "14px" }}>
            <Code lang="json" caption="Attached to list, each person sees their own rows." source="pawabase-docs, Policies">
              {OWN_ROWS}
            </Code>
            <Code lang="ts" caption="Reading a page with the TypeScript client." source="pawabase-docs, Clients › TypeScript SDK">
              {QUERY}
            </Code>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="engine">
      <i className="fx ticks strip-h tl" aria-hidden="true" />
        <div className="wrap split">
          <div className="c7">
            <div className="stage">
              <Figure name="schema" names={(c) => c} label="Tiles joined by links. The tile under the pointer rises and every tile that refers to it follows." ratio="5 / 4" />
              <p className="small stage-note">Point at a table. What refers to it rises with it.</p>
            </div>
          </div>
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="engine" className="h1">
              Your database, your engine.
            </h2>
            <p className="lede">SQLite for development. PostgreSQL or MySQL in production. Fourteen field types.</p>
          </div>
        </div>
      </section>
      <Next current="database" docsHref={docs("data/resources")} docsLabel="Resources" />
    </>
  );
}
