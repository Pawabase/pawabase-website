import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { Footer } from "@/components/landing/Footer";
import { TopBar } from "@/components/landing/TopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

export const COMPANY_EMAIL = "hello@pawabase.com";

export function CompanyShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  usePageMeta(`${title} | Pawabase`, description);

  return (
    <div className="min-h-screen bg-shell">
      <a
        href="#company-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-text focus:px-4 focus:py-2 focus:text-shell"
      >
        Skip to content
      </a>
      <div className="relative min-h-screen overflow-clip bg-shell">
        <TopBar />
        <main id="company-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export function CompanyHero({
  label,
  title,
  quiet,
  description,
  icon = "sparkle",
  children,
}: {
  label: string;
  title: string;
  quiet?: string;
  description: string;
  icon?: IconName;
  children?: ReactNode;
}) {
  return (
    <section data-plain="" className="relative overflow-hidden border-b border-line-subtle">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(245,243,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]"
      />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 px-5 pb-[clamp(80px,11vw,152px)] pt-[clamp(76px,10vw,132px)] min-[768px]:px-10 min-[980px]:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] min-[980px]:items-end">
        <div>
          <p className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-muted">
            <Icon name={icon} size={20} variant="TwoTone" className="text-brand" />
            {label}
          </p>
          <h1 className="mt-7 max-w-[880px] text-[clamp(48px,7vw,92px)] font-normal leading-[0.98] tracking-[-0.062em] text-text text-balance">
            {title}
            {quiet ? <span className="block text-muted">{quiet}</span> : null}
          </h1>
        </div>
        <div className="min-[980px]:pb-2">
          <p className="max-w-[48ch] text-[18px] leading-[1.68] tracking-[-0.01em] text-muted">
            {description}
          </p>
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function CompanySection({
  children,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      data-plain=""
      aria-labelledby={labelledBy}
      className={`border-b border-line-subtle py-[clamp(72px,9vw,120px)] ${className}`}
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 min-[768px]:px-10">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  id,
  label,
  title,
  description,
}: {
  id: string;
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-[760px]">
      {label ? (
        <p className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
          {label}
        </p>
      ) : null}
      <h2 id={id} className="text-[clamp(34px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.05em] text-text text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.72] tracking-[-0.01em] text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group inline-flex items-center gap-2 text-[15px] font-semibold text-text no-underline transition-colors hover:text-brand"
    >
      {children}
      <Icon name="arrowRight" size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

export function CompanyCta({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <CompanySection className="!border-b-0">
      <div className="grid gap-8 min-[800px]:grid-cols-[minmax(0,1fr)_auto] min-[800px]:items-end">
        <div>
          <h2 className="max-w-[760px] text-[clamp(38px,4.7vw,66px)] font-normal leading-[1.04] tracking-[-0.052em] text-text text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-muted">
            {description}
          </p>
        </div>
        <a
          href={href}
          className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg bg-text px-5 text-[15px] font-bold text-shell no-underline transition-colors hover:bg-brand"
        >
          {label}
          <Icon name="arrowRight" size={17} />
        </a>
      </div>
    </CompanySection>
  );
}
