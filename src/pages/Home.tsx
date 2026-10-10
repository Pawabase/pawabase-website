import { Link } from "@tanstack/react-router";
import { Code } from "../components/Code";
import { Figure } from "../components/Figure";
import { ArrowRight } from "../components/Icons";
import { docs, github } from "../config";

const Arrow = ({ to, href, children }: { to?: string; href?: string; children: string }) =>
  to ? (
    <Link className="arrow" to={to}>
      {children} <ArrowRight />
    </Link>
  ) : (
    <a className="arrow" href={href}>
      {children} <ArrowRight />
    </a>
  );

/* ────────────────────────────── 1 · hero ────────────────────────────── */

const cells = [
  { key: "auth", name: "Auth", figure: "session", text: "Sign-in, second factor, organizations and roles, read by every policy.", to: "/products/auth", span: 5, tone: "white" },
  { key: "database", name: "Database", figure: "records", text: "Define a table once. Get validation, policies and a REST API.", to: "/products/database", span: 4, tone: "canvas" },
  { key: "storage", name: "Storage", figure: "bucket", text: "Files behind the same policies as your records.", to: "/products/storage", span: 3, tone: "canvas" },
  { key: "functions", name: "Functions", figure: "workers", text: "Python beside your data, deployed from your repository.", to: "/products/functions", span: 3, tone: "white" },
  { key: "automation", name: "Automation", figure: "steps", text: "Flows, events and schedules, with retries and a record of every run.", to: "/products/automation", span: 5, tone: "white" },
  { key: "cloud", name: "Cloud", figure: "rack", text: "Managed projects, each its own installation.", to: "/cloud", span: 4, tone: "lavender" },
] as const;

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
      <div className="wrap">
        <div className="hero-top">
          <h1 id="hero-title" className="display">
            Everything your application needs, in one place.
          </h1>
          <div className="hero-side">
            <p className="lede">Identity, data, files, logic and automation in one runtime. Managed, or on your own servers.</p>
            <div className="actions">
              <a className="btn btn-primary" href={docs("quickstart")}>
                Start building
              </a>
              <Link className="btn" to="/cloud">
                Explore Cloud
              </Link>
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
              <Arrow to={c.to}>{`Explore ${c.name}`}</Arrow>
            </header>
            <div className="cell-fig">
              <Figure name={c.figure} names={(t) => t} label={`An illustration for ${c.name}.`} ratio="5 / 4" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 2 · one connected platform ───────────────────────── */

