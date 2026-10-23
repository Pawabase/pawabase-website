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

const GITHUB = "https://github.com/Pawabase/pawabase";
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
      live("GitHub", GITHUB, true),
    ],
  },
  {
    title: "Company",
    links: [planned("About"), planned("Blog"), planned("Contact")],
  },
];

export const FOOTER_SOCIALS: FooterLink[] = [
  live("GitHub", GITHUB, true),
  planned("X"),
  planned("LinkedIn"),
  planned("Discord"),
];
