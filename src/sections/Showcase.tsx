import { useEffect, useRef, useState } from "react";
import { Reveal, useInView, usePrefersReducedMotion } from "../lib";
import { docs } from "../config";

const VIEWS = [
  { key: "overview", name: "Overview", image: "overview", alt: "Pawabase Studio overview: requests, error rate, latency and flow runs for an environment", line: "Traffic, latency and automation runs for the environment you are looking at." },
  { key: "resources", name: "Resources", image: "resources", alt: "Pawabase Studio resources list for a commerce backend", line: "Tables served as REST at /rest/v1/<name>, guarded per operation by policies." },
  { key: "policies", name: "Policies", image: "policies", alt: "A named access policy being configured in Pawabase Studio", line: "Named conditions. Equality checks are pushed down to SQL, so filtered lists stay paginated." },
  { key: "flows", name: "Flows", image: "flows", alt: "The Pawabase flow editor showing a report-generation workflow", line: "Backend logic you can follow: triggers, steps, and an error path on every block." },
  { key: "api", name: "API reference", image: "api", alt: "The generated API reference for a Pawabase environment", line: "Interactive API documentation, generated for every environment." },
] as const;

export function Showcase() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduced = usePrefersReducedMotion();
  const [stageRef, visible] = useInView<HTMLDivElement>();
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || touched || !visible) return;
    const t = setInterval(() => setActive(a => (a + 1) % VIEWS.length), 5200);
    return () => clearInterval(t);
  }, [reduced, touched, visible]);

  const pick = (i: number) => { setTouched(true); setActive(i); };
  const onMove = (e: React.PointerEvent) => {
    const el = tilt.current;
    if (!el || reduced || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -5}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`);
  };
  const onLeave = () => { tilt.current?.style.removeProperty("--rx"); tilt.current?.style.removeProperty("--ry"); };

  return (
    <section className="show" id="studio" aria-labelledby="show-title">
      <div className="show-aura" aria-hidden="true" />
      <div className="show-head">
        <Reveal as="h2" delay={80} className="display" ><span id="show-title">A backend you can see.</span></Reveal>
        <Reveal as="p" delay={160} className="show-sub">Design data, manage access, follow workflows and inspect requests from one workspace. Studio keeps the entire backend visible to the people building it.</Reveal>
      </div>

      <div className="show-stage" ref={stageRef}>
        <ol className="show-tabs" aria-label="Studio views">
          {VIEWS.map((v, i) => (
            <li key={v.key}>
              <button className={i === active ? "on" : ""} aria-pressed={i === active} onClick={() => pick(i)}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{v.name}</span>
                <span className="bar" aria-hidden="true"><i style={i === active && !touched && !reduced && visible ? { animation: "fill 5.2s linear" } : undefined} /></span>
              </button>
            </li>
          ))}
        </ol>

        <div className="show-window-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className="show-ghost g1" aria-hidden="true"><img src="/media/studio/policies.webp" alt="" loading="lazy" /></div>
          <div className="show-ghost g2" aria-hidden="true"><img src="/media/studio/api.webp" alt="" loading="lazy" /></div>
          <div className="show-window" ref={tilt}>
            {VIEWS.map((v, i) => (
              <img key={v.key} className={i === active ? "on" : ""} src={`/media/studio/${v.image}.webp`} width="1440" height="900" alt={i === active ? v.alt : ""} aria-hidden={i === active ? undefined : true} loading={i === 0 ? "eager" : "lazy"} />
            ))}
          </div>
          <p className="show-caption" aria-live="polite"><b>{VIEWS[active].name}.</b> {VIEWS[active].line}</p>
        </div>
      </div>
      <p className="show-foot"><a className="link-arrow" href={docs("concepts/studio")}>Explore everything you can do in Studio</a></p>
    </section>
  );
}
