import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { metaFor } from "../routes";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/** The frame every page shares: skip link, navigation, the page, footer. The <head> text comes from routes.ts. */
export function Page({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const meta = metaFor(path);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [path]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="frame-outer">
        <div className="frame">
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
