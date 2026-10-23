import { Icon } from "@/components/Icon";

import { PrimaryButton } from "./PrimaryButton";
import { RailSection } from "./Section";

export function Simplicity() {
  return (
    <RailSection
      id="simplicity"
      labelledBy="simplicity-title"
      className="bg-tint texture-dots"
    >
      <div className="grid min-[980px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="flex flex-col justify-center px-6 py-[clamp(76px,10vw,148px)] min-[768px]:px-10 min-[981px]:pl-14 min-[981px]:pr-12 min-[1241px]:pl-16 min-[1241px]:pr-14">
          <h2
            id="simplicity-title"
            className="max-w-[14ch] text-[clamp(46px,6.4vw,92px)] font-medium leading-[0.97] tracking-[-0.07em] text-text"
          >
            The backend part?
            <span className="mt-1 block text-muted">Taken care of.</span>
          </h2>
        </div>

        <div className="flex flex-col justify-center border-t border-line px-6 py-10 min-[768px]:px-10 min-[980px]:border-l min-[980px]:border-t-0 min-[980px]:py-[clamp(76px,10vw,148px)] min-[981px]:pl-12 min-[981px]:pr-14 min-[1241px]:pl-14 min-[1241px]:pr-16">
          <p className="max-w-[33ch] text-[13.5px] leading-[1.72] tracking-[-0.01em] text-muted">
            Spend your time on the product. Pawabase arrives with the database,
            auth, storage, mail, and jobs a backend needs — already
            connected.
          </p>

          <PrimaryButton
            href="https://app.pawabase.com"
            className="mt-8 inline-flex w-fit"
          >
            Start building
            <Icon name="arrowRight" size={17} />
          </PrimaryButton>
        </div>
      </div>
    </RailSection>
  );
}
