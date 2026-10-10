// Prerenders every page to dist/<path>/index.html with its own title, description, canonical, social tags and structured data,
// then writes robots.txt and sitemap.xml. A preview origin (localhost) is marked noindex.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pages, render } from "../.prerender/render.js";

const origin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : "http://localhost:4173";
const live = !new URL(origin).hostname.match(/^(localhost|127\.0\.0\.1)$/);
const esc = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const shell = await readFile("dist/index.html", "utf8");

for (const page of pages) {
  const url = origin + (page.path === "/" ? "/" : page.path);
  const ld = page.path === "/"
    ? { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Pawabase", applicationCategory: "DeveloperApplication", url: origin, description: page.description, codeRepository: "https://github.com/Pawabase/pawabase" }
    : { "@context": "https://schema.org", "@type": "WebPage", name: page.title, url, description: page.description, isPartOf: { "@type": "WebSite", name: "Pawabase", url: origin } };
  const meta = `<link rel="canonical" href="${esc(url)}" />
${live ? "" : '<meta name="robots" content="noindex, nofollow" />'}
<meta property="og:type" content="website" /><meta property="og:site_name" content="Pawabase" />
<meta property="og:title" content="${esc(page.title)}" /><meta property="og:description" content="${esc(page.description)}" />
<meta property="og:url" content="${esc(url)}" /><meta property="og:image" content="${esc(origin)}/social.png" />
<meta property="og:image:alt" content="Pawabase: everything your application needs" />
<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${esc(page.title)}" />
<meta name="twitter:description" content="${esc(page.description)}" /><meta name="twitter:image" content="${esc(origin)}/social.png" />
<script type="application/ld+json">${JSON.stringify(ld).replaceAll("<", "\\u003c")}</script>`;
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(page.description)}" />`)
    .replace("<!--seo-->", meta)
    .replace("<!--app-->", await render(page.path));
  const dir = page.path === "/" ? "dist" : `dist${page.path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
}

await writeFile("dist/robots.txt", `User-agent: *\n${live ? "Allow: /" : "Disallow: /"}\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${esc(origin + (p.path === "/" ? "/" : p.path))}</loc></url>`).join("")}</urlset>`);
console.log(`Prerendered ${pages.length} pages for ${origin}${live ? "" : " (preview: noindex)"}`);
