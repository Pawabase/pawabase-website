import { Icon } from "@/components/Icon";
import { PrimaryButton } from "@/components/landing/PrimaryButton";

import { useCurrency } from "@/lib/currency";
import { usePlans } from "@/hooks/usePlans";

const APP_URL = "https://app.pawabase.com";

export function PricingCards({ compact = false }: { compact?: boolean }) {
  const { plans } = usePlans();
  const { show } = useCurrency();
  return (
    <div className={`grid gap-4 ${compact ? "min-[760px]:grid-cols-2 min-[1160px]:grid-cols-5" : "min-[680px]:grid-cols-2 min-[1100px]:grid-cols-5"}`}>
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`relative flex min-w-0 flex-col overflow-hidden rounded-[24px] p-6 ring-1 min-[768px]:p-7 ${
            plan.featured
              ? "bg-warm ring-brand/45"
              : "bg-card ring-white/[0.05]"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 h-px ${plan.featured ? "bg-brand" : "bg-white/[0.12]"}`}
          />
          {plan.featured ? (
            <span className="absolute right-6 top-6 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand min-[768px]:right-7 min-[768px]:top-7">
              Popular
            </span>
          ) : null}
          <h3 className="text-[21px] font-medium tracking-[-0.035em] text-text">
            {plan.name}
          </h3>
          <p className="mt-3 min-h-[66px] text-[15px] leading-[1.55] tracking-[-0.01em] text-muted">
            {plan.description}
          </p>
          <div className="mt-7 flex items-end gap-1 border-b border-white/[0.08] pb-6">
            <span className={`font-medium leading-none tracking-[-0.065em] text-text ${show(Number(plan.price)).length > 8 ? "text-[34px]" : "text-[50px]"}`}>
              {show(Number(plan.price))}
            </span>
            <span className="mb-1.5 text-[13px] text-muted">/ month</span>
          </div>
          <ul className="mt-6 space-y-3.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-[13.5px] leading-[1.45] text-muted">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {feature}
              </li>
            ))}
          </ul>
          <PrimaryButton
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex w-full px-4"
          >
            Get started
            <Icon name="arrowRight" size={15} />
          </PrimaryButton>
        </article>
      ))}
    </div>
  );
}
