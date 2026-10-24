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
        <div>
          <Title id="pricing-title" quiet="Start small. Keep the whole platform.">
            Pricing that scales with the work.
          </Title>
        </div>
        <div className="min-[900px]:pb-1">
          <Lead className="text-[17px]">
            Every plan includes the connected backend: database, auth, storage,
            realtime, flows, and the tools to operate them.
          </Lead>
          <TextLink href="/pricing" className="mt-6">Compare every limit</TextLink>
        </div>
      </div>

      <div className="mt-12 min-[900px]:mt-16">
        <PricingCards compact />
      </div>
    </Band>
  );
}
