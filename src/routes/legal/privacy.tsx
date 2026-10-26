import { createFileRoute } from "@tanstack/react-router";

import PrivacyPage from "@/pages/legal/Privacy";

export const Route = createFileRoute("/legal/privacy")({ component: PrivacyPage });
