import { Mascot } from "../components/Mascot";
import { Reveal, useScrollProgress } from "../lib";

export function Interlude() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="inter" aria-labelledby="inter-title">
      <div className="inter-world" aria-hidden="true"><img src="/images/world/nightfall.webp" alt="" loading="lazy" /></div>
      <div className="inter-shade" aria-hidden="true" />
      <div className="inter-stars" aria-hidden="true" />
      <div className="inter-copy">
        <Reveal as="h2" className="display"><span id="inter-title">Add users, rules and integrations without rebuilding the backend.</span></Reveal>
        <Reveal as="p" delay={120}>Your data model, access policies, functions and workflows evolve in the same project.</Reveal>
      </div>
      <Mascot pose="signal" className="inter-mascot" decorative />
    </section>
  );
}
