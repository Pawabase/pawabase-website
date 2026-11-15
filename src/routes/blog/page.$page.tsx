import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { pageCount } from "@/lib/blog";
import { BlogList } from "@/pages/blog/BlogList";

/** /blog/page/2 and on. Page 1 is /blog itself. */
export const Route = createFileRoute("/blog/page/$page")({
  loader: ({ params }) => {
    const page = Number(params.page);
    if (page === 1) throw redirect({ to: "/blog" });
    if (!Number.isInteger(page) || page < 1 || page > pageCount()) throw notFound();
    return { page };
  },
  component: function BlogPage() {
    const { page } = Route.useLoaderData();
    return <BlogList page={page} />;
  },
});
