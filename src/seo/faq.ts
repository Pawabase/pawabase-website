/** The home page's questions and answers. The page shows them, and search engines get them as FAQ structured data. */
export const QUESTIONS: { q: string; a: string }[] = [
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
    a: "On paid plans, work happens in one environment, such as development or staging, and is released to production. Snapshots and alarms back it up, and a release can be rolled back.",
  },
];
