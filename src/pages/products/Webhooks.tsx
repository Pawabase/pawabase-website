import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "webhooks",
  name: "Webhooks",
  description: "Inbound webhooks that start flows, and signed, retried outbound events with a history of every delivery.",
  promise: "Talk to other services, both ways.",
  line: "Receive webhooks that start flows, and send signed events to the services you use.",
  tiles: [
    {
      kind: "chips",
      icon: "events",
      title: "Send the events that matter",
      line: "Tell other services when records change or people sign up.",
      chips: ["orders.created", "orders.updated", "orders.deleted", "user.created"],
    },
    { kind: "solid", icon: "apiSecurity", title: "Signed deliveries", line: "Every request carries a signature the receiver can check." },
    { kind: "word", icon: "refresh", word: "RETRY", title: "Retries built in", line: "A delivery that fails is tried again." },
    {
      kind: "chips",
      icon: "webhooks",
      title: "Receive them too",
      line: "Give a service its own URL, and start a flow when it calls.",
      chips: ["A URL per service", "Verify the sender", "Start a flow"],
    },
  ],
  capabilities: [
    { icon: "webhooks", title: "Inbound webhooks", line: "A URL for each service that needs to reach you." },
    { icon: "apiSecurity", title: "Sender checks", line: "Make sure a webhook really came from who it says." },
    { icon: "events", title: "Event subscriptions", line: "Choose which events go to which URL." },
    { icon: "policies", title: "Signatures", line: "Receivers can confirm a delivery came from you." },
    { icon: "refresh", title: "Retries", line: "Deliveries that fail are tried again." },
    { icon: "activity", title: "Delivery history", line: "See every delivery and how the receiver answered." },
  ],
};

export default function WebhooksPage() {
  return <ProductPage {...INFO} />;
}
