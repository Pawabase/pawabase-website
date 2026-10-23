import type { CSSProperties } from "react";

import { backdrop } from "./Backdrops";
import { Figure } from "./hairline/Hairline";
import { Band, Card, Lead, TextLink, Title } from "./Section";

/**
 * The release track: three lanes, one per environment. Each release drops
 * from development to staging to production; the newest is on its way down,
 * the one before it waits behind a dashed rollback arc, and snapshots tick
 * along under production every night.
 */
const LANES = [
  { name: "Development", y: 70 },
  { name: "Staging", y: 160 },
  { name: "Production", y: 250 },
];
const X0 = 170;
const X1 = 1040;
const RELEASES = [
  { n: 12, x: 250 },
  { n: 13, x: 440 },
  { n: 14, x: 630 },
  { n: 15, x: 820, devOnly: true },
];
const STEP = 70;

const drop = (x: number) =>
  `M${x} 70 C${x + 30} 70 ${x + STEP - 30} 160 ${x + STEP} 160 C${x + STEP + 30} 160 ${x + 2 * STEP - 30} 250 ${x + 2 * STEP} 250`;

export function ReleaseTrack() {
  const live = RELEASES[2];
  const previous = RELEASES[1];
  const liveX = live.x + 2 * STEP;
  const prevX = previous.x + 2 * STEP;

  return (
    <Figure
      width={1080}
      height={340}
      label="Releases flow from development to staging to production. Release 14 is going live in production, release 13 stays one step away as a rollback, release 15 is still in development, and production takes a snapshot every night"
      className="h-auto w-full min-w-[720px]"
    >
      {LANES.map((lane) => (
        <g key={lane.name}>
          <text x={0} y={lane.y + 4} fontSize="13" fontFamily="Geist, sans-serif" fill="#a1a3a8">
            {lane.name}
          </text>
          <line x1={X0} x2={X1} y1={lane.y} y2={lane.y} style={{ stroke: "rgba(255,255,255,0.08)" }} />
        </g>
      ))}

      {RELEASES.map((r) =>
        r.devOnly ? null : (
          <path
            key={r.n}
            className="hl-line"
            d={drop(r.x)}
            style={{ stroke: r === live ? "rgba(255,112,73,0.7)" : "rgba(255,255,255,0.16)" }}
          />
        ),
      )}

      {/* rollback: the previous release, one step back */}
      <path
        className="hl-line"
        d={`M${liveX} 262 C${liveX - 40} 300 ${prevX + 40} 300 ${prevX} 262`}
        style={{ stroke: "rgba(255,255,255,0.28)", strokeDasharray: "3 5" }}
      />
      <text x={(liveX + prevX) / 2} y={312} textAnchor="middle" fontSize="11" fill="#74767c">
        roll back in one click
      </text>

      {/* nightly snapshots under production */}
      {Array.from({ length: 13 }, (_, i) => X0 + 30 + i * 66).map((x) => (
        <line key={x} x1={x} x2={x} y1={276} y2={284} style={{ stroke: "rgba(255,255,255,0.12)" }} />
      ))}
      <text x={X1} y={300} textAnchor="end" fontSize="11" fill="#74767c">
        nightly snapshots
      </text>

      {RELEASES.map((r) => {
        const stops = r.devOnly ? [[r.x, 70]] : [[r.x, 70], [r.x + STEP, 160], [r.x + 2 * STEP, 250]];
        const isLive = r === live;
        return stops.map(([x, y], i) => {
          const lit = isLive && i === 2;
          return (
            <g key={`${r.n}-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={lit ? 7 : 5.5}
                style={{
                  fill: "var(--hl-plate)",
                  stroke: lit ? "#ff7049" : isLive ? "rgba(255,112,73,0.7)" : "rgba(255,255,255,0.35)",
                }}
              />
              {lit ? <circle cx={x} cy={y} r={2.5} style={{ fill: "#ff7049", stroke: "none" }} /> : null}
              <text x={x} y={y - 14} textAnchor="middle" fontSize="11" fill={isLive ? "#ededed" : "#74767c"}>
                #{r.n}
              </text>
            </g>
          );
        });
      })}

      <text x={liveX + 16} y={254} fontSize="11" fill="#ff7049">
        live
      </text>
      <text x={prevX - 16} y={254} textAnchor="end" fontSize="11" fill="#74767c">
        previous
      </text>

      {/* the newest release, travelling down to production */}
      <circle
        r={3.5}
        className="hl-travel"
        style={
          {
            fill: "#ff7049",
            stroke: "none",
            "--path": `path("${drop(live.x)}")`,
            "--dur": "3.6s",
          } as CSSProperties
        }
      />
    </Figure>
  );
}

const POINTS = [
  { title: "Separate environments", copy: "Development, staging and production, each with its own keys and data." },
  { title: "One-click rollback", copy: "The last good release is always a click away." },
  { title: "Snapshots and alarms", copy: "Nightly backups, and an email before your users notice a problem." },
];

export function OperateSection() {
  return (
    <Band
      id="operate"
      labelledBy="operate-title"
      className="py-[clamp(80px,10vw,140px)]"
      backdrop={backdrop.lines("50%", "65%")}
    >
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
        <Title id="operate-title" quiet="Even on launch day.">
          Calm in production.
        </Title>
        <Lead className="max-w-[46ch]">
          Every change moves through staging before it reaches your users,
          and the last good version is never more than a click away.
        </Lead>
        <TextLink href="https://docs.sillo.build">Run it in production</TextLink>
      </div>

      <Card className="mx-auto mt-[clamp(48px,6vw,72px)] max-w-[1120px] overflow-x-auto px-6 py-10 min-[768px]:px-12 min-[768px]:py-14">
        <ReleaseTrack />
      </Card>

      <ul className="mx-auto mt-12 grid max-w-[1120px] gap-8 min-[760px]:grid-cols-3 min-[760px]:gap-12">
        {POINTS.map((point) => (
          <li key={point.title} className="flex flex-col gap-1.5">
            <span className="text-[15.5px] font-medium tracking-[-0.02em] text-text">{point.title}</span>
            <span className="text-[14px] leading-[1.6] tracking-[-0.01em] text-muted">{point.copy}</span>
          </li>
        ))}
      </ul>
    </Band>
  );
}
