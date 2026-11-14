/**
 * The Pawabase skill as one file: skill/SKILL.md plus every reference under skill/references, served at /SKILL.md.
 *
 * Links between references become links to sections of the same file, and docs paths (`auth/sessions.mdx`) become links to the
 * docs site. The build fails on a broken link or a reference missing from ORDER, so the published file is always whole.
 *
 *   node scripts/skill/bundle.mjs            # print where it would go and how big it is
 *   import { buildSkill } from "./skill/bundle.mjs"   # what the post-build step uses
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const SKILL_DIR = `${ROOT}/skill`;
const DOCS_SITE = "https://docs.pawabase.com";
const SKILL_URL = "https://pawabase.com/SKILL.md";

/** Reading order: how it fits, the common jobs, the clients, each area, then lookups. */
const ORDER = [
  "system", "recipes", "typescript", "python", "http", "auth-policies", "data", "storage", "realtime", "automation", "ai",
  "mcp", "operations", "platform-lifecycle", "capability-boundaries", "troubleshooting", "scenario-map", "source-map",
  "docs-catalog",
];

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const FENCE = /^```[\s\S]*?^```/gm;
const HEADING = /^(#{1,5}) /gm;
const REF_LINK = /\]\((?:references\/)?([a-z-]+)\.md\)/g;
const DOC_PATH = /`([a-z][a-z0-9-]+(?:\/[a-z0-9-]+)+)\.mdx`/g;
const ANY_LINK = /\]\(([^)\s]+)\)/g;

const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Apply `change` to prose only, leaving fenced code alone. */
function outsideCode(text, change) {
  let out = "";
  let last = 0;
  for (const block of text.matchAll(FENCE)) {
    out += change(text.slice(last, block.index)) + block[0];
    last = block.index + block[0].length;
  }
  return out + change(text.slice(last));
}

export function buildSkill() {
  const skill = readFileSync(`${SKILL_DIR}/SKILL.md`, "utf8");
  const front = skill.match(FRONTMATTER);
  if (!front) throw new Error("skill/SKILL.md needs frontmatter");
  const body = skill.slice(front[0].length);

  const present = readdirSync(`${SKILL_DIR}/references`).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
  const missing = present.filter((name) => !ORDER.includes(name));
  if (missing.length) throw new Error(`skill: add these references to ORDER in scripts/skill/bundle.mjs: ${missing.join(", ")}`);

  const sections = new Map(
    ORDER.map((name) => {
      const text = readFileSync(`${SKILL_DIR}/references/${name}.md`, "utf8");
      return [name, { title: text.split("\n")[0].replace(/^#+\s*/, "").trim(), text }];
    }),
  );
  const anchors = new Set([...sections.values()].map((s) => slug(s.title)));

  const links = (prose) =>
    prose
      .replace(REF_LINK, (_, name) => {
        if (!sections.has(name)) throw new Error(`skill: link to a missing reference ${name}.md`);
        return `](#${slug(sections.get(name).title)})`;
      })
      .replace(DOC_PATH, (_, path) => `[\`${path}\`](${DOCS_SITE}/${path})`);

  const parts = [
    `---\n${front[1]}\n---\n\n`,
    outsideCode(body, links).trim() + "\n\n",
    [
      "## Install and use this file",
      "",
      `This is the whole Pawabase skill: the rules above, then every reference below. Read the rules and the sections the task`,
      `needs. Docs links go to the live docs at ${DOCS_SITE}; the target environment's own OpenAPI (Studio → API Explorer) and the`,
      "installed client remain the contract.",
      "",
      "To keep it as a skill your agent loads by itself, save this file into its skills folder:",
      "",
      "```bash",
      `mkdir -p ~/.claude/skills/pawabase && curl -fsSL ${SKILL_URL} -o ~/.claude/skills/pawabase/SKILL.md   # Claude Code`,
      `mkdir -p ~/.agents/skills/pawabase && curl -fsSL ${SKILL_URL} -o ~/.agents/skills/pawabase/SKILL.md   # Codex and others`,
      "```",
      "",
      "Run the same command again to update it.",
      "",
      "Contents:",
      "",
      ...[...sections.values()].map(({ title }) => `- [${title}](#${slug(title)})`),
      "",
    ].join("\n"),
  ];
  for (const { text } of sections.values()) {
    const demoted = outsideCode(text, (prose) => prose.replace(HEADING, (_, hashes) => `#${hashes} `));
    parts.push("\n---\n\n" + outsideCode(demoted, links).trim() + "\n");
  }
  const bundle = parts.join("");

  // Every link left must be absolute or a section of this file.
  const headings = new Set([...bundle.matchAll(/^#{1,6} (.+)$/gm)].map((m) => slug(m[1])));
  for (const [, target] of outsideCode(bundle, (p) => p).matchAll(ANY_LINK)) {
    if (/^(https?:|mailto:)/.test(target)) continue;
    if (target.startsWith("#") && (headings.has(target.slice(1)) || anchors.has(target.slice(1)))) continue;
    throw new Error(`skill: broken link ${target} in the bundled SKILL.md`);
  }
  return bundle;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const bundle = buildSkill();
  console.log(`SKILL.md: ${bundle.split("\n").length} lines, ${Math.round(bundle.length / 1024)} KB, from ${SKILL_DIR}${existsSync(SKILL_DIR) ? "" : " (missing)"}.`);
}
