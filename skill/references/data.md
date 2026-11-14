# Data resources and queries

A **resource** is a definition exposing a database table. It declares fields, validation, relations, search, ids/timestamps, owner behavior, caching, events, realtime, and independently enabled list/get/create/update/delete operations. A physical table can exist without a public resource. Creating or changing a resource definition can leave a pending migration; inspect/apply it before expecting new columns to work.

## Read and write path

For `GET /rest/v1/tasks`, the edge checks key/scope/limits, auth resolves the caller, the list rule constrains rows, filters/sort/paging run, then response shaping removes write-only fields. A list returns `{data, page, per_page, total}`; `total` can be `null` under per-row policies. A related row expanded through `expand` is checked under its own resource rule and may become `null`. Single-row `404` hides the distinction between missing and unreadable.

`POST` creates, `PATCH` updates provided fields, `PUT` also behaves as a partial update, and `DELETE` returns no body. A created row can get an id, timestamps, and owner field from the caller. Writes emit `<table>.created`, `.updated`, or `.deleted`, invalidate cached lists, and can broadcast if enabled. `createMany` / `create_many` write in batches and are not atomic; use a server transaction/flow for all-or-nothing behavior.

## Query constraints worth remembering

- `filter[field]=op.value`, `sort=-created_at,title`, `page` from 1, `per_page` from 1 to 200, `select`, `expand`, and `q` are supported by the documented REST API.
- One filter per field survives on the server. Do not express `gte` and `lte` on the same field as separate filters; use a verified route/SQL design when a two-sided range is essential.
- `eq.false` has a server pitfall; TypeScript's `.eq(field, false)` maps to `is.false`. Raw HTTP should use `is.false` for Boolean checks.
- `in`/`nin` split comma-separated values; a value containing a comma needs a different query design.
- `paginate=false` caps the result at 5,000; page through larger sets. Search `q` requires configured search fields.
- Filtering/sorting/selecting an unknown field is rejected. Write-only columns are not returned; vector columns are normally omitted unless explicitly requested.

Generated TypeScript types come from an environment's OpenAPI, which includes its actual resources. Relations added by `expand` may need an explicit row type. For schema changes, prefer versioned IaC/promotions where the project uses them, then validate migration and API shape in the target environment. Read `database/how-data-works.mdx`, `database/rest-api.mdx`, `database/migrations-and-history.mdx`, and `database/relations.mdx` in the docs repo.

## Cross-cutting data cases

- **External writers:** ordinary API writes emit events, invalidate cache, and can broadcast. SQL or another service writing directly needs the resource's outside-change capture setting for events/realtime; it does not automatically invalidate response cache. Check `database/events-and-realtime.mdx` and `database/caching-and-rate-limits.mdx`.
- **Bulk and transactions:** client `createMany` may partly succeed. If all records must commit together, use a verified server transaction/flow; for imports, record per-row failures and resume safely. Check `database/bulk-writes.mdx`.
- **Search and indexes:** `q` only works with configured search fields. Search is ranked Postgres full text with no typo tolerance; use indexes for selective filters/sorts and inspect query behavior before promising typo tolerance. Check `database/filter.mdx` and `database/indexes.mdx`.
- **Shared API versions:** v1 and v2 can expose different definitions over the same data. Design additive schema changes until older versions are retired. Check `environments/api-versions.mdx`.
