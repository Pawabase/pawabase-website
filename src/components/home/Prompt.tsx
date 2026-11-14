import { useState } from "react";
import { SiClaude, SiCursor, SiGithubcopilot } from "@icons-pack/react-simple-icons";

import { Arrow, SectionHead } from "./Home";
import "./prompt.css";

/*
 * One prompt that adds Pawabase to any project: the agent reads pawabase.com/SKILL.md (the whole skill in one file) and works
 * from it. Left, the prompt as it sits in an AI tool's composer, ready to copy; right, the file it reads.
 */

export const SKILL_URL = "https://pawabase.com/SKILL.md";
const SKILL_REPO = "https://github.com/Pawabase/pawabase-skill";

export const PROMPT = `Read ${SKILL_URL} and follow it to add Pawabase as the backend for this project. Look at the code first, then set up the client, tables, access policies and sign-in, keep the app running after each step, and prove each part works with a real request.`;

/** The sections of SKILL.md, as its contents list shows them. */
const SECTIONS = [
  "Work in four moves",
  "Rules that do not bend",
  "System model",
  "Recipes",
  "TypeScript client",
  "Python client",
  "HTTP API",
  "Auth, keys and policies",
  "Data and queries",
  "Storage and files",
  "Realtime and live queries",
  "Flows, routes and events",
  "AI, agents and knowledge",
  "MCP",
  "Environments and releases",
  "Troubleshooting",
  "Docs catalog",
];

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Composer() {
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
    <div className="pr-composer">
      <div className="pr-tools" aria-hidden="true">
        <SiClaude size={15} color="currentColor" />
        <SiCursor size={15} color="currentColor" />
        <SiGithubcopilot size={15} color="currentColor" />
        <span>Codex</span>
        <span className="dim">any coding agent</span>
      </div>
      <p className="pr-text">
        Read <a href="/SKILL.md">{SKILL_URL.replace("https://", "")}</a> and follow it to add Pawabase as the backend for this
        project. Look at the code first, then set up the client, tables, access policies and sign-in, keep the app running after
        each step, and prove each part works with a real request.
      </p>
      <div className="pr-foot">
        <span className="pr-chip"><i aria-hidden="true" />SKILL.md attached by link</span>
        <button type="button" className={`pr-copy ${copied ? "done" : ""}`} onClick={copy} aria-label="Copy the prompt">
          {copied ? <><Check />Copied</> : "Copy prompt"}
        </button>
      </div>
    </div>
  );
}

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
        lead="Paste it into your coding agent. It reads the Pawabase guide and builds the backend into your project.">
        <a href="/SKILL.md" className="btn">Read SKILL.md <Arrow /></a>
        <a href={SKILL_REPO} className="ix-link">Install as a skill</a>
      </SectionHead>
      <div className="ix-panel pr-panel" data-reveal="up">
        <Composer />
        <File />
      </div>
    </section>
  );
}
