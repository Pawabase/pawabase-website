import { createFileRoute } from "@tanstack/react-router";

import BlogPage from "@/pages/company/Blog";

export const Route = createFileRoute("/blog")({ component: BlogPage });
