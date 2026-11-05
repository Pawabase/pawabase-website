import type { CSSProperties } from "react";

import { Icon } from "@/components/Icon";
import { ArrowLink, COMPANY_EMAIL, CompanyHero, CompanySection, CompanyShell, SectionHeading } from "@/components/company/CompanyPage";

const VALUES = [
  ["Own the whole outcome", "We care about the experience, not the edge of a job description."],
  ["Write it down", "Decisions, trade-offs and context should be easy to find."],
  ["Keep it legible", "Understandable designs, and code left easier to reason about."],
  ["Stay close to builders", "The fastest way to a better product is watching people use it."],
];

const MAIL = `mailto:${COMPANY_EMAIL}?subject=Working%20with%20Pawabase`;

export default function CareersPage() {
  return (
    <CompanyShell title="Careers" description="Work with Pawabase: a small team building data, identity, automation and AI as one product.">
      <CompanyHero
        title="Small team."
        quiet="Wide surface."
        description="We build data, identity, automation and AI as one product. That takes people who like deep work and simple results."
      >
        <ArrowLink href={MAIL}>Introduce yourself</ArrowLink>
      </CompanyHero>

      <CompanySection labelledBy="careers-how">
        <SectionHeading id="careers-how" title="How we work" />
        <ol className="sp-cells" style={{ "--cells": 4 } as CSSProperties}>
          {VALUES.map(([title, copy], i) => (
            <li key={title}>
              <span className="sp-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </CompanySection>

      <CompanySection labelledBy="careers-roles">
        <div className="sp-split">
          <SectionHeading
            id="careers-roles"
            title="No role fits neatly yet."
            description="We aren't listing openings right now, but thoughtful introductions are always welcome. Tell us what you're unusually good at, and show us work you care about."
          />
          <a href={MAIL} className="sp-card">
            <span className="sp-card-icon"><Icon name="mail" size={20} variant="Linear" /></span>
            <span>
              <h3>Start a conversation</h3>
              <p>{COMPANY_EMAIL}</p>
            </span>
            <span className="sp-go">Write to us <Icon name="arrowRight" size={15} /></span>
          </a>
        </div>
      </CompanySection>
    </CompanyShell>
  );
}
