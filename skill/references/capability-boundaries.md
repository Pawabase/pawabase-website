# Capability boundaries

Use this when an example seems to contradict the installed package, or the user asks whether something is possible at all. The
rows come from the runtime's feature inventory (**Explicit boundaries and non-features**) and the checked client sources in the
[source map](source-map.md). Confirm on the target environment before treating a row as permanent.

| Area | Boundary | What to do instead |
| --- | --- | --- |
| Functions | Pawabase does not run uploaded functions; the old function kits are gone. | Flows, custom routes, events, schedules and jobs. Code that must run elsewhere is your own service calling the API with a machine identity. |
| Database | Pawabase runs on PostgreSQL only. | Do not plan for MySQL or SQLite. Use Postgres features (full-text search, `pgvector` fields) freely. |
| Search | Ranked Postgres full-text search on a table's search fields. No typo tolerance, highlight snippets or external search engine. | Design the UI for exact-word matching; use `similar` on a vector field for meaning-based search. |
| Clients | Older packages (`@pawabase/client` below 0.7, Python `pawabase` below 0.9) lack live queries, AI agents and knowledge, captcha, machine identities and, in Python, most namespaces. | Upgrade the package. If you cannot, make a raw request to an endpoint you confirmed in the environment's OpenAPI. |
| Project keys | Clients before `@pawabase/client` 0.8 and Python `pawabase` 0.10 send no project and name environments by their full name (`acme-production`). The server still accepts that, and every key made before project keys reaches only its own environment. | New code passes `project` and the short `environment`. Old deployments keep working; upgrade when you next touch them. |
| Python realtime | Channels and live queries need `AsyncPawabase` and `pawabase[realtime]`. The sync client has `publish`, `history`, `presence` and `sse`. | Use the async client in workers and servers that listen. |
| Realtime transports | WebSocket for everything; SSE is listen only. No MQTT, MQTT over WebSocket, HTTP streaming or long polling. Only the **durable** channel kind changes persistence. | Publish over HTTP or the socket; store messages that must survive as records. |
| Live queries | One result of up to 200 rows, re-sent whole on change; needs **Broadcast changes** on the table. | For larger sets, subscribe to `resource:<table>` changes and refetch the visible page. |
| Batch writes | `createMany` / `create_many` are not atomic. | A flow with a transaction block, or a custom route. |
| Pawabase MCP | `/mcp/v1` is stateless JSON-RPC over Streamable HTTP `POST`; no SSE stream or sessions. Remote use needs a scoped secret key; local stdio runs with installation authority. | Use an HTTP MCP transport, or launch `pawabase-server mcp` yourself on a trusted host. |
| Backups | Environment backups leave out stored file bytes, secret values, raw API keys, sessions, logs and jobs. | Back up object storage separately; re-create secrets and keys after a restore. |
| Data cache | API writes clear a table's response cache; writes made directly in SQL do not. | Clear or turn off the cache when another writer changes the table. |
| SQL | Studio SQL writes need an explicit opt-in; the flow SQL block is read only. | Resource blocks or a transaction block for writes in flows. |
| Domains | Pawabase verifies and routes custom domains; it is not a certificate authority. | Terminate TLS at your proxy or platform. |
| Dashboards | Public dashboards still go through resource policies. | Test as an anonymous visitor and as a real user. |
| Cloud | Accounts, billing and plans are Pawabase Cloud, not the self-hosted runtime. | Answer from Cloud docs and the Cloud dashboard, not server management endpoints. |

## Before recommending a path

1. Confirm the feature in the target environment or its OpenAPI, not only on a docs page.
2. Confirm the installed package has the method. If not, use a raw request only once the endpoint and auth are confirmed.
3. Say whether it is self-hosted or Cloud, preview or stable, and which version you checked.
4. For migrations, bulk replays, restores and key rotations, inspect the plan or backup and the actual target first.

Recheck this list when the runtime's feature inventory or a client major version changes.
