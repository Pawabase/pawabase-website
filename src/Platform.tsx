import { useEffect, useRef, useState } from "react";
import { Icon } from "./components/Primitives";
import { docs, github } from "./config";
import { Mascot } from "./components/Mascot";

/* One shared reveal, used sparingly on headings and rules rather than on cards. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, seen };
}

/* ── 1 · the platform surface ───────────────────────────────────────────── */

const majors = [
  {
    name: "Database & data APIs",
    body: "Model resources on Postgres, SQLite or MySQL and serve list, get, create, update and delete through generated REST endpoints, filters, sorting and pagination.",
  },
  {
    name: "Authentication",
    body: "Users, sessions, OAuth providers, magic links, MFA, roles, permissions and organizations, with the same policies applied to every surface.",
  },
  {
    name: "Storage",
    body: "Buckets with their own read and write policies, signed URLs for direct upload, on local disk or any S3-compatible service.",
  },
  {
    name: "Realtime",
    body: "Channels, presence, history and live resource changes over a single WebSocket connection.",
  },
  {
    name: "Functions",
    body: "Python functions you write, test and deploy from your own repository, callable from a route, a flow or an event.",
  },
  {
    name: "Application runtime",
    body: "Events, queues, workers and schedules for everything that happens outside the request.",
  },
];

const supporting = [
  "Schemas",
  "Transformers",
  "Policies",
  "Custom routes",
  "Generated API docs",
  "API Explorer",
  "Roles & permissions",
  "Organizations",
  "MFA",
  "Presence",
  "Message history",
  "Signed URLs",
  "Secrets",
  "Scoped API keys",
  "Caching",
  "Rate limits",
  "Database console",
  "Migrations",
  "Backups",
  "Request logs",
  "Flow traces",
  "Mail templates",
  "Inbound hooks",
  "Outbound webhooks",
  "Branches",
  "Releases",
  "API versions",
];

function Surface() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-surface${seen ? " is-in" : ""}`}
      aria-labelledby="surface-title"
    >
      <div className="pf-frame">
        <div className="surface-intro">
          <div className="surface-copy">
            <p className="surface-eyebrow">ONE PROJECT · ONE OPERATING SYSTEM</p>
            <h2 id="surface-title" className="pf-h2">
              One Pawabase project holds the data, the identity and everything that runs
              around them.
            </h2>
            <p className="pf-lede">
              Not a database with extras attached. Each of these is a first-class part of the
              platform, administered from the same Studio and deployed as one unit.
            </p>
          </div>
          <div className="surface-atmosphere" aria-hidden="true">
            <span className="surface-orbit orbit-a" /><span className="surface-orbit orbit-b" />
            <Mascot pose="server" className="surface-mascot" decorative />
          </div>
        </div>

        <dl className="pf-matrix">
          {majors.map((item) => (
            <div className="pf-cell" key={item.name}>
              <dt>{item.name}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>

        <div className="pf-index">
          <p>Also in the platform</p>
          <ul>
            {supporting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · what gets built on it ───────────────────────────────────────────── */

const products = [
  "SaaS products",
  "Commerce and marketplaces",
  "Customer portals",
  "Internal tools",
  "Back-office systems",
  "Mobile apps",
  "Realtime collaborative products",
  "Products with server-side logic",
];

function Products() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-products${seen ? " is-in" : ""}`}
      aria-labelledby="products-title"
    >
      <img className="products-world" src="/images/world/cloud-kingdom-infrastructure.png" alt="" aria-hidden="true" />
      <div className="pf-frame">
        <Mascot pose="laptop" className="products-mascot" decorative />
        <h2 id="products-title" className="pf-h2">
          Enough surface to carry a real product.
        </h2>
        <ul className="pf-rail">
          {products.map((item, i) => (
            <li key={item} style={{ "--i": i } as React.CSSProperties}>
              {item}
            </li>
          ))}
        </ul>
        <p className="pf-foot">
          The same project serves a public site, an internal tool and a partner
          integration. Access is decided by policies and API keys, not by separate
          deployments.
        </p>
      </div>
    </section>
  );
}

/* ── 3 · the application runtime ────────────────────────────────────────── */

const runtime = [
  ["Events", "Resource writes, auth activity, schedules and flow emissions publish named events. Flows, functions, webhooks and realtime subscribe independently."],
  ["Queues & workers", "Work leaves the request path, retries with backoff, and keeps its attempts, errors and final state."],
  ["Schedules", "Cron expressions and fixed intervals, with the same Flows behind them."],
  ["Webhooks", "Outbound deliveries signed with an environment secret; inbound hooks verified before your code sees the payload."],
  ["Mail", "SMTP per environment and Jinja2 templates. Every message is queued and logged."],
  ["Flows", "Branch, loop, retry and call out from a visual canvas whose graph is the flow itself."],
  ["Integrations", "Payments, email providers, external APIs and object storage participate in Pawabase workflows."],
];

