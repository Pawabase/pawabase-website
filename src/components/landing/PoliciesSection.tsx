import type { CSSProperties } from "react";

import { Figure } from "./hairline/Hairline";
import { Contours } from "./Backdrops";
import { Band, Card, Lead, Ledger, TextLink, Title } from "./Section";
import { useInView, useLiveTick } from "./studio/Studio";

const GATE = { x: 440, y: 56, w: 240, h: 328 };
const ROWS = [
  { id: 1042, owner: "Ada" },
  { id: 1041, owner: "Kwame" },
  { id: 1040, owner: "Ada" },
  { id: 1039, owner: "Priya" },
  { id: 1038, owner: "Sofia" },
].map((row, i) => ({ ...row, y: 115 + i * 50 }));

const CALLERS = [
  { name: "Ada Nwosu", role: "customer · owns 2 orders", y: 90, port: 160, sees: ROWS.filter((r) => r.owner === "Ada"), result: "2 of 5 orders" },
  { name: "Marcus Chen", role: "admin", y: 220, port: 220, sees: ROWS, result: "5 of 5 orders" },
  { name: "Anonymous", role: "signed out", y: 350, port: 280, sees: [] as typeof ROWS, result: "refused" },
];

const inPath = (y: number, port: number) =>
  `M250 ${y} C350 ${y} 340 ${port} ${GATE.x} ${port}`;
const outCurve = (port: number, y: number) =>
  `C${GATE.x + GATE.w + 90} ${port} 770 ${y} 860 ${y}`;
const outPath = (port: number, y: number) =>
  `M${GATE.x + GATE.w} ${port} ${outCurve(port, y)}`;

/** The whole trip: in to the policy, through it, and out to the first record it allows. */
const tripPath = (c: (typeof CALLERS)[number]) =>
  inPath(c.y, c.port) +
  (c.sees.length ? ` L${GATE.x + GATE.w} ${c.port} ${outCurve(c.port, c.sees[0].y)}` : "");

