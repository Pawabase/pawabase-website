import { AgentsSection } from "@/components/landing/AgentsSection";
import { CapabilityBoard } from "@/components/landing/CapabilityBoard";
import { CloudSection } from "@/components/landing/CloudSection";
import { ConnectSection } from "@/components/landing/ConnectSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { FrontendsSection } from "@/components/landing/FrontendsSection";
import { Junctions } from "@/components/landing/Junctions";
import { Hero } from "@/components/landing/Hero";
import { Mission, Pledge } from "@/components/landing/Mission";
import { PlatformStack } from "@/components/landing/PlatformStack";
import { PricingSection } from "@/components/landing/PricingSection";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { StepsSection } from "@/components/landing/StepsSection";
import { TopBar } from "@/components/landing/TopBar";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  usePageMeta,
} from "@/hooks/usePageMeta";

export default function Landing() {
  usePageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION);

  return (
    <div className="min-h-screen bg-shell">
      <div className="relative min-h-screen overflow-clip bg-shell">
        <ScrollMotion />
        <TopBar />
        <main className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[min(calc(100%-32px),1320px)] -translate-x-1/2 border-x border-line"
          />
          <Hero />
          <div className="relative border-t border-line">
            <Junctions />
            <FeatureBento />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <Mission />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <Pledge />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <CapabilityBoard />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <PlatformStack />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <StepsSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <ConnectSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <AgentsSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <FrontendsSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <CloudSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <PricingSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <FaqSection />
          </div>
          <div className="relative border-t border-line">
            <Junctions />
            <FinalCta />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
