/**
 * The blog's index, read from the content folder. One source for everything that needs to know the posts without rendering them:
 * the page registry (titles, descriptions, dates for search and sharing), the list pages, related posts, the feeds and the share cards.
 *
 *   content/blog/<YYYY>/<MM-DD>-<slug>/index.mdx    the post, with YAML frontmatter
 *   content/blog/<YYYY>/<MM-DD>-<slug>/assets/      its images and files, referenced as ./assets/name.png
 *   content/authors.yaml                            who writes, keyed by id
 *
 * The year folder and the date in the folder name are the post's date unless the frontmatter gives one; the rest of the folder name
 * is its address (/blog/<slug>) unless the frontmatter gives a slug. Writes src/content/blog.json, which the app and the build import.
 *
 *   node scripts/blog/collect.mjs           write the index
 *   node scripts/blog/collect.mjs --check   fail when a post is wrong, write nothing
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const CONTENT = join(ROOT, "content/blog");
export const AUTHORS_FILE = join(ROOT, "content/authors.yaml");
export const OUTPUT = join(ROOT, "src/content/blog.json");

/** Posts on one list page. The first page also shows the newest post large, above them. */
export const PER_PAGE = 9;
/** Words a minute, for the reading time: an unhurried pace for technical writing. */
const WPM = 220;
/** Addresses a post may not take: they are the list's own pages. */
const RESERVED = new Set(["page", "tag", "rss.xml", "feed.json", "author"]);

