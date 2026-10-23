import { backdrop } from "@/components/landing/Backdrops";
import { Figure } from "@/components/landing/hairline/Hairline";
import { Band, Card } from "@/components/landing/Section";
import { Mockup, useInView, useLiveTick } from "@/components/landing/studio/Studio";
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

const ENDPOINTS = [
  ["GET", "/rest/v1/orders", "List, filter, sort, page"],
  ["GET", "/rest/v1/orders/:id", "One record, with relations"],
  ["POST", "/rest/v1/orders", "Create"],
  ["PATCH", "/rest/v1/orders/:id", "Update the fields you send"],
  ["DELETE", "/rest/v1/orders/:id", "Remove"],
];

function RequestResponse() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2200);
  const active = tick % ENDPOINTS.length;

  return (
    <div ref={ref}>
      <Card className="p-3">
        <Mockup label="The five endpoints generated for an orders table, and a JSON response listing paid orders" className="sx-window grid min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="border-b border-[var(--sx-line)] min-[860px]:border-b-0 min-[860px]:border-r">
            <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px] font-semibold">orders · generated</div>
            {ENDPOINTS.map(([method, path, note], i) => (
              <div
                key={method + path}
                className="grid h-[52px] grid-cols-[64px_minmax(0,1fr)] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] transition-colors duration-500 last:border-b-0"
                style={{ background: i === active ? "var(--sx-brand-soft)" : "transparent" }}
              >
                <span className="sx-mono text-[11.5px]" style={{ color: method === "GET" ? "var(--sx-ok)" : method === "DELETE" ? "var(--sx-danger)" : "var(--sx-info)" }}>
                  {method}
                </span>
                <span className="min-w-0 leading-[1.35]">
                  <span className="sx-mono block truncate">{path}</span>
                  <span className="block truncate text-[11.5px] text-[var(--sx-faint)]">{note}</span>
                </span>
              </div>
            ))}
          </div>
          <pre className="sx-mono overflow-hidden px-5 py-4 text-[12px] leading-[1.75] text-[var(--sx-muted)]">
            {"{\n"}
            {'  "data": [\n'}
            {"    {\n"}
            {'      "id": '}<span className="text-[#c9bfff]">"01JD7…4c1"</span>{",\n"}
            {'      "total": '}<span className="text-[#ffb19b]">248.00</span>{",\n"}
            {'      "status": '}<span className="text-[#c9bfff]">"paid"</span>{",\n"}
            {'      "customer": { "name": '}<span className="text-[#c9bfff]">"Amara Okafor"</span>{" }\n"}
            {"    },\n"}
            {"    …\n"}
            {"  ],\n"}
            {'  "page": '}<span className="text-[#ffb19b]">1</span>{', "per_page": '}<span className="text-[#ffb19b]">20</span>{', "total": '}<span className="text-[#ffb19b]">931</span>{"\n"}
            {"}"}
          </pre>
        </Mockup>
      </Card>
    </div>
  );
}

const PARTS = [
  { text: "/rest/v1/orders", note: "the table" },
  { text: "?filter[status]=eq.paid", note: "a filter" },
  { text: "&expand=customer", note: "a relation" },
  { text: "&sort=-created_at", note: "the order" },
  { text: "&page=2&per_page=20", note: "the page" },
];

