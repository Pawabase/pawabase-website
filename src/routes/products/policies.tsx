import { createFileRoute } from "@tanstack/react-router";

import PoliciesPage from "@/pages/products/Policies";

export const Route = createFileRoute("/products/policies")({ component: PoliciesPage });
