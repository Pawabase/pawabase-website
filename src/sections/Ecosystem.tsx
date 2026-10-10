import { Reveal } from "../lib";
import { docs } from "../config";

const ITEMS = [
  { name: "Documentation", kind: "Docs", line: "Concepts, guides and reference for every part of the platform.", href: docs() },
  { name: "Quickstart", kind: "Docs", line: "A first project, from an empty environment to a working API.", href: docs("quickstart") },
  { name: "Self-hosting", kind: "Deploy", line: "Docker Compose, configuration, TLS, backups, upgrades and a production checklist.", href: docs("self-hosting/docker-compose") },
  { name: "JavaScript client", kind: "Client", line: "@pawabase/client: queries, auth and realtime for browsers and servers.", href: docs("clients/javascript") },
  { name: "Python package", kind: "Client", line: "pawabase: write functions, emulate them locally, deploy and trigger.", href: docs("code/cli") },
  { name: "React guide", kind: "Client", line: "Wiring sign-in and data into a React application.", href: docs("clients/react") },
  { name: "Mobile guide", kind: "Client", line: "Calling Pawabase from iOS, Android and cross-platform apps over REST.", href: docs("clients/mobile") },
  { name: "How it compares", kind: "Docs", line: "Honest comparisons with Supabase and Firebase, including when not to use Pawabase.", href: docs("compare/overview") },
] as const;

export function Ecosystem() {
  return (
    <section className="eco" id="ecosystem" aria-labelledby="eco-title">
      <div className="eco-wrap">
        <div className="eco-head">
          <Reveal as="h2" delay={60} className="display"><span id="eco-title">Docs, clients and deployment guides.</span></Reveal>
          <Reveal as="p" delay={120}>Set up a project, connect an application, write a function and prepare a production deployment.</Reveal>
          <a className="link-arrow" href={docs()}>Explore the documentation <span aria-hidden="true">→</span></a>
        </div>
        <ul className="eco-list">
          {ITEMS.map((it, i) => (
            <Reveal as="li" key={it.name} delay={i * 45}>
              <a href={it.href}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{it.name}</span>
                <span className="k">{it.kind}</span>
                <span className="l">{it.line}</span>
                <span className="a" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
