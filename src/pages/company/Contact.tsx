import {
  ArrowLink,
  COMPANY_EMAIL,
  CompanyHero,
  CompanySection,
  CompanyShell,
  SectionHeading,
} from "@/components/company/CompanyPage";

const CONTACTS = [
  {
    label: "Product and Cloud",
    copy: "Questions about using Pawabase, evaluating the platform, or running a project in the cloud.",
    subject: "Pawabase product question",
  },
  {
    label: "Partnerships",
    copy: "A collaboration, integration, community idea, or something useful we should build together.",
    subject: "Pawabase partnership",
  },
  {
    label: "Press and speaking",
    copy: "Interviews, events, podcasts, and thoughtful conversations about the future of backend software.",
    subject: "Pawabase press enquiry",
  },
];

export default function ContactPage() {
  return (
    <CompanyShell
      title="Contact"
      description="Contact the Pawabase team about the product, partnerships, press, or working together."
    >
      <CompanyHero
        label="Contact"
        icon="mail"
        title="Tell us what"
        quiet="you are building."
        description="Whether you are testing an idea, moving a production system, or want to work with us, send a note. A real person will read it."
      >
        <ArrowLink href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</ArrowLink>
      </CompanyHero>

      <CompanySection labelledBy="contact-paths">
        <SectionHeading
          id="contact-paths"
          label="Start here"
          title="Send it to the right conversation."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] bg-line min-[760px]:grid-cols-3">
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={`mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(contact.subject)}`}
              className="group flex min-h-[280px] flex-col justify-between bg-surface p-7 text-text no-underline transition-colors hover:bg-card min-[980px]:p-9"
            >
              <div>
                <h3 className="text-[21px] font-medium tracking-[-0.03em]">{contact.label}</h3>
                <p className="mt-4 text-[16px] leading-[1.68] text-muted">{contact.copy}</p>
              </div>
              <span className="mt-10 text-[15px] font-semibold transition-colors group-hover:text-brand">Write to us →</span>
            </a>
          ))}
        </div>
        <p className="mt-8 text-[14px] leading-[1.65] text-faint">
          For bugs and feature requests, send the team a short note with what
          happened and the project you were working in.
          {" "}
          <a className="text-muted underline decoration-line underline-offset-4 hover:text-text" href={`mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Pawabase product feedback")}`}>
            Send feedback
          </a>
          .
        </p>
      </CompanySection>
    </CompanyShell>
  );
}
