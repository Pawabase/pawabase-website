import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "activity",
  name: "Observability",
  description: "Request logs, traces, metrics, alarms, dashboards, an audit log and a public status page for everything your system does.",
  promise: "See everything your system does.",
  line: "Logs, traces, metrics and alarms for every request, flow and job, in one place.",
  tiles: [
    {
      kind: "chips",
      icon: "activity",
      title: "Answers, not guesswork",
      line: "Find slow routes, failures and busy tables fast.",
      chips: ["Request logs", "Traces", "Route stats", "Failures", "Usage"],
    },
    { kind: "solid", icon: "events", title: "Alarms", line: "Hear about a problem before your users tell you." },
    { kind: "word", icon: "document", word: "LOGS", title: "Every request recorded", line: "See what happened, and when." },
    {
      kind: "chips",
      icon: "users",
      title: "Share what matters",
      line: "Dashboards for your team and a status page for your users.",
      chips: ["Dashboards", "Public status page", "Audit log"],
    },
  ],
  capabilities: [
    { icon: "document", title: "Request logs", line: "Every call to your API, with its result." },
    { icon: "automation", title: "Traces", line: "Follow a run through each step of a flow." },
    { icon: "activity", title: "Metrics", line: "Requests, speed and usage over time." },
    { icon: "events", title: "Alarms", line: "Thresholds that tell you when to look." },
    { icon: "database", title: "Dashboards", line: "Build the charts your team watches." },
    { icon: "users", title: "Status page", line: "Tell your users how things are running." },
  ],
};

export default function ObservabilityPage() {
  return <ProductPage {...INFO} />;
}
