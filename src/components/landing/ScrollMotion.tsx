import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealVisible = () => {
      const revealBoundary = window.innerHeight * 0.94;

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < revealBoundary) {
          element.classList.add("is-visible");
        }
      });
    };

    const revealHashTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      if (target.matches("[data-reveal]")) target.classList.add("is-visible");
      target
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => element.classList.add("is-visible"));
    };

    // Mark content already in view before enabling hidden reveal states. This
    // keeps direct hash links and restored scroll positions from flashing blank.
    revealVisible();
    revealHashTarget();
    root.classList.add("motion-enabled");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("motion-enabled");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    const revealFrame = window.requestAnimationFrame(revealVisible);
    window.addEventListener("scroll", revealVisible, { passive: true });
    window.addEventListener("resize", revealVisible);
    window.addEventListener("hashchange", revealHashTarget);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      observer.disconnect();
      window.removeEventListener("scroll", revealVisible);
      window.removeEventListener("resize", revealVisible);
      window.removeEventListener("hashchange", revealHashTarget);
      root.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
