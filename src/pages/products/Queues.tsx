import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Work that does not wait for a person",
    blocks: [
      { p: "Some work should happen because something happened, not because a person pressed a button: send a receipt when an order is paid, sweep for overdue invoices every morning, email a welcome message. A **job** is one unit of that background work. It runs outside the request, so the caller gets a fast answer and the slow work has its own status, attempts and record." },
      { p: "You build all of it in Studio under Logic and Services. Your app only causes the events, by writing data, and can start flows directly when it needs to." },
    ],
  },
  {
    title: "How a typical feature is built",
    blocks: [
      { p: "Take \"email a receipt when an order is paid\". Nothing in your payment code knows about receipts, and adding \"also tell the warehouse\" later is another subscription, not a code change." },
      { steps: [
        "Your app marks the order paid with a normal database update. The table emits `orders.updated`.",
        "In Event subscriptions, a subscription on `orders.updated` runs the `send-receipt` flow, only when the new status is `paid`.",
        "The flow loads the order and sends the `receipt` template with the Send email block.",
        "If sending fails, you see it under Activity, Jobs, and can retry it.",
      ] },
    ],
  },
  {
    title: "Starting background work",
    blocks: [
      { p: "In the flow editor, add a **Queue flow** block. It returns as soon as the job is stored, and its output is the job's id. Events also run subscribed flows as jobs." },
      { table: { head: ["Field", "Meaning"], rows: [
        ["Flow", "What to run."],
        ["Input", "Becomes the input of the dispatched work. Pass identifiers, not whole records."],
        ["Queue", "A queue name. The default is `default`. Use a separate name for heavy work, such as `bulk`, so it cannot hold up quick work."],
        ["Delay", "Seconds before it may start."],
      ] } },
    ],
  },
  {
    title: "Job states and retries",
    blocks: [
      { table: { head: ["Status", "Meaning"], rows: [
        ["`queued`", "Waiting, or waiting out a delay"],
        ["`active`", "Running"],
        ["`retrying`", "An attempt failed and another is scheduled"],
        ["`succeeded`", "Finished"],
        ["`failed`", "Gave up"],
      ] } },
      { p: "A job gets one attempt by default. Retrying arbitrary business logic could charge a card twice, so Pawabase does not guess. Instead you add a **Retry** block around the part that can fail for a passing reason, choosing the number of attempts and a first wait, and you make any step that must not repeat safe to run twice." },
    ],
  },
  {
    title: "Watching and recovering",
    blocks: [
      { p: "**Activity, Jobs** shows queue depth and counts per queue, and a table of jobs with status, queue and time. Open a job to see its input, its attempts and the error from the last one. Steady, low depth is healthy. Growing depth means work is arriving faster than it is finished." },
      { p: "For failures, open **Failed**. For one job, read the error and choose **Retry**. After an outage, filter by queue, kind and how many minutes back, then use **Replay**, with a **Dry run** first to see the count. **Dismiss** removes a failure that needs no action." },
      { steps: [
        "Read two or three errors to understand what went wrong.",
        "Wait for the cause to recover.",
        "Dry-run the replay over the outage window and check the count.",
        "Run it, then check again.",
      ] },
      { p: "To show progress to a person, keep the state in a record, such as `status: \"preparing\"` changing to `\"ready\"`, that the job updates, and let the app read it or listen to it live. Do not poll jobs from the browser." },
    ],
  },
  {
    title: "Schedules",
    blocks: [
      { p: "A schedule runs something by the clock. Create one under **Logic, Schedules**. You choose either a cron expression or an interval of at least ten seconds, a time zone, and what runs: a flow, or an event." },
      { table: { head: ["Field", "Meaning"], rows: [
        ["Cron expression", "Five fields: minute, hour, day of month, month and day of week, where 0 is Sunday."],
        ["Time zone", "An IANA name such as `Europe/London`. Cron is read in this zone, and empty means UTC."],
        ["If the previous run is still going", "Allow another run, or skip this one. Use skip for sweeps and syncs."],
        ["Catch up", "Run occurrences missed during downtime. Off by default."],
        ["Enabled", "Pause without deleting."],
      ] } },
      { table: { head: ["Expression", "Fires"], rows: [
        ["`*/5 * * * *`", "Every 5 minutes"],
        ["`0 * * * *`", "Hourly"],
        ["`0 3 * * *`", "Daily at 03:00"],
        ["`0 9 * * 1-5`", "Weekdays at 09:00"],
        ["`0 0 1 * *`", "The first of each month"],
      ] } },
      { p: "Use **Run now** to test a schedule. When it fires, the target receives `{ \"scheduled_at\": \"…\" }` along with your payload. Use `scheduled_at` rather than \"now\", so a late run still works on the right window." },
    ],
  },
  {
    title: "Prefer sweeps to delayed jobs",
    blocks: [
      { p: "Instead of one delayed job per invoice, run a short schedule that finds whatever is due, such as `due_at` in the past and `reminded` false, handles it and marks it. A missed run then only delays things until the next one, nothing is lost, and there are no thousands of waiting jobs to manage." },
      { p: "Events are the glue between all of this. Every table emits created, updated and deleted events after a write succeeds, auth emits events for sign-ups and sign-ins, flows can emit their own, and a schedule can emit an event on the clock. An event subscription then runs a flow, optionally only when a condition holds. Past events are not replayed to a new subscriber." },
    ],
  },
];

export default function QueuesPage() {
  return (
    <ProductArticle
      icon="queues"
      name="Queues"
      category="Background work"
      description="Durable background jobs with retries, so slow work never slows your app."
      intro="Queues and schedules run work in the background, outside the request, so your app stays fast and slow work has its own status, retries and record. This page covers starting jobs, their states, recovering from failures and running things by the clock."
      sections={SECTIONS}
      next={{ label: "Next: Mail", href: "/products/mail" }}
    />
  );
}
