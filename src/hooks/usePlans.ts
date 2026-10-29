import { useEffect, useState } from "react";

import { PLANS, PRICING_METRICS, type Plan, type PricingMetric } from "@/components/pricing/plans";

/** Where Pawabase Cloud's backend answers, and the publishable key of its `cloud` environment (safe for browsers). Unset: the bundled plans. */
const CLOUD_URL = (import.meta.env.VITE_CLOUD_URL as string | undefined)?.replace(/\/$/, "");
const CLOUD_KEY = (import.meta.env.VITE_CLOUD_KEY as string | undefined) || "";

type Limit = { key: string; label: string; unit: string };
type Offer = {
  plans: { code: string; name: string; description: string; amount: number; features: string[]; limits: Record<string, any> }[];
  limits: Limit[];
};

/** The rows of the comparison table: a limit of the catalogue, or one of Cloud's own (projects). Their order and notes are the website's. */
const ROWS: { key: string; label?: string; note?: string }[] = [
  { key: "projects" },
  { key: "max_database_bytes" },
  { key: "max_users_per_month" },
  { key: "monthly_request_limit", label: "API requests / month" },
  { key: "max_storage_bytes" },
  { key: "monthly_bandwidth_bytes", label: "Bandwidth / month" },
  { key: "max_emails_per_month", label: "Emails sent / month", note: "Transactional and product email." },
  { key: "max_buckets" },
  { key: "max_scheduled_jobs" },
  { key: "max_inbound_hooks" },
  { key: "max_webhooks" },
  { key: "max_flow_runs_per_month", label: "Flow runs / month" },
  { key: "max_user_api_keys_per_user", label: "User API keys / user" },
  { key: "max_active_connections", label: "Realtime concurrent connections" },
  { key: "max_realtime_messages_per_month", label: "Realtime messages / month" },
  { key: "request_retention_days", label: "Request log history" },
  { key: "flow_run_retention_days", label: "Flow run history" },
  { key: "login_event_retention_days", label: "Sign-in history" },
  { key: "audit_retention_days", label: "Audit log history" },
];

function compact(n: number): string {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 100_000) return `${Math.round(n / 1_000)}K`;
  return n.toLocaleString();
}
function bytes(n: number): string {
  const GB = 1024 ** 3;
  if (n >= 1024 * GB) return `${+(n / (1024 * GB)).toFixed(1)} TB`;
  if (n >= GB) return `${+(n / GB).toFixed(1)} GB`;
  return `${Math.round(n / 1024 ** 2)} MB`;
}
function format(unit: string | undefined, value: unknown, key: string): string {
  if (typeof value !== "number") return "—";
  if (unit === "bytes") return bytes(value);
  if (unit === "days") return value === 1 ? "1 day" : `${value} days`;
  return key.endsWith("_per_month") || key.startsWith("monthly") ? compact(value) : value.toLocaleString();
}

function fromOffer(offer: Offer): { plans: Plan[]; metrics: PricingMetric[] } {
  const label = new Map(offer.limits.map((limit) => [limit.key, limit]));
  const plans = offer.plans.map((plan) => ({
    name: plan.name,
    price: String(plan.amount / 100),
    description: plan.description,
    featured: plan.code === "pro",
    features: plan.features.slice(0, 3),
  }));
  const metrics = ROWS.map((row) => {
    const limit = label.get(row.key);
    return {
      label: row.label || limit?.label || (row.key === "projects" ? "Projects" : row.key),
      note: row.note,
      values: offer.plans.map((plan) => format(limit?.unit, plan.limits?.project_limits?.[row.key] ?? plan.limits?.[row.key], row.key)),
    };
  });
  return { plans, metrics };
}

let pending: Promise<Offer | null> | null = null;
/** One request however many components ask. */
function loadOffer(): Promise<Offer | null> {
  pending ??= fetch(`${CLOUD_URL}/rest/v1/x/cloud/plans.public`, { method: "POST", headers: { apikey: CLOUD_KEY, "content-type": "application/json" }, body: "{}" })
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
    .then((body) => {
      const offer = (body?.data ?? body) as Offer;
      return offer?.plans?.length ? offer : null;
    })
    .catch(() => null);
  return pending;
}

/** The plans from Pawabase Cloud's backend, the same ones its dashboard shows; the bundled copy until they arrive or if they cannot. */
export function usePlans() {
  const [state, setState] = useState<{ plans: Plan[]; metrics: PricingMetric[]; live: boolean }>({ plans: PLANS, metrics: PRICING_METRICS, live: false });
  useEffect(() => {
    if (!CLOUD_URL) return;
    let alive = true;
    loadOffer().then((offer) => {
      if (alive && offer) setState({ ...fromOffer(offer), live: true });
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
