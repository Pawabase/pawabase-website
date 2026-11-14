import { useEffect, useState, type ReactNode } from "react";
import { SiClaude, SiCursor, SiGithubcopilot } from "@icons-pack/react-simple-icons";

import { Arrow, SectionHead } from "./Home";
import "./prompt.css";

/*
 * One prompt that adds Pawabase to any project. The prompt itself is never shown: the button copies it. Below, one short strip
 * shows what happens next: a coding agent working through the job, step by step.
 */

export const SKILL_URL = "https://pawabase.com/SKILL.md";

export const PROMPT = `Read ${SKILL_URL} and follow it to add Pawabase as the backend for this project. Look at the code first, then set up the client, tables, access policies and sign-in, keep the app running after each step, and prove each part works with a real request.`;

/** What the agent does with the prompt, in order. */
const STEPS = ["SKILL.md", "Client", "Tables", "Policies", "Sign-in"];

/** The coding agents the badge cycles through. */
const AGENTS: [string, ReactNode][] = [
  ["Claude Code", <SiClaude size={16} color="currentColor" />],
  ["Cursor", <SiCursor size={16} color="currentColor" />],
  ["Copilot", <SiGithubcopilot size={16} color="currentColor" />],
  ["Codex", <b>C</b>],
];

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTicker(ms: number) {
  const [tick, setTick] = useState(STEPS.length);
  useEffect(() => {
    if (still()) return;
    setTick(0);
    const timer = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(timer);
  }, [ms]);
  return tick;
}

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Copies the prompt; says so for a moment. */
function CopyPrompt() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" className={`pr-copy ${copied ? "done" : ""}`} onClick={copy}>
      {copied ? <><Check />Copied</> : <>Copy prompt <Arrow /></>}
    </button>
  );
}

/** One short strip: the agent, then the steps lighting up along an orange beam. */
function Strip() {
  const tick = useTicker(850);
  const span = STEPS.length + 3;                 // hold the finished run a moment before it starts again
  const at = tick % span;
  const [name, icon] = AGENTS[Math.floor(tick / span) % AGENTS.length];
  const fill = Math.min(at, STEPS.length) / STEPS.length;
  return (
    <div className="pr-strip" aria-hidden="true">
      <span className="pr-agent" key={name}>
        <span className="pr-agent-icon">{icon}</span>
        {name}
      </span>
      <span className="pr-track">
        <i className="pr-rail"><i className="pr-beam" style={{ transform: `scaleX(${fill})` }} /></i>
        {STEPS.map((step, i) => (
          <span key={step} className={`pr-step ${i < at ? "done" : ""}`}>
            <span className="pr-dot">{i < at && <Check />}</span>
            {step}
          </span>
        ))}
      </span>
    </div>
  );
}

export function Prompt() {
  return (
    <section className="ix-section" id="prompt" aria-labelledby="prompt-title" data-plain="">
      <SectionHead id="prompt-title" title="Add Pawabase with one prompt"
        lead="Point your coding agent at Pawabase. It does the rest.">
        <CopyPrompt />
        <a href="/SKILL.md" className="ix-link">Read SKILL.md</a>
      </SectionHead>
      <div className="ix-panel pr-panel" data-reveal="up">
        <Strip />
      </div>
    </section>
  );
}
