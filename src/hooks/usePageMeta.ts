import { useEffect } from "react";

export const DEFAULT_TITLE = "Pawabase — the backend platform";
export const DEFAULT_DESCRIPTION =
  "Pawabase unifies data APIs, authentication, storage, email, realtime, workflows and background jobs in one backend platform.";

function getDescriptionTag() {
  return document.querySelector<HTMLMetaElement>('meta[name="description"]');
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = getDescriptionTag();
    const previousDescription = descriptionTag?.content ?? "";

    document.title = title;
    descriptionTag?.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      descriptionTag?.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
