import { useEffect, useRef } from "react";

import { Icon } from "@/components/Icon";

import { PrimaryButton } from "./PrimaryButton";

const contours = Array.from({ length: 25 }, (_, i) => {
  const offset = i * 25;

  return (
    <path
      key={i}
      d={`
        M ${320 + offset} -180
        C ${-180 + offset} 90,
          ${900 + offset} 180,
          ${490 + offset} 430
        S ${130 + offset} 780,
          ${1100 + offset} 1050
      `}
      fill="none"
      stroke="currentColor"
      strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
      opacity={0.2 + (i % 4) * 0.06}
    />
  );
});

const FEATURE_ICONS = [
  { name: "database", label: "Data" },
  { name: "users", label: "Authentication" },
  { name: "storage", label: "Storage" },
  { name: "realtime", label: "Realtime" },
  { name: "mail", label: "Mail" },
  { name: "automation", label: "Workflows" },
  { name: "apiSecurity", label: "API security" },
] as const;

export function Hero() {
  const scrollSceneRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const transitionCopyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = scrollSceneRef.current;
    const dashboard = dashboardRef.current;
    const transitionCopy = transitionCopyRef.current;

    if (!scene || !dashboard || !transitionCopy) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const ease = (value: number) => 1 - Math.pow(1 - value, 3);

    const update = () => {
      frame = 0;

      if (reducedMotion.matches) {
        scene.style.height = "auto";
        dashboard.style.transform = "none";
        dashboard.style.opacity = "1";
        dashboard.style.filter = "none";
        transitionCopy.style.opacity = "0";
        return;
      }

      scene.style.height = "";
      const travel = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-scene.getBoundingClientRect().top / travel);
      const expansion = ease(clamp(progress / 0.58));
      const transition = ease(clamp((progress - 0.58) / 0.24));

      dashboard.style.transform = `scale(${0.9 + expansion * 0.12})`;
      dashboard.style.opacity = `${1 - transition * 0.86}`;
      dashboard.style.filter = `brightness(${1 - transition * 0.72})`;
      transitionCopy.style.opacity = `${transition}`;
      transitionCopy.style.transform = `translateY(${18 - transition * 18}px)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <section
      id="platform"
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-clip bg-shell px-5 pt-[clamp(72px,8vw,112px)] min-[768px]:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[900px] overflow-hidden"
      >
        <svg
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          className="absolute -top-[8%] left-1/2 h-[115%] w-[130%] -translate-x-1/2 -rotate-[8deg] text-brand opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_76%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_76%)]"
        >
          {contours}
        </svg>
      </div>

      <div className="relative z-[3] mx-auto flex max-w-[1380px] flex-col items-center text-center">
        <h1
          id="hero-title"
          className="m-0 text-[clamp(40px,4.2vw,64px)] font-normal leading-[1.12] tracking-[-0.045em]"
        >
          <span className="block text-text min-[1100px]:whitespace-nowrap">
            Your data, auth, storage, and everything else.
          </span>
          <span className="mt-3 block text-muted min-[768px]:mt-4">
            All in one place.
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 min-[768px]:mt-12">
          <PrimaryButton href="https://app.pawabase.com" className="inline-flex w-fit">
            Get Started
            <Icon name="arrowRight" size={17} />
          </PrimaryButton>

          <a
            href="#features"
            className="inline-flex h-[50px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/[0.14] bg-white/[0.045] px-[25px] text-[13.5px] font-bold tracking-[-0.02em] text-text no-underline transition-colors duration-200 hover:border-white/[0.24] hover:bg-white/[0.08]"
          >
            Explore Features
            <Icon name="sparkle" size={16} />
          </a>
        </div>
      </div>

      <div
        ref={scrollSceneRef}
        className="relative z-[2] mt-[clamp(56px,7vw,92px)] h-[155svh] min-[768px]:h-[185svh]"
      >
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          <div
            ref={dashboardRef}
            className="w-[min(94vw,1320px)] origin-center will-change-[transform,opacity,filter] [mask-image:linear-gradient(to_bottom,#000_0%,#000_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_70%,transparent_100%)]"
            style={{ transform: "scale(0.9)" }}
          >
            <div className="box-border w-full overflow-hidden rounded-[18px] border border-white/20 bg-[linear-gradient(145deg,#29292e_0%,#17171b_45%,#101013_100%)] p-[clamp(12px,2.5vw,38px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] min-[768px]:rounded-[38px]">
              <img
                src="/studio-overview.png"
                width={3258}
                height={1726}
                alt="Pawabase Studio dashboard"
                className="box-border block h-auto w-full max-w-none rounded-[15px] border border-white/[0.08]"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div
            ref={transitionCopyRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-shell px-5 text-center opacity-0 will-change-[transform,opacity]"
            style={{ transform: "translateY(18px)" }}
          >
            <div className="flex max-w-[960px] flex-col items-center">
              <p className="text-[clamp(42px,6vw,82px)] font-normal leading-[1.04] tracking-[-0.05em] text-text">
                Everything connected.
                <span className="mt-2 block text-muted">One place to build.</span>
              </p>

              <div
                className="mt-10 flex max-w-[620px] flex-wrap items-center justify-center gap-3 min-[768px]:mt-12 min-[768px]:gap-4"
                role="list"
                aria-label="Pawabase features"
              >
                {FEATURE_ICONS.map((feature) => (
                  <span
                    key={feature.name}
                    role="listitem"
                    title={feature.label}
                    aria-label={feature.label}
                    className="flex size-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.045] text-white/75 min-[768px]:size-14"
                  >
                    <Icon name={feature.name} size={21} variant="Linear" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
