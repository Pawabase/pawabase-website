# Troubleshooting by symptom

Start with the exact project, environment, API version, request id, actor/key type, operation, status/code, and time. Reproduce with a real caller in Studio's API Explorer when possible; a secret key bypasses policies and can hide the cause. Keep network, edge, auth, policy, data, and background work as separate layers.

| Symptom | First checks | Next evidence |
| --- | --- | --- |
| Browser request blocked before response | Gateway URL, allowed origin/CORS, key route/IP/origin restrictions | Browser network panel and edge request log |
| `401` | `apikey`, correct environment, expired/revoked key, bearer token/session, wrong auth grant | `reference/errors.mdx`, auth activity |
| `403` | Key scope, operation policy, user's roles/org/assurance, bucket/channel rule | Test same actor in API Explorer; policy debug trace |
| `404` for one record | Resource/operation enabled, API version, id, read policy hiding row | Compare with trusted server key without exposing existence to user |
| `409` | Unique key or concurrent write | Conflict code/details and current row |
| `422` | Field validation, relation constraint, required field, flow or route input | Field issues and resource schema |
| `429` | Key rate limit, plan quota, per-route limit, `Retry-After` | Usage/plan and edge limit metrics |
| Missing/short list | Per-row policy, query filter, page, `total: null`, search fields | Query as target user, then compare permitted row ids |
| Slow list or search | Sort/filter index, data volume, search fields, cache settings | Activity latency and query plan/index usage |
| Data changed outside API but no event/live update | Outside-change capture disabled, direct SQL path, listener rule | Resource behavior settings and event log |
| Stale list after external SQL write | Pawabase cache not invalidated | Cache stats/invalidation or TTL |
| File uploaded but cannot download | Read policy differs from upload, key encoding, bucket visibility | Object listing and storage access trace |
| Signed/public URL fails | Link expiry/revocation, bucket public setting, wrong environment/key, image transform | Storage log and exact URL type |
| Realtime subscribe/send fails | Channel pattern, separate subscribe/publish rules, token, key | Realtime Playground and connections |
| Realtime misses or duplicates | History depth, replay window, reconnect, own-message echo | Message id/seq and connection timeline |
| Flow did not run | Source event, subscription condition, flow trigger type, rule | Event graph, subscription, flow run |
| Flow ran but result absent | Named flow versus path route, response block, timeout | Flow run steps and route response |
| Webhook delivery failed | Signature/config, receiver status, delivery retry | Delivery attempt and receiver logs |
| Mail not received | Template rendering, provider, paused delivery, DNS, recipient suppression | Mail activity and provider response |
| AI call fails | Model alias, provider key, rule, quota, approval/cost limit | Model/agent run and provider error |
| AI client cannot connect to Pawabase MCP | `/mcp/v1` POST, secret key, management scope, HTTPS/origin, enabled setting | `tools/list` result and `mcp.tool` audit entries |
| Pawabase agent cannot reach external MCP | Connection URL, outbound host policy, external credential, agent allowlist | Studio connection Check and agent run tool error |
| Production only | Different keys, secrets, settings, definitions, API version, origin/domain | Environment diff and recent audit entries |

For a user-visible error, keep the request id and avoid leaking hidden-record existence, secret values, or full tokens. If the failure is asynchronous, follow the event → subscription → flow/job → webhook/mail chain rather than assuming the initiating HTTP call failed. Read the topic's troubleshooting page and `activity/requests.mdx`, `activity/background-work.mdx`, `policies/debugging.mdx`, or `guides/production-checklist.mdx` in the docs repo as appropriate.
