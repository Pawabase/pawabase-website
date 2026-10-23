import {
  ArrowLink,
  COMPANY_EMAIL,
  CompanyHero,
  CompanySection,
  CompanyShell,
  SectionHeading,
} from "@/components/company/CompanyPage";

const VALUES = [
  ["Own the whole outcome", "We care about the working experience, not the boundary of a job description."],
  ["Write it down", "Clear thinking scales. Decisions, tradeoffs, and context should be easy to find."],
  ["Keep the system legible", "We choose understandable designs and leave the codebase easier to reason about."],
  ["Stay close to builders", "The shortest path to a better product is watching real people use it."],
];

export default function CareersPage() {
  return (
    <CompanyShell
      title="Careers"
      description="Work with Pawabase on open, understandable backend infrastructure for ambitious product teams."
    >
      <CompanyHero
        label="Careers"
        icon="users"
        title="Small team."
        quiet="Wide surface area."
        description="We are building database, identity, storage, automation, and operations as one product. That takes people who enjoy connecting deep technical work to a simple user experience."
      >
        <ArrowLink href={`mailto:${COMPANY_EMAIL}?subject=Working%20with%20Pawabase`}>
          Introduce yourself
        </ArrowLink>
      </CompanyHero>

      <CompanySection labelledBy="careers-way">
        <SectionHeading
          id="careers-way"
          label="The work"
          title="Depth without losing the whole picture."
          description="The best work here crosses layers: an infrastructure decision changes an API, the API changes the Studio, and the Studio changes how a builder understands their system."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] bg-line min-[680px]:grid-cols-2">
          {VALUES.map(([title, copy]) => (
            <article key={title} className="bg-surface p-7 min-[900px]:p-9">
              <h3 className="text-[20px] font-medium tracking-[-0.03em] text-text">{title}</h3>
              <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.68] text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </CompanySection>

      <CompanySection labelledBy="careers-openings">
        <div className="grid gap-12 min-[860px]:grid-cols-[minmax(0,0.8fr)_minmax(320px,1.2fr)] min-[860px]:gap-20">
          <SectionHeading
            id="careers-openings"
            label="Open roles"
            title="No role fits neatly yet."
            description="We are not listing formal openings at the moment, but thoughtful introductions are always welcome. Tell us what you are unusually good at, what you want to build, and show us work you care about."
          />
          <a
            href={`mailto:${COMPANY_EMAIL}?subject=Working%20with%20Pawabase`}
            className="group flex min-h-[260px] flex-col justify-between rounded-[22px] border border-line bg-card p-7 text-text no-underline transition-colors hover:border-brand/50 min-[700px]:p-9"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand">Open application</span>
            <span>
              <span className="block text-[26px] font-medium tracking-[-0.04em]">Start a conversation</span>
              <span className="mt-3 block text-[16px] leading-[1.65] text-muted">{COMPANY_EMAIL}</span>
              <span className="mt-6 inline-block text-[15px] font-semibold group-hover:text-brand">Write to us →</span>
            </span>
          </a>
        </div>
      </CompanySection>
    </CompanyShell>
  );
}
