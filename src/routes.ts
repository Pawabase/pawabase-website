/** Every page, with the title and description its <head> and the sitemap use. The build prerenders each of these. */
export type PageMeta = { path: string; title: string; description: string };

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Pawabase: build applications, not infrastructure",
    description:
      "Pawabase is an end-to-end application development platform: identity, data, storage, functions, workflows and realtime, designed to work together. Self-host it or use Pawabase Cloud.",
  },
];

/** Pages that exist and are not routed while the site is a single page. To bring one back, add it to `pages` and to the router's `components`. */
export const heldBack: PageMeta[] = [
  {
    path: "/products/auth",
    title: "Pawabase Auth: identity, sessions, organizations and permissions",
    description:
      "Email and password, magic links, social sign-in, TOTP multi-factor, rotating sessions with theft detection, organizations, teams and role-based access policies.",
  },
  {
    path: "/products/database",
    title: "Pawabase Database: resources, policies and a generated API",
    description:
      "Describe a resource once and get the table, a typed REST API, validation, relations and row-level access rules, over PostgreSQL, MySQL or SQLite.",
  },
  {
    path: "/products/storage",
    title: "Pawabase Storage: buckets, access policies and signed URLs",
    description:
      "Object storage with per-bucket access policies, size and type limits and signed URLs, on local disk or any S3-compatible service.",
  },
  {
    path: "/products/functions",
    title: "Pawabase Functions: application logic in Python",
    description:
      "Write async Python functions, test them without a server, emulate them against a real deployment and deploy them from your repository.",
  },
  {
    path: "/products/automation",
    title: "Pawabase Flows and events: workflows, queues and schedules",
    description:
      "Visual and programmable flows, platform events, background queues and workers, schedules and webhooks, working as one automation system.",
  },
  {
    path: "/cloud",
    title: "Pawabase Cloud: the managed way to run Pawabase",
    description:
      "Managed Pawabase projects, each with its own database, starting in Nigeria and billed in naira through Paystack. Plans and prices are announced as they open.",
  },
];

export const metaFor = (path: string): PageMeta => pages.find((p) => p.path === path) ?? pages[0];
