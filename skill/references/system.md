# System model

## How a request travels

```
client ── apikey (+ Bearer token) ──▶ gateway ──▶ server ──▶ Postgres
                                       │            │
                         key, origin, scope,   caller, policy for this
                         rate limit, quota     operation, then the work
                                                    │
                                   events ─▶ subscriptions ─▶ flows, jobs, webhooks, mail
                                   changes ─▶ realtime (record changes, live queries)
```

A project has separate environments (`development`, `staging`, `production`, previews). Each owns its database, users, keys,
secrets, tables, policies, files, flows, agents and settings. A client points at the project's gateway and presents one
environment's key. The gateway checks the key, origin, scopes, rate limit and quota, then hands the server the caller. The
server runs the policy for that exact operation before touching data. Writes emit events, clear cached lists and broadcast
changes; subscriptions turn events into background flows, jobs, webhooks and mail.

The runtime is one Sillo application (it can run several worker processes) behind the gateway, on PostgreSQL. Studio is a
browser interface that talks to its own `/studio` API. Do not assume separate services for auth, data, flows or realtime.

## Data and policy

A **table** in Pawabase is a definition over a Postgres table: fields, validation, relations, search fields, vectors, ownership,
caching, events, realtime, and five operations (list, get, create, update, delete), each enabled separately with its own rule.
The definition and the physical table are related but not the same: changing a definition can need a migration.

Rules can read `$auth`, `$record`, `$input`, `$request`, `$credential`, `$object`, `$event` and `$now`, or use shorthands
(signed in, owner, role, permission, organization, team, two-step, scope). Secret keys and Studio pass every rule. Lists are
filtered in the database, `total` can be `null` under row rules, a single-row `404` can mean hidden, and write-only fields never
come back. Details in [auth and policies](auth-policies.md).

## Identity

Every request needs `apikey` and names its project (`x-project-id`) and, unless it means the project's default, its environment
(`x-environment`); a person's or machine's request adds `Authorization: Bearer <access token>`. Keys belong to the project and
reach all of its environments or only some. Publishable keys
are for apps and always obey policies. Secret keys bypass them and can carry management scopes. Machines (services, AI agents)
have their own identities and roles. Organizations scope a session to one team at a time. `user_metadata` is editable by the
user and is never authority.

## Reliability

Events and their reactions are at least once and can arrive out of order: make handlers and webhook receivers idempotent.
Realtime is live delivery, not storage; keep business state in records. Definitions promote between environments; rows, users,
keys and secrets never do. Backups leave out file bytes and secret values.

Docs: `concepts/how-pawabase-fits-together.mdx`, `database/how-data-works.mdx`, `policies/how-rules-work.mdx`,
`reference/keys-and-security.mdx`, `environments/overview.mdx`.
