import { backdrop } from "@/components/landing/Backdrops";
import { Band, Card } from "@/components/landing/Section";
import { Mockup, useInView, useLiveTick } from "@/components/landing/studio/Studio";
import {
  Copy,
  Display,
  HeroActions,
  Points,
  ProductCta,
  ProductName,
  ProductShell,
  Split,
} from "@/components/product/kit";

const REQUESTS = [
  ["GET", "/rest/v1/orders", "200", "24 ms"],
  ["POST", "/auth/v1/token", "200", "61 ms"],
  ["POST", "/flows/orders-fulfil", "200", "84 ms"],
  ["GET", "/storage/v1/product-images/mug.jpg", "200", "12 ms"],
  ["PATCH", "/rest/v1/orders/01JD7…", "403", "9 ms"],
  ["GET", "/rest/v1/customers", "200", "31 ms"],
];

function Overview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 1800);
  const rows = Array.from({ length: 5 }, (_, i) => REQUESTS[(tick + i) % REQUESTS.length]);

  return (
    <div ref={ref}>
      <Card className="p-3">
        <Mockup label="Traffic over the last day beside a live list of recent requests with their status and time" className="sx-window grid min-[1000px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="border-b border-[var(--sx-line)] p-5 min-[1000px]:border-b-0 min-[1000px]:border-r">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="font-semibold">Requests · 24 h</span>
              <span className="sx-seg"><span>1h</span><span data-on="">24h</span><span>7d</span></span>
            </div>
            <svg viewBox="0 0 400 170" className="mt-5 h-[190px] w-full" aria-hidden="true">
              {[40, 85, 130].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#1f2023" strokeDasharray="2 4" />
              ))}
              <path d="M0 140 C30 136 50 120 70 124 S110 90 130 96 S170 130 190 118 S230 40 250 50 S290 110 310 100 S360 70 400 76" fill="none" stroke="#ff7049" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              <path d="M0 160 C40 160 80 156 120 158 S200 150 240 154 S320 156 400 152" fill="none" stroke="#efc463" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="mt-2 flex gap-5 text-[11.5px] text-[var(--sx-faint)]">
              <span className="flex items-center gap-1.5"><span className="sx-dot bg-[var(--sx-brand)]" />Requests</span>
              <span className="flex items-center gap-1.5"><span className="sx-dot bg-[var(--sx-warn)]" />Errors</span>
            </div>
          </div>
          <div>
            <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px] font-semibold">Recent requests</div>
            {rows.map(([method, path, code, ms], i) => (
              <div key={`${tick}-${i}`} className={`grid h-[46px] grid-cols-[52px_minmax(0,1fr)_40px_54px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12px] last:border-b-0 [--sx-row:46px] ${i === 0 && tick ? "sx-row-in" : ""}`}>
                <span className="sx-mono text-[11px] text-[var(--sx-faint)]">{method}</span>
                <span className="sx-mono truncate pr-3">{path}</span>
                <span className="sx-mono" style={{ color: code === "200" ? "var(--sx-ok)" : "var(--sx-warn)" }}>{code}</span>
                <span className="sx-num text-right text-[var(--sx-faint)]">{ms}</span>
              </div>
            ))}
          </div>
        </Mockup>
      </Card>
    </div>
  );
}

const SPANS = [
  ["Gateway", 0, 3],
  ["API key and firewall", 3, 2],
  ["Session", 5, 4],
  ["Access policy", 9, 3],
  ["Database query", 12, 22],
  ["Flow · orders-fulfil", 34, 46],
  ["Response", 80, 4],
] as const;

