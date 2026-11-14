import { SiX } from "@icons-pack/react-simple-icons";

import { SIGN_IN, SIGN_UP, DOCS } from "@/lib/links";

import { FooterNavLink } from "./FooterNavLink";
import { FooterNewsletter } from "./FooterNewsletter";
import { FOOTER_LINK_GROUPS } from "./footerLinks";
import "@/components/site/footer.css";

/*
 * The footer, laid out the way Resend's is: the navigation bar again at the top, a huge faint wordmark cut off by a hairline
 * with a soft light under it, then a narrow side column (what Pawabase is, the newsletter, the social links) beside the link
 * columns. Black and grey; nothing orange but the logo.
 */

function LinkedIn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Pawabase on X", href: "https://x.com/getpawabase", icon: <SiX size={13} color="currentColor" aria-hidden="true" /> },
  { label: "Pawabase on LinkedIn", href: "https://www.linkedin.com/company/pawabase/", icon: <LinkedIn /> },
];

const BAR = [
  { label: "Platform", href: "/#platform" },
  { label: "Docs", href: DOCS },
  { label: "Company", href: "/company" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export function Footer() {
  return (
    <footer className="sf" aria-label="Pawabase footer">
      <div className="sf-bar">
        <a href="/" className="sf-logo" aria-label="Pawabase home">
          <img src="/brand/horizontal-dark.svg" width={120} height={29} alt="Pawabase" />
        </a>
        <nav className="sf-bar-links" aria-label="Footer">
          {BAR.map((l) => (
            <a key={l.label} href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{l.label}</a>
          ))}
        </nav>
        <div className="sf-bar-actions">
          <a href={SIGN_IN} className="btn btn-ghost btn-sm">Sign in</a>
          <a href={SIGN_UP} className="btn btn-light btn-sm">Get started</a>
        </div>
      </div>

      <div className="sf-mark" aria-hidden="true"><span>Pawabase</span></div>

      <div className="sf-main">
        <div className="sf-side">
          <p className="sf-tag">One system, every team.</p>
          <p className="sf-line">Product updates and engineering notes, now and then.</p>
          <FooterNewsletter />
          <ul className="sf-socials">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sf-cols">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="sf-col">
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => <li key={link.label}><FooterNavLink link={link} className="sf-link" /></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="sf-base">© {new Date().getFullYear()} Pawabase</p>
    </footer>
  );
}
