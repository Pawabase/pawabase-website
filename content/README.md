# Content

The blog lives here. Each post is a folder with its own assets:

```
content/
  authors.yaml                                     who writes (a post names authors by id)
  blog/
    2026/                                          the year
      11-15-every-feature-free-for-seven-days/     MM-DD-slug: the date and the address (/blog/every-feature-free-for-seven-days)
        index.mdx                                  the post
        assets/                                    its images and files
          cover.png
          locked-backups.png
```

## Frontmatter

```yaml
---
title: Every Pawabase feature, free for seven days    # under ~60 characters shows whole in results
description: New organizations now start with …        # 70 to 160 characters: the search snippet and share text
authors: [team]                                        # ids from content/authors.yaml
tags: [Product, Pricing]                               # each tag gets a page at /blog/tag/<tag>
category: Product                                      # optional: the breadcrumb and the share card's label
cover: ./assets/cover.png                              # optional: the post's lead image
coverAlt: What the cover shows                          # required with a cover
date: 2026-11-15                                       # optional: defaults to the folder's date
updated: 2026-11-20                                    # optional: shown on the post, used by search and feeds
slug: another-address                                  # optional: defaults to the folder's name
featured: false
draft: true                                            # drafts show in development only
---
```

## Writing

- **Images:** `![What it shows](./assets/shot.png "Caption under it")`. Images in `assets/` are made into AVIF, WebP and JPEG at
  several sizes with a blurred placeholder; a picture on its own line becomes a figure people can click to open full size. SVG
  and GIF are served as they are. `<Figure src="./assets/shot.png" alt="…" caption="…" wide />` does the same with more control.
- **Code:** fences get highlighting, a copy button and line numbers. Add a title and lit lines: ```` ```ts title="client.ts" {2,4-6} ````.
- **Callouts:** `<Callout type="note | tip | warning | danger" title="…">…</Callout>`.
- **Also:** tables, `<Kbd>⌘K</Kbd>`, and `<Steps>` around `###` headings for numbered steps.

Reading time, word count, the table of contents, related posts, feeds (`/blog/rss.xml`, `/blog/feed.json`), each post's share
card and its search data are all made by the build. `npm run blog:check` checks every post; the build fails on a wrong one.
