import { Platform } from "@/components/home/Platform";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Pricing, Statement } from "@/components/home/Home";
import { Integrations } from "@/components/home/Integrations";
import { Mcp } from "@/components/home/Mcp";
import { Closing } from "@/components/home/Sections";
import { Footer } from "@/components/landing/Footer";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, usePageMeta } from "@/hooks/usePageMeta";

export default function Landing() {
  usePageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION);

  return (
    <div className="ix-page">
      <ScrollMotion />
      {/* the opening stands outside the frame: the page's rails start at the next section */}
      <Hero />
      <main className="ix-shell">
        <Statement />
        <Platform />
        <Mcp />
        <Integrations />
        <Features />
        <Pricing />
        <Closing />
        <Footer />
      </main>
    </div>
  );
}
