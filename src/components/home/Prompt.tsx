import { useEffect, useState } from "react";
import { SiClaude, SiCursor, SiGithubcopilot } from "@icons-pack/react-simple-icons";

import { Arrow, SectionHead } from "./Home";
import "./prompt.css";

/*
 * One prompt that adds Pawabase to any project. The prompt itself is never shown: the button copies it. The panel shows what
 * happens next: an agent working through the job beside the file it reads, pawabase.com/SKILL.md.
 */

export const SKILL_URL = "https://pawabase.com/SKILL.md";

export const PROMPT = `Read ${SKILL_URL} and follow it to add Pawabase as the backend for this project. Look at the code first, then set up the client, tables, access policies and sign-in, keep the app running after each step, and prove each part works with a real request.`;

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still()) {
      setTick(STEPS.length);
      return;
    }
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

/** What the agent does with the prompt, one step at a time. */
const STEPS: [string, string][] = [
  ["Read", "pawabase.com/SKILL.md"],
  ["Install", "@pawabase/client"],
  ["Create table", "tasks"],
  ["Write policy", "owner only"],
  ["Add", "sign-in and sessions"],
  ["Prove", "user B can't read A's tasks"],
];

function Run() {
  const tick = useTicker(1100);
  const span = STEPS.length + 3;                 // a pause on the finished run before it starts again
  const at = tick % span;
  return (
    <div className="pr-run" aria-hidden="true">
      <div className="pr-tools">
        <SiClaude size={15} color="currentColor" />
        <SiCursor size={15} color="currentColor" />
        <SiGithubcopilot size={15} color="currentColor" />
        <span>Codex</span>
        <span className="dim">and any coding agent</span>
      </div>
      <div className="pr-ask">
        <span className="pr-you">You</span>
        <p>Add a backend to this app with sign-in and a tasks list</p>
        <span className="pr-attach"><i />SKILL.md prompt</span>
      </div>
      <ol className="pr-steps">
        {STEPS.map(([verb, what], i) => {
          const state = i < at ? "done" : i === at ? "now" : "next";
          return (
            <li key={verb + what} className={state}>
              <span className="pr-mark">{state === "done" ? <Check /> : state === "now" ? <i className="pr-spin" /> : null}</span>
              <b>{verb}</b>
              <span>{what}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** The sections of SKILL.md, as its contents list shows them. */
const SECTIONS = [
  "Work in four moves", "Rules that do not bend", "System model", "Recipes", "TypeScript client", "Python client", "HTTP API",
  "Auth, keys and policies", "Data and queries", "Storage and files", "Realtime and live queries", "Flows, routes and events",
  "AI, agents and knowledge", "MCP", "Environments and releases", "Troubleshooting", "Docs catalog",
];

/** The file the agent reads: its address, then the contents scrolling past. */
function File() {
  const rows = [...SECTIONS, ...SECTIONS];
  return (
    <a className="pr-file" href="/SKILL.md" aria-label="Open SKILL.md">
      <span className="pr-file-bar">
        <i /><i /><i />
        <b>pawabase.com/SKILL.md</b>
      </span>
      <span className="pr-file-head" aria-hidden="true">
        <code>---</code>
        <code><em>name:</em> pawabase</code>
        <code><em>description:</em> Build, secure and ship apps on Pawabase…</code>
        <code>---</code>
      </span>
      <span className="pr-file-body" aria-hidden="true">
        <span className="pr-file-roll">
          {rows.map((title, i) => (
            <span key={i} className="pr-line"><i>##</i>{title}</span>
          ))}
        </span>
      </span>
    </a>
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
        <Run />
        <File />
      </div>
    </section>
  );
}
