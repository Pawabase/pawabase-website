import { createFileRoute } from "@tanstack/react-router";

import DataApiPage from "@/pages/products/DataApi";

export const Route = createFileRoute("/products/data-api")({ component: DataApiPage });
