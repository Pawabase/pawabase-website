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
        lede="Identity for your application: sign-in, sessions, organizations and permissions, built into the same platform as your data and files."
        figure="session"
        figureLabel="A card file of four cards of different heights: the person, the session, the organization and the second factor. The card under the pointer slides up."
        primary={{ href: docs("auth/overview"), label: "Explore authentication" }}
        secondary={{ href: docs("quickstart"), label: "Get started" }}
      />

      <section className="section" aria-labelledby="ways">
        <div className="wrap">
          <h2 id="ways" className="h1" style={{ marginBottom: 28 }}>
            Sign-in methods.
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
        <div className="wrap split">
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="session" className="h1">
              Every request knows who is acting.
            </h2>
            <p className="lede">Each request carries the person, the organization they act for and how strongly they authenticated, so access policies stay short and precise.</p>
            <p className="small">Sessions stay short and refresh quietly. If a stolen session is replayed, all of that person's sessions are signed out.</p>
          </div>
          <div className="c7">
            <Code lang="ts" caption="Password sign-in with the TypeScript client." source="pawabase-docs, Clients › JavaScript">
              {SIGN_IN}
            </Code>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="orgs">
        <div className="wrap two">
          <div className="sheet blurb">
            <h2 id="orgs" className="h2">Organizations and roles.</h2>
            <p className="body">Owner, admin, member and viewer roles, teams and invitations, available to every access policy in the platform.</p>
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
