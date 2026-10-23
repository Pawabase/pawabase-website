import { createFileRoute } from "@tanstack/react-router";

import CareersPage from "@/pages/company/Careers";

export const Route = createFileRoute("/company/careers")({ component: CareersPage });
