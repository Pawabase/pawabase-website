import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SitePage } from "@/components/site/SitePage";
import { SiteNav } from "@/components/site/SiteNav";
import { Filler, Pagination, PostCell } from "@/components/blog/parts";
import { PER_PAGE, POSTS, TAGS, pageCount, postsTagged, tagNamed, type Post } from "@/lib/blog";

import "@/components/blog/blog.css";

/*
 * The blog's list, structured like pxxl's and drawn in Pawabase's own palette and type: no decorative hero, a left-aligned title,
 * the topics as pills, then every post as a cell of a hairline grid (picture, meta, title, three lines). "See more" adds the next
 * page's cells in place; the numbered pages under it are plain links, so each page exists for search and without JavaScript.
 */

function Header({ title, quiet, line }: { title: string; quiet: string; line: string }) {
  return (
    <header className="bp-top" data-plain="">
      <SiteNav />
      <div className="bp-intro">
        <div>
          <h1 data-reveal="up"><span>{title}</span> <span className="bp-hot">{quiet}</span></h1>
          <p data-reveal="up">{line}</p>
        </div>
        <a href="/blog/rss.xml" className="sp-link bp-rss"><Icon name="send" size={14} /> RSS feed</a>
      </div>
    </header>
  );
}

function Topics({ active }: { active?: string }) {
  if (TAGS.length < 2) return null;
  return (
    <nav className="bp-topics" aria-label="Topics">
      <a href="/blog" className={`btn btn-sm ${!active ? "btn-light" : "btn-ghost"}`} aria-current={!active ? "page" : undefined}>All</a>
      {TAGS.map((t) => (
        <a key={t.slug} href={`/blog/tag/${t.slug}`} className={`btn btn-sm ${active === t.slug ? "btn-light" : "btn-ghost"}`} aria-current={active === t.slug ? "page" : undefined}>
          {t.name}
        </a>
      ))}
    </nav>
  );
}

/** The grid, with "See more" adding the following pages of ``rest`` in place. */
function Grid({ shown, rest }: { shown: Post[]; rest: Post[] }) {
  const [extra, setExtra] = useState(0);
  const visible = [...shown, ...rest.slice(0, extra)];
  const left = rest.length - extra;
  if (!visible.length) return <p className="bp-empty">The first stories are being written. Until they land, the docs are the best way in.</p>;
  return (
    <>
      <ul className="bp-grid">
        {visible.map((p, i) => <PostCell key={p.slug} post={p} eager={i < 3} />)}
        <Filler count={visible.length} />
      </ul>
      {left > 0 && (
        <div className="bp-more">
          <button type="button" className="btn btn-lg" onClick={() => setExtra((n) => n + PER_PAGE)}>
            See more posts <Icon name="arrowRight" size={16} />
          </button>
          <span className="bp-more-note">{left} more</span>
        </div>
      )}
    </>
  );
}

export function BlogList({ page = 1 }: { page?: number }) {
  const pages = pageCount();
  // the list pages hold PER_PAGE + 1 posts on the first (the registry's count), PER_PAGE on the rest
  const start = page === 1 ? 0 : 1 + (page - 1) * PER_PAGE;
  const end = 1 + page * PER_PAGE;
  return (
    <SitePage title={page > 1 ? `Blog, page ${page}` : "Blog"} description="Product updates and engineering notes from the people building Pawabase.">
      <Header title="Notes from" quiet="the build." line={page > 1 ? `Page ${page} of ${pages}.` : "Product updates and engineering notes from the people building Pawabase."} />
      <section className="bp-list" aria-label="Posts">
        <Topics />
        <Grid shown={POSTS.slice(start, end)} rest={POSTS.slice(end)} key={page} />
        <Pagination page={page} pages={pages} />
      </section>
    </SitePage>
  );
}

export function BlogTag({ slug }: { slug: string }) {
  const tag = tagNamed(slug);
  const posts = postsTagged(slug);
  const name = tag?.name ?? slug;
  return (
    <SitePage title={`${name} posts`} description={`Pawabase posts about ${name}.`}>
      <Header title={name} quiet={`· ${posts.length} post${posts.length === 1 ? "" : "s"}`} line={`Everything we've written about ${name}, newest first.`} />
      <section className="bp-list" aria-label="Posts">
        <Topics active={slug} />
        <Grid shown={posts.slice(0, PER_PAGE)} rest={posts.slice(PER_PAGE)} key={slug} />
      </section>
    </SitePage>
  );
}
