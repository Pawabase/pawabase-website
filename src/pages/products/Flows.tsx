import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./flows.css";

/* The canvas comes first and the words after it: a real flow runs across the hero with a pulse moving down its lines. Then the eight triggers in big type, the blocks going past, and a test run. */

const NODES: { x: number; y: number; label: string; kind?: "start" | "ai" }[] = [
  { x: 40, y: 150, label: "Resource change", kind: "start" },
  { x: 290, y: 150, label: "If" },
  { x: 520, y: 60, label: "Ask a model", kind: "ai" },
  { x: 520, y: 240, label: "Update record" },
  { x: 770, y: 150, label: "Send email" },
  { x: 1010, y: 150, label: "Respond" },
];
const W = 196;
const H = 60;
const PATHS = [
  "M236 180 H290",
  "M486 180 C 505 180, 500 90, 520 90",
  "M486 180 C 505 180, 500 270, 520 270",
  "M716 90 C 745 90, 742 180, 770 180",
  "M716 270 C 745 270, 742 180, 770 180",
  "M966 180 H1010",
];
const TRIGGERS = ["HTTP request", "Event", "Resource change", "Schedule", "Inbound webhook", "Realtime message", "Background job", "Manual run"];
const BLOCKS = ["Get record", "Update record", "Check policy", "If", "For each", "Merge", "Delay", "Retry", "Send email", "Ask a model", "Respond"];
const RUN: [string, string][] = [["Resource change", "Started"], ["If", "Took the first branch"], ["Ask a model", "Wrote a summary"], ["Send email", "Sent to 1 person"], ["Respond", "Finished"]];

function Canvas() {
  return (
    <div className="fl-canvas" aria-hidden="true">
      <svg viewBox="0 0 1264 340">
        {PATHS.map((d, i) => (
          <g key={d}>
            <path d={d} className="fl-wire" />
            <path d={d} pathLength={100} className="fl-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
        {NODES.map((node) => (
          <g key={node.label} className={`fl-node ${node.kind ?? ""}`}>
            <rect x={node.x} y={node.y} width={W} height={H} rx="12" />
            <circle cx={node.x} cy={node.y + H / 2} r="4" />
            <circle cx={node.x + W} cy={node.y + H / 2} r="4" />
            <text x={node.x + W / 2} y={node.y + H / 2 + 5} textAnchor="middle">{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function TestRun() {
  const step = useTicker(1100, RUN.length) % (RUN.length + 3);
  return (
    <ol className="fl-run" aria-hidden="true">
      {RUN.map(([name, what], i) => (
        <li key={name} className={i < step ? "done" : i === step ? "now" : ""}>
          <i />
          <b>{name}</b>
          <span>{i < step ? what : i === step ? "Running" : ""}</span>
        </li>
      ))}
    </ol>
  );
}

export default function FlowsPage() {
  const lit = useTicker(1000) % TRIGGERS.length;
  return (
    <ProductFrame name="Flows" description="Visual workflows with eight triggers, branches, loops, retries, AI steps and a full history of every run.">
      <section className="ix-hero fl-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <Canvas />
        <div className="fl-copy">
          <h1 id="product-title" data-reveal="up">Automate the work<br />around your data.</h1>
          <div data-reveal="up">
            <p>Build flows on a visual canvas, start them from almost anything, and watch every run.</p>
            <HeroActions />
          </div>
        </div>
      </section>

      <Band label="Eight ways to start" className="fl-triggers">
        <h2>Eight ways to start.</h2>
        <ul>
          {TRIGGERS.map((name, i) => <li key={name} className={i === lit ? "lit" : ""}>{name}</li>)}
        </ul>
      </Band>

      <section className="ix-section fl-belt" aria-label="Blocks" data-plain="">
        <div aria-hidden="true">
          {[...BLOCKS, ...BLOCKS].map((block, i) => <span key={i}>{block}</span>)}
        </div>
      </section>

      <Band label="Test before you ship" className="fl-test">
        <div>
          <h2>Test before you ship.</h2>
          <p>Run a flow by hand and see what each step did. Every real run is kept the same way.</p>
          <p className="fl-more">Branches, loops, retries and delays, without code. Tidy the canvas in one click.</p>
        </div>
        <TestRun />
      </Band>

      <Band label="AI in any step" className="fl-ai">
        <h2>Put a model to work inside any flow.</h2>
        <p>Ask it to decide, write or sort, with the model you choose.</p>
      </Band>
    </ProductFrame>
  );
}
