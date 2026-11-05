import { Highlights } from "@/components/home/Bento";
import { Features } from "@/components/home/Features";
import { Hero, InnerRails, Pricing, Rule, Statement } from "@/components/home/Home";
import { Mcp } from "@/components/home/Mcp";
import { Stack } from "@/components/home/Stack";
import { Closing, Everyone } from "@/components/home/Sections";
import { Story } from "@/components/home/Story";
import { Footer } from "@/components/landing/Footer";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, usePageMeta } from "@/hooks/usePageMeta";

export default function Landing() {
  usePageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION);

  return (
    <div className="ix-page">
      <ScrollMotion />
      <main className="ix-shell">
        <InnerRails />
        <Hero />
        <Statement />
        <Everyone />
        <Highlights />
        <Story />
        <Mcp />
        <Features />
        <Stack />
        <Pricing />
        <Closing />
        <div className="ix-footer">
          <Rule />
          <Footer />
        </div>
      </main>
    </div>
  );
}
