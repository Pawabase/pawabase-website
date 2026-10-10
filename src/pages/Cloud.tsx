import { Figure } from "../components/Figure";
import { Next } from "../components/Next";
import { PageHead } from "../components/PageHead";
import { docs } from "../config";

const status = [
  ["Availability", "Pre-launch."],
  ["Region", "Nigeria. Other African regions are planned and not published."],
  ["Billing", "Naira, through Paystack, per organization."],
  ["Plans and prices", "Not published."],
  ["Compliance", "No certification or compliance claim is made for any region."],
];

export default function Cloud() {
  return (
    <>
      <PageHead
        title="Pawabase Cloud"
        lede="Create a project by name. It is deployed as its own Pawabase installation, with its own database."
        figure="rack"
        figureLabel="Four blades in a frame. The blade under the pointer slides out along its rails."
        primary={{ href: "#status", label: "Where Cloud stands" }}
        secondary={{ href: docs("self-hosting/docker-compose"), label: "Self-host instead" }}
      />

      <section id="status" className="section" aria-labelledby="status-title">
      <i className="fx dots patch tr" aria-hidden="true" />
        <div className="wrap">
          <h2 id="status-title" className="h1" style={{ marginBottom: 12, maxWidth: "20ch" }}>
            Pawabase Cloud is being prepared for launch.
          </h2>
          <p className="lede" style={{ marginBottom: 28 }}>This is what the current build does. It is not an offer of availability.</p>
          <div className="sheet">
            <table className="spec">
              <tbody>
                {status.map(([a, b]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section ink" aria-labelledby="project">
      <i className="fx iso big br" aria-hidden="true" />
        <div className="wrap two three">
          <div className="blurb"><h2 id="project" className="h2">A full installation.</h2><p className="body">One Pawabase container with its own Postgres and Redis, behind an HTTPS address. Studio sits behind a gate.</p></div>
          <div className="blurb"><h2 className="h2">Organizations.</h2><p className="body">Sign up, create an organization, invite a team and create projects. Roles come from the same model as Auth.</p></div>
          <div className="blurb"><h2 className="h2">Plans and payments.</h2><p className="body">Plans set limits. Checkout is a Paystack subscription, confirmed by a signed webhook.</p></div>
        </div>
      </section>

      <section id="plans" className="section" aria-labelledby="regions">
      <i className="fx ticks strip-h tl" aria-hidden="true" />
        <div className="wrap split">
          <div className="c7">
            <div className="stage">
              <Figure name="regions" names={{ open: "region open", "not published": "region not published" }} label="A control plate with six sites. One is open; the others are dashed footprints that are not published yet." ratio="5 / 4" />
              <p className="small stage-note">One site is open. The dashed footprints are not published.</p>
            </div>
          </div>
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="regions" className="h1">
              Local region, local currency.
            </h2>
            <p className="lede">A project's data sits on servers in Nigeria and billing is in naira. Plan prices are not published yet.</p>
          </div>
        </div>
      </section>
      <Next current="cloud" docsHref={docs("self-hosting/docker-compose")} docsLabel="Self-hosting guide" />
    </>
  );
}
