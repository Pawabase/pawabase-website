import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { Portrait } from "@/components/home/Platform";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { ProductHero } from "@/components/product/sections";

import "./authentication.css";

/*
 * Authentication, told through the person signing in. The hero is their card. Then: the sign-in screen you never have to build, its
 * methods taking turns; an organization with its people, wired to the company's own identity provider; and protection as rings, one
 * inside the other. Nothing here appears on another product page.
 */

const METHODS: [string, string][] = [
  ["Passkey", "A fingerprint or a face."],
  ["Email code", "Six digits, sent to their inbox."],
  ["Magic link", "One click from the email."],
  ["Password", "With the rules you set."],
  ["Google", "And nine more providers."],
];
const CODE = ["4", "8", "2", "9", "1", "7"];

function Screen() {
  const tick = useTicker(1400, 0);
  const at = Math.floor(tick / 4) % METHODS.length;
  const typed = tick % 4;
  return (
    <section className="ix-section" aria-labelledby="au-screen-title" data-plain="">
      <SectionHead id="au-screen-title" title="The sign-in screen you don't have to build" lead="Turn on the ways your people expect. Codes, links, passkeys and social accounts work the day you switch them on, with sessions that refresh on their own." />
      <div className="au-stage" data-reveal="up">
        <ul className="au-methods">
          {METHODS.map(([name, line], i) => (
            <li key={name} className={i === at ? "on" : ""}><b>{name}</b><span>{line}</span></li>
          ))}
        </ul>
        <div className="au-card" aria-hidden="true">
          <span className="au-card-mark" />
          <b>Sign in to Acme</b>
          {at === 0 && <div className="au-print"><span /><Icon name="verified" size={34} variant="Linear" /></div>}
          {at === 1 && <div className="au-code">{CODE.map((d, i) => <span key={i} className={i < (typed + 1) * 2 ? "full" : ""}>{i < (typed + 1) * 2 ? d : ""}</span>)}</div>}
          {at === 2 && <div className="au-link"><Icon name="mail" size={20} variant="Linear" /><span>Check your inbox</span><i /></div>}
          {at === 3 && <div className="au-fields"><span>ada@acme.com</span><span>••••••••••</span></div>}
          {at === 4 && <div className="au-fields"><span className="au-social">Continue with Google</span><span className="au-social">Continue with GitHub</span></div>}
          <span className="au-go">Continue</span>
        </div>
      </div>
    </section>
  );
}

const PEOPLE: [string, string, string][] = [["AL", "Ada Lovelace", "Owner"], ["GH", "Grace Hopper", "Admin"], ["AT", "Alan Turing", "Member"], ["KJ", "Katherine Johnson", "Invited"]];

function Org() {
  const [sso, setSso] = useState(true);
  return (
    <section className="ix-section ix-band" aria-labelledby="au-org-title" data-plain="">
      <SectionHead id="au-org-title" title="Organizations, and the companies behind them" lead="Business apps need teams. People join organizations with roles you define, by invitation or through their company's own sign-in.">
        <button type="button" className={`au-sso-toggle ${sso ? "on" : ""}`} aria-pressed={sso} onClick={() => setSso(!sso)}><i />Company sign-in</button>
      </SectionHead>
      <div className={`au-org ${sso ? "sso" : ""}`} data-reveal="up">
        <div className="au-idp" aria-hidden="true">
          <span className="au-idp-tile"><Icon name="building" size={24} variant="Linear" /></span>
          <b>Acme's identity provider</b>
          <small>SAML or OIDC · acme.com verified</small>
        </div>
        <span className="au-cable" aria-hidden="true"><i /></span>
        <div className="au-team">
          <header><span>A</span><b>Acme</b><small>{PEOPLE.length} people</small></header>
          {PEOPLE.map(([initials, name, role]) => (
            <div key={name} className={`au-person ${role === "Invited" ? "invited" : ""}`}><i>{initials}</i><span>{name}</span><em>{role}</em></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const RINGS: [string, string][] = [
  ["Bot protection", "Scripts are stopped before the form is sent."],
  ["Passkeys", "Nothing to phish, nothing to forget."],
  ["Two-step verification", "Authenticator apps and backup codes."],
  ["Your password rules", "Length and strength, as you set them."],
];

function Layers() {
  const lit = useTicker(2200, 0) % RINGS.length;
  return (
    <section className="ix-section" aria-labelledby="au-layers-title" data-plain="">
      <SectionHead id="au-layers-title" title="Protection, in layers" lead="Each layer is a switch. Turn on what an account needs, and let organizations ask for more." />
      <div className="au-layers" data-reveal="up">
        <div className="au-rings" aria-hidden="true">
          {RINGS.map((_, i) => <span key={i} className={`r${i} ${i === lit ? "lit" : ""}`} />)}
          <span className="au-core"><Icon name="users" size={26} variant="Linear" /></span>
        </div>
        <ol className="au-ring-list">
          {RINGS.map(([name, line], i) => <li key={name} className={i === lit ? "lit" : ""}><b>{name}</b><span>{line}</span></li>)}
        </ol>
      </div>
    </section>
  );
}

export default function AuthenticationPage() {
  return (
    <ProductFrame
      name="Authentication"
      description="Email, passkeys, social and company sign-in, two-step verification, organizations, roles, invitations and sessions."
      hero={
        <ProductHero
          title="Sign-in for your app,"
          quiet="done properly."
          lead="Passwords, codes, passkeys and social sign-in, with organizations, roles and sessions included."
          art={<Portrait />}
          notes={["Passkeys", "Organizations and roles", "Company sign-in"]}
        />
      }
    >
      <Screen />
      <Org />
      <Layers />
    </ProductFrame>
  );
}
