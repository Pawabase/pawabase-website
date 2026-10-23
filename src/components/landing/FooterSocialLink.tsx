import {
  SiDiscord,
  SiGithub,
  SiX,
} from "@icons-pack/react-simple-icons";
import type { ReactNode } from "react";

import type { FooterLink } from "./footerLinks";

function LinkedInGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  GitHub: <SiGithub size={14} color="currentColor" aria-hidden="true" />,
  X: <SiX size={14} color="currentColor" aria-hidden="true" />,
  LinkedIn: <LinkedInGlyph size={14} />,
  Discord: <SiDiscord size={14} color="currentColor" aria-hidden="true" />,
};

export function FooterSocialLink({ link }: { link: FooterLink }) {
  const icon = (
    <span
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-faint transition-colors duration-150 group-hover:text-brand"
      aria-hidden="true"
    >
      {ICONS[link.label]}
    </span>
  );

  if (link.status === "planned") {
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        title="Planned - this channel is not live yet"
        className="group inline-flex items-center gap-2 text-[12px] leading-none text-faint"
      >
        {icon}
        {link.label}
        <span className="sr-only"> (planned)</span>
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-[12px] leading-none text-muted no-underline transition-colors duration-150 hover:text-brand"
    >
      {icon}
      {link.label}
      {link.external ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
