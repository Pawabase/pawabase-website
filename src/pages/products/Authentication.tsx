import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "users",
  name: "Authentication",
  description: "Email, passkeys, social and company sign-in, two-step verification, organizations, roles, invitations and sessions.",
  promise: "Sign-in for your app, done properly.",
  line: "Passwords, codes, passkeys and social sign-in, with organizations, roles and sessions included.",
  tiles: [
    {
      kind: "chips",
      icon: "users",
      title: "Every way to sign in",
      line: "Turn on the ones your users expect.",
      chips: ["Email and password", "Email code", "Magic link", "Passkeys", "Guests", "Google", "Apple", "GitHub", "Microsoft", "Discord", "GitLab", "LinkedIn", "Slack", "Facebook", "Twitch"],
    },
    { kind: "solid", icon: "policies", title: "Two-step verification", line: "Authenticator apps and backup codes for accounts that need more." },
    { kind: "word", icon: "users", word: "ORGS", title: "Organizations built in", line: "Teams, roles and invitations for business apps." },
    {
      kind: "chips",
      icon: "apiSecurity",
      title: "Company sign-in",
      line: "Let businesses sign in with their own identity provider.",
      chips: ["SAML", "OIDC", "Session control", "Device list", "Password rules"],
    },
  ],
  capabilities: [
    { icon: "users", title: "Social sign-in", line: "Ten providers, ready once you add your keys." },
    { icon: "apiSecurity", title: "Passkeys", line: "Sign in with a fingerprint or a face, no password to forget." },
    { icon: "document", title: "Organizations and roles", line: "Group users into teams with the roles you define." },
    { icon: "mail", title: "Invitations", line: "Bring people into an organization by email." },
    { icon: "activity", title: "Sessions and devices", line: "See where people are signed in, and sign them out." },
    { icon: "code", title: "API keys for your users", line: "Let your users call your API with keys of their own." },
  ],
};

export default function AuthenticationPage() {
  return <ProductPage {...INFO} />;
}
