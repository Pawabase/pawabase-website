import "./company.css";

/*
 * About → Why Pawabase: the parts a product usually gets from separate services run into one Pawabase (one set of users, one set of
 * rules), and out of it to everyone who works from it. Dashed connectors carry a slow pulse toward the middle; on phones the three
 * columns stack and the connectors run down instead of across.
 */

const PARTS = ["Data", "Sign-in", "Files", "Background work", "Email", "AI"];
const USERS = [
  ["Your apps", "web, mobile, APIs"],
  ["Your team", "Studio, flows, data"],
  ["Your AI", "agents, MCP, tools"],
];

export function OneSystem() {
  return (
    <div className="ab-system" data-reveal="up">
      <ul className="ab-col ab-parts" aria-label="What a product needs">
        {PARTS.map((part, i) => (
          <li key={part} style={{ animationDelay: `${i * 0.35}s` }}>{part}</li>
        ))}
      </ul>
      <div className="ab-core">
        <img src="/brand/mark.svg" alt="" width="34" height="34" onError={(e) => (e.currentTarget.style.display = "none")} />
        <b>pawabase</b>
        <span>One set of users</span>
        <span>One set of rules</span>
      </div>
      <ul className="ab-col ab-users" aria-label="Who works from it">
        {USERS.map(([name, what]) => (
          <li key={name}><b>{name}</b><span>{what}</span></li>
        ))}
      </ul>
    </div>
  );
}

/** Small pictures for the three principles, in the same order. */
export const PRINCIPLE_ART = [
  // Make it visible: a request's steps, each with its state, the failing one named
  <svg key="visible" viewBox="0 0 120 64" aria-hidden="true">
    <rect x="1" y="1" width="118" height="62" rx="8" className="ab-frame" />
    <circle cx="16" cy="18" r="4" className="ab-ok" /><rect x="28" y="15" width="52" height="6" rx="3" className="ab-bar" />
    <circle cx="16" cy="32" r="4" className="ab-ok" /><rect x="28" y="29" width="40" height="6" rx="3" className="ab-bar" />
    <circle cx="16" cy="46" r="4" className="ab-hot" /><rect x="28" y="43" width="60" height="6" rx="3" className="ab-bar hot" />
  </svg>,
  // Complete, then composable: blocks that already fit, with room for one more
  <svg key="composable" viewBox="0 0 120 64" aria-hidden="true">
    <rect x="8" y="8" width="32" height="22" rx="5" className="ab-block" />
    <rect x="44" y="8" width="32" height="22" rx="5" className="ab-block" />
    <rect x="8" y="34" width="68" height="22" rx="5" className="ab-block" />
    <rect x="80" y="8" width="32" height="48" rx="5" className="ab-slot" />
  </svg>,
  // Built for small teams: three people, one large system
  <svg key="small" viewBox="0 0 120 64" aria-hidden="true">
    <circle cx="16" cy="24" r="6" className="ab-person" /><path d="M6 46c0-7 4-11 10-11s10 4 10 11" className="ab-person" />
    <circle cx="38" cy="24" r="6" className="ab-person" /><path d="M28 46c0-7 4-11 10-11s10 4 10 11" className="ab-person" />
    <circle cx="27" cy="12" r="5" className="ab-person hot" />
    <rect x="60" y="6" width="54" height="52" rx="8" className="ab-frame" />
    <rect x="68" y="14" width="18" height="16" rx="3" className="ab-block" /><rect x="88" y="14" width="18" height="16" rx="3" className="ab-block" />
    <rect x="68" y="34" width="38" height="16" rx="3" className="ab-block" />
  </svg>,
];
