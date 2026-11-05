import { Arrow, Pricing, Rule, SectionHead } from "@/components/home/Home";
import { DOCS, SIGN_UP } from "@/lib/links";
import { PageHero, SitePage } from "@/components/site/SitePage";
import { usePlans } from "@/hooks/usePlans";
import { useCurrency } from "@/lib/currency";

/* Pricing: the home page's plans, then every limit side by side. */

function CompareTable() {
  const { plans, metrics } = usePlans();
  const { show } = useCurrency();
  return (
    <div className="sp-compare">
      <table>
        <caption className="sr-only">Pawabase Cloud plan limits</caption>
        <thead>
          <tr>
            <th scope="col">Included in each plan</th>
            {plans.map((plan) => (
              <th key={plan.name} scope="col" className={plan.featured ? "featured" : ""}>
                {plan.name}
                <small>{show(Number(plan.price))} / month</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.label}>
              <th scope="row">
                {metric.label}
                {metric.note ? <small>{metric.note}</small> : null}
              </th>
              {metric.values.map((value, i) => (
                <td key={`${metric.label}-${plans[i].name}`} className={plans[i].featured ? "featured" : ""}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  return (
    <SitePage title="Pricing" description="Pawabase Cloud pricing: start free, and every plan includes the whole system.">
      <PageHero title="Start free." quiet="Grow when you need to." line="Every plan includes the whole system: data, auth, storage, flows and agents. Pick the room you need today.">
        <a href={SIGN_UP} className="ix-btn primary">Start building <Arrow /></a>
        <a href={DOCS} className="ix-link" target="_blank" rel="noreferrer">Read the docs</a>
      </PageHero>

      <Pricing title="Plans" compare="#compare" />

      <section id="compare" className="ix-section" aria-labelledby="compare-title" data-plain="">
        <Rule />
        <SectionHead id="compare-title" title="Every limit, side by side" />
        <div className="sp-band" style={{ paddingTop: 0 }}>
          <CompareTable />
          <p className="sp-footnote">Email limits cover the email your apps send through Pawabase Cloud. Need more than Scale? Talk to us.</p>
        </div>
      </section>
    </SitePage>
  );
}
