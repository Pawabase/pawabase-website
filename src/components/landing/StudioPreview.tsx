import { BrandMark } from "./Brand";

const nav = ["Overview", "Database", "Authentication", "Storage", "Realtime", "Functions", "Webhooks"];
const metrics = [["Requests", "24,812", "Across your API"], ["Response time", "42 ms", "Median latency"], ["Active users", "1,208", "In the last 24 hours"], ["Storage", "2.4 GB", "Across 3 buckets"]];
const requests = [["GET", "/rest/v1/orders", "200", "28 ms"], ["POST", "/auth/v1/token", "200", "46 ms"], ["GET", "/rest/v1/products", "200", "18 ms"], ["POST", "/rest/v1/orders", "201", "52 ms"]];

/** Illustrative Studio overview, rendered with the current brand instead of a stale screenshot. */
export function StudioPreview() {
  return (
    <div className="overflow-hidden rounded-[15px] border border-line bg-page text-text" role="img" aria-label="Pawabase Studio overview with request activity, latency, users, and recent API requests">
      <div aria-hidden="true">
        <div className="flex items-center gap-[2%] border-b border-line px-[2%] py-[1.2%] text-[clamp(7px,0.9vw,13px)]">
          <BrandMark size={28} />
          <strong>Pawabase</strong><span className="text-faint">/</span><span>Acme</span><span className="text-faint">/</span><span className="text-muted">Production</span>
          <span className="ml-auto rounded-md border border-line bg-surface px-[1.2%] py-[0.4%] text-muted">Search anything</span>
          <span className="rounded-md bg-text px-[1.2%] py-[0.4%] font-semibold text-page">+ New</span>
        </div>
        <div className="grid grid-cols-[17%_minmax(0,1fr)] text-[clamp(6px,0.85vw,12px)]">
          <aside className="flex flex-col gap-[2%] border-r border-line px-[8%] py-[10%] text-muted">
            <span className="mb-[8%] text-[0.85em] uppercase tracking-[0.12em] text-faint">Workspace</span>
            {nav.map((label, i) => <span key={label} className={`rounded-md px-[8%] py-[6%] ${i === 0 ? "bg-elevated font-semibold text-text" : ""}`}>{label}</span>)}
            <span className="mt-auto px-[8%] py-[6%]">Settings</span>
          </aside>
          <div className="min-w-0 p-[3%]">
            <div className="mb-[3%] flex items-center justify-between"><div><h3 className="text-[1.6em] font-semibold tracking-[-0.03em]">Overview</h3><p className="mt-[1%] text-muted">Your backend, connected.</p></div><span className="rounded-md border border-line px-[1.5%] py-[0.7%] text-muted">Last 24 hours</span></div>
            <div className="grid grid-cols-4 overflow-hidden rounded-lg border border-line bg-surface">
              {metrics.map(([label, value, caption], i) => <div key={label} className={`px-[10%] py-[9%] ${i ? "border-l border-line" : ""}`}><p className="text-muted">{label}</p><strong className="my-[4%] block text-[1.8em] font-semibold tracking-[-0.04em]">{value}</strong><p className="text-[0.8em] text-faint">{caption}</p></div>)}
            </div>
            <div className="mt-[3%] grid grid-cols-[1.3fr_1fr] gap-[3%]">
              <div className="overflow-hidden rounded-lg border border-line bg-surface p-[4%]"><div className="flex justify-between"><strong className="font-medium">Request activity</strong><span className="text-faint">24,812 requests</span></div><svg viewBox="0 0 440 180" className="mt-[3%] w-full" fill="none"><path d="M0 40H440M0 90H440M0 140H440" stroke="#34383F" strokeDasharray="3 5" /><path d="M0 145 20 130 40 139 60 105 80 119 100 88 120 104 140 68 160 89 180 95 200 58 220 75 240 40 260 62 280 48 300 72 320 38 340 51 360 28 380 44 400 20 420 33 440 16" stroke="#F5F3EE" strokeWidth="2.5" /><path d="M0 166 40 159 80 162 120 149 160 155 200 146 240 153 280 142 320 147 360 135 400 143 440 129" stroke="#70757D" strokeWidth="2" strokeDasharray="6 5" /></svg><div className="flex justify-between text-[0.8em] text-faint"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div></div>
              <div className="overflow-hidden rounded-lg border border-line bg-surface"><h4 className="border-b border-line px-[5%] py-[4%] font-medium">Recent requests</h4>{requests.map(([method, path, status, time]) => <div key={path + method} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[4%] border-b border-line-subtle px-[5%] py-[4%] last:border-b-0"><span className="text-[0.8em] text-muted">{method}</span><div className="min-w-0"><span className="block truncate">{path}</span><span className="text-[0.8em] text-faint">{time}</span></div><span className="rounded bg-elevated px-1.5 py-0.5 text-[0.8em]">{status}</span></div>)}</div>
            </div>
            <div className="mt-[3%] flex items-center gap-2 text-[0.85em] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-text" />All services operational<span className="ml-auto text-faint">Production · Connected</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
