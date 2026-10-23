import { createFileRoute } from "@tanstack/react-router";

import ReleasesPage from "@/pages/products/Releases";

export const Route = createFileRoute("/products/releases")({ component: ReleasesPage });
