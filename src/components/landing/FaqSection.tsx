import { Band, TextLink, Title } from "./Section";

const QUESTIONS = [
  {
    q: "What is Pawabase?",
    a: "A backend platform. It combines a database API, sign-in, access policies, realtime channels, file storage, automation flows and release tooling in one system, with Studio as its visual interface.",
  },
  {
    q: "Which databases does it use?",
    a: "PostgreSQL. Tables you create become REST endpoints with filtering, sorting, relations and pagination.",
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
    q: "How does access control work?",
    a: "Policies are written per table and per action, and they know the user, role and team. The same policy applies to REST requests, files and realtime channels. An ordered firewall and scoped keys sit in front of them.",
  },
  {
    q: "Which frontends can use it?",
    a: "Any that can make an HTTP request. There is a TypeScript client for web and Node, a Python client, and the REST API for everything else, including mobile apps.",
  },
  {
    q: "How do I add my own logic?",
    a: "Flows react to events, schedules and webhooks, can send mail and can call any HTTP service. For custom endpoints, a route is a flow behind a policy.",
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
        <div className="flex h-fit flex-col gap-6 min-[1000px]:sticky min-[1000px]:top-28">
          <Title id="faq-title" quiet="Answered plainly.">
            Questions.
          </Title>
          <TextLink href="https://docs.sillo.build">Browse the documentation</TextLink>
        </div>

        <div className="border-t border-white/[0.08]">
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
