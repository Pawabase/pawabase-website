import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "A call between systems, in both directions",
    blocks: [
      { p: "A webhook is an HTTP call between systems. Pawabase supports both directions. **Outbound** webhooks send your events to a URL you control. **Inbound** hooks give another service a Pawabase URL to call, which verifies the request and then starts a flow or emits an event." },
      { p: "Everything lives under **Logic, Webhooks**, on three pages: Endpoints for outbound webhooks, Deliveries for every attempt with its retries, and Inbound hooks." },
    ],
  },
  {
    title: "Events are what webhooks carry",
    blocks: [
      { p: "An event is a named announcement, such as `orders.created`, `user.created` or `invoice.overdue`. Something emits it, and anything subscribed reacts. The emitter never waits and never needs to know who is listening. You do not have to write code to get events." },
      { list: [
        "**Your tables** emit created, updated and deleted events after a write succeeds.",
        "**Auth** emits sign-ups, sign-ins, password and second-factor changes and more.",
        "**Flows** can publish any event name you choose with the Emit event block.",
        "**Schedules** can emit an event on the clock.",
        "**Inbound hooks** can turn a verified call from another service into an event.",
      ] },
      { table: { head: ["Field", "Example", "Meaning"], rows: [
        ["`name`", "`order.paid`", "The event name"],
        ["`payload`", "`order_id`, `total`", "The data it carries"],
        ["`id`", "`evt_3b8f1c2a`", "Unique per event. Use it to skip repeats."],
        ["`source`", "`flows`", "What emitted it"],
        ["`actor`", "`usr_abc`", "The person whose action caused it, or empty"],
        ["`occurred_at`", "`2026-09-30T14:02:11Z`", "When it happened, in UTC"],
        ["`request_id`", "`req_7e9a1c`", "The request that caused it"],
      ] } },
    ],
  },
  {
    title: "Sending events out",
    blocks: [
      { p: "To send events to a URL, create an endpoint under **Logic, Webhooks, Endpoints**." },
      { table: { head: ["Field", "Meaning"], rows: [
        ["Endpoint URL", "Where to send. Use HTTPS. Private and loopback addresses are refused outside development."],
        ["Events", "Event names or patterns. `*` sends everything and `orders.*` sends every order event."],
        ["Extra headers", "Headers sent with every request."],
        ["Attempts", "Tries before a delivery is marked failed, from 1 to 10. Retries back off exponentially. The default is 5."],
        ["Signing secret", "Signs each request. At least 16 characters."],
        ["Enabled", "Pause without deleting."],
      ] } },
      { p: "Use **Send test** to send one test event with one attempt and no retries. To send an event to every subscribed endpoint from a flow, add the **Send webhook** block." },
      { h3: "What your endpoint receives" },
      { p: "Your endpoint receives a `POST` whose body has the event `id`, the `event` name, the `project` and `env` it came from, the `data` and a `sent_at` time. Reply with a `2xx` within 30 seconds. Anything else counts as a failed attempt and is retried. Use the event `id` to ignore a repeat, because a delivery can arrive more than once." },
    ],
  },
  {
    title: "Checking that a request is really from Pawabase",
    blocks: [
      { p: "Anyone who knows your URL can post to it. The `Pawabase-Signature` header proves a request came from Pawabase. It looks like `t=1700000000,v1=a1b2c3…`, where `v1` is the hex HMAC-SHA256 of the text `<t>.<raw body>`, keyed with your signing secret." },
      { list: [
        "Reject requests more than 5 minutes old.",
        "Sign over the raw body, not re-serialised JSON.",
        "Compare the signatures in constant time.",
      ] },
    ],
  },
  {
    title: "Deliveries, retries and replay",
    blocks: [
      { p: "**Deliveries** lists every attempt with its status, which is `pending`, `retrying`, `delivered` or `failed`. You also see the event, the URL, the number of attempts, the duration, the response status and a trimmed body, and the error. You can filter by webhook, event, status or time." },
      { list: [
        "**Redeliver** on a row sends that one again.",
        "After your endpoint was down, select the failed deliveries or filter them, choose Redeliver, and use **Dry run** first to see the count.",
        "Each resend creates a new delivery with the same payload, so your receiving code must handle repeats safely.",
      ] },
    ],
  },
  {
    title: "Receiving events from other services",
    blocks: [
      { p: "An inbound hook gives another service a URL to call. Create one under **Inbound hooks**, choose a slug, how requests are verified, and what happens next: run a flow, or emit an event. The address has the form `https://<your api host>/hooks/v1/<environment>/<slug>`. It needs no API key, because the signature is the credential." },
      { table: { head: ["Verification", "Use it for"], rows: [
        ["HMAC SHA-256 (the default)", "Services that sign the body, such as GitHub in `x-hub-signature-256`."],
        ["HMAC SHA-512", "Services that sign with SHA-512."],
        ["HMAC SHA-256 with timestamp", "Services that sign a timestamp and body, such as Stripe in `stripe-signature`."],
        ["Pawabase signature", "Calls from another Pawabase project."],
        ["Shared token", "Simple services that send a fixed token."],
        ["None", "Avoid it. Anyone who finds the URL can call it."],
      ] } },
      { p: "Match the verification and the signature header to what the sender does, and check the sender's documentation. The request's JSON body becomes the flow's input. A bad signature gets `403`. A verified request gets `202` and the flow runs in the background, and failures are visible under Activity, Jobs. Keep the shared secret in Secrets and refer to it as `secret://NAME`." },
    ],
  },
];

export default function WebhooksPage() {
  return (
    <ProductArticle
      icon="webhooks"
      name="Webhooks"
      category="Integrations"
      description="Send your events to other services and act on theirs, with every delivery logged and failures easy to replay."
      intro="Webhooks connect Pawabase to everything else you use. Your events can be sent to any URL, and other services can call a Pawabase URL to start a flow. This page covers events, outbound endpoints, signatures, deliveries and inbound hooks."
      sections={SECTIONS}
      next={{ label: "Next: Releases", href: "/products/releases" }}
    />
  );
}