const FOLDER = /^(\d{2})-(\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Frontmatter and body of an MDX file. */
function split(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  return { data: parse(match[1]) ?? {}, body: match[2] };
}

/** The words a reader reads: prose, plus code counted lightly (people scan it). Markup, imports and JSX tags are left out. */
function countWords(body) {
  let code = 0;
  const prose = body
    .replace(/```[\s\S]*?```/g, (block) => {
      code += block.split(/\s+/).filter(Boolean).length;
      return " ";
    })
    .replace(/^(import|export)\s.*$/gm, " ")
    .replace(/<\/?[A-Z][^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ");
  return prose.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length + Math.round(code * 0.3);
}

const isoDay = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};

const tagSlug = (tag) => String(tag).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function readAuthors() {
  if (!existsSync(AUTHORS_FILE)) return {};
  return parse(readFileSync(AUTHORS_FILE, "utf8")) ?? {};
}

/** Every post folder under content/blog, as [folder, year, name]. */
function folders() {
  if (!existsSync(CONTENT)) return [];
  const out = [];
  for (const year of readdirSync(CONTENT).sort()) {
    const yearDir = join(CONTENT, year);
    if (!/^\d{4}$/.test(year) || !statSync(yearDir).isDirectory()) continue;
    for (const name of readdirSync(yearDir).sort()) {
      const dir = join(yearDir, name);
      if (statSync(dir).isDirectory() && existsSync(join(dir, "index.mdx"))) out.push([dir, year, name]);
    }
  }
  return out;
}

/** Related posts: the ones that share the most tags, then the same author, then the closest in time. */
function relate(posts) {
  for (const post of posts) {
    const day = Date.parse(post.date);
    post.related = posts
      .filter((other) => other.slug !== post.slug)
      .map((other) => {
        const shared = other.tags.filter((t) => post.tags.includes(t)).length;
        const author = other.authors.some((a) => post.authors.includes(a)) ? 1 : 0;
        const days = Math.abs(Date.parse(other.date) - day) / 86_400_000;
        return { slug: other.slug, score: shared * 10 + author * 3 + 1 / (1 + days / 30) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((r) => r.slug);
  }
}

/**
 * Read every post. Drafts are left out unless ``drafts`` is set (development shows them, marked). Returns the posts newest first,
 * the authors who wrote them, every tag with its count, and the problems found.
 */
export function collect({ drafts = false } = {}) {
  const authors = readAuthors();
  const problems = [];
  const posts = [];
  for (const [dir, year, name] of folders()) {
    const where = relative(ROOT, join(dir, "index.mdx"));
    const folder = name.match(FOLDER);
    if (!folder) {
      problems.push(`${where}: the folder must be named MM-DD-slug, e.g. 11-15-free-trial`);
      continue;
    }
    const { data, body } = split(readFileSync(join(dir, "index.mdx"), "utf8"));
    if (data.draft && !drafts) continue;
    const slug = String(data.slug ?? folder[3]);
    const date = isoDay(data.date) ?? `${year}-${folder[1]}-${folder[2]}`;
    const fail = (why) => problems.push(`${where}: ${why}`);
    if (!SLUG.test(slug) || RESERVED.has(slug)) fail(`"${slug}" can't be a post's address`);
    if (!data.title) fail("frontmatter needs a title");
    if (!data.description) fail("frontmatter needs a description (the search snippet, 70 to 160 characters)");
    else if (String(data.description).length < 70 || String(data.description).length > 165) fail(`the description is ${String(data.description).length} characters (want 70 to 165)`);
    if (String(data.title ?? "").length > 70) fail(`the title is ${String(data.title).length} characters (most results cut at about 60)`);
    if (!isoDay(date)) fail(`"${date}" is not a date`);
    const ids = [].concat(data.authors ?? data.author ?? []).map(String);
    if (!ids.length) fail("frontmatter needs an author (an id from content/authors.yaml)");
    for (const id of ids) if (!authors[id]) fail(`no author "${id}" in content/authors.yaml`);
    if (data.cover && !existsSync(join(dir, data.cover))) fail(`the cover ${data.cover} does not exist`);
    if (data.cover && !data.coverAlt) fail("a cover needs coverAlt, the text that describes it");
    const words = countWords(body);
    posts.push({
      slug,
      id: `${year}/${name}`,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date,
      updated: isoDay(data.updated) ?? null,
      authors: ids,
      tags: [].concat(data.tags ?? []).map(String),
      category: data.category ? String(data.category) : null,
      cover: data.cover ? String(data.cover) : null,
      coverAlt: data.coverAlt ? String(data.coverAlt) : null,
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
      words,
      readingTime: Math.max(1, Math.round(words / WPM)),
      source: relative(ROOT, join(dir, "index.mdx")),
    });
  }
  const seen = new Map();
  for (const post of posts) {
    if (seen.has(post.slug)) problems.push(`${post.source}: the address /blog/${post.slug} is also ${seen.get(post.slug)}'s`);
    seen.set(post.slug, post.source);
  }
  posts.sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? 1 : -1));
  relate(posts);
  const tags = {};
  for (const post of posts) for (const tag of post.tags) {
    const key = tagSlug(tag);
    tags[key] ??= { slug: key, name: tag, count: 0 };
    tags[key].count += 1;
  }
  const used = new Set(posts.flatMap((p) => p.authors));
  return {
    posts,
    authors: Object.fromEntries(Object.entries(authors).filter(([id]) => used.has(id)).map(([id, a]) => [id, { id, ...a }])),
    tags: Object.values(tags).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    perPage: PER_PAGE,
    problems,
  };
}

/** Write src/content/blog.json when it changed. Returns the problems found. */
export function writeIndex(options) {
  const { problems, ...index } = collect(options);
  const json = `${JSON.stringify(index, null, 2)}\n`;
  mkdirSync(dirname(OUTPUT), { recursive: true });
  if (!existsSync(OUTPUT) || readFileSync(OUTPUT, "utf8") !== json) writeFileSync(OUTPUT, json);
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes("--check");
  const problems = check ? collect().problems : writeIndex();
  for (const p of problems) console.error(`  ✗ ${p}`);
  if (problems.length) process.exit(1);
  console.log(check ? "blog: every post is in order." : `blog: ${relative(ROOT, OUTPUT)} written.`);
}
