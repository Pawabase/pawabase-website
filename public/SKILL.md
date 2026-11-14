---
name: pawabase
description: Build, secure, debug and operate apps on Pawabase with the verified TypeScript and Python clients, raw HTTP, and MCP. Use for any Pawabase work - records, auth and organizations, access policies, storage, realtime and live queries, flows, routes, mail, AI models, agents and knowledge, environments, releases, backups - and for connecting an AI client to a Pawabase environment.
---
<!-- Built from https://github.com/Pawabase/pawabase-skill by scripts/build_bundle.py. Edit the skill there, not this file. -->


# Pawabase

Pawabase is one backend per environment: tables with an API, sign-in and organizations, access policies, files, realtime
channels and live queries, flows, routes, events, jobs, mail, an AI gateway with agents and knowledge, and the operations around
them (environments, versions, backups, activity). Everything an app does goes through the gateway, and every call is checked
against the caller's key, identity and policies.

## Work in four moves

1. **Locate.** Identify the project, environment, API address, who is calling (a person, a server, a machine, an agent), the key
   type, and the installed client version. If Pawabase MCP is connected, start with a harmless overview tool to confirm the
   environment before asking the user for anything.
2. **Verify the contract.** Check the method exists in the installed package (see [source map](#source-compatibility-and-verification)), and
   the endpoint and fields exist in the environment's own OpenAPI (Studio → API Explorer). Docs can be ahead of a package; the
   package can be ahead of a deployment.
3. **Build the smallest change** that does the job, with the right key on the right side (browser or server), and access decided
   by policies rather than by app code.
4. **Prove it.** Make a real request as the intended caller and as an unrelated one. For data rules, read a row you should and a
   row you should not. For automation, find the run in Activity. Report what you verified and what you did not.

## Choose the path

| The user wants to | Read |
| --- | --- |
| Understand how the parts fit, or plan a system | [System](#system-model) and [scenario map](#scenario-map) |
| Write browser, React, Node or edge code | [TypeScript client](#typescript-and-javascript-client) |
| Write Python scripts, servers or workers | [Python client](#python-client) |
| Call Pawabase from any other language | [HTTP API](#http-api-and-wire-contracts) |
| A complete, copyable pattern (signed-in app, team app, server on behalf of a user, uploads, live list, agent with approval) | [Recipes](#recipes) |
| Sign-in, sessions, organizations, roles, company sign-in, keys, policies | [Auth and policies](#authentication-keys-and-access-rules) |
| Tables, queries, relations, migrations, search, vectors | [Data](#data-resources-and-queries) |
| Buckets, uploads, image sizes, share links | [Storage](#storage-and-files) |
| Channels, presence, record changes, live queries | [Realtime](#realtime) |
| Flows, routes, events, schedules, webhooks, jobs, mail | [Automation](#flows-routes-events-jobs-webhooks-and-mail) |
| Models, embeddings, agents, approvals, knowledge | [AI](#ai-models-embeddings-agents-knowledge) |
| Connect an AI client to Pawabase, or a Pawabase agent to outside tools | [MCP](#mcp-connect-ai-tools-and-pawabase) |
| Studio, management clients, IaC, environments, debugging by layer | [Operations](#environments-management-and-diagnosis) |
| Cloud, self-hosting, versions, previews, backups, recovery | [Platform lifecycle](#platform-lifecycle-setup-change-release-recovery) |
| Check whether something is supported at all | [Capability boundaries](#capability-boundaries) |
| A request fails, data is missing, live updates or mail do not arrive | [Troubleshooting](#troubleshooting-by-symptom) |
| Find the right docs page | [Docs catalog](#pawabase-docs-catalog) |

Read only what the task needs. When a task crosses two areas, read both and test the boundary with a real call.

## Rules that do not bend

- **Keys.** Browsers and mobile apps use publishable `pb_pk_` keys; policies apply to everything they do. Secret `pb_sk_` keys
  bypass policies and manage the environment: servers only, never shipped. Services and AI agents get their own machine
  identity (`asMachine` / `as_machine`) instead of borrowing a person's access.
- **Callers.** A signed-in person's calls carry their access token. A server acting for a person uses `asUser(token)` /
  `as_user(token)` with a publishable key, so that person's policies apply.
- **Environments are separate.** Data, users, keys, policies, secrets, files and settings belong to one environment. A key only
  works in its own. Promotion moves definitions, never data, users, keys or secrets.
- **Policies decide access, on the server.** Lists are filtered in the database, so totals can be smaller and a single-row `404`
  can mean "not yours". Test with real, different users, never only with a secret key.
- **Definitions and tables differ.** Changing a resource definition can need a migration; preview it, and check the table after.
- **Side effects run at least once.** Events, webhooks and jobs can be delivered again; make what they trigger idempotent.
  Realtime is a signal, records are the truth.
- **No invented APIs.** Do not use a client method, endpoint, field or guarantee you have not verified in the installed version
  or the target OpenAPI. When the client lacks something the server has, make a verified raw request instead.
- **Functions are gone.** Pawabase no longer runs uploaded functions. Server logic is flows, custom routes, events, schedules and
  jobs; code that must run elsewhere calls Pawabase over the API. Do not suggest the old function kit.
- **Pawabase is Postgres.** Do not offer MySQL or SQLite paths.
- **Destructive work.** Before a restore, a schema change, a key rotation or a bulk replay, look at the target environment and the
  concrete plan or backup, and say what will change. Backups do not include file bytes, secret values or raw API keys.
- **MCP is a separate permission.** Installing this skill connects nothing. MCP needs a scoped secret key on `/mcp/v1`; the key's
  scope is the hard limit, tool confirmations are not.

## How to use this file

This is the whole Pawabase skill in one document: the rules above, then every reference below. Read the rules and the
sections the task needs. Docs links go to the live docs at https://docs.pawabase.com; the target environment's own OpenAPI
(Studio → API Explorer) and the installed client remain the contract. To install the skill as a folder instead, clone
https://github.com/Pawabase/pawabase-skill.

Contents:

- [System model](#system-model)
- [Recipes](#recipes)
- [TypeScript and JavaScript client](#typescript-and-javascript-client)
- [Python client](#python-client)
- [HTTP API and wire contracts](#http-api-and-wire-contracts)
- [Authentication, keys, and access rules](#authentication-keys-and-access-rules)
- [Data resources and queries](#data-resources-and-queries)
- [Storage and files](#storage-and-files)
- [Realtime](#realtime)
- [Flows, routes, events, jobs, webhooks, and mail](#flows-routes-events-jobs-webhooks-and-mail)
- [AI: models, embeddings, agents, knowledge](#ai-models-embeddings-agents-knowledge)
- [MCP: connect AI tools and Pawabase](#mcp-connect-ai-tools-and-pawabase)
- [Environments, management, and diagnosis](#environments-management-and-diagnosis)
- [Platform lifecycle: setup, change, release, recovery](#platform-lifecycle-setup-change-release-recovery)
- [Capability boundaries](#capability-boundaries)
- [Troubleshooting by symptom](#troubleshooting-by-symptom)
- [Scenario map](#scenario-map)
- [Source, compatibility, and verification](#source-compatibility-and-verification)
- [Pawabase docs catalog](#pawabase-docs-catalog)

---

## System model

### How a request travels

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

### Data and policy

A **table** in Pawabase is a definition over a Postgres table: fields, validation, relations, search fields, vectors, ownership,
caching, events, realtime, and five operations (list, get, create, update, delete), each enabled separately with its own rule.
The definition and the physical table are related but not the same: changing a definition can need a migration.

Rules can read `$auth`, `$record`, `$input`, `$request`, `$credential`, `$object`, `$event` and `$now`, or use shorthands
(signed in, owner, role, permission, organization, team, two-step, scope). Secret keys and Studio pass every rule. Lists are
filtered in the database, `total` can be `null` under row rules, a single-row `404` can mean hidden, and write-only fields never
come back. Details in [auth and policies](#authentication-keys-and-access-rules).

### Identity

Every request needs `apikey`; a person's or machine's request adds `Authorization: Bearer <access token>`. Publishable keys
are for apps and always obey policies. Secret keys bypass them and can carry management scopes. Machines (services, AI agents)
have their own identities and roles. Organizations scope a session to one team at a time. `user_metadata` is editable by the
user and is never authority.

### Reliability

Events and their reactions are at least once and can arrive out of order: make handlers and webhook receivers idempotent.
Realtime is live delivery, not storage; keep business state in records. Definitions promote between environments; rows, users,
keys and secrets never do. Backups leave out file bytes and secret values.

Docs: [`concepts/how-pawabase-fits-together`](https://docs.pawabase.com/concepts/how-pawabase-fits-together), [`database/how-data-works`](https://docs.pawabase.com/database/how-data-works), [`policies/how-rules-work`](https://docs.pawabase.com/policies/how-rules-work),
[`reference/keys-and-security`](https://docs.pawabase.com/reference/keys-and-security), [`environments/overview`](https://docs.pawabase.com/environments/overview).

---

## Recipes

Complete patterns for the jobs people ask for most. Each one says what to set up in the environment (Studio, the management
client or `pawabase-iac`), the code, and how to prove it. Names such as `tasks` or `support` are examples: use the project's
own. Before copying, confirm every method in the installed package ([source map](#source-compatibility-and-verification)).

### 1. Add Pawabase to an existing project

1. **Find the facts.** Gateway URL, environment name, a publishable key for the app, a secret key for servers (never in the
   bundle), and which client the project's language needs. Put them in the project's existing env file pattern:
   `PAWABASE_URL`, `PAWABASE_ENV`, `PAWABASE_PUBLISHABLE_KEY` (exposed to the browser through the framework's public prefix,
   such as `VITE_` or `NEXT_PUBLIC_`), `PAWABASE_SECRET_KEY` (server only).
2. **Install the client.** `npm install @pawabase/client`, or `pip install pawabase` (`"pawabase[realtime]"` to listen).
3. **Make one client module** and import it everywhere; never create a client per component or per request.

   ```ts
   // src/lib/pawabase.ts
   import { createClient } from "@pawabase/client";
   import type { Database } from "./pawabase.types";

   export const pawabase = createClient<Database>({
     url: import.meta.env.VITE_PAWABASE_URL,
     apiKey: import.meta.env.VITE_PAWABASE_PUBLISHABLE_KEY,
     environment: import.meta.env.VITE_PAWABASE_ENV,
   });
   ```

4. **Model the data** as tables with relations, ownership columns (`owner_id`, `org_id`) and search fields, then write a policy
   for every operation before any UI uses it. Apply migrations in development and check the table.
5. **Generate types:** `npx pawabase-types --url "$PAWABASE_URL" --env "$PAWABASE_ENV" --api-key "$PAWABASE_SECRET_KEY" --out src/lib/pawabase.types.ts`,
   and run it with `--check` in CI.
6. **Replace the old backend calls** one feature at a time, keeping the app running after each.
7. **Prove it** with two real accounts: each sees only their rows, anonymous visitors see what the policies allow and nothing
   more.

### 2. Signed-in app with private rows

Set up: table `tasks` with `title`, `done` (boolean, default false), `owner_id` (set from the caller on create), **Broadcast
changes** on. Policies: list, get, update, delete `{"owner": "owner_id"}`; create `{"authenticated": true}`.

```ts
const result = await pawabase.auth.signInWithPassword({ email, password });
if (result.status === "mfa_required") await result.verify(code);

await pawabase.from("tasks").create({ title: "Ship it" });           // owner_id comes from the session

const open = pawabase.realtime.live("tasks", { filter: { done: "is.false" }, sort: "-created_at", limit: 50 });
open.onChange(({ data }) => render(data));
await open.ready();
```

Prove it: user A creates a task; user B's list does not contain it and `get(id)` answers `404`; B cannot `update` it.

### 3. Team app: organizations, roles, invitations

Set up: each shared table gets `org_id`. Policies: list and get `{"org": "org_id"}`; create and update
`{"org_permission": "projects.write"}`; delete `{"org_role": ["admin"]}`. Define the organization roles and permissions in
Studio.

```ts
const org = await pawabase.auth.orgs.create({ slug: "acme", name: "Acme" });
await pawabase.auth.switchOrg("acme");                      // the session now carries the org, role, permissions, teams
await pawabase.auth.orgs.invite("acme", { email: "sam@acme.test", role: "member" });
await pawabase.from("projects").create({ name: "Launch", org_id: org.id });
```

- A signed-in person may be in no organization: send them to a picker or a create step, not an empty screen.
- Verified domains (`orgs.addDomain`, `verifyDomain`) can auto-join or suggest the organization to new sign-ups.
- Prove it with members of two organizations and a member without the permission.

### 4. Server or SSR acting for the signed-in person

```ts
// one shared client for the server, publishable key
const server = createClient({ url, apiKey: process.env.PAWABASE_PUBLISHABLE_KEY!, environment });

app.get("/api/tasks", async (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer /, "") ?? req.cookies.pb_access;
  const tasks = await server.asUser(token).from("tasks").order("created_at", "desc").perPage(20);
  res.json(tasks);                                          // that person's policies applied
});
```

Never answer user requests with a secret-key client: it bypasses every policy. Keep the secret key for administration routes,
and check the person's role before calling them.

### 5. Background worker or integration with a machine identity

Set up: Studio → Auth → Machines: create a machine, give it a role whose permissions the policies check
(`$auth.actor_type == "machine"` tells it apart from a person). Store its client id and secret in the worker's secrets.

```python
import os
from pawabase import Pawabase

pb = Pawabase(os.environ["PAWABASE_URL"], os.environ["PAWABASE_PUBLISHABLE_KEY"], environment="production")
worker = pb.as_machine(client_id=os.environ["PB_MACHINE_ID"], client_secret=os.environ["PB_MACHINE_SECRET"])

for order in worker.from_("orders").eq("status", "paid").iterate():
    ship(order)                                              # make it idempotent: it may see an order twice
    worker.from_("orders").update(order["id"], status="shipped")
```

The token is fetched and renewed for you. Prefer a flow on `orders.updated` when the work fits flow blocks; use a worker when it
needs your own code or libraries.

### 6. Uploads, image sizes, and links for outsiders

Set up: bucket `documents`, private. Rules on read, list, upload, delete: the first key segment equals the caller
(custom condition `$object.segments.0` equals `$auth.user_id`). Table `documents` stores `key`, `name`, `owner_id`.

```ts
const key = `${user.id}/${crypto.randomUUID()}-${file.name}`;
await pawabase.storage.from("documents").upload(key, file);
await pawabase.from("documents").create({ key, name: file.name });
const thumb = pawabase.storage.from("avatars").fileUrl(`${user.id}/me.png`, { width: 96, height: 96, fit: "cover", format: "auto" });
```

A share link for someone without an account is made on a server (secret key): `createShareLink(key, { expiresIn: 86400,
permissions: "view" })`, revocable with `revokeShareLink(id)`. Delete the file when its row goes (a flow on
`documents.deleted`).

### 7. Protect a public form from bots

Set up: Studio → Auth → Bot protection, on for the action (`sign_up`, `contact`, …).

```ts
const { pass } = await pawabase.captcha.protect("contact");          // solves the built-in check, or shows the provider widget
await fetch("/api/contact", { method: "POST", body: JSON.stringify({ ...form, pass }) });

// server, with a secret-key client
const check = await admin.captcha.verify(body.pass, { action: "contact", remoteip });
if (!check.success) return res.status(400).end();
```

Pawabase's own sign-up and sign-in apply the check by themselves when it is switched on for them.

### 8. An AI agent that asks before acting

Set up: Studio → AI: a model, an agent `support` with tools (read `orders`, run flow `refund_order`), the refund tool behind
**approval**, and limits on steps and cost.

```ts
let run = await pawabase.ai.agents.run("support", "Customer 88 wants a refund for order 1042", { background: true });
run = await pawabase.ai.agents.wait(run.id);
if (run.status === "waiting") {
  showApproval(run.pending);                                  // id, name, arguments, why
  run = await pawabase.ai.agents.decide(run.id, { approve: userClickedYes });
}
```

Tools act as the caller, so a person can only make the agent do what they could do. Continue a conversation with
`{ thread: run.thread_id }`. A flow can react to `agent.run.finished`.

### 9. Company sign-in (SSO) on the sign-in screen

```ts
const connection = await pawabase.auth.findSSO({ email });
if (connection) {
  await pawabase.auth.signInWithSSO({ email, redirectTo: `${location.origin}/auth/callback` });
} else {
  showPasswordStep();
}
// back on /auth/callback the client picks the session up from the URL by itself
```

Connections belong to an organization and route by its verified domains; the organization can require SSO, which refuses
password sign-in for its members. Add the callback URL to the redirect allowlist.

### 10. Hand an AI coding tool the environment

Create a scoped secret key in Studio → AI → AI tools (**Look only** for production, **Build with me** for development), keep it
in `PAWABASE_MCP_KEY`, and add the server to the tool (see [MCP](#mcp-connect-ai-tools-and-pawabase)). Then ask for real work: "List the tables, then add a
`comments` table owned by the signed-in user, with policies, and show me the migration before applying it."

---

## TypeScript and JavaScript client

`@pawabase/client` (verified at **0.7.0**) runs in browsers, React, Node, Deno, Bun and edge runtimes on standard `fetch` and
`WebSocket`, as ESM or CommonJS. One client shares one session across every module. Check the installed version first:
`node -p "require('@pawabase/client/package.json').version"`.

```ts
import { createClient } from "@pawabase/client";

const pawabase = createClient({
  url: "https://api.example.com",   // the project's gateway
  apiKey: "pb_pk_…",                // publishable in browsers
});
```

Options: `url`, `apiKey`, `project`, `environment`, `timeoutMs`, `retry` (or `false`), `fetch`, `headers`, `hooks`, `auth`
(session storage and behaviour), `realtime` (socket options, an injected `WebSocket` for old Node), `accessToken` (a fixed token
or a function returning one, which makes the client stateless for server use), and `dangerouslyAllowBrowser` (only to silence the
refusal of a secret key in a browser; never set it in shipped code). Call `pawabase.dispose()` when you drop a client.

### Callers

| Who is calling | How |
| --- | --- |
| A person in the browser | Publishable key, then `auth.signIn…`; the session is stored and refreshed for you |
| A server acting for that person | `pawabase.asUser(accessToken)` on a publishable-key client: their policies apply |
| A server doing administration | A separate client with a secret key, kept on the server |
| A service or AI agent | `pawabase.asMachine({ clientId, clientSecret, scope })`: its own identity and roles |

### Surface at 0.7.0

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

### Queries and results

- One filter per field is sent; the builder refuses a second bound on the same field. Booleans and nulls go through `is`
  (`eq(field, false)` is sent as `is.false`). Commas inside `in` values are refused.
- `perPage(n)` resolves to `{ data, total }`. Under row policies `total` can be `null` and a page can be shorter than `n`.
- `createMany` is not atomic. For all-or-nothing writes use a flow with a transaction, or a custom route.
- `similar(field, vector)` orders by vector distance on a vector field; `search(text)` uses the table's search fields.

### Live queries

```ts
const open = pawabase.realtime.live<Task>("tasks", { filter: { done: "is.false" }, sort: "-created_at", limit: 20 });
open.onChange(({ data, total }) => render(data));
await open.ready();     // the first result
// later
open.stop();
```

The table needs **Broadcast changes** on. The same filters, sort, search and list policy as a `GET /rest/v1/<resource>` apply, so
a person only ever receives rows they may read. It reopens itself after a reconnect.

### Errors and retries

Every error is a `PawabaseError`. HTTP errors are `ApiError` subclasses: `AuthenticationError` (401), `PermissionError` (403),
`NotFoundError`, `ConflictError`, `ValidationError` (422, with field problems), `PayloadTooLargeError`, `RateLimitError` (429),
`ServerError`. Others: `NetworkError`, `TimeoutError`, `AbortError`, `ConfigError`, `InvalidQueryError`, `RealtimeError`. Keep
`status`, `code` and `requestId`; the request id finds the trace in Studio → Activity. The client follows `Retry-After` on 429
and retries safe methods on transient failures; it does not repeat a POST or PATCH after an uncertain network failure unless you
mark it idempotent, so make the server side safe for duplicates first.

### Types

`npx pawabase-types --url <gateway> --env <environment> --api-key <key> --out src/pawabase.types.ts` (or `--file openapi.json`)
generates a `Database` type from the environment's OpenAPI;
`createClient<Database>(…)` then types every `from()`. Run it with `--check` in CI to catch schema drift. Expanded relations may
need a hand-written augmentation.

Verified in the SDK source (`src/client.ts`, `data.ts`, `auth.ts`, `files.ts`, `realtime.ts`, `ai.ts`, `agents.ts`,
`captcha.ts`, `functions.ts` for flows and routes, `manage/`, `admin.ts`, `errors.ts`). Check the installed declarations for exact
option names before relying on one.

---

## Python client

`pawabase` (verified at **0.9.0**) needs Python 3.11+ and `httpx`. `Pawabase` blocks, `AsyncPawabase` has the same methods
awaited. Live channels and live queries need the async client and the `realtime` extra. Check the installed version first:
`python -c "import pawabase; print(pawabase.__version__)"`.

```bash
pip install pawabase                 # httpx only
pip install "pawabase[realtime]"     # + websockets, for channels and live queries
```

```python
from pawabase import Pawabase

with Pawabase("https://api.example.com", "pb_pk_…", environment="production") as pb:
    page = pb.from_("orders").eq("status", "paid").order("-created_at").per_page(20).execute()
```

Options: `environment` (defaults to `"development"`: always set it, a key from another environment is refused), `timeout`,
`retries`, `session_store` (`MemorySessionStore`, `FileSessionStore`, or your own `SessionStore`), `access_token`,
`auto_refresh`, `headers`. Use `with` / `async with`, or call `close()` (`await pb.close()` on the async client), so connections are released.

### Callers

| Who is calling | How |
| --- | --- |
| A person, in a script or desktop app | Publishable key, then `pb.auth` sign-in; the session lives in the session store |
| A web server acting for a signed-in person | `pb.as_user(token)` on a publishable-key client: their policies apply |
| Server administration | A separate client with a secret key: `pb.manage` and `pb.admin` unlock |
| A service or AI agent | `pb.as_machine(client_id=…, client_secret=…, scope=…)`: its own identity and roles |

### Surface at 0.9.0

| Area | API |
| --- | --- |
| Records | `pb.from_(name)` (aliases `table`, `resource`): `select`, `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in_`, `not_in`, `is_`, `is_not`, `where(**fields)`, `filter`, `search`, `similar`, `expand`, `order("-field")`, `page`, `per_page`; `execute` → `Page` (`data`, `total`, `has_next`), `all`, `first`, `one`, `single`, `get`, `maybe_get`, `count`, `exists`, `iterate`, `pages`, `paginate`; writes `create`, `create_many` (collects failures), `update`, `replace`, `delete` |
| Auth | `pb.auth`: sign-up and sign-in (password, links, email codes, OAuth with `oauth_url` / `exchange_code`, passkeys, MFA challenge and enrol, recovery codes), `find_sso`, `sso_url`, sessions and devices, organizations (`create`, `members`, `invite`, `accept_invitation`, roles, teams, domains), user API keys, `on_auth_state_change`, `jwks`, `issue_token` |
| Storage | `pb.storage.list_buckets()`, `pb.storage.from_(bucket)`: `upload`, `download`, `download_text`, `download_json`, `download_response`, `list`, `list_all`, `remove`, `public_url`, `transform_url`, `create_share_link`, `list_share_links`, `revoke_share_link`, `create_signed_url`, `create_signed_upload_url`, `upload_to_signed_url` |
| Realtime | `pb.realtime.publish`, `history`, `presence`, `sse(channels)` (sync generator / async generator); async only: `channel(name, presence=…, replay=…)` with `subscribe`, `on`, `send`, `track`, `unsubscribe`, and `live(resource, filter=…, sort=…, limit=…)` live queries |
| Server logic | `pb.flows.invoke(name, **input)` for a flow with an HTTP trigger; `pb.routes.call(method, path, json=…, params=…)` and `get`, `post(path, **body)`, `put`, `patch`, `delete` for custom routes |
| AI | `pb.ai.models()`, `complete`, `chat`, `stream`, `embed`; `pb.ai.agents`: `list`, `run(name, input, thread=…, background=…)`, `stream`, `get`, `decide(run_id, approve=… or decisions={…})`, `wait(run_id, timeout=…)`; `pb.ai.knowledge`: `search(name, query, limit=5)`, `add_document(name, text=… or url=…)`, `add_file`, `document` |
| Bot protection | `pb.captcha.protect(action)` returns a pass; `prepare`, `redeem`; `verify(token, action=…)` on servers to check one |
| Management (secret key) | `pb.manage`: resources, schema, policies, routes, flows, schedules, events, webhooks, buckets, mail, realtime channels, keys, secrets, domains, observability, alarms, status page, AI models, agents, knowledge, connections, environments, versions, backups |
| Administration (secret key) | `pb.admin`: `users`, `roles`, `orgs`, `sso_connections`, `invitations`, `sessions`, `api_keys`, `machines`, `devices`, `insight`, `privacy` |
| Raw | `pb.request(method, path, json=…, params=…)`, `pb.stream(...)`, `pb.url_for(path, **query)`, `pb.status()` |

### A live query (async)

```python
from pawabase import AsyncPawabase

async with AsyncPawabase(url, "pb_pk_…", environment="production") as pb:
    async with pb.realtime.live("tasks", filter={"done": "is.false"}, sort="-created_at", limit=20) as live:
        async for result in live:          # the whole filtered result, each time it changes
            render(result["data"])
```

The table needs **Broadcast changes** on; the list policy applies, so each person only receives rows they may read. Filter
booleans and nulls with `is`. `limit` is 1 to 200.

### Errors

Every API error is a `PawabaseError` with `status_code` (`0` when the gateway was unreachable), `code` (`unique_violation`,
`quota_exceeded`…), `message`, `detail` (the body), `details`, `problems` and `request_id`. Subclasses: `NetworkError`,
`AuthenticationError`, `ForbiddenError` (and `QuotaExceededError`), `NotFoundError`, `ConflictError`, `ValidationError` (and
`QueryError`, for a query the builder refuses), `RateLimitedError`, `ServerError`, `RealtimeError`. `ConfigError` (bad setup) is
not a `PawabaseError`. The `request_id` finds the trace in Studio → Activity.

```python
from pawabase import ConflictError, ForbiddenError

try:
    pb.from_("members").create(team=team_id, user=user_id)
except ConflictError:
    pass                      # already a member: safe to ignore when retrying
except ForbiddenError as error:
    log.warning("refused by policy", extra={"request_id": error.request_id})
```

### Not in this package

There is no function kit any more: Pawabase does not run uploaded functions. Put server logic in flows, custom routes,
schedules and jobs, or in your own service that calls Pawabase. Versioned definitions as code are the separate `pawabase-iac`
package (`validate`, `plan`, `deploy`); it is not this client.

Verified in the package source (`pawabase/client.py`, `data.py`, `auth.py`, `storage.py`, `realtime.py`, `ai.py`,
`callables.py`, `captcha.py`, `manage/`, `admin.py`, `errors.py`). Read `help()` on the installed object for exact arguments.

---

## HTTP API and wire contracts

For any language without a client, or when a client lacks a method the server has. Use the project's gateway URL. Every
request carries `apikey: pb_pk_…` (or `pb_sk_…` on servers); add `Authorization: Bearer <access token>` to act as a signed-in
person or machine, and `Content-Type: application/json` for JSON bodies.

The contract that counts is the environment's own OpenAPI: Studio → API Explorer, or `GET /docs/v1/<env>/openapi.json` when the environment has public API docs switched on. It
includes that environment's tables, custom routes and their real error shapes. The public snapshot in the docs repository is
for route discovery only.

### Records

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
- Versions: `/rest/v2/…` and later serve other definitions over the same tables (see [platform lifecycle](#platform-lifecycle-setup-change-release-recovery)).

### Route families

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
| `/mcp/v1` | `POST` JSON-RPC | Outside AI clients ([MCP](#mcp-connect-ai-tools-and-pawabase)); not in OpenAPI |
| `/health/v1` | `GET` | Health |

There is no `/functions/v1`: Pawabase no longer runs uploaded functions. `/studio` takes a Cloud-signed Studio token, not an app
key. Management keys only reach their own environment.

### Errors

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
trace in Studio → Activity. See [`database/rest-api`](https://docs.pawabase.com/database/rest-api) and [`reference/errors`](https://docs.pawabase.com/reference/errors).

---

## Authentication, keys, and access rules

### Who is calling

Every request carries `apikey`. A signed-in caller also carries `Authorization: Bearer <access token>`. The gateway checks the key
(environment, expiry, allowed origins, IPs and routes, scopes, rate limit, quota); the server then resolves the caller and runs the
policy for the exact operation.

| Credential | Lives in | Policies | Use for |
| --- | --- | --- | --- |
| Publishable `pb_pk_` | Browser, mobile, desktop | Always apply | Every app a person uses |
| A person's access token | The client's session store | Apply as that person | Signed-in calls; servers forward it with `asUser` / `as_user` |
| Secret `pb_sk_` | Server environment variables | **Bypassed** | Administration, `manage`, `admin`, MCP. Never in a bundle |
| Machine identity (`pbm_` client id and secret) | A service's secret store | Apply as the machine | Workers, integrations, AI agents: `asMachine` / `as_machine` |
| User API key | Issued by a person | Apply as that person | Scripts a person runs; ends with their access |

Scopes narrow a key: `family:read`, `family:write`, `family:*`, or `*`. App families: `data`, `storage`, `auth`, `flows`, `ai`,
`realtime`. Management families (`resources`, `users`, `keys`, `secrets`, `backups`, `monitoring`…) need a secret key. A key
with no scopes is not narrowed; rules and key type still apply. Full map: [`reference/keys-and-security`](https://docs.pawabase.com/reference/keys-and-security).

### Sign-in

The clients cover password, sign-in links, email codes, social sign-in, passkeys, two-step verification and recovery codes,
guests, sessions and devices, organizations, company sign-in (SSO) and token profiles. What is switched on is per environment.

```ts
const result = await pawabase.auth.signInWithPassword({ email, password });
if (result.status === "mfa_required") {
  await result.verify(await askForCode(result.factors));   // the session exists only after this
}
```

- **Browsers.** The client stores and refreshes the session; `onAuthStateChange` drives the UI. OAuth, SSO, password reset,
  invitations and verification links need the redirect URL on the environment's allowlist ([`auth/redirect-urls`](https://docs.pawabase.com/auth/redirect-urls)).
- **Servers and SSR.** Read the person's token from the request and use `asUser(token)` per request. Never share one signed-in
  client between requests. Refresh tokens rotate: refresh in one place, never log tokens.
- **Guests.** `signInAnonymously`, then `upgradeAnonymous` when they register, so their rows stay theirs.
- **Company sign-in.** `findSSO({ email })` tells you whether the email's domain belongs to an organization with a connection;
  `signInWithSSO({ email })` redirects in a browser. A required-SSO organization refuses password sign-in for its members.
- **Token profiles** issue separate tokens for other services. The receiver checks signature, audience, issuer and expiry
  against the environment's JWKS. They do not replace the Pawabase session.
- `user_metadata` is editable by the user. Never base access on it; use roles, permissions or app metadata.

### Organizations

A person can belong to many organizations; a session is in at most one at a time. Choose it at sign-in (`org`) or later with
`auth.switchOrg(slug)`. The session then carries the organization, the person's role, its permissions and their teams
(`$auth.org`, `$auth.org_role`, `$auth.org_permissions`, `$auth.org_teams`). `auth.orgs` covers members, invitations, teams,
custom roles, verified domains (auto-join or suggest), required two-step verification, transfer and the audit log.

A signed-in person can have **no** active organization. Rules that use organization checks fail closed for them; send them to an
organization picker rather than showing an empty app.

### Policies

Every operation has its own rule: each table's list, get, create, update and delete; each bucket action; flows, routes,
channels, agents and models. Prefer the shorthands to hand-written conditions:

| JSON | Passes when |
| --- | --- |
| `{"authenticated": true}` | Signed in |
| `{"owner": "owner_id"}` | Signed in and the column equals the caller's id |
| `{"role": ["admin"]}` / `{"permission": ["posts:write"]}` | Any of the roles / all of the permissions |
| `{"org": "org_id"}` | In an organization and the row's column holds its id. On lists this becomes a database filter |
| `{"org_role": ["admin"]}` / `{"org_permission": "invoices.write"}` / `{"team": ["finance"]}` | The caller's role, permission or team in the current organization |
| `{"aal": "aal2"}` | The session completed two-step verification |
| `{"scope": "resource:write"}` / `{"kind": "user"}` / `{"service": true}` | Key scope / caller kind / a secret key or Studio |

Custom conditions can read `$auth`, `$record`, `$input`, `$request`, `$credential`, `$object`, `$event` and `$now`; tell a
machine from a person with `$auth.actor_type == "machine"`. See [`policies/shorthands`](https://docs.pawabase.com/policies/shorthands) and [`policies/context`](https://docs.pawabase.com/policies/context).

How results look under rules:

- Lists are filtered in the database: pages can be short and `total` can be `null`. A single-row `404` can mean "not yours".
- Create, update and delete are checked separately. An update rule on `owner_id` also stops a person moving a row out of
  their reach. Expanded relations and realtime record changes apply the related table's read rule.
- A secret key passes every rule, so it proves nothing about user access.

### Prove the rules

For each operation, decide the actor and the expected answer, then make real requests as: anonymous, the owner, another user,
another organization's member, and a machine if one is involved. A hidden button is not authorization. Studio's policy
debugger shows why a request was allowed or refused ([`policies/debugging`](https://docs.pawabase.com/policies/debugging), [`policies/testing`](https://docs.pawabase.com/policies/testing)).

---

## Data resources and queries

A **resource** is a definition exposing a database table. It declares fields, validation, relations, search, ids/timestamps, owner behavior, caching, events, realtime, and independently enabled list/get/create/update/delete operations. A physical table can exist without a public resource. Creating or changing a resource definition can leave a pending migration; inspect/apply it before expecting new columns to work.

### Read and write path

For `GET /rest/v1/tasks`, the edge checks key/scope/limits, auth resolves the caller, the list rule constrains rows, filters/sort/paging run, then response shaping removes write-only fields. A list returns `{data, page, per_page, total}`; `total` can be `null` under per-row policies. A related row expanded through `expand` is checked under its own resource rule and may become `null`. Single-row `404` hides the distinction between missing and unreadable.

`POST` creates, `PATCH` updates provided fields, `PUT` also behaves as a partial update, and `DELETE` returns no body. A created row can get an id, timestamps, and owner field from the caller. Writes emit `<table>.created`, `.updated`, or `.deleted`, invalidate cached lists, and can broadcast if enabled. `createMany` / `create_many` write in batches and are not atomic; use a server transaction/flow for all-or-nothing behavior.

### Query constraints worth remembering

- `filter[field]=op.value`, `sort=-created_at,title`, `page` from 1, `per_page` from 1 to 200, `select`, `expand`, and `q` are supported by the documented REST API.
- One filter per field survives on the server. Do not express `gte` and `lte` on the same field as separate filters; use a verified route/SQL design when a two-sided range is essential.
- `eq.false` has a server pitfall; TypeScript's `.eq(field, false)` maps to `is.false`. Raw HTTP should use `is.false` for Boolean checks.
- `in`/`nin` split comma-separated values; a value containing a comma needs a different query design.
- `paginate=false` caps the result at 5,000; page through larger sets. Search `q` requires configured search fields.
- Filtering/sorting/selecting an unknown field is rejected. Write-only columns are not returned; vector columns are normally omitted unless explicitly requested.

Generated TypeScript types come from an environment's OpenAPI, which includes its actual resources. Relations added by `expand` may need an explicit row type. For schema changes, prefer versioned IaC/promotions where the project uses them, then validate migration and API shape in the target environment. Read [`database/how-data-works`](https://docs.pawabase.com/database/how-data-works), [`database/rest-api`](https://docs.pawabase.com/database/rest-api), [`database/migrations-and-history`](https://docs.pawabase.com/database/migrations-and-history), and [`database/relations`](https://docs.pawabase.com/database/relations) in the docs repo.

### Cross-cutting data cases

- **External writers:** ordinary API writes emit events, invalidate cache, and can broadcast. SQL or another service writing directly needs the resource's outside-change capture setting for events/realtime; it does not automatically invalidate response cache. Check [`database/events-and-realtime`](https://docs.pawabase.com/database/events-and-realtime) and [`database/caching-and-rate-limits`](https://docs.pawabase.com/database/caching-and-rate-limits).
- **Bulk and transactions:** client `createMany` may partly succeed. If all records must commit together, use a verified server transaction/flow; for imports, record per-row failures and resume safely. Check [`database/bulk-writes`](https://docs.pawabase.com/database/bulk-writes).
- **Search and indexes:** `q` only works with configured search fields. Search is ranked Postgres full text with no typo tolerance; use indexes for selective filters/sorts and inspect query behavior before promising typo tolerance. Check [`database/filter`](https://docs.pawabase.com/database/filter) and [`database/indexes`](https://docs.pawabase.com/database/indexes).
- **Shared API versions:** v1 and v2 can expose different definitions over the same data. Design additive schema changes until older versions are retired. Check [`environments/api-versions`](https://docs.pawabase.com/environments/api-versions).

---

## Storage and files

Buckets hold objects addressed by bucket and key. Each bucket sets visibility, allowed types and maximum size, and has a
separate rule per action (read, list, upload, update, delete). Public read never implies public upload, list or delete.

For per-person or per-organization files, start the key with the owner (`<user_id>/avatar.png`, `<org_id>/invoices/…`) and
write the rule against `$object.segments`. Keep display names, ownership and metadata in a table that stores the **key**, not a
URL, so domain or environment changes never break references.

```ts
const docs = pawabase.storage.from("documents");
await docs.upload(`${userId}/report.pdf`, file);                     // replaces an object at the same key
const { files, prefixes, cursor } = await docs.list({ prefix: `${userId}/` });
const blob = await docs.download(`${userId}/report.pdf`);
await docs.remove(`${userId}/old.pdf`);
```

### Addresses

| You need | Use | Notes |
| --- | --- | --- |
| A stable address, public bucket or the bucket's read rule | `fileUrl(key, { width, height, fit, format, quality, rotate })` | `…/storage/v1/files/<env>/<bucket>/<key>`, no key in it; needs `environment` in the client options. Transforms make resized images on the fly (`format: "auto"` picks AVIF or WebP) |
| A short-lived download | `createSignedUrl(key, { expiresIn })` | The URL itself is the credential |
| A browser upload without a session | `createSignedUploadUrl` on a server, then `uploadToSignedUrl` in the browser | Do not attach a project key to that upload |
| A link for people without an account | `createShareLink(key, { expiresIn, permissions, label })` | Secret key, so on a server. Revocable (`revokeShareLink`), counts opens; `view`, `download` or `both`; 60 s to a year |
| A public bucket's object in a browser | `getPublicUrl(key)` | Refuses a secret key |

Python has the same set in snake_case (`file_url` is `transform_url`, plus `public_url`, `create_share_link`).

### Lifecycles

- Files and records live separately: deleting a row does not delete its file. Clean up deliberately, from a flow on
  `<table>.deleted` or a sweep.
- Writing to an existing key overwrites it, and cached images can stay stale; use versioned keys when it matters.
- Environment backups do not contain file bytes. A restore can bring back rows pointing at files that are not there: back up the
  object store separately.
- Each user's avatar is handled for you: `auth.setAvatar(file)` / `removeAvatar()` store it in an automatic public bucket.

Docs: [`storage/buckets`](https://docs.pawabase.com/storage/buckets), [`storage/upload`](https://docs.pawabase.com/storage/upload), [`storage/urls-and-links`](https://docs.pawabase.com/storage/urls-and-links), [`storage/access`](https://docs.pawabase.com/storage/access),
[`storage/files-and-records`](https://docs.pawabase.com/storage/files-and-records).

---

## Realtime

Three tools, for three jobs:

| You want | Use | Truth lives in |
| --- | --- | --- |
| A list on screen that stays current (tasks, orders, a feed) | A **live query** | The table: the server re-sends the whole filtered result |
| To react to individual row changes (a toast, a counter, a sync job) | **Record changes** on `resource:<table>` | The table: events are signals, refetch when unsure |
| Messages between people or devices (chat, typing, cursors, who is online) | **Channels** with presence and history | The channel backlog, or records if messages must last |

Channels have names like `chat:lobby`, `order:42` or `resource:tasks`. A channel rule in Studio matches the name and separately
decides subscribe, publish, presence, history and limits. The connection carries the environment key and, when signed in, the
person's access token; rules see who they are.

### Live queries

```ts
const open = pawabase.realtime.live<Task>("tasks", { filter: { done: "is.false" }, sort: "-created_at", limit: 20 });
open.onChange(({ data, total }) => render(data));
await open.ready();          // the first result
open.stop();                 // when the view goes away
```

```python
async with pb.realtime.live("tasks", filter={"done": "is.false"}, sort="-created_at", limit=20) as live:
    async for result in live:
        render(result["data"])
```

- The table needs **Broadcast changes** on. Filters, `sort`, `select`, `q` (search) and the list policy are the same as
  `GET /rest/v1/<table>`, so each person only receives rows they may read; `total` is `null` when a row policy makes the count
  unreliable.
- `filter` is sent as written: `{ status: "eq.paid" }`. Booleans and nulls go through `is` (`is.false`, `is.null`).
- `limit` is 1 to 200. Each live query costs the server a re-run on every change to the table; keep them per view, not per row.
- It reopens by itself after a reconnect and delivers a fresh result, so there is no gap to patch.
- Python: `AsyncPawabase` and `pip install "pawabase[realtime]"`.

### Record changes

With **Broadcast changes** on, subscribe to `resource:<table>` for `created`, `updated` and `deleted` events carrying
`payload.record`. The table's read rule decides who receives each change. Apps cannot publish to `resource:` channels. Changes
made outside the API (direct SQL) need the separate change-capture setting.

To avoid a gap on first load: subscribe, then read the list. Merge events by record id. After a reconnect, refetch when history
may not cover the time you were away. If you are doing this for a list on screen, a live query is simpler.

### Channels

```ts
const room = pawabase.realtime.channel<{ text: string }>("chat:lobby", { presence: { name: "Ada" }, replay: 50 });
const stop = room.onEvent("message", ({ payload, from }) => show(from, payload.text));
room.on("presence", ({ members }) => showRoster(members));   // joins and leaves too
await room.subscribe();
await room.send("message", { text: "hello" });
const recent = await room.history(50);
stop();
await room.unsubscribe();
```

```python
room = pb.realtime.channel("chat:lobby", presence={"name": "Ada"}, replay=50)   # AsyncPawabase
room.on("message", lambda message: show(message))
await room.subscribe()
await room.send("message", {"text": "hello"})
```

- The client opens one WebSocket on the first subscription, heartbeats, reconnects with backoff, rejoins channels, and with
  `replay` fetches the messages missed while away. It swaps in a refreshed token without reconnecting.
- `on("message")` gets every message; `onEvent(name)` filters by event. Other channel events: `presence`, `subscribed`,
  `closed`, `error`. The sender also receives its own message: render delivered messages and deduplicate by id.
- Show connection state from `realtime.status` / `onStatusChange`. On old Node without a global `WebSocket`, pass one in the
  `realtime` options.
- Presence metadata is visible to everyone on the channel: no secrets in it.
- **Ephemeral** channels keep nothing for a disconnected client; history depth keeps a bounded backlog; **durable** channels
  keep messages until retention. Messages that must stay (a chat log) belong in a table as well.
- For typing indicators and cursors, send ephemeral events; never write every movement to a table.

### Without a socket

Publishing, presence and history work over HTTP from any server: `realtime.publish(channel, event, payload)`,
`realtime.presence(channel)`, `realtime.history(channel, limit)` (TypeScript and Python). To listen without a socket, SSE:
`realtime.stream(channels)` in TypeScript, `realtime.sse(channels)` in Python, at most 20 channels, listen only.

The wire: `POST /realtime/v1/publish`, `GET /realtime/v1/channels/{channel}/history`,
`GET /realtime/v1/channels/{channel}/presence`, `GET /realtime/v1/sse`, and the WebSocket protocol in
[`realtime/connection`](https://docs.pawabase.com/realtime/connection). There is no MQTT, HTTP streaming or long polling.

### When it does not arrive

Studio → Realtime has a playground, live connections and history; Activity shows refused joins. Check in order: the channel
rule (subscribe and publish are separate), the key's environment, the token, **Broadcast changes** on the table, and the
table's read rule for the receiving person. See [`realtime/record-changes`](https://docs.pawabase.com/realtime/record-changes) and [`realtime/patterns`](https://docs.pawabase.com/realtime/patterns).

---

## Flows, routes, events, jobs, webhooks, and mail

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
[machine identity](#authentication-keys-and-access-rules) and is triggered by a webhook or a flow's HTTP step.

### Flows

A flow is a sequence of blocks: input, conditions and branches, reads and writes on tables (under the caller's policies unless
the flow is set otherwise), transactions, HTTP calls, mail, events, AI and agent steps, and a response. A flow without a
`response.return` answers `{ data: … }` with its result. The flow's own rule decides who may start it. Studio's flow editor runs a
flow with sample input and keeps every run's steps in Activity.

- For all-or-nothing writes, use a transaction block; the SQL block is read only.
- Keep secrets in environment secrets and reference them from blocks; never paste them into a flow.
- A route flow is addressed by its method and path, not by name.

### Delivery and retries

- Events, subscriptions, webhooks and jobs are **at least once** and in no fixed order. Make every reaction idempotent: key
  payments, mail and external calls on the event or delivery id, and check before acting.
- Flow steps, jobs, outbound webhooks and mail each have their own retry settings.
- A caller's `POST` can time out after the server finished. The clients do not repeat a `POST` after an uncertain failure unless
  you mark it idempotent; do that only when the server side already dedupes.
- Schedules: choose **Allow** or **Skip** for overlap, and whether one missed run catches up after downtime (once per schedule, not
  once per missed slot). A periodic sweep beats one scheduled job per row.
- Inbound hooks: verify the signature before trusting the body; dedupe by the sender's delivery id.
- Replay failed jobs or deliveries only after fixing the cause, and only the ones whose side effects are safe to repeat.

### Mail

Templates (with variables and a preview) live per environment. An environment without its own provider can send through
Pawabase's built-in sender within the plan's allowance. When mail does not arrive, separate the layers: template render,
provider settings, sender domain DNS, the queued send, the delivery log, and suppression of the recipient.

### Where to look

Activity shows the event, the subscription that matched, the flow run with each step, the job, the webhook attempts and the mail
log as separate records: follow the chain instead of assuming the first request failed. Docs: [`logic/flows`](https://docs.pawabase.com/logic/flows),
[`logic/routes`](https://docs.pawabase.com/logic/routes), [`automation/events`](https://docs.pawabase.com/automation/events), [`automation/jobs`](https://docs.pawabase.com/automation/jobs), [`automation/schedules`](https://docs.pawabase.com/automation/schedules), [`automation/webhooks`](https://docs.pawabase.com/automation/webhooks),
[`automation/webhook-signatures`](https://docs.pawabase.com/automation/webhook-signatures), [`automation/reliability`](https://docs.pawabase.com/automation/reliability), [`mail/overview`](https://docs.pawabase.com/mail/overview), [`mail/troubleshooting`](https://docs.pawabase.com/mail/troubleshooting).

---

## AI: models, embeddings, agents, knowledge

Provider keys stay on the server. The environment exposes **named models** (aliases such as `chat` or `embed`, not provider
model ids), each with its own rule and usage limits. Agents and knowledge bases are defined in Studio → AI, run on the server,
and are reached through the same gateway and policies as everything else.

| Want | TypeScript | Python | Wire |
| --- | --- | --- | --- |
| List models the caller may use | `ai.models()` | `pb.ai.models()` | `GET /ai/v1/models` |
| Text answer | `ai.chat(model, input)` → string | `pb.ai.chat(model, input)` | `POST /ai/v1/chat/completions` |
| Full completion (usage, tool calls) | `ai.complete(model, input, options)` | `pb.ai.complete(...)` | same |
| Stream tokens | `for await (const piece of ai.stream(model, input))` | `pb.ai.stream(model, input)` | same, `stream: true` |
| Embeddings | `ai.embed(model, text \| texts)` | `pb.ai.embed(model, input)` | `POST /ai/v1/embeddings` |
| Run an agent | `ai.agents.run(name, input, { thread, background })`, `ai.agents.stream` | `pb.ai.agents.run(name, input, thread=…, background=…)`, `stream` | `POST /ai/v1/agents/{name}/runs` |
| Search a knowledge base | `ai.knowledge.search(name, query, { limit })` | `pb.ai.knowledge.search(name, query, limit=5)` | `POST /ai/v1/knowledge/{name}/search` |

The `/ai/v1` chat and embeddings bodies follow the OpenAI shape, so OpenAI-compatible SDKs can point at the gateway with a
Pawabase key; confirm the payload in the environment's OpenAPI before relying on a field.

### Agents

An agent is a model plus instructions, tools (tables, flows, knowledge, app connections, MCP servers) and limits on steps, time
and cost. A run has `status` `running`, `waiting`, `done` or `failed`, an `output`, and a `thread_id` to continue the
conversation.

```ts
let run = await pawabase.ai.agents.run("support", "Refund order 1042", { background: true });
run = await pawabase.ai.agents.wait(run.id);
if (run.status === "waiting") {
  // run.pending: the tool calls waiting for a person, each with id, name, arguments, why
  run = await pawabase.ai.agents.decide(run.id, { approve: true });   // or { decisions: { [callId]: false } }
}
```

- Tools act as the caller unless the agent is configured to act as itself; a person can only make an agent do what they could
  do. Give a background agent a [machine identity](#authentication-keys-and-access-rules), not a person's session.
- Put actions that change outside state (refunds, mail, tickets) behind **approval**. A finished background run emits
  `agent.run.finished`, which a flow can pick up.
- Check step, time and cost limits before building automated changes on top of an agent.

### Knowledge and vectors

A knowledge base takes documents (`addDocument({ text | url })`, `addFile(blob)`), splits and embeds them, and answers `search`.
For your own tables, a vector field plus an embedding pipeline lets `from("docs").similar(field, vector)` order by meaning; the
list policy still decides which rows come back, and vector columns are left out of ordinary reads.

### Debugging

Separate the layers: the provider connection and its key, the model alias, the model's rule, quota and cost limits, the
embedding pipeline, and the agent's tool permissions and approvals. Each agent run keeps its steps in Activity.

Docs: [`ai/gateway`](https://docs.pawabase.com/ai/gateway), [`ai/use-it`](https://docs.pawabase.com/ai/use-it), [`ai/vector-search`](https://docs.pawabase.com/ai/vector-search), [`ai/agents/overview`](https://docs.pawabase.com/ai/agents/overview), [`ai/agents/approvals-and-limits`](https://docs.pawabase.com/ai/agents/approvals-and-limits),
[`ai/knowledge/overview`](https://docs.pawabase.com/ai/knowledge/overview). Pawabase's own MCP endpoint, for outside AI clients, is a different thing: see [MCP](#mcp-connect-ai-tools-and-pawabase).

---

## MCP: connect AI tools and Pawabase

Pawabase participates in MCP in two directions. Keep them separate:

| Direction | What it does | Where to configure |
| --- | --- | --- |
| **AI client → Pawabase** | Claude Code, Codex, Cursor, or another MCP client inspects and manages a Pawabase environment. | Pawabase's `/mcp/v1` endpoint or local `pawabase-server mcp`. |
| **Pawabase agent → external MCP server** | A Pawabase agent uses an outside app's tools, such as GitHub, Linear, or a custom server. | Studio → AI → Connections → Any MCP server, then the agent's tool list. |

The skill itself is instructions. Installing it does not create an MCP connection. MCP is optional for the skill's advice; use it when live project inspection or management is useful.

### When MCP is already connected

Discover the Pawabase tool/resource catalog supplied by the client. Start with a read such as `get_overview`, `list_environments`, or `pawabase://{env}/overview` to identify the environment and visible scope. Use a purpose-built tool (`list_resources`, `get_resource`, `list_flow_runs`, and so on) before the broader `request_platform` escape hatch. For a definition change, inspect the current definition and plan/schema drift, apply the authorized change, then verify the result with a read. Do not ask the user to paste an API key when the connected tool already has the needed access. If a tool is absent, determine whether the key lacks its scope or the runtime lacks that tool; do not invent a tool call.

### AI client → Pawabase: choose authority first

For a hosted/remote client, use the public **HTTPS** gateway address `https://YOUR-API/mcp/v1`, not the internal server port. Pawabase's HTTP MCP endpoint is stateless Streamable HTTP: JSON-RPC over `POST`, ordinary JSON response, no session or SSE stream. `GET` and `DELETE` return `405`. The endpoint can be disabled with `PAWABASE_MCP_ENABLED=false`; the local stdio command remains a separate explicit option.
The route is intentionally excluded from the environment's generated OpenAPI. Verify it against the runtime MCP guide and the target deployment rather than expecting it in the API Explorer.

Create a **secret** environment key in Studio → AI → AI tools (or the environment's API keys page) and select **Look only** (`ai-read`) or **Build with me** (`ai-build`). A publishable key is refused. A scoped secret key needs at least one management scope to reach MCP; each listed tool and each call is then checked against its scopes. A key is pinned to its own environment and cannot escape into another environment through `request_platform`. An unscoped secret key exposes every available tool for that environment, so use a scoped key for ordinary AI clients. The key is shown once. Keep it in the client/secret store, not in git, chat, or a committed TOML file.

`ai-read` can inspect project definitions and activity without changing them. `ai-build` adds data and definition building but excludes users, keys, secrets, snapshots, and promotion. Exact tool visibility depends on key scopes and runtime version. The tool list can include resources/schema, records, policies, flows/jobs, storage, mail, webhooks, logs, AI models, and release/backup operations. Do not assume a static tool count.

#### Client setup

Keep the key in `PAWABASE_MCP_KEY` in the environment that launches the client (a desktop app may need it set where the app
can read it). Every client needs the same three things: Streamable HTTP, the URL, and the key as an `apikey` header or a
Bearer token. Do not send both for one key.

**Claude Code**

```bash
claude mcp add --transport http pawabase https://YOUR-API/mcp/v1 --header "apikey: $PAWABASE_MCP_KEY"
```

The shell expands the variable, so the key is stored in Claude Code's MCP configuration: add it at user or local scope, not
in a committed project `.mcp.json`. Check with `claude mcp list` and `/mcp`.

**Codex** (`~/.codex/config.toml`, or a trusted project `.codex/config.toml`)

```toml
[mcp_servers.pawabase]
url = "https://YOUR-API/mcp/v1"
env_http_headers = { apikey = "PAWABASE_MCP_KEY" }   # or: bearer_token_env_var = "PAWABASE_MCP_KEY"
```

The key stays in the environment, not the file. Check with `codex mcp list` and `/mcp`.

**Cursor, VS Code and other `mcp.json` clients**

```json
{ "mcpServers": { "pawabase": { "url": "https://YOUR-API/mcp/v1", "headers": { "apikey": "${env:PAWABASE_MCP_KEY}" } } } }
```

Whatever the client, keep its approval prompt on for tools that are not read only, and always for production. Then ask for a
harmless read: "List the tables in development." A hosted connector that only offers OAuth cannot use Pawabase's API-key
endpoint on its own; use a client that supports custom headers or an approved credential proxy, never a weaker key or
disabled authentication.

#### Local stdio

For a client on the same trusted host as the runtime, launch `pawabase-server mcp` over stdio. It reads normal `PAWABASE_*` runtime settings and needs database/secrets access. This path has installation authority, not an environment-scoped remote key. Use an absolute executable path, a trusted working directory, and no terminal allocation. The runtime's `docs/mcp.md` has client and Docker examples.

### How tool calls behave

MCP tools call Pawabase's existing management API and retain its validation, scopes, migrations, quotas, and audit logging. Read tools/resources/prompts are also filtered by scope. Useful built-in prompts include `design_data_model`, `secure_resource`, `build_flow`, `investigate_errors`, `review_environment`, and `ship_changes`; available names can vary with runtime version.

Some high-impact tools require a `confirm` value, including deletes, write SQL, setting a secret, sending email, and non-dry-run promotion. That confirmation is a workflow pause, **not a hard permission boundary**: a client could supply it itself. Key scopes and the client's approval settings are the hard controls. `promote_environment` defaults to a dry run. For table work, define → inspect schema changes/migrate → use records. `create_resource` alone does not silently apply destructive schema changes. Prefer record tools for writes because direct SQL may miss normal events and realtime side effects.

Each tool call is audited as `mcp.tool` with tool name, environment, outcome, and argument names, not secret values. The underlying management change is audited too. A newly created API key is returned in plaintext once; secret values otherwise remain write-only.

### Verify the connection

If the key is already in a secure environment variable, a read-only handshake can confirm transport and auth:

```bash
curl --fail-with-body "$PAWABASE_URL/mcp/v1" \
  -H "apikey: $PAWABASE_MCP_KEY" \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}'
```

Then `tools/list` with another JSON-RPC `POST`. Do not send a real key to example endpoints or paste it into an issue. A `GET` probe returning `405` is expected and does not mean MCP is down.

| Symptom | Check |
| --- | --- |
| `401` / `403` | Secret key, expiry, management scopes, key route/IP restrictions, environment ownership. |
| `403 Origin` | Browser Origin must match the request host or configured public URLs; server-to-server clients usually omit Origin. |
| `404` | URL is `/mcp/v1`, deployment includes the server, and `PAWABASE_MCP_ENABLED` is on. |
| `405` on `GET` | Expected; configure Streamable HTTP `POST`, not legacy SSE. |
| Protocol-version error | Use a supported version/current client; runtime docs list `2024-11-05`, `2025-03-26`, `2025-06-18`. |
| Tool missing | Key lacks its management scope; inspect the scoped tool catalog. |
| `isError: true` | MCP connected, but the underlying management call failed; inspect the tool response. |
| Change not visible | Confirm client and Studio environment match; inspect pending resource migration. |

For runtime-specific details, read [Pawabase's MCP guide](https://github.com/Pawabase/pawabase/blob/main/docs/mcp.md) and the docs site's [`ai/mcp`](https://docs.pawabase.com/ai/mcp).

### Pawabase agent → external MCP server

In Studio, open **AI → Connections → Add a connection → Any MCP server**. Supply the external server's HTTPS URL and, if needed, a least-privilege credential. Choose **Check** to test the connection. Add it to the agent under **Add → An app**; for generic MCP servers, choose all tools or an explicit allowlist. Agent approval settings still govern actions that change external state. The connection secret is stored in that Pawabase environment and is excluded from exports/backups.

The runtime accepts bearer, custom-header, or basic authentication for outbound MCP connections. It checks the destination against outbound URL/private-host rules before connecting. A failed Check may mean bad URL, network policy, expired key, insufficient external scopes, or incompatible transport. Diagnose those separately from Pawabase agent permissions. See the docs site's [`ai/apps/overview`](https://docs.pawabase.com/ai/apps/overview) and [`ai/agents/tools`](https://docs.pawabase.com/ai/agents/tools).

---

## Environments, management, and diagnosis

An environment is a whole backend: rows, users, tables, policies, keys, secrets, buckets and files, auth and mail settings,
flows, agents and activity. Development, staging and production each have their own keys. Promotion moves definitions, never
data, users, keys or secrets. A client's key must belong to the environment it names.

### Three ways to change a backend

| Way | Good for | Notes |
| --- | --- | --- |
| **Studio** | Exploring, designing tables and policies, reading Activity | Every change is audited; schema changes show a migration preview |
| **Management clients** (secret key, server only) | Scripts, provisioning, CI checks | TypeScript `manage(client, env)` from `@pawabase/client/manage` and `admin(client, env)` from `@pawabase/client/admin`; Python `pb.manage.<area>` and `pb.admin.<area>`. `pb.manage.environment("staging")` re-binds to another environment the key may manage |
| **`pawabase-iac`** | Definitions reviewed in git | Python declarations; `pawabase validate` (offline), `emulate`, `plan` (reads the real environment), `deploy` (writes). See [platform lifecycle](#platform-lifecycle-setup-change-release-recovery) |

```python
pb = Pawabase(url, os.environ["PAWABASE_SECRET_KEY"], environment="staging")
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
- A secret key manages only its own environment (plus those it is explicitly allowed). `/studio` uses a Cloud-signed token and
  is not an app management endpoint.

### Diagnose by layer

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

Docs: [`environments/overview`](https://docs.pawabase.com/environments/overview), [`environments/promote`](https://docs.pawabase.com/environments/promote), [`tools/management-client`](https://docs.pawabase.com/tools/management-client), [`tools/admin-client`](https://docs.pawabase.com/tools/admin-client),
[`tools/iac/overview`](https://docs.pawabase.com/tools/iac/overview), [`activity/overview`](https://docs.pawabase.com/activity/overview), [`backups/overview`](https://docs.pawabase.com/backups/overview).

---

## Platform lifecycle: setup, change, release, recovery

### Pick the operating plane

Pawabase Cloud has organizations, projects, teams, plans, and hosted Studio. A project contains isolated environments. The self-hosted runtime is a `pawabase_server` process behind an edge gateway, with database and optional supporting infrastructure. Studio and Cloud account/billing administration are distinct from an environment's app API. Use Cloud docs for organization/project/billing actions and runtime/deployment docs for self-hosting. Do not pass a normal app key to `/studio`.

Each environment has its own database rows, users, file objects, definitions, keys, secrets, and settings. Copying a new environment or preview copies definitions and some settings, but not rows, files, users, secrets, or old keys. Previews have their own keys and expiry, and their public API reference is off by default in the checked docs. Seed only the data a test needs.

### Define and change a backend

Use Studio for interactive changes, or the separate `pawabase-iac` package for versioned definitions. The documented IaC workflow is `pawabase validate` (offline), `pawabase emulate` (simulated), `pawabase plan` (reads real environment), then `pawabase deploy` (writes). `merge` mode preserves unmanaged definitions; `override` can remove definitions absent from code. IaC does not yet manage all environment-level settings such as auth providers, API keys, domains, alarms, and backup schedules. Its command is `pawabase` (`init`, `validate`, `emulate`, `plan`, `deploy`, `whoami`); the Python client ships no command of its own.

A resource definition change can create a pending physical migration. Review the migration SQL and risk notes before applying. Auto-safe additions and destructive retypes/drops are different cases. For a required new field on a populated table, stage nullable/add, backfill, then enforce the requirement. For an external SQL change, inspect schema drift and any cache or change-capture effects.

### Release without breaking clients

Promote tested definitions from development through staging to production; this does not move rows, files, users, keys, or secrets. Use API versions when old and new clients need simultaneous contracts. `/rest/v1` remains the live v1; `/rest/v2` and later can serve different definitions over the **same physical tables and data**. A new version may add tables/columns/indexes but cannot rename, retype, or remove data structures that a live version uses. A version name is never reused. Check Activity traffic before retiring a version. Use a preview environment for PR or risky migration rehearsal.

### Back up and restore

Environment backups can contain definitions, settings, users/access, and rows, with selectable parts. They exclude raw API keys, secret values, stored file bytes, sessions, logs, and job history. Back up underlying object storage separately. A backup with users contains password hashes and needs private handling. A restore can merge or replace; replace deletes current state in selected parts, so inspect the target and save its current state first. Test recovery in a non-production environment before relying on it.

### Operate and recover

Use Activity, request ids, audit history, flow runs, jobs, webhook deliveries, mail logs, realtime connections, alarms, and status pages to determine scope and cause. Distinguish a broken request from asynchronous work that failed after the request returned. For an incident, identify affected environment/version, contain the failure (rollback definition, pause mail, disable schedule/webhook, or use maintenance mode when justified), fix the cause, then replay only the failed work whose side effects are safe to repeat. Check capacity and plan limits before attributing `429` to an application bug.

Read [`cloud/overview`](https://docs.pawabase.com/cloud/overview), [`environments/overview`](https://docs.pawabase.com/environments/overview), [`environments/previews`](https://docs.pawabase.com/environments/previews), [`environments/promote`](https://docs.pawabase.com/environments/promote), [`environments/api-versions`](https://docs.pawabase.com/environments/api-versions), [`tools/iac/overview`](https://docs.pawabase.com/tools/iac/overview), [`tools/iac/plan-and-deploy`](https://docs.pawabase.com/tools/iac/plan-and-deploy), [`backups/overview`](https://docs.pawabase.com/backups/overview), [`backups/restore`](https://docs.pawabase.com/backups/restore), [`guides/production-checklist`](https://docs.pawabase.com/guides/production-checklist), and [`activity/overview`](https://docs.pawabase.com/activity/overview) in the docs repo. For self-hosting, read the runtime repository's `ARCHITECTURE.md`, `deploy/README.md`, and deployment-specific configuration before changing infrastructure.

---

## Capability boundaries

Use this when an example seems to contradict the installed package, or the user asks whether something is possible at all. The
rows come from the runtime's feature inventory (**Explicit boundaries and non-features**) and the checked client sources in the
[source map](#source-compatibility-and-verification). Confirm on the target environment before treating a row as permanent.

| Area | Boundary | What to do instead |
| --- | --- | --- |
| Functions | Pawabase does not run uploaded functions; the old function kits are gone. | Flows, custom routes, events, schedules and jobs. Code that must run elsewhere is your own service calling the API with a machine identity. |
| Database | Pawabase runs on PostgreSQL only. | Do not plan for MySQL or SQLite. Use Postgres features (full-text search, `pgvector` fields) freely. |
| Search | Ranked Postgres full-text search on a table's search fields. No typo tolerance, highlight snippets or external search engine. | Design the UI for exact-word matching; use `similar` on a vector field for meaning-based search. |
| Clients | Older packages (`@pawabase/client` below 0.7, Python `pawabase` below 0.9) lack live queries, AI agents and knowledge, captcha, machine identities and, in Python, most namespaces. | Upgrade the package. If you cannot, make a raw request to an endpoint you confirmed in the environment's OpenAPI. |
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

### Before recommending a path

1. Confirm the feature in the target environment or its OpenAPI, not only on a docs page.
2. Confirm the installed package has the method. If not, use a raw request only once the endpoint and auth are confirmed.
3. Say whether it is self-hosted or Cloud, preview or stable, and which version you checked.
4. For migrations, bulk replays, restores and key rotations, inspect the plan or backup and the actual target first.

Recheck this list when the runtime's feature inventory or a client major version changes.

---

## Troubleshooting by symptom

Start with the exact project, environment, API version, request id, actor/key type, operation, status/code, and time. Reproduce with a real caller in Studio's API Explorer when possible; a secret key bypasses policies and can hide the cause. Keep network, edge, auth, policy, data, and background work as separate layers.

| Symptom | First checks | Next evidence |
| --- | --- | --- |
| Browser request blocked before response | Gateway URL, allowed origin/CORS, key route/IP/origin restrictions | Browser network panel and edge request log |
| `401` | `apikey`, correct environment, expired/revoked key, bearer token/session, wrong auth grant | [`reference/errors`](https://docs.pawabase.com/reference/errors), auth activity |
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

For a user-visible error, keep the request id and avoid leaking hidden-record existence, secret values, or full tokens. If the failure is asynchronous, follow the event → subscription → flow/job → webhook/mail chain rather than assuming the initiating HTTP call failed. Read the topic's troubleshooting page and [`activity/requests`](https://docs.pawabase.com/activity/requests), [`activity/background-work`](https://docs.pawabase.com/activity/background-work), [`policies/debugging`](https://docs.pawabase.com/policies/debugging), or [`guides/production-checklist`](https://docs.pawabase.com/guides/production-checklist) in the docs repo as appropriate.

---

## Scenario map

Use this when a request spans several Pawabase areas or uses product language rather than API names. The paths are in the [Pawabase docs repository](https://github.com/Pawabase/pawabase-docs). Read the relevant local reference as well, then verify the installed client and target environment. A documented scenario may require a newer SDK or a feature flag.

### Getting started and application shape

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Build a signed-in app | [`guides/signed-in-app`](https://docs.pawabase.com/guides/signed-in-app) | Resource policies must match user identity. |
| Add a React app | [`quickstarts/react`](https://docs.pawabase.com/quickstarts/react), [`auth/react`](https://docs.pawabase.com/auth/react) | One client/session; SSR must use per-request user tokens. |
| Add a Node backend | [`quickstarts/node`](https://docs.pawabase.com/quickstarts/node) | Choose user-scoped versus service credentials per request. |
| Add a Python service | [`quickstarts/python`](https://docs.pawabase.com/quickstarts/python) | `pawabase` 0.9+: async client for channels and live queries. |
| Connect an AI coding tool | [`ai/mcp`](https://docs.pawabase.com/ai/mcp) | Scope its environment key; distinguish read and build authority. |
| Give a Pawabase agent external MCP tools | [`ai/apps/overview`](https://docs.pawabase.com/ai/apps/overview), [`ai/agents/tools`](https://docs.pawabase.com/ai/agents/tools) | Outbound connection secret and agent tool allowlist are separate from Pawabase's inbound MCP key. |
| Work across dev/staging/prod | [`guides/environments-workflow`](https://docs.pawabase.com/guides/environments-workflow) | Definitions promote; data, users, keys and secrets stay separate. |
| Create a PR preview backend | [`environments/previews`](https://docs.pawabase.com/environments/previews) | Preview starts without rows, files, users or secrets. |

### Identity and authorization

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Email/password or verification | [`auth/email-and-password`](https://docs.pawabase.com/auth/email-and-password), [`auth/email-verification`](https://docs.pawabase.com/auth/email-verification) | Handle verification-required and redirect allowlists. |
| Magic links or email codes | [`auth/sign-in-links`](https://docs.pawabase.com/auth/sign-in-links), [`auth/email-codes`](https://docs.pawabase.com/auth/email-codes) | Use the flow the environment enabled. |
| OAuth or company SSO | [`auth/social-sign-in`](https://docs.pawabase.com/auth/social-sign-in), [`auth/enterprise-sign-in`](https://docs.pawabase.com/auth/enterprise-sign-in), [`auth/enterprise-connections`](https://docs.pawabase.com/auth/enterprise-connections) | Provider credentials and return URLs are per environment; company connections belong to an organization and route by verified domain. |
| Passkeys or MFA | [`auth/passkeys`](https://docs.pawabase.com/auth/passkeys), [`auth/two-step-verification`](https://docs.pawabase.com/auth/two-step-verification) | Handle second-factor/assurance state, not just initial login. |
| Guest cart that survives signup | [`auth/guests`](https://docs.pawabase.com/auth/guests) | Upgrade the guest identity rather than creating an unrelated user. |
| Teams, invitations, org data | [`auth/organizations`](https://docs.pawabase.com/auth/organizations), [`guides/organizations`](https://docs.pawabase.com/guides/organizations) | Bind rows and policies to the active organization. |
| Service or AI-agent identity | [`auth/machines`](https://docs.pawabase.com/auth/machines) | A machine acts as itself; a user API key acts as a person. |
| Third-party user token | [`auth/token-profiles`](https://docs.pawabase.com/auth/token-profiles) | Receiving service verifies JWKS, audience, issuer and expiry. |
| Password recovery or device/session revoke | [`auth/account-recovery`](https://docs.pawabase.com/auth/account-recovery), [`auth/sessions`](https://docs.pawabase.com/auth/sessions), [`auth/devices`](https://docs.pawabase.com/auth/devices) | Separate current-session and global revocation. |
| Auth abuse or bot protection | [`auth/attack-protection`](https://docs.pawabase.com/auth/attack-protection), [`auth/protect-your-forms`](https://docs.pawabase.com/auth/protect-your-forms) | Keep server-side limits and checks. |
| Define or debug a rule | [`policies/quickstart`](https://docs.pawabase.com/policies/quickstart), [`policies/debugging`](https://docs.pawabase.com/policies/debugging) | Test anonymous, owner, unrelated user, and secret key separately. |

### Data and files

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Create a table/API | [`database/tables-and-resources`](https://docs.pawabase.com/database/tables-and-resources) | Definition, physical table, and enabled operations are separate. |
| Use existing SQL tables | [`database/tables-and-resources`](https://docs.pawabase.com/database/tables-and-resources) | Expose a resource and review schema drift. |
| Query, sort, page, search | [`database/read`](https://docs.pawabase.com/database/read), [`database/filter`](https://docs.pawabase.com/database/filter) | Per-row rules can make `total` null. |
| Relations or many-to-many | [`database/relations`](https://docs.pawabase.com/database/relations), [`database/patterns`](https://docs.pawabase.com/database/patterns) | Expanded targets have their own read rules. |
| Bulk import or all-or-nothing write | [`database/bulk-writes`](https://docs.pawabase.com/database/bulk-writes) | Client batches are not transactions. |
| Migrate/rename/type change | [`database/migrations-and-history`](https://docs.pawabase.com/database/migrations-and-history) | Review plan; additions and destructive changes differ. |
| Multiple API versions | [`environments/api-versions`](https://docs.pawabase.com/environments/api-versions) | Versions share physical tables/data. |
| Per-user or per-org data | [`database/patterns`](https://docs.pawabase.com/database/patterns), [`database/ids-and-timestamps`](https://docs.pawabase.com/database/ids-and-timestamps) | Ownership field and operation policies must agree. |
| Cache a resource | [`database/caching-and-rate-limits`](https://docs.pawabase.com/database/caching-and-rate-limits) | External DB writes do not clear Pawabase response cache. |
| Import/export/seed | [`database/import-and-export`](https://docs.pawabase.com/database/import-and-export) | Rows do not move with environment promotion. |
| Private file or avatar | [`guides/private-files`](https://docs.pawabase.com/guides/private-files), [`storage/access`](https://docs.pawabase.com/storage/access) | Design object keys around the access rule. |
| Public, signed, or shared URL | [`storage/urls-and-links`](https://docs.pawabase.com/storage/urls-and-links), [`storage/share-links`](https://docs.pawabase.com/storage/share-links) | Each URL has different authority and lifetime. |
| Large upload or image transform | [`storage/upload`](https://docs.pawabase.com/storage/upload), [`storage/images`](https://docs.pawabase.com/storage/images) | Check bucket limits, signed upload, and transforms. |
| File linked to a record | [`storage/files-and-records`](https://docs.pawabase.com/storage/files-and-records) | Store the key; plan separate deletion/restore behavior. |

### Live and asynchronous behavior

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Chat, typing, presence | [`realtime/channels`](https://docs.pawabase.com/realtime/channels), [`realtime/presence`](https://docs.pawabase.com/realtime/presence) | Channel rules separate subscribe/publish; history is bounded. |
| A live list | [`realtime/record-changes`](https://docs.pawabase.com/realtime/record-changes) | Merge by id and refetch after a gap. |
| Live filtered query | [`realtime/record-changes`](https://docs.pawabase.com/realtime/record-changes) | Docs describe live queries; verify SDK/deployment support. |
| Listen-only server/dashboard | [`realtime/connection`](https://docs.pawabase.com/realtime/connection) | SSE listens; HTTP publishes. |
| Reconnect and catch-up | [`realtime/history`](https://docs.pawabase.com/realtime/history) | Replay cannot recover beyond retained history. |
| Email after record change | [`guides/event-driven-workflow`](https://docs.pawabase.com/guides/event-driven-workflow) | Event subscription/flow; idempotent side effect. |
| Business action with a result | [`logic/flows`](https://docs.pawabase.com/logic/flows), [`logic/routes`](https://docs.pawabase.com/logic/routes) | Named flow versus path-bound route. |
| Nightly cleanup/digest | [`automation/schedules`](https://docs.pawabase.com/automation/schedules) | Set overlap and catch-up behavior. |
| Receive/send webhooks | [`automation/inbound-hooks`](https://docs.pawabase.com/automation/inbound-hooks), [`automation/webhook-signatures`](https://docs.pawabase.com/automation/webhook-signatures) | Verify inbound signatures and deduplicate deliveries. |
| Retry failed work | [`automation/reliability`](https://docs.pawabase.com/automation/reliability), [`automation/jobs`](https://docs.pawabase.com/automation/jobs) | Diagnose before replay; duplicate effects are possible. |
| Send branded mail | [`mail/templates`](https://docs.pawabase.com/mail/templates), [`mail/deliverability`](https://docs.pawabase.com/mail/deliverability) | Template, provider, DNS, and log are separate layers. |

### AI and operations

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Chat or embeddings | [`ai/gateway`](https://docs.pawabase.com/ai/gateway), [`ai/use-it`](https://docs.pawabase.com/ai/use-it) | Use a named model and server-held provider key. |
| Semantic search | [`ai/vector-search`](https://docs.pawabase.com/ai/vector-search) | Configure vector field/index and list policy. |
| Agent using project data | [`ai/agents/overview`](https://docs.pawabase.com/ai/agents/overview), [`ai/agents/approvals-and-limits`](https://docs.pawabase.com/ai/agents/approvals-and-limits) | Caller authority, approvals, and cost limits. |
| Q&A over documents | [`ai/knowledge/overview`](https://docs.pawabase.com/ai/knowledge/overview) | Ingest and search under knowledge rules. |
| Versioned backend definitions | [`tools/iac/overview`](https://docs.pawabase.com/tools/iac/overview) | `pawabase-iac` is a separate package from the Python client. |
| Secret/key rotation | [`environments/api-keys`](https://docs.pawabase.com/environments/api-keys), [`secrets/overview`](https://docs.pawabase.com/secrets/overview) | Replacement and revocation order affect running clients. |
| Backup/restore | [`backups/overview`](https://docs.pawabase.com/backups/overview), [`backups/restore`](https://docs.pawabase.com/backups/restore) | Object bytes, raw keys and secret values are excluded. |
| Deploy/release/rollback | [`environments/promote`](https://docs.pawabase.com/environments/promote), [`environments/api-versions`](https://docs.pawabase.com/environments/api-versions) | Promote definitions; inspect compatibility and active traffic. |
| Production incident | [`guides/production-checklist`](https://docs.pawabase.com/guides/production-checklist), [`activity/overview`](https://docs.pawabase.com/activity/overview) | Trace request id, scope impact, recover failed work separately. |
| Project limits or Cloud account | [`cloud/plans-and-limits`](https://docs.pawabase.com/cloud/plans-and-limits), [`cloud/overview`](https://docs.pawabase.com/cloud/overview) | Installation/project plan and Cloud account are separate. |
| Self-host runtime | Runtime `ARCHITECTURE.md`, `deploy/README.md` | Verify topology and dependencies in the actual deployment. |

If no row fits, search by the user's concrete noun and action in the docs repository, then inspect `PAWABASE_FEATURE_INVENTORY.md` for feature status and implementation paths. Do not invent an endpoint or SDK wrapper to fill a gap.

---

## Source, compatibility, and verification

This skill is a guide, not a copy of the Pawabase docs. Product docs, package releases and a deployed server move at different
speeds. When something matters, resolve it in this order:

1. **The target environment.** Its own OpenAPI in Studio → API Explorer, its settings, and a real request. Table fields,
   enabled operations and policies differ per environment.
2. **The installed client.** Its version, exported types or module members, and its source.
3. **The product docs.** The [docs repository](https://github.com/Pawabase/pawabase-docs), starting from the topic table below.
4. **The server source.** The [runtime repository](https://github.com/Pawabase/pawabase), for behaviour the contract does not
   spell out.

Never promote a docs example to a client guarantee. When sources disagree, name the version or environment you checked and say
what you verified.

### Verified baseline

| Package or source | Checked | What it means |
| --- | --- | --- |
| `@pawabase/client` | `0.7.0` source | Records, auth with MFA, passkeys, SSO and organizations, storage with share links and transforms, realtime channels and `realtime.live`, flows, routes, AI models, agents and knowledge, captcha, `asUser`, `asMachine`. Management in `@pawabase/client/manage` and `@pawabase/client/admin`. `pawabase-types` CLI for generated types. |
| Python `pawabase` | `0.9.0` source | The same areas in snake_case: `pb.from_`, `pb.auth`, `pb.storage`, `pb.realtime` (channels and live queries on `AsyncPawabase`), `pb.flows.invoke`, `pb.routes`, `pb.ai`, `pb.captcha`, `pb.manage`, `pb.admin`, `as_user`, `as_machine`. No function kit and no CLI. |
| `pawabase-iac` | `0.2.4` source | A separate package for definitions as Python code. Its CLI is also called `pawabase`: `init`, `validate`, `emulate`, `plan`, `deploy`, `whoami`. |
| Public OpenAPI | `pawabase-docs/openapi/public.json` | 78 public paths. It leaves out each environment's own table schema and the management surface; use the environment's API Explorer for those. |
| Product docs | `pawabase-docs` at `e446b6a` | The pages the [docs catalog](#pawabase-docs-catalog) lists. |

Check the installed versions before relying on a row:

```bash
node -p "require('@pawabase/client/package.json').version"
python3 -c 'import pawabase; print(pawabase.__version__)'
python3 -c 'import pawabase_iac; print(pawabase_iac.__version__)'
```

For TypeScript, read the declarations under `node_modules/@pawabase/client/dist`. For Python, `help()` on the object. A
`pawabase` command on the path belongs to `pawabase-iac`: check with `command -v pawabase` and `pawabase --help`.

`/mcp/v1` is not in the generated OpenAPI. Its contract is the runtime's `docs/mcp.md` and `pawabase_server/mcp/`, and the tool
list a client sees is filtered by the connected key's scope.

### Topic locator

Paths are relative to the [docs repository](https://github.com/Pawabase/pawabase-docs):

| Topic | Start with |
| --- | --- |
| Product model | [`concepts/how-pawabase-fits-together`](https://docs.pawabase.com/concepts/how-pawabase-fits-together) |
| TypeScript and Python | [`quickstarts/javascript`](https://docs.pawabase.com/quickstarts/javascript), [`quickstarts/node`](https://docs.pawabase.com/quickstarts/node), [`quickstarts/react`](https://docs.pawabase.com/quickstarts/react), [`quickstarts/python`](https://docs.pawabase.com/quickstarts/python) |
| Data API | [`database/how-data-works`](https://docs.pawabase.com/database/how-data-works), [`database/rest-api`](https://docs.pawabase.com/database/rest-api), [`database/relations`](https://docs.pawabase.com/database/relations) |
| Access and auth | [`reference/keys-and-security`](https://docs.pawabase.com/reference/keys-and-security), [`policies/how-rules-work`](https://docs.pawabase.com/policies/how-rules-work), [`auth/how-auth-works`](https://docs.pawabase.com/auth/how-auth-works) |
| Organizations and company sign-in | [`auth/organizations`](https://docs.pawabase.com/auth/organizations), [`auth/enterprise-sign-in`](https://docs.pawabase.com/auth/enterprise-sign-in), [`auth/enterprise-connections`](https://docs.pawabase.com/auth/enterprise-connections), [`auth/machines`](https://docs.pawabase.com/auth/machines) |
| Realtime | [`realtime/channels`](https://docs.pawabase.com/realtime/channels), [`realtime/record-changes`](https://docs.pawabase.com/realtime/record-changes), [`realtime/connection`](https://docs.pawabase.com/realtime/connection) |
| Storage | [`storage/upload`](https://docs.pawabase.com/storage/upload), [`storage/urls-and-links`](https://docs.pawabase.com/storage/urls-and-links), [`storage/access`](https://docs.pawabase.com/storage/access) |
| Logic and automation | [`logic/flows`](https://docs.pawabase.com/logic/flows), [`automation/overview`](https://docs.pawabase.com/automation/overview), [`automation/reliability`](https://docs.pawabase.com/automation/reliability) |
| AI | [`ai/overview`](https://docs.pawabase.com/ai/overview), [`ai/gateway`](https://docs.pawabase.com/ai/gateway), [`ai/agents/overview`](https://docs.pawabase.com/ai/agents/overview) |
| MCP and agent connections | [`ai/mcp`](https://docs.pawabase.com/ai/mcp), [`ai/apps/overview`](https://docs.pawabase.com/ai/apps/overview), and the runtime's `docs/mcp.md` |
| Operations | [`environments/overview`](https://docs.pawabase.com/environments/overview), [`tools/iac/overview`](https://docs.pawabase.com/tools/iac/overview), [`activity/overview`](https://docs.pawabase.com/activity/overview) |
| Cloud, release, recovery | [`cloud/overview`](https://docs.pawabase.com/cloud/overview), [`environments/api-versions`](https://docs.pawabase.com/environments/api-versions), [`backups/overview`](https://docs.pawabase.com/backups/overview), [`guides/production-checklist`](https://docs.pawabase.com/guides/production-checklist) |

For work on the server itself, `ARCHITECTURE.md` and `PAWABASE_FEATURE_INVENTORY.md` (its implementation map) in the runtime
repository point to the code; behaviour lives in `pawabase_server/` and its tests. Client sources:
[TypeScript](https://github.com/Pawabase/pawabase-js) and [Python](https://github.com/Pawabase/pawabase-python).

---

## Pawabase docs catalog

Generated from the docs checkout at commit `e446b6a`. Use this only to find a page; the target deployment and installed SDK remain the contract. Paths are relative to [Pawabase docs](https://github.com/Pawabase/pawabase-docs).

### activity

- [`activity/alarms`](https://docs.pawabase.com/activity/alarms) — Logs, metrics and alarms
- [`activity/audit-log`](https://docs.pawabase.com/activity/audit-log) — Audit log
- [`activity/background-work`](https://docs.pawabase.com/activity/background-work) — Flow runs, jobs, events and messages
- [`activity/overview`](https://docs.pawabase.com/activity/overview) — Activity
- [`activity/requests`](https://docs.pawabase.com/activity/requests) — Requests, routes and traces
- [`activity/status-page`](https://docs.pawabase.com/activity/status-page) — Status page

### ai

- [`ai/agents/approvals-and-limits`](https://docs.pawabase.com/ai/agents/approvals-and-limits) — Approvals and limits
- [`ai/agents/create`](https://docs.pawabase.com/ai/agents/create) — Create an agent
- [`ai/agents/overview`](https://docs.pawabase.com/ai/agents/overview) — Agents
- [`ai/agents/run-from-app`](https://docs.pawabase.com/ai/agents/run-from-app) — Run an agent from your app
- [`ai/agents/runs`](https://docs.pawabase.com/ai/agents/runs) — Runs and history
- [`ai/agents/tools`](https://docs.pawabase.com/ai/agents/tools) — Tools
- [`ai/apps/overview`](https://docs.pawabase.com/ai/apps/overview) — Connections
- [`ai/embeddings`](https://docs.pawabase.com/ai/embeddings) — Embeddings
- [`ai/flows`](https://docs.pawabase.com/ai/flows) — AI in flows
- [`ai/gateway`](https://docs.pawabase.com/ai/gateway) — Providers and models
- [`ai/knowledge/documents`](https://docs.pawabase.com/ai/knowledge/documents) — Add documents and search
- [`ai/knowledge/overview`](https://docs.pawabase.com/ai/knowledge/overview) — Knowledge bases
- [`ai/mcp`](https://docs.pawabase.com/ai/mcp) — Use your AI tools with Pawabase
- [`ai/overview`](https://docs.pawabase.com/ai/overview) — AI in your app
- [`ai/patterns`](https://docs.pawabase.com/ai/patterns) — Patterns
- [`ai/pgvector`](https://docs.pawabase.com/ai/pgvector) — When vector search is unavailable
- [`ai/troubleshooting`](https://docs.pawabase.com/ai/troubleshooting) — Troubleshooting AI
- [`ai/use-it`](https://docs.pawabase.com/ai/use-it) — Chat and streaming
- [`ai/vector-search`](https://docs.pawabase.com/ai/vector-search) — Vector search

### auth

- [`auth/account-recovery`](https://docs.pawabase.com/auth/account-recovery) — Account recovery
- [`auth/attack-protection`](https://docs.pawabase.com/auth/attack-protection) — Attack protection
- [`auth/auth-webhooks`](https://docs.pawabase.com/auth/auth-webhooks) — Auth webhooks
- [`auth/authentication-flow`](https://docs.pawabase.com/auth/authentication-flow) — Authentication flow
- [`auth/bot-protection`](https://docs.pawabase.com/auth/bot-protection) — Bot protection
- [`auth/configuring-auth`](https://docs.pawabase.com/auth/configuring-auth) — Configuring Auth
- [`auth/data-requests`](https://docs.pawabase.com/auth/data-requests) — Data requests
- [`auth/devices`](https://docs.pawabase.com/auth/devices) — Devices
- [`auth/email-and-password`](https://docs.pawabase.com/auth/email-and-password) — Email and password
- [`auth/email-codes`](https://docs.pawabase.com/auth/email-codes) — Email codes
- [`auth/email-templates`](https://docs.pawabase.com/auth/email-templates) — Email templates
- [`auth/email-verification`](https://docs.pawabase.com/auth/email-verification) — Email verification
- [`auth/enterprise-connections`](https://docs.pawabase.com/auth/enterprise-connections) — Connections
- [`auth/enterprise-roles-and-access`](https://docs.pawabase.com/auth/enterprise-roles-and-access) — Roles and access
- [`auth/enterprise-sign-in`](https://docs.pawabase.com/auth/enterprise-sign-in) — Enterprise sign-in
- [`auth/guests`](https://docs.pawabase.com/auth/guests) — Guests
- [`auth/how-auth-works`](https://docs.pawabase.com/auth/how-auth-works) — How Auth works
- [`auth/import-and-export`](https://docs.pawabase.com/auth/import-and-export) — Import and export
- [`auth/invitations`](https://docs.pawabase.com/auth/invitations) — Invitations
- [`auth/linked-accounts`](https://docs.pawabase.com/auth/linked-accounts) — Linked accounts
- [`auth/machines`](https://docs.pawabase.com/auth/machines) — Machines and AI agents
- [`auth/organizations`](https://docs.pawabase.com/auth/organizations) — Organizations
- [`auth/overview`](https://docs.pawabase.com/auth/overview) — Auth
- [`auth/passkeys`](https://docs.pawabase.com/auth/passkeys) — Passkeys
- [`auth/password-policy`](https://docs.pawabase.com/auth/password-policy) — Password policy
- [`auth/protect-your-forms`](https://docs.pawabase.com/auth/protect-your-forms) — Protect your forms
- [`auth/react`](https://docs.pawabase.com/auth/react) — Auth in React
- [`auth/redirect-urls`](https://docs.pawabase.com/auth/redirect-urls) — Redirect URLs
- [`auth/roles`](https://docs.pawabase.com/auth/roles) — Roles
- [`auth/sessions`](https://docs.pawabase.com/auth/sessions) — Sessions
- [`auth/sign-in-activity`](https://docs.pawabase.com/auth/sign-in-activity) — Sign-in activity
- [`auth/sign-in-links`](https://docs.pawabase.com/auth/sign-in-links) — Sign-in links
- [`auth/sign-up-form-and-attributes`](https://docs.pawabase.com/auth/sign-up-form-and-attributes) — Sign-up form and attributes
- [`auth/sign-up-restrictions`](https://docs.pawabase.com/auth/sign-up-restrictions) — Sign-up restrictions
- [`auth/social-sign-in`](https://docs.pawabase.com/auth/social-sign-in) — Social sign-in
- [`auth/token-profiles`](https://docs.pawabase.com/auth/token-profiles) — Token profiles
- [`auth/two-step-verification`](https://docs.pawabase.com/auth/two-step-verification) — Two-step verification
- [`auth/user-api-keys`](https://docs.pawabase.com/auth/user-api-keys) — User API keys
- [`auth/user-profile`](https://docs.pawabase.com/auth/user-profile) — The user profile
- [`auth/users`](https://docs.pawabase.com/auth/users) — Users

### automation

- [`automation/event-catalogue`](https://docs.pawabase.com/automation/event-catalogue) — Event catalogue
- [`automation/events`](https://docs.pawabase.com/automation/events) — Events and subscriptions
- [`automation/flow-editor`](https://docs.pawabase.com/automation/flow-editor) — The flow editor
- [`automation/inbound-hooks`](https://docs.pawabase.com/automation/inbound-hooks) — Inbound hooks
- [`automation/jobs`](https://docs.pawabase.com/automation/jobs) — Background jobs
- [`automation/overview`](https://docs.pawabase.com/automation/overview) — Automation
- [`automation/reliability`](https://docs.pawabase.com/automation/reliability) — Reliability and failures
- [`automation/schedules`](https://docs.pawabase.com/automation/schedules) — Schedules
- [`automation/webhook-deliveries`](https://docs.pawabase.com/automation/webhook-deliveries) — Webhook deliveries
- [`automation/webhook-signatures`](https://docs.pawabase.com/automation/webhook-signatures) — Verify webhook signatures
- [`automation/webhooks`](https://docs.pawabase.com/automation/webhooks) — Webhooks

### backups

- [`backups/automatic`](https://docs.pawabase.com/backups/automatic) — Automatic backups
- [`backups/overview`](https://docs.pawabase.com/backups/overview) — Backups
- [`backups/restore`](https://docs.pawabase.com/backups/restore) — Restore

### cloud

- [`cloud/billing`](https://docs.pawabase.com/cloud/billing) — Billing
- [`cloud/overview`](https://docs.pawabase.com/cloud/overview) — Pawabase Cloud
- [`cloud/plans-and-limits`](https://docs.pawabase.com/cloud/plans-and-limits) — Plans and limits
- [`cloud/team`](https://docs.pawabase.com/cloud/team) — Team

### concepts

- [`concepts/how-pawabase-fits-together`](https://docs.pawabase.com/concepts/how-pawabase-fits-together) — How Pawabase fits together
- [`concepts/studio-tour`](https://docs.pawabase.com/concepts/studio-tour) — A tour of Studio

### database

- [`database/access`](https://docs.pawabase.com/database/access) — Access
- [`database/api-explorer`](https://docs.pawabase.com/database/api-explorer) — API Explorer
- [`database/bulk-writes`](https://docs.pawabase.com/database/bulk-writes) — Bulk writes
- [`database/caching-and-rate-limits`](https://docs.pawabase.com/database/caching-and-rate-limits) — Caching and rate limits
- [`database/columns-and-types`](https://docs.pawabase.com/database/columns-and-types) — Columns and types
- [`database/events-and-realtime`](https://docs.pawabase.com/database/events-and-realtime) — Events and realtime
- [`database/filter`](https://docs.pawabase.com/database/filter) — Filter
- [`database/how-data-works`](https://docs.pawabase.com/database/how-data-works) — How data works
- [`database/ids-and-timestamps`](https://docs.pawabase.com/database/ids-and-timestamps) — Ids and timestamps
- [`database/import-and-export`](https://docs.pawabase.com/database/import-and-export) — Import and export
- [`database/indexes`](https://docs.pawabase.com/database/indexes) — Indexes
- [`database/migrations-and-history`](https://docs.pawabase.com/database/migrations-and-history) — Migrations and history
- [`database/overview`](https://docs.pawabase.com/database/overview) — Database
- [`database/patterns`](https://docs.pawabase.com/database/patterns) — Patterns
- [`database/quickstart`](https://docs.pawabase.com/database/quickstart) — Quickstart
- [`database/read`](https://docs.pawabase.com/database/read) — Read records
- [`database/relations`](https://docs.pawabase.com/database/relations) — Relations
- [`database/rest-api`](https://docs.pawabase.com/database/rest-api) — Data API over HTTP
- [`database/schemas`](https://docs.pawabase.com/database/schemas) — Schemas
- [`database/sort-and-page`](https://docs.pawabase.com/database/sort-and-page) — Sort and page
- [`database/sql-editor`](https://docs.pawabase.com/database/sql-editor) — SQL editor
- [`database/table-editor`](https://docs.pawabase.com/database/table-editor) — The table editor
- [`database/table-settings`](https://docs.pawabase.com/database/table-settings) — Table settings
- [`database/tables-and-resources`](https://docs.pawabase.com/database/tables-and-resources) — Tables and resources
- [`database/topology`](https://docs.pawabase.com/database/topology) — Topology
- [`database/troubleshooting`](https://docs.pawabase.com/database/troubleshooting) — Troubleshooting
- [`database/typescript-types`](https://docs.pawabase.com/database/typescript-types) — TypeScript types
- [`database/write`](https://docs.pawabase.com/database/write) — Write records

### environments

- [`environments/api-keys`](https://docs.pawabase.com/environments/api-keys) — API keys
- [`environments/api-versions`](https://docs.pawabase.com/environments/api-versions) — API versions
- [`environments/custom-domains`](https://docs.pawabase.com/environments/custom-domains) — Custom domains
- [`environments/overview`](https://docs.pawabase.com/environments/overview) — Environments
- [`environments/previews`](https://docs.pawabase.com/environments/previews) — Previews
- [`environments/promote`](https://docs.pawabase.com/environments/promote) — Promote
- [`environments/settings`](https://docs.pawabase.com/environments/settings) — Environment settings

### guides

- [`guides/agent-with-permissions`](https://docs.pawabase.com/guides/agent-with-permissions) — An agent that respects permissions
- [`guides/environments-workflow`](https://docs.pawabase.com/guides/environments-workflow) — From development to production
- [`guides/event-driven-workflow`](https://docs.pawabase.com/guides/event-driven-workflow) — An event-driven workflow
- [`guides/organizations`](https://docs.pawabase.com/guides/organizations) — Teams and organizations
- [`guides/overview`](https://docs.pawabase.com/guides/overview) — Guides
- [`guides/private-files`](https://docs.pawabase.com/guides/private-files) — Private files
- [`guides/production-checklist`](https://docs.pawabase.com/guides/production-checklist) — Production readiness
- [`guides/realtime-chat`](https://docs.pawabase.com/guides/realtime-chat) — A realtime chat
- [`guides/scheduled-jobs`](https://docs.pawabase.com/guides/scheduled-jobs) — Scheduled jobs
- [`guides/signed-in-app`](https://docs.pawabase.com/guides/signed-in-app) — Build an app with signed-in users

### logic

- [`logic/blocks/ai`](https://docs.pawabase.com/logic/blocks/ai) — AI
- [`logic/blocks/auth`](https://docs.pawabase.com/logic/blocks/auth) — Auth and rules
- [`logic/blocks/control`](https://docs.pawabase.com/logic/blocks/control) — Control flow
- [`logic/blocks/data`](https://docs.pawabase.com/logic/blocks/data) — Data and transforms
- [`logic/blocks/flows`](https://docs.pawabase.com/logic/blocks/flows) — Flows, jobs and responses
- [`logic/blocks/integrations`](https://docs.pawabase.com/logic/blocks/integrations) — Integrations and messages
- [`logic/blocks/overview`](https://docs.pawabase.com/logic/blocks/overview) — Block reference
- [`logic/blocks/resources`](https://docs.pawabase.com/logic/blocks/resources) — Records
- [`logic/blocks/storage-cache`](https://docs.pawabase.com/logic/blocks/storage-cache) — Files and cache
- [`logic/blocks/triggers`](https://docs.pawabase.com/logic/blocks/triggers) — Triggers
- [`logic/flows`](https://docs.pawabase.com/logic/flows) — Flows
- [`logic/overview`](https://docs.pawabase.com/logic/overview) — Server logic
- [`logic/patterns`](https://docs.pawabase.com/logic/patterns) — Patterns
- [`logic/routes`](https://docs.pawabase.com/logic/routes) — Routes

### mail

- [`mail/activity`](https://docs.pawabase.com/mail/activity) — Mail activity
- [`mail/brand-kit`](https://docs.pawabase.com/mail/brand-kit) — Brand kit
- [`mail/deliverability`](https://docs.pawabase.com/mail/deliverability) — Deliverability
- [`mail/delivery`](https://docs.pawabase.com/mail/delivery) — Delivery
- [`mail/overview`](https://docs.pawabase.com/mail/overview) — Mail
- [`mail/sending`](https://docs.pawabase.com/mail/sending) — Sending email
- [`mail/template-language`](https://docs.pawabase.com/mail/template-language) — Template language
- [`mail/templates`](https://docs.pawabase.com/mail/templates) — Templates
- [`mail/troubleshooting`](https://docs.pawabase.com/mail/troubleshooting) — Mail troubleshooting

### policies

- [`policies/api-keys-and-scopes`](https://docs.pawabase.com/policies/api-keys-and-scopes) — API keys and scopes
- [`policies/code-rules`](https://docs.pawabase.com/policies/code-rules) — Rules that need more data
- [`policies/combining`](https://docs.pawabase.com/policies/combining) — Combining rules
- [`policies/common-mistakes`](https://docs.pawabase.com/policies/common-mistakes) — Common mistakes
- [`policies/condition-builder`](https://docs.pawabase.com/policies/condition-builder) — The condition builder
- [`policies/context`](https://docs.pawabase.com/policies/context) — Facts a rule can read
- [`policies/debugging`](https://docs.pawabase.com/policies/debugging) — Debugging rules
- [`policies/events`](https://docs.pawabase.com/policies/events) — Rules on events
- [`policies/how-rules-are-evaluated`](https://docs.pawabase.com/policies/how-rules-are-evaluated) — How rules are evaluated
- [`policies/how-rules-work`](https://docs.pawabase.com/policies/how-rules-work) — How rules work
- [`policies/named-rules`](https://docs.pawabase.com/policies/named-rules) — Named rules
- [`policies/operators`](https://docs.pawabase.com/policies/operators) — Comparisons and checks
- [`policies/overview`](https://docs.pawabase.com/policies/overview) — Access rules
- [`policies/policies-in-studio`](https://docs.pawabase.com/policies/policies-in-studio) — Policies in Studio
- [`policies/quickstart`](https://docs.pawabase.com/policies/quickstart) — Quickstart
- [`policies/realtime`](https://docs.pawabase.com/policies/realtime) — Rules on realtime
- [`policies/recipes-content`](https://docs.pawabase.com/policies/recipes-content) — Recipes: content and state
- [`policies/recipes-ownership`](https://docs.pawabase.com/policies/recipes-ownership) — Recipes: ownership
- [`policies/recipes-roles`](https://docs.pawabase.com/policies/recipes-roles) — Recipes: roles and permissions
- [`policies/recipes-sensitive-actions`](https://docs.pawabase.com/policies/recipes-sensitive-actions) — Recipes: sensitive actions
- [`policies/recipes-teams`](https://docs.pawabase.com/policies/recipes-teams) — Recipes: teams and organizations
- [`policies/routes-and-functions`](https://docs.pawabase.com/policies/routes-and-functions) — Rules on routes
- [`policies/rule-references`](https://docs.pawabase.com/policies/rule-references) — Choosing a rule
- [`policies/shorthands`](https://docs.pawabase.com/policies/shorthands) — Shortcuts
- [`policies/storage`](https://docs.pawabase.com/policies/storage) — Rules on storage
- [`policies/tables`](https://docs.pawabase.com/policies/tables) — Rules on tables
- [`policies/testing`](https://docs.pawabase.com/policies/testing) — Testing rules
- [`policies/values-and-paths`](https://docs.pawabase.com/policies/values-and-paths) — Values and paths

### quickstarts

- [`quickstarts/agent`](https://docs.pawabase.com/quickstarts/agent) — Quickstart: an AI assistant
- [`quickstarts/javascript`](https://docs.pawabase.com/quickstarts/javascript) — JavaScript
- [`quickstarts/node`](https://docs.pawabase.com/quickstarts/node) — Node.js
- [`quickstarts/python`](https://docs.pawabase.com/quickstarts/python) — Python
- [`quickstarts/react`](https://docs.pawabase.com/quickstarts/react) — React

### realtime

- [`realtime/channel-rules`](https://docs.pawabase.com/realtime/channel-rules) — Channel rules
- [`realtime/channels`](https://docs.pawabase.com/realtime/channels) — Channels
- [`realtime/connection`](https://docs.pawabase.com/realtime/connection) — Connection
- [`realtime/history`](https://docs.pawabase.com/realtime/history) — History and catch-up
- [`realtime/monitoring`](https://docs.pawabase.com/realtime/monitoring) — Monitoring
- [`realtime/overview`](https://docs.pawabase.com/realtime/overview) — Realtime
- [`realtime/patterns`](https://docs.pawabase.com/realtime/patterns) — Patterns
- [`realtime/playground`](https://docs.pawabase.com/realtime/playground) — Playground
- [`realtime/presence`](https://docs.pawabase.com/realtime/presence) — Presence
- [`realtime/protocols`](https://docs.pawabase.com/realtime/protocols) — Protocols
- [`realtime/publishing`](https://docs.pawabase.com/realtime/publishing) — Publishing from your server
- [`realtime/quickstart`](https://docs.pawabase.com/realtime/quickstart) — Quickstart
- [`realtime/record-changes`](https://docs.pawabase.com/realtime/record-changes) — Live records
- [`realtime/troubleshooting`](https://docs.pawabase.com/realtime/troubleshooting) — Troubleshooting

### reference

- [`reference/errors`](https://docs.pawabase.com/reference/errors) — Errors
- [`reference/keys-and-security`](https://docs.pawabase.com/reference/keys-and-security) — Keys and security

### root

- `index.mdx` — Pawabase documentation

### secrets

- [`secrets/overview`](https://docs.pawabase.com/secrets/overview) — Secrets

### storage

- [`storage/access`](https://docs.pawabase.com/storage/access) — Who can do what
- [`storage/browse-files`](https://docs.pawabase.com/storage/browse-files) — Browse and manage files
- [`storage/bucket-settings`](https://docs.pawabase.com/storage/bucket-settings) — Bucket settings
- [`storage/buckets`](https://docs.pawabase.com/storage/buckets) — Create a bucket
- [`storage/download`](https://docs.pawabase.com/storage/download) — Download and list
- [`storage/files-and-records`](https://docs.pawabase.com/storage/files-and-records) — Files and records
- [`storage/images`](https://docs.pawabase.com/storage/images) — Image transformations
- [`storage/overview`](https://docs.pawabase.com/storage/overview) — Storage
- [`storage/patterns`](https://docs.pawabase.com/storage/patterns) — Patterns
- [`storage/quickstart`](https://docs.pawabase.com/storage/quickstart) — Quickstart
- [`storage/share-links`](https://docs.pawabase.com/storage/share-links) — Share links
- [`storage/troubleshooting`](https://docs.pawabase.com/storage/troubleshooting) — Troubleshooting
- [`storage/upload`](https://docs.pawabase.com/storage/upload) — Upload
- [`storage/urls-and-links`](https://docs.pawabase.com/storage/urls-and-links) — Links and URLs

### tools

- [`tools/admin-client`](https://docs.pawabase.com/tools/admin-client) — Admin client
- [`tools/iac/agents`](https://docs.pawabase.com/tools/iac/agents) — Agents, knowledge and connections
- [`tools/iac/buckets`](https://docs.pawabase.com/tools/iac/buckets) — Buckets
- [`tools/iac/ci-cd`](https://docs.pawabase.com/tools/iac/ci-cd) — CI/CD with GitHub Actions
- [`tools/iac/commands`](https://docs.pawabase.com/tools/iac/commands) — Commands
- [`tools/iac/emulate`](https://docs.pawabase.com/tools/iac/emulate) — Emulate
- [`tools/iac/events`](https://docs.pawabase.com/tools/iac/events) — Events and schedules
- [`tools/iac/examples`](https://docs.pawabase.com/tools/iac/examples) — Examples
- [`tools/iac/fields`](https://docs.pawabase.com/tools/iac/fields) — Fields
- [`tools/iac/flow-blocks`](https://docs.pawabase.com/tools/iac/flow-blocks) — Flow blocks
- [`tools/iac/flows`](https://docs.pawabase.com/tools/iac/flows) — Flows
- [`tools/iac/limits`](https://docs.pawabase.com/tools/iac/limits) — Limits and roadmap
- [`tools/iac/mail-templates`](https://docs.pawabase.com/tools/iac/mail-templates) — Mail templates
- [`tools/iac/overview`](https://docs.pawabase.com/tools/iac/overview) — Infrastructure as code
- [`tools/iac/plan-and-deploy`](https://docs.pawabase.com/tools/iac/plan-and-deploy) — Plan and deploy
- [`tools/iac/policies`](https://docs.pawabase.com/tools/iac/policies) — Policies
- [`tools/iac/project`](https://docs.pawabase.com/tools/iac/project) — Project files
- [`tools/iac/quickstart`](https://docs.pawabase.com/tools/iac/quickstart) — Quickstart
- [`tools/iac/relations-and-indexes`](https://docs.pawabase.com/tools/iac/relations-and-indexes) — Relations and indexes
- [`tools/iac/roles`](https://docs.pawabase.com/tools/iac/roles) — Roles
- [`tools/iac/routes`](https://docs.pawabase.com/tools/iac/routes) — Routes
- [`tools/iac/schemas`](https://docs.pawabase.com/tools/iac/schemas) — Schemas
- [`tools/iac/secrets-and-env`](https://docs.pawabase.com/tools/iac/secrets-and-env) — Secrets and env
- [`tools/iac/tables`](https://docs.pawabase.com/tools/iac/tables) — Tables
- [`tools/iac/validate`](https://docs.pawabase.com/tools/iac/validate) — Validate
- [`tools/iac/webhooks`](https://docs.pawabase.com/tools/iac/webhooks) — Webhooks
- [`tools/management-client`](https://docs.pawabase.com/tools/management-client) — Management client
- [`tools/overview`](https://docs.pawabase.com/tools/overview) — Tools
