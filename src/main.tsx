import "@/styles.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("#root is missing from index.html");
}

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Built pages arrive already rendered, so they read and look right before any script runs (and for anything that never runs one).
// The browser then renders over them once the page's code is in; it does not hydrate, because the router lays out its loading
// boundaries differently on the server and in the browser, so the two trees could never match.
const root = createRoot(container);
if (container.firstElementChild) void router.load().then(() => root.render(app));
else root.render(app);
