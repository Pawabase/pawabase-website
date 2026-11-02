import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Users for your app",
    blocks: [
      { p: "Authentication gives your app **users**. A person signs up once and signs in whenever they return, and from then on every request your app makes is made as that person. Your database, storage and realtime rules read that identity to decide what the request may do." },
      { p: "You manage all of it in Studio under **Users & auth**, and you use it from your app with `pawabase.auth`. Users belong to an environment, so an account in production does not exist in development and test accounts never mix with real ones." },
    ],
  },
  {
    title: "What a user is",
    blocks: [
      { table: { head: ["Part", "Meaning"], rows: [
        ["`id`", "A stable identifier. Use it as the owner of records. It never changes."],
        ["`email`, `email_verified`", "The address, and whether the person has proved they own it."],
        ["`username`, `name`, `avatar_url`", "Profile fields the person can edit."],
        ["`user_metadata`", "Free-form data the person can see and edit."],
        ["`app_metadata`", "Free-form data only your server can change, so it is safe to base permissions on."],
        ["`roles`", "Named groups of permissions you assign."],
        ["`mfa_enabled`", "Whether a second step is turned on."],
        ["`identities`", "Linked sign-in methods, such as a Google account."],
        ["`created_at`, `last_sign_in_at`", "When the account was made and last used."],
      ] } },
      { p: "An **identity** is one way a user proves who they are: a password, a Google account or a company login. One user can have several, so the same person can sign in with a password today and Google tomorrow and end up in the same account." },
    ],
  },
  {
    title: "Sessions and tokens",
    blocks: [
      { p: "When someone signs in, Pawabase creates a **session**, which is one signed-in browser or device. A session has two tokens. The client library stores both, attaches the access token to requests and refreshes it quietly in the background, so your code never touches them." },
      { table: { head: ["Token", "Lives", "Used for"], rows: [
        ["Access token", "15 minutes by default", "Sent with every request to prove who is calling."],
        ["Refresh token", "30 days by default", "Traded for a fresh access token before the old one expires."],
      ] } },
      { p: "A refresh token works only once. Using it returns a new refresh token and invalidates the old one. If an old token is ever used again, Pawabase assumes it was stolen and ends the whole session. The client shares one refresh between requests and, in browsers, between tabs, so normal use never trips this rule." },
      { p: "The access token is a signed document listing facts about the caller: the user id, roles and permissions, the organization and organization role, the assurance level and the email. Because it is signed, the server trusts it without a database lookup. Because it is short-lived, a change such as a new role or a disabled account takes effect within minutes, or immediately if you end the person's sessions." },
      { list: [
        "**Access token lifetime** defaults to 900 seconds and can be as short as 60. A shorter lifetime makes changes apply sooner but costs a few more refreshes.",
        "**Refresh token lifetime** defaults to 30 days and means how long someone stays signed in without activity. Consumer apps suit 30 days, while banking apps use hours.",
        "**Sessions per user** can be limited, for paid seats or sensitive tools, so one account cannot be shared by a whole team. Over the limit, the oldest session ends.",
      ] },
    ],
  },
  {
    title: "Ways to sign in",
    blocks: [
      { p: "Offer the sign-in your users prefer and add more later. They all end in the same session, and one person can link several methods to one account." },
      { h3: "Email and password" },
      { p: "The classic method. It works everywhere and needs no extra setup. You choose whether anyone may register, whether a new account must verify its email first, and how the sign-up form is laid out. Sign-up either signs the person in at once or, when verification is required, returns `verificationRequired` so you can show \"check your inbox\"." },
      { h3: "Social providers" },
      { p: "People use an account they already have. You switch a provider on once, paste in the credentials from the provider's developer console and add a button. Pawabase ships Google, GitHub, Discord, Microsoft, GitLab, LinkedIn, Slack, Facebook, Twitch and Apple, and you can add your own OAuth server for anything else." },
      { h3: "Passkeys, codes and links" },
      { p: "A passkey replaces the password with something the device already has, such as a fingerprint, a face scan or a PIN. It cannot be phished and it syncs between a person's devices. Choose the passkey domain early, because it is the identity the device stores and changing it later makes existing passkeys stop working. You can also let people sign in with an emailed code or a sign-in link, and connect a company identity provider for larger customers." },
    ],
  },
  {
    title: "Handling errors safely",
    blocks: [
      { p: "A wrong password and an unknown email give the same `AuthenticationError`, on purpose, so nobody can find out which addresses have accounts. Keep your own messages just as neutral." },
      { table: { head: ["Error", "What it means for your form"], rows: [
        ["`AuthenticationError`", "Wrong email or password."],
        ["`PermissionError`", "The account cannot sign in right now, for example it is disabled or locked."],
        ["`ValidationError`", "A field is wrong. `fieldError(\"email\")` gives the message to show."],
        ["`ConflictError`", "On sign-up, that address already has an account."],
        ["`RateLimitError`", "Too many tries. Wait, and honour `retryAfter`."],
      ] } },
      { p: "Sign-up and sign-in share a rate limit per address, so never retry in a loop. Set `autocomplete` to `email`, `current-password` and `new-password` so password managers work, and allow paste. Prefer a long minimum length to complicated character rules, and never log or email passwords." },
    ],
  },
  {
    title: "Password policy",
    blocks: [
      { p: "The password policy decides what counts as acceptable. It applies when someone signs up, resets a password, changes it, or an administrator sets one. Existing passwords keep working until they are changed, so tightening the policy never locks anyone out." },
      { table: { head: ["Setting", "Meaning"], rows: [
        ["Minimum length", "From 6 to 128 characters. The default is 8."],
        ["Must contain", "Any of an uppercase letter, a lowercase letter, a number or a symbol."],
        ["Different characters", "At least this many distinct characters, so `aaaaaaaa1` does not pass."],
        ["Remember previous passwords", "A person cannot go back to one of their last few passwords."],
        ["Passwords expire after", "After this many days a person must choose a new one. Zero means never."],
        ["Refuse personal details", "Stops `ada2026` for Ada by checking the name, username and email."],
        ["Refuse breached passwords", "Checked with a range service, so only the first five characters of a hash leave your server."],
      ] } },
      { p: "If the breach service is unreachable, the password is accepted rather than blocking sign-up." },
    ],
  },
  {
    title: "Two-step verification",
    blocks: [
      { p: "Two-step verification asks for a second proof after the first: a six-digit code from an authenticator app such as 1Password, Google Authenticator or Authy, or sent by email. Even if a password leaks, the account stays safe." },
      { list: [
        "**Authenticator app** is on by default.",
        "**Email code** is convenient, and only as safe as the mailbox.",
        "**Backup codes** are shown once at enrolment for when the phone is lost. Ten are issued by default.",
      ] },
      { p: "You choose who must use it: nobody, administrators, or everyone. When it is required, a person without a second factor is walked through setting one up before they get a session. A completed second step raises the session from `aal1` to `aal2`, and an access rule can demand `aal2` for sensitive actions, so a stolen password alone is not enough." },
    ],
  },
  {
    title: "Attack protection",
    blocks: [
      { p: "Someone guessing passwords makes many wrong attempts in a row. Attack protection locks an account for a while after a run of failures, and a correct sign-in clears the count. A locked account refuses sign-in even with the right password until the lock ends. Locked accounts and recent failed sign-ins are listed so you can unlock someone or spot an attack." },
      { table: { head: ["App", "Failed attempts", "Lock"], rows: [
        ["Consumer app", "10", "15 minutes"],
        ["Business app", "5", "30 minutes"],
        ["High risk, such as finance or admin", "3", "60 minutes, plus two-step required"],
      ] } },
      { note: "Keep the message neutral: \"We couldn't sign you in. Try again later or reset your password.\" Telling an attacker that an account is locked confirms it exists. A long lock can also be abused to lock people out deliberately, so pair it with two-step verification and alerts." },
    ],
  },
  {
    title: "Organizations and roles",
    blocks: [
      { p: "If your customers are companies or teams rather than individuals, use **organizations**. A person can belong to several, with a different role in each. Your rules can then say \"members of this organization can edit this project\". Each organization has members, smaller teams inside it, and invitations for people who do not have accounts yet." },
      { table: { head: ["Organization role", "Typical power"], rows: [
        ["`viewer`", "Read only"],
        ["`member`", "Normal use"],
        ["`admin`", "Manage people and settings"],
        ["`owner`", "Everything, including deleting the organization"],
      ] } },
      { p: "Separately, a **role** is a named bundle of **permissions**, and you give people roles. A permission is a string of the form `resource:action`, where `*` is a wildcard, such as `posts:read`, `posts:*` or `*`. The names are yours, and Pawabase only matches strings, so a rule that checks for `editor` stays short and you can change what \"editor\" means in one place. Roles can also be granted automatically at sign-up." },
    ],
  },
  {
    title: "Keys, API keys and machines",
    blocks: [
      { p: "Separate from users, every request carries an API key that identifies your project. A **publishable key** (`pb_pk_…`) goes in client code and can only do what your public rules allow, and once a user signs in, requests are made as that user. A **secret key** (`pb_sk_…`) belongs on a trusted server and bypasses all rules, so never ship it." },
      { p: "When a script needs to call your API without a password, there are two options. A **user API key** acts as the person who made it, with their permissions or a subset. A **machine** is a caller that is not a person, such as a nightly job, a backend, a CI pipeline or an AI agent, with its own roles and its own keys." },
      { table: { head: ["", "User API key", "Machine"], rows: [
        ["Acts as", "The person who made it", "Itself"],
        ["If the person leaves", "The key stops", "Nothing changes"],
        ["Permissions", "A subset of the person's", "Its own roles and permissions"],
        ["Who creates it", "The person", "An administrator, with the secret key"],
        ["In logs and policies", "Looks like the person", "`actor.type` is `machine`"],
      ] } },
      { p: "Both are off until you enable them for an environment, and both limit how many keys exist and how long a key may live. A key's secret is shown once, so store it when you create it." },
    ],
  },
];

export default function AuthenticationPage() {
  return (
    <ProductArticle
      icon="users"
      name="Authentication"
      category="Access"
      description="Users, organizations, sessions and two-step verification, ready on launch day."
      intro="Authentication gives your app users, sessions and the security around them, without a service of your own to build. This page explains how users and tokens work, the ways people can sign in, and the controls that keep accounts safe."
      sections={SECTIONS}
      next={{ label: "Next: Access policies", href: "/products/policies" }}
    />
  );
}