function Connected() {
  return (
    <section id="platform" className="section" aria-labelledby="platform-title">
      <i className="fx dots patch tl" aria-hidden="true" />
      <div className="wrap">
        <div className="center">
          <h2 id="platform-title" className="h1">
            One platform, not a pile of services.
          </h2>
          <p className="lede">A request is authenticated once, authorized by one policy language and recorded once.</p>
        </div>
        <div className="stage wide">
          <Figure name="schema" names={(c) => c} label="Tiles joined by links. The tile under the pointer rises, and every tile that refers to it rises after it." ratio="5 / 4" />
          <p className="small stage-note">Point at a tile. What depends on it rises with it.</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3 · from idea to running software ───────────────────────── */

function Lifecycle() {
  return (
    <section id="build" className="section alt flush" aria-labelledby="build-title">
      <div className="wrap">
        <h2 id="build-title" className="h1" style={{ maxWidth: "16ch" }}>
          From the first definition to a running application.
        </h2>
      </div>
      <div className="trio">
        <article>
          <h3 className="h3">Describe it as data.</h3>
          <p className="body">Resources, policies, flows and schedules are definitions you can export as a blueprint.</p>
        </article>
        <article>
          <h3 className="h3">Try it beside what is live.</h3>
          <p className="body">Deploy to a branch next to main, and run locally against a real deployment.</p>
        </article>
        <article>
          <h3 className="h3">Read back what happened.</h3>
          <p className="body">Requests, runs, jobs and deliveries are recorded with their traces.</p>
        </article>
      </div>
    </section>
  );
}

/* ───────────────────────── 4 · the application foundation ───────────────────────── */

function Foundation() {
  return (
    <section id="foundation" className="section" aria-labelledby="foundation-title">
      <i className="fx ticks strip-h tl" aria-hidden="true" />
      <div className="wrap split">
        <div className="c7">
          <div className="stage">
            <Figure name="foundation" names={(c) => c} label="Four layers a request meets: identity, policy, records and files. The pointer's height picks one and the layers above it lift away." ratio="5 / 4" />
            <p className="small stage-note">Move down the stack to open a layer.</p>
          </div>
        </div>
        <div className="c5 stack" style={{ ["--gap" as string]: "20px" }}>
          <h2 id="foundation-title" className="h1">
            The foundation every request passes through.
          </h2>
          <dl className="kv">
            <div><dt>Identity</dt><dd>Who is calling. <Link to="/products/auth">Auth</Link></dd></div>
            <div><dt>Policy</dt><dd>What they may do, in one condition language.</dd></div>
            <div><dt>Records</dt><dd>Typed tables and a generated API. <Link to="/products/database">Database</Link></dd></div>
            <div><dt>Files</dt><dd>Buckets under the same rules. <Link to="/products/storage">Storage</Link></dd></div>
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
      <i className="fx rings big tr" aria-hidden="true" />
      <div className="wrap">
        <div className="split">
          <div className="c5 stack" style={{ ["--gap" as string]: "18px" }}>
            <h2 id="logic-title" className="h1">
              Application behavior without a second infrastructure.
            </h2>
            <p className="lede">An event happens. A flow, a function, a job or a webhook reacts, on a queue, with retries.</p>
            <div className="actions">
              <Arrow to="/products/functions">Functions</Arrow>
              <Arrow to="/products/automation">Automation</Arrow>
            </div>
          </div>
          <div className="c7">
            <Code lang="python" caption="A function: a transaction and an event." source="pawabase-docs, Code › Functions">
              {ORDERS_PAY}
            </Code>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6 · built for real applications ───────────────────────── */

const patterns = [
  { title: "Products with customers and teams", text: "Organizations, roles and invitations, readable in every policy.", link: ["/products/auth", "Auth"] },
  { title: "Marketplaces and commerce", text: "Orders, payments and verified payment webhooks. Sell4me, the reference backend, is 54 resources and 43 flows.", link: ["/products/database", "Database"] },
  { title: "Internal business tools", text: "Every resource is editable in Studio the moment it exists.", link: ["/products/database", "Database"] },
  { title: "Operational systems", text: "Reports, imports and reminders on queues and schedules.", link: ["/products/automation", "Automation"] },
] as const;

function Applications() {
  return (
    <section id="applications" className="section" aria-labelledby="applications-title">
      <i className="fx dots patch tr" aria-hidden="true" />
      <div className="wrap">
        <div className="center">
          <h2 id="applications-title" className="h1">
            Built for real applications.
          </h2>
          <p className="lede">Patterns Pawabase was designed around. Not customers.</p>
        </div>
        <div className="ledger card-list">
          {patterns.map((p) => (
            <article key={p.title} className="ledger-row">
              <h3 className="h3">{p.title}</h3>
              <p className="body">{p.text}</p>
              <Arrow to={p.link[0]}>{p.link[1]}</Arrow>
            </article>
          ))}
        </div>
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
          <h2 id="cloud-title" className="h1">
            Pawabase Cloud runs it for you.
          </h2>
          <p className="lede">Create a project by name. Each one is its own Pawabase installation with its own database.</p>
          <p className="small">Pre-launch. Plans and regions are published as they open.</p>
          <div className="actions">
            <Link className="btn btn-primary" to="/cloud">
              Explore Cloud
            </Link>
          </div>
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
            <p className="small stage-note">One site is open. The dashed footprints are not published.</p>
          </div>
        </div>
        <div className="c5 stack" style={{ ["--gap" as string]: "18px" }}>
          <h2 id="africa-title" className="h1">
            Infrastructure for African markets.
          </h2>
          <p className="lede">Cloud runs in Nigeria and bills in naira through Paystack. Other regions are planned, not published, and no compliance claim is made.</p>
          <div className="actions">
            <Arrow to="/cloud">Regions and billing</Arrow>
          </div>
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
      <i className="fx ticks strip-h bl" aria-hidden="true" />
      <div className="wrap split top">
        <div className="c5 stack" style={{ ["--gap" as string]: "22px" }}>
          <h2 id="developers-title" className="h1">
            Fits the way a team already works.
          </h2>
          <p className="lede">Code in your repository, tests that run without a server, and the same software managed or self-hosted.</p>
          <Code lang="bash" caption="The command line." source="pawabase-docs, Code › CLI">
            {CLI}
          </Code>
          <div className="actions">
            <a className="btn btn-primary" href={docs("quickstart")}>
              Read the quickstart
            </a>
            <a className="btn" href={docs("self-hosting/docker-compose")}>
              Self-host
            </a>
            <a className="btn" href={github}>
              GitHub
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
      <i className="fx hatch patch br" aria-hidden="true" />
      <div className="wrap split">
        <div className="c7 stack" style={{ ["--gap" as string]: "28px" }}>
          <h2 id="closing-title" className="display">
            Start with one project. The rest is already in it.
          </h2>
          <div className="actions">
            <a className="btn btn-primary" href={docs("quickstart")}>
              Start building
            </a>
            <Link className="btn" to="/cloud">
              Explore Cloud
            </Link>
            <a className="btn" href={docs("index")}>
              Documentation
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
