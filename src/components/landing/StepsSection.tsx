import { Icon, type IconName } from "@/components/Icon";

import { Band, Eyebrow } from "./Section";

const STEPS: { icon: IconName; title: string; line: string }[] = [
  {
    icon: "database",
    title: "Create a project",
    line: "Start a project. Data, auth and storage are there from the first minute.",
  },
  {
    icon: "automation",
    title: "Shape the system",
    line: "Add tables, policies, flows and agents in Studio, or in code.",
  },
  {
    icon: "code",
    title: "Plug everything in",
    line: "Apps, teammates, partners and agents all use the same system.",
  },
];

export function StepsSection() {
  return (
    <Band id="steps" labelledBy="steps-title" wide className="pb-0 pt-[clamp(56px,7vw,96px)]">
      <div data-reveal="up" className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2
          id="steps-title"
          className="m-0 text-[clamp(38px,4.4vw,62px)] font-medium leading-[1.06] tracking-[-0.03em] text-text text-balance"
        >
          Three steps in
        </h2>
      </div>

      <div className="relative left-1/2 mt-[clamp(40px,5vw,72px)] w-screen -translate-x-1/2 border-t border-line">
        <ol
          data-reveal="stagger"
          className="m-0 mx-auto grid max-w-[1040px] list-none p-0 min-[800px]:grid-cols-3"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`flex flex-col gap-5 px-6 py-10 min-[800px]:px-8 ${i > 0 ? "border-t border-line min-[800px]:border-l min-[800px]:border-t-0" : ""} ${i === 0 ? "min-[800px]:pl-0" : ""}`}
            >
              <Icon name={step.icon} size={26} variant="TwoTone" className="text-brand" />
              <div>
                <h3 className="m-0 text-[24px] font-medium leading-[1.1] tracking-[-0.03em] text-text">{step.title}</h3>
                <p className="m-0 mt-3 max-w-[34ch] text-[15px] leading-[1.55] text-muted">{step.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
