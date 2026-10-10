import { Code } from "../components/Code";
import { Next } from "../components/Next";
import { PageHead } from "../components/PageHead";
import { docs } from "../config";

const SIGN_IN = `
const result = await pawabase.auth.signInWithPassword({
  email: "ada@example.com",
  password,
});

if (result.status === "mfa_required") {
  const session = await result.verify(code);
  console.log(session.user.email);
} else {
  console.log(result.session.user.email);
}
`;

const methods = [
  ["Email and password", "A length rule or a strict validator. Verification can be required before sign-in."],
  ["Magic links", "Signed links by email. Redirects only land on your allowed addresses."],
  ["Social sign-in", "Google, GitHub, Discord and Microsoft, plus any OAuth provider you configure."],
  ["Authenticator apps", "TOTP with single-use recovery codes. A completed challenge issues aal2 tokens."],
];

export default function Auth() {
  return (
    <>
      <PageHead
        title="Auth"
        lede="Accounts, sessions, organizations and a second factor, in the same runtime as your data."
        figure="session"
        figureLabel="A card file of four cards of different heights: the person, the session, the organization and the second factor. The card under the pointer slides up."
        primary={{ href: docs("auth/overview"), label: "Read the guide" }}
        secondary={{ href: docs("quickstart"), label: "Quickstart" }}
      />

      <section className="section" aria-labelledby="ways">
      <i className="fx dots patch tr" aria-hidden="true" />
        <div className="wrap">
          <h2 id="ways" className="h1" style={{ marginBottom: 28 }}>
            Four ways in.
          </h2>
          <div className="sheet">
            <table className="spec">
              <tbody>
                {methods.map(([a, b]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section deep" aria-labelledby="session">
      <i className="fx rings big tr" aria-hidden="true" />
        <div className="wrap split">
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="session" className="h1">
              A session carries more than a user.
            </h2>
            <p className="lede">The person, the organization they act in and their assurance level, readable in every policy.</p>
            <p className="small">Access tokens last 15 minutes and refresh tokens 30 days, by default. A replayed refresh token revokes its whole family.</p>
          </div>
          <div className="c7">
            <Code lang="ts" caption="Password sign-in with the TypeScript client." source="pawabase-docs, Clients › JavaScript">
              {SIGN_IN}
            </Code>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="orgs">
      <i className="fx ticks strip-h tl" aria-hidden="true" />
        <div className="wrap two">
          <div className="sheet blurb">
            <h2 id="orgs" className="h2">Organizations are built in.</h2>
            <p className="body">Owner, admin, member and viewer roles. Teams, and invitations that are signed, single-use and revocable.</p>
            <a className="arrow" href={docs("auth/organizations")}>Organizations in the docs</a>
          </div>
          <div className="sheet blurb">
            <h2 className="h2">Not included.</h2>
            <p className="body">SMS, push and email second factors. Enterprise SSO such as SAML. Passkeys. Apple, Facebook and LinkedIn as built-in providers.</p>
          </div>
        </div>
      </section>
      <Next current="auth" docsHref={docs("auth/overview")} docsLabel="Auth guide" />
    </>
  );
}
