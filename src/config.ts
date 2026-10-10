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
  { key: "auth", name: "Auth", path: "/products/auth", line: "Sign-in, teams and roles." },
  { key: "database", name: "Database", path: "/products/database", line: "Your data, with a secure API." },
  { key: "storage", name: "Storage", path: "/products/storage", line: "Files with the right access." },
  { key: "functions", name: "Functions", path: "/products/functions", line: "Your own logic, in Python." },
  { key: "automation", name: "Automation", path: "/products/automation", line: "Work that runs by itself." },
  { key: "cloud", name: "Cloud", path: "/cloud", line: "We run it for you." },
];

export const developerLinks = [
  { name: "Documentation", line: "Guides and reference.", href: docs("index") },
  { name: "Quickstart", line: "From nothing to a running API.", href: docs("quickstart") },
  { name: "Command line", line: "Deploy and read logs.", href: docs("code/cli") },
  { name: "TypeScript SDK", line: "For apps that use Pawabase.", href: docs("clients/javascript") },
  { name: "Python SDK", line: "For functions, tests and scripts.", href: docs("clients/python") },
  { name: "Self-hosting", line: "Run it on your own servers.", href: docs("self-hosting/docker-compose") },
];
