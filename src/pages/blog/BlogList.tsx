import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SitePage } from "@/components/site/SitePage";
import { SiteNav } from "@/components/site/SiteNav";
import { FeaturedPost, Pagination, PostCell } from "@/components/blog/parts";
import { PER_PAGE, POSTS, TAGS, pageCount, postsTagged, tagNamed, type Post } from "@/lib/blog";

import "@/components/blog/blog.css";

/*
 * The blog's list: a compact header (title, one line, RSS), the newest post as one wide bordered card on the first page, the topics as
 * a quiet row of links, then the rest as bordered cards with their pictures edge to edge. "See more" adds the next page's cards in
 * place; the numbered pages under it are plain links, so each page exists for search and without JavaScript. Nothing floats over the
 * page: no sky, no marks.
 */

function Header({ title, line, count }: { title: string; line: string; count?: string }) {
  return (
    <header className="bp-top" data-plain="">
      <SiteNav />
      <div className="bp-intro">
        <div>
          <h1>{title}{count && <span className="bp-count">{count}</span>}</h1>
          <p>{line}</p>
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
      <a href="/blog" aria-current={!active ? "page" : undefined}>All posts</a>
      {TAGS.map((t) => (
        <a key={t.slug} href={`/blog/tag/${t.slug}`} aria-current={active === t.slug ? "page" : undefined}>{t.name}</a>
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
  // the list pages hold PER_PAGE + 1 posts on the first (the registry's count), PER_PAGE on the rest; the first page leads with the newest
  const start = page === 1 ? 0 : 1 + (page - 1) * PER_PAGE;
  const end = 1 + page * PER_PAGE;
  const shown = POSTS.slice(start, end);
  const featured = page === 1 ? shown[0] : undefined;
  return (
    <SitePage title={page > 1 ? `Blog, page ${page}` : "Blog"} description="Product updates and engineering notes from the people building Pawabase.">
      <Header title="Blog" line={page > 1 ? `Page ${page} of ${pages}.` : "Product updates, guides and engineering notes from the people building Pawabase."} />
      <section className="bp-list" aria-label="Posts" data-plain="">
        {featured && <FeaturedPost post={featured} />}
        <Topics />
        <Grid shown={featured ? shown.slice(1) : shown} rest={POSTS.slice(end)} key={page} />
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
      <Header title={name} count={`${posts.length} post${posts.length === 1 ? "" : "s"}`} line={`Everything we've written about ${name}, newest first.`} />
      <section className="bp-list" aria-label="Posts" data-plain="">
        <Topics active={slug} />
        <Grid shown={posts.slice(0, PER_PAGE)} rest={posts.slice(PER_PAGE)} key={slug} />
      </section>
    </SitePage>
  );
}
