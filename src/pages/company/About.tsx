import { Icon } from "@/components/Icon";
import {
  ArrowLink,
  CompanyCta,
  CompanyHero,
  CompanySection,
  CompanyShell,
  SectionHeading,
} from "@/components/company/CompanyPage";

const PRINCIPLES = [
  {
    number: "01",
    title: "Make the hard parts visible.",
    copy: "Infrastructure should explain itself. Clear states, useful errors, and inspectable systems beat magic that disappears when something breaks.",
  },
  {
    number: "02",
    title: "Start complete, stay composable.",
    copy: "The essentials should work together on day one, while every layer remains open enough to replace, extend, or operate yourself.",
  },
  {
    number: "03",
    title: "Build for the small team.",
    copy: "A focused team should be able to ship ambitious software without first becoming an infrastructure department.",
  },
];

export default function AboutPage() {
  return (
    <CompanyShell
      title="About"
      description="Pawabase is building a complete, open backend so small teams can move from idea to launch without assembling the same infrastructure again."
    >
      <CompanyHero
        label="About Pawabase"
        title="Software should begin with the idea."
        quiet="Not the plumbing."
        description="Pawabase brings the backend pieces every product needs into one coherent system—so builders can spend their attention on what makes their product different."
      >
        <ArrowLink href="https://github.com/Pawabase/pawabase" external>
          See what we are building
        </ArrowLink>
      </CompanyHero>

      <CompanySection labelledBy="company-reason">
        <div className="grid gap-12 min-[900px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] min-[900px]:gap-20">
          <SectionHeading id="company-reason" label="The reason" title="The same backend, rebuilt for every new idea." />
          <div className="space-y-7 text-[18px] leading-[1.75] tracking-[-0.01em] text-muted">
            <p>
              A database becomes an API. The API needs authentication. Then
              storage, background jobs, email, webhooks, logs, environments,
              and the tools to understand all of it. The first version of a
              product can disappear beneath work that has already been solved.
            </p>
            <p>
              Pawabase is our answer: a product-first backend where those
              systems arrive connected, understandable, and ready to shape.
              Run it yourself or use Pawabase Cloud. Either way, the code and
              the data stay yours.
            </p>
          </div>
        </div>
      </CompanySection>

      <CompanySection labelledBy="company-principles">
        <SectionHeading
          id="company-principles"
          label="How we build"
          title="A few principles keep the work honest."
        />
        <ol className="mt-14 grid border-t border-line min-[760px]:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.number}
              className={`py-8 min-[760px]:px-8 min-[760px]:py-10 ${index > 0 ? "border-t border-line min-[760px]:border-l min-[760px]:border-t-0" : ""}`}
            >
              <span className="font-mono text-[12px] text-brand">{principle.number}</span>
              <h3 className="mt-8 text-[22px] font-medium leading-[1.2] tracking-[-0.035em] text-text">
                {principle.title}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-muted">
                {principle.copy}
              </p>
            </li>
          ))}
        </ol>
      </CompanySection>

      <CompanySection labelledBy="company-open">
        <div className="rounded-[24px] bg-card p-6 ring-1 ring-white/[0.05] min-[700px]:p-10 min-[980px]:p-14">
          <div className="grid gap-10 min-[860px]:grid-cols-[minmax(0,1fr)_minmax(300px,0.65fr)] min-[860px]:items-end">
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon name="code" size={23} variant="Bulk" />
              </span>
              <h2 id="company-open" className="mt-8 text-[clamp(34px,4vw,54px)] font-normal leading-[1.06] tracking-[-0.05em] text-text text-balance">
                Open source is not a side project.
              </h2>
            </div>
            <div>
              <p className="text-[17px] leading-[1.7] text-muted">
                It is how Pawabase stays inspectable and portable. Read the
                implementation, report what feels rough, or help make the next
                release better.
              </p>
              <div className="mt-7">
                <ArrowLink href="https://github.com/Pawabase/pawabase" external>
                  Explore Pawabase on GitHub
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </CompanySection>

      <CompanyCta
        title="There is a lot left to build."
        description="Follow the work, try Pawabase, or come help us shape a calmer way to build software."
        href="/company/careers"
        label="Work with us"
      />
    </CompanyShell>
  );
}
