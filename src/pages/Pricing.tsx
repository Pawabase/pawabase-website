import { Fragment, type CSSProperties } from "react";

import { Arrow, Lines, SectionHead } from "@/components/home/Home";
import { CurrencyPicker } from "@/components/pricing/CurrencyPicker";
import { SitePage } from "@/components/site/SitePage";
import { SiteNav } from "@/components/site/SiteNav";
import { usePlans } from "@/hooks/usePlans";
import { useCurrency } from "@/lib/currency";
import { SIGN_UP } from "@/lib/links";
import "./pricing.css";

/*
 * Pricing, its own page: a short headline with the plans right under it and Enterprise below them, how credits work in three
 * pictures, every limit in a grouped table whose head stays in view, and questions.
 * Numbers come from Cloud's price list (usePlans, with the bundled copy in components/pricing/catalog.json).
 */

const SALES = "hello@pawabase.com";

/** The opening: a short headline, the currency, then the plans themselves, with Enterprise under them. */
function Hero() {
  const { plans, enterprise } = usePlans();
  const { show } = useCurrency();
  const cuts = plans.slice(1).map((_, i) => (i + 1) / plans.length);
  return (
    <section className="pr-hero" aria-labelledby="page-title" data-plain="">
      <SiteNav />
      <div className="pr-hero-copy">
        <h1 id="page-title" data-reveal="up">Start free. Grow on a plan that fits.</h1>
        <p data-reveal="up">Every plan has the whole system. Paid plans add room, longer history and compute credit for database servers of your own.</p>
        <div className="pr-hero-tools" data-reveal="up">
          <CurrencyPicker />
          <span>Billed monthly in naira</span>
        </div>
      </div>
      <div className="ix-panel ix-plans pr-plans" style={{ "--plans": plans.length } as CSSProperties} data-reveal="up">
        <Lines v={cuts.map((x) => [x, 0, 1] as [number, number, number])} />
        {plans.map((plan) => (
          <article key={plan.name} className={`ix-cell ix-plan ${plan.featured ? "featured" : ""}`}>
            <div className="ix-plan-name"><h3>{plan.name}</h3>{plan.featured && <span className="ix-caps">Popular</span>}</div>
            <p>{plan.description}</p>
            <div className="ix-price"><b>{Number(plan.price) ? show(Number(plan.price)) : "₦0"}</b><span>/ month</span></div>
            <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <a href={SIGN_UP} className={`btn btn-block ${plan.featured ? "btn-light" : ""}`}>{Number(plan.price) ? `Choose ${plan.name}` : "Start free"}</a>
          </article>
        ))}
      </div>
      {enterprise && (
        <div className="pr-enterprise" data-reveal="up">
          <div className="pr-enterprise-copy">
            <h3>{enterprise.name}</h3>
            <p>{enterprise.description}</p>
          </div>
          <ul>{enterprise.perks.slice(1, 5).map((perk) => <li key={perk}>{perk}</li>)}</ul>
          <a href={`mailto:${SALES}?subject=${encodeURIComponent("Pawabase Enterprise")}`} className="btn">Talk to us <Arrow /></a>
        </div>
      )}
    </section>
  );
}

