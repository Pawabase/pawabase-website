/** Every page, with the title and description its <head> and the sitemap use. The build prerenders each of these. */
export type PageMeta = { path: string; title: string; description: string };

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Pawabase: build a whole backend from small, independent services",
    description:
      "Pawabase is in pre-launch: sign-in, data, functions, files, queues and monitoring as independent services that combine on one shared account, one set of rules and one request trail.",
  },
];

export const metaFor = (path: string): PageMeta => pages.find((p) => p.path === path) ?? pages[0];
