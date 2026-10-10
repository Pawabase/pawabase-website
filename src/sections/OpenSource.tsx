import { Reveal } from "../lib";
import { github } from "../config";

const REPOS = [
  { name: "pawabase", line: "The platform: Studio, the gateway and the services behind them." },
  { name: "pawabase-docs", line: "The documentation, written in the open." },
  { name: "pawabase-js", line: "The JavaScript client." },
  { name: "pawabase-python", line: "The Python package for functions and the CLI." },
  { name: "pawabase-website", line: "This website." },
];

export function OpenSource() {
  return (
    <section className="open" id="open" aria-labelledby="open-title">
      <div className="open-wrap">
        <Reveal kind="fade" className="open-card">
          <div className="gh-bar mono"><span className="dots" aria-hidden="true"><i /><i /><i /></span><span>github.com/Pawabase/pawabase</span><span className="pub">Public</span></div>
          <p className="gh-desc">The backend platform behind Pawabase Cloud and self-hosted deployments.</p>
          <ul className="repos">
            {REPOS.map(r => <li key={r.name}><a href={`${github.replace(/\/pawabase$/, "")}/${r.name}`}><b className="mono">{r.name}</b><span>{r.line}</span><i aria-hidden="true">↗</i></a></li>)}
          </ul>
        </Reveal>
        <div className="open-copy">
          <Reveal as="h2" delay={60} className="display"><span id="open-title">Read the code. Run it anywhere.</span></Reveal>
          <Reveal as="p" delay={120}>Studio, the API gateway, runtime, clients and documentation are developed in public repositories. Use Pawabase Cloud, deploy it yourself, inspect the code or extend components when your application needs it.</Reveal>
          <Reveal as="div" delay={180} className="open-actions">
            <a className="btn btn-ink" href={github}>Explore the source <span aria-hidden="true">↗</span></a>
            <a className="link-arrow" href={`${github}/issues`}>Join the community <span aria-hidden="true">→</span></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
