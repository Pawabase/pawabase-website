# TypeScript and JavaScript client

`@pawabase/client` (verified at **0.8.0**) runs in browsers, React, Node, Deno, Bun and edge runtimes on standard `fetch` and
`WebSocket`, as ESM or CommonJS. One client shares one session across every module. Check the installed version first:
`node -p "require('@pawabase/client/package.json').version"`.

```ts
import { createClient } from "@pawabase/client";

const pawabase = createClient({
  url: "https://api.example.com",   // the gateway
  project: "01JC4…",                // required: the project's id (Studio → Overview → Connect)
  environment: "production",        // optional: its name in the project; left out, the project's default
  apiKey: "pb_pk_…",                // a key of the project; publishable in browsers
});
```

Options: `url`, `apiKey`, `project` (required since 0.8; a `ConfigError` without it), `environment` (the short name), `timeoutMs`, `retry` (or `false`), `fetch`, `headers`, `hooks`, `auth`
(session storage and behaviour), `realtime` (socket options, an injected `WebSocket` for old Node), `accessToken` (a fixed token
or a function returning one, which makes the client stateless for server use), and `dangerouslyAllowBrowser` (only to silence the
refusal of a secret key in a browser; never set it in shipped code). Call `pawabase.dispose()` when you drop a client.

## Callers

| Who is calling | How |
| --- | --- |
| A person in the browser | Publishable key, then `auth.signIn…`; the session is stored and refreshed for you |
| A server acting for that person | `pawabase.asUser(accessToken)` on a publishable-key client: their policies apply |
| A server doing administration | A separate client with a secret key, kept on the server |
| A service or AI agent | `pawabase.asMachine({ clientId, clientSecret, scope })`: its own identity and roles |

## Surface at 0.8.0

| Area | API |
| --- | --- |
| Records | `from(name)` (alias `resource`): builders `select`, `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`, `notIn`, `is`, `isNot`, `where`, `filter`, `search`, `similar` (vector), `expand`, `order(column, "desc")`, `limit`, `page`, `perPage`; reads `all`, `first`, `single`, `maybeGet`, `get`, `count`, `exists`, `pages`, `paginate`, `execute`; writes `create`, `createMany`, `update`, `replace`, `delete`; `withOptions` per call |
| Auth | `signUp`, `signInWithPassword`, `verifyMfa`, `signInWithMagicLink` / `verifyMagicLink`, `sendEmailCode` / `verifyEmailCode`, `signInAnonymously` / `upgradeAnonymous`, `signInWithOAuth`, `signInWithOAuthUrl`, `exchangeCode`, `getSessionFromUrl`, `findSSO`, `signInWithSSO`, `getSession`, `getAccessToken`, `onAuthStateChange`, `getUser`, `updateUser`, `setAvatar`, `removeAvatar`, `resendVerification`, `verifyEmail`, `confirmEmailChange`, `signOut`, `jwks`, `issueToken` (token profiles), plus MFA, sessions, devices and organizations helpers |
| Storage | `storage.listBuckets()`, `storage.from(bucket)`: `upload`, `download`, `downloadText`, `downloadStream`, `downloadResponse`, `list`, `remove`, `getPublicUrl`, `fileUrl` (with image transforms), `createShareLink`, `listShareLinks`, `revokeShareLink`, `createSignedUrl`, `createSignedUploadUrl`, `uploadToSignedUrl` |
| Realtime | `realtime.channel(name, options)`: `subscribe`, `onEvent`, `send`, `track`, `history`, `presenceState`, `unsubscribe`, `on("presence" | "subscribed" | "closed" | "error")`; over HTTP `realtime.publish`, `presence`, `history`; `realtime.stream(channels)` (SSE, listen only); `realtime.live(resource, query, onChange)` live queries; `status`, `onStatusChange`, `connect`, `disconnect` |
| Server logic | `flows.run(name, input)`, `routes.call(method, path, { query, body })` for custom routes |
| AI | `ai.models()`, `ai.complete(model, input)`, `ai.chat(model, input)` (text), `ai.embed(model, text | texts)`; `ai.agents`: `list`, `run(name, input)`, `get`, `decide(runId, { approve })`, `wait(runId)`; `ai.knowledge`: `search`, `addDocument`, `addFile`, `document` |
| Bot protection | `captcha.protect(action)` returns a pass to send with a protected form; `prepare`, `redeem`, `verify` |
| Raw | `pawabase.http.request(...)` for a verified endpoint without a wrapper; `status()` for health |

Management lives in subpaths so browser bundles never carry it:

```ts
import { manage } from "@pawabase/client/manage";   // definitions: resources, schema, policies, routes, flows, schedules,
import { admin } from "@pawabase/client/admin";     // webhooks, buckets, mail, keys, secrets, environments, versions, backups…
                                                    // admin: users, roles, organizations, SSO connections, sessions, machines
const m = manage(serverClient, "production");       // a secret-key client, on the server only
const a = admin(serverClient, "production");
```

## Queries and results

- One filter per field is sent; the builder refuses a second bound on the same field. Booleans and nulls go through `is`
  (`eq(field, false)` is sent as `is.false`). Commas inside `in` values are refused.
- `perPage(n)` resolves to `{ data, total }`. Under row policies `total` can be `null` and a page can be shorter than `n`.
- `createMany` is not atomic. For all-or-nothing writes use a flow with a transaction, or a custom route.
- `similar(field, vector)` orders by vector distance on a vector field; `search(text)` uses the table's search fields.

## Live queries

```ts
const open = pawabase.realtime.live<Task>("tasks", { filter: { done: "is.false" }, sort: "-created_at", limit: 20 });
open.onChange(({ data, total }) => render(data));
await open.ready();     // the first result
// later
open.stop();
```

The table needs **Broadcast changes** on. The same filters, sort, search and list policy as a `GET /rest/v1/<resource>` apply, so
a person only ever receives rows they may read. It reopens itself after a reconnect.

## Errors and retries

Every error is a `PawabaseError`. HTTP errors are `ApiError` subclasses: `AuthenticationError` (401), `PermissionError` (403),
`NotFoundError`, `ConflictError`, `ValidationError` (422, with field problems), `PayloadTooLargeError`, `RateLimitError` (429),
`ServerError`. Others: `NetworkError`, `TimeoutError`, `AbortError`, `ConfigError`, `InvalidQueryError`, `RealtimeError`. Keep
`status`, `code` and `requestId`; the request id finds the trace in Studio → Activity. The client follows `Retry-After` on 429
and retries safe methods on transient failures; it does not repeat a POST or PATCH after an uncertain network failure unless you
mark it idempotent, so make the server side safe for duplicates first.

## Types

`npx pawabase-types --url <gateway> --env <environment> --api-key <key> --out src/pawabase.types.ts` (or `--file openapi.json`)
generates a `Database` type from the environment's OpenAPI;
`createClient<Database>(…)` then types every `from()`. Run it with `--check` in CI to catch schema drift. Expanded relations may
need a hand-written augmentation.

Verified in the SDK source (`src/client.ts`, `data.ts`, `auth.ts`, `files.ts`, `realtime.ts`, `ai.ts`, `agents.ts`,
`captcha.ts`, `functions.ts` for flows and routes, `manage/`, `admin.ts`, `errors.ts`). Check the installed declarations for exact
option names before relying on one.
