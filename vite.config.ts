import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, type Plugin } from "vite";
import { imagetools } from "vite-imagetools";

// @ts-expect-error: a plain ES module without types
import { buildSkill } from "./scripts/skill/bundle.mjs";
// @ts-expect-error: a plain ES module without types
import { CONTENT, writeIndex } from "./scripts/blog/collect.mjs";
// @ts-expect-error: a plain ES module without types
import remarkBlog from "./scripts/blog/remark-blog.mjs";

/** Serve /SKILL.md in development too, rebuilt from skill/ on every request. (The build writes it in the post-build step.) */
const skillFile = (): Plugin => ({
  name: "pawabase-skill",
  configureServer(server) {
    server.middlewares.use("/SKILL.md", (_req, res) => {
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.end(buildSkill());
    });
  },
});

/**
 * The blog's index (src/content/blog.json) is rebuilt from content/blog before a build and whenever a post changes in development.
 * A wrong post fails the build; in development it is reported and the rest keeps working. Drafts show in development only.
 */
const blogIndex = (): Plugin => {
  let dev = false;
  const run = () => {
    const problems: string[] = writeIndex({ drafts: dev });
    if (!problems.length) return;
    const text = `blog: ${problems.length} problem(s)\n${problems.map((p) => `  - ${p}`).join("\n")}`;
    if (dev) console.warn(text);
    else throw new Error(text);
  };
  return {
    name: "pawabase-blog-index",
    configResolved(config) {
      dev = config.command === "serve";
    },
    buildStart: run,
    configureServer(server) {
      server.watcher.add(CONTENT);
      const changed = (file: string) => {
        if (file.startsWith(CONTENT) || file.endsWith("authors.yaml")) run();
      };
      server.watcher.on("add", changed).on("change", changed).on("unlink", changed);
    },
  };
};

/** Image presets for posts: ?blog is a responsive picture (AVIF, WebP and JPEG at four widths), ?lqip a tiny blurred placeholder inlined in the page. */
const blogImages = () =>
  imagetools({
    defaultDirectives: (url) => {
      if (url.searchParams.has("blog")) return new URLSearchParams({ as: "picture", format: "avif;webp;jpg", w: "640;960;1280;1920", quality: "78" });
      if (url.searchParams.has("lqip")) return new URLSearchParams({ w: "24", format: "webp", quality: "40", blur: "1", inline: "" });
      return new URLSearchParams();
    },
  });

export default defineConfig({
  plugins: [
    blogIndex(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }], remarkGfm, remarkBlog],
        rehypePlugins: [rehypeSlug],
      }),
    },
    blogImages(),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
    skillFile(),
  ],
  // The build manifest tells the SEO step which scripts and styles each page needs, so it can link them in the page itself.
  build: { manifest: true },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