const STEPS = [
  {
    title: "Your plan's credit comes first",
    copy: "Each paid plan brings compute credit every month for database servers and their storage. What a month leaves unused carries into the next one.",
    art: (
      <svg viewBox="0 0 160 72" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${8 + i * 38} 10)`}>
            <rect width="30" height="52" rx="6" className="pr-art-frame" />
            <rect x="6" y={44 - [34, 26, 38, 30][i]} width="18" height={[34, 26, 38, 30][i]} rx="3" className={i === 3 ? "pr-art-hot" : "pr-art-fill"} />
          </g>
        ))}
      </svg>
    ),
  },
  {
    title: "Buy credits when you need more",
    copy: "Credits you buy never expire. They are used after the plan's credit, and a bigger server only starts when there is enough to run it to the month's end.",
    art: (
      <svg viewBox="0 0 160 72" aria-hidden="true">
        {[0, 1, 2].map((i) => <rect key={i} x={20} y={46 - i * 12} width="62" height="10" rx="5" className="pr-art-fill" />)}
        <rect x="20" y="10" width="62" height="10" rx="5" className="pr-art-hot" />
        <circle cx="118" cy="36" r="20" className="pr-art-frame" />
        <path d="M118 27v18M109 36h18" className="pr-art-line" />
      </svg>
    ),
  },
  {
    title: "The spend cap keeps you in charge",
    copy: "On by default: usage stops at what your plan includes instead of running up a bill. Turn it off to pay as you go, with a monthly limit and alerts.",
    art: (
      <svg viewBox="0 0 160 72" aria-hidden="true">
        <path d="M8 18H152" className="pr-art-cap" />
        <path d="M8 62C30 58 44 50 62 40S96 20 112 18H152" className="pr-art-line" />
        <circle cx="112" cy="18" r="4" className="pr-art-dot" />
      </svg>
    ),
  },
];

function Credits() {
  return (
    <section className="ix-section pr-sec" aria-labelledby="credits-title" data-plain="">
      <SectionHead id="credits-title" title="How credits work" lead="Shared usage comes with the plan. Servers of your own are paid with credits." />
      <ol className="pr-steps" data-reveal="up">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <span className="pr-step-art">{step.art}</span>
            <span className="pr-mono pr-step-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Compare() {
  const { plans, metrics } = usePlans();
  const { show } = useCurrency();
  const featured = plans.map((p) => !!p.featured);
  return (
    <section id="compare" className="ix-section pr-sec" aria-labelledby="compare-title" data-plain="">
      <SectionHead id="compare-title" title="Compare plans" lead="Everything each plan includes, side by side." />
      <div className="pr-compare" data-reveal="up">
        <table>
          <caption className="sr-only">Pawabase Cloud plans compared</caption>
          <thead>
            <tr>
              <th scope="col"><span className="pr-mono">Per organization</span></th>
              {plans.map((plan) => (
                <th key={plan.name} scope="col" className={plan.featured ? "featured" : ""}>
                  <b>{plan.name}</b>
                  <small>{Number(plan.price) ? `${show(Number(plan.price))} / month` : "Free"}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, i) => (
              <Fragment key={metric.label}>
                {metric.group && metric.group !== metrics[i - 1]?.group && (
                  <tr className="pr-group"><th colSpan={plans.length + 1} scope="colgroup">{metric.group}</th></tr>
                )}
                <tr>
                  <th scope="row">
                    {metric.label}
                    {metric.note ? <small>{metric.note}</small> : null}
                  </th>
                  {metric.values.map((value, j) => (
                    <td key={`${metric.label}-${plans[j]?.name}`} className={featured[j] ? "featured" : ""}>
                      {value === "Included" ? <span className="pr-yes" aria-label="Included">✓</span> : value === "—" ? <span className="pr-no" aria-label="Not included">—</span> : value}
                    </td>
                  ))}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const QUESTIONS: [string, string][] = [
  ["What is compute credit?", "Money on your plan for database servers of your own and their storage. A server is charged by the hour at the size it runs, and the credit pays for it first."],
  ["What happens when a project reaches its plan's amounts?", "With the spend cap on (the default), that usage stops until next month or until you move up a plan. With it off, the extra is charged from your credits at the price list's rates."],
  ["Do credits expire?", "Credits you buy never expire. The compute credit that comes with a plan is for its month, and what is left carries into the next month once."],
  ["Which currencies can I pay in?", "Plans and credits are charged in naira through Paystack. The currency picker shows the prices in your currency as a guide only."],
];

function Questions() {
  return (
    <section className="ix-section pr-sec" aria-labelledby="questions-title" data-plain="">
      <SectionHead id="questions-title" title="Questions" />
      <div className="pr-questions" data-reveal="up">
        {QUESTIONS.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <SitePage title="Pricing" description="Pawabase Cloud pricing: start free, then plans with compute credit, more room and longer history. Billed monthly in naira.">
      <Hero />
      <Credits />
      <Compare />
      <Questions />
    </SitePage>
  );
}
