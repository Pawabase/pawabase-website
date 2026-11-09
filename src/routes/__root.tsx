import { createRootRoute, Outlet } from "@tanstack/react-router";

import { CookieConsent } from "@/components/site/CookieConsent";

export const Route = createRootRoute({ component: Root });

function Root() {
  return (
    <>
      <Outlet />
      <CookieConsent />
    </>
  );
}
