import { Reveal, useScrollProgress } from "../lib";
import { dashboard, docs } from "../config";

const TAGS = [
  { k: "Your database", x: 57, y: 63 },
  { k: "Your Redis", x: 43, y: 40 },
  { k: "Your object storage", x: 29, y: 22 },
  { k: "Your SMTP", x: 12, y: 54 },
  { k: "Your OAuth credentials", x: 71, y: 82 },
];
const NODE = { x: 83, y: 28 };

export function Ownership() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="own" id="ownership" aria-labelledby="own-title">
      <div className="own-head">
        <Reveal as="h2" delay={60} className="display"><span id="own-title">Managed or self-hosted. Your choice.</span></Reveal>
        <Reveal as="p" delay={120}>Start in Pawabase Cloud when you want a managed path from project to backend. Deploy in your own environment when you need more control. Studio, APIs, policies, flows and code work the same way in either setup.</Reveal>
      </div>
      <div className="own-stage">
        <div className="own-img" aria-hidden="true"><img src="/images/world/infrastructure.webp" alt="" loading="lazy" /></div>
        <svg className="own-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {TAGS.map(t => <path key={t.k} d={`M ${t.x} ${t.y} C ${t.x + 8} ${t.y - 14}, ${NODE.x - 14} ${NODE.y + 10}, ${NODE.x} ${NODE.y}`} />)}
        </svg>
        {TAGS.map((t, i) => <span key={t.k} className="own-tag" style={{ left: `${t.x}%`, top: `${t.y}%`, animationDelay: `${i * -1.3}s` }}><i />{t.k}</span>)}
        <span className="own-node" style={{ left: `${NODE.x}%`, top: `${NODE.y}%` }}>Pawabase</span>
      </div>
      <ul className="own-list">
        <li><b>Managed when you want it.</b><span>Create a cloud project and manage the entire backend from Studio.</span></li>
        <li><b>Deploy where you need it.</b><span>Run the complete stack with your database, Redis, object storage, SMTP and OAuth credentials.</span></li>
        <li><b>One operating model.</b><span>Keep the same APIs, policies and developer workflow across environments.</span></li>
      </ul>
      <p className="own-foot"><a className="link-arrow" href={dashboard || docs("installation/docker")}>{dashboard ? "Open Pawabase Cloud" : "Explore deployment options"} <span aria-hidden="true">→</span></a></p>
    </section>
  );
}
