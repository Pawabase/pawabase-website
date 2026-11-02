import {
  SiClaude,
  SiCline,
  SiCursor,
  SiGithubcopilot,
  SiGooglegemini,
  SiWindsurf,
  SiZedindustries,
} from "@icons-pack/react-simple-icons";

import { Band, Eyebrow } from "./Section";

const AGENTS = [
  { name: "Claude", Mark: SiClaude },
  { name: "Cursor", Mark: SiCursor },
  { name: "Gemini", Mark: SiGooglegemini },
  { name: "GitHub Copilot", Mark: SiGithubcopilot },
  { name: "Windsurf", Mark: SiWindsurf },
  { name: "Zed", Mark: SiZedindustries },
  { name: "Cline", Mark: SiCline },
];

export function AgentsSection() {
  return (
    <Band id="agents" labelledBy="agents-title" wide className="py-[clamp(72px,9vw,128px)]">
      <div data-reveal="up" className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
        <Eyebrow>AI agents</Eyebrow>
        <h2
          id="agents-title"
          className="m-0 text-[clamp(38px,4.4vw,62px)] font-medium leading-[1.06] tracking-[-0.03em] text-text text-balance"
        >
          Let your AI tools work on your backend
        </h2>
        <p className="m-0 max-w-[52ch] text-[18px] leading-[1.6] text-muted">
          Pawabase includes an MCP server. Claude, Codex, Cursor and any other MCP client can inspect tables,
          read logs and change rules, with your approval.
        </p>
      </div>

      <ul
        data-reveal="stagger"
        className="m-0 mx-auto mt-[clamp(40px,5vw,64px)] grid max-w-[960px] list-none grid-cols-7 border-l border-t border-line p-0 max-[759px]:grid-cols-4"
      >
        {AGENTS.map(({ name, Mark }) => (
          <li
            key={name}
            title={name}
            className="group flex h-[110px] items-center justify-center border-b border-r border-line transition-colors duration-200 hover:bg-white/[0.03]"
          >
            <Mark
              size={34}
              role="img"
              aria-label={name}
              className="text-white/40 transition-colors duration-200 group-hover:text-text"
            />
          </li>
        ))}
      </ul>
    </Band>
  );
}
