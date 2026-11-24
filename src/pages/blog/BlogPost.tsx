import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

import { Icon } from "@/components/Icon";
import { SitePage } from "@/components/site/SitePage";
import { SiteNav } from "@/components/site/SiteNav";
import { Picture } from "@/components/blog/Figure";
import { COMPONENTS } from "@/components/blog/mdx";
import { Byline, Meta, PostCell, Progress, Share, Toc } from "@/components/blog/parts";
import { longDate, neighbours, relatedTo, tagSlug, type Cover, type Post, type TocItem } from "@/lib/blog";

import "@/components/blog/blog.css";

/*
 * One post, as one column: the way back, the topic, the title, the line under it and the byline with sharing, the cover, the text,
 * then the topics, the author and the posts before and after, every part starting on the same left edge. On wide screens the post's
 * sections sit in a quiet rail beside the text and stay in view. Under it, more posts as the list's cards. Nothing floats.
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
      </header>
      <section className="bp-layout" data-plain="" aria-label={post.title}>
        <div className="bp-post-head">
          <a href="/blog" className="bp-back"><Icon name="arrowRight" size={14} /> All posts</a>
          <p className="bp-kicker">
            {post.category ? <a href={`/blog/tag/${tagSlug(post.category)}`}>{post.category}</a> : <span>Blog</span>}
          </p>
          <h1>{post.title}</h1>
          <p className="bp-lede">{post.description}</p>
          <div className="bp-post-meta">
            <div>
              <Meta post={post} />
              {post.updated && post.updated !== post.date && <p className="bp-updated">Updated {longDate(post.updated)}</p>}
            </div>
            <Share post={post} compact />
          </div>
        </div>

        {cover && (
          <div className="bp-cover">
            <Picture image={cover.image} lqip={cover.lqip} alt={cover.alt} sizes="(max-width: 800px) 100vw, 760px" eager />
          </div>
        )}

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

        <footer className="bp-after" aria-label="About this post">
          <div className="bp-after-row">
            <div className="bp-tags">
              {post.tags.map((t) => <a key={t} href={`/blog/tag/${tagSlug(t)}`}>{t}</a>)}
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
      </section>

      {related.length > 0 && (
        <section className="bp-list bp-related" aria-labelledby="related-title" data-plain="">
          <div className="bp-related-head">
            <h2 id="related-title">Keep reading</h2>
            <a href="/blog" className="sp-link">All posts <Icon name="arrowRight" size={15} /></a>
          </div>
          <ul className="bp-grid">
            {related.map((p) => <PostCell key={p.slug} post={p} />)}
          </ul>
        </section>
      )}
    </SitePage>
  );
}
