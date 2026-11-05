import { Icon, type IconName } from "@/components/Icon";

import { Lines, Rule, SectionHead } from "./Home";
import "./features.css";

/* Everything in the system, grouped: six cells in a 3 × 2 grid divided by dashed lines. */

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
  return (
    <section id="features" className="ix-section" aria-labelledby="features-title" data-plain="">
      <Rule />
      <SectionHead id="features-title" title="Everything a system needs" />
      <div className="ix-panel ix-features" data-reveal="up">
        <Rule />
        <Lines
          v={[[1 / 3, 0, 1], [2 / 3, 0, 1]]}
          h={[[0.5, 0, 1]]}
          marks={[[1 / 3, 0.5], [2 / 3, 0.5], [1 / 3, 0, "sq"], [2 / 3, 0, "sq"], [1 / 3, 1, "sq"], [2 / 3, 1, "sq"], [0, 0.5, "sq"], [1, 0.5, "sq"]]}
        />
        {GROUPS.map((group, i) => (
          <article key={group.title} className="ix-cell ix-group">
            <span className="ix-group-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div className="ix-group-head">
              <span className="ix-group-icon"><Icon name={group.icon} size={18} variant="Linear" /></span>
              <h3>{group.title}</h3>
            </div>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
