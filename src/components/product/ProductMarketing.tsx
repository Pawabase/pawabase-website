import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { CodeSnippet } from "@/components/landing/CodeSnippet";
import { Footer } from "@/components/landing/Footer";
import { TopBar } from "@/components/landing/TopBar";

import "./product-marketing.css";

const APP_URL = "https://app.pawabase.com";
const DOCS_URL = "https://docs.sillo.build";

type AccentStyle = CSSProperties & {
  "--pm-accent"?: string;
  "--pm-accent-rgb"?: string;
};
type HeroLayout = "visual-wide" | "visual-left" | "centered";
type SceneLayout = "visual-wide" | "copy-wide" | "stacked";

function accentStyle(accent: string): AccentStyle {
  return {
    "--pm-accent": `rgb(${accent})`,
    "--pm-accent-rgb": accent,
  };
}

export function ProductFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pm-page ${className}`}>
      <a className="pm-skip" href="#product-content">
        Skip to content
      </a>
      <div className="pm-nav">
        <TopBar />
      </div>
      <div className="pm-contours" aria-hidden="true">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 20 }, (_, index) => {
            const offset = index * 32;

            return (
              <path
                key={index}
                d={`M ${320 + offset} -180 C ${-180 + offset} 90, ${900 + offset} 180, ${490 + offset} 430 S ${130 + offset} 780, ${1100 + offset} 1050`}
              />
            );
          })}
        </svg>
      </div>
      <main id="product-content">{children}</main>
      <Footer />
    </div>
  );
}

export function ProductHero({
  icon,
  eyebrow,
  title,
  description,
  accent,
  layout = "visual-wide",
  children,
}: {
  icon: IconName;
  eyebrow?: string;
  title: string;
  description: string;
  accent: string;
  layout?: HeroLayout;
  children: ReactNode;
}) {
  return (
    <section
      className={`pm-hero pm-hero--${layout}`}
      aria-labelledby="product-hero-title"
      style={accentStyle(accent)}
    >
      <div className="pm-container pm-hero-grid">
        <div className="pm-hero-copy">
          {eyebrow ? (
            <p className="pm-eyebrow">
              <Icon name={icon} size={20} />
              {eyebrow}
            </p>
          ) : null}

          <h1 id="product-hero-title" className="pm-title">
            {title}
          </h1>

          <p className="pm-lead">{description}</p>

          <ProductActions
            secondaryHref="/#features"
            secondaryLabel="See all products"
          />
        </div>

        <div className="pm-hero-visual">{children}</div>
      </div>
    </section>
  );
}

export function ProductActions({
  secondaryHref = DOCS_URL,
  secondaryLabel = "Explore the docs",
}: {
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="pm-actions">
      <a className="pm-primary" href={APP_URL}>
        Start building
        <Icon name="arrowRight" size={20} />
      </a>
      <a className="pm-link" href={secondaryHref}>
        {secondaryLabel}
        <Icon name="arrowRight" size={19} />
      </a>
    </div>
  );
}

export function VisualStage({ children }: { children: ReactNode }) {
  return <div className="pm-visual-stage">{children}</div>;
}

export function Connector({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`pm-connector ${className}`} />;
}

export function MockCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`pm-mock-card ${className}`}>{children}</div>;
}

export function MockHeader({
  label,
  meta,
}: {
  label: string;
  meta?: string;
}) {
  return (
    <div className="pm-mock-header">
      <span className="pm-mock-title">{label}</span>
      {meta ? <span className="pm-mock-meta">{meta}</span> : null}
    </div>
  );
}

export function MiniRow({
  icon,
  label,
  value,
  accent,
}: {
  icon?: IconName;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="pm-mini-row">
      {icon ? (
        <span
          className="pm-mini-icon"
          style={accent ? { color: `rgb(${accent})` } : undefined}
        >
          <Icon name={icon} size={17} />
        </span>
      ) : (
        <span className="pm-mini-dot" aria-hidden="true" />
      )}
      <span className="pm-mini-label">{label}</span>
      <span className="pm-mini-value">{value}</span>
    </div>
  );
}

export function Pill({
  children,
  active = false,
  accent,
}: {
  children: ReactNode;
  active?: boolean;
  accent?: string;
}) {
  const style =
    active && accent
      ? {
          color: `rgb(${accent})`,
          borderColor: `rgba(${accent}, 0.32)`,
          background: `rgba(${accent}, 0.09)`,
        }
      : undefined;

  return (
    <span className={`pm-pill${active ? " is-active" : ""}`} style={style}>
      {children}
    </span>
  );
}

export function MetricBand({
  accent,
  items,
}: {
  accent: string;
  items: { value: string; label: string }[];
}) {
  return (
    <section
      className="pm-metric-band"
      aria-label="Product highlights"
      style={accentStyle(accent)}
    >
      <div className="pm-container pm-metric-grid">
        {items.map((item) => (
          <div key={item.value} className="pm-metric">
            <p className="pm-metric-value">{item.value}</p>
            <p className="pm-metric-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureScene({
  layout = "visual-wide",
  title,
  description,
  linkLabel,
  accent,
  reverse = false,
  children,
}: {
  layout?: SceneLayout;
  title: string;
  description: string;
  linkLabel: string;
  accent: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`pm-section pm-scene pm-scene--${layout}${
        reverse ? " pm-scene--reverse" : ""
      }`}
      style={accentStyle(accent)}
    >
      <div className="pm-container pm-scene-grid">
        <div className="pm-scene-copy">
          <h2 className="pm-heading">{title}</h2>
          <p className="pm-copy">{description}</p>
          <a className="pm-doc-link" href={DOCS_URL}>
            {linkLabel}
            <Icon name="arrowRight" size={17} />
          </a>
        </div>

        <div className="pm-scene-visual">{children}</div>
      </div>
    </section>
  );
}

export function CenterScene({
  title,
  description,
  linkLabel,
  accent,
  children,
}: {
  title: string;
  description: string;
  linkLabel: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section className="pm-section pm-center-scene" style={accentStyle(accent)}>
      <div className="pm-container">
        <div className="pm-center-copy">
          <h2 className="pm-heading">{title}</h2>
          <p className="pm-copy">{description}</p>
          <a className="pm-doc-link" href={DOCS_URL}>
            {linkLabel}
            <Icon name="arrowRight" size={17} />
          </a>
        </div>

        <div className="pm-center-visual">{children}</div>
      </div>
    </section>
  );
}

export function CodePanel({
  title,
  lines,
  accent = "255,112,73",
}: {
  title: string;
  lines: string[];
  accent?: string;
}) {
  return (
    <div className="pm-code-panel" style={accentStyle(accent)}>
      <CodeSnippet lines={lines} label={title} />
    </div>
  );
}

export function ProductCta({
  title,
  nextHref,
  nextLabel,
  accent,
}: {
  title: string;
  nextHref: string;
  nextLabel: string;
  accent: string;
}) {
  return (
    <section
      className="pm-end"
      aria-label="Build with Pawabase"
      style={accentStyle(accent)}
    >
      <div className="pm-container pm-end-inner">
        <div>
          <p className="pm-eyebrow">Build with Pawabase</p>
          <h2 className="pm-heading">{title}</h2>
        </div>

        <ProductActions
          secondaryHref={nextHref}
          secondaryLabel={`Explore ${nextLabel}`}
        />
      </div>
    </section>
  );
}
