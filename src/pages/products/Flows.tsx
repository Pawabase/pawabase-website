import { Icon, type IconName } from "@/components/Icon";
import { backdrop } from "@/components/landing/Backdrops";
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

function Node({ kind, title, detail, lit, className = "" }: { kind: string; title: string; detail: string; lit: boolean; className?: string }) {
  return (
    <div
      className={`w-[230px] rounded-[10px] border bg-[var(--sx-surface)] transition-colors duration-500 ${className}`}
      style={{ borderColor: lit ? "var(--sx-brand)" : "var(--sx-line)" }}
    >
      <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-3 py-2 text-[11.5px] text-[var(--sx-faint)]">
        {kind}
        <span className="sx-dot transition-colors duration-500" style={{ background: lit ? "var(--sx-brand)" : "var(--sx-line)" }} />
      </div>
      <div className="px-3 py-2.5">
        <div className="text-[13px] font-medium">{title}</div>
        <div className="sx-mono mt-0.5 truncate text-[11.5px] text-[var(--sx-muted)]">{detail}</div>
      </div>
    </div>
  );
}

function Canvas() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 1100);
  const stage = tick % 6;
  const edge = (n: number) => (stage > n ? "#F5F3EE" : "rgba(245,243,238,0.14)");

  return (
    <div ref={ref}>
      <Card className="p-3">
        <Mockup label="A flow that, when an order is created, checks the total and either sends a VIP receipt or reserves stock" className="sx-window block overflow-x-auto">
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
            <span className="flex items-center gap-3">
              <span className="text-[14px] font-semibold">Large order</span>
              <span className="flex items-center gap-1.5 text-[12px] text-[var(--sx-muted)]"><span className="sx-dot bg-[var(--sx-ok)]" />Enabled</span>
            </span>
            <span className="flex gap-2"><span className="sx-btn">Runs</span><span className="sx-btn sx-btn-primary">Save</span></span>
          </div>
          <div className="relative h-[300px] min-w-[980px]">
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M270 150 H330" stroke={edge(0)} fill="none" className="transition-[stroke] duration-500" />
              <path d="M560 150 C600 150 600 80 640 80" stroke={edge(1)} fill="none" className="transition-[stroke] duration-500" />
              <path d="M560 150 C600 150 600 220 640 220" stroke={edge(2)} fill="none" className="transition-[stroke] duration-500" />
            </svg>
            <Node kind="Trigger" title="An order is created" detail="orders · created" lit={stage >= 1} className="absolute left-10 top-[118px]" />
            <Node kind="Condition" title="Total is over 500" detail="record.total > 500" lit={stage >= 2} className="absolute left-[330px] top-[118px]" />
            <Node kind="Send email" title="VIP receipt" detail="template: vip-receipt" lit={stage >= 3} className="absolute left-[640px] top-[48px]" />
            <Node kind="Update record" title="Reserve stock" detail="stock · reserved" lit={stage >= 4} className="absolute left-[640px] top-[188px]" />
          </div>
        </Mockup>
      </Card>
    </div>
  );
}

