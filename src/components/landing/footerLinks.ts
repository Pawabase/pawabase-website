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

const DOCS = "https://docs.sillo.build";

const live = (label: string, href: string, external = false): FooterLink => ({
  label,
  href,
  status: "live",
  external,
});

const planned = (label: string): FooterLink => ({
  label,
  status: "planned",
});

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      live("Platform", "/#platform"),
      live("Capabilities", "/#features"),
      live("Pricing", "/#start"),
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
];

export const FOOTER_SOCIALS: FooterLink[] = [
  planned("X"),
  planned("LinkedIn"),
  planned("Discord"),
];
