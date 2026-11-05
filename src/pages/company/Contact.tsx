import { Icon, type IconName } from "@/components/Icon";
import { ArrowLink, COMPANY_EMAIL, CompanyHero, CompanySection, CompanyShell, SectionHeading } from "@/components/company/CompanyPage";

const CONTACTS: { icon: IconName; label: string; copy: string; subject: string }[] = [
  { icon: "sparkle", label: "Product and Cloud", copy: "Using Pawabase, trying it out, or running a project on Pawabase Cloud.", subject: "Pawabase product question" },
  { icon: "users", label: "Partnerships", copy: "An integration, a collaboration, or something useful we could build together.", subject: "Pawabase partnership" },
  { icon: "document", label: "Press and speaking", copy: "Interviews, events, podcasts and conversations about how software gets built.", subject: "Pawabase press enquiry" },
];

export default function ContactPage() {
  return (
    <CompanyShell title="Contact" description="Contact the Pawabase team about the product, partnerships, press, or working together.">
      <CompanyHero
        title="Tell us what"
        quiet="you're building."
        description="Testing an idea, moving a live system, or want to work with us? Send a note. A person will read it."
      >
        <ArrowLink href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</ArrowLink>
      </CompanyHero>

      <CompanySection labelledBy="contact-paths">
        <SectionHeading id="contact-paths" title="Pick the right conversation" />
        <div className="sp-cards">
          {CONTACTS.map((c) => (
            <a key={c.label} href={`mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(c.subject)}`} className="sp-card">
              <span className="sp-card-icon"><Icon name={c.icon} size={20} variant="Linear" /></span>
              <span>
                <h3>{c.label}</h3>
                <p>{c.copy}</p>
              </span>
              <span className="sp-go">Write to us <Icon name="arrowRight" size={15} /></span>
            </a>
          ))}
        </div>
        <p className="sp-footnote" style={{ marginTop: 24 }}>
          Found a bug or want a feature? Send a short note with what happened and the project you were in.{" "}
          <a href={`mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Pawabase product feedback")}`} className="ix-link">Send feedback</a>
        </p>
      </CompanySection>
    </CompanyShell>
  );
}
