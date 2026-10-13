import GridMotion from "../components/GridMotion";
import { Code } from "../components/Code";
import { Diagram } from "../components/Diagrams";
import { Figure } from "../components/Figure";
import { docs, github } from "../config";

/* ────────────────────────────── 1 · hero ────────────────────────────── */

const cells = [
  { key: "auth", name: "Authentication", figure: "auth", text: "Users, sessions, social sign-in, organizations and access policies, in the same platform as your data.", span: 5, tone: "white" },
  { key: "database", name: "Database", figure: "database", text: "Describe a resource once. Pawabase creates the table, the API and its access rules.", span: 4, tone: "canvas" },
  { key: "storage", name: "Storage", figure: "storage", text: "Buckets on local disk or any S3-compatible service, under the same policies.", span: 3, tone: "canvas" },
  { key: "functions", name: "Functions", figure: "functions", text: "Application logic in Python, deployed from your repository and run beside your data.", span: 3, tone: "white" },
  { key: "automation", name: "Flows and events", figure: "automation", text: "Workflows, queues and schedules that react when something happens in your application, and retry when it fails.", span: 5, tone: "white" },
  { key: "cloud", name: "Cloud", figure: "cloud", text: "The managed way to run Pawabase: each project gets its own database and its own address.", span: 4, tone: "lavender" },
] as const;

