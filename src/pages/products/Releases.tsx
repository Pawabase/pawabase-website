import { useState } from "react";

import { Icon } from "@/components/Icon";
import { backdrop } from "@/components/landing/Backdrops";
import { ReleaseTrack } from "@/components/landing/OperateSection";
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

const ENVS = [
  { name: "Development", tone: "var(--sx-faint)", key: "pb_pk_dev_4f…", data: "Sample data", release: "Release 15" },
  { name: "Staging", tone: "var(--sx-warn)", key: "pb_pk_stg_9a…", data: "A copy to test against", release: "Release 14" },
  { name: "Production", tone: "var(--sx-ok)", key: "pb_pk_prd_2c…", data: "Your customers' data", release: "Release 14" },
];

function Environments() {
  return (
    <div className="grid gap-4 min-[860px]:grid-cols-3">
      {ENVS.map((env) => (
        <Card key={env.name} className="p-7">
          <Mockup label={`${env.name}: ${env.release}, with its own key and data`} className="block">
            <span className="flex items-center gap-2 text-[14px] font-medium">
              <span className="sx-dot" style={{ background: env.tone }} />
              {env.name}
            </span>
            <div className="mt-6 text-[22px] font-medium tracking-[-0.03em]">{env.release}</div>
            <div className="mt-1 text-[13px] text-[var(--sx-muted)]">{env.data}</div>
            <div className="sx-input sx-mono mt-6 h-[34px] justify-between text-[12px] text-[var(--sx-muted)]">
              {env.key}
              <Icon name="copy" size={13} />
            </div>
          </Mockup>
        </Card>
      ))}
    </div>
  );
}

function ReleasesTable() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2600);
  const phase = tick % 3;
  const s14 = ["Ready", "Activating", "Live"][phase];
  const s13 = phase === 2 ? "Previous" : "Live";
  const tone = (s: string) => (s === "Live" ? "var(--sx-ok)" : s === "Activating" ? "var(--sx-brand)" : s === "Ready" ? "var(--sx-warn)" : "var(--sx-faint)");
  const rows = [
    { n: 14, changes: "orders.notes column · refund rule · 3 flows", status: s14, action: s14 === "Live" ? "" : "Activate" },
    { n: 13, changes: "receipt template · stock.reserve", status: s13, action: s13 === "Previous" ? "Roll back" : "" },
    { n: 12, changes: "team invitations · password policy", status: "Previous", action: "" },
  ];

  return (
    <div ref={ref}>
      <Card className="p-3">
        <Mockup label="Production releases: release 14 activates and goes live while release 13 stays ready to roll back to" className="sx-window block">
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
            <span className="text-[14px] font-semibold">Releases · production</span>
            <span className="sx-btn sx-btn-primary">Prepare release</span>
          </div>
          {rows.map((row) => (
            <div key={row.n} className="grid h-[54px] grid-cols-[52px_minmax(0,1fr)_110px_92px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0 max-[640px]:grid-cols-[44px_minmax(0,1fr)_100px]">
              <span className="sx-mono">#{row.n}</span>
              <span className="truncate pr-4 text-[var(--sx-muted)]">{row.changes}</span>
              <span key={row.status} className="sx-swap flex items-center gap-2 text-[var(--sx-muted)]">
                <span className="sx-dot" style={{ background: tone(row.status) }} />
                {row.status}
              </span>
              <span className="text-right max-[640px]:hidden">
                {row.action ? <span className="sx-btn h-[26px] px-2 text-[11.5px]">{row.action}</span> : null}
              </span>
            </div>
          ))}
        </Mockup>
      </Card>
    </div>
  );
}

