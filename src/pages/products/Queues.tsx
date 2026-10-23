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

const JOBS = [
  { name: "reports.monthly", detail: "Northwind · October" },
  { name: "images.resize", detail: "mug.jpg · 3 sizes" },
  { name: "crm.sync", detail: "128 customers" },
  { name: "mail.digest", detail: "906 recipients" },
  { name: "exports.csv", detail: "orders · 2026" },
];

function JobList() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 700);

  return (
    <div ref={ref}>
      <Card className="p-3">
        <Mockup label="A queue of background jobs: some finished, one running with a progress bar, others waiting their turn" className="sx-window block">
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
            <span className="text-[14px] font-semibold">default queue</span>
            <span className="sx-seg"><span data-on="">All</span><span>Running</span><span>Failed</span></span>
          </div>
          {JOBS.map((job, i) => {
            const t = (tick + i * 5) % 20;
            const state = t < 4 ? "Queued" : t < 14 ? "Running" : "Done";
            const progress = state === "Running" ? (t - 4) / 10 : state === "Done" ? 1 : 0;
            const tone = state === "Done" ? "var(--sx-ok)" : state === "Running" ? "var(--sx-brand)" : "var(--sx-faint)";
            return (
              <div key={job.name} className="grid h-[58px] grid-cols-[minmax(0,1fr)_120px] items-center gap-4 border-b border-[var(--sx-line-soft)] px-5 last:border-b-0">
                <span className="min-w-0 leading-[1.35]">
                  <span className="sx-mono block truncate text-[12.5px]">{job.name}</span>
                  <span className="block truncate text-[11.5px] text-[var(--sx-faint)]">{job.detail}</span>
                </span>
                <span className="grid gap-1.5">
                  <span className="flex items-center gap-2 text-[11.5px] text-[var(--sx-muted)]">
                    <span className="sx-dot" style={{ background: tone }} />
                    {state}
                  </span>
                  <span className="h-[3px] rounded-full bg-[var(--sx-line)]">
                    <span className="block h-full rounded-full transition-[width] duration-700" style={{ width: `${progress * 100}%`, background: tone }} />
                  </span>
                </span>
              </div>
            );
          })}
        </Mockup>
      </Card>
    </div>
  );
}

function TwoLanes() {
  return (
    <Figure width={820} height={250} label="The user's request returns in a moment, while the slow work finishes on its own a few seconds later" className="h-auto w-full min-w-[640px]">
      <text x="0" y="74" fontSize="13" fontFamily="Geist, sans-serif" fill="#a1a3a8">Your user</text>
      <text x="0" y="174" fontSize="13" fontFamily="Geist, sans-serif" fill="#a1a3a8">In the background</text>
      <line x1="150" x2="800" y1="70" y2="70" style={{ stroke: "rgba(255,255,255,0.1)" }} />
      <line x1="150" x2="800" y1="170" y2="170" style={{ stroke: "rgba(255,255,255,0.1)" }} />
      <rect x="160" y="56" width="70" height="28" rx="8" style={{ stroke: "#6fd3a2" }} />
      <text x="195" y="74" textAnchor="middle" fontSize="11" fill="#ededed">40 ms</text>
      <text x="250" y="74" fontSize="11" fill="#74767c">"We're on it." · back to shopping</text>
      <path className="hl-line hl-flow" d="M195 84 C195 130 250 170 290 170" style={{ stroke: "rgba(255,112,73,0.7)" }} />
      <rect x="290" y="156" width="460" height="28" rx="8" style={{ stroke: "rgba(255,112,73,0.7)" }} />
      <text x="520" y="174" textAnchor="middle" fontSize="11" fill="#a1a3a8">report built, saved and emailed · 4.2 s</text>
      <circle r="3.5" className="hl-travel" style={{ fill: "#ff7049", stroke: "none", "--path": 'path("M290 170 L750 170")', "--dur": "4s" } as CSSProperties} />
    </Figure>
  );
}

function RetrySettings() {
  return (
    <Card className="p-3">
      <Mockup label="Retry settings for a job: five attempts, waiting longer between each" className="sx-window block p-6">
        <div className="text-[14px] font-semibold">Retries · crm.sync</div>
        <div className="mt-5 grid gap-4 min-[560px]:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-[12px] text-[var(--sx-muted)]">Max attempts</span>
            <span className="sx-input sx-num h-[34px]">5</span>
          </label>
          <label className="grid gap-1.5">
            <span className="text-[12px] text-[var(--sx-muted)]">Backoff</span>
            <span className="sx-seg !h-[34px]"><span>Fixed</span><span data-on="">Growing</span></span>
          </label>
        </div>
        <div className="mt-5 text-[12px] text-[var(--sx-muted)]">Waits before each retry</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["2 s", "8 s", "30 s", "2 min"].map((w) => (
            <span key={w} className="sx-mono rounded-[6px] border border-[var(--sx-line)] px-2.5 py-1 text-[12px] text-[var(--sx-muted)]">{w}</span>
          ))}
        </div>
      </Mockup>
    </Card>
  );
}

