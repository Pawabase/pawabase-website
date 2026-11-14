# Recipes

Complete patterns for the jobs people ask for most. Each one says what to set up in the environment (Studio, the management
client or `pawabase-iac`), the code, and how to prove it. Names such as `tasks` or `support` are examples: use the project's
own. Before copying, confirm every method in the installed package ([source map](source-map.md)).

## 1. Add Pawabase to an existing project

1. **Find the facts.** Gateway URL, environment name, a publishable key for the app, a secret key for servers (never in the
   bundle), and which client the project's language needs. Put them in the project's existing env file pattern:
   `PAWABASE_URL`, `PAWABASE_PROJECT` (the project's id), `PAWABASE_ENV` (only when not the project's default),
   `PAWABASE_PUBLISHABLE_KEY` (exposed to the browser through the framework's public prefix,
   such as `VITE_` or `NEXT_PUBLIC_`), `PAWABASE_SECRET_KEY` (server only).
2. **Install the client.** `npm install @pawabase/client`, or `pip install pawabase` (`"pawabase[realtime]"` to listen).
3. **Make one client module** and import it everywhere; never create a client per component or per request.

   ```ts
   // src/lib/pawabase.ts
   import { createClient } from "@pawabase/client";
   import type { Database } from "./pawabase.types";

   export const pawabase = createClient<Database>({
     url: import.meta.env.VITE_PAWABASE_URL,
     project: import.meta.env.VITE_PAWABASE_PROJECT,
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

## 2. Signed-in app with private rows

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

## 3. Team app: organizations, roles, invitations

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

## 4. Server or SSR acting for the signed-in person

```ts
// one shared client for the server, publishable key
const server = createClient({ url, project, apiKey: process.env.PAWABASE_PUBLISHABLE_KEY!, environment });

app.get("/api/tasks", async (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer /, "") ?? req.cookies.pb_access;
  const tasks = await server.asUser(token).from("tasks").order("created_at", "desc").perPage(20);
  res.json(tasks);                                          // that person's policies applied
});
```

Never answer user requests with a secret-key client: it bypasses every policy. Keep the secret key for administration routes,
and check the person's role before calling them.

## 5. Background worker or integration with a machine identity

Set up: Studio → Auth → Machines: create a machine, give it a role whose permissions the policies check
(`$auth.actor_type == "machine"` tells it apart from a person). Store its client id and secret in the worker's secrets.

```python
import os
from pawabase import Pawabase

pb = Pawabase(os.environ["PAWABASE_URL"], os.environ["PAWABASE_PUBLISHABLE_KEY"], project=os.environ["PAWABASE_PROJECT"], environment="production")
worker = pb.as_machine(client_id=os.environ["PB_MACHINE_ID"], client_secret=os.environ["PB_MACHINE_SECRET"])

for order in worker.from_("orders").eq("status", "paid").iterate():
    ship(order)                                              # make it idempotent: it may see an order twice
    worker.from_("orders").update(order["id"], status="shipped")
```

The token is fetched and renewed for you. Prefer a flow on `orders.updated` when the work fits flow blocks; use a worker when it
needs your own code or libraries.

## 6. Uploads, image sizes, and links for outsiders

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

## 7. Protect a public form from bots

Set up: Studio → Auth → Bot protection, on for the action (`sign_up`, `contact`, …).

```ts
const { pass } = await pawabase.captcha.protect("contact");          // solves the built-in check, or shows the provider widget
await fetch("/api/contact", { method: "POST", body: JSON.stringify({ ...form, pass }) });

// server, with a secret-key client
const check = await admin.captcha.verify(body.pass, { action: "contact", remoteip });
if (!check.success) return res.status(400).end();
```

Pawabase's own sign-up and sign-in apply the check by themselves when it is switched on for them.

## 8. An AI agent that asks before acting

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

## 9. Company sign-in (SSO) on the sign-in screen

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

## 10. Hand an AI coding tool the environment

Create a scoped key in Studio → **Manage → MCP** (**Look only** for production, **Build with me** for development), keep it
in `PAWABASE_MCP_KEY`, and add the server to the tool (step by step in [MCP](mcp.md)). Then ask for real work: "List the tables, then add a
`comments` table owned by the signed-in user, with policies, and show me the migration before applying it."
