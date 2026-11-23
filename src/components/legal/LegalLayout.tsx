import type { ReactNode } from "react";

import { SitePage } from "@/components/site/SitePage";
import { SiteNav } from "@/components/site/SiteNav";
import { Link } from "@tanstack/react-router";

/* The legal pages as plain documents: the navigation, a quiet title, then the documents on the left (kept in view) and the text. */

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Refund Policy", href: "/legal/refund" },
  { label: "Data Processing Addendum", href: "/legal/dpa" },
  { label: "Acceptable Use Policy", href: "/legal/acceptable-use" },
];

export function LegalShell({
  title,
  description,
  lastUpdated,
  children,
  activeHref,
}: {
  title: string;
  description: string;
  lastUpdated?: string;
  children: ReactNode;
  activeHref: string;
}) {
  return (
    <SitePage title={title} description={description} closing={false}>
      <header className="sp-legal-head" aria-labelledby="page-title">
        <SiteNav />
        <div className="sp-legal-title">
          <span className="sp-legal-kicker">Legal</span>
          <h1 id="page-title">{title}</h1>
          <p>{description}</p>
          {lastUpdated && <span className="sp-legal-date">Last updated {lastUpdated}</span>}
        </div>
      </header>
      <section className="ix-section" aria-label={title} data-plain="">
        <div className="sp-legal">
          <aside className="sp-legal-side">
            <nav className="sp-legal-nav" aria-label="Legal documents">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} to={link.href} className={link.href === activeHref ? "on" : ""} aria-current={link.href === activeHref ? "page" : undefined}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
          <article className="sp-reader">{children}</article>
        </div>
      </section>
    </SitePage>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: (string | ReactNode)[] }) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
