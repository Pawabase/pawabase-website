import { renderToString } from "react-dom/server";
import { RouterProvider } from "@tanstack/react-router";
import { makeRouter } from "./router";
import { pages } from "./routes";

export { pages };

/** The markup of one page, for the prerender. */
export async function render(path = "/") {
  const router = makeRouter(true, path);
  await router.load();
  return renderToString(<RouterProvider router={router} />);
}
