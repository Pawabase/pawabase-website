import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import { routeTree } from "@/routeTree.gen";

/** One page of the site as HTML, for the build to write into that page's file so crawlers and link previews get the content without running any JavaScript. */
export async function render(path: string): Promise<string> {
  const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: [path] }) });
  await router.load();
  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
