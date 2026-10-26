import { Footer } from "@/components/landing/Footer";
import { PrimaryButton } from "@/components/landing/PrimaryButton";
import { TextLink } from "@/components/landing/Section";
import { TopBar } from "@/components/landing/TopBar";
import { PricingCards } from "@/components/pricing/PricingCards";
import { CurrencyPicker } from "@/components/pricing/CurrencyPicker";
import { usePlans } from "@/hooks/usePlans";
import { useCurrency } from "@/lib/currency";
import { Icon } from "@/components/Icon";
import { usePageMeta } from "@/hooks/usePageMeta";

function CompareTable() {
  const { plans: PLANS, metrics: PRICING_METRICS } = usePlans();
  const { show } = useCurrency();
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-card ring-1 ring-white/[0.05]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-white/[0.12]" />
      <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left">
        <caption className="sr-only">Pawabase Cloud plan limits</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[29%] border-b border-white/[0.08] bg-white/[0.025] px-6 py-6 text-[13px] font-medium text-muted">
              Included capacity
            </th>
            {PLANS.map((plan, index) => (
              <th key={plan.name} scope="col" className={`border-b border-white/[0.08] px-5 py-6 text-[15px] font-medium tracking-[-0.02em] ${index > 0 ? "border-l border-white/[0.055]" : ""} ${plan.featured ? "bg-brand/[0.075] text-brand" : "bg-white/[0.025] text-text"}`}>
                <span className="block">{plan.name}</span>
                <span className={`mt-1 block text-[12px] font-normal ${plan.featured ? "text-brand/70" : "text-faint"}`}>{show(Number(plan.price))}/mo</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRICING_METRICS.map((metric) => (
            <tr key={metric.label}>
              <th scope="row" className="border-b border-white/[0.055] px-6 py-4 text-[14px] font-medium tracking-[-0.01em] text-text last:border-b-0">
                {metric.label}
                {metric.note ? <span className="mt-1 block text-[12px] font-normal leading-[1.4] text-faint">{metric.note}</span> : null}
              </th>
              {metric.values.map((value, index) => (
                <td key={`${metric.label}-${PLANS[index].name}`} className={`border-b border-white/[0.055] px-5 py-4 text-[14px] ${index > 0 ? "border-l border-white/[0.055]" : ""} ${PLANS[index].featured ? "bg-brand/[0.045] text-text" : "text-muted"}`}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default function PricingPage() {
  usePageMeta(
    "Pricing | Pawabase",
    "Straightforward Pawabase Cloud pricing for projects of every size.",
  );

  return (
    <div className="min-h-screen bg-shell">
      <a href="#pricing-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-text focus:px-4 focus:py-2 focus:text-shell">
        Skip to content
      </a>
      <div className="relative min-h-screen overflow-clip bg-shell">
        <TopBar />
        <main id="pricing-content">
          <section data-plain className="relative overflow-hidden border-b border-line-subtle">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_65%_20%,black,transparent_68%)]" />
            <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-5 pb-[clamp(72px,10vw,132px)] pt-[clamp(76px,10vw,132px)] min-[768px]:px-10 min-[980px]:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.7fr)] min-[980px]:items-end">
              <div>
                <p className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-muted">
                  <Icon name="sparkle" size={20} variant="Bulk" className="text-brand" />
                  Pawabase Cloud pricing
                </p>
                <h1 className="mt-7 max-w-[920px] text-[clamp(50px,7vw,94px)] font-normal leading-[0.98] tracking-[-0.062em] text-text text-balance">
                  The platform you need.
                  <span className="block text-muted">A plan that fits today.</span>
                </h1>
              </div>
              <div className="min-[980px]:pb-2">
                <p className="max-w-[46ch] text-[18px] leading-[1.68] tracking-[-0.01em] text-muted">
                  Start free, move when your product does, and keep the same connected backend from first prototype to serious scale.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4">
                  <PrimaryButton href="https://app.pawabase.com" target="_blank" rel="noreferrer" className="inline-flex">
                    Start a project
                    <Icon name="arrowRight" size={17} />
                  </PrimaryButton>
                  <TextLink href="https://docs.sillo.build">Read the docs</TextLink>
                </div>
              </div>
            </div>
          </section>

          <section data-plain aria-labelledby="plans-title" className="border-b border-line-subtle py-[clamp(72px,9vw,120px)]">
            <div className="mx-auto w-full max-w-[1240px] px-5 min-[768px]:px-10">
              <div className="max-w-[720px]">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">Cloud plans</p>
                <h2 id="plans-title" className="mt-5 text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.05] tracking-[-0.052em] text-text text-balance">
                  Everything stays connected at every level.
                </h2>
              </div>
              <div className="mt-8"><CurrencyPicker /></div>
              <div className="mt-6">
                <PricingCards />
              </div>
            </div>
          </section>

          <section data-plain aria-labelledby="compare-title" className="border-b border-line-subtle py-[clamp(72px,9vw,120px)]">
            <div className="mx-auto w-full max-w-[1240px] px-5 min-[768px]:px-10">
              <div className="grid gap-7 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(320px,0.55fr)] min-[900px]:items-end">
                <div>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">Compare plans</p>
                  <h2 id="compare-title" className="mt-5 text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.05] tracking-[-0.052em] text-text text-balance">
                    Clear limits. No hidden platform pieces.
                  </h2>
                </div>
                <p className="max-w-[42ch] text-[17px] leading-[1.7] tracking-[-0.01em] text-muted">
                  Pick the capacity that matches your current workload. Your APIs, workflows, and data model stay the same as you grow.
                </p>
              </div>
              <div className="mt-12">
                <CompareTable />
              </div>
              <p className="mt-5 text-[13px] leading-[1.6] text-faint">
                Email limits cover transactional and product email sent through Pawabase Cloud. Need a plan beyond Scale? Contact us.
              </p>
            </div>
          </section>

          <section data-plain className="py-[clamp(76px,10vw,132px)]">
            <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 min-[768px]:px-10 min-[850px]:grid-cols-[minmax(0,1fr)_auto] min-[850px]:items-end">
              <div>
                <h2 className="max-w-[720px] text-[clamp(38px,4.7vw,66px)] font-normal leading-[1.04] tracking-[-0.052em] text-text text-balance">
                  Start with the work in front of you.
                </h2>
                <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-muted">
                  Build the first version, then grow without moving to a different backend.
                </p>
              </div>
              <PrimaryButton href="https://app.pawabase.com" target="_blank" rel="noreferrer" className="inline-flex">
                Create a project
                <Icon name="arrowRight" size={17} />
              </PrimaryButton>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
