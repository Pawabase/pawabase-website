# Pawabase skill (source)

This folder is the source of **https://pawabase.com/SKILL.md**, the guide coding agents read to add Pawabase to a project. It
is the only copy of the skill. Every website build bundles [`SKILL.md`](SKILL.md) and the [references](references) into that one
file (`scripts/skill/bundle.mjs`, called from the post-build step); the dev server serves it live at `/SKILL.md`.

Edit the Markdown here, never the built file. A broken link, or a reference missing from `ORDER` in the bundler, fails the build.

With [`Pawabase/pawabase-docs`](https://github.com/Pawabase/pawabase-docs) checked out beside the website:

```bash
npm run skill:check      # frontmatter, links, docs pages exist, reachability, retired APIs, whitespace
npm run skill:catalog    # rebuild references/docs-catalog.md after the docs change
```

When a client package or the server changes, update [the source map](references/source-map.md) and the client references with
what you verified in the source, then push the website.
