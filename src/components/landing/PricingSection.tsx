import { PricingCards } from "@/components/pricing/PricingCards";

import { Band, Lead, TextLink, Title } from "./Section";

export function PricingSection() {
  return (
    <Band
      id="pricing"
      labelledBy="pricing-title"
      wide
      className="border-t border-line py-[clamp(80px,10vw,140px)]"
    >
      <div className="grid gap-8 min-[900px]:grid-cols-[minmax(0,0.78fr)_minmax(320px,0.5fr)] min-[900px]:items-end">
        <div data-reveal="left">
          <Title id="pricing-title" quiet="Start small. Keep the whole platform.">
            Pricing that scales with the work.
          </Title>
        </div>
        <div data-reveal="right" className="min-[900px]:pb-1">
          <Lead className="text-[17px]">
            Every plan includes data, auth, storage, email, realtime, workflows,
            background jobs, and the tools to run them.
          </Lead>
          <TextLink href="/pricing" className="mt-6">Compare every limit</TextLink>
        </div>
      </div>

      <div data-reveal="scale" className="mt-12 min-[900px]:mt-16">
        <PricingCards compact />
      </div>
    </Band>
  );
}
