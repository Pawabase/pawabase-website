import { Icon } from "@/components/Icon";
import { backdrop, Orbits } from "@/components/landing/Backdrops";
import { Figure } from "@/components/landing/hairline/Hairline";
import { Band, Card } from "@/components/landing/Section";
import { Mockup, useInView, useLiveTick } from "@/components/landing/studio/Studio";
import {
  Copy,
  Display,
  HeroActions,
  ProductCta,
  ProductName,
  ProductShell,
  Split,
} from "@/components/product/kit";

const RULES = [
  ["Block", "IP in 203.0.113.0/24", "403 · blocked"],
  ["Limit", "/auth/* · 10 per minute per IP", "429 · slow down"],
  ["Block", "header User-Agent matches scraper", "403 · blocked"],
  ["Allow", "key pb_pk_… · /rest/v1/*", "200 · let through"],
];

function Firewall() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 1600);
  const hit = tick % RULES.length;

  return (
    <div ref={ref}>
      <Card className="mx-auto max-w-[920px] p-3">
        <Mockup label="Firewall rules checked in order; each request stops at the first rule that matches" className="sx-window block">
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
            <span className="text-[14px] font-semibold">Firewall · checked top to bottom</span>
            <span className="sx-btn sx-btn-primary"><Icon name="add" size={13} />Add rule</span>
          </div>
          {RULES.map(([action, rule, result], i) => (
            <div
              key={rule}
              className="grid h-[54px] grid-cols-[28px_64px_minmax(0,1fr)_130px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] transition-colors duration-500 last:border-b-0 max-[640px]:grid-cols-[24px_56px_minmax(0,1fr)]"
              style={{ background: i === hit && tick ? "var(--sx-brand-soft)" : "transparent" }}
            >
              <span className="sx-mono text-[var(--sx-faint)]">{i + 1}</span>
              <span className="font-medium">{action}</span>
              <span className="sx-mono truncate pr-3 text-[var(--sx-muted)]">{rule}</span>
              <span className="text-right text-[12px] max-[640px]:hidden" style={{ color: i === hit && tick ? "var(--sx-text)" : "var(--sx-faint)" }}>{result}</span>
            </div>
          ))}
        </Mockup>
      </Card>
    </div>
  );
}

