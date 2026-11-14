# AI: models, embeddings, agents, knowledge

Provider keys stay on the server. The environment exposes **named models** (aliases such as `chat` or `embed`, not provider
model ids), each with its own rule and usage limits. Agents and knowledge bases are defined in Studio → AI, run on the server,
and are reached through the same gateway and policies as everything else.

| Want | TypeScript | Python | Wire |
| --- | --- | --- | --- |
| List models the caller may use | `ai.models()` | `pb.ai.models()` | `GET /ai/v1/models` |
| Text answer | `ai.chat(model, input)` → string | `pb.ai.chat(model, input)` | `POST /ai/v1/chat/completions` |
| Full completion (usage, tool calls) | `ai.complete(model, input, options)` | `pb.ai.complete(...)` | same |
| Stream tokens | `for await (const piece of ai.stream(model, input))` | `pb.ai.stream(model, input)` | same, `stream: true` |
| Embeddings | `ai.embed(model, text \| texts)` | `pb.ai.embed(model, input)` | `POST /ai/v1/embeddings` |
| Run an agent | `ai.agents.run(name, input, { thread, background })`, `ai.agents.stream` | `pb.ai.agents.run(name, input, thread=…, background=…)`, `stream` | `POST /ai/v1/agents/{name}/runs` |
| Search a knowledge base | `ai.knowledge.search(name, query, { limit })` | `pb.ai.knowledge.search(name, query, limit=5)` | `POST /ai/v1/knowledge/{name}/search` |

The `/ai/v1` chat and embeddings bodies follow the OpenAI shape, so OpenAI-compatible SDKs can point at the gateway with a
Pawabase key; confirm the payload in the environment's OpenAPI before relying on a field.

## Agents

An agent is a model plus instructions, tools (tables, flows, knowledge, app connections, MCP servers) and limits on steps, time
and cost. A run has `status` `running`, `waiting`, `done` or `failed`, an `output`, and a `thread_id` to continue the
conversation.

```ts
let run = await pawabase.ai.agents.run("support", "Refund order 1042", { background: true });
run = await pawabase.ai.agents.wait(run.id);
if (run.status === "waiting") {
  // run.pending: the tool calls waiting for a person, each with id, name, arguments, why
  run = await pawabase.ai.agents.decide(run.id, { approve: true });   // or { decisions: { [callId]: false } }
}
```

- Tools act as the caller unless the agent is configured to act as itself; a person can only make an agent do what they could
  do. Give a background agent a [machine identity](auth-policies.md), not a person's session.
- Put actions that change outside state (refunds, mail, tickets) behind **approval**. A finished background run emits
  `agent.run.finished`, which a flow can pick up.
- Check step, time and cost limits before building automated changes on top of an agent.

## Knowledge and vectors

A knowledge base takes documents (`addDocument({ text | url })`, `addFile(blob)`), splits and embeds them, and answers `search`.
For your own tables, a vector field plus an embedding pipeline lets `from("docs").similar(field, vector)` order by meaning; the
list policy still decides which rows come back, and vector columns are left out of ordinary reads.

## Debugging

Separate the layers: the provider connection and its key, the model alias, the model's rule, quota and cost limits, the
embedding pipeline, and the agent's tool permissions and approvals. Each agent run keeps its steps in Activity.

Docs: `ai/gateway.mdx`, `ai/use-it.mdx`, `ai/vector-search.mdx`, `ai/agents/overview.mdx`, `ai/agents/approvals-and-limits.mdx`,
`ai/knowledge/overview.mdx`. Pawabase's own MCP endpoint, for outside AI clients, is a different thing: see [MCP](mcp.md).
