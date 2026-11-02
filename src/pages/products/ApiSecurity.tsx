import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Layers in front of every route",
    blocks: [
      { p: "Pawabase protects your API in layers, and each one answers a different question. The **firewall** decides what to do with a request before it reaches anything else. **API keys** say which project is calling and what it may do. **Access rules** decide whether this caller may do this thing. **Secrets** keep credentials out of code and settings. **Activity** tells you what happened." },
      { p: "Understanding which layer does what makes problems easier to fix: block bad addresses and slow down abuse in the firewall, limit what a key can do with scopes, and keep the real decisions about data in access rules." },
    ],
  },
  {
    title: "API keys",
    blocks: [
      { p: "Every client needs two things: your project's API URL and an API key. There are two kinds of key." },
      { table: { head: ["", "Publishable key", "Secret key"], rows: [
        ["Starts with", "`pb_pk_`", "`pb_sk_`"],
        ["Where it lives", "Browsers, mobile apps, anywhere", "A server you control"],
        ["What it does", "Identifies your project. Requests are limited by your access rules and the signed-in user.", "Bypasses every access rule and can manage users and settings."],
        ["Safe to publish", "Yes", "Never"],
      ] } },
      { list: [
        "Put the publishable key in client code. It is meant to be seen.",
        "Keep the secret key in an environment variable on a server. The browser build of the client refuses to start with one.",
        "Never trust the browser for permissions. Your access rules run on the server for every request, whatever the client sends.",
        "Do not store anything sensitive in `user_metadata`, since the user can edit it. Store permissions in `roles` or `app_metadata`, set from a server.",
      ] },
      { p: "On a server, use the secret key for admin work, jobs, imports and scripts, and use the publishable key with a signed-in user's access token when handling a request for that user, so rules apply to them." },
    ],
  },
  {
    title: "Scoped and restricted keys",
    blocks: [
      { p: "A key can be limited to **scopes**, which are named permissions such as `resource:read`, `resource:write` and `routes:invoke`. A key without a scope cannot do that kind of thing even if a rule would allow it." },
      { table: { head: ["Option", "Meaning"], rows: [
        ["`role`", "Publishable or secret."],
        ["`scopes`", "What the key may do."],
        ["`expiresAt`", "When it stops working."],
        ["`allowedIps`", "Only these addresses or ranges may use it."],
        ["`allowedRoutes`", "Only these routes."],
      ] } },
      { p: "**Rotate** issues a new secret and keeps the old one working for a grace period, so you can deploy without downtime. If a secret key may have leaked, create a new one, deploy it and delete the old one." },
      { list: [
        "A reporting job gets a secret key with read scope, limited to your server's address.",
        "A mobile app gets the publishable key and nothing else.",
        "A partner integration gets a scoped secret key with an expiry and an allowed-routes list.",
      ] },
    ],
  },
  {
    title: "The firewall",
    blocks: [
      { p: "The firewall decides what to do with a request before it reaches authentication, data or storage. Use it to block bad addresses and countries, rate-limit expensive paths such as sign-in, and watch what it blocks. You find it under **Access, Networking**, with Rules, IP bans, Events and a page to test a request." },
      { p: "Rules are tried in order. The first allow or block that matches decides, while log and rate-limit rules record or count and carry on. A rule can be set to **simulate**, which only records what it would have done." },
      { table: { head: ["Field", "Meaning"], rows: [
        ["Action", "Allow, block, log, or rate limit."],
        ["Conditions", "Match on the request: path, method, header, country, address or the role of the key."],
        ["Limit and counted by", "For rate limits, how many in what window, and per what, such as address or user."],
        ["Simulate", "Record what it would do, without doing it."],
      ] } },
      { p: "Templates fill the form for you: rate-limit sign-in, rate-limit the API, block bad bots, block countries, block large uploads and allow office addresses. **IP bans** refuse addresses and ranges before any rule runs, and you can set them to expire." },
      { steps: [
        "Allow your office addresses first, so a mistake cannot lock you out.",
        "Rate-limit `/auth` to a handful of requests a minute per address.",
        "Rate-limit the API per key or user to protect your plan limits.",
        "Block known-bad bots, and block countries you never serve.",
      ] },
      { note: "Always test a new rule with the **Test a request** page before enabling it. It shows, step by step, what the firewall would do with a described request. Nothing is sent and nothing is counted." },
    ],
  },
  {
    title: "Rate limits and caching on tables",
    blocks: [
      { p: "Two settings on a table protect your database and your bill. A **rate limit** stops one caller from hammering the table. **Response caching** answers repeated reads from memory for a number of seconds. Cache keys include the caller's identity and the exact query, and access rules are still checked before a cached response is served, so one person never receives another's answer." },
      { p: "For account lockouts after repeated wrong passwords, use attack protection in authentication. The firewall works at the request level, and lockout works at the account level, so the two complement each other." },
    ],
  },
  {
    title: "Secrets",
    blocks: [
      { p: "A secret is a value you must not put in settings or code: a provider's client secret, an SMTP password or a signing key. Store it once in **Secrets**, then refer to it by name as `secret://NAME` wherever a setting accepts a secret, such as a social provider, a company sign-in connection or an inbound hook." },
      { list: [
        "Values are stored encrypted and **shown once**, when you create or rotate them. After that only the name, description, version and rotation info are visible.",
        "**Rotate** with a new value. Services using the name pick it up, and the previous version is kept so you can **roll back**.",
        "Set a rotation reminder in days so you rotate on schedule.",
        "Secrets belong to an environment, and promoting never copies secret values. Create the secret in each environment.",
      ] },
      { p: "Use one secret per purpose with a description, rotate at once if one may have leaked, never paste a secret into a ticket or chat, and use a different value in each environment." },
    ],
  },
  {
    title: "Seeing what happened",
    blocks: [
      { p: "**Activity** is where you look when something is slow, failing or surprising. Every request has a request id, which also appears on the events it caused, the flow runs that followed and the webhook deliveries, so you can follow one action through everything it triggered." },
      { steps: [
        "In your app, catch the error and read `error.requestId`.",
        "Open Activity, Requests and search for it.",
        "Open the request and read the access-rule decision.",
      ] },
      { p: "Links in emails and social sign-in can only return to addresses you have listed under Redirect URLs. List exactly your app's addresses, including `localhost` for development, and avoid wildcards." },
    ],
  },
];

export default function ApiSecurityPage() {
  return (
    <ProductArticle
      icon="apiSecurity"
      name="API security"
      category="Security"
      description="Scoped keys, an ordered firewall, rate limits, CORS, secrets and an audit log in front of every route."
      intro="API security in Pawabase is a set of layers: a firewall in front, keys that say who is calling, access rules that decide what they may do, secrets that stay out of code, and activity that shows what happened. This page explains each layer and how they fit together."
      sections={SECTIONS}
      next={{ label: "Next: Flows", href: "/products/flows" }}
    />
  );
}
