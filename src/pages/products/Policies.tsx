import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "policies",
  name: "Access policies",
  description: "Named access rules reused across tables, files, channels, flows and routes, enforced in the database.",
  promise: "Write who can see what, once.",
  line: "Named rules you attach to tables, files, flows and routes, checked on every request.",
  tiles: [
    {
      kind: "chips",
      icon: "policies",
      title: "Rules in plain terms",
      line: "Start from the common cases, or combine your own conditions.",
      chips: ["Anyone", "Signed-in users", "The record's owner", "A role", "Same organization"],
    },
    { kind: "solid", icon: "database", title: "Filtered in the database", line: "Lists only return the rows a caller may see, so pages stay correct." },
    { kind: "word", icon: "refresh", word: "ONCE", title: "One rule, many places", line: "Change a rule once and everything using it follows." },
    {
      kind: "chips",
      icon: "automation",
      title: "Combine conditions",
      line: "All of, any of or none of, grouped as deep as you need.",
      chips: ["All of", "Any of", "None of", "Compare values", "Groups"],
    },
  ],
  capabilities: [
    { icon: "policies", title: "Named rules", line: "Give a rule a name and use it anywhere." },
    { icon: "database", title: "Per-action access", line: "Different rules for listing, reading, creating, editing and deleting." },
    { icon: "users", title: "Roles", line: "Grant access by role, from admins to guests." },
    { icon: "code", title: "Ownership", line: "Let people work with only their own records." },
    { icon: "apiSecurity", title: "People and machines", line: "Rules can tell users apart from services and agents." },
    { icon: "storage", title: "Files and channels too", line: "The same rules guard buckets and realtime channels." },
  ],
};

export default function PoliciesPage() {
  return <ProductPage {...INFO} />;
}
