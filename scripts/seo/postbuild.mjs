/**
 * Runs after the build. Turns the single-page app into a site search engines, AI assistants and link previews can read:
 *
 *   - one HTML file per page, with its own title, description, canonical address, share tags and structured data in <head>,
 *     and the page's content already rendered in <body> (the browser takes it over when the script loads);
 *   - sitemap.xml, robots.txt, llms.txt and llms-full.txt, a 404 page and cache headers;
 *   - checks that fail the build when a title or description is too long or repeated, a page has no single <h1>, or an image is missing.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

import { PRICING_METRICS, PLANS } from "../../src/components/pricing/plans.ts";
import { QUESTIONS } from "../../src/seo/faq.ts";
import { headHtml } from "../../src/seo/head.ts";
import { canonical, ogImage, ogImagePath, PAGES } from "../../src/seo/pages.ts";
import { absolute, SITE, SITE_URL } from "../../src/seo/site.ts";
import { esc, ROOT } from "./lib.mjs";

/** A plan's price as the pricing page writes it: ₦6,500 a month (Free for zero). Plans are priced in naira. */
const naira = (price) => (Number(price) ? `₦${Number(price).toLocaleString("en-NG")}` : "Free");

const DIST = `${ROOT}/dist`;
const problems = [];
const warnings = [];
const fail = (page, why) => problems.push(`${page.path}: ${why}`);

// ── what the browser reads ───────────────────────────────────────────────

const template = readFileSync(`${DIST}/index.html`, "utf8");
if (!template.includes("<!--app-->")) throw new Error("dist/index.html has no <!--app--> placeholder: has index.html changed?");

const { render } = await import(pathToFileURL(`${ROOT}/dist-ssr/entry-server.js`).href);

// ── each page's own scripts and styles ────────────────────────────────────

const manifest = JSON.parse(readFileSync(`${DIST}/.vite/manifest.json`, "utf8"));

/** The route file that holds a page, as the build manifest names it. */
const routeKey = (path) => {
  const base = path === "/" ? "src/routes/index.tsx" : `src/routes${path}.tsx`;
  const nested = `src/routes${path}/index.tsx`;
  return [base, nested].map((k) => `${k}?tsr-split=component`).find((k) => manifest[k]);
};

/** Every script and stylesheet a page needs beyond the entry's own, found by following its imports. */
function assetsFor(page) {
  const start = routeKey(page.path);
  const scripts = new Set();
  const styles = new Set();
  const seen = new Set(["index.html"]);
  const visit = (key) => {
    if (seen.has(key) || !manifest[key]) return;
    seen.add(key);
    const entry = manifest[key];
    scripts.add(entry.file);
    (entry.css ?? []).forEach((c) => styles.add(c));
    (entry.imports ?? []).forEach(visit);
  };
  if (start) visit(start);
  else warnings.push(`${page.path}: no route chunk in the build manifest, so its styles load with the script`);
  const own = new Set([manifest["index.html"].file, ...(manifest["index.html"].css ?? [])]);
  return [
    ...[...styles].filter((f) => !own.has(f)).map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
    ...[...scripts].filter((f) => !own.has(f)).map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
  ].join("\n    ");
}

const write = (file, content) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

/** What a visitor without JavaScript, or a crawler that doesn't run it, gets when the full render isn't available. */
const plainBody = (page) =>
  `<main><h1>${esc(page.name)}</h1><p>${esc(page.description)}</p><nav aria-label="Pawabase">${PAGES.filter((p) => p.kind === "product" || p.kind === "pricing")
    .map((p) => `<a href="${p.path}">${esc(p.name)}</a>`)
    .join(" ")}</nav></main>`;

function page404() {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, "<title>Page not found | Pawabase</title>")
    .replace(/<!-- seo-head:[\s\S]*?-->/, '<meta name="robots" content="noindex,follow">')
    .replace("<!--app-->", '<main><h1>Page not found</h1><p>That page doesn\'t exist. <a href="/">Go to the Pawabase home page</a>.</p></main>');
  write(`${DIST}/404.html`, html);
}

page404();

