import { createFileRoute } from "@tanstack/react-router";

import DpaPage from "@/pages/legal/Dpa";

export const Route = createFileRoute("/legal/dpa")({ component: DpaPage });
