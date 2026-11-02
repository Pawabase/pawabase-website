import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Where to look when something is wrong",
    blocks: [
      { p: "**Activity** is where you look when something is slow, failing or surprising. It lives under **Project, Activity** in Studio, and it is organised around the questions you actually ask: which calls failed, what is the queue doing, what fired, and what reacted." },
      { table: { head: ["Group", "Pages", "Use them to"], rows: [
        ["Requests", "Routes, Errors, Requests, Bandwidth", "Find failing or slow calls and open one request end to end, including the access-rule decision."],
        ["Background work", "Jobs, Flow runs", "Watch queues, retry failures and read each run's trace."],
        ["Events and messages", "Events, Event map, Webhooks, Mail, Realtime", "Follow what fired and what reacted."],
        ["Logs and alerts", "Logs, Alarms", "Search logs and get told when a number crosses a line."],
      ] } },
    ],
  },
  {
    title: "The overview",
    blocks: [
      { p: "The overview opens with a banner that says whether **Everything looks healthy**. A chart switches between requests, latency, jobs, flow runs, webhooks and mail over a range from 15 minutes to 14 days. Below it, **Recent failures** can be filtered to all, jobs, flows, webhooks or mail, so a problem in any part of the system shows up in one place." },
      { p: "A good habit is to look at requests filtered to errors after every release, and at the overview whenever someone says something feels slow." },
    ],
  },
  {
    title: "Following one request through everything",
    blocks: [
      { p: "Every request has a **request id**. It also appears on the events that request caused, the flow runs that followed and the webhook deliveries, so you can follow a single action through everything it triggered." },
      { steps: [
        "A person says they cannot see their orders, or an error appears in your app.",
        "In your app, catch the error and read `error.requestId`.",
        "Open Activity, Requests and search for it.",
        "Open the request and read the access-rule decision, which names the rule that allowed or refused it.",
      ] },
      { p: "Put the request id in your own error reports. It turns \"it broke around lunchtime\" into a single line you can open." },
    ],
  },
  {
    title: "Background work",
    blocks: [
      { p: "Jobs and flow runs have their own pages. **Jobs** shows queue depth and counts per queue, and a table of jobs with status, queue and time. Open one for its input, its attempts and the error from the last attempt. Steady, low depth is healthy, and growing depth means work is arriving faster than it is finished." },
      { p: "**Flow runs** shows each run of a flow with its outcome and a trace of every block's input and output, so you can find the first step whose output was not what you expected. Failures can be retried one at a time, or replayed after an outage with a dry run first to see the count." },
    ],
  },
  {
    title: "Alarms",
    blocks: [
      { p: "Set an alarm so you are told when a metric crosses a threshold: error rate, latency or queue depth. An alarm is how you hear about a problem before your users report it, so set one for each of the things that would hurt most if they quietly got worse." },
    ],
  },
  {
    title: "Logs",
    blocks: [
      { p: "Logs are searchable under **Logs and alerts**. Keep log messages free of personal data and secrets, because anyone with access to Activity can read them. When you write your own log lines from a flow, include identifiers rather than whole records." },
    ],
  },
  {
    title: "Checking the other services",
    blocks: [
      { list: [
        "**Mail, Activity** shows each message as sent, failed or suppressed, and the Mail overview counts them over 7, 30 or 90 days.",
        "**Webhooks, Deliveries** lists every attempt with its status, response and error, and lets you redeliver.",
        "**Realtime, Overview** shows live traffic: active channels, connections, and messages published and delivered, with a list of every socket open right now.",
        "**Security events** in the firewall list every request it blocked, limited or logged, newest first, which refreshes every few seconds.",
      ] },
      { p: "Taken together, these mean there is no separate monitoring product to wire up. The same place you build your backend is where you watch it run." },
    ],
  },
];

export default function ObservabilityPage() {
  return (
    <ProductArticle
      icon="activity"
      name="Observability"
      category="Operations"
      description="Requests, traces, errors, alarms and a public status page, built into your backend."
      intro="Observability in Pawabase is built into the same place you build your backend. This page covers the Activity pages, how to follow a single request through everything it caused, how to read background work, and how alarms tell you when something drifts."
      sections={SECTIONS}
      next={{ label: "Back to the Database", href: "/products/database" }}
    />
  );
}
