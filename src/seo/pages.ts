import { absolute } from "./site.ts";

/**
 * Every page of the site, once. The browser reads it to keep the tab title, canonical address and share tags right as people
 * navigate; the build reads it to write each page's own HTML, the sitemap, the share images and llms.txt.
 *
 * Titles stay within about 60 characters and descriptions within 160, which is what search results show before cutting. The
 * build fails when one doesn't.
 */

export type Page = {
  path: string;
  /** The tab title and search result headline. */
  title: string;
  /** The search result snippet and the text under a shared link. */
  description: string;
  kind: "home" | "product" | "pricing" | "company" | "legal";
  /** The page's own name: breadcrumbs and link text. */
  name: string;
  /** The file that holds the page, for the sitemap's last-modified date. */
  source: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  /** Kept out of search results, still reachable. */
  noindex?: boolean;
  /** For the product index in llms.txt and the breadcrumb trail. */
  group?: string;
};

const product = (
  slug: string,
  name: string,
  group: string,
  title: string,
  description: string,
  file: string,
): Page => ({
  path: `/products/${slug}`,
  title,
  description,
  kind: "product",
  name,
  source: `src/pages/products/${file}.tsx`,
  priority: 0.8,
  changefreq: "monthly",
  group,
});

const legal = (slug: string, name: string, description: string, file: string): Page => ({
  path: `/legal/${slug}`,
  title: `${name} | Pawabase`,
  description,
  kind: "legal",
  name,
  source: `src/pages/legal/${file}.tsx`,
  priority: 0.3,
  changefreq: "yearly",
});

