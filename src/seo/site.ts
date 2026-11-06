/** Who the site is and where it lives. Shared by the app and the build scripts, so nothing here may import from "@/…" or touch the DOM. */

type Env = Record<string, string | undefined>;
const viteEnv = (import.meta as unknown as { env?: Env }).env;
const nodeEnv = (globalThis as unknown as { process?: { env?: Env } }).process?.env;

/** The public address, without a trailing slash. Set VITE_SITE_URL to build for another domain (a preview, a staging site). */
export const SITE_URL = (viteEnv?.VITE_SITE_URL || nodeEnv?.VITE_SITE_URL || "https://pawabase.com").replace(/\/+$/, "");

export const SITE = {
  name: "Pawabase",
  legalName: "Pawabase",
  url: SITE_URL,
  tagline: "Build apps and APIs on one system",
  description:
    "Pawabase is a developer platform for building apps and APIs as one system: Postgres data with a REST API for every table, auth, access policies, storage, flows and agents, shared by your apps, your team and your AI.",
  locale: "en_US",
  language: "en",
  themeColor: "#111214",
  /** Real profiles only; the footer's social links are still planned. */
  sameAs: ["https://github.com/Pawabase"],
  dashboard: "https://dashboard.pawabase.com",
  docs: "https://docs.pawabase.com",
  logo: "/icon-512.png",
} as const;

/** An absolute address on this site. */
export const absolute = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
