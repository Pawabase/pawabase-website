import { Reveal, WordReveal } from "../lib";

const NEEDS = ["Accounts", "Permissions", "Records", "Files", "Realtime", "Background work", "Schedules", "Webhooks", "Mail", "API docs"];

export function Proposition() {
  return (
    <section className="prop" id="proposition" aria-labelledby="prop-title">
      <div className="prop-grid">
        <div className="prop-text">
          <h2 id="prop-title" className="sr-only">Your product should start with the backend already connected.</h2>
          <WordReveal className="prop-statement display" text="Your product needs more than a database. Accounts. Permissions. Records. Files. Realtime. Work that finishes after the response. Pawabase provides them from the same project, so your team can begin with the part customers actually came for." />
        </div>
        <Reveal kind="mask" className="prop-figure">
          <img src="/media/connected-system.webp" width="1200" height="1200" alt="Glass blocks stacked on a platform, joined by fine lines to smaller platforms around it" loading="lazy" />
          <p className="prop-caption"><b>One project.</b> Database, identity, storage and runtime included.</p>
        </Reveal>
      </div>
      <div className="prop-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...NEEDS, ...NEEDS].map((n, i) => <span key={i}>{n}</span>)}
        </div>
      </div>
      <p className="sr-only">What every product ends up needing: {NEEDS.join(", ")}.</p>
    </section>
  );
}
