import { createRootRoute, Outlet } from "@tanstack/react-router";

import { CookieConsent } from "@/components/site/CookieConsent";
import { PageHero, SitePage } from "@/components/site/SitePage";

export const Route = createRootRoute({ component: Root, notFoundComponent: NotFound });

function Root() {
  return (
    <>
      <Outlet />
      <CookieConsent />
    </>
  );
}

/** An address that leads nowhere (a post that doesn't exist, a page past the last). */
function NotFound() {
  return (
    <SitePage title="Page not found" description="That page doesn't exist.">
      <PageHero title="Page not" quiet="found." line="That page doesn't exist, or it has moved." compact>
        <a href="/" className="btn btn-light btn-lg">Go home</a>
        <a href="/blog" className="btn btn-lg">Read the blog</a>
      </PageHero>
    </SitePage>
  );
}
