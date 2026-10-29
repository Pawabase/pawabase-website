import { createFileRoute } from "@tanstack/react-router";

import CookiesPage from "@/pages/legal/Cookies";

export const Route = createFileRoute("/legal/cookies")({ component: CookiesPage });
