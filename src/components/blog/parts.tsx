import { useEffect, useState } from "react";

import { Icon } from "@/components/Icon";
import { AUTHORS, coverOf, pageHref, shortDate, tagSlug, type Author, type Post, type TocItem } from "@/lib/blog";
import { absolute } from "@/seo/site";

import { Picture } from "./Figure";

const LINK_NAMES: Record<string, string> = { x: "X", github: "GitHub", linkedin: "LinkedIn", website: "Website" };

const authorsOf = (post: Post) => post.authors.map((id) => AUTHORS[id]).filter((a): a is Author => Boolean(a));

/**
 * A post in the grid: one cell of a hairline grid (cells touch, like pxxl's and the site's own cells). The picture sits rounded
 * inside the cell, then a small mono meta line, the title and three lines of its description. The whole cell is the link.
 */
export function PostCell({ post, eager = false }: { post: Post; eager?: boolean }) {
  const cover = coverOf(post);
  return (
    <li className="bp-cell">
      <a href={`/blog/${post.slug}`} className="bp-cell-link">
        <span className="bp-cell-media">
          {cover ? (
            <Picture image={cover.image} lqip={cover.lqip} alt={cover.alt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px" eager={eager} />
          ) : (
            <span className="bp-cell-art" aria-hidden="true">
              <span>{post.category ?? post.tags[0] ?? "Blog"}</span>
            </span>
          )}
        </span>
        <span className="bp-cell-meta">
          {post.draft && <span className="bp-draft">Draft</span>}
          <time dateTime={post.date}>{shortDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.category ?? post.tags[0] ?? "Blog"}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min</span>
        </span>
        <span className="bp-cell-title">{post.title}</span>
        <span className="bp-cell-text">{post.description}</span>
      </a>
    </li>
  );
}

/** Empty cells that finish the grid's last row, so its lines run to the edge. */
export function Filler({ count, columns = 3 }: { count: number; columns?: number }) {
  const missing = (columns - (count % columns)) % columns;
  return <>{Array.from({ length: missing }, (_, i) => <li key={i} className="bp-cell bp-cell-empty" aria-hidden="true" />)}</>;
}

/** Who, when and how long. */
export function Meta({ post, long = false }: { post: Post; long?: boolean }) {
  const authors = authorsOf(post);
  return (
    <p className="bp-meta">
      <span className="bp-avatars" aria-hidden="true">
        {authors.map((a) => (a.avatar ? <img key={a.id} src={a.avatar} alt="" width={22} height={22} /> : <span key={a.id}>{a.name[0]}</span>))}
      </span>
      <span>{authors.map((a) => a.name).join(", ")}</span>
      <span className="bp-dot" aria-hidden="true">·</span>
      <time dateTime={post.date}>{shortDate(post.date)}</time>
      <span className="bp-dot" aria-hidden="true">·</span>
      <span>{post.readingTime} min read</span>
      {long && (
        <>
          <span className="bp-dot" aria-hidden="true">·</span>
          <span>{post.words.toLocaleString("en")} words</span>
        </>
      )}
    </p>
  );
}

/** Numbered pages in mono, newer and older at the ends. Plain links, so every page works without JavaScript and is crawled. */
export function Pagination({ page, pages, href = pageHref }: { page: number; pages: number; href?: (n: number) => string }) {
  if (pages <= 1) return null;
  const numbers = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1);
  return (
    <nav className="bp-pages" aria-label="Pages of the blog">
      {page > 1 ? <a href={href(page - 1)} rel="prev" className="sp-link">← Newer</a> : <span className="bp-off">← Newer</span>}
      <span className="bp-page-numbers">
        {numbers.map((n, i) => (
          <span key={n} className="bp-page-slot">
            {i > 0 && n - numbers[i - 1]! > 1 && <span className="bp-gap">…</span>}
            {n === page ? <span className="bp-page on" aria-current="page">{String(n).padStart(2, "0")}</span> : <a href={href(n)} className="bp-page">{String(n).padStart(2, "0")}</a>}
          </span>
        ))}
      </span>
      {page < pages ? <a href={href(page + 1)} rel="next" className="sp-link">Older →</a> : <span className="bp-off">Older →</span>}
    </nav>
  );
}

/** The bar along the top of a post that fills as you read. */
export function Progress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const body = document.querySelector(".bp-article");
      if (!body) return;
      const box = body.getBoundingClientRect();
      const total = box.height - window.innerHeight * 0.6;
      setValue(Math.min(1, Math.max(0, -box.top / Math.max(1, total))));
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);
  return <div className="bp-progress" style={{ transform: `scaleX(${value})` }} aria-hidden="true" />;
}

/** The post's sections, as the reading view's side nav (the legal pages' nav): the one being read lit. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const watch = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    targets.forEach((t) => watch.observe(t));
    return () => watch.disconnect();
  }, [items]);
  if (items.length < 2) return null;
  return (
    <>
      <p className="ix-caps bp-side-label">On this page</p>
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={`${active === i.id ? "on" : ""} ${i.depth === 3 ? "bp-sub" : ""}`}>{i.text}</a>
      ))}
    </>
  );
}

/** Share the post, or copy its address. ``side`` lays it out for the side nav. */
export function Share({ post, side = false, compact = false }: { post: Post; side?: boolean; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const url = absolute(`/blog/${post.slug}`);
  const text = encodeURIComponent(post.title);
  const to = encodeURIComponent(url);
  const links = [
    { name: "X", href: `https://x.com/intent/post?text=${text}&url=${to}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${to}` },
    { name: "Hacker News", href: `https://news.ycombinator.com/submitlink?u=${to}&t=${text}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* refused: nothing to do */
    }
  };
  if (side) {
    return (
      <>
        <p className="ix-caps bp-side-label">Share</p>
        {links.map((l) => <a key={l.name} href={l.href} target="_blank" rel="noreferrer noopener">{l.name}</a>)}
        <a href={url} onClick={(e) => { e.preventDefault(); void copy(); }}>{copied ? "Link copied" : "Copy link"}</a>
      </>
    );
  }
  if (compact) {
    return (
      <div className="bp-share">
        <a href={links[0]!.href} target="_blank" rel="noreferrer noopener" className="btn btn-sm btn-ghost">Share on X</a>
        <button type="button" className="btn btn-sm" onClick={copy}><Icon name="link" size={14} /> {copied ? "Copied" : "Copy link"}</button>
      </div>
    );
  }
  return (
    <div className="bp-share">
      {links.map((l) => <a key={l.name} href={l.href} target="_blank" rel="noreferrer noopener" className="btn btn-sm btn-ghost">{l.name}</a>)}
      <button type="button" className="btn btn-sm" onClick={copy}><Icon name="link" size={14} /> {copied ? "Link copied" : "Copy link"}</button>
    </div>
  );
}

/** Who wrote it. */
export function Byline({ post }: { post: Post }) {
  return (
    <div className="bp-byline">
      {authorsOf(post).map((a) => (
        <div key={a.id} className="bp-author">
          {a.avatar ? <img src={a.avatar} alt="" width={48} height={48} /> : <span className="bp-author-initial">{a.name[0]}</span>}
          <div>
            <p className="ix-caps">Written by</p>
            <p className="bp-author-name">{a.name}</p>
            {a.bio && <p className="bp-author-bio">{a.bio}</p>}
            {a.links && (
              <p className="bp-author-links">
                {Object.entries(a.links).map(([name, href]) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer noopener" className="sp-link">{LINK_NAMES[name] ?? name[0]!.toUpperCase() + name.slice(1)}</a>
                ))}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { tagSlug };
