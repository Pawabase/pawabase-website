import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Every table is an API",
    blocks: [
      { p: "When you give a table a resource, Pawabase serves it as a REST API at `/rest/v1/<table>`. There is nothing to deploy and no controllers to write. The same five operations are available from a client library in your app, from plain HTTP, and from the API Explorer in Studio." },
      { p: "Every request is made as the person who is signed in, so your access rules decide what comes back. Because those rules run on the server, your app can call the API directly from a browser." },
    ],
  },
  {
    title: "Reading records",
    blocks: [
      { p: "`pawabase.from(\"table\")` starts a query. Add filters and options, then `await` it. A query returns one page, 20 records by default, together with the page number, the page size and a total." },
      { note: "`total` is how many records match for this caller. It is `null` when a per-row access rule means the server cannot count the rows you may see without checking each one. Do not build \"page 3 of N\" from it unless you know it is a number. Use \"Load more\" and stop when a page comes back short." },
      { h3: "One record, the first match, exactly one" },
      { p: "`get(id)` reads one record by id and throws `NotFoundError` if it is missing, while `maybeGet(id)` returns `null`. A record that exists but that your rule hides is also \"not found\". The two are the same on purpose, so a refusal never reveals what exists." },
      { p: "`first()` returns the first match or `null`. `single()` expects exactly one and throws if there are none or several. `count()` and `exists()` answer in one call, and both respect your rules, so they count what you are allowed to see. A number a person should not be able to derive, such as total orders across customers, belongs on a server." },
      { h3: "Only some fields, or everything" },
      { p: "Download less by naming the fields you need with `select(\"id\", \"title\")`. Fields you do not select come back absent. When you really want every match, `all()` follows the pages for you, with `pageSize` and `maxRecords` limits for results you know are bounded." },
      { p: "If you prefer one call with options over chaining, `list({ where, sort, select, expand, page, perPage })` takes a plain object. A leading `-` in `sort` means descending." },
    ],
  },
  {
    title: "Filtering",
    blocks: [
      { p: "Filters are sent to the server and applied by the database, so you only download what matches. Several filters combine with **and**." },
      { table: { head: ["Method", "Meaning", "Works on"], rows: [
        ["`eq`, `neq`", "equal, not equal", "all"],
        ["`gt`, `gte`, `lt`, `lte`", "comparisons", "numbers, dates, text"],
        ["`like`, `ilike`", "pattern match, where `%` is any run of characters", "text"],
        ["`in`, `notIn`", "one of a list", "all"],
        ["`is`, `isNot`", "null, true or false checks", "all"],
      ] } },
      { p: "Nothing equals null, so `eq(\"x\", null)` is rejected. Use `is(\"x\", null)` or `isNot(\"x\", null)`. In Python the methods are `in_` and `is_` because `in` and `is` are keywords." },
      { p: "You can also pass conditions as one object. A plain value means equal, and an object picks an operator." },
      { list: [
        "**Dates** can be a `Date`, a Python `datetime` or an ISO 8601 string. Times are UTC.",
        "**Empty lists** are handled for you: `in(\"id\", [])` returns nothing at once, without a request.",
        "**Or** is not chained. Use `in` for several values of one column, two queries merged in your app, or a route for complex logic.",
        "**Search boxes** should debounce the input, cancel the previous query and escape `%` and `_`, because they are pattern characters.",
      ] },
      { p: "A filter can never reveal a row an access rule hides. Asking for `owner_id = someone else` simply returns nothing, and a rule cannot be bypassed by a clever filter. For speed, filter on indexed columns. A filter on an unindexed column in a table of millions of rows scans all of it." },
    ],
  },
  {
    title: "Sorting and paging",
    blocks: [
      { p: "Each `order` after the first breaks ties in the earlier ones, and ascending is the default. Without any `order`, the order is not guaranteed, so always sort lists you show." },
      { p: "Pages count from 1. The default size is 20 and the server caps it at 200. `limit(n)` asks for at most `n` records." },
      { h3: "Turning paging off" },
      { p: "When you want every match in one response, such as a short dropdown or a small lookup table, call `paginate(false)`. The response keeps its shape, with `page` and `per_page` set to `null`. One response holds at most 5000 records. If more match, the server answers `400` rather than quietly cutting the list short, so narrow it with filters or go back to paging." },
      { h3: "Load more" },
      { p: "Keep the page number and add results as it grows. Stop when a page comes back shorter than the page size. Do not rely on `total`, which can be `null`." },
    ],
  },
  {
    title: "Writing records",
    blocks: [
      { p: "Writes return the saved record, so you can show the server's version, with its `id`, timestamps and defaults, without another read. Every write is checked against the table's `create`, `update` or `delete` rule and against the columns' rules." },
      { list: [
        "**Create:** leave out `id`, `created_at` and `updated_at`. If the table has an owner field, it is filled with the caller's id.",
        "**Update** changes only the fields you send. Sending `null` clears a field, even one that was required at create time, so validate in your form.",
        "**Replace** writes the whole record, and fields you leave out return to their defaults. Prefer `update` unless you mean \"this is the complete new record\".",
        "**Delete:** deleting a record that is gone, or one you may not delete, throws `NotFoundError`. There is no recycle bin, so use a soft delete if you need undo.",
      ] },
      { table: { head: ["Call", "Rule checked", "Common errors"], rows: [
        ["`create`", "`create`", "`ValidationError`, `ConflictError`, `PermissionError`"],
        ["`update`, `replace`", "`update`", "`NotFoundError`, `ValidationError`, `ConflictError`"],
        ["`delete`", "`delete`", "`NotFoundError`"],
      ] } },
    ],
  },
  {
    title: "Errors you can show",
    blocks: [
      { p: "The server checks required columns, types and constraints before your rules run, and tells you which column is wrong. Show each message under its own input." },
      { p: "A taken unique value, such as a duplicate username, is a `ConflictError`. A missing sign-in is an `AuthenticationError`, and a rule that refuses a signed-in person is a `PermissionError`. A query the client cannot send, such as `eq(\"x\", null)`, is an `InvalidQueryError`." },
    ],
  },
  {
    title: "Many at once, and safe retries",
    blocks: [
      { p: "`createMany` sends several creates in parallel and tells you which succeeded and which failed, with each failed row's position, so one bad row does not lose the rest. It is not one transaction. If you need all-or-nothing, use a flow or route that does the writes together." },
      { table: { head: ["You have", "Use"], rows: [
        ["Up to a few hundred rows from your app", "`createMany`"],
        ["A file, or thousands of rows, with updates or duplicates", "Import, which validates, upserts and supports a dry run"],
        ["A large one-time fix", "The SQL editor, after a backup"],
      ] } },
      { p: "A double click or a retry can create two records. Put a unique column on a natural key, such as an order number or an idempotency key you generate on the client, so a second attempt becomes a `ConflictError` you can treat as success. Also disable the button while the request is in flight. The client does not retry a `POST` after a network drop by itself, to avoid exactly this." },
      { p: "Two people editing the same record is last write wins. To detect it, send the `updated_at` you read and check it on the server, or make fields independent so edits do not collide." },
    ],
  },
  {
    title: "Caching, limits and the API Explorer",
    blocks: [
      { p: "Two settings on a resource protect your database and your bill. **Caching** keeps the answer to a `list` or `get` for a number of seconds, up to a day, and serves repeat requests without touching the database. Writes to the table clear its cache automatically. Cache keys include the caller's identity and the exact query, and access rules are still evaluated before a cached response is served, so one person never receives another's answer. A **rate limit** stops one caller from hammering the table." },
      { p: "The API Explorer in Studio is a workbench for the API your tables expose. Pick an endpoint, fill in the path, query and body, and send. You can sign in as a real user of your app, with their password and a two-step code if they use one, so you see exactly what they would. When someone says \"I can't see my orders\", send the same request as them: empty means the `list` rule filtered everything, `403` means a rule refused, and `401` means they were not signed in. You can copy any request as a `curl` command." },
      { p: "Each resource also compiles to an OpenAPI description, including the descriptions and examples you wrote on columns. TypeScript types are generated from it." },
    ],
  },
];

export default function DataApiPage() {
  return (
    <ProductArticle
      icon="document"
      name="Data API"
      category="Data"
      description="Every table gets a secure REST API with filters, relations, sorting, pages and generated docs."
      intro="The Data API is how your app reads and writes the tables you define. Every table becomes a secure REST API, and the same calls work from a client library, plain HTTP and the API Explorer. This page covers reading, filtering, paging, writing and the errors you will meet."
      sections={SECTIONS}
      next={{ label: "Next: Authentication", href: "/products/authentication" }}
    />
  );
}
