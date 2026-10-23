import { createFileRoute } from "@tanstack/react-router";

import ContactPage from "@/pages/company/Contact";

export const Route = createFileRoute("/company/contact")({ component: ContactPage });
