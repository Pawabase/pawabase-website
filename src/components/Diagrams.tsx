import type { ReactNode } from "react";

/**
 * Small drawings of the product itself: each one shows the thing its section is talking about, as the product would show it.
 * They share one language: a card on the section's surface, rows with a label and a value, a pill for state.
 */

const Pill = ({ tone = "mute", children }: { tone?: "mute" | "ok" | "warn" | "brand"; children: ReactNode }) => (
  <span className={`dg-pill ${tone}`}>{children}</span>
);
const Dot = ({ tone = "ok" }: { tone?: "ok" | "warn" | "off" }) => <i className={`dg-dot ${tone}`} aria-hidden="true" />;
const Row = ({ children }: { children: ReactNode }) => <div className="dg-row">{children}</div>;
const Bar = ({ children, end }: { children: ReactNode; end?: ReactNode }) => (
  <div className="dg-bar">
    <span>{children}</span>
    {end}
  </div>
);

const A: Record<string, () => ReactNode> = {
  /* bento */
  auth: () => (
    <>
      <Bar end={<Pill tone="ok">Signed in</Pill>}>Session</Bar>
      <Row>
        <i className="dg-avatar" aria-hidden="true">M</i>
        <span className="dg-grow"><b>Maya Okafor</b><small>maya@acme.dev</small></span>
        <Pill tone="brand">MFA</Pill>
      </Row>
      <Row><small>Organization</small><b>Acme</b></Row>
      <Row><small>Role</small><Pill>admin</Pill></Row>
    </>
  ),
  database: () => (
    <>
      <Bar end={<Pill>orders</Pill>}>Table</Bar>
      <div className="dg-table">
        <span>id</span><span>customer</span><span>total</span>
        <span>1042</span><span>Maya</span><span>₦18,500</span>
        <span>1043</span><span>Tunde</span><span>₦6,200</span>
        <span>1044</span><span>Ada</span><span>₦41,000</span>
      </div>
      <Row><small>Policy</small><code>owner or admin</code></Row>
    </>
  ),
  storage: () => (
    <>
      <Bar end={<Pill>private</Pill>}>invoices</Bar>
      <Row><span className="dg-file">PDF</span><span className="dg-grow"><b>march.pdf</b><small>212 KB</small></span></Row>
      <Row><span className="dg-file">CSV</span><span className="dg-grow"><b>orders.csv</b><small>1.4 MB</small></span></Row>
      <div className="dg-meter"><i style={{ width: "62%" }} /></div>
    </>
  ),
  functions: () => (
    <>
      <Bar end={<Pill tone="ok">200 · 41 ms</Pill>}>charge.py</Bar>
      <pre className="dg-code"><span className="k">@function</span>{"\n"}<span className="k">def</span> charge(ctx, order):{"\n"}{"    "}ctx.emit(<span className="s">"order.paid"</span>)</pre>
    </>
  ),
  automation: () => (
    <>
      <Bar end={<Pill>every day 09:00</Pill>}>Flow</Bar>
      <div className="dg-chain">
        <span className="dg-node">order.paid</span>
        <i aria-hidden="true">→</i>
        <span className="dg-node">Send receipt</span>
        <i aria-hidden="true">→</i>
        <span className="dg-node ok">Sent</span>
      </div>
      <Row><small>Last run</small><Pill tone="warn">retry 2 of 3</Pill></Row>
    </>
  ),
  cloud: () => (
    <>
      <Bar end={<Pill>Lagos</Pill>}>Projects</Bar>
      <Row><Dot /><b className="dg-grow">acme-production</b><small>running</small></Row>
      <Row><Dot /><b className="dg-grow">acme-staging</b><small>running</small></Row>
      <Row><Dot tone="off" /><b className="dg-grow">acme-dev</b><small>paused</small></Row>
    </>
  ),

};

export function Diagram({ name, label, className = "" }: { name: string; label?: string; className?: string }) {
  const draw = A[name];
  if (!draw) return null;
  return (
    <div className={`dg dg-${name} ${className}`} role="img" aria-label={label ?? `An illustration of ${name}.`}>
      <div aria-hidden="true">{draw()}</div>
    </div>
  );
}
