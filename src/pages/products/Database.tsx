import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "database",
  name: "Database",
  description: "Postgres tables with an API, access rules, an editor, relations, vector search and safe schema changes.",
  promise: "Tables that are ready to use.",
  line: "Real Postgres tables, each with an API, access rules and an editor from the moment you create it.",
  tiles: [
    {
      kind: "chips",
      icon: "database",
      title: "Sixteen field types",
      line: "From short text to vectors, with every value checked on every write.",
      chips: ["Text", "Long text", "Whole number", "Decimal", "Yes or no", "Date", "Date and time", "Email", "URL", "JSON", "List", "Object", "UUID", "ULID", "Vector"],
    },
    { kind: "solid", icon: "storage", title: "Postgres underneath", line: "Use the database we run for you, or bring your own Postgres." },
    { kind: "word", icon: "search", word: "SQL", title: "SQL when you want it", line: "Query any table and save the queries you use often." },
    {
      kind: "chips",
      icon: "refresh",
      title: "Change your schema safely",
      line: "See what every change will do before it runs.",
      chips: ["Preview before it runs", "Migration history", "Reversible table drops", "Indexes", "Import existing tables"],
    },
  ],
  capabilities: [
    { icon: "database", title: "An editor for your rows", line: "Browse, filter and edit data without writing a query." },
    { icon: "code", title: "An API for every table", line: "Each table is ready to call from your app, with access rules applied." },
    { icon: "automation", title: "Relations", line: "Link records across tables and fetch them together in one call." },
    { icon: "search", title: "Vector search", line: "Keep embeddings beside your data and find similar records." },
    { icon: "activity", title: "Indexes", line: "Keep lookups fast as your tables grow." },
    { icon: "refresh", title: "Data per environment", line: "Development, staging and production never share data." },
  ],
};

export default function DatabasePage() {
  return <ProductPage {...INFO} />;
}
