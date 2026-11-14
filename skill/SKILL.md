---
name: pawabase
description: Add Pawabase as the backend of any app, then build, secure, debug and operate it with the verified TypeScript and Python clients, raw HTTP, and MCP. Use for any Pawabase work - records, auth and organizations, access policies, storage, realtime and live queries, flows, routes, mail, AI models, agents and knowledge, environments, releases, backups - and for connecting an AI client to a Pawabase environment.
---

# Pawabase

Pawabase is one backend per environment: tables with an API, sign-in and organizations, access policies, files, realtime
channels and live queries, flows, routes, events, jobs, mail, an AI gateway with agents and knowledge, and the operations around
them (environments, versions, backups, activity). Everything an app does goes through the gateway, and every call is checked
against the caller's key, identity and policies.

## Work in four moves

1. **Locate.** Identify the project, environment, API address, who is calling (a person, a server, a machine, an agent), the key
   type, and the installed client version. If Pawabase MCP is connected, start with a harmless overview tool to confirm the
   environment before asking the user for anything; if it is not and the task changes the environment, walk the user through
   connecting it (see the keys section below).
2. **Verify the contract.** Check the method exists in the installed package (see [source map](references/source-map.md)), and
   the endpoint and fields exist in the environment's own OpenAPI (Studio → API Explorer). Docs can be ahead of a package; the
   package can be ahead of a deployment.
3. **Build the smallest change** that does the job, with the right key on the right side (browser or server), and access decided
   by policies rather than by app code.
4. **Prove it.** Make a real request as the intended caller and as an unrelated one. For data rules, read a row you should and a
   row you should not. For automation, find the run in Activity. Report what you verified and what you did not.

## Keys: when you need one, which, and how to ask

Ask the user only for what the task needs, at the moment it needs it, and say exactly where in Studio it is.

| The task needs | Ask for | Where the user finds it | Where it goes |
| --- | --- | --- | --- |
| App code that calls Pawabase | The API address, the **project ID**, a **publishable** `pb_pk_` key, and the environment's name only if it is not the project's default | Studio → Overview → **Connect** | The project's env file (it is safe in a browser bundle) |
| Server code that administers (manage, admin, share links, captcha verify) | A **secret** `pb_sk_` key, limited to the environments the server works in | Studio → **Settings → API keys** | A server-only env var. Never in the bundle or git |
| You to look at or change the environment yourself (tables, policies, flows, mail, data) | An **MCP key**: Look only or Build with me | Studio → **Manage → MCP** | The user's shell as `PAWABASE_MCP_KEY`, then the agent's MCP config. See [the MCP tutorial](references/mcp.md) |
| A worker or AI agent that acts as itself | A machine's client id and secret | Studio → **Users & auth → Machines** | The service's secret store |

- Publishable keys and addresses may be pasted in chat. **Secret and MCP keys must not be**: ask the user to put them in an env
  var or secret store themselves, and refer to the variable by name. Never print, log or commit one.
- Writing code needs no key at all: write it against env var names, and ask for values only to run or test it.
- Before asking, check what is already there: the project's env files and examples, and whether Pawabase MCP tools are already
  connected (a harmless `get_overview` or `list_environments` call answers that).
- Use a **Look only** MCP key for production and a **Build with me** key for development. Only an administrator key can touch
  users, keys and secrets; if a task needs that, tell the user and let them do it in Studio rather than asking for such a key.

## Choose the path

| The user wants to | Read |
| --- | --- |
| Understand how the parts fit, or plan a system | [System](references/system.md) and [scenario map](references/scenario-map.md) |
| Write browser, React, Node or edge code | [TypeScript client](references/typescript.md) |
| Write Python scripts, servers or workers | [Python client](references/python.md) |
| Call Pawabase from any other language | [HTTP API](references/http.md) |
| A complete, copyable pattern (signed-in app, team app, server on behalf of a user, uploads, live list, agent with approval) | [Recipes](references/recipes.md) |
| Sign-in, sessions, organizations, roles, company sign-in, keys, policies | [Auth and policies](references/auth-policies.md) |
| Tables, queries, relations, migrations, search, vectors | [Data](references/data.md) |
| Buckets, uploads, image sizes, share links | [Storage](references/storage.md) |
| Channels, presence, record changes, live queries | [Realtime](references/realtime.md) |
| Flows, routes, events, schedules, webhooks, jobs, mail | [Automation](references/automation.md) |
| Models, embeddings, agents, approvals, knowledge | [AI](references/ai.md) |
| Connect an AI client to Pawabase, or a Pawabase agent to outside tools | [MCP](references/mcp.md) |
| Studio, management clients, IaC, environments, debugging by layer | [Operations](references/operations.md) |
| Cloud, self-hosting, versions, previews, backups, recovery | [Platform lifecycle](references/platform-lifecycle.md) |
| Check whether something is supported at all | [Capability boundaries](references/capability-boundaries.md) |
| A request fails, data is missing, live updates or mail do not arrive | [Troubleshooting](references/troubleshooting.md) |
| Find the right docs page | [Docs catalog](references/docs-catalog.md) |

Read only what the task needs. When a task crosses two areas, read both and test the boundary with a real call.

## Rules that do not bend

- **Keys.** Browsers and mobile apps use publishable `pb_pk_` keys; policies apply to everything they do. Secret `pb_sk_` keys
  bypass policies and manage the environment: servers only, never shipped. Services and AI agents get their own machine
  identity (`asMachine` / `as_machine`) instead of borrowing a person's access.
- **Callers.** A signed-in person's calls carry their access token. A server acting for a person uses `asUser(token)` /
  `as_user(token)` with a publishable key, so that person's policies apply.
- **Keys belong to the project; data belongs to an environment.** Data, users, policies, secrets, files and settings belong to
  one environment. A key belongs to the project and reaches all of its environments or only the ones it was limited to; a client
  names the project (required) and the environment (optional: left out, the project's default). Promotion moves definitions,
  never data, users or secrets.
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
