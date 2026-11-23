import blog from "../content/blog.json" with { type: "json" };
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
  kind: "home" | "product" | "pricing" | "company" | "legal" | "blog" | "post";
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
  /** The route file, when the address isn't the file's own path (/blog/$slug serves every post). */
  route?: string;
  /** More build chunks the page needs at once (a post's own MDX module), preloaded with it. */
  chunks?: string[];
  /** Its own share image instead of the site's. */
  image?: string;
  /** When it last changed, for the sitemap; otherwise the source file's last commit. */
  modified?: string;
  /** A blog post: what search engines and link previews read as an article. */
  article?: { published: string; modified: string; authors: string[]; tags: string[]; section?: string; words: number; minutes: number; slug: string };
};

// ── the blog's pages, from src/content/blog.json (scripts/blog/collect.mjs) ──

type BlogPost = (typeof blog.posts)[number];
const BLOG_TITLE = "Pawabase Blog | Product updates and engineering notes";
const BLOG_DESCRIPTION = "Product updates, engineering notes and guides from the people building Pawabase, the complete backend for anything you build.";
const blogPages = Math.max(1, Math.ceil(Math.max(0, blog.posts.length - 1) / blog.perPage));

/** A post's title in results: with the site's name when it still fits, without it when it would be cut. */
const postTitle = (title: string) => (`${title} | Pawabase`.length <= 62 ? `${title} | Pawabase` : title);

const blogIndexPages: Page[] = Array.from({ length: blogPages }, (_, i) => {
  const n = i + 1;
  return {
    path: n === 1 ? "/blog" : `/blog/page/${n}`,
    title: n === 1 ? BLOG_TITLE : `Pawabase Blog, page ${n} | Updates and engineering notes`,
    description: n === 1 ? BLOG_DESCRIPTION : `${BLOG_DESCRIPTION.replace(/\.$/, "")}. Page ${n} of ${blogPages}.`,
    kind: "blog",
    name: n === 1 ? "Blog" : `Blog, page ${n}`,
    source: "src/pages/blog/BlogList.tsx",
    route: n === 1 ? "src/routes/blog/index.tsx" : "src/routes/blog/page.$page.tsx",
    priority: n === 1 ? 0.7 : 0.4,
    changefreq: "weekly",
    // nothing to show until the first post is published
    noindex: blog.posts.length === 0,
    modified: blog.posts[0]?.updated ?? blog.posts[0]?.date,
  };
});

const blogTagPages: Page[] = blog.tags.map((t) => ({
  path: `/blog/tag/${t.slug}`,
  title: `${t.name} posts | Pawabase Blog`,
  description: `Everything the Pawabase team has written about ${t.name}: product updates, engineering notes and guides, newest first.`,
  kind: "blog",
  name: t.name,
  source: "src/pages/blog/BlogList.tsx",
  route: "src/routes/blog/tag.$tag.tsx",
  priority: 0.3,
  changefreq: "weekly",
  // a topic with a single post is thin: reachable, not in results
  noindex: t.count < 2,
}));

const postPage = (post: BlogPost): Page => ({
  path: `/blog/${post.slug}`,
  title: postTitle(post.title),
  description: post.description,
  kind: "post",
  name: post.title,
  source: post.source,
  route: "src/routes/blog/$slug.tsx",
  chunks: [post.source],
  priority: 0.6,
  changefreq: "monthly",
  image: `/blog/${post.slug}/og.png`,
  modified: post.updated ?? post.date,
  article: {
    published: post.date,
    modified: post.updated ?? post.date,
    authors: post.authors.map((id) => (blog.authors as Record<string, { name: string }>)[id]?.name ?? id),
    tags: post.tags,
    section: post.category ?? undefined,
    words: post.words,
    minutes: post.readingTime,
    slug: post.slug,
  },
});

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
    title: "Pawabase | The complete backend for anything you build",
    description: "Data, APIs, auth, access rules, storage, flows and AI agents in one backend, from a weekend project to the system a company runs on. Start free.",
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
  ...blogIndexPages,
  ...blog.posts.map(postPage),
  ...blogTagPages,

  legal("privacy", "Privacy Policy", "How Pawabase collects, uses, and protects your personal information when you use our website, products, and services.", "Privacy"),
  legal("terms", "Terms of Service", "The terms and conditions governing your use of Pawabase's website, products, and services.", "Terms"),
  legal("cookies", "Cookie Policy", "How Pawabase uses cookies and similar tracking technologies on our website.", "Cookies"),
  legal("refund", "Refund Policy", "Our policy regarding refunds for Pawabase plans and credits.", "Refund"),
  legal("dpa", "Data Processing Addendum", "Terms governing the processing of personal data in accordance with applicable data protection laws, including GDPR.", "Dpa"),
  legal("acceptable-use", "Acceptable Use Policy", "Guidelines for appropriate and safe use of Pawabase's services and platform.", "AcceptableUse"),
];

export const pageAt = (path: string): Page | undefined => {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return PAGES.find((p) => p.path === clean);
};

/** Every page shares one image, made by scripts/seo/og.mjs, except a blog post, which gets its own card (scripts/blog/og.mjs). */
export const ogImagePath = (page?: Page) => page?.image ?? "/og.png";
export const ogImage = (page: Page) => absolute(ogImagePath(page));
export const canonical = (page: Page) => absolute(page.path === "/" ? "/" : page.path);