const WALL_NAMES = ["Auth", "Database", "Storage", "Functions", "Flows", "Realtime", "Mail", "Queues", "Policies", "Webhooks", "Secrets", "Backups", "Schedules", "Events", "Gateway"];
const WALL = WALL_NAMES.map((name) => (
  <div key={name} className="wall-tile">
    {name}
  </div>
));

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-wall" aria-hidden="true">
          <GridMotion items={WALL} rows={7} aspectRatio={2.6} gap={12} radius={14} angle={-8} speed={16} parallax={0.4} spotlight={0.5} dim={0.45} fade={0.7} />
        </div>
      <div className="wrap">
        <div className="hero-top">
          <p className="eyebrow">
            <i aria-hidden="true" />
            An application development platform
          </p>
          <h1 id="hero-title" className="display">
            Build applications. Not infrastructure.
          </h1>
          <div className="hero-side">
            <p className="lede">Everything behind your application, working together: identity, data, files, functions, workflows and realtime, built to operate as one platform.</p>
            <div className="actions">
              <a className="btn btn-primary" href={docs("quickstart")}>
                Get started
              </a>
              <a className="btn" href={docs("index")}>
                Read the documentation
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="bento">
        {cells.map((c) => (
          <article key={c.key} className={`cell span-${c.span} tone-${c.tone}`}>
            <header>
              <h2 className="h4">{c.name}</h2>
              <p className="small">{c.text}</p>
            </header>
            <div className="cell-fig">
              <Diagram name={c.figure} label={`${c.name}, as the product shows it.`} />
            </div>
          </article>
        ))}
      </div>
      <div className="worksWith">
        <span>Works with what you already use</span>
        <ul>
          {["PostgreSQL", "MySQL", "SQLite", "S3-compatible storage", "Docker"].map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── 2 · one connected platform ───────────────────────── */

function Connected() {
  return (
    <section id="platform" className="section" aria-labelledby="platform-title">
      <div className="wrap">
        <div className="center">
          <p className="kicker">Platform</p>
          <h2 id="platform-title" className="h1">
            Services designed to work together.
          </h2>
          <p className="lede">Identity, data, files, functions and automation share one account model, one policy language and one request trail, so you integrate your product rather than your infrastructure.</p>
        </div>
        <div className="stage wide">
          <Figure name="schema" names={(c) => c} label="Tiles joined by links. The tile under the pointer rises, and every tile that refers to it rises after it." ratio="5 / 4" />
          <p className="small stage-note">Point at a piece to see what it connects to.</p>
        </div>
        <ol className="points">
          <li><b>One account model</b><span>A person signs in once and every service knows who they are and which organization they act for.</span></li>
          <li><b>One policy language</b><span>An access rule written once applies to records, files, functions and channels.</span></li>
          <li><b>One request trail</b><span>A single request ID follows a call through every service it touches, so failures can be traced.</span></li>
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── 3 · from idea to running software ───────────────────────── */

function Lifecycle() {
  return (
    <section id="build" className="section alt flush" aria-labelledby="build-title">
      <div className="wrap">
        <p className="kicker">Workflow</p>
          <h2 id="build-title" className="h1" style={{ maxWidth: "16ch" }}>
          From local development to production.
        </h2>
      </div>
      <div className="trio">
        <article>
          <h3 className="h3">Define the application.</h3>
          <p className="body">Describe your data, access rules and routes as definitions, and Pawabase sets up the tables and endpoints.</p>
        </article>
        <article>
          <h3 className="h3">Change it safely.</h3>
          <p className="body">Try changes on a branch beside the live application, then promote them when they are ready.</p>
        </article>
        <article>
          <h3 className="h3">Understand what happened.</h3>
          <p className="body">Requests, jobs, emails and events are recorded together, so a failure can be traced to its cause.</p>
        </article>
      </div>
    </section>
  );
}

/* ───────────────────────── 4 · the application foundation ───────────────────────── */

function Foundation() {
  return (
    <section id="foundation" className="section" aria-labelledby="foundation-title">
      <div className="wrap split">
        <div className="c7">
          <div className="stage">
            <Figure name="foundation" names={(c) => c} label="Four layers a request meets: identity, policy, records and files. The pointer's height picks one and the layers above it lift away." ratio="5 / 4" />
            <p className="small stage-note">Move down to open each layer.</p>
          </div>
        </div>
        <div className="c5 stack" style={{ ["--gap" as string]: "20px" }}>
          <p className="kicker">Security</p>
          <h2 id="foundation-title" className="h1">
            Access rules apply from the first request.
          </h2>
          <dl className="kv">
            <div><dt>Identity</dt><dd>Know who is making each request.</dd></div>
            <div><dt>Policies</dt><dd>Say who can read and change what, once, in plain conditions.</dd></div>
            <div><dt>Data</dt><dd>Tables and a REST API, generated from your definitions.</dd></div>
            <div><dt>Files</dt><dd>Stored and served under the same policies.</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5 · application logic ───────────────────────── */

const ORDERS_PAY = `
from pawabase.functions import FunctionError, function

@function("orders.pay", policy="authenticated", timeout=30)
async def pay(ctx):
    async with ctx.runtime.transaction() as db:
        moved = await db.execute(
            "UPDATE orders SET status = 'paid' "
            "WHERE id = ? AND status = 'pending'",
            [ctx.input["order_id"]],
        )
        if not moved:
            raise FunctionError(
                "That order is not waiting for payment.",
                status=409,
                code="not_pending",
            )
    await ctx.runtime.emit("order.paid", {"id": ctx.input["order_id"]})
    return {"paid": True}
`;

function Logic() {
  return (
    <section id="logic" className="section deep" aria-labelledby="logic-title">
      <div className="wrap">
        <div className="split">
          <div className="c5 stack" style={{ ["--gap" as string]: "18px" }}>
            <p className="kicker">Logic</p>
          <h2 id="logic-title" className="h1">
              Business logic without another service to run.
            </h2>
            <p className="lede">When something happens in your application, a function or a flow reacts: record the payment, send the receipt, notify a partner. Failed work is retried, so reactions stay reliable.</p>
          </div>
          <div className="c7">
            <Code lang="python" caption="A function that marks an order paid and announces it." source="pawabase-docs, Code › Functions">
              {ORDERS_PAY}
            </Code>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6 · built for real applications ───────────────────────── */

const cases = [
  ["SaaS and customer applications", "Accounts, organizations and roles, with data scoped to each."],
  ["Commerce and marketplaces", "Orders, payments and receipts as events and flows. Our reference store, Sell4me, is built this way."],
  ["Internal tools", "A back office on top of your data, under the same access rules."],
  ["Operations and integrations", "Imports, reports, reminders and partner syncs that run on their own."],
] as const;

function Applications() {
  return (
    <section id="applications" className="section" aria-labelledby="applications-title">
      <div className="wrap">
        <div className="center">
          <p className="kicker">Use cases</p>
          <h2 id="applications-title" className="h1">
            For the software you are building.
          </h2>
        </div>
        <ol className="uses">
          {cases.map(([title, text], i) => (
            <li key={title}>
              <span className="uses-n">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── 7 · Pawabase Cloud ───────────────────────── */

function CloudSection() {
  return (
    <section id="cloud" className="section ink" aria-labelledby="cloud-title">
      
      <div className="wrap split">
        <div className="c5 stack" style={{ ["--gap" as string]: "18px" }}>
          <p className="kicker">Pawabase Cloud</p>
          <h2 id="cloud-title" className="h1">
            Run it yourself, or let us run it.
          </h2>
          <p className="lede">Pawabase is self-hostable. Pawabase Cloud is the managed option: a project with its own database and its own address, operated for you.</p>
          <ul className="facts">
            <li>Own database per project</li>
            <li>Regional hosting, starting in Nigeria</li>
            <li>Naira billing planned at launch</li>
          </ul>
          <p className="small">Plans and regions are announced as they open.</p>
        </div>
        <div className="c7">
          <Figure name="rack" names={(c) => c} label="Four blades in a frame. The blade under the pointer slides out along its rails." ratio="5 / 4" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8 · infrastructure for African markets ───────────────────────── */

function Africa() {
  return (
    <section id="africa" className="section" aria-labelledby="africa-title">
      
      <div className="wrap split">
        <div className="c7">
          <div className="stage">
            <Figure name="regions" names={{ open: "region open", "not published": "region not published" }} label="A control plate with six sites around it. The one that is open is a tile; the others are dashed footprints that are not published yet." ratio="5 / 4" />
            <p className="small stage-note">Lagos is open. The dashed sites are not published yet.</p>
          </div>
        </div>
        <div className="c5 stack" style={{ ["--gap" as string]: "18px" }}>
          <p className="kicker">Regions</p>
          <h2 id="africa-title" className="h1">
            Modern application infrastructure, wherever you build.
          </h2>
          <p className="lede">Pawabase Cloud starts in Nigeria, with billing in naira through Paystack, because that is where it is being built. More regions are planned; none is promised until it opens.</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9 · developer experience ───────────────────────── */

const CLI = `
pip install pawabase
pawabase init
pawabase emulate --watch
pawabase deploy
pawabase logs -f
`;

const TS = `
import { createClient } from "@pawabase/client";

const pawabase = createClient({
  url: "https://api.example.com",
  apiKey: "pb_pk_…",
});

const page = await pawabase
  .from("posts")
  .eq("status", "live")
  .perPage(20);
`;

function Developers() {
  return (
    <section id="developers" className="section alt" aria-labelledby="developers-title">
      <div className="wrap split top">
        <div className="c5 stack" style={{ ["--gap" as string]: "22px" }}>
          <p className="kicker">Developers</p>
          <h2 id="developers-title" className="h1">
            Fits the way your team already works.
          </h2>
          <p className="lede">Application code stays in your repository. Emulate locally, test without a server, and move between your own servers and Pawabase Cloud when you choose.</p>
          <Code lang="bash" caption="The command line." source="pawabase-docs, Code › CLI">
            {CLI}
          </Code>
          <div className="actions">
            <a className="btn btn-primary" href={docs("quickstart")}>
              Get started
            </a>
            <a className="btn" href={github}>
              Follow on GitHub
            </a>
          </div>
        </div>
        <div className="c7">
          <Code lang="ts" caption="The TypeScript client." source="pawabase-docs, Clients › TypeScript SDK">
            {TS}
          </Code>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10 · closing ───────────────────────── */

function Closing() {
  return (
    <section id="start" className="section peach" aria-labelledby="closing-title">
      <div className="wrap split">
        <div className="c7 stack" style={{ ["--gap" as string]: "28px" }}>
          <h2 id="closing-title" className="display">
            Start with what you need. Grow without rebuilding.
          </h2>
          <div className="actions">
            <a className="btn btn-primary" href={docs("quickstart")}>
              Get started
            </a>
            <a className="btn" href={github}>
              Follow on GitHub
            </a>
          </div>
        </div>
        <div className="c5">
          <Figure name="steps" names={(c) => c} label="A stair of five treads. The tread under the pointer lifts." ratio="5 / 4" />
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Connected />
      <Lifecycle />
      <Foundation />
      <Logic />
      <Applications />
      <CloudSection />
      <Africa />
      <Developers />
      <Closing />
    </>
  );
}
