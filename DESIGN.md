# Pawabase Design System

## 1. Atmosphere & Identity

Pawabase feels like a precision instrument in a dark room: quiet, exact, and deliberately bold. The site should read as an engineered product surface, not a documentation portal.

Confidence comes from scale, weight, alignment, and negative space. Product pages are marketing pages: one clear argument per section, a strong interface demonstration, and no navigational scaffolding competing with the story.

The landing page keeps the **rail** as its structural signature: narrow columns, hairlines, and small orange registration crosses at section boundaries. Product marketing pages use a centered `1240px` container instead. They share the same color, type, and surface language without repeating the rail or adding a sidebar.

## 2. Color

| Role | Token | Dark | Usage |
|------|-------|------|-------|
| Canvas | `--color-page` / `--color-shell` / `--color-deep` | `#08090A` | Page and shell background |
| Primary surface | `--color-surface` | `#0B0C0D` | Inset blocks and product mockups |
| Elevated surface | `--color-elevated` | `#16171A` | Floating windows and code chrome |
| Text primary | `--color-text` | `#EDEDED` | Headings and primary copy |
| Text secondary | `--color-muted` | `#A1A3A8` | Body copy and descriptions |
| Text tertiary | `--color-faint` | `#74767C` | Metadata and secondary rows |
| Border default | `--color-line` | `#292A2D` | Rails and section rules |
| Border subtle | `--color-line-subtle` | `#1F2023` | Dense internal rules |
| Brand | `--color-brand` | `#FF7049` | Active signals and product accents |
| Secondary accent | `--color-lavender` | `#9A8CFF` | Focus rings only |
| Tint surface | `--color-tint` | `#0E0B14` | Rare section variation |
| Warm surface | `--color-warm` | `#120D0B` | Rare section variation |

### Rules

- Dark only. No light theme.
- Orange is a signal, not a background: icons, active states, connectors, and short emphasis.
- Lavender is reserved for keyboard focus.
- Surfaces separate through tonal shift and 1px rules. Marketing sections do not become card grids.
- Product mockup cards may use a soft shadow to sit above the stage. That is interface chrome, not page decoration.
- Code specimens use the syntax colors defined in `CodeSnippet`; those are content colors, not UI tokens.

## 3. Typography

### Families

- Primary: `Plus Jakarta Sans Variable`, fallback `Plus Jakarta Sans`, `ui-sans-serif`, `system-ui`, `sans-serif`.
- Mono: `Geist Mono Variable`, fallback `ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`.

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `clamp(48px, 5.7vw, 84px)` | 700 | 1.02 | `-0.062em` | Product hero title |
| H2 | `clamp(34px, 3.8vw, 54px)` | 700 | 1.08 | `-0.05em` | Section headlines |
| H3 | `18–22px` | 650 | 1.25 | `-0.03em` | Mockup headings |
| Lead | `17–18px` | 500 | 1.72 | `-0.01em` | Hero description |
| Body | `16–17px` | 500 | 1.78 | `-0.01em` | Standard section copy |
| Small | `13px` | 500 | 1.55 | `0` | Metadata and rows |
| Micro | `12px` | 600 | 1.4 | `0` | UI chips and compact labels |
| Code | `12–13px` | 400 | 1.8 | `0` | Specimens and terminal text |

### Rules

- Product headings are bold. Do not use 400-weight display type.
- Body and lead copy are medium-weight. Avoid thin, airy paragraphs on dark surfaces.
- Use `text-muted` for explanatory text. `text-faint` is for metadata only.
- Mono is for code, request paths, identifiers, and compact UI labels. Never use mono for body prose.
- No kicker or eyebrow is required above a product title. When present, it is plain text, never a pill.
- Display type should not wrap beyond three lines on desktop.

## 4. Spacing & Layout

### Base Unit

All spacing derives from **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon gaps, tight inline groups |
| `space-2` | 8px | Label-to-value, compact rows |
| `space-3` | 12px | Small internal padding |
| `space-4` | 16px | Standard internal padding |
| `space-5` | 20px | Comfortable block padding |
| `space-6` | 24px | Default block spacing |
| `space-8` | 32px | Content clusters |
| `space-10` | 40px | Subsection rhythm |
| `space-12` | 48px | Section breaks |
| `space-16` | 64px | Page-level rhythm |
| `space-20` | 80px | Large editorial pauses |
| `space-24` | 96px | Maximum section separation |

### Rails & Grid

- Landing page rail: `grid-cols-[14px_minmax(0,1fr)_14px]` below 768px.
- Landing page tablet rail: `grid-cols-[42px_minmax(0,1fr)_42px]` at 768px+.
- Landing page desktop rail: `grid-cols-[minmax(86px,9.25%)_minmax(0,1fr)_minmax(86px,9.25%)]` at 1241px+.
- Product marketing container: `min(1240px, calc(100% - 96px))`; `calc(100% - 64px)` below 1000px; `calc(100% - 40px)` below 600px.
- Product hero: two columns with a `64–88px` gap, or one centered column.
- Feature scenes: visual-wide, copy-wide, or stacked. Collapse to one column at 1000px.
- Long-form text max width: `56ch`.
- Breakpoints in use: 560px, 600px, 640px, 768px, 900px, 980px, 1000px, 1100px, 1241px.

