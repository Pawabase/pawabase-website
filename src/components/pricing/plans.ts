import catalog from "./catalog.json" with { type: "json" };

export type Plan = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  features: string[];
};

export type PricingMetric = {
  label: string;
  note?: string;
  values: string[];
};

/** Pawabase Cloud's price list, as `prices.public` answers it (pawabase-cloud/backend/pawacloud/pricing.py `catalog()`). The website reads
 *  it live from Cloud (hooks/usePlans.ts); catalog.json is a copy of it for when Cloud cannot be reached. Regenerate the copy when the
 *  prices change, in pawabase-cloud/backend:
 *    .venv/bin/python -c "import json; from pawacloud import pricing; c = pricing.catalog(); print(json.dumps({k: c[k] for k in ('currency', 'minor_unit', 'plans', 'assurances', 'meters')}, indent=1))" > ../../pawabase-website/src/components/pricing/catalog.json */
export type CatalogPlan = {
  key: string;
  label: string;
  description: string;
  monthly: number;
  compute_credit: number;
  projects: number;
  environments: number;
  backups: number;
  support: string;
  contact: boolean;
  own_emails: number;
  traffic: number[];
  assurances: string[];
  included: Record<string, number>;
  retention: Record<string, number>;
};
export type Catalog = { minor_unit: number; plans: CatalogPlan[]; assurances: Record<string, string> };

const short = (n: number) => (n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${+(n / 1_000).toFixed(1)}K` : `${n}`);
const size = (gb: number) => (gb >= 1_000 ? `${gb / 1_000} TB` : gb < 1 ? `${gb * 1_000} MB` : `${gb} GB`);
const days = (n: number) => (n >= 365 && n % 365 === 0 ? `${n / 365} ${n === 365 ? "year" : "years"}` : `${n} ${n === 1 ? "day" : "days"}`);
const naira = (minor: number, unit: number) => `₦${Math.round(minor / unit).toLocaleString("en-NG")}`;

type Row = { label: string; note?: string; value: (p: CatalogPlan, unit: number) => string };

const ROWS: Row[] = [
  { label: "Compute credit / month", note: "Pays for database servers of your own. Buy more credits any time.", value: (p, u) => (p.compute_credit ? naira(p.compute_credit, u) : "—") },
  { label: "Projects", value: (p) => (p.projects >= 100 ? "Unlimited" : String(p.projects)) },
  { label: "Environments / project", value: (p) => String(p.environments) },
  { label: "API requests / month", value: (p) => short(p.included.requests) },
  { label: "Monthly active users", value: (p) => short(p.included.users) },
  { label: "Database", value: (p) => size(p.included.database) },
  { label: "File storage", value: (p) => size(p.included.files) },
  { label: "Bandwidth / month", value: (p) => size(p.included.bandwidth) },
  { label: "Flow runs / month", value: (p) => short(p.included.flow_runs) },
  { label: "Realtime messages / month", value: (p) => short(p.included.realtime_messages) },
  { label: "Pawabase mail / month", note: "Sent from Pawabase's own sender, no setup.", value: (p) => short(p.included.emails) },
  { label: "Emails through your provider / month", note: "Your own SMTP or mail service.", value: (p) => short(p.own_emails) },
  { label: "Requests / minute", note: "Per API key or address.", value: (p) => short(p.traffic[0]) },
  { label: "Realtime connections", note: "Open at once, per project.", value: (p) => short(p.traffic[1]) },
  { label: "Realtime channels", value: (p) => short(p.traffic[2]) },
  { label: "Request log history", value: (p) => days(p.retention.request_retention_days) },
  { label: "Flow run history", value: (p) => days(p.retention.flow_run_retention_days) },
  { label: "Audit and sign-in history", value: (p) => days(p.retention.audit_retention_days) },
  { label: "Backups kept", value: (p) => String(p.backups) },
  { label: "Support", value: (p) => p.support },
];

/** The cards and the comparison table, from a catalog: the plans that can be bought here (Enterprise is arranged with the team). */
export function fromCatalog(source: Catalog): { plans: Plan[]; metrics: PricingMetric[] } {
  const unit = source.minor_unit || 100;
  const shown = source.plans.filter((p) => !p.contact);
  const plans = shown.map((p) => ({
    name: p.label,
    price: String(p.monthly / unit),
    description: p.description,
    featured: p.key === "pro",
    features: [
      p.compute_credit ? `${naira(p.compute_credit, unit)} compute credit every month` : "The free monthly allowance, no card",
      p.projects >= 100 ? "Unlimited projects" : `${p.projects} projects`,
      `${short(p.included.requests)} API requests a month`,
      p.support === "Community" ? "Community support" : `${p.support.split(",")[0]} support`,
    ],
  }));
  const ticks: PricingMetric[] = Object.entries(source.assurances)
    .filter(([key]) => key !== "long_history")
    .map(([key, label]) => ({ label, values: shown.map((p) => (p.assurances.includes(key) ? "Included" : "—")) }));
  const metrics = [...ROWS.map((row) => ({ label: row.label, note: row.note, values: shown.map((p) => row.value(p, unit)) })), ...ticks];
  return { plans, metrics };
}

const bundled = fromCatalog(catalog as Catalog);
export const PLANS: Plan[] = bundled.plans;
export const PRICING_METRICS: PricingMetric[] = bundled.metrics;
