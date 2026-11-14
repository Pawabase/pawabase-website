import { useEffect, useState } from "react";
import { SiClaude, SiCursor, SiGithubcopilot } from "@icons-pack/react-simple-icons";

import { Arrow, SectionHead } from "./Home";
import "./bento.css";
import "./mcp.css";
import { SIGN_UP } from "@/lib/links";

/*
 * Pawabase over MCP: how to connect, then three tiles in the bento's style for what keeps people in control.
 */

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tick forever unless the visitor asked for less motion. */
function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still()) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(timer);
  }, [ms]);
  return tick;
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── how to connect ────────────────────────────────────────────────────────────────────────────────────────────────── */

const COMMAND = `claude mcp add --transport http pawabase $PAWABASE_URL/mcp/v1 --header "apikey: $PAWABASE_KEY"`;

function Connect() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="ix-panel mc-connect" data-reveal="up">
      <div className="mc-clients">
        <span className="mc-over">Connect over MCP</span>
        <span className="mc-client"><SiClaude size={17} color="currentColor" />Claude</span>
        <span className="mc-client"><SiCursor size={17} color="currentColor" />Cursor</span>
        <span className="mc-client"><SiGithubcopilot size={17} color="currentColor" />Copilot</span>
        <span className="mc-client">Codex</span>
        <span className="mc-client dim">Any MCP client</span>
      </div>
      <button type="button" className="mc-command" onClick={copy} aria-label="Copy the command that connects Claude Code to Pawabase">
        <code><i>$</i> {COMMAND}</code>
        <span>{copied ? <Check /> : "Copy"}</span>
      </button>
    </div>
  );
}

/* ── the tiles ─────────────────────────────────────────────────────────────────────────────────────────────────────── */

const ASKS: [string, string][] = [
  ["delete_resource", "orders"],
  ["promote_environment", "production"],
  ["send_email", "3 recipients"],
  ["set_secret", "STRIPE_KEY"],
];

/** A permanent call: it stops, the person agrees, it runs. Then the next one. */
function Asks() {
  const tick = useTicker(1500);
  const phase = tick % 3;
  const [tool, target] = ASKS[Math.floor(tick / 3) % ASKS.length];
  return (
    <div className="mc-ask" aria-hidden="true">
      <span className="mc-ask-who"><SiClaude size={14} color="currentColor" />Claude wants to run</span>
      <div className="mc-ask-call" key={tool}>
        <span>{tool}</span>
        <b>{target}</b>
      </div>
      <div className="mc-ask-row">
        {phase === 2 ? (
          <span className="mc-state done"><i className="cf-ok"><Check /></i>Done</span>
        ) : (
          <span className="mc-state"><i className="cf-spin" />Checking with you</span>
        )}
        <span className={`mc-yes ${phase === 1 ? "pressed" : ""} ${phase === 2 ? "gone" : ""}`}>Yes</span>
      </div>
    </div>
  );
}

const CALLS: [string, string, boolean][] = [
  ["create_resource", "Claude", true],
  ["list_secrets", "Cursor", false],
  ["migrate_resource", "Claude", true],
  ["search_logs", "Cursor", true],
  ["set_secret", "Cursor", false],
  ["run_flow", "Claude", true],
];

/** Calls arriving, newest first: what ran, from which key, and how it ended. */
function Record() {
  const head = useTicker(2400);
  const rows = [0, 1, 2, 3].map((k) => {
    const n = head - k;
    return { n, call: CALLS[((n % CALLS.length) + CALLS.length) % CALLS.length] };
  });
  return (
    <ol className="mc-feed" aria-hidden="true">
      {rows.map(({ n, call }) => (
        <li key={n} className={call[2] ? "" : "refused"}>
          <span>{call[0]}</span>
          <span>{call[1]}</span>
          <span>{call[2] ? "Done" : "Refused"}</span>
        </li>
      ))}
    </ol>
  );
}

const PROMPTS = ["Design the data model", "Lock down a resource", "Build a flow", "Investigate errors", "Review an environment", "Ship to another environment"];

/** The six prompts, as the menu in an AI tool shows them, with the choice moving down. */
function Prompts() {
  const tick = useTicker(1700);
  const current = tick % PROMPTS.length;
  return (
    <ul className="mc-menu" aria-hidden="true">
      {PROMPTS.map((prompt, i) => (
        <li key={prompt} className={i === current ? "on" : ""}>
          <i>/</i>
          {prompt}
        </li>
      ))}
    </ul>
  );
}

function Tiles() {
  return (
    <div className="ix-panel bare cf-panel mc-tiles-panel" data-reveal="up">
      <div className="mc-tiles">
        <article className="cf-tile mc-tile first">
          <Asks />
          <div className="cf-copy">
            <h3>It asks before anything permanent</h3>
            <p>Deleting, sending email or shipping to production stops and checks with you first.</p>
          </div>
        </article>
        <article className="cf-tile mc-tile">
          <Record />
          <div className="cf-copy">
            <h3>Every call on the record</h3>
            <p>See what ran, from which key, and what was refused.</p>
          </div>
        </article>
        <article className="cf-tile mc-tile last">
          <Prompts />
          <div className="cf-copy">
            <h3>Common jobs, ready to go</h3>
            <p>Design your data, chase an error or ship a release from one prompt.</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export function Mcp() {
  return (
    <section className="ix-section" id="mcp" aria-labelledby="mcp-title" data-plain="">
      <SectionHead id="mcp-title" title="Your AI builds it. You hold the keys."
        lead="Claude, Cursor and any MCP client work in your environment, under the keys and rules you set.">
        <a href={SIGN_UP} className="btn">Connect your AI <Arrow /></a>
      </SectionHead>
      <Connect />
      <Tiles />
    </section>
  );
}
