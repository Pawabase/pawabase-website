import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "refresh",
  name: "Environments",
  description: "Separate development, staging and production, reviewed promotion, short-lived previews, side-by-side API versions and backups.",
  promise: "Ship changes without breaking what's live.",
  line: "Development, staging and production each keep their own data, with a review before anything reaches your users.",
  tiles: [
    {
      kind: "chips",
      icon: "refresh",
      title: "A place for every stage",
      line: "Each environment has its own data and its own keys.",
      chips: ["Development", "Staging", "Production", "Previews"],
    },
    { kind: "solid", icon: "policies", title: "Promote with a review", line: "See every change first. Ones that would break live data are refused." },
    { kind: "word", icon: "code", word: "V2", title: "API versions", line: "Serve the next API beside the current one, over the same tables." },
    {
      kind: "chips",
      icon: "storage",
      title: "Backups you can restore",
      line: "Bring back an environment's definitions and its data.",
      chips: ["Backups", "Restore", "Migration history"],
    },
  ],
  capabilities: [
    { icon: "refresh", title: "Separate environments", line: "Try anything without touching production." },
    { icon: "policies", title: "Reviewed promotion", line: "Move changes forward with a clear list of what will change." },
    { icon: "play", title: "Previews", line: "Short-lived environments that clean up after themselves." },
    { icon: "code", title: "API versions", line: "Keep older apps working while the API moves on." },
    { icon: "storage", title: "Backups", line: "Restore definitions and data when you need to." },
    { icon: "apiSecurity", title: "Keys per environment", line: "Each environment has keys of its own." },
  ],
};

export default function EnvironmentsPage() {
  return <ProductPage {...INFO} />;
}
