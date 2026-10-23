import { createFileRoute } from "@tanstack/react-router";

import WebhooksPage from "@/pages/products/Webhooks";

export const Route = createFileRoute("/products/webhooks")({ component: WebhooksPage });
