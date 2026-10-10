import { Link } from "@tanstack/react-router";
import GridMotion from "../components/GridMotion";
import { Code } from "../components/Code";
import { Diagram } from "../components/Diagrams";
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
  { key: "auth", name: "Auth", figure: "auth", text: "Sign-in, teams and roles your customers expect, ready in minutes.", to: "/products/auth", span: 5, tone: "white" },
  { key: "database", name: "Database", figure: "database", text: "Describe your data once and get a secure API for it.", to: "/products/database", span: 4, tone: "canvas" },
  { key: "storage", name: "Storage", figure: "storage", text: "Upload and share files under the same rules as your data.", to: "/products/storage", span: 3, tone: "canvas" },
  { key: "functions", name: "Functions", figure: "functions", text: "Write your own logic in Python and run it beside your data.", to: "/products/functions", span: 3, tone: "white" },
  { key: "automation", name: "Automation", figure: "automation", text: "Send the email, charge the card, sync the stock: automatically, every time.", to: "/products/automation", span: 5, tone: "white" },
  { key: "cloud", name: "Cloud", figure: "cloud", text: "Launch a project in a minute. We run it for you.", to: "/cloud", span: 4, tone: "lavender" },
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
          <Link className="eyebrow" to="/cloud">
            <i aria-hidden="true" />
            Pawabase Cloud is in pre-launch
            <ArrowRight />
          </Link>
          <h1 id="hero-title" className="display">
            Everything your application needs, in one place.
          </h1>
          <div className="hero-side">
            <p className="lede">Sign-in, database, files, background work and your own logic, ready from day one. Hosted by us, or run on your own servers.</p>
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
              <Diagram name={c.figure} label={`${c.name}, as the product shows it.`} />
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
      <div className="wrap">
        <div className="center">
          <h2 id="platform-title" className="h1">
            Build the product, not the plumbing.
          </h2>
          <p className="lede">Sign-in, data, files and background work arrive already connected, so your team spends its time on what makes your product yours.</p>
        </div>
        <div className="stage wide">
          <Figure name="schema" names={(c) => c} label="Tiles joined by links. The tile under the pointer rises, and every tile that refers to it rises after it." ratio="5 / 4" />
          <p className="small stage-note">Point at a piece to see what it connects to.</p>
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
          From idea to launch, without the detours.
        </h2>
      </div>
      <div className="trio">
        <article>
          <h3 className="h3">Start from a clear description.</h3>
          <p className="body">Describe your product's data and rules in plain definitions, and Pawabase sets everything up.</p>
        </article>
        <article>
          <h3 className="h3">Try changes safely.</h3>
          <p className="body">Test on a separate branch beside your live app, then ship when you are happy.</p>
        </article>
        <article>
          <h3 className="h3">Always know what happened.</h3>
          <p className="body">See every request, job and email that ran, and why, whenever something needs explaining.</p>
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
          <h2 id="foundation-title" className="h1">
            Secure by default, from the first request.
          </h2>
          <dl className="kv">
            <div><dt>Sign-in</dt><dd>Know who is using your app. <Link to="/products/auth">Auth</Link></dd></div>
            <div><dt>Permissions</dt><dd>Say who can see and change what, in plain conditions.</dd></div>
            <div><dt>Data</dt><dd>Tables and an API, generated for you. <Link to="/products/database">Database</Link></dd></div>
            <div><dt>Files</dt><dd>Stored and shared under the same rules. <Link to="/products/storage">Storage</Link></dd></div>
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
            <h2 id="logic-title" className="h1">
              Your business logic, without another server.
            </h2>
            <p className="lede">When something happens in your app, Pawabase reacts: send the receipt, update the record, tell your partner. Retried automatically if it fails.</p>
            <div className="actions">
              <Arrow to="/products/functions">Functions</Arrow>
              <Arrow to="/products/automation">Automation</Arrow>
            </div>
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

const patterns = [
  { title: "Apps with customers and teams", text: "Accounts, organizations and roles, ready to use.", link: ["/products/auth", "Auth"] },
  { title: "Marketplaces and shops", text: "Orders, payments and confirmations, handled. Sell4me, our reference store, is built on it.", link: ["/products/database", "Database"] },
  { title: "Internal tools", text: "Manage your data in Studio the moment it exists.", link: ["/products/database", "Database"] },
  { title: "Day-to-day operations", text: "Reports, imports and reminders that run on schedule.", link: ["/products/automation", "Automation"] },
] as const;

function Applications() {
  return (
    <section id="applications" className="section" aria-labelledby="applications-title">
      <div className="wrap">
        <div className="center">
          <h2 id="applications-title" className="h1">
            Made for the products you are building.
          </h2>
          <p className="lede">From customer apps to internal tools.</p>
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
            Let us run it for you.
          </h2>
          <p className="lede">Create a project and get your own complete backend with its own database. No servers to set up.</p>
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
            <p className="small stage-note">Lagos is open. The dashed sites are not published yet.</p>
          </div>
        </div>
        <div className="c5 stack" style={{ ["--gap" as string]: "18px" }}>
          <h2 id="africa-title" className="h1">
            Built for African businesses.
          </h2>
          <p className="lede">Pawabase Cloud runs in Nigeria and bills in naira through Paystack. More regions are planned; none is promised until it opens.</p>
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
      <div className="wrap split top">
        <div className="c5 stack" style={{ ["--gap" as string]: "22px" }}>
          <h2 id="developers-title" className="h1">
            Fits how your team already works.
          </h2>
          <p className="lede">Keep your code in your repository, test without a server, and move between our cloud and your own servers when you choose.</p>
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
