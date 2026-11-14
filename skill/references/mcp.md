# MCP: connect AI tools and Pawabase

Pawabase participates in MCP in two directions. Keep them separate:

| Direction | What it does | Where to configure |
| --- | --- | --- |
| **AI client → Pawabase** | Claude Code, Codex, Cursor, or another MCP client inspects and manages a Pawabase environment. | Pawabase's `/mcp/v1` endpoint or local `pawabase-server mcp`. |
| **Pawabase agent → external MCP server** | A Pawabase agent uses an outside app's tools, such as GitHub, Linear, or a custom server. | Studio → AI → Connections → Any MCP server, then the agent's tool list. |

The skill itself is instructions. Installing it does not create an MCP connection. MCP is optional for the skill's advice; use it when live project inspection or management is useful.

## Tutorial: connect yourself to the user's environment

Follow this when the task means changing or inspecting a real environment (creating tables, writing policies, building flows,
reading errors) and no Pawabase tools are available yet.

**1. Check first.** Look for Pawabase MCP tools in your tool list (`get_overview`, `list_environments`, `list_resources`…). If
they are there, call `get_overview` and skip to step 6. Check the project's env files for `PAWABASE_URL` too.

**2. Decide the access, and tell the user why.** Say what you are about to do and which access it needs:

- **Look only** (`ai-read`): read tables, flows, runs, logs and usage. Change nothing. Always this for production.
- **Build with me** (`ai-build`): also build tables, rows, flows, mail templates, buckets and webhooks. No users, keys or
  secrets. For development.

**3. Ask the user to create the key.** Give them these steps, filled in:

> 1. Open Studio, choose the **development** environment, then **Manage → MCP**.
> 2. Name the key after this tool (for example "Claude Code"), pick **Build with me**, and create it. It is shown once.
> 3. In your terminal, run `export PAWABASE_MCP_KEY="…"` with the key (or add it to your shell profile or secret manager).
>    Please don't paste the key here.
> 4. Copy the **MCP address** from the same page and send me that (it is not secret).

