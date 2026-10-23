import { createFileRoute } from "@tanstack/react-router";

import RealtimePage from "@/pages/products/Realtime";

export const Route = createFileRoute("/products/realtime")({ component: RealtimePage });
