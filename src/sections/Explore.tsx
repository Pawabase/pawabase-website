import { useState } from "react";
import { Reveal } from "../lib";
import { docs, github } from "../config";

const PATHS = [
  { key: "start", name: "Start building", lead: "Connect an application to Pawabase with the JavaScript client.", doc: "quickstart", cta: "Follow the quickstart",
    code: `npm install @pawabase/client` },
  { key: "read", name: "Explore it", lead: "See how the platform fits together before you build.", doc: "concepts/mental-model", cta: "Explore the platform", code: "" },
  { key: "extend", name: "Extend it", lead: "Write a function, run it locally, deploy it.", doc: "code/cli", cta: "Read the CLI guide",
    code: `pip install pawabase
pawabase init
pawabase emulate --watch
pawabase deploy` },
  { key: "deploy", name: "Deploy it", lead: "Run the complete platform in your own environment.", doc: "installation/docker", cta: "Explore self-hosted deployment",
    code: `git clone ${github}.git
cd pawabase
cp .env.example .env
docker compose up -d` },
] as const;

export function Explore() {
  const [on, setOn] = useState(0);
  const p = PATHS[on];
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(p.code); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard unavailable */ } };
  return (
    <section className="explore" id="explore" aria-labelledby="explore-title">
      <div className="explore-wrap">
        <Reveal as="h2" delay={60} className="display"><span id="explore-title">Choose how you want to begin.</span></Reveal>
        <div className="explore-body">
          <div className="explore-tabs" role="tablist" aria-label="Ways to start">
            {PATHS.map((x, i) => (
              <button key={x.key} role="tab" aria-selected={i === on} className={i === on ? "on" : ""} onClick={() => setOn(i)}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t">{x.name}</span>
              </button>
            ))}
          </div>
          <div className="explore-pane" role="tabpanel" key={p.key}>
            <p className="lead">{p.lead}</p>
            {p.code ? (
              <div className="term"><button className="copy" onClick={copy} aria-label="Copy commands">{copied ? "Copied" : "Copy"}</button><pre className="mono"><code>{p.code}</code></pre></div>
            ) : (
              <ul className="read-list">
                <li><a href={docs("concepts/mental-model")}><b>Mental model</b><span>How resources, policies, flows and functions relate.</span></a></li>
                <li><a href={docs("concepts/request-lifecycle")}><b>Request lifecycle</b><span>What happens between a client call and a response.</span></a></li>
                <li><a href={docs("compare/overview")}><b>Compared honestly</b><span>Where Pawabase fits, and where it does not.</span></a></li>
              </ul>
            )}
            <a className="link-arrow" href={docs(p.doc)}>{p.cta} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
