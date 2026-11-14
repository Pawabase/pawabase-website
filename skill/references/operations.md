# Environments, management, and diagnosis

An environment is a whole backend: rows, users, tables, policies, keys, secrets, buckets and files, auth and mail settings,
flows, agents and activity. Development, staging and production each have their own keys. Promotion moves definitions, never
data, users, keys or secrets. A client's key must belong to the environment it names.

## Three ways to change a backend

| Way | Good for | Notes |
| --- | --- | --- |
| **Studio** | Exploring, designing tables and policies, reading Activity | Every change is audited; schema changes show a migration preview |
| **Management clients** (secret key, server only) | Scripts, provisioning, CI checks | TypeScript `manage(client, env)` from `@pawabase/client/manage` and `admin(client, env)` from `@pawabase/client/admin`; Python `pb.manage.<area>` and `pb.admin.<area>`. `pb.manage.environment("staging")` re-binds to another environment the key may manage |
| **`pawabase-iac`** | Definitions reviewed in git | Python declarations; `pawabase validate` (offline), `emulate`, `plan` (reads the real environment), `deploy` (writes). See [platform lifecycle](platform-lifecycle.md) |

```python
pb = Pawabase(url, os.environ["PAWABASE_SECRET_KEY"], project=project, environment="staging")
pb.manage.secrets.set("STRIPE_KEY", os.environ["STRIPE_KEY"])
failed = pb.manage.flows.runs(status="failed", limit=20)
matches = pb.admin.users.search(search="ada@example.com")
```

Python `pb.manage` areas: `resources`, `schema`, `schemas`, `policies`, `routes`, `database`, `flows`, `schedules`,
`subscriptions`, `events`, `webhooks`, `inbound_hooks`, `jobs`, `buckets`, `cache`, `mail`, `mail_templates`,
`realtime_channels`, `dashboards`, `keys`, `secrets`, `domains`, `observability`, `alarms`, `status_page`, `health`, `ai`,
`agents`, `agent_runs`, `knowledge_bases`, `connections`, `environments`, `versions`, `backups`. Check method names with
`help()` or the TypeScript declarations before scripting.

Rules for all three:

- A changed table definition can need a migration. Read the preview SQL and its risk notes, apply in development first, then
  check the real table and the API shape. A new required field on a table with rows goes nullable, backfill, then required.
- Restores, key rotations, bulk replays and destructive migrations change durable state: look at the target environment and the
  plan or backup first, save the current state, and say what will change.
- Prefer dry runs where offered (promotion, replays). Never replay successful events to test an integration.
- A secret key manages only the environments of its project it reaches (all of them, or the ones it was limited to). `/studio` uses a Cloud-signed token and
  is not an app management endpoint.

## Diagnose by layer

| Symptom | Check |
| --- | --- |
| `401` | Key present and valid, right environment, allowed origin or IP, token or session expiry |
| `403` | Key scope, operation enabled, caller's roles, organization and two-step level, the specific policy, plan quota |
| `404` on one row | Table, path and id, operation enabled, API version, a read rule hiding the row |
| `409` / `422` | Unique or foreign-key constraint, field validation, a pending migration |
| `429` | Key rate limit, environment quota, `Retry-After` |
| Realtime refused | Channel rule (subscribe and publish are separate), token, presence and history settings |
| Automation missing | Source event, subscription filter, flow run, job status, webhook delivery |

Keep the request id from the error and open it in Studio → Activity: the trace shows gateway, policy, database and background
steps. Reproduce as the intended caller first; use a secret key only as a controlled comparison. For server internals, the
runtime's `ARCHITECTURE.md`, route modules and tests are the source, not guesses about service boundaries.

Docs: `environments/overview.mdx`, `environments/promote.mdx`, `tools/management-client.mdx`, `tools/admin-client.mdx`,
`tools/iac/overview.mdx`, `activity/overview.mdx`, `backups/overview.mdx`.