function Failed() {
  return (
    <Card className="p-3">
      <Mockup label="Three failed jobs with their errors, and a button to replay them all" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="text-[14px] font-semibold">Failed · 3</span>
          <span className="sx-btn sx-btn-primary">Replay all failed</span>
        </div>
        {[
          ["crm.sync", "CRM returned 503 after 5 attempts"],
          ["images.resize", "File was removed before processing"],
          ["mail.digest", "Template variable missing: name"],
        ].map(([name, error]) => (
          <div key={name} className="flex h-[56px] items-center gap-4 border-b border-[var(--sx-line-soft)] px-5 last:border-b-0">
            <span className="sx-dot bg-[var(--sx-danger)]" />
            <span className="min-w-0 flex-1 leading-[1.35]">
              <span className="sx-mono block text-[12.5px]">{name}</span>
              <span className="block truncate text-[11.5px] text-[var(--sx-faint)]">{error}</span>
            </span>
            <span className="text-[12px] text-[var(--sx-muted)]">Replay</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

const USES = ["Monthly reports", "Image processing", "CRM syncs", "Bulk email", "Data exports"];

export default function QueuesPage() {
  return (
    <ProductShell title="Queues" description="Durable background jobs with retries, so slow work never slows your app.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]" backdrop={<>{backdrop.lines("30%", "50%")}{backdrop.glow("30%", "40%", "760px", "520px")}</>}>
        <Split
          flip
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="queues" name="Queues" />
              <Display quiet="Your app stays quick.">Slow work, out of the way.</Display>
              <p className="max-w-[40ch] text-[16px] leading-[1.65] text-muted">
                Reports, imports, resizes and syncs run in the background and
                survive restarts. Your users get an answer right away.
              </p>
              <HeroActions />
            </div>
          }
          visual={<JobList />}
        />
      </Band>

      <Band labelledBy="q-lanes" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="q-lanes" center title="Answer now. Finish later." quiet="Nobody waits on a spinner.">
          Hand the heavy lifting to a queue and reply straight away. The job
          finishes on its own and tells you when it's done.
        </Copy>
        <Card className="mx-auto mt-12 max-w-[1000px] overflow-x-auto px-6 py-10">
          <TwoLanes />
        </Card>
      </Band>

      <Band labelledBy="q-retry" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.dots("80%", "50%")}>
        <Split
          copy={
            <Copy id="q-retry" title="Failures try again." quiet="On a schedule you set.">
              Set how many attempts a job gets and how long it waits between
              them. Most blips clear up before anyone notices.
            </Copy>
          }
          visual={<RetrySettings />}
        />
      </Band>

      <Band labelledBy="q-failed" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="q-failed" title="Nothing quietly disappears." quiet="Fix it, then replay.">
              Jobs that run out of attempts wait for you with their error. Fix
              the cause and replay one, or all of them at once.
            </Copy>
          }
          visual={<Failed />}
        />
      </Band>

      <Band labelledBy="q-uses" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.hatch("50%", "50%")}>
        <h2 id="q-uses" className="text-center text-[15px] text-faint">Perfect for</h2>
        <ul className="mx-auto mt-8 flex max-w-[960px] flex-wrap justify-center gap-x-10 gap-y-4">
          {USES.map((use, i) => (
            <li key={use} className={`text-[clamp(26px,3.2vw,44px)] tracking-[-0.045em] ${i % 2 ? "text-muted" : "text-text"}`}>{use}</li>
          ))}
        </ul>
      </Band>

      <Band labelledBy="q-points" className="py-[clamp(64px,8vw,104px)]">
        <h2 id="q-points" className="sr-only">How jobs behave</h2>
        <Points
          columns={3}
          items={[
            { icon: "queues", title: "Durable", copy: "Jobs survive deploys and restarts." },
            { icon: "refresh", title: "Retries", copy: "Attempts and waits you control." },
            { icon: "activity", title: "Visible", copy: "See what's queued, running and done." },
          ]}
        />
      </Band>

      <ProductCta
        title="Move the slow stuff."
        quiet="Keep the fast feeling."
        next={{ label: "Next: Mail", href: "/products/mail" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
