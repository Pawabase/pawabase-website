# HTTP API and wire contracts

For any language without a client, or when a client lacks a method the server has. Use the project's gateway URL. Every
request carries `apikey: pb_pk_…` (or `pb_sk_…` on servers); add `Authorization: Bearer <access token>` to act as a signed-in
person or machine, and `Content-Type: application/json` for JSON bodies.

The contract that counts is the environment's own OpenAPI: Studio → API Explorer, or `GET /docs/v1/<env>/openapi.json` when the environment has public API docs switched on. It
includes that environment's tables, custom routes and their real error shapes. The public snapshot in the docs repository is
for route discovery only.

## Records

For a table `orders`:

| Method | Path | Result |
| --- | --- | --- |
| `GET` | `/rest/v1/orders` | `{ data, page, per_page, total }` |
| `GET` | `/rest/v1/orders/{id}` | One row, or `404` when absent **or** hidden by policy |
| `POST` | `/rest/v1/orders` | `201` with the created row |
| `PATCH`, `PUT` | `/rest/v1/orders/{id}` | Partial update; `PUT` does not clear omitted fields |
| `DELETE` | `/rest/v1/orders/{id}` | `204`, no body |
| `POST` | `/rest/v1/orders/similar` | Vector search, when the table has a vector field |

```bash
curl "$PAWABASE_URL/rest/v1/orders?filter%5Bstatus%5D=eq.paid&sort=-created_at&per_page=50&page=2&expand=customer" \
  -H "apikey: $PAWABASE_KEY" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

- `filter[field]=operator.value` with `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`, `nin`, `is`, `isnot`.
  URL-encode values. **One filter per field** is kept: two bounds on the same field do not combine. Booleans and nulls use `is`
  (`is.false`, `is.null`); `eq.false` does not match boolean columns correctly. `in` splits on commas.
- `sort=-created_at,title`, `page` from 1, `per_page` 1 to 200, `select=id,title`, `expand=relation`, `q=` full-text search on
  the table's search fields, `paginate=false` for up to 5,000 rows.
- Unknown fields in filter, sort or select are refused. Write-only fields never come back; vector fields only when selected.
- `total` can be `null` under row policies; expanded relations apply their own read rule and can come back `null`.
- Versions: `/rest/v2/…` and later serve other definitions over the same tables (see [platform lifecycle](platform-lifecycle.md)).

## Route families

| Family | Examples | For |
| --- | --- | --- |
| `/rest/v1` | `/<table>`, `/<table>/{id}`, `/<custom route path>` | Records and custom routes |
| `/auth/v1` | `/signup`, `/token`, `/user`, `/sessions`, `/orgs`, `/mfa`, `/passkeys`, `/captcha/challenge`, `/captcha/siteverify` | Sign-in, accounts, organizations, bot protection |
| `/admin/v1` | users, roles, organizations, SSO connections, machines | Administration, secret key only |
| `/storage/v1` | `/object/{bucket}/{key}`, `/list/{bucket}`, `/sign/{bucket}/{key}`, `/files/{env}/{bucket}/{key}`, share links | Files |
| `/realtime/v1` | `/publish`, `/sse`, `/channels/{channel}/history`, `/channels/{channel}/presence`, WebSocket | Live messages |
| `/flows/v1/{name}` | `POST` | A flow with an HTTP trigger and no path |
| `/ai/v1` | `/models`, `/chat/completions`, `/embeddings`, `/agents/{name}/runs`, `/knowledge/{name}/search` | Models, agents, knowledge |
| `/hooks/v1/{env}/{slug}` | `POST` | Inbound webhooks |
| `/platform/v1` | definitions, schema, keys, secrets, environments, backups, activity | Management, secret key with management scopes |
| `/mcp/v1` | `POST` JSON-RPC | Outside AI clients ([MCP](mcp.md)); not in OpenAPI |
| `/health/v1` | `GET` | Health |

There is no `/functions/v1`: Pawabase no longer runs uploaded functions. `/studio` takes a Cloud-signed Studio token, not an app
key. Management keys only reach their own environment.

## Errors

| Status | Usually |
| --- | --- |
| `401` | Missing or wrong key, wrong environment, expired token |
| `403` | Policy or scope refusal; `quota_exceeded` when a plan limit is hit |
| `404` | Absent or hidden row, disabled operation, wrong version |
| `409` | Unique or foreign-key conflict (`unique_violation`, with the columns in `details`) |
| `422` | Field validation; body lists the problems per field |
| `429` | Rate limit; honour `Retry-After` |
| `5xx` | Server; retry safe methods only |

Bodies carry `error` (a code), `message`, often `details`, and an `x-request-id` header. Keep the request id: it finds the
trace in Studio → Activity. See `database/rest-api.mdx` and `reference/errors.mdx`.
