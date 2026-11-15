/**
 * The blog's feeds: RSS 2.0 (/blog/rss.xml) and JSON Feed 1.1 (/blog/feed.json), each with every post's full article. The article
 * comes from the post's own prerendered page, so a feed reader gets exactly what the site shows, with addresses made absolute.
 */
import { esc } from "../seo/lib.mjs";

/** The article's HTML from a rendered page: what sits inside <article class="bp-article">, with relative addresses made absolute. */
export function articleHtml(page, site) {
  const match = page.match(/<article class="bp-article">([\s\S]*?)<\/article>/);
  if (!match) return "";
  return match[1]
    .replace(/<p class="bp-end"[\s\S]*?<\/p>/, "")
    .replace(/<button[^>]*class="bp-copy[^"]*"[^>]*>[\s\S]*?<\/button>/g, "")
    .replace(/<dialog[\s\S]*?<\/dialog>/g, "")
    .replace(/<a class="bp-anchor"[\s\S]*?<\/a>/g, "")
    .replace(/\s(src|href|srcSet|srcset)="\/(?!\/)/g, (_m, attr) => ` ${attr}="${site}/`)
    .replace(/(srcset|srcSet)="([^"]*)"/g, (_m, attr, set) => `${attr}="${set.replace(/(^|,\s*)\/(?!\/)/g, `$1${site}/`)}"`);
}

const rfc822 = (iso) => new Date(`${iso}T00:00:00Z`).toUTCString();

export function rss({ posts, authors, site, html, title, description }) {
  const newest = posts[0]?.updated ?? posts[0]?.date;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(title)}</title>
    <link>${site}/blog</link>
    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(description)}</description>
    <language>en</language>
    <image><url>${site}/icon-512.png</url><title>${esc(title)}</title><link>${site}/blog</link></image>
${newest ? `    <lastBuildDate>${rfc822(newest)}</lastBuildDate>\n` : ""}${posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site}/blog/${p.slug}</link>
      <guid isPermaLink="true">${site}/blog/${p.slug}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
${p.authors.map((a) => `      <dc:creator>${esc(authors[a]?.name ?? a)}</dc:creator>`).join("\n")}
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <content:encoded><![CDATA[${(html[p.slug] ?? "").replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;
}

export function jsonFeed({ posts, authors, site, html, title, description }) {
  return `${JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1.1",
      title,
      home_page_url: `${site}/blog`,
      feed_url: `${site}/blog/feed.json`,
      description,
      icon: `${site}/icon-512.png`,
      language: "en",
      items: posts.map((p) => ({
        id: `${site}/blog/${p.slug}`,
        url: `${site}/blog/${p.slug}`,
        title: p.title,
        summary: p.description,
        content_html: html[p.slug] ?? "",
        image: `${site}/blog/${p.slug}/og.png`,
        date_published: `${p.date}T00:00:00Z`,
        date_modified: `${p.updated ?? p.date}T00:00:00Z`,
        authors: p.authors.map((a) => ({ name: authors[a]?.name ?? a })),
        tags: p.tags,
      })),
    },
    null,
    2,
  )}\n`;
}
