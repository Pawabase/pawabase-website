import { createFileRoute } from "@tanstack/react-router";

import FlowsPage from "@/pages/products/Flows";

export const Route = createFileRoute("/products/flows")({ component: FlowsPage });
