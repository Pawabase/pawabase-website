import { SiApple, SiDiscord, SiFacebook, SiGithub, SiGitlab, SiGoogle, SiTwitch } from "@icons-pack/react-simple-icons";
import type { ReactNode } from "react";

import { Icon } from "@/components/Icon";
import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./authentication.css";

/* The moment of signing in, at full size: six code boxes fill the hero. Then the ways in, a wall of providers, an organization, and company sign-in. */

const DIGITS = [4, 8, 2, 9, 1, 7];
const WAYS: [string, string, ReactNode][] = [
  ["Email and password", "With the password rules you set.", <span key="p" className="au-glyph dots"><i /><i /><i /><i /><i /></span>],
  ["Email code", "A short code, sent to their inbox.", <span key="c" className="au-glyph code">482</span>],
  ["Magic link", "One click from the email.", <Icon key="l" name="webhooks" size={26} variant="Linear" />],
  ["Passkeys", "A fingerprint or a face, no password to forget.", <svg key="f" className="au-print" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 13a9 9 0 0 1 18 0v3M11 25c1.4-2.2 2-5 2-9a3 3 0 0 1 6 0c0 4-.6 7.400-2 10.500M16 16c0 4.200-.8 7.500-2.500 10.500M23 21c-.2 2-.6 3.600-1.200 5.200M7 18c0 2.400-.5 4.300-1.500 5.800" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>],
  ["Guests", "Let people try your app without an account.", <Icon key="g" name="users" size={26} variant="Linear" />],
];
const PROVIDERS: [string, ReactNode][] = [
  ["Google", <SiGoogle key="a" size={28} color="currentColor" />],
  ["Apple", <SiApple key="b" size={28} color="currentColor" />],
  ["GitHub", <SiGithub key="c" size={28} color="currentColor" />],
  ["Microsoft", <svg key="d" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 2h9.500v9.500H2zM12.500 2H22v9.500h-9.500zM2 12.500h9.500V22H2zM12.500 12.500H22V22h-9.500z" /></svg>],
  ["Discord", <SiDiscord key="e" size={28} color="currentColor" />],
  ["GitLab", <SiGitlab key="f" size={28} color="currentColor" />],
  ["LinkedIn", <b key="g" className="au-in">in</b>],
  ["Slack", <b key="h" className="au-in">#</b>],
  ["Facebook", <SiFacebook key="i" size={28} color="currentColor" />],
  ["Twitch", <SiTwitch key="j" size={28} color="currentColor" />],
];
const TEAM: [string, string, string][] = [["AL", "Ada Lovelace", "Owner"], ["GH", "Grace Hopper", "Admin"], ["AT", "Alan Turing", "Member"]];
const ALSO: [string, string][] = [
  ["Sessions and devices", "See where people are signed in, and sign them out."],
  ["API keys for your users", "Let them call your API with keys of their own."],
  ["Invitations", "Bring people into an organization by email."],
];

function CodeBoxes() {
  const step = useTicker(650, DIGITS.length) % (DIGITS.length + 4);
  const done = step >= DIGITS.length;
  return (
    <div className={`au-boxes ${done ? "done" : ""}`} aria-hidden="true">
      {DIGITS.map((digit, i) => (
        <span key={i} className={i === step ? "at" : ""}>{i < step ? digit : ""}</span>
      ))}
    </div>
  );
}

function ProviderWall() {
  const lit = useTicker(800) % PROVIDERS.length;
  return (
    <ul className="au-wall">
      {PROVIDERS.map(([name, mark], i) => <li key={name} className={i === lit ? "lit" : ""}>{mark}<span>{name}</span></li>)}
    </ul>
  );
}

export default function AuthenticationPage() {
  return (
    <ProductFrame name="Authentication" description="Email, passkeys, social and company sign-in, two-step verification, organizations, roles, invitations and sessions.">
      <section className="ix-hero au-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="au-top">
          <h1 id="product-title" data-reveal="up">Sign-in for your app, done properly.</h1>
          <div className="au-side" data-reveal="up">
            <p>Passwords, codes, passkeys and social sign-in, with organizations, roles and sessions included.</p>
            <HeroActions />
          </div>
        </div>
        <CodeBoxes />
      </section>

      <Band label="Every way to sign in" className="au-ways">
        {WAYS.map(([title, line, glyph]) => (
          <article key={title}>
            <div className="au-way-art">{glyph}</div>
            <h3>{title}</h3>
            <p>{line}</p>
          </article>
        ))}
      </Band>

      <Band label="Social sign-in" className="au-social">
        <h2>Ten providers, ready once you add your keys.</h2>
        <ProviderWall />
      </Band>

      <Band label="Organizations" className="au-orgs">
        <div className="au-org" aria-hidden="true">
          <header><span>A</span><b>Acme</b><small>3 people</small></header>
          {TEAM.map(([initials, name, role]) => (
            <div key={name} className="au-person"><i>{initials}</i><span>{name}</span><em>{role}</em></div>
          ))}
          <div className="au-person invite"><i><Icon name="mail" size={15} variant="Linear" /></i><span>katherine@acme.com</span><em>Invited</em></div>
        </div>
        <div className="au-org-copy">
          <h2>Organizations built in.</h2>
          <p>Teams, the roles you define, and invitations for business apps.</p>
          <ul>
            {ALSO.map(([title, line]) => <li key={title}><b>{title}</b><span>{line}</span></li>)}
          </ul>
        </div>
      </Band>

      <Band label="Extra protection" className="au-pair">
        <article className="hot">
          <Icon name="policies" size={26} variant="Linear" />
          <h3>Two-step verification</h3>
          <p>Authenticator apps and backup codes for accounts that need more.</p>
        </article>
        <article>
          <div className="au-big" aria-hidden="true"><span>SAML</span><span>OIDC</span></div>
          <h3>Company sign-in</h3>
          <p>Let businesses sign in with their own identity provider.</p>
        </article>
      </Band>
    </ProductFrame>
  );
}
