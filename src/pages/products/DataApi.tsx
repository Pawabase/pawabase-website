import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "code",
  name: "Data API",
  description: "A REST API for every table: filters, sorting, relations, search, pages, OpenAPI docs and side-by-side versions.",
  promise: "An API for every table.",
  line: "Create a table and call it straight away, with filters, relations, search and pages, documented as you build.",
  tiles: [
    {
      kind: "chips",
      icon: "code",
      title: "Ask for exactly what you need",
      line: "Filter, sort, expand, select and search in a single request.",
      chips: ["filter[status]=eq.paid", "sort=-created_at", "expand=customer", "select=id,total", "search=refund", "page=2&per_page=50"],
    },
    { kind: "solid", icon: "policies", title: "Safe to call from the browser", line: "Every request is checked against your access rules, on the server." },
    { kind: "word", icon: "database", word: "REST", title: "Five endpoints per table", line: "List, get, create, update and delete, each switched on or off." },
    {
      kind: "chips",
      icon: "apiSecurity",
      title: "Call it from anywhere",
      line: "SDKs for JavaScript and Python, or plain HTTP from any language.",
      chips: ["JavaScript SDK", "Python SDK", "Any HTTP client", "OpenAPI document", "API explorer"],
    },
  ],
  capabilities: [
    { icon: "search", title: "Filters and sorting", line: "Narrow and order results with readable query parameters." },
    { icon: "automation", title: "Relations in one call", line: "Bring related records along instead of making extra requests." },
    { icon: "document", title: "Full-text search", line: "Search across the text fields you choose." },
    { icon: "activity", title: "Pages", line: "Move through large tables without loading everything." },
    { icon: "code", title: "Documented as you build", line: "An OpenAPI document and an explorer that always match your tables." },
    { icon: "refresh", title: "Versions side by side", line: "Serve the next version of your API beside the current one." },
  ],
};

export default function DataApiPage() {
  return <ProductPage {...INFO} />;
}
