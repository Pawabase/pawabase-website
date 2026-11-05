import type { ReactNode } from "react";

import { Rule } from "@/components/home/Home";
import { PageHero, SitePage } from "@/components/site/SitePage";
import { Link } from "@tanstack/react-router";

/* The legal pages in the home page's system: the sky hero, then one panel with the documents on the left and the reader. */

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
      <PageHero title={title} line={description} note={lastUpdated ? `Last updated ${lastUpdated}` : undefined} compact />
      <section className="ix-section" aria-label={title} data-plain="">
        <Rule />
        <div className="ix-panel sp-legal">
          <Rule />
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
