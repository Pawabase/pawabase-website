import { PLANS } from "../components/pricing/plans.ts";
import { QUESTIONS } from "./faq.ts";
import { canonical, ogImage, PAGES, type Page } from "./pages.ts";
import { absolute, SITE } from "./site.ts";

/** Structured data: what search engines and AI assistants read to understand the site. Each builder returns one JSON-LD node. */

type Node = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const APP_ID = `${SITE.url}/#software`;

export const organization = (): Node => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: absolute(SITE.logo), width: 512, height: 512 },
  description: SITE.description,
  sameAs: SITE.sameAs,
});

export const website = (): Node => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.language,
  publisher: { "@id": ORG_ID },
});

const priced = () => PLANS.map((p) => Number(p.price));

/** The product as software: what it is, what it costs, what it does. */
export const software = (): Node => ({
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: "Pawabase Cloud",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Backend platform",
  operatingSystem: "Web",
  url: SITE.url,
  description: SITE.description,
  image: absolute("/og.png"),
  publisher: { "@id": ORG_ID },
  featureList: PAGES.filter((p) => p.kind === "product").map((p) => p.name),
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "NGN",
    lowPrice: Math.min(...priced()),
    highPrice: Math.max(...priced()),
    offerCount: PLANS.length,
    offers: PLANS.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.description,
      price: p.price,
      priceCurrency: "NGN",
      url: absolute("/pricing"),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price,
        priceCurrency: "NGN",
        billingDuration: 1,
        billingIncrement: 1,
        unitCode: "MON",
      },
    })),
  },
});

export const faq = (): Node => ({
  "@type": "FAQPage",
  "@id": `${SITE.url}/#faq`,
  mainEntity: QUESTIONS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export const breadcrumbs = (page: Page): Node => {
  const trail: { name: string; url: string }[] = [{ name: "Pawabase", url: canonical(PAGES[0]!) }];
  if (page.path !== "/") trail.push({ name: page.name, url: canonical(page) });
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
};

export const webPage = (page: Page): Node => ({
  "@type": page.kind === "company" && page.path === "/company" ? "AboutPage" : page.path === "/company/contact" ? "ContactPage" : "WebPage",
  "@id": `${canonical(page)}#webpage`,
  url: canonical(page),
  name: page.title,
  description: page.description,
  inLanguage: SITE.language,
  isPartOf: { "@id": SITE_ID },
  primaryImageOfPage: { "@type": "ImageObject", url: ogImage(page), width: 1200, height: 630 },
  breadcrumb: breadcrumbs(page),
  ...(page.kind === "product" ? { about: { "@id": APP_ID } } : {}),
});

/** The nodes for one page, as a single @graph. */
export function graphFor(page: Page): Node {
  const nodes: Node[] = [];
  if (page.kind === "home") nodes.push(organization(), website(), software(), faq());
  else if (page.kind === "pricing") nodes.push(organization(), software());
  else nodes.push({ "@id": ORG_ID, "@type": "Organization", name: SITE.name, url: SITE.url });
  nodes.push(webPage(page));
  return { "@context": "https://schema.org", "@graph": nodes };
}

