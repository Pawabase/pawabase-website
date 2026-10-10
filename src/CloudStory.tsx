import { Mascot } from "./components/Mascot";
import { docs } from "./config";
import { Icon } from "./components/Primitives";

const pillars = [
  ["01", "Data that knows where it belongs.", "Model resources on Postgres, SQLite or MySQL and serve generated REST endpoints with filters, sorting and pagination."],
  ["02", "Identity at every door.", "Users, sessions, OAuth, magic links, MFA, roles, permissions and organizations share the same policies."],
  ["03", "Files with a way home.", "Buckets have their own read and write policies, signed URLs and support for local disk or S3-compatible storage."],
  ["04", "The system stays in motion.", "Realtime channels, presence, history, events, queues, workers and schedules live beside your API."],
];

export function CloudStory() {
  return <div className="cloud-story">
    <section className="cs-opening">
      <div className="cs-opening-copy"><p className="cs-kicker">A FOUNDATION FOR APPLICATION WORK</p><h2>Start with the backend work your product will <em>need anyway.</em></h2><p>Accounts, records, files, APIs, background work, and application events are common parts of serious software. Pawabase provides the foundation; your team implements the requirements that make the product useful.</p></div>
      <div className="cs-opening-art"><span /><span /><Mascot pose="server" decorative /></div>
    </section>

    <section className="cs-pillars" aria-label="Pawabase building blocks">{pillars.map(([number, title, body], i) => <article key={number} className={`cs-pillar p${i + 1}`}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div>{i === 1 && <Mascot pose="signal" decorative />}</article>)}</section>

    <section className="cs-world"><img src="/images/world/cloud-kingdom-nightfall.png" alt="Floating Cloud Kingdom infrastructure at nightfall" /><div className="cs-world-copy"><p className="cs-kicker">THE CLOUD KINGDOM RUNS QUIETLY</p><h2>Build the product.<br /><em>Keep the system close.</em></h2><p>Requests, policies, events and background work share the same project instead of separate services you have to maintain.</p><a href={docs("quickstart")}>Explore the quickstart <Icon name="arrow" /></a></div><Mascot pose="laptop" className="cs-world-mascot" decorative /></section>

    <section className="cs-studio"><div className="cs-studio-heading"><p className="cs-kicker">CONFIGURE AND INSPECT THE BACKEND</p><h2>See the moving parts without losing the plot.</h2><p>Resources, identity, policies, flows, request logs and operational details stay visible in one workspace.</p></div><figure className="cs-console"><img src="/media/overview.webp" width="1440" height="900" alt="Pawabase Studio overview" /><figcaption>Pawabase Studio overview</figcaption></figure></section>

    <section className="cs-close"><Mascot pose="signal" decorative /><p className="cs-kicker">READY WHEN YOU ARE</p><h2>Give your product a backend<br /><em>already connected.</em></h2><p>Start with a resource and an API key. Add exactly what the product needs as it grows.</p><a className="button" href={docs("installation/docker")}>Start building <Icon name="arrow" /></a></section>
  </div>;
}
