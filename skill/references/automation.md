# Flows, routes, events, jobs, webhooks, and mail

Pick by how the work starts and whether someone waits for the answer:

| Need | Use | Called as |
| --- | --- | --- |
| An app asks and waits for a computed answer | A flow with an HTTP trigger and no path | `flows.run(name, input)` / `pb.flows.invoke(name, **input)` → `POST /flows/v1/<name>` |
| An endpoint with your own method and path | A custom route: a flow bound to a method and path | `routes.call("POST", "orders/checkout", { body })` → `/rest/v1/<path>` |
| React to a record, user or business event | An event subscription that starts a flow or publishes to a channel | Automatic: `<table>.created`, `.updated`, `.deleted`, auth and custom events |
| Run on a clock | A schedule that starts a flow or emits an event | Automatic |
| Tell another system | An outbound webhook: signed, with a delivery log | Automatic on its events |
| Accept a partner's webhook | An inbound hook that verifies the sender | `POST /hooks/v1/<env>/<slug>` |
| Slow or retryable work | A background job, or a queued flow | Started by a flow, event or schedule |
| Send email | A mail template plus a flow's mail step | Delivery log in Activity |

There are no uploaded functions. Logic that does not fit a flow runs in your own service, which calls Pawabase with a
[machine identity](auth-policies.md) and is triggered by a webhook or a flow's HTTP step.

## Flows

A flow is a sequence of blocks: input, conditions and branches, reads and writes on tables (under the caller's policies unless
the flow is set otherwise), transactions, HTTP calls, mail, events, AI and agent steps, and a response. A flow without a
`response.return` answers `{ data: … }` with its result. The flow's own rule decides who may start it. Studio's flow editor runs a
flow with sample input and keeps every run's steps in Activity.

- For all-or-nothing writes, use a transaction block; the SQL block is read only.
- Keep secrets in environment secrets and reference them from blocks; never paste them into a flow.
- A route flow is addressed by its method and path, not by name.

## Delivery and retries

- Events, subscriptions, webhooks and jobs are **at least once** and in no fixed order. Make every reaction idempotent: key
  payments, mail and external calls on the event or delivery id, and check before acting.
- Flow steps, jobs, outbound webhooks and mail each have their own retry settings.
- A caller's `POST` can time out after the server finished. The clients do not repeat a `POST` after an uncertain failure unless
  you mark it idempotent; do that only when the server side already dedupes.
- Schedules: choose **Allow** or **Skip** for overlap, and whether one missed run catches up after downtime (once per schedule, not
  once per missed slot). A periodic sweep beats one scheduled job per row.
- Inbound hooks: verify the signature before trusting the body; dedupe by the sender's delivery id.
- Replay failed jobs or deliveries only after fixing the cause, and only the ones whose side effects are safe to repeat.

## Mail

Templates (with variables and a preview) live per environment. An environment without its own provider can send through
Pawabase's built-in sender within the plan's allowance. When mail does not arrive, separate the layers: template render,
provider settings, sender domain DNS, the queued send, the delivery log, and suppression of the recipient.

## Where to look

Activity shows the event, the subscription that matched, the flow run with each step, the job, the webhook attempts and the mail
log as separate records: follow the chain instead of assuming the first request failed. Docs: `logic/flows.mdx`,
`logic/routes.mdx`, `automation/events.mdx`, `automation/jobs.mdx`, `automation/schedules.mdx`, `automation/webhooks.mdx`,
`automation/webhook-signatures.mdx`, `automation/reliability.mdx`, `mail/overview.mdx`, `mail/troubleshooting.mdx`.
