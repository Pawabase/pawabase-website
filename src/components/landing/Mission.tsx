import { useEffect, useRef } from "react";

import { SiFlutter, SiNextdotjs, SiPython, SiReact, SiSwift, SiVuedotjs } from "@icons-pack/react-simple-icons";

import { Icon, type IconName } from "@/components/Icon";

import { Junctions } from "./Junctions";

/* The Orange Planet mark, in its 256-unit square (a circle of radius 112 at 128, 128). It stays still in front of a
   turning globe of dots: dots inside the upper shape light orange, dots inside the crescent light amber, dots in the
   sweeping gap stay dark. */
const UPPER = "M43.54554 201.56252A112 112 0 1 1 237.58751 104.87909C157.87944 101.37044 84.49478 152.70781 43.54554 201.56252Z";
const LOWER = "M239.68196 119.56555A112 112 0 0 1 85.38303 231.57507C107.48096 166.78947 160.36086 120.94921 239.68196 119.56555Z";

/** Points spread evenly over a sphere (a Fibonacci lattice). */
function lattice(count: number) {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

/** The globe: drawn on a canvas, turning slowly while it is on screen (still for reduced motion). */
export function DotGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return undefined;
    const ctx = el.getContext("2d");
    if (!ctx) return undefined;
    const points = lattice(8000);
    // nodes (latitude, longitude in degrees) and the arcs between them
    const NODES: [number, number][] = [
      [6.5, 3.4], [51.5, -0.1], [40.7, -74], [1.3, 103.8], [-33.9, 18.4], [35.7, 139.7], [52.5, 13.4], [-23.5, -46.6],
      [19.4, -99.1], [25.2, 55.3], [-1.3, 36.8], [37.8, -122.4], [-33.9, 151.2], [28.6, 77.2], [59.3, 18.1], [30.0, 31.2],
    ];
    const toVec = ([lat, lon]: [number, number]): [number, number, number] => {
      const a = (lat * Math.PI) / 180, b = (lon * Math.PI) / 180;
      return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)];
    };
    const nodes = NODES.map(toVec);
    let time = 0;
    const upper = new Path2D(UPPER);
    const lower = new Path2D(LOWER);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let angle = 0.6;
    let visible = false;

    const resize = () => {
      const box = el.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      el.width = Math.round(width * ratio);
      el.height = Math.round(height * ratio);
    };

    const draw = () => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      // the globe is wider than the panel and cropped by its lower edge, as the section's frame
      const radius = Math.min(width * 0.32, height * 0.56);
      const cx = width / 2;
      const cy = height * 0.64;
      const tilt = -0.32;
      const scale = 224 / (radius * 2); // screen → the mark's units
      const sin = Math.sin(angle), cos = Math.cos(angle), st = Math.sin(tilt), ct = Math.cos(tilt);
      /** A point on (or above, for lift > 1) the sphere, turned and tilted, then put on screen. */
      const project = ([x0, y0, z0]: [number, number, number], lift = 1) => {
        const x1 = x0 * cos - z0 * sin;
        const z1 = x0 * sin + z0 * cos;
        const y2 = y0 * ct - z1 * st;
        const z2 = y0 * st + z1 * ct;
        return { x: cx + x1 * radius * lift, y: cy - y2 * radius * lift, z: z2 };
      };
      for (const [x0, y0, z0] of points) {
        // turn around the vertical axis, then tilt toward the viewer
        const x1 = x0 * cos - z0 * sin;
        const z1 = x0 * sin + z0 * cos;
        const y2 = y0 * ct - z1 * st;
        const z2 = y0 * st + z1 * ct;
        const px = cx + x1 * radius;
        const py = cy - y2 * radius;
        if (py > height + 4 || py < -4) continue;
        const front = z2 > 0;
        const depth = (z2 + 1) / 2; // 0 at the back, 1 facing us
        // where this dot falls on the mark (the mark is centered on the globe)
        const mx = 128 + (px - cx) * scale;
        const my = 128 + (py - cy) * scale;
        let color: string;
        let size: number;
        if (front && ctx.isPointInPath(lower, mx, my)) {
          color = `rgba(255, 210, 122, ${0.3 + depth * 0.7})`;
          size = 0.55 + depth * 1.15;
        } else if (front && ctx.isPointInPath(upper, mx, my)) {
          color = `rgba(255, 106, 0, ${0.25 + depth * 0.75})`;
          size = 0.5 + depth * 1.1;
        } else if (front) {
          color = `rgba(243, 240, 235, ${0.06 + depth * 0.12})`; // the sweeping gap, and the rim
          size = 0.45 + depth * 0.55;
        } else {
          color = `rgba(243, 240, 235, ${0.03 + depth * 0.04})`;
          size = 0.4;
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // the nodes: a bright point with a ring that widens and fades
      nodes.forEach((node, index) => {
        const point = project(node);
        if (point.z <= 0.05) return;
        const pulse = (time * 0.5 + index * 0.21) % 1;
        ctx.strokeStyle = `rgba(255, 106, 0, ${(1 - pulse) * 0.8 * point.z})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(point.x, point.y, 4 + pulse * 16, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#FFD27A";
        ctx.beginPath(); ctx.arc(point.x, point.y, 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#111214";
        ctx.beginPath(); ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2); ctx.fill();
      });
    };

    let odd = false;
    const tick = () => {
      odd = !odd;
      if (odd) { angle += 0.0032; time += 1 / 30; draw(); } // 30 frames a second is plenty for a slow turn
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reduced) frame = requestAnimationFrame(tick);
      else draw();
    });
    const onResize = () => { resize(); draw(); };
    resize();
    draw();
    observer.observe(el);
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvas} className="mission-globe" aria-hidden="true" />;
}

/** Any app: the clients around the planet, each wired to the one backend at its center (positions in % of the band). */
const CLIENTS = [
  { name: "React", Mark: SiReact, x: 15, y: 24 },
  { name: "Next.js", Mark: SiNextdotjs, x: 9, y: 54 },
  { name: "Swift", Mark: SiSwift, x: 19, y: 82 },
  { name: "Flutter", Mark: SiFlutter, x: 85, y: 22 },
  { name: "Vue", Mark: SiVuedotjs, x: 91, y: 52 },
  { name: "Python", Mark: SiPython, x: 81, y: 80 },
];
const HUB = { x: 50, y: 40 };

/** The message over the globe: every client, on its own line, flowing into one Pawabase. */
function AnyApp() {
  return (
    <div className="mission-net" aria-hidden="true">
      <svg className="mission-wires" viewBox="0 0 100 100" preserveAspectRatio="none">
        {CLIENTS.map((client, i) => {
          const midX = (client.x + HUB.x) / 2;
          const d = `M ${client.x} ${client.y} C ${midX} ${client.y}, ${midX} ${HUB.y}, ${HUB.x} ${HUB.y}`;
          return (
            <g key={client.name}>
              <path d={d} className="mission-wire" pathLength={100} />
              <path d={d} className="mission-flow" pathLength={100} style={{ animationDelay: `${i * -0.45}s` }} />
            </g>
          );
        })}
      </svg>
      {CLIENTS.map(({ name, Mark, x, y }) => (
        <span key={name} className="mission-client" style={{ left: `${x}%`, top: `${y}%` }}>
          <Mark size={18} color="currentColor" />
          <span>{name}</span>
        </span>
      ))}
      <span className="mission-hub" style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}>
        <img src="/brand/mark.svg" width={30} height={30} alt="" />
      </span>
    </div>
  );
}

const CELLS: { icon: IconName; title: string; body: string }[] = [
  { icon: "database", title: "Build it once", body: "Data, rules, flows and agents live in one place, written once." },
  { icon: "automation", title: "Every team uses it", body: "Your apps read it, your team works in it, partners call it." },
  { icon: "sparkle", title: "Agents too", body: "Agents use the same data and the same rules as everyone else." },
];

export function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-title" data-plain="" className="relative">
      <div data-reveal="up" className="mx-auto flex max-w-[860px] flex-col items-center px-5 pb-[clamp(48px,6vw,80px)] pt-[clamp(72px,9vw,120px)] text-center">
        <h2 id="mission-title" className="m-0 text-[clamp(36px,4.6vw,60px)] font-medium leading-[1.04] tracking-[-0.035em] text-text">
          One system, every team
        </h2>
        <p className="m-0 mt-5 max-w-[600px] text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-muted">
          Whatever you're building, the apps, people and agents around it all work from the same system.
        </p>
      </div>

      {/* the globe: a band of its own, deeper in tone, ruled top and bottom, running between the rails */}
      <div className="mission-stage">
        <Junctions />
        <DotGlobe />
        <AnyApp />
        <Junctions edge="bottom" />
      </div>

      {/* the three cells: a band of their own, edge to edge between the rails */}
      <div
        className="mission-cells"
        onPointerMove={(event) => {
          const cell = (event.target as HTMLElement).closest<HTMLElement>(".mission-cell");
          if (!cell) return;
          const box = cell.getBoundingClientRect();
          cell.style.setProperty("--mx", `${event.clientX - box.left}px`);
          cell.style.setProperty("--my", `${event.clientY - box.top}px`);
        }}
      >
        {["c1", "c2"].map((at) => <span key={at} aria-hidden="true" className={`mission-handle ${at}`} />)}
        {CELLS.map((cell, index) => (
          <div key={cell.title} className="mission-cell">
            <span aria-hidden="true" className="bento-led" />
            <span aria-hidden="true" className="mission-cell-index">0{index + 1}</span>
            <span className="mission-cell-icon"><Icon name={cell.icon} size={22} variant="Linear" /></span>
            <h3>{cell.title}</h3>
            <p>{cell.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Folded into Mission: the page says this once. */
export function Pledge() {
  return null;
}
