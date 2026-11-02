import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Logic without a service to host",
    blocks: [
      { p: "The database covers reading and writing records. Sometimes a button in your app needs to do more: charge a card, generate a report, send an email, create three related records at once, or call a partner's API with a secret. You write that logic once, and your app calls it by name." },
      { p: "Logic comes in two forms. A **flow** is a visual automation of steps and branches, built in Studio, which anyone on your team can read and change without redeploying. A **route** is a custom URL under your API that runs a flow." },
      { table: { head: ["Form", "Call it with", "Best for"], rows: [
        ["Flow", "`pawabase.flows.run(\"name\", input)`", "Multi-step processes you want to read and change without redeploying"],
        ["Route", "`pawabase.routes.post(\"orders/42/pay\", body)`", "Giving a feature a clean, REST-style address"],
      ] } },
      { p: "Both run as the person who called them. If a user is signed in, their identity is attached to the call, and the access rule on the flow or route decides whether they may run it. You never pass a user id in the request and trust it." },
    ],
  },
  {
    title: "The editor",
    blocks: [
      { p: "A flow starts from a **trigger**, which can be an HTTP call from your app, an event, a schedule or an inbound webhook, and then runs **blocks** one after another. Open **Logic, Flows** to list your flows, edit one or create a new one." },
      { table: { head: ["Area", "Use it to"], rows: [
        ["Blocks", "Find a step to add: read or write a record, send email, emit an event, call a URL, wait, branch, retry, publish to a channel or queue a job."] ,
        ["The canvas", "Place blocks and connect them. Arrange tidies them top to bottom."],
        ["A block's panel", "Set its label and fill in its fields. Fields can use values from earlier steps."],
        ["Validate", "Check the flow's graph and list problems node by node."],
        ["Test run", "Run it with sample input without waiting for a real trigger."],
        ["Last run", "The most recent real run, with its outcome."],
      ] } },
      { p: "A block's fields can reference earlier output, and the editor suggests available values as you type: the trigger's input, each previous block's output and variables. A missing value becomes empty, so test with realistic data." },
    ],
  },
  {
    title: "Building one: a receipt when an order is paid",
    blocks: [
      { steps: [
        "Start from an Event trigger and set the event to `orders.updated`.",
        "Add a Condition block that continues only when the record's status is `paid`.",
        "Add a Get record block for the customer, from the order's `customer_id`.",
        "Add Send email, addressed to the customer's email, using the `receipt` template and mapping the order number and total from earlier steps.",
        "Wrap the email step in a Retry block, with attempts and a first wait, so a short outage does not lose the receipt.",
        "Validate, fix anything it lists, then save.",
      ] },
      { p: "Test it with **Test run**. Fill in sample input, optionally choose who to **Run as** to see what a particular person would get, and run it. You get the result, a trace showing every block's input and output step by step, and the logs. Read the trace from the top and find the first block whose output is not what you expected. That is nearly always the bug." },
    ],
  },
  {
    title: "Running a flow from your app",
    blocks: [
      { p: "A flow whose HTTP trigger has no path is started by name. Your input arrives in the flow as `input`, the call waits for the flow to finish, and it returns the flow's response." },
      { p: "A flow's response is whatever its `response.return` block sends. With no such block, you get the result wrapped as `{ \"data\": … }`. Design flows the way you design a function: take one object and return a small object." },
      { p: "The flow's HTTP trigger has an access rule, such as public, any signed-in user or a role, and it runs before the first step. A refused call throws an authentication or permission error. Steps inside the flow run with the authority you configured for the flow, which can be more than the caller has. That is the point: a flow can write to a table the user cannot write to directly, after checking that this specific action is allowed. Keep those checks inside the flow." },
      { p: "Calls accept a `timeoutMs`, an abort `signal`, extra `headers`, and an `idempotent` option that allows retrying a `POST` after a network failure when running twice is harmless." },
    ],
  },
  {
    title: "Routes",
    blocks: [
      { p: "A route gives a flow an address under your API, with an HTTP method and a path that can contain parameters, such as `POST /orders/{id}/pay`. It reads like the rest of a REST API and works from anything that can make an HTTP request. You define routes under **Logic, Routes** with a method, a path, an access rule and the flow that handles it." },
      { p: "Paths are relative to your API's `/rest/v1/`, and you use the path exactly as defined with real values in place of the parameters. Query strings go in a `query` option, and arrays repeat the key. In Python, keyword arguments become the JSON body for `post`, `put` and `patch` and the query string for `get` and `delete`." },
    ],
  },
  {
    title: "Choosing a flow or a route",
    blocks: [
      { list: [
        "Choose a **flow** when it is a sequence of steps that other people on your team should be able to see and change, or when it uses built-in blocks such as sending mail, publishing to a channel, emitting an event or calling another service.",
        "Choose a **route** when you want the address to look like part of your API, and when the same logic should be reachable from outside your app too, by anything that can make an HTTP request.",
      ] },
      { p: "A route runs a flow, so you usually build the flow first and give it an address when it needs one." },
    ],
  },
  {
    title: "Slow work",
    blocks: [
      { p: "A call waits for the flow, and a browser request should not wait minutes. For anything slow, split the work. The flow you call starts the work in the background as a queued job and returns at once with an id. The background work finishes later and records its result or publishes to a channel, and your app watches the record or the channel." },
      { p: "Once saved and wired to its trigger, flows run on their own. You see each run under Activity, Events and runs, and failures under Activity, Jobs, where you can retry or replay them." },
    ],
  },
];

export default function FlowsPage() {
  return (
    <ProductArticle
      icon="automation"
      name="Flows"
      category="Logic"
      description="Visual workflows for APIs, events, schedules and webhooks, with retries and a trace for every run."
      intro="Flows let you write backend logic visually, without a service of your own to host. They run from an API call, an event, a schedule or a webhook, and they can be given a clean URL as a route. This page covers the editor, how to build and test a flow, and how your app runs one."
      sections={SECTIONS}
      next={{ label: "Next: Queues", href: "/products/queues" }}
    />
  );
}
