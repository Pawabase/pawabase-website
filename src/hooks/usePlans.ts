import { useEffect, useState } from "react";

import { ENTERPRISE, PLANS, PRICING_METRICS, fromCatalog, type Catalog, type Enterprise, type Plan, type PricingMetric } from "@/components/pricing/plans";

/** Where Pawabase Cloud's backend answers. Unset: the bundled copy of its price list (components/pricing/catalog.json). */
const CLOUD_URL = (import.meta.env.VITE_CLOUD_URL as string | undefined)?.replace(/\/$/, "");

let pending: Promise<Catalog | null> | null = null;
/** One request however many components ask. `prices.public` is Cloud's public price list, the same one its dashboard shows. */
function loadCatalog(): Promise<Catalog | null> {
  pending ??= fetch(`${CLOUD_URL}/rest/v1/x/cloud/prices.public`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" })
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
    .then((body) => {
      const found = (body?.data ?? body) as Catalog;
      return found?.plans?.some((p) => !p.contact) ? found : null;
    })
    .catch(() => null);
  return pending;
}

/** The plans from Pawabase Cloud; the bundled copy until they arrive, or if they cannot. */
export function usePlans() {
  const [state, setState] = useState<{ plans: Plan[]; metrics: PricingMetric[]; enterprise: Enterprise; live: boolean }>({ plans: PLANS, metrics: PRICING_METRICS, enterprise: ENTERPRISE, live: false });
  useEffect(() => {
    if (!CLOUD_URL) return;
    let alive = true;
    loadCatalog().then((found) => {
      if (alive && found) setState({ ...fromCatalog(found), live: true });
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
