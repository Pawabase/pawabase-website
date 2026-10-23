import { Icon } from "@/components/Icon";

import { Contours } from "./Backdrops";
import { PrimaryButton } from "./PrimaryButton";
import { Band, TextLink } from "./Section";

/* The hero's contour field returns at the end of the page, across the full width. */
export function FinalCta() {
  return (
    <Band
      id="start"
      labelledBy="start-title"
      backdrop={
        <Contours className="opacity-[0.22] [mask-image:linear-gradient(to_right,transparent_10%,black_60%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent_10%,black_60%,black_90%,transparent)]" />
      }
    >
      <div className="relative py-[clamp(88px,10vw,148px)]">
        <h2
          id="start-title"
          className="max-w-[16ch] text-[clamp(46px,6.2vw,92px)] font-normal leading-[1.02] tracking-[-0.055em] text-text"
        >
          Start with a project.
          <span className="block text-muted">Grow it into a platform.</span>
        </h2>

        <div className="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-center gap-x-8 gap-y-4">
          <PrimaryButton href="https://app.pawabase.com" className="inline-flex">
            Get started
            <Icon name="arrowRight" size={17} />
          </PrimaryButton>
          <TextLink href="https://docs.sillo.build">Read the documentation</TextLink>
        </div>
      </div>
    </Band>
  );
}
