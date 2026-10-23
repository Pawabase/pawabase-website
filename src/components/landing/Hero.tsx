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

export function Hero() {
  return (
    <section
      id="platform"
      aria-labelledby="hero-title"
      className="relative isolate h-[780px] w-full overflow-hidden bg-shell min-[768px]:h-[clamp(720px,calc(100svh-76px),920px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          className="absolute -top-[12%] left-[27%] h-[125%] w-[110%] -rotate-[8deg] text-brand opacity-30 [mask-image:linear-gradient(to_right,transparent_0%,black_35%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_35%,black_85%,transparent_100%)]"
        >
          {contours}
        </svg>
      </div>

      <div className="absolute left-6 right-6 top-[85px] z-[3] min-[768px]:left-[5%] min-[768px]:right-auto min-[768px]:top-[39%] min-[768px]:w-[47%] min-[768px]:-translate-y-1/2 min-[1101px]:left-[clamp(40px,6vw,120px)] min-[1101px]:w-[min(47%,720px)]">
        <h1
          id="hero-title"
          className="m-0 text-[clamp(42px,9vw,58px)] font-normal leading-[1.09] tracking-[-0.045em] min-[768px]:text-[clamp(44px,5vw,62px)] min-[1101px]:text-[clamp(54px,5vw,82px)]"
        >
          <span className="block text-text">Meet Pawabase</span>

          <span className="mt-2 block text-muted">
            Your backend,
            <br />
            already built.
          </span>
        </h1>

        <PrimaryButton
          href="https://app.pawabase.com"
          className="mt-10 inline-flex w-fit min-[768px]:mt-[68px]"
        >
          Get Started
          <Icon name="arrowRight" size={17} />
        </PrimaryButton>
      </div>

      <div className="absolute left-6 top-[420px] z-[2] w-[145vw] max-w-none origin-top-left rotate-[3deg] min-[768px]:left-[55%] min-[768px]:top-[22%] min-[768px]:w-[88vw] min-[1101px]:left-[53%] min-[1101px]:top-[18%] min-[1101px]:w-[78vw]">
        <div className="box-border w-full overflow-hidden rounded-[14px] border border-white/20 bg-[linear-gradient(145deg,#29292e_0%,#17171b_45%,#101013_100%)] p-[clamp(18px,2.5vw,42px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] min-[768px]:rounded-[38px]">
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
    </section>
  );
}
