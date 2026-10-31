import { SiApple, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

import { Icon } from "@/components/Icon";
import { backdrop } from "@/components/landing/Backdrops";
import { Band, Card } from "@/components/landing/Section";
import {
  Initials,
  Mockup,
  PASTELS,
  useInView,
  useLiveTick,
} from "@/components/landing/studio/Studio";
import {
  CodeCard,
  Copy,
  Display,
  HeroActions,
  Points,
  ProductCta,
  ProductName,
  ProductShell,
  Split,
} from "@/components/product/kit";

function SignIn() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 600);
  const typed = tick % 10;

  return (
    <div ref={ref}>
      <Card className="mx-auto max-w-[460px] p-3">
        <Mockup label="A sign-in screen with Google, GitHub and Apple, an email field and a two-step code being entered" className="sx-window block px-7 py-8">
          <div className="text-[18px] font-semibold tracking-[-0.02em]">Sign in to Northwind</div>
          <div className="mt-1 text-[13px] text-[var(--sx-faint)]">Welcome back. Pick how you'd like to continue.</div>
          <div className="mt-6 grid gap-2">
            {[
              ["Continue with Google", SiGoogle],
              ["Continue with GitHub", SiGithub],
              ["Continue with Apple", SiApple],
            ].map(([name, Mark]) => {
              const M = Mark as typeof SiGoogle;
              return (
                <span key={name as string} className="sx-btn h-[38px] justify-center text-[13px]">
                  <M size={13} />
                  {name as string}
                </span>
              );
            })}
          </div>
          <div className="my-5 flex items-center gap-3 text-[11px] text-[var(--sx-faint)]">
            <span className="h-px flex-1 bg-[var(--sx-line)]" />
            or with email
            <span className="h-px flex-1 bg-[var(--sx-line)]" />
          </div>
          <div className="sx-input h-[38px] text-[13px]">ada@nwosu.dev</div>
          <div className="mt-5 text-[12.5px] text-[var(--sx-muted)]">Enter the code from your authenticator</div>
          <div className="mt-2 grid grid-cols-6 gap-2">
            {"482915".split("").map((digit, i) => (
              <span
                key={i}
                className="sx-mono grid h-[44px] place-items-center rounded-[8px] border text-[16px] transition-colors duration-300"
                style={{ borderColor: i === typed ? "var(--sx-brand)" : "var(--sx-line)" }}
              >
                {i < typed ? digit : ""}
              </span>
            ))}
          </div>
          <span className="sx-btn sx-btn-primary mt-5 h-[38px] w-full justify-center">Verify and sign in</span>
        </Mockup>
      </Card>
    </div>
  );
}

const METHODS = [
  { name: "Email and password", node: <Icon name="mail" size={30} variant="TwoTone" /> },
  { name: "Magic links", node: <Icon name="sparkle" size={30} variant="TwoTone" /> },
  { name: "Google", node: <SiGoogle size={28} /> },
  { name: "GitHub", node: <SiGithub size={28} /> },
  { name: "Apple", node: <SiApple size={28} /> },
  { name: "Single sign-on", node: <Icon name="apiSecurity" size={30} variant="TwoTone" /> },
];

const MEMBERS = [
  { name: "Ada Nwosu", email: "ada@northwind.com", role: "Owner", tone: PASTELS.peach },
  { name: "Marcus Chen", email: "marcus@northwind.com", role: "Admin", tone: PASTELS.sky },
  { name: "Inès Laurent", email: "ines@northwind.com", role: "Member", tone: PASTELS.rose },
  { name: "Tunde Bakare", email: "tunde@northwind.com", role: "Member", tone: PASTELS.mint },
];

