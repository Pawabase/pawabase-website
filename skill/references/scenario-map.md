# Scenario map

Use this when a request spans several Pawabase areas or uses product language rather than API names. The paths are in the [Pawabase docs repository](https://github.com/Pawabase/pawabase-docs). Read the relevant local reference as well, then verify the installed client and target environment. A documented scenario may require a newer SDK or a feature flag.

## Getting started and application shape

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Build a signed-in app | `guides/signed-in-app.mdx` | Resource policies must match user identity. |
| Add a React app | `quickstarts/react.mdx`, `auth/react.mdx` | One client/session; SSR must use per-request user tokens. |
| Add a Node backend | `quickstarts/node.mdx` | Choose user-scoped versus service credentials per request. |
| Add a Python service | `quickstarts/python.mdx` | `pawabase` 0.9+: async client for channels and live queries. |
| Connect an AI coding tool | `ai/mcp.mdx` | Scope its environment key; distinguish read and build authority. |
| Give a Pawabase agent external MCP tools | `ai/apps/overview.mdx`, `ai/agents/tools.mdx` | Outbound connection secret and agent tool allowlist are separate from Pawabase's inbound MCP key. |
| Work across dev/staging/prod | `guides/environments-workflow.mdx` | Definitions promote; data, users, keys and secrets stay separate. |
| Create a PR preview backend | `environments/previews.mdx` | Preview starts without rows, files, users or secrets. |

## Identity and authorization

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Email/password or verification | `auth/email-and-password.mdx`, `auth/email-verification.mdx` | Handle verification-required and redirect allowlists. |
| Magic links or email codes | `auth/sign-in-links.mdx`, `auth/email-codes.mdx` | Use the flow the environment enabled. |
| OAuth or company SSO | `auth/social-sign-in.mdx`, `auth/enterprise-sign-in.mdx`, `auth/enterprise-connections.mdx` | Provider credentials and return URLs are per environment; company connections belong to an organization and route by verified domain. |
| Passkeys or MFA | `auth/passkeys.mdx`, `auth/two-step-verification.mdx` | Handle second-factor/assurance state, not just initial login. |
| Guest cart that survives signup | `auth/guests.mdx` | Upgrade the guest identity rather than creating an unrelated user. |
| Teams, invitations, org data | `auth/organizations.mdx`, `guides/organizations.mdx` | Bind rows and policies to the active organization. |
| Service or AI-agent identity | `auth/machines.mdx` | A machine acts as itself; a user API key acts as a person. |
| Third-party user token | `auth/token-profiles.mdx` | Receiving service verifies JWKS, audience, issuer and expiry. |
| Password recovery or device/session revoke | `auth/account-recovery.mdx`, `auth/sessions.mdx`, `auth/devices.mdx` | Separate current-session and global revocation. |
| Auth abuse or bot protection | `auth/attack-protection.mdx`, `auth/protect-your-forms.mdx` | Keep server-side limits and checks. |
| Define or debug a rule | `policies/quickstart.mdx`, `policies/debugging.mdx` | Test anonymous, owner, unrelated user, and secret key separately. |

## Data and files

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Create a table/API | `database/tables-and-resources.mdx` | Definition, physical table, and enabled operations are separate. |
| Use existing SQL tables | `database/tables-and-resources.mdx` | Expose a resource and review schema drift. |
| Query, sort, page, search | `database/read.mdx`, `database/filter.mdx` | Per-row rules can make `total` null. |
| Relations or many-to-many | `database/relations.mdx`, `database/patterns.mdx` | Expanded targets have their own read rules. |
| Bulk import or all-or-nothing write | `database/bulk-writes.mdx` | Client batches are not transactions. |
| Migrate/rename/type change | `database/migrations-and-history.mdx` | Review plan; additions and destructive changes differ. |
| Multiple API versions | `environments/api-versions.mdx` | Versions share physical tables/data. |
| Per-user or per-org data | `database/patterns.mdx`, `database/ids-and-timestamps.mdx` | Ownership field and operation policies must agree. |
| Cache a resource | `database/caching-and-rate-limits.mdx` | External DB writes do not clear Pawabase response cache. |
| Import/export/seed | `database/import-and-export.mdx` | Rows do not move with environment promotion. |
| Private file or avatar | `guides/private-files.mdx`, `storage/access.mdx` | Design object keys around the access rule. |
| Public, signed, or shared URL | `storage/urls-and-links.mdx`, `storage/share-links.mdx` | Each URL has different authority and lifetime. |
| Large upload or image transform | `storage/upload.mdx`, `storage/images.mdx` | Check bucket limits, signed upload, and transforms. |
| File linked to a record | `storage/files-and-records.mdx` | Store the key; plan separate deletion/restore behavior. |

## Live and asynchronous behavior

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Chat, typing, presence | `realtime/channels.mdx`, `realtime/presence.mdx` | Channel rules separate subscribe/publish; history is bounded. |
| A live list | `realtime/record-changes.mdx` | Merge by id and refetch after a gap. |
| Live filtered query | `realtime/record-changes.mdx` | Docs describe live queries; verify SDK/deployment support. |
| Listen-only server/dashboard | `realtime/connection.mdx` | SSE listens; HTTP publishes. |
| Reconnect and catch-up | `realtime/history.mdx` | Replay cannot recover beyond retained history. |
| Email after record change | `guides/event-driven-workflow.mdx` | Event subscription/flow; idempotent side effect. |
| Business action with a result | `logic/flows.mdx`, `logic/routes.mdx` | Named flow versus path-bound route. |
| Nightly cleanup/digest | `automation/schedules.mdx` | Set overlap and catch-up behavior. |
| Receive/send webhooks | `automation/inbound-hooks.mdx`, `automation/webhook-signatures.mdx` | Verify inbound signatures and deduplicate deliveries. |
| Retry failed work | `automation/reliability.mdx`, `automation/jobs.mdx` | Diagnose before replay; duplicate effects are possible. |
| Send branded mail | `mail/templates.mdx`, `mail/deliverability.mdx` | Template, provider, DNS, and log are separate layers. |

## AI and operations

| User goal | Start with | Decision that matters |
| --- | --- | --- |
| Chat or embeddings | `ai/gateway.mdx`, `ai/use-it.mdx` | Use a named model and server-held provider key. |
| Semantic search | `ai/vector-search.mdx` | Configure vector field/index and list policy. |
| Agent using project data | `ai/agents/overview.mdx`, `ai/agents/approvals-and-limits.mdx` | Caller authority, approvals, and cost limits. |
| Q&A over documents | `ai/knowledge/overview.mdx` | Ingest and search under knowledge rules. |
| Versioned backend definitions | `tools/iac/overview.mdx` | `pawabase-iac` is a separate package from the Python client. |
| Secret/key rotation | `environments/api-keys.mdx`, `secrets/overview.mdx` | Replacement and revocation order affect running clients. |
| Backup/restore | `backups/overview.mdx`, `backups/restore.mdx` | Object bytes, raw keys and secret values are excluded. |
| Deploy/release/rollback | `environments/promote.mdx`, `environments/api-versions.mdx` | Promote definitions; inspect compatibility and active traffic. |
| Production incident | `guides/production-checklist.mdx`, `activity/overview.mdx` | Trace request id, scope impact, recover failed work separately. |
| Project limits or Cloud account | `cloud/plans-and-limits.mdx`, `cloud/overview.mdx` | Installation/project plan and Cloud account are separate. |
| Self-host runtime | Runtime `ARCHITECTURE.md`, `deploy/README.md` | Verify topology and dependencies in the actual deployment. |

If no row fits, search by the user's concrete noun and action in the docs repository, then inspect `PAWABASE_FEATURE_INVENTORY.md` for feature status and implementation paths. Do not invent an endpoint or SDK wrapper to fill a gap.