function KeyCard({ title, where, keyText, lines, tone }: { title: string; where: string; keyText: string; lines: string[]; tone: string }) {
  return (
    <Card className="flex flex-col p-8">
      <span className="text-[13px] text-muted">{where}</span>
      <span className="mt-2 text-[22px] font-medium tracking-[-0.03em] text-text">{title}</span>
      <span className="mt-6 font-[Geist_Mono,ui-monospace,monospace] text-[15px]" style={{ color: tone }}>{keyText}</span>
      <ul className="mt-6 grid gap-2.5">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-muted">
            <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full" style={{ background: tone }} />
            {line}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RateChart() {
  const bars = [6, 8, 7, 9, 10, 10, 14, 18, 10, 9, 7, 8];
  const cap = 10;
  return (
    <Figure width={620} height={260} label="Requests per minute from one address: anything above the limit of ten gets a polite 429" className="h-auto w-full">
      <line x1="30" x2="600" y1={220 - cap * 14} y2={220 - cap * 14} style={{ stroke: "#ff7049", strokeDasharray: "4 5" }} />
      <text x="600" y={220 - cap * 14 - 8} textAnchor="end" fontSize="11" fill="#ff7049">limit · 10 per minute</text>
      {bars.map((v, i) => {
        const x = 40 + i * 46;
        const within = Math.min(v, cap);
        return (
          <g key={i}>
            <rect x={x} y={220 - within * 14} width="26" height={within * 14} rx="4" style={{ fill: "rgba(255,255,255,0.12)", stroke: "none" }} />
            {v > cap ? <rect x={x} y={220 - v * 14} width="26" height={(v - cap) * 14} rx="4" style={{ fill: "none", stroke: "#f39a93", strokeDasharray: "3 3" }} /> : null}
          </g>
        );
      })}
      <line x1="30" x2="600" y1="220" y2="220" style={{ stroke: "rgba(255,255,255,0.15)" }} />
      <text x="370" y="244" textAnchor="middle" fontSize="11" fill="#74767c">extra requests get 429 · try again shortly</text>
    </Figure>
  );
}

function Trial() {
  return (
    <Card className="p-3">
      <Mockup label="A new firewall rule in trial mode, recording the requests it would have blocked without blocking them" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="sx-mono text-[12.5px]">Block · /admin/* from outside the office IPs</span>
          <span className="sx-seg"><span data-on="">Trial</span><span>Enforce</span></span>
        </div>
        <div className="px-5 py-4 text-[13px]">
          <span className="text-text">Would have blocked 14 requests</span>
          <span className="text-[var(--sx-faint)]"> in the last hour · none were affected</span>
        </div>
        {["GET /admin/reports", "POST /admin/users", "GET /admin/settings"].map((req, i) => (
          <div key={req} className="flex h-[44px] items-center justify-between border-t border-[var(--sx-line-soft)] px-5 text-[12px]">
            <span className="sx-mono text-[var(--sx-muted)]">{req}</span>
            <span className="text-[var(--sx-faint)]">{["2 min", "9 min", "31 min"][i]} ago · would block</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

function CorsSecrets() {
  return (
    <div className="grid gap-4 min-[860px]:grid-cols-2">
      <Card className="p-3">
        <Mockup label="Allowed origins for browser requests" className="sx-window block">
          <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[14px] font-semibold">Allowed origins</div>
          {["https://northwind.com", "https://app.northwind.com", "http://localhost:5173"].map((o) => (
            <div key={o} className="flex h-[46px] items-center justify-between border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
              <span className="sx-mono">{o}</span>
              <span className="text-[var(--sx-faint)]">Remove</span>
            </div>
          ))}
        </Mockup>
      </Card>
      <Card className="p-3">
        <Mockup label="Secrets stored on the server, away from your app" className="sx-window block">
          <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[14px] font-semibold">Secrets</div>
          {[["STRIPE_SECRET", "3f2a"], ["CRM_TOKEN", "91cd"], ["MAPS_API_KEY", "a07e"]].map(([name, tail]) => (
            <div key={name} className="flex h-[46px] items-center justify-between border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
              <span className="sx-mono">{name}</span>
              <span className="sx-mono text-[var(--sx-faint)]">••••••••{tail}</span>
            </div>
          ))}
        </Mockup>
      </Card>
    </div>
  );
}

function Audit() {
  return (
    <Card className="p-3">
      <Mockup label="An audit log of security changes: who made each one and when" className="sx-window block">
        <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[14px] font-semibold">Audit log</div>
        {[
          ["Marcus Chen", "rotated the production secret key", "4 min ago"],
          ["Ada Nwosu", "added firewall rule #3", "1 h ago"],
          ["Ada Nwosu", "allowed origin app.northwind.com", "yesterday"],
          ["Tunde Bakare", "updated secret CRM_TOKEN", "2 days ago"],
        ].map(([who, what, when]) => (
          <div key={what} className="flex h-[50px] items-center gap-3 border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
            <span className="font-medium">{who}</span>
            <span className="min-w-0 flex-1 truncate text-[var(--sx-muted)]">{what}</span>
            <span className="text-[var(--sx-faint)]">{when}</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

export default function ApiSecurityPage() {
  return (
    <ProductShell title="API security" description="Scoped keys, an ordered firewall, rate limits, CORS, secrets and an audit log in front of every route.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(64px,8vw,112px)]" backdrop={<>{backdrop.grid()}{backdrop.glow("50%", "70%", "1000px", "520px")}</>}>
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
          <ProductName icon="apiSecurity" name="API security" />
          <Display quiet="Before it reaches your data.">Stop trouble at the door.</Display>
          <p className="max-w-[46ch] text-[16px] leading-[1.65] text-muted">
            Keys, a firewall, rate limits and secrets sit in front of every
            route, set up in the dashboard, not stitched together from extra
            services.
          </p>
          <HeroActions />
        </div>
        <div className="mt-14">
          <Firewall />
        </div>
      </Band>

      <Band labelledBy="sec-keys" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="sec-keys" center title="Two kinds of key." quiet="Each in its place." />
        <div className="mx-auto mt-12 grid max-w-[1000px] gap-4 min-[860px]:grid-cols-2">
          <KeyCard
            where="In browsers and mobile apps"
            title="Publishable key"
            keyText="pb_pk_7Hq2vN4c…"
            tone="#6fd3a2"
            lines={["Safe to ship in your frontend", "Every request follows your access rules", "Limit it to certain routes and roles"]}
          />
          <KeyCard
            where="On your servers only"
            title="Secret key"
            keyText="pb_sk_••••••••••••"
            tone="#ff7049"
            lines={["Full access for trusted back-end code", "Refused if it ever shows up in a browser", "Rotate it in a click"]}
          />
        </div>
      </Band>

      <Band labelledBy="sec-rate" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.lines("70%", "50%")}>
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="sec-rate" title="Fair use, enforced." quiet="Per route, per caller.">
              Put tighter limits on sign-in and looser ones on reads. A burst
              gets a polite "slow down" instead of taking the app with it.
            </Copy>
          }
          visual={
            <Card className="px-6 py-8">
              <RateChart />
            </Card>
          }
        />
      </Band>

      <Band labelledBy="sec-trial" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="sec-trial" title="Try a rule first." quiet="Then switch it on.">
              Run a new firewall rule in trial mode and see exactly what it
              would have blocked, before it stops a single real customer.
            </Copy>
          }
          visual={<Trial />}
        />
      </Band>

      <Band labelledBy="sec-cors" className="py-[clamp(72px,9vw,120px)]" backdrop={<Orbits />}>
        <Copy id="sec-cors" center title="The details, handled." quiet="Origins and secrets.">
          Say which sites may call your API from a browser, and keep third-party
          keys on the server, never in your app.
        </Copy>
        <div className="mx-auto mt-12 max-w-[1000px]">
          <CorsSecrets />
        </div>
      </Band>

      <Band labelledBy="sec-audit" className="py-[clamp(72px,9vw,120px)]">
        <Split
          copy={
            <Copy id="sec-audit" title="Every change, on the record." quiet="Who, what and when.">
              Key rotations, new rules and changed secrets are logged, so the
              answer to "who did this?" is always one search away.
            </Copy>
          }
          visual={<Audit />}
        />
      </Band>

      <ProductCta
        title="Secure by default."
        quiet="Not by afterthought."
        next={{ label: "Next: Flows", href: "/products/flows" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