function QueryAnatomy() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="mx-auto flex w-max items-start gap-1 font-[PP_Neue_Montreal,sans-serif] text-[clamp(13px,1.35vw,17px)]">
        <span className="pt-0 text-[#6fd3a2]">GET&nbsp;</span>
        {PARTS.map((part, i) => (
          <span key={part.text} className="flex flex-col items-center gap-3">
            <span className={i === 0 ? "text-text" : "text-muted"}>{part.text}</span>
            <span className="h-3 w-full border-x border-b border-white/15" />
            <span className="font-sans text-[13px] text-faint">{part.note}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Explorer() {
  return (
    <Card className="p-3">
      <Mockup label="The API Explorer sending a request to the orders endpoint and showing a 200 response" className="sx-window block">
        <div className="flex items-center gap-2 border-b border-[var(--sx-line)] p-3">
          <span className="sx-btn sx-mono text-[var(--sx-ok)]">GET</span>
          <span className="sx-input sx-mono flex-1 text-[12px]">/rest/v1/orders?filter[status]=eq.pending</span>
          <span className="sx-btn sx-btn-primary">Send</span>
        </div>
        <div className="flex items-center gap-4 border-b border-[var(--sx-line)] px-4 py-2.5 text-[12px] text-[var(--sx-muted)]">
          <span className="flex items-center gap-2"><span className="sx-dot bg-[var(--sx-ok)]" />200 OK</span>
          <span className="sx-num">38 ms</span>
          <span>as Ada Nwosu · customer</span>
        </div>
        <pre className="sx-mono px-4 py-3 text-[12px] leading-[1.75] text-[var(--sx-muted)]">
          {'{ "data": [ { "id": "01JD7…28b", "total": 1120.00,\n            "status": "pending" } ],\n  "page": 1, "per_page": 20, "total": 1 }'}
        </pre>
      </Mockup>
    </Card>
  );
}

function FanOut() {
  const ys = [40, 100, 160, 220, 280];
  return (
    <Figure width={760} height={320} label="One table fans out into list, read, create, update and delete endpoints, plus generated documentation" className="h-auto w-full min-w-[560px]">
      <rect x={20} y={110} width={180} height={100} rx={12} style={{ stroke: "rgba(255,255,255,0.35)" }} />
      <text x={110} y={156} textAnchor="middle" fontSize="15" fontFamily="PP Neue Montreal, sans-serif" fill="#ededed">orders</text>
      <text x={110} y={178} textAnchor="middle" fontSize="11" fill="#74767c">6 columns</text>
      {ys.map((y, i) => (
        <g key={y}>
          <path className="hl-line" d={`M200 160 C300 160 300 ${y} 420 ${y}`} style={{ stroke: i === 0 ? "rgba(255,112,73,0.8)" : "rgba(255,255,255,0.14)" }} />
          <rect x={420} y={y - 18} width={300} height={36} rx={8} style={{ stroke: "rgba(255,255,255,0.14)" }} />
          <text x={436} y={y + 4} fontSize="12" fill={i === 0 ? "#ededed" : "#a1a3a8"}>
            {["list", "read", "create", "update", "delete"][i]}
          </text>
          <text x={704} y={y + 4} textAnchor="end" fontSize="11" fill="#74767c">
            {["GET", "GET", "POST", "PATCH", "DELETE"][i]}
          </text>
        </g>
      ))}
    </Figure>
  );
}

export default function DataApiPage() {
  return (
    <ProductShell title="Data API" description="Every table gets a secure REST API with filters, relations, sorting, pages and generated docs.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(64px,8vw,112px)]" backdrop={<>{backdrop.rings("50%", "0%")}{backdrop.glow("50%", "0%", "1000px", "460px")}</>}>
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
          <ProductName icon="document" name="Data API" />
          <Display quiet="The moment you create it.">Every table is an API.</Display>
          <p className="max-w-[46ch] text-[16px] leading-[1.65] text-muted">
            No controllers, no routes, no serializers. Create a table and get
            secure endpoints for it, documented and ready for your app.
          </p>
          <HeroActions />
        </div>
        <div className="mx-auto mt-14 max-w-[1080px]">
          <RequestResponse />
        </div>
      </Band>

      <Band labelledBy="api-anatomy" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="api-anatomy" center title="Ask for exactly what you need." quiet="In the URL.">
          Filter, follow relations, sort and page in one readable request.
        </Copy>
        <div className="mt-14">
          <QueryAnatomy />
        </div>
      </Band>

      <Band labelledBy="api-explorer" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.dots("80%", "50%")}>
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="api-explorer" title="Try it before you code it." quiet="As any user.">
              The API Explorer sends real requests from the dashboard, so you
              can see what a customer, an admin or a visitor would get back.
            </Copy>
          }
          visual={<Explorer />}
        />
      </Band>

      <Band labelledBy="api-fan" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          copy={
            <Copy id="api-fan" title="One table, five endpoints." quiet="And the docs to match.">
              List, read, create, update and delete come with every table, and
              the reference documentation writes itself as your schema changes.
            </Copy>
          }
          visual={
            <Card className="overflow-x-auto px-6 py-8">
              <FanOut />
            </Card>
          }
        />
      </Band>

      <Band labelledBy="api-points" className="py-[clamp(64px,8vw,104px)]">
        <h2 id="api-points" className="sr-only">Built into every endpoint</h2>
        <Points
          items={[
            { icon: "policies", title: "Your rules, every time", copy: "Each request runs through the access rules for the person making it." },
            { icon: "document", title: "Pages built in", copy: "Results come back in pages, with the total when it's known." },
            { icon: "code", title: "Typed client", copy: "Generate types from your schema and catch mistakes before you ship." },
          ]}
        />
      </Band>

      <Band labelledBy="api-code" className="py-[clamp(72px,9vw,120px)]">
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="api-code" title="Typos caught early." quiet="Columns checked as you type.">
              With generated types, your editor knows every table and column,
              and flags a missing field before it ever reaches the server.
            </Copy>
          }
          visual={
            <CodeCard
              file="client.ts"
              label="A typed client that knows the posts table and rejects a missing title"
              lines={[
                'import { createClient } from "@pawabase/client";',
                'import type { Database } from "./pawabase.types";',
                "",
                "const pawabase = createClient<Database>({ url, apiKey });",
                "",
                'await pawabase.from("posts").create({ title: "Hello" });',
                'await pawabase.from("posts").create({ views: 3 });',
              ]}
            />
          }
        />
      </Band>

      <ProductCta
        title="Skip the boilerplate."
        quiet="Keep the control."
        next={{ label: "Next: Authentication", href: "/products/authentication" }}
        backdrop={backdrop.grid("100%")}
      />
    </ProductShell>
  );
}
