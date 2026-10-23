import { SiPostgresql } from "@icons-pack/react-simple-icons";

import { Icon } from "@/components/Icon";
import { backdrop, Orbits } from "@/components/landing/Backdrops";
import { Box, Callout, Figure, projector } from "@/components/landing/hairline/Hairline";
import { Band, Card } from "@/components/landing/Section";
import { Mockup } from "@/components/landing/studio/Studio";
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

const COLUMNS = [
  ["id", "uuid", "primary key"],
  ["customer_id", "→ customers", "required"],
  ["total", "decimal(10,2)", ""],
  ["status", "paid · pending · refunded", "default pending"],
  ["notes", "text", "optional"],
  ["created_at", "timestamp", "default now()"],
];

function ColumnsEditor() {
  return (
    <Card className="p-3">
      <Mockup label="The orders table's columns in Pawabase: id, customer, total, status, notes and created_at, each with its type" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="flex items-center gap-3">
            <span className="text-[15px] font-semibold">orders</span>
            <span className="sx-tabs !gap-4 !border-0">
              <span>Rows</span>
              <span data-on="">Columns</span>
              <span>Indexes</span>
            </span>
          </span>
          <span className="sx-btn sx-btn-primary">
            <Icon name="add" size={13} />
            Add column
          </span>
        </div>
        {COLUMNS.map(([name, type, flag], i) => (
          <div
            key={name}
            className="grid h-[46px] grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.8fr)] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0"
            style={i === 4 ? { background: "var(--sx-brand-soft)" } : undefined}
          >
            <span className="sx-mono">{name}</span>
            <span className="truncate text-[var(--sx-muted)]">{type}</span>
            <span className="truncate text-right text-[var(--sx-faint)]">{i === 4 ? "just added" : flag}</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

const P = projector(330, 70, 2.6);

function SchemaFigure() {
  const top = (x: number, y: number, h: number) => P(x, y, h);
  return (
    <Figure
      width={720}
      height={400}
      label="Three related tables: customers, orders and products, joined by their keys"
      className="mx-auto h-auto w-full max-w-[760px]"
    >
      <Box P={P} x={0} y={0} w={130} d={110} h={2} tone="lo" />
      <Box P={P} x={12} y={14} z={2} w={36} d={30} h={18} lid />
      <Box P={P} x={70} y={30} z={2} w={44} d={36} h={28} tone="hi" lid />
      <Box P={P} x={20} y={66} z={2} w={36} d={30} h={14} lid />
      <polyline className="hl-line hl-flow" points={`${top(30, 29, 20).join(",")} ${top(92, 48, 30).join(",")}`} style={{ stroke: "rgba(255,112,73,0.8)" }} />
      <polyline className="hl-line hl-flow" points={`${top(38, 81, 16).join(",")} ${top(92, 48, 30).join(",")}`} style={{ stroke: "rgba(255,112,73,0.8)" }} />
      <Callout at={top(30, 29, 20)} to={[top(30, 29, 20)[0] - 80, top(30, 29, 20)[1] - 40]} align="end">customers · 906 rows</Callout>
      <Callout at={top(92, 48, 30)} to={[top(92, 48, 30)[0] + 40, top(92, 48, 30)[1] - 60]} lit>orders · customer_id, product_id</Callout>
      <Callout at={top(38, 81, 16)} to={[top(38, 81, 16)[0] - 60, top(38, 81, 16)[1] + 70]} align="end">products · 214 rows</Callout>
    </Figure>
  );
}

function SqlEditor() {
  return (
    <Card className="p-3">
      <Mockup label="A SQL query counting paid orders per customer, with its results" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3 text-[12.5px]">
          <span className="font-semibold">Top customers</span>
          <span className="sx-btn sx-btn-primary">Run</span>
        </div>
        <pre className="sx-mono border-b border-[var(--sx-line)] px-5 py-4 text-[12.5px] leading-[1.8] text-[var(--sx-muted)]">
          <span className="text-[#ff9a7c]">select</span> c.name, <span className="text-[#ff9a7c]">count</span>(*) <span className="text-[#ff9a7c]">as</span> orders, <span className="text-[#ff9a7c]">sum</span>(o.total){"\n"}
          <span className="text-[#ff9a7c]">from</span> orders o <span className="text-[#ff9a7c]">join</span> customers c <span className="text-[#ff9a7c]">on</span> c.id = o.customer_id{"\n"}
          <span className="text-[#ff9a7c]">where</span> o.status = <span className="text-[#c9bfff]">'paid'</span>{"\n"}
          <span className="text-[#ff9a7c]">group by</span> c.name <span className="text-[#ff9a7c]">order by</span> 3 <span className="text-[#ff9a7c]">desc limit</span> 4;
        </pre>
        {[
          ["Priya Raman", "14", "4,920.00"],
          ["Amara Okafor", "11", "3,188.50"],
          ["Yuki Tanaka", "9", "2,730.25"],
          ["Kwame Mensah", "8", "1,604.90"],
        ].map(([name, count, sum]) => (
          <div key={name} className="grid h-[40px] grid-cols-[minmax(0,1.4fr)_80px_110px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
            <span>{name}</span>
            <span className="sx-num text-right text-[var(--sx-muted)]">{count}</span>
            <span className="sx-num text-right">{sum}</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

export default function DatabasePage() {
  return (
    <ProductShell title="Database" description="Tables you can see and shape, on Postgres, with an API from the moment you create them.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]" backdrop={<>{backdrop.grid()}{backdrop.glow("70%", "20%", "900px", "520px")}</>}>
        <Split
          ratio="wide-visual"
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="database" name="Database" />
              <Display quiet="Shaped in minutes.">Your data, in tables.</Display>
              <p className="max-w-[40ch] text-[16px] leading-[1.65] text-muted">
                Create tables, add columns and link records without a migration
                file in sight. The moment a table exists, your app can use it.
              </p>
              <HeroActions />
            </div>
          }
          visual={<ColumnsEditor />}
        />
      </Band>

      <Band labelledBy="db-schema" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="db-schema" center title="Relations that read like a sentence." quiet="Orders belong to customers.">
          Link tables once and fetch an order with its customer in a single
          request. No joins to hand-write for everyday screens.
        </Copy>
        <Card className="mt-12 px-4 py-10">
          <SchemaFigure />
        </Card>
      </Band>

      <Band labelledBy="db-points" className="py-[clamp(64px,8vw,104px)]" backdrop={backdrop.hatch("12%", "60%")}>
        <h2 id="db-points" className="sr-only">What comes with every table</h2>
        <Points
          columns={4}
          items={[
            { icon: "database", title: "Relations", copy: "Link records and expand them in one request." },
            { icon: "search", title: "Indexes", copy: "Make the queries you run most stay quick." },
            { icon: "document", title: "CSV import", copy: "Bring an existing spreadsheet in with a guided import." },
            { icon: "refresh", title: "Backups", copy: "Nightly snapshots you can restore from the dashboard." },
          ]}
        />
      </Band>

      <Band labelledBy="db-sql" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="db-sql" title="SQL, when you want it." quiet="Never when you don't." link={{ label: "Query with SQL" }}>
              The dashboard handles the everyday. For reports and one-off
              questions, write a query and get the answer right next to it.
            </Copy>
          }
          visual={<SqlEditor />}
        />
      </Band>

      <Band labelledBy="db-engines" className="py-[clamp(88px,10vw,140px)]" backdrop={<Orbits />}>
        <Copy id="db-engines" center title="Your database." quiet="Not a black box.">
          Pawabase runs on PostgreSQL. Your data stays in a real
          database you can open with the tools you already use.
        </Copy>
        <div className="mx-auto mt-14 flex max-w-[640px] items-center justify-center gap-[clamp(40px,8vw,96px)]">
          {[{ name: "Postgres", Mark: SiPostgresql }].map(({ name, Mark }) => (
            <span key={name} className="group flex flex-col items-center gap-3">
              <Mark size={44} aria-hidden="true" className="text-white/40 transition-colors duration-200 group-hover:text-text" />
              <span className="text-[14px] text-muted">{name}</span>
            </span>
          ))}
        </div>
      </Band>

      <Band labelledBy="db-code" className="py-[clamp(72px,9vw,120px)]">
        <Split
          copy={
            <Copy id="db-code" title="Read it from anywhere." quiet="In a line or two." link={{ label: "See the Data API", href: "/products/data-api" }}>
              Every table answers through the same client in your browser, on
              your server or in a mobile app, with your access rules applied.
            </Copy>
          }
          visual={
            <CodeCard
              file="orders.ts"
              label="Reading paid orders with their customer from a TypeScript client"
              lines={[
                "const { data, total } = await pawabase",
                '  .from("orders")',
                '  .eq("status", "paid")',
                '  .expand("customer")',
                '  .order("created_at", "desc")',
                "  .perPage(20);",
              ]}
            />
          }
        />
      </Band>

      <ProductCta
        title="Start with a table."
        quiet="The rest follows."
        next={{ label: "Next: the Data API", href: "/products/data-api" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
