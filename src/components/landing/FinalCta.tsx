import { Icon } from "@/components/Icon";

import { Band, Eyebrow } from "./Section";
import { DOCS, SIGN_UP } from "@/lib/links";

export function FinalCta() {
  return (
    <Band id="start" labelledBy="start-title" wide>
      <div
        data-reveal="scale"
        className="relative mx-auto my-[clamp(48px,6vw,96px)] flex max-w-[1040px] flex-col items-center overflow-hidden rounded-[10px] border border-line px-6 py-[clamp(64px,8vw,112px)] text-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,black_30%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,black_30%,transparent_100%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,243,238,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.045) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <Eyebrow className="relative">Start building</Eyebrow>
        <h2
          id="start-title"
          className="relative m-0 mt-8 max-w-[16ch] text-[clamp(42px,6vw,84px)] font-medium leading-[1.04] tracking-[-0.035em] text-text"
        >
          Build the whole system.
          <span className="block text-muted">Every team, from day one.</span>
        </h2>
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={SIGN_UP}
            className="btn btn-light btn-lg"
          >
            Get started
            <Icon name="arrowRight" size={17} />
          </a>
          <a
            href={DOCS}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lg"
          >
            Read the documentation
          </a>
        </div>
      </div>
    </Band>
  );
}
