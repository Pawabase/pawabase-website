import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// @ts-expect-error: a plain ES module without types
import { buildSkill } from "./scripts/skill/bundle.mjs";

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

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    skillFile(),
  ],
  // The build manifest tells the SEO step which scripts and styles each page needs, so it can link them in the page itself.
  build: { manifest: true },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
