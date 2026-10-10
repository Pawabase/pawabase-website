import { createRootRoute, createRoute, createRouter, createMemoryHistory, Outlet, Link, type RouteComponent } from "@tanstack/react-router";
import { lazy, Suspense, type ComponentType } from "react";
import { Page } from "./components/Page";
import { Home } from "./pages/Home";
import { pages } from "./routes";
import { Figures } from "./pages/Figures";

/* The home page is in the main bundle; each product page loads when it is visited (and is prerendered, so it is readable without scripts). */
const lazyPage = (load: () => Promise<{ default: ComponentType }>) => lazy(load);
const components: Record<string, ComponentType> = {
  "/products/auth": lazyPage(() => import("./pages/Auth")),
  "/products/database": lazyPage(() => import("./pages/Database")),
  "/products/storage": lazyPage(() => import("./pages/Storage")),
  "/products/functions": lazyPage(() => import("./pages/Functions")),
  "/products/automation": lazyPage(() => import("./pages/Automation")),
  "/cloud": lazyPage(() => import("./pages/Cloud")),
};

function NotFound() {
  return (
    <div className="wrap not-found">
      <h1 className="h1">Page not found.</h1>
      <p className="lede" style={{ marginTop: 20 }}>
        <Link className="arrow" to="/">
          Back to Pawabase
        </Link>
      </p>
    </div>
  );
}

export function makeRouter(server = false, initial = "/") {
  const root = createRootRoute({
    component: () => (
      <Page>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Page>
    ),
    notFoundComponent: NotFound,
  });
  const routes = pages.map((p) => createRoute({ getParentRoute: () => root, path: p.path, component: (p.path === "/" ? Home : components[p.path]) as RouteComponent }));
  // A bench for looking at the figures one by one: development only, never prerendered or listed.
  if (import.meta.env.DEV) routes.push(createRoute({ getParentRoute: () => root, path: "/__figures", component: Figures as RouteComponent }));
  return createRouter({
    routeTree: root.addChildren(routes),
    defaultPreload: "intent",
    ...(server ? { history: createMemoryHistory({ initialEntries: [initial] }) } : {}),
  });
}
