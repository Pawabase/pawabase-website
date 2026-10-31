import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { Footer } from "@/components/landing/Footer";
import { PrimaryButton } from "@/components/landing/PrimaryButton";
import { Band, Card, Lead, TextLink } from "@/components/landing/Section";
import { Code, Mockup } from "@/components/landing/studio/Studio";
import { TopBar } from "@/components/landing/TopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

/**
 * The product-page kit. Pages are marketing pages in the landing's language:
 * open bands on the page background, soft cards, small product crops and
 * hairline figures. The kit holds only the pieces every page shares; each
 * page composes its own sections so no two read alike.
 */

export const APP_URL = "https://app.pawabase.com";
export const DOCS_URL = "https://docs.sillo.build";

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
        <main id="product-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

/** The plain context line above a product headline: Bulk icon and name, never a pill. */
export function ProductName({ icon, name }: { icon: IconName; name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-muted">
      <Icon name={icon} size={20} variant="TwoTone" className="text-brand" />
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
      className={`text-[clamp(42px,5vw,72px)] font-normal leading-[1.03] tracking-[-0.05em] text-text text-balance ${className}`}
    >
      {children}
      {quiet ? <span className="block text-muted">{quiet}</span> : null}
    </h1>
  );
}

export function HeroActions({ docs = "Read the docs" }: { docs?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <PrimaryButton href={APP_URL} className="inline-flex">
        Start building
        <Icon name="arrowRight" size={17} />
      </PrimaryButton>
      <TextLink href={DOCS_URL}>{docs}</TextLink>
    </div>
  );
}

/** Short claims with a Bulk icon each, laid out in a row of two, three or four. */
export function Points({
  items,
  columns = 3,
  className = "",
}: {
  items: { icon: IconName; title: string; copy: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const grid =
    columns === 4
      ? "min-[640px]:grid-cols-2 min-[1000px]:grid-cols-4"
      : columns === 2
        ? "min-[640px]:grid-cols-2"
        : "min-[760px]:grid-cols-3";

  return (
    <ul className={`grid gap-x-10 gap-y-9 ${grid} ${className}`}>
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-2">
          <Icon name={item.icon} size={24} variant="TwoTone" className="text-brand" />
          <span className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-text">
            {item.title}
          </span>
          <span className="max-w-[40ch] text-[16px] leading-[1.6] tracking-[-0.01em] text-muted">
            {item.copy}
          </span>
        </li>
      ))}
    </ul>
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

/** Copy on one side, a visual on the other. `flip` puts the visual first. */
export function Split({
  copy,
  visual,
  flip = false,
  ratio = "1fr_1fr",
  className = "",
}: {
  copy: ReactNode;
  visual: ReactNode;
  flip?: boolean;
  ratio?: "1fr_1fr" | "wide-visual" | "wide-copy";
  className?: string;
}) {
  const cols =
    ratio === "wide-visual"
      ? "min-[1000px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      : ratio === "wide-copy"
        ? "min-[1000px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        : "min-[1000px]:grid-cols-2";
  const flipCols =
    ratio === "wide-visual"
      ? "min-[1000px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
      : ratio === "wide-copy"
        ? "min-[1000px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        : "min-[1000px]:grid-cols-2";

  return (
    <div className={`grid items-center gap-12 min-[1000px]:gap-16 ${flip ? flipCols : cols} ${className}`}>
      <div className={flip ? "min-[1000px]:order-2" : ""}>{copy}</div>
      <div className={`min-w-0 ${flip ? "min-[1000px]:order-1" : ""}`}>{visual}</div>
    </div>
  );
}

/** A section's copy block: headline, a quieter line, a short paragraph. */
export function Copy({
  id,
  title,
  quiet,
  children,
  center = false,
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
    <div className={`flex flex-col gap-5 ${center ? "mx-auto max-w-[680px] items-center text-center" : ""}`}>
      <h2
        id={id}
        className="text-[clamp(34px,3.8vw,52px)] font-medium leading-[1.06] tracking-[-0.045em] text-text text-balance"
      >
        {title}
        {quiet ? <span className="block text-muted">{quiet}</span> : null}
      </h2>
      {children ? <Lead className={center ? "max-w-[50ch]" : "max-w-[42ch]"}>{children}</Lead> : null}
      {link ? <TextLink href={link.href ?? DOCS_URL}>{link.label}</TextLink> : null}
    </div>
  );
}

/** The close of every product page: one line, the action, and where to go next. */
export function ProductCta({
  title,
  quiet,
  next,
  backdrop,
}: {
  title: string;
  quiet: string;
  next: { label: string; href: string };
  backdrop?: ReactNode;
}) {
  return (
    <Band labelledBy="product-cta-title" className="py-[clamp(88px,10vw,148px)]" backdrop={backdrop}>
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-8 text-center">
        <h2
          id="product-cta-title"
          className="text-[clamp(38px,4.6vw,64px)] font-normal leading-[1.04] tracking-[-0.05em] text-text text-balance"
        >
          {title}
          <span className="block text-muted">{quiet}</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <PrimaryButton href={APP_URL} className="inline-flex">
            Start building
            <Icon name="arrowRight" size={17} />
          </PrimaryButton>
          <TextLink href={next.href}>{next.label}</TextLink>
        </div>
      </div>
    </Band>
  );
}
