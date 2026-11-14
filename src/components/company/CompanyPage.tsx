import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { Rule } from "@/components/home/Home";
import { PageHero, SitePage } from "@/components/site/SitePage";

/*
 * The company pages (about, careers, contact, blog) in the home page's system: the sky hero with the site navigation,
 * bands of content between the rails, and a closing call on the hero's sky.
 */

export const COMPANY_EMAIL = "hello@pawabase.com";

export function CompanyShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <SitePage title={title} description={description} closing={false}>
      {children}
    </SitePage>
  );
}

/** The opening: a two-part headline (the second part in orange), a line and actions. ``label`` and ``icon`` are kept for callers but not shown. */
export function CompanyHero({
  title,
  quiet,
  description,
  children,
}: {
  label?: string;
  title: string;
  quiet?: string;
  description: string;
  icon?: IconName;
  children?: ReactNode;
}) {
  return (
    <PageHero title={title} quiet={quiet} line={description}>
      {children}
    </PageHero>
  );
}

export function CompanySection({ children, className = "", labelledBy }: { children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section className="ix-section" aria-labelledby={labelledBy} data-plain="">
      <Rule />
      <div className={`sp-band ${className}`}>{children}</div>
    </section>
  );
}

/** A section's heading and its line. ``label`` is kept for callers but not shown: headings stand on their own. */
export function SectionHeading({ id, title, description }: { id: string; label?: string; title: string; description?: string }) {
  return (
    <div>
      <h2 id={id}>{title}</h2>
      {description ? <p className="sp-lead" style={{ marginTop: 18 }}>{description}</p> : null}
    </div>
  );
}

export function ArrowLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="sp-link">
      {children}
      <Icon name="arrowRight" size={16} />
    </a>
  );
}

/** The closing call, on the hero's sky. */
export function CompanyCta({ title, description, href, label }: { title: string; description: string; href: string; label: string }) {
  return (
    <section className="ix-section ix-closing-band" aria-label={title} data-plain="">
      <Rule />
      <div className="ix-closing-sky" aria-hidden="true">
        <svg className="ix-clouds" preserveAspectRatio="none">
          <filter id="sp-cta-clouds" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0034 0.006" numOctaves="5" seed="7" />
            <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.89  0 0 0 1.35 -0.62" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sp-cta-clouds)" />
        </svg>
      </div>
      <div className="ix-closing" data-reveal="up">
        <div>
          <h2>{title}</h2>
          <p style={{ margin: "14px 0 0", maxWidth: "52ch", fontSize: 17, lineHeight: 1.6, color: "var(--ix-muted)" }}>{description}</p>
        </div>
        <div className="ix-closing-actions">
          <a href={href} className="btn btn-light btn-lg">
            {label} <Icon name="arrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
