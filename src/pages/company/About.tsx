import type { CSSProperties } from "react";

import { ArrowLink, CompanyCta, CompanyHero, CompanySection, CompanyShell, SectionHeading } from "@/components/company/CompanyPage";

const PRINCIPLES = [
  { title: "Make it visible", copy: "Clear states and useful errors beat magic that disappears when something breaks." },
  { title: "Complete, then composable", copy: "The parts work together from day one and stay clear enough to extend." },
  { title: "Built for small teams", copy: "A small team should ship ambitious software without becoming an infrastructure department." },
];

export default function AboutPage() {
  return (
    <CompanyShell title="About" description="Pawabase gives developers one place to build the data, rules, flows and agents their apps, teams and AI use.">
      <CompanyHero
        title="We build the system"
        quiet="teams run on."
        description="Pawabase gives developers one place to build the data, rules, flows and agents that their apps, their team and their AI all use."
      >
        <ArrowLink href="/products/database">Explore the products</ArrowLink>
      </CompanyHero>

      <CompanySection labelledBy="about-why">
        <div className="sp-split">
          <SectionHeading id="about-why" title="Why Pawabase" />
          <div>
            <p>
              Every product ends up needing the same parts: data, sign-in, files, background work, email and now AI. Teams usually stitch
              them together from separate services, then spend their time keeping them in step.
            </p>
            <p>
              Pawabase puts them in one system, with one set of users and one set of rules, so developers build it once and everyone else
              can work from it.
            </p>
          </div>
        </div>
      </CompanySection>

      <CompanySection labelledBy="about-how">
        <SectionHeading id="about-how" title="How we build" />
        <ol className="sp-cells" style={{ "--cells": 3 } as CSSProperties}>
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <span className="sp-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </li>
          ))}
        </ol>
      </CompanySection>

      <CompanyCta title="There's a lot left to build." description="Try Pawabase, follow along, or come and build it with us." href="/company/careers" label="Work with us" />
    </CompanyShell>
  );
}
