import { Band, Eyebrow, TextLink, Title } from "./Section";
import { DOCS } from "@/lib/links";

const QUESTIONS = [
  {
    q: "What is Pawabase?",
    a: "A place to build complete systems: data, auth, policies, storage, flows, agents and APIs. Your apps, your team and your agents all work from it.",
  },
  {
    q: "Is it just a backend?",
    a: "It can be one, but most people use it for more. The same system serves your app, the people who run things, your partners and your agents.",
  },
  {
    q: "How do I get started?",
    a: "Create a Pawabase Cloud project, then use Studio to define your data, access rules, storage and automation. Every project starts with a dedicated database and the core platform already connected.",
  },
  {
    q: "Is there a hosted version?",
    a: "Yes. Pawabase Cloud runs the platform for you, with projects that have their own database, environments, release controls and operational visibility.",
  },
  {
    q: "How do policies work?",
    a: "Write a rule once and use it anywhere: endpoints, tables, files and agents. Rules know the user, their team and their role.",
  },
  {
    q: "What can connect to it?",
    a: "Anything that speaks HTTP. There are TypeScript and Python clients, the REST API, and MCP for AI tools.",
  },
  {
    q: "Where do agents fit in?",
    a: "Call them from a flow, an endpoint or a route. Add the models you like. They follow the same policies as everyone else.",
  },
  {
    q: "How are changes released?",
    a: "Work happens in an environment, such as staging, and is released to production. Snapshots and alarms back it up, and a release can be rolled back.",
  },
];

export function FaqSection() {
  return (
    <Band id="faq" labelledBy="faq-title" className="py-[clamp(72px,9vw,128px)]">
      <div className="grid gap-10 min-[1000px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] min-[1000px]:gap-20">
        <div data-reveal="left" className="flex h-fit flex-col gap-6 min-[1000px]:sticky min-[1000px]:top-28">
          <Eyebrow className="w-fit">FAQ</Eyebrow>
          <Title id="faq-title" quiet="Short answers.">
            Questions.
          </Title>
          <TextLink href={DOCS}>Browse the documentation</TextLink>
        </div>

        <div data-reveal="stagger" className="border-t border-white/[0.08]">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group border-b border-white/[0.08]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] font-medium tracking-[-0.025em] text-text transition-colors duration-150 hover:text-brand [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative h-3.5 w-3.5 flex-none text-faint before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-current after:transition-transform after:duration-200 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-[62ch] pb-7 text-[16.5px] leading-[1.65] tracking-[-0.01em] text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  );
}