function Runtime() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-runtime${seen ? " is-in" : ""}`}
      aria-labelledby="runtime-title"
    >
      <div className="pf-frame">
        <div className="pf-split">
          <div className="pf-split-sticky">
            <Mascot pose="server" className="platform-mascot runtime-mascot" decorative />
            <h2 id="runtime-title" className="pf-h2">
              Most products outgrow CRUD in their first year.
            </h2>
            <p className="pf-lede">
              Background jobs, event fan-out, schedules, outbound webhooks and
              transactional mail are part of the same project. Growing the product
              should not mean assembling four more vendors to keep it running.
            </p>
          </div>
          <dl className="pf-rules">
            {runtime.map(([name, body]) => (
              <div className="pf-rule" key={name}>
                <dt>{name}</dt>
                <dd>{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ── 4 · clients ────────────────────────────────────────────────────────── */

const clients = [
  ["react", "React"],
  ["nextdotjs", "Next.js"],
  ["vuedotjs", "Vue"],
  ["flutter", "Flutter"],
  ["apple", "iOS"],
  ["android", "Android"],
  ["python", "Python"],
  ["nodedotjs", "Node.js"],
];

function Clients() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-clients${seen ? " is-in" : ""}`}
      aria-labelledby="clients-title"
    >
      <div className="pf-frame">
        <Mascot pose="signal" className="clients-mascot" decorative />
        <div className="pf-clients-head">
          <h2 id="clients-title" className="pf-h2">
            Anything that speaks HTTP.
          </h2>
          <p className="pf-lede">
            One gateway address, plain REST and JSON. Official clients exist for
            JavaScript and Python; there is no native mobile SDK to learn, because the
            endpoints are the same ones a browser calls. The realtime protocol is
            identical on web, mobile and server.
          </p>
        </div>
        <ul className="pf-logos">
          {clients.map(([slug, name]) => (
            <li key={slug}>
              <img src={`/integrations/${slug}.svg`} alt="" width="24" height="24" />
              {name}
            </li>
          ))}
        </ul>
        <div className="pf-installs">
          <p>
            <span className="pf-prompt">$</span> npm install @pawabase/client
          </p>
          <p>
            <span className="pf-prompt">$</span> pip install pawabase
          </p>
        </div>
      </div>
    </section>
  );
}

function MascotMoment() {
  return <section className="mascot-moment" aria-label="The Little Automaton keeps watch over your access rules">
    <div className="mascot-moment-copy">
      <p className="pf-eyebrow">THE LITTLE AUTOMATON</p>
      <h2>Every door gets the same careful guard.</h2>
      <p>Policies, roles, sessions and scoped keys stay close to the data they protect. The Automaton is a small reminder that access control should feel visible, not mysterious.</p>
    </div>
    <div className="mascot-moment-art"><i /><i /><Mascot pose="signal" className="platform-mascot signal-mascot" decorative /></div>
  </section>;
}

/* ── 5 · ownership ──────────────────────────────────────────────────────── */

function Ownership() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-own${seen ? " is-in" : ""}`}
      aria-labelledby="own-title"
    >
      <div className="pf-frame">
        <Mascot pose="server" className="ownership-mascot" decorative />
        <h2 id="own-title" className="pf-h2 pf-h2-xl">
          Run it where you already run things.
        </h2>
        <div className="pf-own-grid">
          <p className="pf-own-lede">
            One compose file brings up the whole platform from a single image. Point it
            at your own Postgres, your own Redis and any S3-compatible bucket. The
            gateway listens on <span className="pf-mono">:8080</span> and Studio on{" "}
            <span className="pf-mono">:8090</span>; the internal services never need a
            public port.
          </p>
          <ul className="pf-own-list">
            <li>The deployment, on hardware you choose.</li>
            <li>The database and the object storage behind it.</li>
            <li>The keys, secrets and signing material.</li>
            <li>Your data, exportable at any time as JSON.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── 6 · portability and source ─────────────────────────────────────────── */

function Portability() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-port${seen ? " is-in" : ""}`}
      aria-labelledby="port-title"
    >
      <div className="pf-frame">
        <Mascot pose="laptop" className="portability-mascot" decorative />
        <div className="pf-port-cols">
          <div>
            <h2 id="port-title" className="pf-h2">
              Export the backend. Start the next project from it.
            </h2>
            <p className="pf-lede">
              A blueprint contains a project's resources, schemas, policies,
              flows, buckets, webhooks and roles in one versioned JSON document.
              Importing it creates a new project. There is no endpoint that applies a
              blueprint to a running project, so a shared template can never overwrite
              live definitions.
            </p>
          </div>
          <div>
            <h3 className="pf-h3">Open source, including the parts nobody demos.</h3>
            <p className="pf-lede">
              The gateway, the policy engine, the flow runtime and Studio are all in the
              repository. Read how authorization is enforced before you depend on it,
              run the whole thing yourself, and send changes back.
            </p>
            <a className="pf-link" href={github} target="_blank" rel="noreferrer">
              Pawabase on GitHub <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · start ──────────────────────────────────────────────────────────── */

export function Platform() {
  return (
    <>
      <Surface />
      <Products />
      <Runtime />
      <MascotMoment />
      <Clients />
      <Ownership />
      <Portability />
      <Start />
    </>
  );
}

function Start() {
  const { ref, seen } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`pf pf-start${seen ? " is-in" : ""}`}
      aria-labelledby="start-title"
    >
      <div className="pf-frame">
        <h2 id="start-title" className="pf-h2">
          Start with one resource and an API key.
        </h2>
        <div className="pf-start-actions">
          <a className="button" href={docs("quickstart")}>
            Quickstart <Icon name="arrow" />
          </a>
          <a className="pf-link" href={docs("installation/docker")}>
            Self-host with Docker <Icon name="arrow" />
          </a>
          <a className="pf-link" href={docs()}>
            Read the docs <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
