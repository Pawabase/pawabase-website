import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "A complete copy of your backend",
    blocks: [
      { p: "An **environment** is a complete, separate copy of your backend: its own database, users, files, rules, keys and secrets. You build in `development`, check in `staging` and serve real people from `production`. Nothing you do in one affects another." },
      { table: { head: ["Per environment", "Shared across the project"], rows: [
        ["Database and every row", "The project itself and its team"],
        ["Users, roles and organizations", "Your plan and billing"],
        ["Tables, rules, flows, routes, subscriptions and webhooks", ""],
        ["Buckets and files", ""],
        ["Secrets and API keys", ""],
        ["Auth settings, mail settings and domains", ""],
      ] } },
      { p: "Your app chooses the environment with its keys and an `environment` option. To create one, give it a name using lowercase letters, digits and dashes, and optionally copy from another environment to start with its definitions. Definitions are copied. Secrets, keys and data never are." },
    ],
  },
  {
    title: "Promoting changes",
    blocks: [
      { p: "**Promote** copies definitions from one environment to another so `production` matches what you tested. It never copies data, secrets or keys." },
      { steps: [
        "In the environment you built, choose Promote in the environment menu.",
        "Choose the target environment.",
        "Choose which kinds to include, such as tables, access rules, flows and routes.",
        "Review the differences, then confirm.",
      ] },
      { p: "Promoting copies the definition. A new column still needs its migration applied in the target, which Studio shows as pending. Named rules must be included too, or the tables that use them will not match." },
    ],
  },
  {
    title: "A release routine",
    blocks: [
      { steps: [
        "Change and test in `development`.",
        "Take a backup of `production`.",
        "Promote to `staging`, apply migrations, and run your rule tests.",
        "Promote to `production` and apply migrations.",
        "Watch Activity for errors.",
      ] },
      { list: [
        "Keep `production` locked down. Few people should open Studio there, and changes should arrive through promote.",
        "Use different keys per environment, and never reuse a production secret in development.",
        "Do not copy production data into development without anonymising it.",
        "Name environments for their purpose, not for a person.",
      ] },
    ],
  },
  {
    title: "API versions",
    blocks: [
      { p: "The versions of your live API are listed under **Project, API versions**, and `v1` is always live at `/rest/v1`. **Release a version** serves another environment's definitions as `v2`, `v3` and so on next to `v1`, over the same data. That lets old and new clients run side by side while you migrate." },
      { p: "Versions share the environment's tables, so a version can add tables, columns and indexes but cannot rename, retype or remove anything a live version uses." },
    ],
  },
  {
    title: "Previews",
    blocks: [
      { p: "A **preview** is a temporary environment for a branch or pull request. It copies definitions, has its own data, and expires by itself, after 72 hours by default. Create one from **Project, Environments, New preview**, and name it after the branch. It is a safe place to try a change with real tooling before it goes anywhere near production." },
    ],
  },
  {
    title: "Backups",
    blocks: [
      { p: "A **backup** saves what makes up an environment, so you can restore it later or move it to another environment. It has four parts, each a checkbox." },
      { table: { head: ["Part", "Contains"], rows: [
        ["Definitions", "Resources, policies, schemas, transformers, flows, routes, buckets, mail templates, subscriptions, webhooks, inbound hooks and schedules"],
        ["Settings", "The environment's auth configuration and settings, such as CORS origins, rate limits and token lifetimes"],
        ["Users and access", "Roles and permissions, users with their password hashes, linked sign-ins, two-step settings, organizations and teams. People keep their passwords."],
        ["Data", "Every row of every resource's table, with ids preserved"],
      ] } },
      { note: "A backup does not include API keys, secret values, stored files, sessions, logs or jobs. It holds password hashes, so keep the file private." },
      { p: "Back up now with a name and a note about why. Pin a backup to keep it forever. Schedule automatic backups by choosing how often, the hour in UTC, how many days to keep and how many to keep in total." },
    ],
  },
  {
    title: "Restoring",
    blocks: [
      { p: "Choose a saved backup, or an uploaded file, then what to restore and how. **Merge** adds and updates. **Replace** deletes current rows, users and definitions in the chosen parts first. Leave **Save the current state first** on. It takes a backup of what will be overwritten, so a restore can be undone." },
      { p: "A sensible plan is automatic daily backups kept for 14 days with the last 30 retained, a pinned backup before every release or risky migration, and a test restore into a non-production environment once a quarter. A backup you have not restored is a hope, not a backup." },
    ],
  },
];

export default function ReleasesPage() {
  return (
    <ProductArticle
      icon="refresh"
      name="Releases"
      category="Operations"
      description="Development, staging and production with their own keys, releases you can roll back, and nightly snapshots."
      intro="Releases are how changes reach production safely. Each environment is a complete, separate copy of your backend, and you move definitions forward by promoting them. This page covers environments, promoting, API versions, previews, backups and restoring."
      sections={SECTIONS}
      next={{ label: "Next: Observability", href: "/products/observability" }}
    />
  );
}
