import type { ReactNode } from "react";

import { Footer } from "@/components/landing/Footer";
import { TopBar } from "@/components/landing/TopBar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "@tanstack/react-router";

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Refund Policy", href: "/legal/refund" },
  { label: "Data Processing Addendum (DPA)", href: "/legal/dpa" },
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
  usePageMeta(`${title} | Pawabase`, description);

  return (
    <div className="min-h-screen bg-shell">
      <a
        href="#legal-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-text focus:px-4 focus:py-2 focus:text-shell"
      >
        Skip to content
      </a>
      <div className="relative min-h-screen overflow-clip bg-shell">
        <TopBar />
        <main id="legal-content" className="relative">
          <section data-plain="" className="relative border-b border-line-subtle">
            <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-10 pt-[clamp(76px,10vw,110px)] min-[768px]:px-10">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
                Legal
              </p>
              <h1 className="mt-6 text-[clamp(40px,6vw,72px)] font-normal leading-[0.98] tracking-[-0.062em] text-text text-balance">
                {title}
              </h1>
              <p className="mt-5 max-w-[720px] text-[18px] leading-[1.72] tracking-[-0.01em] text-muted">
                {description}
              </p>
              {lastUpdated ? (
                <p className="mt-4 text-[14px] leading-[1.7] text-faint">
                  Last updated: {lastUpdated}
                </p>
              ) : null}
            </div>
          </section>

          <section data-plain="" className="relative">
            <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 px-5 py-[clamp(48px,7vw,80px)] min-[768px]:px-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
              <aside className="lg:sticky lg:top-[84px] lg:self-start">
                <nav aria-label="Legal pages" className="rounded-[18px] border border-line bg-card/40 p-6">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    Legal documents
                  </p>
                  <ul className="space-y-1">
                    {LEGAL_LINKS.map((link) => {
                      const isActive = link.href === activeHref;
                      return (
                        <li key={link.href}>
                          <Link
                            to={link.href}
                            className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[15px] transition-colors ${
                              isActive
                                ? "bg-elevated text-text"
                                : "text-muted hover:text-text hover:bg-elevated/60"
                            }`}
                          >
                            <span className="truncate tracking-[-0.01em]">{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>

              <article
                id="legal-content-article"
                className="max-w-none"
              >
                <div className="space-y-10 text-[17px] leading-[1.8] text-muted [&_h2]:text-[clamp(28px,3vw,38px)] [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:tracking-[-0.04em] [&_h2]:font-normal [&_h2]:text-text [&_h2]:first:mt-0 [&_h3]:text-[clamp(22px,2.2vw,28px)] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:tracking-[-0.04em] [&_h3]:font-normal [&_h3]:text-text [&_p]:mb-6 [&_p]:last:mb-0 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:marker:text-faint [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal [&_strong]:text-text [&_a]:text-text [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 hover:[&_a]:text-brand [&_hr]:border-line [&_hr]:my-10">
                  {children}
                </div>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
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
