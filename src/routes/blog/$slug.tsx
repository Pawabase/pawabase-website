import { createFileRoute, notFound } from "@tanstack/react-router";

import { loadPost, postNamed } from "@/lib/blog";
import { BlogPost } from "@/pages/blog/BlogPost";

/** One post. Its MDX loads with the page, so the article is in the HTML the build writes. */
export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = postNamed(params.slug);
    if (!post) throw notFound();
    const module = await loadPost(post);
    return { post, loaded: { Content: module.default, toc: module.toc, cover: module.cover } };
  },
  component: function PostPage() {
    const { post, loaded } = Route.useLoaderData();
    return <BlogPost post={post} loaded={loaded} />;
  },
});
