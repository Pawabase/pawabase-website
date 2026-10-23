import { createFileRoute } from "@tanstack/react-router";

import StoragePage from "@/pages/products/Storage";

export const Route = createFileRoute("/products/storage")({ component: StoragePage });
