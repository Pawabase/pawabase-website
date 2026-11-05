import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { SiClaude, SiCursor } from "@icons-pack/react-simple-icons";

import { Icon, type IconName } from "@/components/Icon";

import { Rule, SectionHead } from "./Home";
import "./story.css";

/*
 * A scroll story: the steps are a sticky list on the left; on the right each step has a dotted block holding a
 * dark card that runs off the rail and the block's bottom. The step whose block crosses the middle of the window
 * is the open one: its card brightens and a cursor picks through its options. An orange line down the divider
 * shows how far through the section you are. Every option shown is real: the field types, the flow triggers, the
 * ways AI tools connect.
 */

type Option = { mark: ReactNode; name: string; line: string };
type Step = { title: string; line: string; card: string; hint: string; options: Option[] };

const glyph = (text: string) => <span className="rp-glyph">{text}</span>;
const icon = (name: IconName) => <Icon name={name} size={20} variant="Linear" />;

const STEPS: Step[] = [
  {
    title: "Shape your data",
    line: "Sixteen field types, from text to vectors.",
    card: "New column · Type",
    hint: "Choose what this column holds.",
    options: [
      { mark: glyph("Aa"), name: "Text", line: "Short names or long passages." },
      { mark: glyph("123"), name: "Number", line: "Whole numbers or decimals." },
      { mark: glyph("Y/N"), name: "Yes or no", line: "A simple on or off." },
      { mark: icon("scheduling"), name: "Date and time", line: "A day, or an exact moment." },
      { mark: glyph("@"), name: "Email", line: "Checked to look like an address." },
      { mark: glyph("{ }"), name: "JSON", line: "Free-form objects and lists." },
      { mark: glyph("→"), name: "Relation", line: "Points at a record in another table." },
      { mark: glyph("[ … ]"), name: "Vector", line: "Embeddings for similarity search." },
    ],
  },
  {
    title: "Automate anything",
    line: "Eight ways to start a flow.",
    card: "New flow · Trigger",
    hint: "Choose what starts this flow.",
    options: [
      { mark: icon("code"), name: "HTTP request", line: "When one of your routes is called." },
      { mark: icon("events"), name: "Event", line: "When something happens in the system." },
      { mark: icon("database"), name: "Resource change", line: "When a record is added, changed or removed." },
      { mark: icon("scheduling"), name: "Schedule", line: "On a timetable you set." },
      { mark: icon("webhooks"), name: "Inbound webhook", line: "When another service calls in." },
      { mark: icon("realtime"), name: "Realtime message", line: "When a message lands on a channel." },
      { mark: icon("queues"), name: "Background job", line: "Work after the response, with retries." },
      { mark: icon("play"), name: "Manual run", line: "Whenever you start it from Studio." },
    ],
  },
  {
    title: "Connect your AI tools",
    line: "MCP for Claude, Cursor and any other client.",
    card: "Connect · AI tool",
    hint: "Choose where your AI works with Pawabase.",
    options: [
      { mark: <SiClaude size={20} color="currentColor" />, name: "Claude", line: "Claude Desktop or Claude Code." },
      { mark: <SiCursor size={20} color="currentColor" />, name: "Cursor", line: "Pawabase tools inside your editor." },
      { mark: icon("code"), name: "Any MCP client", line: "Point it at your environment." },
      { mark: icon("apiSecurity"), name: "SDKs and REST", line: "The same system, from code." },
    ],
  },
];

/** The order the cursor visits the four options a card shows above its cut: across, down, back, up. */
const ROUTE = [0, 1, 3, 2];

export function Story() {
  const [active, setActive] = useState(0);
  const [hop, setHop] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  // which step is open: the block crossing the middle of the window
  useEffect(() => {
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.current.forEach((block) => block && seen.observe(block));
    return () => seen.disconnect();
  }, []);

  // how far through the section the middle of the window is, for the line down the divider
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const through = (window.innerHeight / 2 - box.top) / box.height;
      el.style.setProperty("--p", Math.min(1, Math.max(0, through)).toFixed(4));
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
      cancelAnimationFrame(frame);
    };
  }, []);

  // the cursor in the open card moves on every couple of seconds
  useEffect(() => {
    setHop(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setHop((h) => h + 1), 2200);
    return () => window.clearInterval(timer);
  }, [active]);

  const go = (i: number) => blocks.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section id="how" className="ix-section" aria-labelledby="story-title" data-plain="">
      <Rule />
      <SectionHead id="story-title" title="From your first table to your first agent, in one place." />
      <div ref={panel} className="ix-panel rp" data-reveal="up">
        <Rule />
        <div className="rp-side">
          <span className="rp-progress" aria-hidden="true" />
          <ol className="rp-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button type="button" className={i === active ? "on" : ""} aria-current={i === active ? "step" : undefined} onClick={() => go(i)}>
                  <span className="rp-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rp-step-text">
                    <b>{s.title}</b>
                    <span className="rp-step-line">{s.line}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="rp-blocks">
          {STEPS.map((s, i) => (
            <div key={s.title} className={`rp-block ${i === active ? "on" : ""}`} data-step={i} ref={(el) => { blocks.current[i] = el; }}>
              <p className="rp-block-title"><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</p>
              <Card step={s} picked={i === active ? ROUTE[hop % ROUTE.length] : -1} press={hop} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One step's card. ``picked`` is the option the cursor is on (-1 when the card is not the open one). */
function Card({ step, picked, press }: { step: Step; picked: number; press: number }) {
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const place = () => {
      const li = picked >= 0 ? items.current[picked] : null;
      if (li) setAt({ x: li.offsetLeft + 46, y: li.offsetTop + 54 });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [picked]);

  return (
    <div className={`rp-card ${picked >= 0 ? "live" : ""}`} aria-hidden="true">
      <div className="rp-card-head">
        <i className="rp-ring"><Tick /></i>
        <div>
          <p className="rp-card-title">{step.card}</p>
          <p className="rp-card-hint">{step.hint}</p>
        </div>
      </div>
      <ul className="rp-options">
        {step.options.map((o, i) => (
          <li key={o.name} ref={(el) => { items.current[i] = el; }} className={i === picked ? "picked" : ""}>
            <span className="rp-mark">{o.mark}</span>
            <span><b>{o.name}</b><small>{o.line}</small></span>
            <i className="rp-check"><Tick /></i>
          </li>
        ))}
      </ul>
      {picked >= 0 && at && (
        <span className="rp-cursor" style={{ transform: `translate(${at.x}px, ${at.y}px)` }}>
          <i key={press} className="rp-press" />
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3.5v15.2l4.1-3.9 2.6 6 2.7-1.2-2.6-5.9H17L5 3.5z" fill="#fcf8f5" stroke="#121316" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}

function Tick() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
