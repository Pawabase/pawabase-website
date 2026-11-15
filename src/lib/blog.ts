import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

import index from "@/content/blog.json";

/**
 * The blog, read from src/content/blog.json (written from content/blog by scripts/blog/collect.mjs) and the posts' own modules.
 * The index is what lists, feeds and search need without rendering a post; a post's module (its MDX) is loaded only on its page.
 */

/** A post image, optimised by vite-imagetools: AVIF and WebP sources and a JPEG fallback with its real size. */
export type Picture = { sources: Record<string, string>; img: { src: string; w: number; h: number } };
export type Cover = { image: Picture; lqip: string | null; alt: string };
export type TocItem = { depth: 2 | 3; text: string; id: string };

export type Post = {
  slug: string;
  id: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  authors: string[];
  tags: string[];
  category: string | null;
  cover: string | null;
  coverAlt: string | null;
  featured: boolean;
  draft: boolean;
  words: number;
  readingTime: number;
  related: string[];
  source: string;
};

export type Author = { id: string; name: string; role?: string; avatar?: string; bio?: string; links?: Record<string, string> };
export type Tag = { slug: string; name: string; count: number };

export const POSTS = index.posts as Post[];
export const AUTHORS = index.authors as Record<string, Author>;
export const TAGS = index.tags as Tag[];
export const PER_PAGE = index.perPage as number;

export const tagSlug = (tag: string) => tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const tagNamed = (slug: string) => TAGS.find((t) => t.slug === slug);
export const postNamed = (slug: string) => POSTS.find((p) => p.slug === slug);
export const postsTagged = (slug: string) => POSTS.filter((p) => p.tags.some((t) => tagSlug(t) === slug));

/** How many list pages there are, for the posts given. The first page holds the newest post large and PER_PAGE more under it. */
export const pageCount = (posts: Post[] = POSTS) => Math.max(1, Math.ceil(Math.max(0, posts.length - 1) / PER_PAGE));
/** The posts on list page ``n`` (from 1): the lead post is only on the first. */
export function pageOf(n: number, posts: Post[] = POSTS) {
  const [lead, ...rest] = posts;
  return { lead: n === 1 ? lead : undefined, items: rest.slice((n - 1) * PER_PAGE, n * PER_PAGE) };
}
export const pageHref = (n: number) => (n <= 1 ? "/blog" : `/blog/page/${n}`);

/** The post before and after this one in time (older, newer). */
export function neighbours(slug: string) {
  const at = POSTS.findIndex((p) => p.slug === slug);
  return { newer: at > 0 ? POSTS[at - 1] : undefined, older: at >= 0 ? POSTS[at + 1] : undefined };
}

export const relatedTo = (post: Post) => post.related.map(postNamed).filter((p): p is Post => Boolean(p));

const LONG = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const SHORT = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
export const longDate = (iso: string) => LONG.format(new Date(`${iso}T00:00:00Z`));
export const shortDate = (iso: string) => SHORT.format(new Date(`${iso}T00:00:00Z`));

// ── the posts' modules ─────────────────────────────────────────────────────

type PostModule = {
  default: ComponentType<MDXProps>;
  frontmatter: Record<string, unknown>;
  cover: Cover | null;
  toc: TocItem[];
};

/** Each post's whole module, loaded on its own page. */
const modules = import.meta.glob<PostModule>("/content/blog/*/*/index.mdx");
/** Each post's cover only (optimised images, nothing else of the post), for the cards on the list pages. */
const covers = import.meta.glob<Cover | null>("/content/blog/*/*/index.mdx", { eager: true, import: "cover" });

const fileOf = (post: Post) => `/${post.source}`;
export const coverOf = (post: Post): Cover | null => covers[fileOf(post)] ?? null;
export async function loadPost(post: Post): Promise<PostModule> {
  const load = modules[fileOf(post)];
  if (!load) throw new Error(`no module for ${post.source}`);
  return load();
}
