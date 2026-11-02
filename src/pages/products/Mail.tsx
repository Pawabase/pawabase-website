import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "The emails your app needs",
    blocks: [
      { p: "Mail sends the emails your app needs: sign-in codes, receipts, invitations and notifications. Messages are queued as background jobs, so a slow provider never slows your app, and every message is logged. You design templates in Studio, connect your own email provider, and send from flows or by hand." },
      { p: "Everything is under **Services, Mail**. The sidebar has an Overview with delivered, failed, suppressed and scheduled counts over 7, 30 or 90 days, Templates, Compose to send or schedule an email now, Activity for every message, a Brand kit with your logo and colours, and Delivery for your provider." },
    ],
  },
  {
    title: "Setting up delivery",
    blocks: [
      { p: "Until delivery is set up, mail is recorded but not delivered, and the overview says so. Connect your provider once, then send yourself a test." },
      { steps: [
        "Open **Mail, Delivery**.",
        "Enter your provider's SMTP host, port, username, password and the From address.",
        "Save, then send a test to your own address.",
        "Check Activity. It should show as sent.",
      ] },
      { note: "Set up SPF and DKIM for your sending domain at your provider, or messages land in spam. Send from a domain you control." },
    ],
  },
  {
    title: "Templates",
    blocks: [
      { p: "Create a template with **Templates, New template**. Choose a prebuilt design or start blank, write the subject and preheader, then design the body. Insert variables such as `{{ order.id }}` and give each a sample so the preview looks real. Provide a plain-text version too, and publish. Drafts are not used for sending." },
      { table: { head: ["You write", "It does"], rows: [
        ["`{{ value }}`", "Substitutes a value. Unknown values render empty, so preview with samples."],
        ["`{% if %}`, `{% for %}`", "Logic inside the message."],
        ["`{{ name | upper }}`", "Filters that change how a value is shown."],
      ] } },
      { p: "Your **brand kit**, with your logo, colours and sender look, is used by every template, so messages look like they come from you without repeating the styling in each one." },
    ],
  },
  {
    title: "Sending",
    blocks: [
      { list: [
        "**From a flow.** Add the Send email block, choose the To address and the template, and map the data from earlier steps. Trigger the flow from an event subscription, so a receipt goes out when an order is paid.",
        "**By hand.** Use Compose to send an email now or schedule it.",
        "**Auth emails** such as codes, resets and invitations use the same provider, and you choose their wording separately.",
      ] },
      { p: "Because sending runs as a background job, you can wrap the Send email block in a retry so a short provider outage does not lose a receipt." },
    ],
  },
  {
    title: "The emails authentication sends",
    blocks: [
      { p: "Authentication sends nine kinds of email. Each uses Pawabase's default wording unless you pick a template of your own from your Mail library." },
      { table: { head: ["Message", "Sent when"], rows: [
        ["Confirm your email", "Right after sign-up, when email confirmation is on."],
        ["Sign-in link", "Someone asks for a link instead of typing a password."],
        ["Sign-in code", "Someone asks for a code to type instead of a link."],
        ["Reset your password", "Someone says they forgot their password."],
        ["Password changed", "After a password is changed, as a safety notice."],
        ["Verification code", "The code for a two-step sign-in sent by email."],
        ["New sign-in", "An account is signed in to from a device it has not used."],
        ["Confirm a new address", "Someone changes the email on their account."],
        ["Invitation", "A person is invited to an organization."],
      ] } },
    ],
  },
  {
    title: "Writing a good message",
    blocks: [
      { list: [
        "**One clear action.** A single button or code, with no extras.",
        "**Say who and why,** for example \"You asked to sign in to Acme.\"",
        "**Say what to do if it was not them.**",
        "**Keep the link or code prominent** and say how long it lasts.",
        "**Provide a plain-text version.**",
        "**Never put secrets in an email.** Links with short-lived tokens are the norm.",
      ] },
    ],
  },
  {
    title: "Checking delivery",
    blocks: [
      { p: "**Mail, Activity** shows each message as sent, failed or suppressed. In development environments mail may be suppressed on purpose, so real people are not emailed by accident. To test the real flow, request a sign-in link to yourself in a development environment and check Activity. Check for failures after every deploy." },
    ],
  },
];

export default function MailPage() {
  return (
    <ProductArticle
      icon="mail"
      name="Mail"
      category="Messaging"
      description="Transactional email from reusable templates, sent directly or from workflows."
      intro="Mail sends the emails your app needs, from templates you design in Studio, through your own provider. Messages are queued so they never slow your app, and every one is logged. This page covers delivery setup, templates, sending and the emails authentication sends."
      sections={SECTIONS}
      next={{ label: "Next: Webhooks", href: "/products/webhooks" }}
    />
  );
}
