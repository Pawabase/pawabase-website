import { Icon, type IconName } from "@/components/Icon";
import { CompanyHero, CompanySection, CompanyShell, SectionHeading } from "@/components/company/CompanyPage";

const CHANNELS: { icon: IconName; title: string; copy: string; href: string; action: string }[] = [
  { icon: "sparkle", title: "What we ship, and why", copy: "Release notes with the decisions behind them.", href: "https://app.pawabase.com", action: "Try Pawabase" },
  { icon: "code", title: "How it's built", copy: "Notes on the system and the choices behind it.", href: "/products/observability", action: "See observability" },
  { icon: "document", title: "From idea to working app", copy: "Practical guides through data, auth, storage, flows and agents.", href: "https://docs.sillo.build", action: "Open the docs" },
];

export default function BlogPage() {
  return (
    <CompanyShell title="Blog" description="Product updates and engineering notes from the people building Pawabase.">
      <CompanyHero title="Notes from" quiet="the build." description="Product updates and engineering notes from the people building Pawabase." />

      <CompanySection labelledBy="blog-start">
        <SectionHeading id="blog-start" title="The first stories are being written" description="Until they land here, the product and the docs are the best way in." />
        <div className="sp-cards">
          {CHANNELS.map((c) => (
            <a key={c.title} href={c.href} className="sp-card" {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
              <span className="sp-card-icon"><Icon name={c.icon} size={20} variant="Linear" /></span>
              <span>
                <h3>{c.title}</h3>
                <p>{c.copy}</p>
              </span>
              <span className="sp-go">{c.action} <Icon name="arrowRight" size={15} /></span>
            </a>
          ))}
        </div>
      </CompanySection>
    </CompanyShell>
  );
}
