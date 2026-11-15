/** What a post module exports (scripts/blog/remark-blog.mjs adds cover and toc; remark-mdx-frontmatter adds frontmatter). */
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { JSX } from "react";

  export const frontmatter: Record<string, unknown>;
  export const cover: { image: import("@/lib/blog").Picture; lqip: string | null; alt: string } | null;
  export const toc: { depth: 2 | 3; text: string; id: string }[];
  export default function MDXContent(props: MDXProps): JSX.Element;
}

/** A post image (?blog): AVIF and WebP srcsets, and the JPEG fallback with its size. */
declare module "*?blog" {
  const picture: import("@/lib/blog").Picture;
  export default picture;
}
/** A post image's placeholder (?lqip): a tiny blurred image as a data URL. */
declare module "*?lqip" {
  const src: string;
  export default src;
}
