import { createFileRoute } from "@tanstack/react-router";

import ObservabilityPage from "@/pages/products/Observability";

export const Route = createFileRoute("/products/observability")({ component: ObservabilityPage });
