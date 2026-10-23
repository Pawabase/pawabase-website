import { createFileRoute } from "@tanstack/react-router";

import AuthenticationPage from "@/pages/products/Authentication";

export const Route = createFileRoute("/products/authentication")({ component: AuthenticationPage });
