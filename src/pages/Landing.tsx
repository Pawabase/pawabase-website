import { CloudSection } from "@/components/landing/CloudSection";
import { ConnectSection } from "@/components/landing/ConnectSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { FrontendsSection } from "@/components/landing/FrontendsSection";
import { Hero } from "@/components/landing/Hero";
import { PricingSection } from "@/components/landing/PricingSection";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
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
        <main>
          <Hero />
          <FeatureBento />
          <ConnectSection />
          <FrontendsSection />
          <CloudSection />
          <PricingSection />
          <FaqSection />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
