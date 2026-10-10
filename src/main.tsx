import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { makeRouter } from "./router";
import "./styles.css";
import "./pages/pages.css";

const router = makeRouter();
// Static routes carry no loader data to dehydrate: keep TanStack's SSR boundary shape when hydrating the prerendered document.
if (document.getElementById("root")?.querySelector("main")) {
  router.ssr = { manifest: undefined };
}
router.load().then(() => {
  const root = document.getElementById("root")!;
  const app = (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  if (root.querySelector("main")) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
