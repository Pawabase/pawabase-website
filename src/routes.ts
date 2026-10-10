/** Every page, with the title and description its <head> and the sitemap use. The build prerenders each of these. */
export type PageMeta = { path: string; title: string; description: string };

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Pawabase: everything your application needs, in one place",
    description:
      "Pawabase is an application development platform: identity, data, files, application logic, automation and realtime, connected, and available managed or self-hosted.",
  },
  {
    path: "/products/auth",
    title: "Pawabase Auth: users, sessions, organizations and permissions",
    description:
      "Email and password, magic links, social sign-in, TOTP multi-factor, rotating sessions with theft detection, organizations, teams and role-based permissions.",
  },
  {
    path: "/products/database",
    title: "Pawabase Database: resources, policies and a generated API",
    description:
      "Define a resource and get a typed REST API, validation, filtering, relations and row-level policies over Postgres, MySQL or SQLite.",
  },
  {
    path: "/products/storage",
    title: "Pawabase Storage: buckets, access policies and signed URLs",
    description:
      "Object storage with per-bucket read and write policies, size and type limits, signed URLs, and local or S3-compatible drivers.",
  },
  {
    path: "/products/functions",
    title: "Pawabase Functions: Python logic, deployed from your repository",
    description:
      "Write async Python functions, test them without a server, emulate them against a real deployment, and deploy them with the command line.",
  },
  {
    path: "/products/automation",
    title: "Pawabase Automation: flows, events, queues and schedules",
    description:
      "Visual flows, platform events, background queues, schedules and webhooks working as one application automation system.",
  },
  {
    path: "/cloud",
    title: "Pawabase Cloud: managed projects with African data residency",
    description:
      "Managed Pawabase projects, each its own installation with its own database. Pre-launch, running in Nigeria and billed in naira through Paystack. Plans and prices are not published yet.",
  },
];

export const metaFor = (path: string): PageMeta => pages.find((p) => p.path === path) ?? pages[0];