function Team() {
  return (
    <Card className="p-3">
      <Mockup label="The Northwind organization with four members, their roles, and a pending invitation" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="flex items-center gap-2">
            <span className="text-[15px] font-semibold">Northwind</span>
            <span className="text-[12px] text-[var(--sx-faint)]">· Ops team</span>
          </span>
          <span className="sx-btn sx-btn-primary">
            <Icon name="add" size={13} />
            Invite
          </span>
        </div>
        {MEMBERS.map((m) => (
          <div key={m.email} className="flex h-[56px] items-center gap-3 border-b border-[var(--sx-line-soft)] px-5">
            <Initials name={m.name} tone={m.tone} size={28} />
            <span className="min-w-0 flex-1 leading-[1.3]">
              <span className="block text-[13px] font-medium">{m.name}</span>
              <span className="block truncate text-[12px] text-[var(--sx-faint)]">{m.email}</span>
            </span>
            <span className="sx-btn h-[26px] px-2 text-[11.5px] text-[var(--sx-muted)]">{m.role} ⌄</span>
          </div>
        ))}
        <div className="flex h-[56px] items-center gap-3 px-5 text-[13px]">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-dashed border-[var(--sx-line)] text-[var(--sx-faint)]">
            <Icon name="mail" size={13} />
          </span>
          <span className="flex-1 text-[var(--sx-muted)]">freya@olsen.no</span>
          <span className="text-[12px] text-[var(--sx-faint)]">Invited · Member</span>
        </div>
      </Mockup>
    </Card>
  );
}

function TwoStep() {
  return (
    <Card className="p-3">
      <Mockup label="Two-step verification turned on, with ten single-use recovery codes" className="sx-window grid min-[760px]:grid-cols-2">
        <div className="border-b border-[var(--sx-line)] p-7 min-[760px]:border-b-0 min-[760px]:border-r">
          <div className="flex items-center gap-2 text-[14px] font-semibold">
            <span className="sx-dot bg-[var(--sx-ok)]" />
            Two-step verification is on
          </div>
          <p className="mt-2 text-[12.5px] leading-[1.6] text-[var(--sx-muted)]">
            Ada signs in with a code from her authenticator app. If she loses
            her phone, a recovery code gets her back in.
          </p>
          <div className="mt-6 grid grid-cols-6 gap-2">
            {"204816".split("").map((d, i) => (
              <span key={i} className="sx-mono grid h-[42px] place-items-center rounded-[8px] border border-[var(--sx-line)] text-[16px]">{d}</span>
            ))}
          </div>
        </div>
        <div className="p-7">
          <div className="text-[14px] font-semibold">Recovery codes</div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {["k7f2-9qxd", "m3p8-2hvn", "t9c4-7wbe", "a1r6-5yzu", "q5n3-8kfl", "w2j9-4dmc", "e8g1-6tsa", "h4v7-3xpo", "z6b2-1lqi", "y3s5-9cnr"].map((code, i) => (
              <span key={code} className="sx-mono text-[12.5px]" style={{ color: i === 3 ? "var(--sx-faint)" : "var(--sx-muted)", textDecoration: i === 3 ? "line-through" : "none" }}>
                {code}
              </span>
            ))}
          </div>
        </div>
      </Mockup>
    </Card>
  );
}

