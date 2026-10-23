import { createFileRoute } from "@tanstack/react-router";

import QueuesPage from "@/pages/products/Queues";

export const Route = createFileRoute("/products/queues")({ component: QueuesPage });
