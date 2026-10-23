import { createFileRoute } from "@tanstack/react-router";

import ApiSecurityPage from "@/pages/products/ApiSecurity";

export const Route = createFileRoute("/products/api-security")({ component: ApiSecurityPage });
