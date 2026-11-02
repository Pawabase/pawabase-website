import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "One question about every request",
    blocks: [
      { p: "An **access rule**, which Studio calls a policy, answers one question about one request: may this caller do this, here, now? Every table action, bucket, channel, route and event subscription is protected by one. Because rules run on the server for every request, your app can talk to Pawabase directly from a browser, and hiding a button is never what keeps data safe." },
      { p: "You build rules in Studio with a point-and-click condition builder, named rules and quick sets. There is nothing to write unless you want to. A rule can be as simple as **Signed-in users** or as specific as \"the person owns the record, or is an admin, and the record is not locked\"." },
      { p: "In its smallest form, a rule reads like a sentence. All of these must pass: the caller is signed in, and the record's owner is the caller. That is the whole idea. Conditions are checks over facts about the caller, the record, the submitted data and the request." },
    ],
  },
  {
    title: "Where rules are used",
    blocks: [
      { p: "The same rule means the same thing everywhere, so once you understand one surface you understand them all." },
      { table: { head: ["Protects", "Where you set it"], rows: [
        ["Table actions: list, get, create, update, delete", "The table's Access tab"],
        ["Storage buckets: read, write, list, replace, delete", "Bucket settings"],
        ["Realtime channels: subscribe, publish", "Realtime, channel rules"],
        ["Routes", "The route's \"Who passes\""],
        ["Event subscriptions", "The subscription's \"Only when…\""],
        ["API keys", "Key scopes"],
      ] } },
    ],
  },
  {
    title: "Choosing a rule",
    blocks: [
      { p: "Anywhere a rule is needed, Studio shows the same rule picker. Most of the time you simply choose an option from a menu." },
      { table: { head: ["Choice", "Meaning"], rows: [
        ["Anyone (public)", "Everyone, signed in or not"],
        ["Signed-in users", "Anyone with an account who is signed in"],
        ["Record owner", "The person whose id is stored on the record"],
        ["Signed in with 2FA", "Signed in and completed a second step"],
        ["Secret keys and Studio", "Your servers and your team only"],
        ["Nobody", "No one, except secret keys and Studio"],
        ["Users with role or permission", "Common checks with one value to fill in"],
        ["Keys with scope", "The API key must carry a scope"],
        ["Custom condition", "Build your own with the condition builder"],
        ["List", "Several rules, and all must pass"],
      ] } },
      { p: "Secret keys always pass, and so does Studio, which acts with your team's authority. That is why testing with a secret key tells you whether a rule is the cause of a refusal, and why a secret key must never reach a browser." },
    ],
  },
  {
    title: "What a rule can check",
    blocks: [
      { p: "Each request is described to the rule as a set of facts, which you pick as paths in the builder." },
      { table: { head: ["Fact", "Means"], rows: [
        ["`$auth…`", "Who is calling: id, email, roles, permissions, organization and second-factor level"],
        ["`$record…`", "The row being read, changed or deleted"],
        ["`$input…`", "The data being submitted"],
        ["`$request…`", "The request: method, path and address"],
        ["`$credential…`", "The API key: whether it is a secret key, and its scopes"],
        ["`$object…`", "The file being touched, for storage rules"],
        ["`$event…`", "The event, for subscription conditions"],
        ["`$now`", "The current time"],
      ] } },
      { p: "On `create` the rule has no record yet, so it reads `$input` and `$auth`. On `update` it sees both the stored record and the new values, so you can say \"the owner can change a draft, and may only set the status to draft or submitted\"." },
    ],
  },
  {
    title: "The checks you will use most",
    blocks: [
      { p: "Most rules are built from a handful of ready-made checks. They read better than the same thing built by hand, and they are the forms Pawabase understands best." },
      { table: { head: ["Check", "Passes when"], rows: [
        ["Is signed in", "The caller is signed in. \"No\" means they must be anonymous."],
        ["Has role", "The caller has any of those roles."],
        ["Has permission", "The caller has that permission, or the wildcard `*`."],
        ["Owns the record", "A column, `owner_id` by default, equals the caller's id."],
        ["Uses a secret key", "A secret key, or Studio, made the request."],
        ["Signed in with 2FA", "The session completed a second step."],
        ["Key has scope", "The API key carries that scope."],
      ] } },
      { p: "Permission names are compared as text, so if a role grants `posts:write`, type exactly that and not `posts.write`. Pick one separator for the whole project. For tables whose owner is not called `owner_id`, point the check at the right column, such as `author_id` or `customer_id`, and combine checks when several people may act, for example the author or an editor." },
    ],
  },
  {
    title: "How a list is decided",
    blocks: [
      { p: "Rules look simple, but evaluation has one important subtlety. A list is decided before any rows are read. For `get`, `update`, `delete` and `create`, Pawabase has the record or the input in hand and evaluates the whole rule to true or false. For `list`, there are thousands of candidate rows, so it works the rule out first." },
      { steps: [
        "Everything that does not depend on a record is evaluated first: is the caller signed in, do they have the role, is the key a secret key.",
        "If that already decides it, the request is allowed or refused at once, before the database is touched.",
        "Otherwise, a simple equality between a column and a known value, such as the owner column equalling the caller, becomes part of the database query. Only allowed rows are read.",
        "Anything else stays as a per-row check applied to the rows the query returns.",
      ] },
      { table: { head: ["", "Filter in the database", "Per-row check afterwards"], rows: [
        ["Rows read", "Only allowed ones", "A page of candidates, some dropped"],
        ["Pages", "Exactly the page size", "Can come back short or empty, with more behind them"],
        ["`total`", "Exact", "`null`"],
        ["Speed", "Index-friendly", "Slower on big tables"],
      ] } },
      { p: "To keep lists fast and exact, prefer plain equality on an indexed column such as `owner_id`, `org` or `author_id`. Split by audience when you can: expose \"mine\" through the table and \"published\" through a second table or route, rather than one \"mine or published\" rule. And design your screens for `total: null`, with \"Load more\" instead of \"page 3 of N\"." },
      { p: "Single-record actions are always exact. A rule that is per-row for lists is still enforced precisely when someone reads, updates or deletes one record." },
    ],
  },
  {
    title: "Comparing and checking values",
    blocks: [
      { p: "When a ready-made check is not enough, the builder's **Compare values** takes a left value, an operator and a right value, and **Check a value** takes one value and a check." },
      { table: { head: ["Operator", "True when"], rows: [
        ["equals, does not equal", "The values are equal, or differ. Numbers and number-like ids are compared as text, so `42` equals `\"42\"`."],
        ["greater than, at least, less than, at most", "Both sides are present and the comparison holds."],
        ["is one of, is not one of", "The right side is a list that contains, or does not contain, the left value."],
        ["contains, starts with, ends with", "Text or list matching."],
        ["matches regex", "The left text matches the pattern. Anchor it with `^…$`."],
      ] } },
      { p: "Plan for missing values. If a side is empty, the greater and less comparisons are false, and **is not one of** with a missing list is true. A record with no publish date will not pass \"publish date is at most now\"." },
      { p: "Checking an email ending is handy for a company check, such as `@acme.com`, but it is only meaningful if emails are verified. Also require that the email is set and turn on verified email in restrictions, or use company sign-in." },
    ],
  },
  {
    title: "What a refusal looks like",
    blocks: [
      { table: { head: ["Result", "Meaning"], rows: [
        ["`AuthenticationError` (401)", "The rule needs a signed-in person and the request had none."],
        ["`PermissionError` (403)", "Signed in, but the rule said no. In TypeScript `error.policy` names the rule."],
        ["`NotFoundError` (404)", "On one record: it does not exist, or the rule hides it."],
      ] } },
      { p: "Hiding a record behind a 404 on purpose means a refusal never reveals what exists. When someone reports that they cannot see their data, open the request in Activity to see which rule decided and why, and test the same request signed in as them." },
    ],
  },
  {
    title: "Keys and scopes",
    blocks: [
      { p: "Every request carries an API key that says which project is calling, and rules can read it. A key can also be limited to scopes, which are named permissions such as `resource:read`, `resource:write` and `routes:invoke`. A key without a scope cannot do that kind of thing even if the rule would allow it." },
      { table: { head: ["Key", "Starts with", "In rules"], rows: [
        ["Publishable", "`pb_pk_`", "Rules apply in full."],
        ["Secret", "`pb_sk_`", "Rules always pass."],
      ] } },
      { p: "Restricted keys can also have an expiry, a list of allowed addresses and a list of allowed routes. Rotating a secret key keeps the old one working for a grace period so you can deploy without downtime. Use least privilege: a reporting job gets a secret key with read scope limited to your server's address, a mobile app gets the publishable key and nothing else, and a partner integration gets a scoped key with an expiry." },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <ProductArticle
      icon="policies"
      name="Access policies"
      category="Security"
      description="Readable rules for who can list, read, create, update and delete, enforced on every request, file and channel."
      intro="Access policies decide who may do what in your project. You build them in Studio from readable checks, and Pawabase enforces them on the server for every request, file and channel. This page explains how rules work, how lists are decided and how to keep them fast."
      sections={SECTIONS}
      next={{ label: "Next: API security", href: "/products/api-security" }}
    />
  );
}
