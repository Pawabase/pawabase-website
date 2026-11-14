# Python client

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

## Callers

| Who is calling | How |
| --- | --- |
| A person, in a script or desktop app | Publishable key, then `pb.auth` sign-in; the session lives in the session store |
| A web server acting for a signed-in person | `pb.as_user(token)` on a publishable-key client: their policies apply |
| Server administration | A separate client with a secret key: `pb.manage` and `pb.admin` unlock |
| A service or AI agent | `pb.as_machine(client_id=…, client_secret=…, scope=…)`: its own identity and roles |

## Surface at 0.9.0

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

## A live query (async)

```python
from pawabase import AsyncPawabase

async with AsyncPawabase(url, "pb_pk_…", environment="production") as pb:
    async with pb.realtime.live("tasks", filter={"done": "is.false"}, sort="-created_at", limit=20) as live:
        async for result in live:          # the whole filtered result, each time it changes
            render(result["data"])
```

The table needs **Broadcast changes** on; the list policy applies, so each person only receives rows they may read. Filter
booleans and nulls with `is`. `limit` is 1 to 200.

## Errors

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

## Not in this package

There is no function kit any more: Pawabase does not run uploaded functions. Put server logic in flows, custom routes,
schedules and jobs, or in your own service that calls Pawabase. Versioned definitions as code are the separate `pawabase-iac`
package (`validate`, `plan`, `deploy`); it is not this client.

Verified in the package source (`pawabase/client.py`, `data.py`, `auth.py`, `storage.py`, `realtime.py`, `ai.py`,
`callables.py`, `captcha.py`, `manage/`, `admin.py`, `errors.py`). Read `help()` on the installed object for exact arguments.
