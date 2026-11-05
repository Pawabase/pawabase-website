import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "mail",
  name: "Mail",
  description: "Transactional email with a visual template editor, sign-in emails, sends from flows, a delivery log and retries over your own SMTP.",
  promise: "Email your app sends, designed and tracked.",
  line: "Design templates in a visual editor, send them from flows, and see every message that went out.",
  tiles: [
    {
      kind: "chips",
      icon: "mail",
      title: "Every email your app sends",
      line: "Sign-in emails are ready; add your own for everything else.",
      chips: ["Sign-in codes", "Magic links", "Password resets", "Invitations", "Receipts", "Alerts"],
    },
    { kind: "solid", icon: "activity", title: "A log of every message", line: "See what was sent, what failed, and send it again." },
    { kind: "word", icon: "document", word: "MAIL", title: "A visual editor", line: "Design emails without hand-writing HTML." },
    {
      kind: "chips",
      icon: "apiSecurity",
      title: "Your provider, your domain",
      line: "Send through the SMTP service you already use.",
      chips: ["Any SMTP service", "Settings per environment", "Live preview"],
    },
  ],
  capabilities: [
    { icon: "document", title: "Visual templates", line: "Build emails from blocks, in your brand." },
    { icon: "code", title: "Your data in every email", line: "Fill templates with names, totals and links." },
    { icon: "users", title: "Sign-in emails included", line: "Codes, links and invitations, ready to make your own." },
    { icon: "automation", title: "Send from flows", line: "Any flow can send an email as one of its steps." },
    { icon: "activity", title: "Delivery log", line: "Every message and its status, in one place." },
    { icon: "refresh", title: "Send again", line: "Retry a failed message in one click." },
  ],
};

export default function MailPage() {
  return <ProductPage {...INFO} />;
}