export const PAGES: Page[] = [
  {
    path: "/",
    title: "Pawabase | Build apps and APIs: data, auth, flows and agents",
    description: "Build apps and APIs on one system: Postgres data, auth, access policies, storage, flows and agents. Every table is a REST API, shared by your apps, team and AI.",
    kind: "home",
    name: "Pawabase",
    source: "src/pages/Landing.tsx",
    priority: 1,
    changefreq: "weekly",
  },
  {
    path: "/pricing",
    title: "Pricing | Pawabase: start free, every plan has the whole system",
    description: "Pawabase Cloud pricing: start free, and every plan includes the whole system. Pick a plan by projects, database size and users, not by which features you get.",
    kind: "pricing",
    name: "Pricing",
    source: "src/pages/Pricing.tsx",
    priority: 0.9,
    changefreq: "monthly",
  },

  product("database", "Database", "Data", "Postgres Database with an Instant API | Pawabase", "Build your app's backend on Postgres tables with an API from day one: access rules, a visual editor, relations, vector search and safe schema changes.", "Database"),
  product("data-api", "Data API", "Data", "REST Data API for Every Table | Pawabase", "Build an API without writing one: a REST API for every table with filters, relations, full-text search, pagination, OpenAPI docs and API versions.", "DataApi"),
  product("storage", "Storage", "Data", "File Storage with Access Rules and Share Links | Pawabase", "File storage with per-action access rules, share links that expire, on-the-fly image resizing, folders and S3-compatible backends.", "Storage"),
  product("realtime", "Realtime", "Data", "Realtime: Live Changes, Channels and Presence | Pawabase", "Live table changes, channels, presence and durable message history over WebSockets or server-sent events, under the same access rules as the rest of your data.", "Realtime"),

  product("authentication", "Authentication", "Identity & security", "Authentication: Passkeys, SSO, MFA and Organizations | Pawabase", "Add sign-in to your app or API: email, passkeys, social and company login, two-step verification, organizations, roles and sessions, tied to your data.", "Authentication"),
  product("policies", "Access policies", "Identity & security", "Access Policies for Tables, Files, Flows and Routes | Pawabase", "Write an access rule once and reuse it across tables, files, channels, flows and routes, enforced in the database so it can't be skipped.", "Policies"),
  product("api-security", "API security", "Identity & security", "API Security: Scoped Keys, Rate Limits and Audit Log | Pawabase", "Publishable and secret keys, keys scoped to routes and addresses, expiring keys, rate limits and an audit log of who did what.", "ApiSecurity"),

  product("flows", "Flows", "Automation", "Visual Workflow Automation with AI Steps | Pawabase", "Build app logic and API endpoints as visual workflows with eight kinds of triggers, branches, loops, retries, AI and agent steps, and a full history of every run.", "Flows"),
  product("queues", "Queues", "Automation", "Background Jobs and Queues with Retries | Pawabase", "Background jobs with durable retries and schedules, plus failed jobs you can see, inspect and run again.", "Queues"),
  product("mail", "Mail", "Automation", "Transactional Email with a Visual Template Editor | Pawabase", "Transactional email with a visual template editor, sign-in emails, sends from flows, a delivery log and retries over your own SMTP.", "Mail"),
  product("webhooks", "Webhooks", "Automation", "Webhooks: Inbound Triggers, Signed Outbound Events | Pawabase", "Inbound webhooks that start flows, and signed, retried outbound events with a history of every delivery.", "Webhooks"),

  product("observability", "Observability", "Operate", "Observability: Logs, Traces, Metrics and Alarms | Pawabase", "Request logs, traces, metrics, alarms, dashboards, an audit log and a public status page for everything your system does.", "Observability"),
  product("releases", "Environments", "Operate", "Dev, Staging and Production Environments | Pawabase", "Separate development, staging and production environments, reviewed promotion, short-lived previews, side-by-side API versions and backups.", "Releases"),

  {
    path: "/company",
    title: "About Pawabase: we build the system | Pawabase",
    description: "Pawabase gives developers one place to build the data, rules, flows and agents that their apps, their team and their AI all use.",
    kind: "company",
    name: "About",
    source: "src/pages/company/About.tsx",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/company/careers",
    title: "Careers at Pawabase: a small team building one product",
    description: "Work with Pawabase: a small team building data, identity, automation and AI as one product. No open roles listed yet, but thoughtful introductions are welcome.",
    kind: "company",
    name: "Careers",
    source: "src/pages/company/Careers.tsx",
    priority: 0.4,
    changefreq: "monthly",
  },
  {
    path: "/company/contact",
    title: "Contact Pawabase | Product, partnerships and press",
    description: "Contact the Pawabase team about the product, partnerships, press, or working together. A person will read it.",
    kind: "company",
    name: "Contact",
    source: "src/pages/company/Contact.tsx",
    priority: 0.4,
    changefreq: "yearly",
  },
  {
    path: "/blog",
    title: "Pawabase Blog | Product updates and engineering notes",
    description: "Product updates and engineering notes from the people building Pawabase.",
    kind: "company",
    name: "Blog",
    source: "src/pages/company/Blog.tsx",
    priority: 0.4,
    changefreq: "weekly",
    // Until the first story is published there is nothing here worth a place in search results.
    noindex: true,
  },

  legal("privacy", "Privacy Policy", "How Pawabase collects, uses, and protects your personal information when you use our website, products, and services.", "Privacy"),
  legal("terms", "Terms of Service", "The terms and conditions governing your use of Pawabase's website, products, and services.", "Terms"),
  legal("cookies", "Cookie Policy", "How Pawabase uses cookies and similar tracking technologies on our website.", "Cookies"),
  legal("refund", "Refund Policy", "Our policy regarding refunds for Pawabase paid services and subscriptions.", "Refund"),
  legal("dpa", "Data Processing Addendum", "Terms governing the processing of personal data in accordance with applicable data protection laws, including GDPR.", "Dpa"),
  legal("acceptable-use", "Acceptable Use Policy", "Guidelines for appropriate and safe use of Pawabase's services and platform.", "AcceptableUse"),
];

export const pageAt = (path: string): Page | undefined => {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return PAGES.find((p) => p.path === clean);
};

/** Every page shares one image, made by scripts/seo/og.mjs. */
export const ogImagePath = (_page?: Page) => "/og.png";
export const ogImage = (page: Page) => absolute(ogImagePath(page));
export const canonical = (page: Page) => absolute(page.path === "/" ? "/" : page.path);
