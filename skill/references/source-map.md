# Source, compatibility, and verification

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

## Verified baseline

| Package or source | Checked | What it means |
| --- | --- | --- |
| `@pawabase/client` | `0.7.0` source | Records, auth with MFA, passkeys, SSO and organizations, storage with share links and transforms, realtime channels and `realtime.live`, flows, routes, AI models, agents and knowledge, captcha, `asUser`, `asMachine`. Management in `@pawabase/client/manage` and `@pawabase/client/admin`. `pawabase-types` CLI for generated types. |
| Python `pawabase` | `0.9.0` source | The same areas in snake_case: `pb.from_`, `pb.auth`, `pb.storage`, `pb.realtime` (channels and live queries on `AsyncPawabase`), `pb.flows.invoke`, `pb.routes`, `pb.ai`, `pb.captcha`, `pb.manage`, `pb.admin`, `as_user`, `as_machine`. No function kit and no CLI. |
| `pawabase-iac` | `0.2.4` source | A separate package for definitions as Python code. Its CLI is also called `pawabase`: `init`, `validate`, `emulate`, `plan`, `deploy`, `whoami`. |
| Public OpenAPI | `pawabase-docs/openapi/public.json` | 78 public paths. It leaves out each environment's own table schema and the management surface; use the environment's API Explorer for those. |
| Product docs | `pawabase-docs` at `e446b6a` | The pages the [docs catalog](docs-catalog.md) lists. |

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

## Topic locator

Paths are relative to the [docs repository](https://github.com/Pawabase/pawabase-docs):

| Topic | Start with |
| --- | --- |
| Product model | `concepts/how-pawabase-fits-together.mdx` |
| TypeScript and Python | `quickstarts/javascript.mdx`, `quickstarts/node.mdx`, `quickstarts/react.mdx`, `quickstarts/python.mdx` |
| Data API | `database/how-data-works.mdx`, `database/rest-api.mdx`, `database/relations.mdx` |
| Access and auth | `reference/keys-and-security.mdx`, `policies/how-rules-work.mdx`, `auth/how-auth-works.mdx` |
| Organizations and company sign-in | `auth/organizations.mdx`, `auth/enterprise-sign-in.mdx`, `auth/enterprise-connections.mdx`, `auth/machines.mdx` |
| Realtime | `realtime/channels.mdx`, `realtime/record-changes.mdx`, `realtime/connection.mdx` |
| Storage | `storage/upload.mdx`, `storage/urls-and-links.mdx`, `storage/access.mdx` |
| Logic and automation | `logic/flows.mdx`, `automation/overview.mdx`, `automation/reliability.mdx` |
| AI | `ai/overview.mdx`, `ai/gateway.mdx`, `ai/agents/overview.mdx` |
| MCP and agent connections | `ai/mcp.mdx`, `ai/apps/overview.mdx`, and the runtime's `docs/mcp.md` |
| Operations | `environments/overview.mdx`, `tools/iac/overview.mdx`, `activity/overview.mdx` |
| Cloud, release, recovery | `cloud/overview.mdx`, `environments/api-versions.mdx`, `backups/overview.mdx`, `guides/production-checklist.mdx` |

For work on the server itself, `ARCHITECTURE.md` and `PAWABASE_FEATURE_INVENTORY.md` (its implementation map) in the runtime
repository point to the code; behaviour lives in `pawabase_server/` and its tests. Client sources:
[TypeScript](https://github.com/Pawabase/pawabase-js) and [Python](https://github.com/Pawabase/pawabase-python).
