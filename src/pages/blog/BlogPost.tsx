import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

import { Icon } from "@/components/Icon";
import { SitePage } from "@/components/site/SitePage";
import { SiteNav } from "@/components/site/SiteNav";
import { Picture } from "@/components/blog/Figure";
import { COMPONENTS } from "@/components/blog/mdx";
import { Byline, Filler, Meta, PostCell, Progress, Share, Toc } from "@/components/blog/parts";
import { longDate, neighbours, relatedTo, tagSlug, type Cover, type Post, type TocItem } from "@/lib/blog";

import "@/components/blog/blog.css";

/*
 * One post, structured like pxxl's and drawn in Pawabase's own palette and type: no decorative hero and no box around the text.
 * A way back, the topic in orange, the title left-aligned, the meta line with sharing on the right, a hairline; the cover; then one
 * reading column, with the sections in a quiet rail beside it on wide screens. After the last line: topics, the author, the posts
 * before and after, and related posts in the list's grid.
 */

export type Loaded = { Content: ComponentType<MDXProps>; toc: TocItem[]; cover: Cover | null };

export function BlogPost({ post, loaded }: { post: Post; loaded: Loaded }) {
  const { Content, toc, cover } = loaded;
  const { newer, older } = neighbours(post.slug);
  const related = relatedTo(post);
  return (
    <SitePage title={post.title} description={post.description}>
      <Progress />
      <header className="bp-top" data-plain="">
        <SiteNav />
        <div className="bp-column bp-post-head">
          <a href="/blog" className="bp-back"><Icon name="arrowRight" size={14} /> Back to blog</a>
          <p className="ix-caps bp-kicker">
            {post.category ? <a href={`/blog/tag/${tagSlug(post.category)}`} className="bp-hot">{post.category}</a> : <span className="bp-hot">Blog</span>}
            <span aria-hidden="true">·</span>
            <span>Pawabase</span>
          </p>
          <h1>{post.title}</h1>
          <p className="bp-lede">{post.description}</p>
          <div className="bp-post-meta">
            <div>
              <Meta post={post} long />
              {post.updated && post.updated !== post.date && <p className="bp-updated">Updated {longDate(post.updated)}</p>}
            </div>
            <Share post={post} compact />
          </div>
        </div>
      </header>

      {cover && (
        <div className="bp-column bp-cover">
          <Picture image={cover.image} lqip={cover.lqip} alt={cover.alt} sizes="(max-width: 960px) 100vw, 920px" eager />
        </div>
      )}

      <div className="bp-reading">
        <article className="bp-article">
          <Content components={COMPONENTS} />
        </article>
        {toc.length > 1 && (
          <aside className="bp-rail" aria-label="On this page">
            <nav className="bp-toc">
              <Toc items={toc} />
            </nav>
          </aside>
        )}
      </div>

      <footer className="bp-column bp-after" aria-label="About this post">
        <div className="bp-after-row">
          <div className="bp-topics">
            {post.tags.map((t) => <a key={t} href={`/blog/tag/${tagSlug(t)}`} className="btn btn-sm btn-ghost">{t}</a>)}
          </div>
          <Share post={post} />
        </div>
        <Byline post={post} />
        {(newer || older) && (
          <nav className="bp-neighbours" aria-label="More posts">
            {older ? (
              <a href={`/blog/${older.slug}`} rel="prev"><span className="ix-caps">← Previous</span><b>{older.title}</b></a>
            ) : <span />}
            {newer ? (
              <a href={`/blog/${newer.slug}`} rel="next" className="next"><span className="ix-caps">Next →</span><b>{newer.title}</b></a>
            ) : <span />}
          </nav>
        )}
      </footer>

      {related.length > 0 && (
        <section className="bp-list bp-related" aria-labelledby="related-title">
          <div className="bp-related-head">
            <h2 id="related-title">Keep reading</h2>
            <a href="/blog" className="sp-link">All posts <Icon name="arrowRight" size={15} /></a>
          </div>
          <ul className="bp-grid">
            {related.map((p) => <PostCell key={p.slug} post={p} />)}
            <Filler count={related.length} />
          </ul>
        </section>
      )}
    </SitePage>
  );
}