### Rules

- Product pages never use a sticky index, table of contents, numbering, breadcrumbs, or sidebar.
- Every product owns a separate page and route file. Pages share low-level primitives, never a data-driven page generator.
- Product pages use one `<h1>`, sequential `<h2>` sections, and a focused closing CTA.
- Vertical rhythm is asymmetric: hero and section openings are spacious, mockup rows are dense.
- At 375px, primary content must be one column with no horizontal scrolling.

## 5. Components

### ProductFrame

- **Structure**: skip link → sticky `TopBar` → optional contour field → `<main>` → `Footer`.
- **Usage**: every product marketing page.
- **Accessibility**: skip link targets `#product-content`; page has one `<main>`.
- **Visuals**: contour lines sit behind the hero at low opacity and fade before the first feature scene.

### ProductHero

- **Structure**: optional plain-text context line → `<h1>` → lead → primary action and secondary product link → visual stage.
- **Variants**: `visual-wide`, `visual-left`, `centered`.
- **Rules**: no pill label, no stat strip, no dense paragraph. The hero makes one argument.
- **Accessibility**: hero title is the page `<h1>`; actions are descriptive links.

### ProductVisual

- **Structure**: bordered stage with a small set of connected interface objects.
- **Variants**: schema, request, media, identity, policy, event, queue, and code scenes.
- **Rules**: every object must make the adjacent claim concrete. Use safe clipping rather than shrinking type below readable sizes.
- **Responsive**: connectors are hidden below 600px; extra decorative objects may be clipped.

### MockCard

- **Structure**: `MockHeader` → `MiniRow` list, code block, or product-specific content.
- **Usage**: product UI demonstrations only. Not a marketing card.
- **Rules**: rows stay dense and legible; do not turn mockups into feature-card grids.

### Pill

- **Usage**: compact state or permission chips inside product mockups only.
- **Rules**: never use pills for marketing eyebrows, section labels, or page navigation.
- **Shape**: 4px radius, 1px border, 12px semibold text.
- **Accessibility**: state must also be conveyed by text, not color alone.

### MetricBand

- **Structure**: four compact value/label pairs separated by rules.
- **Usage**: product capability snapshot between hero and feature scenes.
- **Rules**: values are facts, not vanity metrics. No animated counters.

### FeatureScene

- **Structure**: copy column plus visual column, or a stacked composition.
- **Variants**: `visual-wide`, `copy-wide`, `stacked`, optional reverse.
- **Rules**: alternate compositions to create narrative rhythm. Each scene explains one distinct capability.

### CenterScene

- **Structure**: centered copy block followed by a wide visual.
- **Usage**: code, request flows, or diagrams that need full width.
- **Rules**: copy stays under `780px`; the visual carries the detail.

### CodePanel

- **Structure**: `CodeSnippet` inside a constrained product panel.
- **Usage**: API requests, function output, policy conditions, or terminal results.
- **Accessibility**: code is labelled and horizontally scrollable on narrow screens.

### ProductCta

- **Structure**: closing title plus primary and next-product actions.
- **Rules**: no new argument, no form, no repeated feature list.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150ms | ease-out | Link and icon color changes |
| Standard | 200ms | ease-in-out | Primary button hover |
| Emphasis | 400–600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Existing landing moments only |

### Rules

- Animate `color`, `background-color`, `border-color`, `transform`, and `opacity` only.
- Every interactive element has hover and focus-visible states.
- No decorative motion on non-interactive text.
- Respect `prefers-reduced-motion`; do not add motion that needs a fallback.
- Product pages do not use scroll-triggered reveals.

## 7. Depth & Surface

### Strategy

**Borders + tonal shift.** The system is flat by default. Structure comes from 1px rules and small shifts between `#08090A`, `#0B0C0D`, and `#16171A`.

| Type | Value | Usage |
|------|-------|-------|
| Default rule | `1px solid var(--color-line)` | Rails, section boundaries |
| Subtle rule | `1px solid var(--color-line-subtle)` | Internal rows, dense lists |
| Mockup lift | `0 18px 50px rgba(0,0,0,0.24)` | Interface objects above a stage |
| Floating chrome | `0 18px 70px rgba(0,0,0,0.34)` | TopBar only |

### Rules

- No glass panels. No gradient page backgrounds.
- Use more space or a rule before considering a new surface.
- Elevated surfaces are reserved for code chrome, mockups, and floating navigation.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target: body text at least 4.5:1, large text at least 3:1.
- Every interactive element has a visible focus-visible state using the lavender ring.
- Full keyboard reachability for `TopBar`, product actions, body links, and `Footer`.
- One `<h1>` per page; heading levels must not skip.
- `prefers-reduced-motion` is respected.
- No color-only meaning. Active states include a text or border change.
- No horizontal scroll of primary content at 375px.
- Every product page has a skip link to `#product-content`.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| Low-contrast 12px UI metadata on dark mockups | Product visual stages | It is decorative interface chrome, not primary content; actionable copy uses `text-muted` or brighter | Revisit during a full accessibility pass |
| React dev tooling (`react-grab`, `react-scan`, `react-doctor`) not installed | Project-wide | Marketing site has no existing dev-tooling layer; adding it is outside the page-design scope | Add when a React performance workstream starts |
