import { createFileRoute, notFound } from "@tanstack/react-router";

import { tagNamed } from "@/lib/blog";
import { BlogTag } from "@/pages/blog/BlogList";

export const Route = createFileRoute("/blog/tag/$tag")({
  loader: ({ params }) => {
    if (!tagNamed(params.tag)) throw notFound();
    return { tag: params.tag };
  },
  component: function TagPage() {
    const { tag } = Route.useLoaderData();
    return <BlogTag slug={tag} />;
  },
});
