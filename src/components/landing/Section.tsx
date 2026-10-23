import type { ReactNode } from "react";

export const RAIL_GRID =
  "grid grid-cols-[14px_minmax(0,1fr)_14px] min-[768px]:grid-cols-[42px_minmax(0,1fr)_42px] min-[1241px]:grid-cols-[minmax(86px,9.25%)_minmax(0,1fr)_minmax(86px,9.25%)]";

type RailSectionProps = {
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  className?: string;
  innerClassName?: string;
  lineClassName?: string;
  topBorder?: boolean;
  children: ReactNode;
};

export function RailSection({
  id,
  labelledBy,
  ariaLabel,
  className = "bg-shell",
  innerClassName = "",
  lineClassName = "border-line",
  topBorder = true,
  children,
}: RailSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={`relative ${topBorder ? `border-t ${lineClassName}` : ""} ${className}`}
    >
      <div className={RAIL_GRID}>
        <div
          className={`col-start-1 row-start-1 border-r ${lineClassName}`}
          aria-hidden="true"
        />
        <div className={`col-start-2 row-start-1 min-w-0 ${innerClassName}`}>
          {children}
        </div>
        <div
          className={`col-start-3 row-start-1 border-l ${lineClassName}`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-muted ${className}`}
    >
      {children}
    </p>
  );
}

/** The landing page's inner gutter, matched to the hero and footer. */
export const PAD =
  "px-6 min-[768px]:px-10 min-[981px]:px-14 min-[1241px]:px-16";

/** A section headline: the claim, then an optional quieter second line. */
export function Title({
  id,
  children,
  quiet,
  className = "",
}: {
  id: string;
  children: ReactNode;
  quiet?: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`text-[clamp(38px,4.4vw,62px)] font-medium leading-[1.06] tracking-[-0.045em] text-text text-balance ${className}`}
    >
      {children}
      {quiet ? <span className="block text-muted">{quiet}</span> : null}
    </h2>
  );
}

export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`max-w-[42ch] text-[18px] leading-[1.6] tracking-[-0.01em] text-muted ${className}`}
    >
      {children}
    </p>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-1.5 text-[16px] font-medium tracking-[-0.01em] text-text no-underline transition-colors duration-150 hover:text-brand ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

/**
 * An open section: no rails, no rules, just the page background and a
 * centred measure. Sections below the hero use this; the bento is the one
 * bordered object on the page.
 */
export function Band({
  id,
  labelledBy,
  ariaLabel,
  wide = false,
  backdrop,
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  /** The wider measure, for the bento and other full compositions. */
  wide?: boolean;
  /** A faint full-bleed texture behind the section (see Backdrops.tsx). */
  backdrop?: ReactNode;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      data-plain=""
      className={`relative ${backdrop ? "overflow-hidden" : ""} ${className}`}
    >
      {backdrop ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_240px,black_calc(100%-240px),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_240px,black_calc(100%-240px),transparent)]"
        >
          {backdrop}
        </div>
      ) : null}
      <div
        className={`relative mx-auto w-full ${wide ? "max-w-[1400px]" : "max-w-[1240px]"} px-5 min-[768px]:px-10 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/** A short list of claims: what the section's outcome is made of. */
export function Ledger({
  items,
  className = "",
}: {
  items: { title: string; copy: string }[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-5 min-[560px]:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-1">
          <span className="text-[17px] font-medium tracking-[-0.015em] text-text">
            {item.title}
          </span>
          <span className="text-[16px] leading-[1.55] tracking-[-0.01em] text-muted">
            {item.copy}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A soft card: one step lighter than the page, large corners, no rule. The
 * page's only surface; everything else sits directly on the background.
 */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`card relative overflow-hidden rounded-[24px] bg-card ring-1 ring-white/[0.04] ${className}`}
    >
      {children}
    </div>
  );
}
