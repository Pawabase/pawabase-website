import { createFileRoute } from "@tanstack/react-router";

import AcceptableUsePage from "@/pages/legal/AcceptableUse";

export const Route = createFileRoute("/legal/acceptable-use")({ component: AcceptableUsePage });
