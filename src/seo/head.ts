import { graphFor } from "./schema.ts";
import { canonical, ogImage, type Page } from "./pages.ts";
import { SITE } from "./site.ts";

/** Everything a page puts in <head> for search engines and for links shared on social networks. */

export type Tag =
  | { tag: "meta"; attrs: { name?: string; property?: string; content: string } }
  | { tag: "link"; attrs: { rel: string; href: string; hreflang?: string } }
  | { tag: "script"; attrs: { type: string }; text: string };

const ROBOTS_ON = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
const ROBOTS_OFF = "noindex,follow";

export function headTags(page: Page): Tag[] {
  const url = canonical(page);
  const image = ogImage(page);
  const alt = "Pawabase";
  const meta = (key: "name" | "property", id: string, content: string): Tag => ({ tag: "meta", attrs: { [key]: id, content } });
  return [
    meta("name", "description", page.description),
    meta("name", "robots", page.noindex ? ROBOTS_OFF : ROBOTS_ON),
    meta("name", "googlebot", page.noindex ? ROBOTS_OFF : ROBOTS_ON),
    { tag: "link", attrs: { rel: "canonical", href: url } },
    { tag: "link", attrs: { rel: "alternate", hreflang: SITE.language, href: url } },
    { tag: "link", attrs: { rel: "alternate", hreflang: "x-default", href: url } },

    meta("property", "og:type", "website"),
    meta("property", "og:site_name", SITE.name),
    meta("property", "og:locale", SITE.locale),
    meta("property", "og:title", page.title),
    meta("property", "og:description", page.description),
    meta("property", "og:url", url),
    meta("property", "og:image", image),
    meta("property", "og:image:secure_url", image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", alt),

    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", page.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", alt),
    meta("name", "twitter:url", url),

    { tag: "script", attrs: { type: "application/ld+json" }, text: JSON.stringify(graphFor(page)) },
  ];
}

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** The same tags as HTML, for the build to write into each page. Every one carries data-seo, so the browser can replace them as people navigate. */
export function headHtml(page: Page): string {
  return headTags(page)
    .map((t) => {
      if (t.tag === "script") return `<script data-seo type="${t.attrs.type}">${t.text.replace(/</g, "\\u003c")}</script>`;
      const attrs = Object.entries(t.attrs).map(([k, v]) => `${k}="${esc(String(v))}"`).join(" ");
      return `<${t.tag} data-seo ${attrs}>`;
    })
    .join("\n    ");
}