function Schedules() {
  return (
    <Card className="p-3">
      <Mockup label="Three schedules: a nightly digest, a weekly report and an hourly cart clean-up, with when each runs next" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="text-[14px] font-semibold">Schedules</span>
          <span className="sx-btn sx-btn-primary"><Icon name="add" size={13} />New schedule</span>
        </div>
        {[
          ["Nightly digest", "Every day at 07:00", "in 6 h"],
          ["Weekly sales report", "Mondays at 09:00", "in 3 days"],
          ["Clear abandoned carts", "Every hour", "in 24 min"],
        ].map(([name, when, next]) => (
          <div key={name} className="grid h-[54px] grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_90px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
            <span className="font-medium">{name}</span>
            <span className="text-[var(--sx-muted)]">{when}</span>
            <span className="text-right text-[var(--sx-faint)]">{next}</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

const BLOCKS: { icon: IconName; name: string; copy: string }[] = [
  { icon: "events", name: "Trigger", copy: "An event, a schedule, a webhook or a call" },
  { icon: "policies", name: "Condition", copy: "Only continue when it's true" },
  { icon: "automation", name: "Branch", copy: "Take a different path per case" },
  { icon: "refresh", name: "Transform", copy: "Reshape data between steps" },
  { icon: "mail", name: "Send email", copy: "From one of your templates" },
  { icon: "events", name: "Emit event", copy: "Let other flows react" },
];

function Trace() {
  const steps = [
    ["Trigger · orders.created", 0, 4],
    ["Condition · total > 500", 4, 6],
    ["Send email · vip-receipt", 10, 52],
    ["Update record · stock", 10, 38],
  ] as const;
  return (
    <Card className="p-3">
      <Mockup label="A completed run of the flow with each step's timing on a shared timeline" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px]">
          <span className="font-semibold">Run · order 1291</span>
          <span className="flex items-center gap-2 text-[var(--sx-muted)]"><span className="sx-dot bg-[var(--sx-ok)]" />Completed · 62 ms</span>
        </div>
        {steps.map(([name, start, dur]) => (
          <div key={name} className="grid h-[46px] grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-4 border-b border-[var(--sx-line-soft)] px-5 text-[12px] last:border-b-0">
            <span className="truncate">{name}</span>
            <span className="relative h-[6px] rounded-full bg-[var(--sx-line-soft)]">
              <span className="absolute inset-y-0 rounded-full bg-[var(--sx-brand)]" style={{ left: `${(start / 62) * 100}%`, width: `${(dur / 62) * 100}%` }} />
            </span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

function Retries() {
  const xs = [80, 180, 340, 600];
  return (
    <Figure width={760} height={200} label="A step that fails is retried, waiting longer before each attempt, and succeeds on the fourth" className="h-auto w-full min-w-[600px]">
      <line x1="40" x2="720" y1="100" y2="100" style={{ stroke: "rgba(245,243,238,0.18)" }} />
      {xs.slice(0, -1).map((x, i) => (
        <g key={x}>
          <path className="hl-line" d={`M${x} 100 C${x + 20} 50 ${xs[i + 1] - 20} 50 ${xs[i + 1]} 100`} style={{ stroke: "rgba(245,243,238,0.2)", strokeDasharray: "3 5" }} />
          <text x={(x + xs[i + 1]) / 2} y="52" textAnchor="middle" fontSize="10.5" fill="#70757D">waits {[2, 8, 30][i]}s</text>
        </g>
      ))}
      {xs.map((x, i) => {
        const ok = i === xs.length - 1;
        return (
          <g key={x}>
            <circle cx={x} cy="100" r="7" style={{ fill: "var(--hl-plate)", stroke: ok ? "#F5F3EE" : "#F5F3EE" }} />
            <text x={x} y="134" textAnchor="middle" fontSize="11" fill={ok ? "#F5F3EE" : "#70757D"}>attempt {i + 1}</text>
            <text x={x} y="152" textAnchor="middle" fontSize="10.5" fill={ok ? "#F5F3EE" : "#70757D"}>{ok ? "succeeded" : "failed"}</text>
          </g>
        );
      })}
    </Figure>
  );
}

export default function FlowsPage() {
  return (
    <ProductShell title="Flows" description="Visual workflows for APIs, events, schedules and webhooks, with retries and a trace for every run.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(64px,8vw,112px)]" backdrop={<>{backdrop.dots("50%", "70%")}{backdrop.glow("50%", "80%", "1100px", "520px")}</>}>
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
          <ProductName icon="automation" name="Flows" />
          <Display quiet="Let the backend do the busywork.">When this happens, do that.</Display>
          <p className="max-w-[46ch] text-[16px] leading-[1.65] text-muted">
            Draw the steps, connect them, and switch it on. Receipts, reminders,
            reports and clean-ups run themselves.
          </p>
          <HeroActions />
        </div>
        <div className="mx-auto mt-14 max-w-[1120px]">
          <Canvas />
        </div>
      </Band>

      <Band labelledBy="fl-schedules" className="py-[clamp(72px,9vw,120px)]">
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="fl-schedules" title="On the clock." quiet="No cron server.">
              Run a flow every hour, every night or every Monday morning, and
              see exactly when each one goes next.
            </Copy>
          }
          visual={<Schedules />}
        />
      </Band>

      <Band labelledBy="fl-blocks" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.hatch("15%", "50%")}>
        <Copy id="fl-blocks" center title="Building blocks, not boilerplate." quiet="Snap them together." />
        <ul className="mx-auto mt-12 grid max-w-[1080px] gap-3 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4">
          {BLOCKS.map((block, i) => (
            <li key={block.name + i} className="flex items-start gap-3 rounded-[14px] bg-card px-4 py-4 ring-1 ring-white/[0.04] transition-colors duration-200 hover:ring-brand/30">
              <Icon name={block.icon} size={20} variant="TwoTone" className="mt-0.5 flex-none text-brand" />
              <span className="leading-[1.4]">
                <span className="block text-[14px] font-medium text-text">{block.name}</span>
                <span className="block text-[12.5px] text-muted">{block.copy}</span>
              </span>
            </li>
          ))}
        </ul>
      </Band>

      <Band labelledBy="fl-trace" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="fl-trace" title="Every run, traced." quiet="So nothing is a mystery.">
              See what ran, in what order and how long each step took. When a
              step fails, you see where and why.
            </Copy>
          }
          visual={<Trace />}
        />
      </Band>

      <Band labelledBy="fl-retry" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.lines("50%", "55%")}>
        <Copy id="fl-retry" center title="Hiccups don't become incidents." quiet="Failed steps try again.">
          When an outside service stumbles, the step waits a little longer
          each time and tries again, so a blip never loses an order.
        </Copy>
        <Card className="mx-auto mt-12 max-w-[960px] overflow-x-auto px-6 py-8">
          <Retries />
        </Card>
      </Band>

      <ProductCta
        title="Automate the busywork."
        quiet="Keep the interesting part."
        next={{ label: "Next: Queues", href: "/products/queues" }}
        backdrop={backdrop.grid("100%")}
      />
    </ProductShell>
  );
}