function Sessions() {
  return (
    <Card className="p-3">
      <Mockup label="Ada's active sessions on three devices, each of which can be signed out" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="text-[14px] font-semibold">Sessions · Ada Nwosu</span>
          <span className="text-[12px] text-[var(--sx-muted)]">Sign out everywhere</span>
        </div>
        {[
          ["MacBook Pro · Safari", "Active now", true],
          ["iPhone 15 · Northwind app", "12 min ago", false],
          ["Windows · Chrome", "3 days ago", false],
        ].map(([device, seen, current]) => (
          <div key={device as string} className="flex h-[54px] items-center gap-3 border-b border-[var(--sx-line-soft)] px-5 text-[13px] last:border-b-0">
            <Icon name={current ? "activity" : "realtime"} size={16} variant="TwoTone" className="text-[var(--sx-muted)]" />
            <span className="flex-1">{device as string}</span>
            <span className="text-[12px] text-[var(--sx-faint)]">{seen as string}</span>
            {current ? <span className="w-[64px] text-right text-[12px] text-[var(--sx-ok)]">This one</span> : <span className="w-[64px] text-right text-[12px] text-[var(--sx-muted)]">Sign out</span>}
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

export default function AuthenticationPage() {
  return (
    <ProductShell title="Authentication" description="Users, organizations, sessions and two-step verification, ready on launch day.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]" backdrop={<>{backdrop.dots("25%", "50%")}{backdrop.glow("25%", "30%", "760px", "560px")}</>}>
        <Split
          flip
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="users" name="Authentication" />
              <Display quiet="Without the headache.">Sign-in, handled.</Display>
              <p className="max-w-[40ch] text-[16px] leading-[1.65] text-muted">
                Social sign-in, magic links, two-step codes, teams and invites.
                Everything your users expect on day one, and none of it to
                build yourself.
              </p>
              <HeroActions />
            </div>
          }
          visual={<SignIn />}
        />
      </Band>

      <Band labelledBy="auth-methods" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="auth-methods" center title="Every way in." quiet="Switched on with a toggle.">
          Offer the sign-in your users prefer, and connect your company's own
          identity provider when the big customers arrive.
        </Copy>
        <ul className="mx-auto mt-14 grid max-w-[980px] grid-cols-2 gap-y-12 min-[640px]:grid-cols-3 min-[1000px]:grid-cols-6">
          {METHODS.map((m) => (
            <li key={m.name} className="group flex flex-col items-center gap-3 text-center">
              <span className="text-white/45 transition-colors duration-200 group-hover:text-brand">{m.node}</span>
              <span className="text-[13.5px] text-muted">{m.name}</span>
            </li>
          ))}
        </ul>
      </Band>

      <Band labelledBy="auth-teams" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.hatch("85%", "50%")}>
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="auth-teams" title="From one user to whole teams." quiet="Built in, not bolted on.">
              Organizations, teams, roles and invitations come ready, and your
              access rules can use them straight away.
            </Copy>
          }
          visual={<Team />}
        />
      </Band>

      <Band labelledBy="auth-mfa" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="auth-mfa" center title="A second lock on every door." quiet="And a spare key.">
          Two-step verification with an authenticator app, and recovery codes
          for the day someone loses their phone.
        </Copy>
        <div className="mx-auto mt-12 max-w-[980px]">
          <TwoStep />
        </div>
      </Band>

      <Band labelledBy="auth-sessions" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          copy={
            <Copy id="auth-sessions" title="Every session, in view." quiet="And easy to end.">
              See where people are signed in, end one session or all of them,
              and enforce the password policy your security team asks for.
            </Copy>
          }
          visual={<Sessions />}
        />
        <Points
          className="mt-[clamp(64px,8vw,96px)]"
          items={[
            { icon: "policies", title: "Password policy", copy: "Set length and strength rules, and check them on every change." },
            { icon: "mail", title: "Email verification", copy: "Confirm addresses before accounts go live." },
            { icon: "apiSecurity", title: "Personal API keys", copy: "Let users create keys for their own integrations." },
          ]}
        />
      </Band>

      <Band labelledBy="auth-code" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.glow("70%", "50%", "820px", "480px")}>
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="auth-code" title="A few lines in your app." quiet="Sessions kept fresh for you.">
              Sign people in, ask for their second step when it's on, and react
              when they come and go. Tokens refresh on their own.
            </Copy>
          }
          visual={
            <CodeCard
              file="sign-in.ts"
              label="Signing in with a password, asking for a two-step code when required, and listening for sign-in changes"
              lines={[
                "const result = await pawabase.auth.signInWithPassword({ email, password });",
                "",
                'if (result.status === "mfa_required") {',
                "  await result.verify(codeFromAuthenticator);",
                "}",
                "",
                "pawabase.auth.onAuthStateChange((event, session) => {",
                '  if (event === "SIGNED_OUT") router.push("/login");',
                "});",
              ]}
            />
          }
        />
      </Band>

      <ProductCta
        title="Let people in."
        quiet="Keep everyone else out."
        next={{ label: "Next: Access policies", href: "/products/policies" }}
        backdrop={backdrop.rings("50%", "100%")}
      />
    </ProductShell>
  );
}
