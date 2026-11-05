import type { ReactNode } from "react";

import { InnerRails, Rule, Sky } from "@/components/home/Home";
import { Closing } from "@/components/home/Sections";
import { Footer } from "@/components/landing/Footer";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { usePageMeta } from "@/hooks/usePageMeta";

import { SiteNav } from "./SiteNav";
import "./page.css";

/*
 * The frame every page outside the home and product pages uses: the home page's shell between its rails, a sky
 * hero with the site navigation, bands of content that each open on a bleeding rule, the closing band if wanted,
 * and the footer.
 */

export function SitePage({ title, description, closing = true, children }: { title: string; description: string; closing?: boolean; children: ReactNode }) {
  usePageMeta(`${title} | Pawabase`, description);
  return (
    <div className="ix-page">
      <ScrollMotion />
      <main className="ix-shell">
        <InnerRails />
        {children}
        {closing && <Closing />}
        <div className="ix-footer">
          <Rule />
          <Footer />
        </div>
      </main>
    </div>
  );
}

/** A page's opening: the sky and the navigation, a two-part headline (the second part in orange), a line, actions. */
export function PageHero({ title, quiet, line, note, compact = false, children }: { title: string; quiet?: string; line?: string; note?: string; compact?: boolean; children?: ReactNode }) {
  return (
    <section className={`ix-hero sp-hero ${compact ? "compact" : ""}`} aria-labelledby="page-title" data-plain="">
      <Sky seed={31} />
      <SiteNav />
      <div className="sp-hero-copy">
        <h1 id="page-title" data-reveal="up">
          <span>{title}</span>
          {quiet && <span className="hot">{quiet}</span>}
        </h1>
        {line && <p data-reveal="up">{line}</p>}
        {note && <p className="sp-note" data-reveal="up">{note}</p>}
        {children && <div className="sp-hero-actions" data-reveal="up">{children}</div>}
      </div>
    </section>
  );
}

/** A band of content between the rails, opening on a rule. ``panel`` gives it the panel's darker ground. */
export function Band({ labelledBy, label, panel = false, flush = false, children }: { labelledBy?: string; label?: string; panel?: boolean; flush?: boolean; children: ReactNode }) {
  return (
    <section className="ix-section" aria-labelledby={labelledBy} aria-label={label} data-plain="">
      <Rule />
      <div className={`sp-band ${panel ? "ix-panel sp-panel" : ""} ${flush ? "flush" : ""}`}>
        {panel && <Rule />}
        {children}
      </div>
    </section>
  );
}
