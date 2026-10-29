import { createFileRoute } from "@tanstack/react-router";

import TermsPage from "@/pages/legal/Terms";

export const Route = createFileRoute("/legal/terms")({ component: TermsPage });
