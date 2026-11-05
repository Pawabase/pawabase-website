import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { Footer } from "@/components/landing/Footer";
import { Band, Card, TextLink } from "@/components/landing/Section";
import { Code, Mockup } from "@/components/landing/studio/Studio";
import { TopBar } from "@/components/landing/TopBar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { DOCS, SIGN_UP } from "@/lib/links";

/**
 * The product-page kit. Pages are marketing pages in the landing's language:
 * open bands on the page background, soft cards, small product crops and
 * hairline figures. The kit holds only the pieces every page shares; each
 * page composes its own sections so no two read alike.
 */


export function ProductShell({
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
        href="#product-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-text focus:px-4 focus:py-2 focus:text-shell"
      >
        Skip to content
      </a>
      <div className="relative min-h-screen overflow-clip bg-shell">
        <TopBar />
        <main
          id="product-content"
          className="relative [&>section:first-of-type]:border-b [&>section:first-of-type]:border-line [&>section:not(:first-of-type)]:!py-[clamp(22px,3vw,36px)] [&>section>.pointer-events-none]:hidden [&_.card]:hidden [&_.sx-window]:hidden [&_[data-visual]]:hidden [&>section>div_.mx-auto]:!ml-0 [&>section>div_.text-center]:!text-left [&>section>div_.justify-center]:!justify-start [&>section>div_.items-center.flex-col]:!items-start [&>section>div_ul.flex-wrap_li]:!text-[17px] [&>section>div_ul.flex-wrap_li]:!tracking-normal"
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

/** The small marker above a product headline: a bordered icon tile and the name. */
export function ProductName({ icon, name }: { icon?: IconName; name: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px] text-muted">
      <span className="flex size-11 items-center justify-center rounded-[10px] border border-line bg-white/[0.02] text-brand">
        <Icon name={icon ?? "database"} size={22} variant="TwoTone" />
      </span>
      {name}
    </span>
  );
}

export function Display({
  children,
  quiet,
  className = "",
}: {
  children: ReactNode;
  quiet?: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-[clamp(36px,4.4vw,58px)] font-medium leading-[1.06] tracking-[-0.03em] text-text text-balance ${className}`}
    >
      {children}
      {quiet ? <span className="block text-muted">{quiet}</span> : null}
    </h1>
  );
}

export function HeroActions({ docs = "Read the docs" }: { docs?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={SIGN_UP}
        className="btn-clay inline-flex h-[50px] items-center justify-center gap-2 px-[25px] text-[14px] no-underline"
      >
        Start building
        <Icon name="arrowRight" size={17} />
      </a>
      <a
        href={DOCS}
        target="_blank"
        rel="noreferrer"
        className="btn-clay-dark inline-flex h-[50px] items-center justify-center px-[25px] text-[14px] no-underline"
      >
        {docs}
      </a>
    </div>
  );
}

/** Short claims as plain sub-sections: a small heading and a paragraph each. */
export function Points({
  items,
  className = "",
}: {
  items: { icon: IconName; title: string; copy: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div className={`grid max-w-[680px] gap-7 !mx-0 ${className}`}>
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="m-0 text-[18px] font-medium tracking-[-0.015em] text-text">{item.title}</h3>
          <p className="m-0 mt-2 text-[16px] leading-[1.75] text-muted">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}

/** Code in Studio's editor view, inside a soft card with its file name. */
export function CodeCard({
  file,
  lines,
  label,
  className = "",
}: {
  file: string;
  lines: string[];
  label: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <Mockup label={label} className="block">
        <div className="flex items-center gap-2 px-5 pt-4 text-[12.5px] text-[var(--sx-muted)]">
          <Icon name="code" size={14} variant="TwoTone" className="text-[var(--sx-brand)]" />
          {file}
        </div>
        <div className="overflow-x-auto pb-3">
          <Code lines={lines} />
        </div>
      </Mockup>
    </Card>
  );
}

/** A section's copy. Pictures are left to the opening band only, and hidden there too. */
export function Split({
  copy,
  className = "",
}: {
  copy: ReactNode;
  visual?: ReactNode;
  flip?: boolean;
  ratio?: "1fr_1fr" | "wide-visual" | "wide-copy";
  className?: string;
}) {
  return <div className={`max-w-[720px] ${className}`}>{copy}</div>;
}

/** A section's copy: a heading that reads as one sentence, then a plain paragraph. */
export function Copy({
  id,
  title,
  quiet,
  children,
  link,
}: {
  id: string;
  title: ReactNode;
  quiet?: ReactNode;
  children?: ReactNode;
  center?: boolean;
  link?: { label: string; href?: string };
}) {
  return (
    <div className="flex max-w-[720px] flex-col gap-4">
      <h2
        id={id}
        className="m-0 text-[clamp(24px,2.6vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-text"
      >
        {title}
        {quiet ? <span className="text-muted"> {quiet}</span> : null}
      </h2>
      {children ? <p className="m-0 max-w-[660px] text-[16px] leading-[1.75] text-muted">{children}</p> : null}
      {link ? <TextLink href={link.href ?? DOCS}>{link.label}</TextLink> : null}
    </div>
  );
}

/** The close of every product page: one sentence, the actions, and where to go next. */
export function ProductCta({
  title,
  quiet,
  next,
}: {
  title: string;
  quiet: string;
  next: { label: string; href: string };
  backdrop?: ReactNode;
}) {
  return (
    <Band labelledBy="product-cta-title" className="!pb-[clamp(56px,7vw,96px)] !pt-[clamp(32px,4vw,56px)]">
      <div className="max-w-[720px]">
        <h2
          id="product-cta-title"
          className="m-0 text-[clamp(24px,2.6vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-text"
        >
          {title}
          <span className="text-muted"> {quiet}</span>
        </h2>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={SIGN_UP}
            className="btn-clay inline-flex h-[48px] items-center justify-center gap-2 px-[22px] text-[14px] no-underline"
          >
            Start building
            <Icon name="arrowRight" size={16} />
          </a>
          <a
            href={next.href}
            className="btn-clay-dark inline-flex h-[48px] items-center justify-center px-[22px] text-[14px] no-underline"
          >
            {next.label}
          </a>
        </div>
      </div>
    </Band>
  );
}
