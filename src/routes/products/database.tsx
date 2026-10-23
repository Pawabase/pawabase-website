import { createFileRoute } from "@tanstack/react-router";

import DatabasePage from "@/pages/products/Database";

export const Route = createFileRoute("/products/database")({ component: DatabasePage });
