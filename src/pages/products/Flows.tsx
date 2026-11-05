import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "automation",
  name: "Flows",
  description: "Visual workflows with eight triggers, branches, loops, retries, AI steps and a full history of every run.",
  promise: "Automate the work around your data.",
  line: "Build flows on a visual canvas, start them from requests, changes, schedules or webhooks, and watch every run.",
  tiles: [
    {
      kind: "chips",
      icon: "events",
      title: "Eight ways to start",
      line: "A request, an event, a change, a schedule, and more.",
      chips: ["HTTP request", "Event", "Resource change", "Schedule", "Inbound webhook", "Realtime message", "Background job", "Manual run"],
    },
    { kind: "solid", icon: "sparkle", title: "AI in any step", line: "Ask a model to decide, write or sort, with the model you choose." },
    { kind: "word", icon: "play", word: "RUN", title: "Test before you ship", line: "Run a flow by hand and see what each step did." },
    {
      kind: "chips",
      icon: "automation",
      title: "Steps for everyday work",
      line: "Read and write records, check rules, send email and more.",
      chips: ["Get record", "Update record", "Check policy", "If", "For each", "Delay", "Retry", "Send email", "Ask a model", "Respond"],
    },
  ],
  capabilities: [
    { icon: "automation", title: "A visual canvas", line: "Drag blocks, connect them and tidy the layout in one click." },
    { icon: "events", title: "Triggers", line: "Start on a request, an event, a change, a schedule or a webhook." },
    { icon: "refresh", title: "Branches and loops", line: "If, for each and merge: real logic, without code." },
    { icon: "queues", title: "Retries and delays", line: "Wait, try again, and handle failures on purpose." },
    { icon: "activity", title: "Run history", line: "Every run recorded, with what each step did." },
    { icon: "sparkle", title: "AI steps", line: "Put a model to work inside any flow." },
  ],
};

export default function FlowsPage() {
  return <ProductPage {...INFO} />;
}
