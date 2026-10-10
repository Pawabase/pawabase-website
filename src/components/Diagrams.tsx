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

const Float = ({ children }: { children: ReactNode }) => <div className="dg-float">{children}</div>;
const Main = ({ children }: { children: ReactNode }) => <div className="dg-main">{children}</div>;

const A: Record<string, () => ReactNode> = {
  auth: () => (
    <>
      <Main>
        <Bar>Session</Bar>
        <Row>
          <i className="dg-avatar" aria-hidden="true">M</i>
          <span className="dg-grow"><b>Maya Okafor</b><small>maya@acme.dev</small></span>
          <Pill tone="brand">MFA on</Pill>
        </Row>
        <Row><small>Team</small><b>Acme</b><Pill>admin</Pill></Row>
        <Row><small>Devices</small><b className="dg-grow">2 signed in</b><small>last seen now</small></Row>
      </Main>
      <Float>
        <small>Code sent</small>
        <div className="dg-otp">{[4, 8, 1, 9, 0, 2].map((n, k) => <i key={k}>{n}</i>)}</div>
      </Float>
    </>
  ),
  database: () => (
    <>
      <Main>
        <Bar>orders</Bar>
        <div className="dg-table">
          <span>id</span><span>customer</span><span>status</span><span>total</span>
          <span>1042</span><span>Maya</span><span><Pill tone="ok">paid</Pill></span><span>₦18,500</span>
          <span>1043</span><span>Tunde</span><span><Pill tone="warn">pending</Pill></span><span>₦6,200</span>
          <span>1044</span><span>Ada</span><span><Pill tone="ok">paid</Pill></span><span>₦41,000</span>
        </div>
      </Main>
      <Float>
        <code>GET /rest/v1/orders</code>
        <span className="dg-line"><Pill tone="ok">200</Pill><small>3 rows · owner or admin</small></span>
      </Float>
    </>
  ),
  storage: () => (
    <>
      <Main>
        <Bar>invoices</Bar>
        <div className="dg-files">
          {[["PDF", "march.pdf", "212 KB", "sky"], ["CSV", "orders.csv", "1.4 MB", "mint"], ["PNG", "logo.png", "48 KB", "peach"]].map(([e, n, z, t]) => (
            <div className="dg-fileCard" key={n}>
              <span className={`dg-thumb ${t}`}>{e}</span>
              <b>{n}</b>
              <small>{z}</small>
            </div>
          ))}
        </div>
      </Main>
      <Float>
        <span className="dg-line"><b>receipt.png</b><small>62%</small></span>
        <div className="dg-meter"><i style={{ width: "62%" }} /></div>
      </Float>
    </>
  ),
  functions: () => (
    <>
      <Main>
        <Bar>charge.py</Bar>
        <pre className="dg-code"><i>1</i><span className="k">@function</span>{"\n"}<i>2</i><span className="k">def</span> charge(ctx, order):{"\n"}<i>3</i>{"    "}paid = ctx.pay(order){"\n"}<i>4</i>{"    "}ctx.emit(<span className="s">"order.paid"</span>){"\n"}<i>5</i>{"    "}<span className="k">return</span> paid</pre>
      </Main>
      <Float>
        <span className="dg-line"><Pill tone="ok">200 OK</Pill><small>41 ms</small></span>
        <small>1 query · 1 event sent</small>
      </Float>
    </>
  ),
  automation: () => (
    <>
      <Main>
        <Bar end={<Pill tone="ok">Live</Pill>}>Order receipts</Bar>
        <div className="dg-canvas">
          <svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
            <path d="M92 75 C 130 75, 120 36, 158 36" />
            <path d="M92 75 C 130 75, 120 114, 158 114" />
            <path d="M268 36 C 300 36, 296 75, 322 75" />
            <path d="M268 114 C 300 114, 296 75, 322 75" />
          </svg>
          <div className="dg-n" style={{ left: "1%", top: "38%" }}><i className="a" /><b>order.paid</b><small>Event</small></div>
          <div className="dg-n" style={{ left: "40%", top: "6%" }}><i className="b" /><b>Send receipt</b><small>Email</small></div>
          <div className="dg-n" style={{ left: "40%", top: "68%" }}><i className="c" /><b>Update stock</b><small>Record</small></div>
          <div className="dg-n end" style={{ left: "80%", top: "38%" }}><i className="d" /><b>Done</b><small>1.2 s</small></div>
        </div>
        <Row><Dot /><b className="dg-grow">Run 2041</b><small>1.2 s</small><Pill tone="ok">Succeeded</Pill></Row>
        <Row><Dot tone="warn" /><b className="dg-grow">Run 2040</b><small>retry 2 of 3</small><Pill tone="warn">Retrying</Pill></Row>
      </Main>
    </>
  ),
  cloud: () => (
    <>
      <Main>
        <Bar>Projects</Bar>
        <Row><Dot /><b className="dg-grow">acme-production</b><small>running</small></Row>
        <Row><Dot /><b className="dg-grow">acme-staging</b><small>running</small></Row>
        <Row><Dot tone="off" /><b className="dg-grow">acme-dev</b><small>paused</small></Row>
      </Main>
      <Float>
        <small>Requests, 7 days</small>
        <div className="dg-bars">{[34, 48, 41, 62, 55, 78, 70].map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</div>
      </Float>
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
