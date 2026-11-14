import { useEffect, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/Icon";

import "./site.css";
import { DOCS, SIGN_IN, SIGN_UP } from "@/lib/links";

/*
 * The site's navigation, after Clerk's: a floating bar with rounded corners (the logo, a divider, the menus, then sign in and
 * get started on the right). Products, Developers and Company each open a compact card under their own trigger: small
 * uppercase group labels, each link a matte icon tile with its name and one line, and a footer row under a hairline with the
 * menu's main action. Menus open on hover or click and close on Escape, on a click outside, or when the pointer leaves. On
 * small screens one button opens everything as a list.
 */

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
    feature: { title: "One system for your apps", line: "APIs, auth, storage, flows and agents, built to work together.", cta: "Start building", href: SIGN_UP },
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
          { label: "Pawabase Cloud", href: SIGN_UP, line: "Start a managed project", icon: "sparkle" },
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
const outside = (href: string) => (external(href) ? { target: "_blank", rel: "noreferrer" } : {});

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="sn-chevron">
      <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Item({ item }: { item: Product }) {
  return (
    <a href={item.href} className="sn-item" {...outside(item.href)}>
      <span className="sn-tile"><Icon name={item.icon} size={17} variant="Linear" /></span>
      <span className="sn-item-text">
        <b>{item.label}</b>
        <small>{item.line}</small>
      </span>
    </a>
  );
}

/** A menu's card: its groups in columns (two groups to a column when there are more than two), then the footer row. */
function Panel({ menu }: { menu: Menu }) {
  const columns = menu.groups.length > 2
    ? [menu.groups.slice(0, Math.ceil(menu.groups.length / 2)), menu.groups.slice(Math.ceil(menu.groups.length / 2))]
    : menu.groups.map((g) => [g]);
  return (
    <div className="sn-panel" role="region" aria-label={menu.label}>
      <div className="sn-columns">
        {columns.map((column, i) => (
          <div key={i} className="sn-column">
            {column.map((group) => (
              <div key={group.title} className="sn-group">
                <p className="sn-label">{group.title}</p>
                {group.items.map((item) => <Item key={item.label + item.href} item={item} />)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sn-foot">
        <span>
          <b>{menu.feature.title}</b>
          <small>{menu.feature.line}</small>
        </span>
        <a href={menu.feature.href} className="btn btn-sm" {...outside(menu.feature.href)}>
          {menu.feature.cta}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.5M8.5 4 12.5 8l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
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

  return (
    <nav ref={nav} className="sn" aria-label="Main" onMouseLeave={() => later(() => setOpen(null), 180)} onMouseEnter={() => window.clearTimeout(hover.current)}>
      <a href="/" className="sn-logo" aria-label="Pawabase home">
        <img src="/brand/horizontal-dark.svg" width={124} height={30} alt="Pawabase" />
      </a>
      <span className="sn-divider" aria-hidden="true" />

      <ul className="sn-links">
        {MENUS.map((m) => (
          <li key={m.id}>
            <button type="button" className={`sn-trigger ${open === m.id ? "on" : ""}`} aria-expanded={open === m.id}
              onClick={() => setOpen(open === m.id ? null : m.id)} onMouseEnter={() => later(() => setOpen(m.id), 90)}>
              {m.label}<Chevron />
            </button>
            {open === m.id && <Panel menu={m} />}
          </li>
        ))}
        <li><a href="/pricing" className="sn-trigger" onMouseEnter={() => later(() => setOpen(null), 90)}>Pricing</a></li>
      </ul>

      <div className="sn-actions">
        <a href={SIGN_IN} className="btn btn-ghost btn-sm sn-signin">Sign in</a>
        <span className="sn-divider sn-signin" aria-hidden="true" />
        <a href={SIGN_UP} className="btn btn-light btn-sm">Get started</a>
        <button type="button" className="btn btn-ghost btn-sm sn-burger" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <Icon name={mobile ? "close" : "menu"} size={20} variant="Linear" />
        </button>
      </div>

      {mobile && (
        <div className="sn-mobile">
          {MENUS.map((m) => (
            <div key={m.id} className="sn-mobile-group">
              <p className="sn-label">{m.label}</p>
              {m.groups.flatMap((g) => g.items).map((item) => <Item key={m.id + item.label + item.href} item={item} />)}
            </div>
          ))}
          <div className="sn-mobile-actions">
            <a href="/pricing" className="btn">Pricing</a>
            <a href={SIGN_IN} className="btn">Sign in</a>
            <a href={SIGN_UP} className="btn btn-light">Get started</a>
          </div>
        </div>
      )}
    </nav>
  );
}
