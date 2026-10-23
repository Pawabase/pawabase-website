import { createFileRoute } from "@tanstack/react-router";

import MailPage from "@/pages/products/Mail";

export const Route = createFileRoute("/products/mail")({ component: MailPage });
