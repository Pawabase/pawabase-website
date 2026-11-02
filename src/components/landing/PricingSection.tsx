import { PricingCards } from "@/components/pricing/PricingCards";

import { Band, Eyebrow, Lead, TextLink, Title } from "./Section";

export function PricingSection() {
  return (
    <Band
      id="pricing"
      labelledBy="pricing-title"
      wide
      className="py-[clamp(72px,9vw,128px)]"
    >
      <div data-reveal="up" className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
        <Eyebrow>Pricing</Eyebrow>
        <Title id="pricing-title" quiet="Start small. Keep the whole platform.">
          Pricing that scales with the work.
        </Title>
        <Lead className="max-w-[52ch]">
          Every plan includes data, auth, storage, email, realtime, workflows, background jobs, and the tools to run
          them.
        </Lead>
        <TextLink href="/pricing">Compare every limit</TextLink>
      </div>

      <div data-reveal="scale" className="mt-12 min-[900px]:mt-16">
        <PricingCards compact />
      </div>
    </Band>
  );
}
