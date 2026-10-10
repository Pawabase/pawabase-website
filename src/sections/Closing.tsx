import { Mascot } from "../components/Mascot";
import { Brand, Icon } from "../components/Primitives";
import { Reveal, useScrollProgress } from "../lib";
import { dashboard, docs, github } from "../config";

export function Closing() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <footer ref={ref} className="close">
      <div className="close-world" aria-hidden="true"><img src="/images/world/hero.webp" alt="" loading="lazy" /></div>
      <div className="close-shade" aria-hidden="true" />
      <div className="close-main">
        <Reveal as="h2" className="display"><span>Your next product already has a backend.</span></Reveal>
        <Reveal as="div" delay={140} className="close-actions">
          <a className="btn btn-light" href={dashboard || docs("quickstart")}>{dashboard ? "Open Pawabase" : "Start building"} <Icon name="arrow" /></a>
          <a className="btn btn-ghost" href={docs("quickstart")}>Read the quickstart</a>
        </Reveal>
      </div>
      <Mascot pose="server" className="close-mascot" decorative />
      <div className="close-foot">
        <div className="foot-brand"><Brand /><p>Database, auth, storage, realtime and workflows.</p></div>
        <nav aria-label="Footer"><h3>Platform</h3><a href="#studio">Studio</a><a href="#platform">Capabilities</a><a href="#build">Solutions</a><a href="#ownership">Deployment</a></nav>
        <nav aria-label="Developers"><h3>Developers</h3><a href={docs()}>Documentation</a><a href={docs("quickstart")}>Quickstart</a><a href={docs("clients/overview")}>Clients</a><a href={docs("code/cli")}>CLI</a></nav>
        <nav aria-label="Community"><h3>Community</h3><a href={github}>GitHub</a><a href={`${github}/issues`}>Issues</a><a href={`${github}-docs`}>Docs repository</a></nav>
        <p className="legal">© {new Date().getFullYear()} Pawabase</p>
        <div className="close-word" aria-hidden="true">pawabase</div>
      </div>
    </footer>
  );
}
