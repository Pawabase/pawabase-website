import { SiDiscord, SiGithub, SiStripe } from "@icons-pack/react-simple-icons";
import type { CSSProperties } from "react";

import { backdrop } from "@/components/landing/Backdrops";
import { Figure } from "@/components/landing/hairline/Hairline";
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

function BothWays() {
  const ins = [70, 160, 250];
  const outs = [90, 230];
  return (
    <Figure width={720} height={320} label="Webhooks arrive from outside services into your project, and your project sends its own events out to partners" className="h-auto w-full">
      {["Payments", "Code host", "Chat"].map((name, i) => (
        <g key={name}>
          <rect x={10} y={ins[i] - 20} width={130} height={40} rx={20} style={{ stroke: "rgba(245,243,238,0.28)" }} />
          <text x={75} y={ins[i] + 4} textAnchor="middle" fontSize="12" fontFamily="PP Neue Montreal, sans-serif" fill="#70757D">{name}</text>
          <path className="hl-line" d={`M140 ${ins[i]} C200 ${ins[i]} 220 160 280 160`} style={{ stroke: "rgba(245,243,238,0.16)" }} />
          <circle r="3" className="hl-travel" style={{ fill: "#F5F3EE", stroke: "none", "--path": `path("M140 ${ins[i]} C200 ${ins[i]} 220 160 280 160")`, "--dur": "2.4s", "--delay": `${i * 0.6}s` } as CSSProperties} />
        </g>
      ))}
      <rect x={280} y={110} width={160} height={100} rx={14} style={{ stroke: "#F5F3EE" }} />
      <text x={360} y={156} textAnchor="middle" fontSize="14" fontFamily="PP Neue Montreal, sans-serif" fill="#F5F3EE">Your project</text>
      <text x={360} y={176} textAnchor="middle" fontSize="10.5" fill="#70757D">flows</text>
      {["Warehouse", "Accounting"].map((name, i) => (
        <g key={name}>
          <path className="hl-line" d={`M440 160 C500 160 520 ${outs[i]} 580 ${outs[i]}`} style={{ stroke: "rgba(245,243,238,0.6)" }} />
          <rect x={580} y={outs[i] - 20} width={130} height={40} rx={20} style={{ stroke: "rgba(245,243,238,0.6)" }} />
          <text x={645} y={outs[i] + 4} textAnchor="middle" fontSize="12" fontFamily="PP Neue Montreal, sans-serif" fill="#F5F3EE">{name}</text>
          <circle r="3" className="hl-travel" style={{ fill: "#F5F3EE", stroke: "none", "--path": `path("M440 160 C500 160 520 ${outs[i]} 580 ${outs[i]}")`, "--dur": "2s", "--delay": `${1 + i * 0.7}s` } as CSSProperties} />
        </g>
      ))}
      <text x={75} y={300} textAnchor="middle" fontSize="11" fill="#70757D">in</text>
      <text x={645} y={300} textAnchor="middle" fontSize="11" fill="#70757D">out</text>
    </Figure>
  );
}

function Endpoint() {
  return (
    <Card className="p-3">
      <Mockup label="A webhook endpoint subscribed to order created, paid and refunded events" className="sx-window block p-6">
        <div className="text-[12px] text-[var(--sx-muted)]">Endpoint URL</div>
        <div className="sx-input sx-mono mt-2 h-[36px] text-[12.5px]">https://api.northwind-warehouse.com/hooks/orders</div>
        <div className="mt-6 text-[12px] text-[var(--sx-muted)]">Send these events</div>
        <div className="mt-3 grid gap-2.5">
          {[
            ["order.created", true],
            ["order.paid", true],
            ["order.refunded", true],
            ["customer.updated", false],
          ].map(([event, on]) => (
            <span key={event as string} className="flex items-center gap-3 text-[13px]">
              <span className="grid h-[16px] w-[16px] place-items-center rounded-[4px] border" style={{ borderColor: on ? "var(--sx-brand)" : "var(--sx-line)", background: on ? "var(--sx-brand)" : "transparent" }}>
                {on ? (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5.2 4.1 7.3 8 3" stroke="#101315" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : null}
              </span>
              <span className="sx-mono" style={{ color: on ? "var(--sx-text)" : "var(--sx-faint)" }}>{event as string}</span>
            </span>
          ))}
        </div>
      </Mockup>
    </Card>
  );
}

function Deliveries() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2600);
  const ok = tick % 3 !== 0;

  return (
    <div ref={ref}>
      <Card className="p-3">
        <Mockup label="Recent webhook deliveries; one failed and is redelivered successfully" className="sx-window block">
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
            <span className="text-[14px] font-semibold">Deliveries</span>
            <span className="sx-btn">Replay all failed</span>
          </div>
          {[
            ["order.paid", ok ? "200 OK" : "503 · will retry", ok, "just now"],
            ["order.created", "200 OK", true, "2 min ago"],
            ["order.refunded", "200 OK", true, "9 min ago"],
            ["order.created", "200 OK", true, "14 min ago"],
          ].map(([event, code, good, at], i) => (
            <div key={`${event}${i}`} className="grid h-[50px] grid-cols-[minmax(0,1fr)_150px_90px_80px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0 max-[560px]:grid-cols-[minmax(0,1fr)_130px]">
              <span className="sx-mono">{event as string}</span>
              <span key={i === 0 ? String(ok) : "s"} className={`flex items-center gap-2 text-[var(--sx-muted)] ${i === 0 ? "sx-swap" : ""}`}>
                <span className="sx-dot" style={{ background: good ? "var(--sx-ok)" : "var(--sx-warn)" }} />
                {code as string}
              </span>
              <span className="text-[var(--sx-faint)] max-[560px]:hidden">{at as string}</span>
              <span className="text-right text-[12px] text-[var(--sx-muted)] max-[560px]:hidden">Redeliver</span>
            </div>
          ))}
        </Mockup>
      </Card>
    </div>
  );
}

