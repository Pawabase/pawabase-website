import { useEffect, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/Icon";

import "./site.css";

/*
 * The site's navigation, in the home page's frame: the logo; Products, Developers and Company open full-width
 * panels (Products is the whole catalogue, grouped, like Cloudflare's); Pricing is a plain link; sign in and get
 * started on the right. Panels open on hover or click and close on Escape, on a click outside, or when the pointer
 * leaves. On small screens one button opens everything as a list.
 */

const APP = "https://app.pawabase.com";
const DOCS = "https://docs.sillo.build";

export type Product = { label: string; href: string; line: string; icon: IconName };
export type ProductGroup = { title: string; items: Product[] };

export const PRODUCTS: ProductGroup[] = [
  {
    title: "Data",
    items: [
      { label: "Database", href: "/products/database", line: "Tables with an API from day one", icon: "database" },
      { label: "Data API", href: "/products/data-api", line: "Filters, relations and pages over REST", icon: "code" },
      { label: "Storage", href: "/products/storage", line: "Files, images and share links", icon: "storage" },
      { label: "Realtime", href: "/products/realtime", line: "Live updates, channels and presence", icon: "realtime" },
    ],
  },
  {
    title: "Identity & security",
    items: [
      { label: "Authentication", href: "/products/authentication", line: "Users, organizations and sign-in", icon: "users" },
      { label: "Access policies", href: "/products/policies", line: "Write a rule once, use it everywhere", icon: "policies" },
      { label: "API security", href: "/products/api-security", line: "Keys, scopes and rate limits", icon: "apiSecurity" },
    ],
  },
  {
    title: "Automation",
    items: [
      { label: "Flows", href: "/products/flows", line: "Workflows on any trigger", icon: "automation" },
      { label: "Queues", href: "/products/queues", line: "Background jobs with retries", icon: "queues" },
      { label: "Mail", href: "/products/mail", line: "Email from templates", icon: "mail" },
      { label: "Webhooks", href: "/products/webhooks", line: "Events in and out", icon: "webhooks" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Environments", href: "/products/releases", line: "Development to production, reviewed", icon: "refresh" },
      { label: "Observability", href: "/products/observability", line: "Logs, traces and alarms", icon: "activity" },
    ],
  },
];

type Menu = { id: string; label: string; feature: { title: string; line: string; cta: string; href: string }; groups: ProductGroup[] };

const MENUS: Menu[] = [
  {
    id: "products",
    label: "Products",
    feature: { title: "One system for your apps", line: "APIs, auth, storage, flows and agents, built to work together.", cta: "Start building", href: APP },
    groups: PRODUCTS,
  },
  {
    id: "developers",
    label: "Developers",
    feature: { title: "Read it, then ship it", line: "Guides, the API reference and a quickstart for your first project.", cta: "Open the docs", href: DOCS },
    groups: [
      {
        title: "Documentation",
        items: [
          { label: "Documentation", href: DOCS, line: "Guides for every part", icon: "document" },
          { label: "API reference", href: DOCS, line: "Every endpoint, documented", icon: "code" },
          { label: "Quickstart", href: DOCS, line: "From nothing to running", icon: "play" },
        ],
      },
      {
        title: "Build",
        items: [
          { label: "Access policies", href: "/products/policies", line: "How access works", icon: "policies" },
          { label: "API security", href: "/products/api-security", line: "Keys, scopes and limits", icon: "apiSecurity" },
          { label: "Pawabase Cloud", href: APP, line: "Start a managed project", icon: "sparkle" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    feature: { title: "Building Pawabase", line: "Who we are, what we're learning, and how to reach us.", cta: "About Pawabase", href: "/company" },
    groups: [
      {
        title: "Company",
        items: [
          { label: "About", href: "/company", line: "Why we're building Pawabase", icon: "sparkle" },
          { label: "Blog", href: "/blog", line: "Product and engineering notes", icon: "document" },
        ],
      },
      {
        title: "Work with us",
        items: [
          { label: "Careers", href: "/company/careers", line: "Help shape what comes next", icon: "users" },
          { label: "Contact", href: "/company/contact", line: "Talk to the team", icon: "mail" },
        ],
      },
    ],
  },
];

const external = (href: string) => href.startsWith("http");

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="sn-chevron">
      <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Item({ item }: { item: Product }) {
  return (
    <a href={item.href} className="sn-item" {...(external(item.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span className="sn-item-icon"><Icon name={item.icon} size={17} variant="Linear" /></span>
      <span className="sn-item-text">
        <b>{item.label}</b>
        <small>{item.line}</small>
      </span>
    </a>
  );
}

function Panel({ menu, onLeave }: { menu: Menu; onLeave: () => void }) {
  return (
    <div className="sn-panel" role="region" aria-label={menu.label} onMouseLeave={onLeave}>
      <div className="sn-feature">
        <p className="sn-feature-title">{menu.feature.title}</p>
        <p className="sn-feature-line">{menu.feature.line}</p>
        <a href={menu.feature.href} className="ix-btn primary small" {...(external(menu.feature.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
          {menu.feature.cta}
        </a>
      </div>
      <div className={`sn-groups n${menu.groups.length}`}>
        {menu.groups.map((group) => (
          <div key={group.title} className="sn-group">
            <p className="sn-group-title">{group.title}</p>
            {group.items.map((item) => <Item key={item.label + item.href} item={item} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const hover = useRef(0);

  useEffect(() => {
    const away = (e: MouseEvent) => {
      if (nav.current && !nav.current.contains(e.target as Node)) {
        setOpen(null);
        setMobile(false);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(hover.current);
    hover.current = window.setTimeout(fn, ms);
  };
  const current = MENUS.find((m) => m.id === open);

  return (
    <nav ref={nav} className="ix-nav sn" aria-label="Main" onMouseLeave={() => later(() => setOpen(null), 180)} onMouseEnter={() => window.clearTimeout(hover.current)}>
      <a href="/" className="ix-logo" aria-label="Pawabase home">
        <img src="/brand/horizontal-dark.svg" width={132} height={32} alt="Pawabase" />
      </a>

      <ul className="sn-links">
        {MENUS.slice(0, 2).map((m) => (
          <li key={m.id}>
            <button type="button" className={`sn-trigger ${open === m.id ? "on" : ""}`} aria-expanded={open === m.id} onClick={() => setOpen(open === m.id ? null : m.id)} onMouseEnter={() => later(() => setOpen(m.id), 90)}>
              {m.label}<Chevron />
            </button>
          </li>
        ))}
        <li><a href="/pricing" className="sn-trigger" onMouseEnter={() => later(() => setOpen(null), 90)}>Pricing</a></li>
        <li>
          <button type="button" className={`sn-trigger ${open === "company" ? "on" : ""}`} aria-expanded={open === "company"} onClick={() => setOpen(open === "company" ? null : "company")} onMouseEnter={() => later(() => setOpen("company"), 90)}>
            Company<Chevron />
          </button>
        </li>
      </ul>

      <div className="ix-nav-actions">
        <a href={APP} className="ix-nav-signin">Sign in</a>
        <a href={APP} className="ix-btn small">Get started</a>
        <button type="button" className="sn-burger" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <Icon name={mobile ? "close" : "menu"} size={20} variant="Linear" />
        </button>
      </div>

      {current && <Panel menu={current} onLeave={() => later(() => setOpen(null), 180)} />}

      {mobile && (
        <div className="sn-mobile">
          {MENUS.map((m) => (
            <div key={m.id} className="sn-mobile-group">
              <p className="sn-group-title">{m.label}</p>
              {m.groups.flatMap((g) => g.items).map((item) => <Item key={m.id + item.label + item.href} item={item} />)}
            </div>
          ))}
          <div className="sn-mobile-actions">
            <a href="/pricing" className="ix-btn">Pricing</a>
            <a href={APP} className="ix-btn primary">Get started</a>
          </div>
        </div>
      )}

      {/* the nav's bottom rule, bleeding past the page like every rule */}
      <span className="ix-rule bottom" aria-hidden="true">
        <i className="ix-rule-line" /><i className="ix-plus l" /><i className="ix-plus r" /><i className="ix-sq l" /><i className="ix-sq r" />
      </span>
    </nav>
  );
}
