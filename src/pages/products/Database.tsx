import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "A database next to your app",
    blocks: [
      { p: "Most apps need somewhere to keep records: tasks, orders, posts, customers. In Pawabase every project gets its own real database, and you work with it in two halves. You **define** it once, with tables, columns, relations and who may do what. Then you **use** it from your app with `pawabase.from(\"table\")`." },
      { p: "Running a database yourself means thinking about installs, upgrades, disks filling up and backups nobody tested. Pawabase takes that off your plate and keeps the tools to look after it in the same place as the rest of your project." },
      { p: "Because access rules run on the server for every request, your app can call the database straight from a browser. There is no backend of your own sitting in between." },
    ],
  },
  {
    title: "Tables and resources",
    blocks: [
      { p: "Your data lives in ordinary database tables. To make a table available to your app, you give it a **resource**. A resource is a small definition that sits on top of the table. It says what the columns are and what each may contain, which operations are available and who may do each, how records relate to each other, and any extra behaviour such as ids, timestamps, owners, events, realtime, caching and rate limits." },
      { p: "A table without a resource still exists, but it can only be reached from Studio and with a secret key. Once you create a resource, the table is served as an API. In Studio you create both at once, so the table is ready to use the moment you save." },
      { h3: "The five operations" },
      { p: "Each resource has five operations. Every one can be switched on or off, and each has its own access rule. If an operation is off, the API answers as if it does not exist. If all five are off, the table is not served at all." },
      { table: { head: ["Operation", "What it does"], rows: [
        ["List", "Reads many records, with filters, sorting and pages."],
        ["Get", "Opens one record by its id."],
        ["Create", "Adds a new record."],
        ["Update", "Changes some fields of a record, or replaces it whole."],
        ["Delete", "Removes a record."],
      ] } },
      { p: "A new table name uses lowercase letters, digits and underscores, starts with a letter and can be up to 63 characters. A few names are reserved, including `docs`, `openapi.json`, `rpc`, `health`, `internal` and `platform`." },
    ],
  },
  {
    title: "What happens to one request",
    blocks: [
      { p: "It helps to know exactly what the server does with a call, because it explains why hiding a button never protects data and an access rule does." },
      { steps: [
        "Your app calls `pawabase.from(\"tasks\").eq(\"done\", false)`. The client adds your API key and the signed-in person's token.",
        "The firewall can block or rate-limit the request first.",
        "Authentication reads the token: who is calling, their roles, their organization and how strongly they signed in.",
        "The access rule for `list` on `tasks` is evaluated. For a list, simple rules such as \"the owner column equals the caller\" become part of the database query, so only allowed rows are even read.",
        "The query runs with your filters, sort and page.",
        "The response is shaped: write-only columns are removed and an optional transformer reshapes each record.",
        "For writes, side effects follow: events are emitted, subscribers run and realtime is told.",
      ] },
    ],
  },
  {
    title: "Columns and types",
    blocks: [
      { p: "A column is one named piece of data in every record. You define each column's type and rules once, and Pawabase validates every write against them, documents them in the API and uses them to build the table." },
      { table: { head: ["Type", "Stores", "Notes"], rows: [
        ["`string`", "Short text", "The default type"],
        ["`text`", "Long text", "Paragraphs and notes"],
        ["`integer`", "Whole numbers", "Counts, cents"],
        ["`number`", "Decimals", "Rates and measurements"],
        ["`boolean`", "true or false", ""],
        ["`datetime`, `date`", "A moment, or a calendar date", "ISO 8601, in UTC"],
        ["`uuid`, `ulid`", "Identifiers", ""],
        ["`email`, `url`", "Validated addresses", "Checked on every write"],
        ["`json`", "Any JSON", "For free-form data"],
        ["`array`, `object`", "A list, or a nested group", "Set an item type, or define fields"],
        ["`ref`", "A shared shape", "Reuse one shape in many places"],
      ] } },
      { p: "Money is the one place to be careful. Store integers in the smallest unit, such as cents, plus a currency column. Floating-point numbers round." },
      { h3: "Constraints and flags" },
      { p: "Constraints are enforced on every create and update. You can mark a column `required` or `nullable`, give it a `default`, limit text with `min_length`, `max_length` and a regular-expression `pattern`, restrict values to a list with `enum`, and set a `minimum` and `maximum` on numbers." },
      { list: [
        "`unique`: no two rows may share a value. It implies an index.",
        "`indexed`: makes lookups on the column fast.",
        "`read_only`: returned by the API but never accepted on write, which suits values the server computes.",
        "`write_only`: accepted on write but never returned, for a PIN or a secret. It is also removed from realtime messages.",
      ] },
      { p: "A write that breaks a rule fails with a `ValidationError` that names the field, so you can show the message next to the right input. A duplicate on a unique column is a `ConflictError`." },
    ],
  },
  {
    title: "Ids, timestamps and owners",
    blocks: [
      { p: "Three things do special work in almost every table. Each is a setting on the resource." },
      { table: { head: ["Id type", "Looks like", "Choose it when"], rows: [
        ["`ulid` (default)", "`01J9ZK2V3X8QH4M6T7R1N5B0CD`", "Almost always. Unique, sortable by creation time and safe to expose."],
        ["`uuid`", "`3f2c…`", "You must work with systems that expect UUIDs."],
        ["`integer`", "`42`", "You are serving an existing table that uses auto-increment keys."],
      ] } },
      { p: "The id type is fixed after creation, and you never send an `id` on create. Pawabase assigns it and returns it in the response. Because ULIDs sort by time, ordering by `id` is the same as ordering by creation." },
      { p: "With `timestamps` on, which is the default, every record has `created_at` and `updated_at` in UTC. They are read-only, so your writes cannot set them. Order by them for \"newest first\"." },
      { p: "Many tables belong to a person. Set the **owner field** to the column that holds their id. On create it is filled with the signed-in person's id, so your app does not send it and nobody can create a record on someone else's behalf. The `owner` rule then compares that column with the caller on every list, get, update and delete." },
      { note: "If a record is created by a server with no user, its owner column stays empty and the `owner` rule never matches it. Only a secret key can see it. Set the owner explicitly when your server creates records on someone's behalf." },
    ],
  },
  {
    title: "Relations",
    blocks: [
      { p: "A post has an author and comments, and an order has line items. A relation tells Pawabase how two tables connect, so your app can ask for both in one request instead of two. Relations do not create foreign keys or change the table. They describe a link that already exists through an ordinary column." },
      { table: { head: ["Kind", "The link is stored", "Result"], rows: [
        ["`belongs_to`", "On this table: `posts.author_id` holds an author's id", "One object, or `null`"],
        ["`has_many`", "On the other table: `comments.post_id` holds this post's id", "An array"],
      ] } },
      { p: "Access rules still apply to every related record. Each one is read under its own table's rules and shaped by its own transformer. If you may read a post but not its author's profile, the author comes back empty, so expanding can never reveal what a direct read would hide." },
      { p: "Expanding costs one extra query per relation, not one per record, so a list of 50 posts takes two queries rather than 51. A `has_many` with thousands of children makes big responses, so load those separately with a filter and paging. A many-to-many link, such as posts and tags, uses a join table with two `belongs_to` links and a unique index so the same tag cannot be added twice." },
    ],
  },
  {
    title: "Indexes",
    blocks: [
      { p: "An index lets the database find rows without reading the whole table. The right one turns a slow list into an instant one. The wrong ones slow down writes and waste space. Add an index on a column you filter or sort by often, on a table that will grow past a few thousand rows. Typical candidates are foreign-key columns, `status`, `created_at`, `slug` and `email`." },
      { h3: "A flag on a column" },
      { p: "The simplest index is a flag. Switch **Indexed** on for fast lookups, or **Unique** for fast lookups and a guarantee that no two rows share a value." },
      { h3: "Declared indexes" },
      { p: "For several columns, or a condition, declare an index on the resource. A resource can declare up to 16 indexes of up to 8 columns each. Conditions are structured, never SQL strings: each is a column, an operator and a value." },
      { list: [
        "**Order matters.** An index on `(customer_id, created_at)` helps queries that filter by `customer_id`, or by both. It does not help a query that filters only on `created_at`.",
        "**Partial indexes** cover only a slice, such as \"rows that are not deleted\". A uniqueness rule on a partial index applies only inside that slice, which is how you say \"one open cart per customer\" without blocking closed ones.",
      ] },
      { p: "If duplicates already exist, a unique index cannot be built. Find them first in the SQL editor, fix them, then add the index." },
      { p: "To check an index is used, run the explain action on your query in the SQL editor and look for an index scan rather than a full table scan. If a slow query ignores your index, check the column order and that the filter matches the index's condition." },
    ],
  },
  {
    title: "Environments and changing tables safely",
    blocks: [
      { p: "Each environment, such as `development`, `production` and previews, has its own database. A definition lives in one environment. You build in development and then promote definitions to production. Data never moves unless you export and import it." },
      { p: "Resources, access rules, relations and transformers are stored as JSON, which is why Studio can edit them visually and why they can be promoted from one environment to another." },
      { p: "When you change a table, Studio shows a pending migration with the SQL so you can review it before it runs. Adding a column is safe: make it nullable or give it a default so existing rows stay valid. Changing a type or removing a column is flagged **Needs review**, keeps the old values next to the column until you remove them, and can be rolled back. Pawabase never drops a column by itself." },
      { p: "A table can drift from its definition. Someone adds a column with SQL, or you edit a definition and forget to apply it. The table's status tells you where you stand." },
      { table: { head: ["Status", "Meaning", "What to do"], rows: [
        ["In sync", "Table and definition agree", "Nothing"],
        ["Not applied", "The definition has changes the table lacks", "Apply the pending migration"],
        ["Needs review", "The change could rewrite or drop things", "Read the plan and apply it deliberately"],
        ["Changed outside", "The table has something the definition does not", "Acknowledge it to adopt it, or fix the table"],
        ["No table yet", "A resource exists with no table", "Apply to create it"],
        ["Table dropped", "The table is gone", "Re-create it or remove the resource"],
      ] } },
    ],
  },
  {
    title: "Bringing in tables you already have",
    blocks: [
      { p: "If a table already exists, made by a migration or with SQL, turn it into a resource instead of retyping it. Choose **Import a table**, pick the table and give it a resource name. Studio reads its columns and proposes a definition. A new resource is private until you set its access rules, so nothing is exposed by accident." },
      { p: "After promoting definitions to a new environment, the SQL page has a **Create tables** button that creates or extends the tables for every resource at once. Columns are only ever added. Nothing is dropped or retyped." },
      { h3: "Deleting" },
      { list: [
        "**Remove the resource** in the table's settings: the API stops serving the table, but the table and its rows stay.",
        "**Drop the table** deliberately in the SQL editor, after a backup. Studio never drops a table for you.",
      ] },
    ],
  },
];

export default function DatabasePage() {
  return (
    <ProductArticle
      icon="database"
      name="Database"
      category="Data"
      description="A real database in every project, with tables, columns, relations, indexes and safe migrations, served as a secure API."
      intro="Every Pawabase project comes with its own database. You define your tables once, and Pawabase turns each one into a secure API your app can call directly. This page explains how that works, from the first table to indexes and safe changes."
      sections={SECTIONS}
      next={{ label: "Next: Data API", href: "/products/data-api" }}
    />
  );
}