function Inspector() {
  return (
    <Card className="p-3">
      <Mockup label="One delivery's request body and the partner's response" className="sx-window grid min-[860px]:grid-cols-2">
        <div className="border-b border-[var(--sx-line)] min-[860px]:border-b-0 min-[860px]:border-r">
          <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px] font-semibold">Request · order.paid</div>
          <pre className="sx-mono px-5 py-4 text-[12px] leading-[1.75] text-[var(--sx-muted)]">
            {'{\n  "event": "order.paid",\n  "data": {\n    "id": "01JD7…4c1",\n    "total": 248.00,\n    "customer": "Amara Okafor"\n  }\n}'}
          </pre>
        </div>
        <div>
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px]">
            <span className="font-semibold">Response</span>
            <span className="flex items-center gap-2 text-[var(--sx-muted)]"><span className="sx-dot bg-[var(--sx-ok)]" />200 · 112 ms</span>
          </div>
          <pre className="sx-mono px-5 py-4 text-[12px] leading-[1.75] text-[var(--sx-muted)]">{'{ "received": true }'}</pre>
        </div>
      </Mockup>
    </Card>
  );
}

export default function WebhooksPage() {
  return (
    <ProductShell title="Webhooks" description="Send your events to other services and act on theirs, with every delivery logged and failures easy to replay.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]" backdrop={<>{backdrop.rings("75%", "50%")}{backdrop.glow("75%", "50%", "760px", "520px")}</>}>
        <Split
          ratio="wide-visual"
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="webhooks" name="Webhooks" />
              <Display quiet="Both ways.">Stay in sync with everything.</Display>
              <p className="max-w-[40ch] text-[16px] leading-[1.65] text-muted">
                Tell your partners the moment an order is paid, and act when a
                payment provider or code host calls you back.
              </p>
              <HeroActions />
            </div>
          }
          visual={
            <Card className="px-5 py-8">
              <BothWays />
            </Card>
          }
        />
      </Band>

      <Band labelledBy="wh-out" className="py-[clamp(72px,9vw,120px)]">
        <Split
          copy={
            <Copy id="wh-out" title="Pick the events." quiet="Paste the URL.">
              Choose which changes a partner hears about. Pawabase sends them
              as they happen, no polling on either side.
            </Copy>
          }
          visual={<Endpoint />}
        />
      </Band>

      <Band labelledBy="wh-deliveries" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.lines("50%", "50%")}>
        <Copy id="wh-deliveries" center title="When a partner is down," quiet="nothing gets lost.">
          Every delivery is logged. Failures are retried, and anything that
          still didn't land can be redelivered with one click.
        </Copy>
        <div className="mx-auto mt-12 max-w-[920px]">
          <Deliveries />
        </div>
      </Band>

      <Band labelledBy="wh-inspect" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="wh-inspect" title="See exactly what was sent." quiet="And what came back.">
              Open any delivery to read the payload and the response, so
              "did they get it?" takes seconds to answer.
            </Copy>
          }
          visual={<Inspector />}
        />
      </Band>

      <Band labelledBy="wh-in" className="py-[clamp(88px,10vw,140px)]" backdrop={backdrop.dots("50%", "60%")}>
        <Copy id="wh-in" center title="Their events start your flows." quiet="Incoming webhooks, handled.">
          Point a service at your project and run a flow when it
          calls, from a paid invoice to a new pull request.
        </Copy>
        <div className="mx-auto mt-12 flex items-center justify-center gap-[clamp(32px,6vw,72px)] text-white/40">
          {[SiStripe, SiGithub, SiDiscord].map((Mark, i) => (
            <Mark key={i} size={40} aria-hidden="true" className="transition-colors duration-200 hover:text-text" />
          ))}
        </div>
      </Band>

      <Band labelledBy="wh-points" className="py-[clamp(64px,8vw,104px)]">
        <h2 id="wh-points" className="sr-only">Webhooks at a glance</h2>
        <Points
          items={[
            { icon: "events", title: "Event-based", copy: "Send on the changes that matter, nothing else." },
            { icon: "refresh", title: "Retried", copy: "Temporary failures are tried again on their own." },
            { icon: "document", title: "Logged", copy: "Every payload and response, kept for you to read." },
          ]}
        />
      </Band>

      <ProductCta
        title="Connect the dots."
        quiet="In both directions."
        next={{ label: "Next: Releases", href: "/products/releases" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