function Waterfall() {
  return (
    <Card className="p-3">
      <Mockup label="One request traced step by step: gateway, key check, session, access policy, database query, flow and response" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px]">
          <span className="sx-mono">POST /flows/orders-fulfil</span>
          <span className="flex items-center gap-2 text-[var(--sx-muted)]"><span className="sx-dot bg-[var(--sx-ok)]" />200 · 84 ms</span>
        </div>
        {SPANS.map(([name, start, dur]) => (
          <div key={name} className="grid h-[42px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_56px] items-center gap-4 border-b border-[var(--sx-line-soft)] px-5 text-[12px] last:border-b-0">
            <span className="truncate">{name}</span>
            <span className="relative h-[6px] rounded-full bg-[var(--sx-line-soft)]">
              <span className="absolute inset-y-0 rounded-full bg-[var(--sx-brand)]" style={{ left: `${(start / 84) * 100}%`, width: `${Math.max(2, (dur / 84) * 100)}%` }} />
            </span>
            <span className="sx-num text-right text-[var(--sx-faint)]">{dur} ms</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

function Errors() {
  return (
    <Card className="p-3">
      <Mockup label="Errors grouped by cause, with how often each happened and when it was last seen" className="sx-window block">
        <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[14px] font-semibold">Errors · last 24 h</div>
        {[
          ["KeyError: 'sku'", "stock.reserve", "12 times", "4 min ago"],
          ["Policy refused update", "PATCH /rest/v1/orders", "7 times", "18 min ago"],
          ["Upstream returned 503", "crm.sync", "3 times", "1 h ago"],
        ].map(([error, where, count, seen]) => (
          <div key={error} className="flex h-[60px] items-center gap-4 border-b border-[var(--sx-line-soft)] px-5 last:border-b-0">
            <span className="sx-dot bg-[var(--sx-danger)]" />
            <span className="min-w-0 flex-1 leading-[1.35]">
              <span className="sx-mono block truncate text-[12.5px]">{error}</span>
              <span className="block truncate text-[11.5px] text-[var(--sx-faint)]">{where}</span>
            </span>
            <span className="text-right text-[12px] leading-[1.35]">
              <span className="block text-[var(--sx-muted)]">{count}</span>
              <span className="block text-[var(--sx-faint)]">{seen}</span>
            </span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="mx-1 inline-flex items-center rounded-[10px] bg-card px-3 py-0.5 text-text ring-1 ring-brand/40">{children}</span>
  );
}

function StatusPage() {
  return (
    <Card className="p-3">
      <Mockup label="A public status page showing every part of Northwind's service running normally" className="sx-window block p-6">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold">Northwind status</span>
          <span className="sx-mono text-[12px] text-[var(--sx-faint)]">status.northwind.com</span>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-[10px] bg-[color-mix(in_srgb,#6fd3a2_12%,transparent)] px-4 py-3 text-[13px] text-[var(--sx-ok)]">
          <span className="sx-dot bg-[var(--sx-ok)]" />
          All systems normal
        </div>
        {["API", "Sign-in", "Storage", "Realtime"].map((part) => (
          <div key={part} className="flex h-[44px] items-center justify-between border-b border-[var(--sx-line-soft)] text-[13px] last:border-b-0">
            <span>{part}</span>
            <span className="text-[12px] text-[var(--sx-muted)]">Operational</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

export default function ObservabilityPage() {
  return (
    <ProductShell title="Observability" description="Requests, traces, errors, alarms and a public status page, built into your backend.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]" backdrop={<>{backdrop.grid()}{backdrop.glow("65%", "40%", "900px", "560px")}</>}>
        <Split
          ratio="wide-visual"
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="activity" name="Observability" />
              <Display quiet="Before your users do.">Know what's happening.</Display>
              <p className="max-w-[40ch] text-[16px] leading-[1.65] text-muted">
                Every request, every error and every slow step, in the same
                place as the rest of your backend. No extra tools to wire up.
              </p>
              <HeroActions />
            </div>
          }
          visual={<Overview />}
        />
      </Band>

      <Band labelledBy="ob-trace" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="ob-trace" center title="Follow one request all the way." quiet="Find the slow step in seconds.">
          See each request split into its steps, from the front door to the
          database and back, with how long every part took.
        </Copy>
        <div className="mx-auto mt-12 max-w-[980px]">
          <Waterfall />
        </div>
      </Band>

      <Band labelledBy="ob-errors" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.hatch("85%", "50%")}>
        <Split
          copy={
            <Copy id="ob-errors" title="Errors, grouped." quiet="Not a wall of logs.">
              The same failure shows up once, with how often it happened and
              where, so you fix causes instead of chasing lines.
            </Copy>
          }
          visual={<Errors />}
        />
      </Band>

      <Band labelledBy="ob-alarm" className="py-[clamp(88px,10vw,140px)]" backdrop={backdrop.rings("50%", "50%")}>
        <h2 id="ob-alarm" className="text-center text-[15px] text-faint">Alarms read like a sentence</h2>
        <p className="mx-auto mt-8 max-w-[980px] text-center text-[clamp(24px,3vw,40px)] leading-[1.6] tracking-[-0.04em] text-muted">
          When the <Chip>error rate</Chip> is above <Chip>2%</Chip> for <Chip>5 minutes</Chip>, email <Chip>ops@northwind.com</Chip>
        </p>
      </Band>

      <Band labelledBy="ob-status" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          copy={
            <Copy id="ob-status" title="A status page," quiet="without another subscription.">
              Give customers one place to check how things are running, served
              straight from your project.
            </Copy>
          }
          visual={<StatusPage />}
        />
      </Band>

      <Band labelledBy="ob-points" className="py-[clamp(64px,8vw,104px)]">
        <h2 id="ob-points" className="sr-only">Also included</h2>
        <Points
          items={[
            { icon: "document", title: "Audit log", copy: "Who changed what in your project, and when." },
            { icon: "activity", title: "Usage and limits", copy: "See what each environment uses as you grow." },
            { icon: "automation", title: "Dashboards", copy: "Put the numbers your team watches on one screen." },
          ]}
        />
      </Band>

      <ProductCta
        title="See everything."
        quiet="Worry less."
        next={{ label: "Back to the Database", href: "/products/database" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
