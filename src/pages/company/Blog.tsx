import {
  ArrowLink,
  CompanyHero,
  CompanySection,
  CompanyShell,
  SectionHeading,
} from "@/components/company/CompanyPage";

const CHANNELS = [
  {
    label: "Product",
    title: "What we ship, and why.",
    copy: "Release notes with the decisions behind them—not just a list of changes.",
    href: "https://github.com/Pawabase/pawabase/releases",
    action: "Follow releases",
  },
  {
    label: "Engineering",
    title: "Systems made understandable.",
    copy: "Notes on the architecture, tradeoffs, and small details behind a complete backend.",
    href: "https://github.com/Pawabase/pawabase",
    action: "Read the source",
  },
  {
    label: "Guides",
    title: "From idea to working software.",
    copy: "Practical paths through database, auth, storage, workflows, and operating the result.",
    href: "https://docs.sillo.build",
    action: "Open the docs",
  },
];

export default function BlogPage() {
  return (
    <CompanyShell
      title="Blog"
      description="Product updates, engineering notes, and practical guides from the people building Pawabase."
    >
      <CompanyHero
        label="Pawabase journal"
        icon="document"
        title="Notes from"
        quiet="the build."
        description="Product updates, engineering decisions, and useful lessons from building a backend that is meant to feel like one thing."
      />

      <CompanySection labelledBy="blog-start">
        <div className="grid gap-10 min-[860px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] min-[860px]:gap-16">
          <SectionHeading
            id="blog-start"
            label="The journal"
            title="The first stories are being written."
            description="Until they land here, the most current view of Pawabase lives in the code, releases, and documentation."
          />
          <div className="divide-y divide-line border-y border-line">
            {CHANNELS.map((channel) => (
              <article key={channel.label} className="py-7 min-[700px]:py-9">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">{channel.label}</p>
                <h3 className="mt-4 text-[24px] font-medium leading-[1.2] tracking-[-0.035em] text-text">{channel.title}</h3>
                <p className="mt-3 max-w-[55ch] text-[16px] leading-[1.68] text-muted">{channel.copy}</p>
                <div className="mt-6">
                  <ArrowLink href={channel.href} external>{channel.action}</ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </CompanySection>
    </CompanyShell>
  );
}
