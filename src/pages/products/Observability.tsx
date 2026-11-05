import { useMemo, useState } from "react";

import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame } from "@/components/product/ProductFrame";
import "./observability.css";

/* An instrument panel: the hero is one long chart under a row of readings, with a crosshair that follows you. Then a trace, a threshold being crossed, and ninety days of a status page. All numbers here are examples, and say so. */

const W = 1264;
const H = 280;
const POINTS = 96;
/** A day of requests per minute: a daily swell, some texture, and one busy spell. Made up, the same on every visit. */
const series = Array.from({ length: POINTS }, (_, i) => {
  const t = i / (POINTS - 1);
  const swell = 420 + 300 * Math.sin((t - 0.28) * Math.PI * 2);
  const texture = 46 * Math.sin(i * 1.7) + 30 * Math.sin(i * 0.61);
  const spike = 330 * Math.exp(-(((t - 0.74) / 0.028) ** 2));
  return Math.max(60, Math.round(swell + texture + spike));
});
const MAX = 1200;
const xAt = (i: number) => (i / (POINTS - 1)) * W;
const yAt = (v: number) => H - 22 - (v / MAX) * (H - 40);
const LINE = series.map((v, i) => `${i ? "L" : "M"}${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(" ");
const timeAt = (i: number) => {
  const minutes = Math.round((i / (POINTS - 1)) * 1425);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
};
const READINGS: [string, string][] = [["Requests today", "612,480"], ["Typical response", "84 ms"], ["Failed", "0.02%"], ["Alarms firing", "None"]];
const TRACE: [string, number, number][] = [["Resource change", 0, 4], ["If", 4, 3], ["Ask a model", 7, 58], ["Update record", 65, 9], ["Send email", 74, 21], ["Respond", 95, 5]];
const ALARM = Array.from({ length: 48 }, (_, i) => 22 + 7 * Math.sin(i * 0.9) + 5 * Math.sin(i * 0.37) + (i > 31 ? (i - 31) * 3.4 : 0));
const LIMIT = 58;
const INCIDENT = 62;
const ALSO: [string, string][] = [
  ["Request logs", "Every call to your API, with its result."],
  ["Dashboards", "Build the charts your team watches."],
  ["Audit log", "A record of who changed what, and when."],
];

function Chart() {
  const [at, setAt] = useState<number | null>(null);
  const area = useMemo(() => `${LINE} L${W} ${H - 22} L0 ${H - 22} Z`, []);
  const move = (event: React.PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setAt(Math.round(((event.clientX - box.left) / box.width) * (POINTS - 1)));
  };
  const i = at ?? POINTS - 1;
  return (
    <figure className="ob-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Example chart of requests per minute over a day, with a busy spell in the evening." onPointerMove={move} onPointerLeave={() => setAt(null)}>
        <defs>
          <linearGradient id="ob-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ff6a00" stopOpacity="0.26" /><stop offset="1" stopColor="#ff6a00" stopOpacity="0" /></linearGradient>
        </defs>
        {[300, 600, 900].map((v) => (
          <g key={v} className="ob-grid">
            <line x1="0" x2={W} y1={yAt(v)} y2={yAt(v)} />
            <text x="14" y={yAt(v) - 6}>{v}</text>
          </g>
        ))}
        {[0, 24, 48, 72, 95].map((p) => <text key={p} className="ob-axis" x={Math.min(xAt(p) + 14, W - 50)} y={H - 6}>{timeAt(p)}</text>)}
        <path d={area} fill="url(#ob-fill)" />
        <path d={LINE} className="ob-line" />
        <line className="ob-cross" x1={xAt(i)} x2={xAt(i)} y1="0" y2={H - 22} />
        <circle className="ob-dot" cx={xAt(i)} cy={yAt(series[i])} r="5" />
      </svg>
      <figcaption className="ob-tip" style={{ left: `${Math.min(Math.max((i / (POINTS - 1)) * 100, 8), 90)}%` }}>
        <b>{series[i].toLocaleString("en-US")}</b> requests a minute<span>{timeAt(i)}</span>
      </figcaption>
    </figure>
  );
}

function Threshold() {
  const w = 600;
  const h = 200;
  const y = (v: number) => h - (v / 100) * h;
  const path = ALARM.map((v, i) => `${i ? "L" : "M"}${((i / (ALARM.length - 1)) * w).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const cross = ALARM.findIndex((v) => v > LIMIT);
  return (
    <svg className="ob-alarm" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Example chart: failures rise above the alarm's limit, and the alarm fires.">
      <line x1="0" x2={w} y1={y(LIMIT)} y2={y(LIMIT)} className="ob-limit" />
      <text x="0" y={y(LIMIT) - 8} className="ob-limit-label">Your limit</text>
      <path d={path} className="ob-line" />
      <circle cx={(cross / (ALARM.length - 1)) * w} cy={y(ALARM[cross])} r="7" className="ob-fire" />
    </svg>
  );
}

export default function ObservabilityPage() {
  return (
    <ProductFrame name="Observability" description="Request logs, traces, metrics, alarms, dashboards, an audit log and a public status page for everything your system does.">
      <section className="ix-hero ob-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="ob-head">
          <h1 id="product-title" data-reveal="up">See everything your system does.</h1>
          <HeroActions />
        </div>
        <dl className="ob-readings">
          {READINGS.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <Chart />
        <p className="ob-note">Example data</p>
      </section>

      <Band label="Traces" className="ob-trace">
        <div className="ob-trace-copy">
          <h2>Follow one run, step by step.</h2>
          <p>Find what was slow and what failed, across every request, flow and job.</p>
        </div>
        <ol>
          {TRACE.map(([name, start, width]) => (
            <li key={name} title={`${name}: ${width * 12} ms`}>
              <span>{name}</span>
              <div><i style={{ left: `${start}%`, width: `${width}%` }} /></div>
              <small>{width * 12} ms</small>
            </li>
          ))}
        </ol>
      </Band>

      <Band label="Alarms" className="ob-alarms">
        <Threshold />
        <div>
          <h2>Hear about it before your users tell you.</h2>
          <p>Set the limits that matter. When one is crossed, you find out.</p>
        </div>
      </Band>

      <Band label="Status page" className="ob-status">
        <header>
          <h2>A status page for your users.</h2>
          <p>Ninety days, one bar a day.</p>
        </header>
        <div className="ob-days" role="img" aria-label="Example status page: ninety days, with one slow day.">
          {Array.from({ length: 90 }, (_, i) => <i key={i} className={i === INCIDENT ? "slow" : ""} title={i === INCIDENT ? "Slow for 12 minutes" : "All good"} />)}
        </div>
        <p className="ob-status-note"><span className="ob-flag">!</span> One slow day, 12 minutes. Everything else ran normally.</p>
      </Band>

      <Band label="Everything in Observability" className="ob-also">
        {ALSO.map(([title, line]) => <article key={title}><h3>{title}</h3><p>{line}</p></article>)}
      </Band>
    </ProductFrame>
  );
}
