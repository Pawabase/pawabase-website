import { useEffect } from "react";

import { headTags } from "@/seo/head";
import { pageAt, PAGES } from "@/seo/pages";

export const DEFAULT_TITLE = PAGES[0]!.title;
export const DEFAULT_DESCRIPTION = PAGES[0]!.description;

/** Replaces everything the previous page put in <head> for search and sharing. The build already wrote the right tags into each page's HTML; this keeps them right after a client-side navigation. */
function apply(title: string, description: string) {
  const page = pageAt(window.location.pathname);
  document.title = page?.title ?? title;
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
  if (!page) {
    document.head.insertAdjacentHTML("beforeend", `<meta data-seo name="robots" content="noindex,follow"><meta data-seo name="description" content="${description.replace(/"/g, "&quot;")}">`);
    return;
  }
  for (const t of headTags(page)) {
    const el = document.createElement(t.tag);
    el.setAttribute("data-seo", "");
    if (t.tag === "script") {
      el.setAttribute("type", t.attrs.type);
      el.textContent = t.text;
    } else {
      for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
}

/** Kept for the pages that already call it: the registry in src/seo/pages.ts decides, and the arguments are only the fallback for a path it doesn't know. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    apply(title, description);
  }, [title, description]);
}
