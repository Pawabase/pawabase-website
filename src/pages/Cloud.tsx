import { Figure } from "../components/Figure";
import { Next } from "../components/Next";
import { PageHead } from "../components/PageHead";
import { docs } from "../config";

const status = [
  ["Availability", "Opening soon."],
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
        lede="The managed way to run Pawabase: a project with its own database and address, operated for you. The same platform can also be self-hosted."
        figure="rack"
        figureLabel="Four blades in a frame. The blade under the pointer slides out along its rails."
        primary={{ href: "#status", label: "Where Cloud stands" }}
        secondary={{ href: docs("self-hosting/docker-compose"), label: "Self-host instead" }}
      />

      <section id="status" className="section" aria-labelledby="status-title">
        <div className="wrap">
          <h2 id="status-title" className="h1" style={{ marginBottom: 12, maxWidth: "20ch" }}>
            Pawabase Cloud is on its way.
          </h2>
          <p className="lede" style={{ marginBottom: 28 }}>What follows describes the current build. Availability, plans and prices are announced as they open.</p>
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
        <div className="wrap two three">
          <div className="blurb"><h2 id="project" className="h2">Your own complete backend.</h2><p className="body">Every project gets its own database and its own secure address, with Studio to manage it.</p></div>
          <div className="blurb"><h2 className="h2">Teams.</h2><p className="body">Sign up, create a team, invite people and create projects. Roles work the same way as in Auth.</p></div>
          <div className="blurb"><h2 className="h2">Plans and payments.</h2><p className="body">Plans set your limits. Pay by subscription through Paystack.</p></div>
        </div>
      </section>

      <section id="plans" className="section" aria-labelledby="regions">
        <div className="wrap split">
          <div className="c7">
            <div className="stage">
              <Figure name="regions" names={{ open: "region open", "not published": "region not published" }} label="A control plate with six sites. One is open; the others are dashed footprints that are not published yet." ratio="5 / 4" />
              <p className="small stage-note">One site is open. The dashed footprints are not published.</p>
            </div>
          </div>
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="regions" className="h1">
              Modern application infrastructure, wherever you build.
            </h2>
            <p className="lede">Projects start in Nigeria and are billed in naira. More regions are planned and none is published yet. Plan prices are not published either.</p>
          </div>
        </div>
      </section>
      <Next current="cloud" docsHref={docs("self-hosting/docker-compose")} docsLabel="Self-hosting guide" />
    </>
  );
}