const lastModified = {};
const modified = (file) => {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { cwd: ROOT, encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
};

for (const page of PAGES) {
  let body;
  try {
    body = await render(page.path);
  } catch (error) {
    warnings.push(`${page.path}: the full render failed (${String(error.message).slice(0, 120)}); wrote a plain version`);
    body = plainBody(page);
  }
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/<!-- seo-head:[\s\S]*?-->/, `${headHtml(page)}\n    ${assetsFor(page)}`)
    .replace("<!--app-->", body);
  write(page.path === "/" ? `${DIST}/index.html` : `${DIST}${page.path}/index.html`, html);
  lastModified[page.path] = modified(page.source) ?? new Date().toISOString();

  // ── checks ────────────────────────────────────────────────────────────
  const h1 = (body.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(page, `${h1} <h1> elements (want exactly one)`);
  const bare = (body.match(/<img\b(?![^>]*\balt=)[^>]*>/g) ?? []).length;
  if (bare) fail(page, `${bare} image(s) without alt text`);
  if (page.title.length > 65) fail(page, `title is ${page.title.length} characters (most results cut at about 60)`);
  if (page.description.length < 70 || page.description.length > 165) fail(page, `description is ${page.description.length} characters (want 70 to 165)`);
  if (!existsSync(`${ROOT}/public${ogImagePath(page)}`)) fail(page, "share image is missing (node scripts/seo/og.mjs)");
  for (const m of html.matchAll(/<script data-seo type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1].replace(/\\u003c/g, "<"));
    } catch {
      fail(page, "structured data is not valid JSON");
    }
  }
}
for (const key of ["title", "description"]) {
  const seen = new Map();
  for (const p of PAGES) {
    if (seen.has(p[key])) fail(p, `${key} repeats ${seen.get(p[key])}'s`);
    seen.set(p[key], p.path);
  }
}

// ── the sitemap ──────────────────────────────────────────────────────────

const indexable = PAGES.filter((p) => !p.noindex);
const newest = Object.values(lastModified).sort().at(-1);
write(
  `${DIST}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${indexable
  .map(
    (p) => `  <url>
    <loc>${esc(canonical(p))}</loc>
    <lastmod>${(p.path === "/" ? newest : lastModified[p.path]).slice(0, 10)}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
    <image:image><image:loc>${esc(ogImage(p))}</image:loc></image:image>
  </url>`,
  )
  .join("\n")}
</urlset>
`,
);

// ── robots.txt ───────────────────────────────────────────────────────────

/** The crawlers that feed AI assistants and answer engines. Listed by name so the intent is plain: they are welcome. */
const AI_CRAWLERS = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended"];
write(
  `${DIST}/robots.txt`,
  `# Pawabase: everything public is open to search engines and AI assistants.
User-agent: *
Allow: /

${AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n")}

Sitemap: ${absolute("/sitemap.xml")}
`,
);

// ── llms.txt: the site as a reader, for language models ──────────────────

const link = (p) => `- [${p.name}](${canonical(p)}): ${p.description}`;
const byKind = (kind) => PAGES.filter((p) => p.kind === kind);
const groups = [...new Set(byKind("product").map((p) => p.group))];

const llms = `# ${SITE.name}

> ${SITE.description}

Pawabase Cloud is the hosted version: every project gets its own Postgres database, environments, release controls and operational visibility. Start free at ${SITE.dashboard}/signup. Documentation lives at ${SITE.docs}.

## Products

${groups.map((g) => `### ${g}\n\n${byKind("product").filter((p) => p.group === g).map(link).join("\n")}`).join("\n\n")}

## Pricing

${link(PAGES.find((p) => p.kind === "pricing"))}

${PLANS.map((p) => `- ${p.name}: ${naira(p.price)} per month. ${p.description}`).join("\n")}

## Documentation

- [Documentation](${SITE.docs}): guides, the API reference and a quickstart.
- [Pawabase Cloud](${SITE.dashboard}/signup): create a project.
- [GitHub](https://github.com/Pawabase): open source repositories.

## Company

${byKind("company").filter((p) => !p.noindex).map(link).join("\n")}

## Optional

${byKind("legal").map(link).join("\n")}
`;
write(`${DIST}/llms.txt`, llms);

const planTable = `| | ${PLANS.map((p) => p.name).join(" | ")} |
| --- | ${PLANS.map(() => "---").join(" | ")} |
| Price per month | ${PLANS.map((p) => naira(p.price)).join(" | ")} |
${PRICING_METRICS.map((m) => `| ${m.label} | ${m.values.join(" | ")} |`).join("\n")}`;

write(
  `${DIST}/llms-full.txt`,
  `${llms}
---

# Questions and answers

${QUESTIONS.map((q) => `## ${q.q}\n\n${q.a}`).join("\n\n")}

---

# Plans in detail

Every plan includes the whole system; plans differ in how much you can run.

${planTable}
`,
);

// ── headers ──────────────────────────────────────────────────────────────

// Read by Netlify and Cloudflare Pages; other hosts ignore the file.
write(
  `${DIST}/_headers`,
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=86400

/brand/*
  Cache-Control: public, max-age=604800

/llms.txt
  Content-Type: text/plain; charset=utf-8

/llms-full.txt
  Content-Type: text/plain; charset=utf-8
`,
);

rmSync(`${DIST}/.vite`, { recursive: true, force: true });

// ── the verdict ──────────────────────────────────────────────────────────

for (const w of warnings) console.warn(`  warning  ${w}`);
if (problems.length) {
  console.error(`\nSEO checks failed:\n${problems.map((p) => `  ${p}`).join("\n")}\n`);
  process.exit(1);
}
console.log(`SEO: ${PAGES.length} pages written (${indexable.length} in the sitemap), robots.txt, llms.txt, llms-full.txt, 404.html. Site address ${SITE_URL}.`);
