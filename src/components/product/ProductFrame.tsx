import { useEffect, useState, type ReactNode } from "react";

import { Icon } from "@/components/Icon";
import { Arrow, InnerRails, Rule } from "@/components/home/Home";
import { Closing } from "@/components/home/Sections";
import { Footer } from "@/components/landing/Footer";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { PRODUCTS } from "@/components/site/SiteNav";
import { usePageMeta } from "@/hooks/usePageMeta";
import { DOCS, SIGN_UP } from "@/lib/links";

import "./frame.css";

/*
 * What every product page shares, and nothing more: the shell between its rails, a small strip of related products, the
 * closing band and the footer. Each page brings its own hero and its own sections, so no two look alike. Every capability
 * a page names exists in Pawabase today; the internals are left to the docs.
 */

export const still = () => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts up for as long as the page is open. For a visitor who asked for less motion it holds still at *rest*: the finished state. */
export function useTicker(ms: number, rest = 0) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still()) {
      setTick(rest);
      return;
    }
    const timer = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(timer);
  }, [ms, rest]);
  return tick;
}

/** The two buttons a product hero offers. */
export function HeroActions({ className = "" }: { className?: string }) {
  return (
    <div className={`pf-actions ${className}`} data-reveal="up">
      <a href={SIGN_UP} className="ix-btn primary">Start building <Arrow /></a>
      <a href={DOCS} className="ix-btn" target="_blank" rel="noreferrer">Read the docs</a>
    </div>
  );
}

/** A section between the dashed rails: it opens on a rule that bleeds past the page. */
export function Band({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <section className="ix-section" aria-label={label} data-plain="">
      <Rule />
      <div className={`ix-panel ${className}`} data-reveal="up">
        {children}
      </div>
    </section>
  );
}

/** The next products to look at: the rest of this one's group first, then whatever follows, three in all. */
function related(name: string) {
  const all = PRODUCTS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));
  const at = all.findIndex((p) => p.label === name);
  const here = all[at];
  const same = all.filter((p) => p !== here && p.group === here?.group);
  const after = [...all.slice(at + 1), ...all.slice(0, Math.max(0, at))];
  return [...new Set([...same, ...after])].slice(0, 3);
}

export function ProductFrame({ name, description, children }: { name: string; description: string; children: ReactNode }) {
  usePageMeta(`${name} | Pawabase`, description);
  return (
    <div className="ix-page">
      <ScrollMotion />
      <main className="ix-shell">
        <InnerRails />
        {children}
        <section className="ix-section" aria-label={`Works with ${name}`} data-plain="">
          <Rule />
          <nav className="ix-panel pf-next" aria-label="Related products">
            {related(name).map((p) => (
              <a key={p.href} href={p.href} className="pf-next-item">
                <Icon name={p.icon} size={18} variant="Linear" />
                <span><b>{p.label}</b><small>{p.line}</small></span>
                <Arrow />
              </a>
            ))}
          </nav>
        </section>
        <Closing />
        <div className="ix-footer">
          <Rule />
          <Footer />
        </div>
      </main>
    </div>
  );
}
