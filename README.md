# Pawabase website

The marketing site: a homepage and six product pages (`/products/auth`, `/products/database`, `/products/storage`, `/products/functions`, `/products/automation`, `/cloud`).
React 19, TypeScript, TanStack Router, Vite, and a build-time prerender of every page. Plain CSS: the tokens are Pawabase Studio's design system
(`studio/frontend/src/styles.css`): a tinted canvas, white cards, pill controls, ink as the primary action, pastels for decoration.

## Run

```sh
npm ci
npm run dev            # http://127.0.0.1:4173
npm run build          # typecheck, client build, server build, prerender every page into dist/
npm run preview        # serve dist/ on the same port
CHECK_URL=http://127.0.0.1:4173 node scripts/check.mjs
```

`scripts/check.mjs` opens every page in both themes at 1440, 768 and 390 px and fails on console errors, horizontal overflow, axe violations, any
box-shadow, text-shadow, filter, backdrop-filter or gradient in computed styles, banned marketing words, and broken internal links.
`scripts/shot.mjs <path> [--full --scroll --theme light|dark --w 1440]` takes a screenshot for review. `scripts/social.mjs` renders `public/social.png`.

## Illustrations

Every illustration is a Hairline figure (the `@lucasmarkes/hairline` engine, vendored in `src/hairline/core`), drawn for Pawabase in `src/hairline/pawabase`:
`session`, `records`, `bucket`, `rack` and `steps` are built on `picker.ts`, one plate with parts of which the pointer picks one; `foundation`,
`schema`, `workers` and `regions` are drawn on their own. They load when they near the viewport, honour `prefers-reduced-motion`, and are described to
assistive technology by a label. There are no screenshots or recordings on the site, and nothing in a figure is a word.
`src/hairline/registry.ts` lists them. In development, `/__figures` shows each one large.

## Content rules

Only what the product documentation and code support is stated. Pawabase Cloud is described as pre-launch, in Nigeria, billed in naira through
Paystack, with plans and prices unpublished. Function isolation is described as in review. Code samples are copied from the public documentation.

## Configuration

- `SITE_URL` (build time) sets canonical URLs, social tags, structured data, `robots.txt` and the sitemap. Without it the build is a localhost preview marked `noindex`.
- `VITE_DOCS_URL` points documentation links at a docs host; by default they point at the MDX in `Pawabase/pawabase-docs`.
- `VITE_DASHBOARD_URL` adds a Sign in link; without it none is shown.

Serve `dist` as static files and return 404 for unknown paths.
