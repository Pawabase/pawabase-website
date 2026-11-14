# Authentication, keys, and access rules

## Who is calling

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
with no scopes is not narrowed; rules and key type still apply. Full map: `reference/keys-and-security.mdx`.

## Sign-in

The clients cover password, sign-in links, email codes, social sign-in, passkeys, two-step verification and recovery codes,
guests, sessions and devices, organizations, company sign-in (SSO) and token profiles. What is switched on is per environment.

```ts
const result = await pawabase.auth.signInWithPassword({ email, password });
if (result.status === "mfa_required") {
  await result.verify(await askForCode(result.factors));   // the session exists only after this
}
```

- **Browsers.** The client stores and refreshes the session; `onAuthStateChange` drives the UI. OAuth, SSO, password reset,
  invitations and verification links need the redirect URL on the environment's allowlist (`auth/redirect-urls.mdx`).
- **Servers and SSR.** Read the person's token from the request and use `asUser(token)` per request. Never share one signed-in
  client between requests. Refresh tokens rotate: refresh in one place, never log tokens.
- **Guests.** `signInAnonymously`, then `upgradeAnonymous` when they register, so their rows stay theirs.
- **Company sign-in.** `findSSO({ email })` tells you whether the email's domain belongs to an organization with a connection;
  `signInWithSSO({ email })` redirects in a browser. A required-SSO organization refuses password sign-in for its members.
- **Token profiles** issue separate tokens for other services. The receiver checks signature, audience, issuer and expiry
  against the environment's JWKS. They do not replace the Pawabase session.
- `user_metadata` is editable by the user. Never base access on it; use roles, permissions or app metadata.

## Organizations

A person can belong to many organizations; a session is in at most one at a time. Choose it at sign-in (`org`) or later with
`auth.switchOrg(slug)`. The session then carries the organization, the person's role, its permissions and their teams
(`$auth.org`, `$auth.org_role`, `$auth.org_permissions`, `$auth.org_teams`). `auth.orgs` covers members, invitations, teams,
custom roles, verified domains (auto-join or suggest), required two-step verification, transfer and the audit log.

A signed-in person can have **no** active organization. Rules that use organization checks fail closed for them; send them to an
organization picker rather than showing an empty app.

## Policies

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
machine from a person with `$auth.actor_type == "machine"`. See `policies/shorthands.mdx` and `policies/context.mdx`.

How results look under rules:

- Lists are filtered in the database: pages can be short and `total` can be `null`. A single-row `404` can mean "not yours".
- Create, update and delete are checked separately. An update rule on `owner_id` also stops a person moving a row out of
  their reach. Expanded relations and realtime record changes apply the related table's read rule.
- A secret key passes every rule, so it proves nothing about user access.

## Prove the rules

For each operation, decide the actor and the expected answer, then make real requests as: anonymous, the owner, another user,
another organization's member, and a machine if one is involved. A hidden button is not authorization. Studio's policy
debugger shows why a request was allowed or refused (`policies/debugging.mdx`, `policies/testing.mdx`).
