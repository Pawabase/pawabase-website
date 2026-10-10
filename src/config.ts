/// <reference types="vite/client" />

export const github = "https://github.com/Pawabase/pawabase";

/** Documentation lives in the public docs repository until a docs host is configured (VITE_DOCS_URL). */
export const docs = (page = "index") =>
  import.meta.env.VITE_DOCS_URL
    ? `${import.meta.env.VITE_DOCS_URL.replace(/\/$/, "")}/${page}`
    : `https://github.com/Pawabase/pawabase-docs/blob/main/${page}.mdx`;

/** Where "Sign in" goes. Without a configured address there is no sign-in link: nothing here invents a dashboard URL. */
export const dashboard = import.meta.env.VITE_DASHBOARD_URL as string | undefined;

export type Product = {
  key: "auth" | "database" | "storage" | "functions" | "automation" | "cloud";
  name: string;
  path: string;
  line: string;
};

export const products: Product[] = [
  { key: "auth", name: "Auth", path: "/products/auth", line: "Users, sessions, organizations and permissions." },
  { key: "database", name: "Database", path: "/products/database", line: "Resources, policies and a generated REST API." },
  { key: "storage", name: "Storage", path: "/products/storage", line: "Buckets with access policies and signed URLs." },
  { key: "functions", name: "Functions", path: "/products/functions", line: "Python logic, deployed from your repository." },
  { key: "automation", name: "Automation", path: "/products/automation", line: "Flows, events, queues and schedules." },
  { key: "cloud", name: "Cloud", path: "/cloud", line: "Managed Pawabase projects, run for you." },
];

export const developerLinks = [
  { name: "Documentation", line: "Concepts, guides and reference.", href: docs("index") },
  { name: "Quickstart", line: "From an empty folder to a running API.", href: docs("quickstart") },
  { name: "Command line", line: "Deploy, emulate, trigger and read logs.", href: docs("code/cli") },
  { name: "TypeScript SDK", line: "@pawabase/client for apps that call Pawabase.", href: docs("clients/javascript") },
  { name: "Python SDK", line: "The kit for functions, tests and scripts.", href: docs("clients/python") },
  { name: "Self-hosting", line: "Run the whole platform with Docker Compose.", href: docs("self-hosting/docker-compose") },
];
