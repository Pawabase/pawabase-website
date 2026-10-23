import { createFileRoute } from "@tanstack/react-router";

import AboutPage from "@/pages/company/About";

export const Route = createFileRoute("/company/")({ component: AboutPage });