**4. Add the server to the agent** with the address the user sent, referring to the key only by variable name. The snippets are
under [client setup](#client-setup) below; Studio's MCP page also shows a ready snippet for Claude Code, Cursor, VS Code and
Codex. Commands that change the user's agent configuration are theirs to approve: show the command and run it only with their
yes, or let them run it.

**5. Restart or reload** the agent so it loads the new server (Claude Code: start a new session, then `/mcp` shows it connected;
Codex: restart, `codex mcp list`; Cursor: reload MCP servers in settings).

**6. Prove the connection** with a harmless read: `get_overview`, then `list_tables`. Report the environment name you see, so
the user can confirm it is the right one before you change anything.

**7. Work through the tools, carefully.**

- Inspect before changing: `get_resource`, `describe_table`, `list_policies`.
- After `create_resource` or `update_resource`, check `get_schema_changes` and apply with `migrate_resource`; then confirm with a
  read.
- Prefer record tools (`create_record`, `update_record`) over `run_sql`: SQL skips events and realtime.
- Tools that delete, send email, set secrets, write SQL or promote ask for a `confirm` value. Ask the user before supplying it;
  `promote_environment` runs as a dry run unless told otherwise.
- `request_platform` reaches any management endpoint the key allows: use it only when no dedicated tool exists.
- Every call is recorded on Studio's MCP page with the key's name.

**When to ask for more access.** A refused call (`403`, or a missing tool) means the key's scope does not cover it. Say which
action needs what, and let the user choose: do it themselves in Studio, or create a key with wider access. Users, API keys and
secrets are never in **Build with me**; send the user to Studio for those. Never ask for an administrator key in chat.

## When MCP is already connected

Start with `get_overview` or `list_environments` (or the `pawabase://{env}/overview` resource) to confirm the environment and
what the key can see. Use purpose-built tools before `request_platform`. For a definition change, read the current definition,
check schema changes, apply the authorized change, then verify with a read. Do not ask for an API key when the connected tools
already have the access. If a tool is missing, decide whether the key lacks the scope or the runtime lacks the tool; never
invent a tool call.

## AI client → Pawabase: choose authority first

For a hosted/remote client, use the public **HTTPS** gateway address `https://YOUR-API/mcp/v1`, not the internal server port. Pawabase's HTTP MCP endpoint is stateless Streamable HTTP: JSON-RPC over `POST`, ordinary JSON response, no session or SSE stream. `GET` and `DELETE` return `405`. The endpoint can be disabled with `PAWABASE_MCP_ENABLED=false`; the local stdio command remains a separate explicit option.
The route is intentionally excluded from the environment's generated OpenAPI. Verify it against the runtime MCP guide and the target deployment rather than expecting it in the API Explorer.

Create a **secret** environment key in Studio → **Manage → MCP** (or Settings → API keys) and select **Look only** (`ai-read`) or **Build with me** (`ai-build`). A publishable key is refused. A scoped secret key needs at least one management scope to reach MCP; each listed tool and each call is then checked against its scopes. A key is pinned to its own environment and cannot escape into another environment through `request_platform`. An unscoped secret key exposes every available tool for that environment, so use a scoped key for ordinary AI clients. The key is shown once. Keep it in the client/secret store, not in git, chat, or a committed TOML file.

`ai-read` can inspect project definitions and activity without changing them. `ai-build` adds data and definition building but excludes users, keys, secrets, snapshots, and promotion. Exact tool visibility depends on key scopes and runtime version. The tool list can include resources/schema, records, policies, flows/jobs, storage, mail, webhooks, logs, AI models, and release/backup operations. Do not assume a static tool count.

### Client setup

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

**Cursor and other `mcp.json` clients** (`.cursor/mcp.json` or `~/.cursor/mcp.json`)

```json
{ "mcpServers": { "pawabase": { "url": "https://YOUR-API/mcp/v1", "headers": { "apikey": "${env:PAWABASE_MCP_KEY}" } } } }
```

**VS Code** (`.vscode/mcp.json`)

```json
{ "servers": { "pawabase": { "type": "http", "url": "https://YOUR-API/mcp/v1", "headers": { "apikey": "${env:PAWABASE_MCP_KEY}" } } } }
```

Whatever the client, keep its approval prompt on for tools that are not read only, and always for production. Then ask for a
harmless read: "List the tables in development." A hosted connector that only offers OAuth cannot use Pawabase's API-key
endpoint on its own; use a client that supports custom headers or an approved credential proxy, never a weaker key or
disabled authentication.

### Local stdio

For a client on the same trusted host as the runtime, launch `pawabase-server mcp` over stdio. It reads normal `PAWABASE_*` runtime settings and needs database/secrets access. This path has installation authority, not an environment-scoped remote key. Use an absolute executable path, a trusted working directory, and no terminal allocation. The runtime's `docs/mcp.md` has client and Docker examples.

## How tool calls behave

MCP tools call Pawabase's existing management API and retain its validation, scopes, migrations, quotas, and audit logging. Read tools/resources/prompts are also filtered by scope. Useful built-in prompts include `design_data_model`, `secure_resource`, `build_flow`, `investigate_errors`, `review_environment`, and `ship_changes`; available names can vary with runtime version.

Some high-impact tools require a `confirm` value, including deletes, write SQL, setting a secret, sending email, and non-dry-run promotion. That confirmation is a workflow pause, **not a hard permission boundary**: a client could supply it itself. Key scopes and the client's approval settings are the hard controls. `promote_environment` defaults to a dry run. For table work, define → inspect schema changes/migrate → use records. `create_resource` alone does not silently apply destructive schema changes. Prefer record tools for writes because direct SQL may miss normal events and realtime side effects.

Each tool call is audited as `mcp.tool` with tool name, environment, outcome, and argument names, not secret values. The underlying management change is audited too. A newly created API key is returned in plaintext once; secret values otherwise remain write-only.

## Verify the connection

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

For runtime-specific details, read [Pawabase's MCP guide](https://github.com/Pawabase/pawabase/blob/main/docs/mcp.md) and the docs site's `ai/mcp.mdx`.

## Pawabase agent → external MCP server

In Studio, open **AI → Connections → Add a connection → Any MCP server**. Supply the external server's HTTPS URL and, if needed, a least-privilege credential. Choose **Check** to test the connection. Add it to the agent under **Add → An app**; for generic MCP servers, choose all tools or an explicit allowlist. Agent approval settings still govern actions that change external state. The connection secret is stored in that Pawabase environment and is excluded from exports/backups.

The runtime accepts bearer, custom-header, or basic authentication for outbound MCP connections. It checks the destination against outbound URL/private-host rules before connecting. A failed Check may mean bad URL, network policy, expired key, insufficient external scopes, or incompatible transport. Diagnose those separately from Pawabase agent permissions. See the docs site's `ai/apps/overview.mdx` and `ai/agents/tools.mdx`.
