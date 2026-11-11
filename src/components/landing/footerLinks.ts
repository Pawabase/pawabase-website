import { DOCS } from "@/lib/links";

export type FooterLink =
  | {
      label: string;
      href: string;
      status: "live";
      external?: boolean;
    }
  | {
      label: string;
      status: "planned";
    };

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};


const live = (label: string, href: string, external = false): FooterLink => ({
  label,
  href,
  status: "live",
  external,
});

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      live("Platform", "/#platform"),
      live("Capabilities", "/#features"),
      live("Pricing", "/pricing"),
    ],
  },
  {
    title: "Developers",
    links: [
      live("Documentation", DOCS, true),
      live("API Reference", DOCS, true),
      live("Quickstart", DOCS, true),
    ],
  },
  {
    title: "Company",
    links: [
      live("About", "/company"),
      live("Blog", "/blog"),
      live("Careers", "/company/careers"),
      live("Contact", "/company/contact"),
    ],
  },
  {
    title: "Legal",
    links: [
      live("Privacy Policy", "/legal/privacy"),
      live("Terms of Service", "/legal/terms"),
      live("Cookie Policy", "/legal/cookies"),
      live("Cookie settings", "#cookie-settings"),
      live("Refund Policy", "/legal/refund"),
      live("Data Processing Addendum", "/legal/dpa"),
      live("Acceptable Use Policy", "/legal/acceptable-use"),
    ],
  },
];

export const FOOTER_SOCIALS: FooterLink[] = [
  live("X", "https://x.com/getpawabase", true),
  live("LinkedIn", "https://www.linkedin.com/company/pawabase/", true),
];
