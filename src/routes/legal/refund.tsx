import { createFileRoute } from "@tanstack/react-router";

import RefundPage from "@/pages/legal/Refund";

export const Route = createFileRoute("/legal/refund")({ component: RefundPage });