export function AccessFigure() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 3600);
  const active = tick % CALLERS.length;
  const caller = CALLERS[active];

  return (
    <div ref={ref} className="flex justify-center">
      <Figure
        width={1100}
        height={440}
        label="Three people ask for orders through one policy: Ada, a customer, gets her own two orders; Marcus, an admin, gets all five; an anonymous visitor is refused"
        className="h-auto w-full min-w-[760px] max-w-[1180px]"
      >
        {/* callers */}
        {CALLERS.map((c, i) => {
          const lit = i === active;
          return (
            <g key={c.name}>
              <rect
                x={40}
                y={c.y - 28}
                width={210}
                height={56}
                rx={8}
                style={{ stroke: lit ? "var(--hl-hi)" : "var(--hl-edge)" }}
              />
              <circle
                cx={70}
                cy={c.y}
                r={14}
                style={{ stroke: lit ? "var(--hl-brand)" : "var(--hl-mid)" }}
              />
              <text x={70} y={c.y + 4} textAnchor="middle" fontSize="10" fill={lit ? "#ededed" : "#74767c"}>
                {c.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
              </text>
              <text x={96} y={c.y - 3} fontSize="13" fontFamily="Geist, sans-serif" fill={lit ? "#ededed" : "#a1a3a8"}>
                {c.name}
              </text>
              <text x={96} y={c.y + 14} fontSize="10.5" fill="#74767c">
                {c.role}
              </text>
              <path
                className="hl-line"
                d={inPath(c.y, c.port)}
                style={{ stroke: lit ? "var(--hl-brand)" : "var(--hl-lo)" }}
              />
            </g>
          );
        })}

        {/* the policy */}
        <rect x={GATE.x} y={GATE.y} width={GATE.w} height={GATE.h} rx={12} style={{ stroke: "var(--hl-edge)" }} />
        <line className="hl-line" x1={GATE.x} x2={GATE.x + GATE.w} y1={GATE.y + 44} y2={GATE.y + 44} />
        <text x={GATE.x + 18} y={GATE.y + 27} fontSize="12" fontFamily="Geist, sans-serif" fill="#ededed">
          Owners manage their orders
        </text>
        <text x={GATE.x + 18} y={GATE.y + 76} fontSize="10.5" fill="#74767c">allow list, read, update when</text>
        <rect x={GATE.x + 16} y={GATE.y + 92} width={GATE.w - 32} height={30} rx={6} style={{ stroke: active === 0 ? "var(--hl-brand)" : "var(--hl-mid)" }} />
        <text x={GATE.x + 28} y={GATE.y + 111} fontSize="11" fill="#c9bfff">owns the record · owner_id</text>
        <text x={GATE.x + 28} y={GATE.y + 146} fontSize="10.5" fill="#74767c">or</text>
        <rect x={GATE.x + 16} y={GATE.y + 160} width={GATE.w - 32} height={30} rx={6} style={{ stroke: active === 1 ? "var(--hl-brand)" : "var(--hl-mid)" }} />
        <text x={GATE.x + 28} y={GATE.y + 179} fontSize="11" fill="#c9bfff">has role · admin</text>
        <line className="hl-line" x1={GATE.x} x2={GATE.x + GATE.w} y1={GATE.y + 222} y2={GATE.y + 222} style={{ stroke: "var(--hl-lo)" }} />
        <text x={GATE.x + 18} y={GATE.y + 250} fontSize="10.5" fill="#74767c">applies to</text>
        <text x={GATE.x + 18} y={GATE.y + 270} fontSize="11" fill="#a1a3a8">REST API · files · realtime</text>
        <text x={GATE.x + 18} y={GATE.y + 304} fontSize="10.5" fill={active === 2 ? "#ff7049" : "#74767c"}>
          {active === 2 ? "no rule matched · refused" : "checked on every request"}
        </text>

        {/* what each caller gets */}
        {CALLERS.flatMap((c, i) =>
          c.sees.map((row) => (
            <path
              key={`${c.name}${row.id}`}
              className="hl-line"
              d={outPath(c.port, row.y)}
              style={{
                stroke: i === active ? "var(--hl-brand)" : "var(--hl-lo)",
                opacity: i === active ? 1 : 0.6,
              }}
            />
          )),
        )}

        {ROWS.map((row) => {
          const lit = caller.sees.includes(row);
          return (
            <g key={row.id}>
              <rect x={860} y={row.y - 18} width={200} height={36} rx={6} style={{ stroke: lit ? "var(--hl-hi)" : "var(--hl-lo)" }} />
              <text x={876} y={row.y + 4} fontSize="11" fill={lit ? "#ededed" : "#4a4c52"}>
                {row.id}
              </text>
              <text x={924} y={row.y + 4} fontSize="12" fontFamily="Geist, sans-serif" fill={lit ? "#a1a3a8" : "#4a4c52"}>
                {row.owner}
              </text>
            </g>
          );
        })}
        <text x={860} y={78} fontSize="10.5" fill="#74767c">orders</text>
        <text key={`r${tick}`} x={1060} y={78} fontSize="10.5" textAnchor="end" fill={active === 2 ? "#ff7049" : "#a1a3a8"}>
          {caller.result}
        </text>

        {active === 2 ? (
          <g style={{ stroke: "var(--hl-brand)" }}>
            <line x1={GATE.x - 22} y1={caller.port - 7} x2={GATE.x - 8} y2={caller.port + 7} style={{ stroke: "var(--hl-brand)" }} />
            <line x1={GATE.x - 8} y1={caller.port - 7} x2={GATE.x - 22} y2={caller.port + 7} style={{ stroke: "var(--hl-brand)" }} />
          </g>
        ) : null}

        {/* the request itself, travelling */}
        <circle
          key={`d${tick}`}
          r={3.5}
          className="hl-travel"
          style={
            {
              fill: "var(--hl-brand)",
              stroke: "none",
              "--path": `path("${tripPath(caller)}")`,
              "--dur": "2.6s",
            } as CSSProperties
          }
        />
      </Figure>
    </div>
  );
}

export function PoliciesSection() {
  return (
    <Band
      id="policies"
      labelledBy="policies-title"
      className="py-[clamp(80px,10vw,136px)]"
      backdrop={
        <Contours
          flip
          className="opacity-[0.1] [mask-image:radial-gradient(ellipse_60%_70%_at_80%_20%,black,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_60%_70%_at_80%_20%,black,transparent_75%)]"
        />
      }
    >
      <div className="relative grid gap-10 min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1000px]:gap-16">
        <div className="flex flex-col gap-6">
          <Title id="policies-title" quiet="Their data stays theirs.">
            Safe by default.
          </Title>
          <Lead className="max-w-[40ch]">
            Write who can see and change what, once. Pawabase enforces it on
            every request, every file and every live channel, so a new feature
            never ships with a hole in it.
          </Lead>
          <TextLink href="https://docs.sillo.build">Write your first rule</TextLink>
        </div>
        <Ledger
          className="self-end"
          items={[
            { title: "Per action", copy: "Reading and deleting can follow different rules." },
            { title: "Built on identity", copy: "Rules know the user, their role and their team." },
            { title: "One rule, every door", copy: "API, files and realtime all check the same rule." },
            { title: "A firewall too", copy: "Trial a block before you enforce it." },
          ]}
        />
      </div>

      <Card className="mt-[clamp(48px,6vw,72px)] px-4 py-[clamp(32px,4vw,56px)]">
        <AccessFigure />
      </Card>
    </Band>
  );
}