function Snapshots() {
  const [picked, setPicked] = useState(21);

  return (
    <Card className="p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-[15px] font-medium text-text">October snapshots</span>
        <span className="text-[13px] text-muted">
          Oct {picked + 1}, 02:00 · <span className="text-text">Restore</span>
        </span>
      </div>
      <div className="mt-6 grid grid-cols-10 gap-2 min-[640px]:grid-cols-[repeat(15,minmax(0,1fr))]">
        {Array.from({ length: 30 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPicked(i)}
            aria-label={`Snapshot from October ${i + 1}`}
            aria-pressed={picked === i}
            className="aspect-square cursor-pointer rounded-[6px] transition-colors duration-200 hover:bg-white/20 disabled:cursor-default disabled:hover:bg-transparent"
            style={{
              background: picked === i ? "#ff7049" : i > 21 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.09)",
              outline: i > 21 ? "1px dashed rgba(255,255,255,0.12)" : "none",
            }}
            disabled={i > 21}
          />
        ))}
      </div>
      <p className="mt-4 text-[12.5px] text-faint">Pick a night to restore from.</p>
    </Card>
  );
}

export default function ReleasesPage() {
  return (
    <ProductShell title="Releases" description="Development, staging and production with their own keys, releases you can roll back, and nightly snapshots.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(64px,8vw,112px)]" backdrop={<>{backdrop.lines("50%", "70%")}{backdrop.glow("50%", "75%", "1100px", "520px")}</>}>
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
          <ProductName icon="refresh" name="Releases" />
          <Display quiet="Even on launch day.">Calm in production.</Display>
          <p className="max-w-[46ch] text-[16px] leading-[1.65] text-muted">
            Every change moves through staging before it reaches your users,
            and the last good version is always a click away.
          </p>
          <HeroActions />
        </div>
        <Card className="mx-auto mt-14 max-w-[1120px] overflow-x-auto px-6 py-10 min-[768px]:px-12">
          <ReleaseTrack />
        </Card>
      </Band>

      <Band labelledBy="rel-envs" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="rel-envs" center title="Three places to work." quiet="Never mixed up.">
          Each environment has its own keys and its own data, so a test run
          can't touch a real customer.
        </Copy>
        <div className="mt-12">
          <Environments />
        </div>
      </Band>

      <Band labelledBy="rel-table" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.dots("80%", "50%")}>
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="rel-table" title="Ship on purpose." quiet="Undo in a click.">
              Bundle schema, rules and flows into a release, activate it
              when you're ready, and roll back if something looks off.
            </Copy>
          }
          visual={<ReleasesTable />}
        />
      </Band>

      <Band labelledBy="rel-snapshots" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          copy={
            <Copy id="rel-snapshots" title="Last night, on file." quiet="Every night.">
              Snapshots run on a schedule. If you ever need yesterday back,
              pick the night and restore it.
            </Copy>
          }
          visual={<Snapshots />}
        />
      </Band>

      <Band labelledBy="rel-domain" className="py-[clamp(88px,10vw,140px)]" backdrop={backdrop.hatch("50%", "50%")}>
        <h2 id="rel-domain" className="text-center text-[15px] text-faint">Your API, on your domain</h2>
        <p className="mt-6 text-center font-[PP_Neue_Montreal,sans-serif] text-[clamp(24px,3.6vw,48px)] tracking-[-0.03em] text-text">
          api.northwind.com <span className="text-muted">→ production</span>
        </p>
      </Band>

      <Band labelledBy="rel-points" className="py-[clamp(64px,8vw,104px)]">
        <h2 id="rel-points" className="sr-only">What keeps production calm</h2>
        <Points
          columns={4}
          items={[
            { icon: "apiSecurity", title: "Separate keys", copy: "A key for each environment, rotated when you need." },
            { icon: "refresh", title: "Rollback", copy: "The previous release stays one click away." },
            { icon: "storage", title: "Snapshots", copy: "Nightly backups, restored from the dashboard." },
            { icon: "activity", title: "Alarms", copy: "An email when error rates climb, plus a status page." },
          ]}
        />
      </Band>

      <ProductCta
        title="Ship with a net."
        quiet="Every single time."
        next={{ label: "Next: Observability", href: "/products/observability" }}
        backdrop={backdrop.grid("100%")}
      />
    </ProductShell>
  );
}
