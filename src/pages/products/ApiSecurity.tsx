import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "apiSecurity",
  name: "API security",
  description: "Publishable and secret keys, keys scoped to routes and addresses, expiring keys, rate limits and an audit log.",
  promise: "Your API, only for the callers you choose.",
  line: "Publishable and secret keys, scoped and expiring keys, and rate limits on every route.",
  tiles: [
    {
      kind: "chips",
      icon: "apiSecurity",
      title: "The right key for each job",
      line: "Give every app, service and teammate only what it needs.",
      chips: ["Publishable keys", "Secret keys", "Scoped to routes", "IP allow lists", "Expiring keys"],
    },
    { kind: "solid", icon: "activity", title: "Rate limits per route", line: "Slow down abuse without writing any code." },
    { kind: "word", icon: "code", word: "KEYS", title: "Keys for machines", line: "Services and agents get keys and tokens of their own." },
    {
      kind: "chips",
      icon: "document",
      title: "Stay in control",
      line: "See what changed, and switch off a key the moment you need to.",
      chips: ["Audit log", "Revoke keys any time", "Allowed origins", "Custom domains"],
    },
  ],
  capabilities: [
    { icon: "apiSecurity", title: "Publishable keys", line: "Safe to ship in your web and mobile apps." },
    { icon: "policies", title: "Secret keys", line: "Full access for your servers, never for your users." },
    { icon: "code", title: "Scoped keys", line: "Limit a key to certain routes or addresses." },
    { icon: "activity", title: "Rate limits", line: "Set limits per route to keep things fair." },
    { icon: "users", title: "Machine identities", line: "Keys and tokens for services and AI agents." },
    { icon: "document", title: "Audit log", line: "A record of who changed what, and when." },
  ],
};

export default function ApiSecurityPage() {
  return <ProductPage {...INFO} />;
}
