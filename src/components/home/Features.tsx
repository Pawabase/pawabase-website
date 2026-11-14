import { useRef, useState, type KeyboardEvent } from "react";

import { Icon, type IconName } from "@/components/Icon";

import { SectionHead } from "./Home";
import "./features.css";

/*
 * Everything in the system, as an index: the six groups down the left as tabs, the chosen one open on the right in a card made
 * of the bento's materials (its icon a matte tile in a groove, its parts as a two-column sheet with hairlines). One group at a
 * time, so the section reads in a glance instead of as a wall of 36 lines. Arrow keys move between the tabs.
 */

const GROUPS: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: "database",
    title: "Data & APIs",
    items: ["Tables with instant REST APIs", "Filters, sorting, relations and pages", "Full-text and vector search", "SQL editor with saved queries", "Migrations you preview first", "Bring your own Postgres"],
  },
  {
    icon: "users",
    title: "Identity",
    items: ["Email, social and magic-link sign-in", "Two-step verification", "Organizations, roles and invitations", "Company sign-in with SAML and OIDC", "Sessions and device management", "API keys for users and machines"],
  },
  {
    icon: "policies",
    title: "Security",
    items: ["Policies written once, used anywhere", "Rules on tables, endpoints, files and channels", "Scoped publishable and secret keys", "Rate limits per route", "Encrypted secrets", "Audit log"],
  },
  {
    icon: "automation",
    title: "Flows & AI",
    items: ["Visual flow editor", "Triggers for requests, events, schedules and webhooks", "Background jobs with retries", "AI steps with the model you choose", "Agents behind flows, endpoints and routes", "Model fallback, with token and cost logs"],
  },
  {
    icon: "storage",
    title: "Files, mail & realtime",
    items: ["Storage buckets with share links", "Image resizing on the fly", "Visual email editor and templates", "Delivery log with one-click resend", "Live updates, channels and presence", "Webhooks in and out"],
  },
  {
    icon: "activity",
    title: "Operations",
    items: ["Development, staging and production", "Promote changes between environments", "Backups and snapshots", "Logs, traces and alarms", "Public status page", "Custom domains"],
  },
];

export function Features() {
  const [open, setOpen] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = GROUPS[open];

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (open + step + GROUPS.length) % GROUPS.length;
    setOpen(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="features" className="ix-section ft" aria-labelledby="features-title" data-plain="">
      <SectionHead id="features-title" title="Everything a system needs"
        lead="Data, identity, security, automation, files and operations, built to work together." />

      <div className="ft-box" data-reveal="up">
        <div className="ft-tabs" role="tablist" aria-label="Parts of Pawabase" aria-orientation="vertical" onKeyDown={onKey}>
          {GROUPS.map((g, i) => (
            <button
              key={g.title}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`ft-tab-${i}`}
              aria-selected={i === open}
              aria-controls="ft-panel"
              tabIndex={i === open ? 0 : -1}
              className="ft-tab"
              onClick={() => setOpen(i)}
            >
              <span className="ft-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="ft-name">{g.title}</span>
              <Icon name={g.icon} size={17} variant="Linear" />
            </button>
          ))}
        </div>

        <div className="ft-panel" role="tabpanel" id="ft-panel" aria-labelledby={`ft-tab-${open}`}>
          <div key={open} className="ft-body">
            <div className="ft-head">
              <span className="ft-tile"><Icon name={group.icon} size={26} variant="Linear" /></span>
              <h3>{group.title}</h3>
            </div>
            <ul className="ft-sheet">
              {group.items.map((item) => (
                <li key={item}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
