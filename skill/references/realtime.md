# Realtime

Three tools, for three jobs:

| You want | Use | Truth lives in |
| --- | --- | --- |
| A list on screen that stays current (tasks, orders, a feed) | A **live query** | The table: the server re-sends the whole filtered result |
| To react to individual row changes (a toast, a counter, a sync job) | **Record changes** on `resource:<table>` | The table: events are signals, refetch when unsure |
| Messages between people or devices (chat, typing, cursors, who is online) | **Channels** with presence and history | The channel backlog, or records if messages must last |

Channels have names like `chat:lobby`, `order:42` or `resource:tasks`. A channel rule in Studio matches the name and separately
decides subscribe, publish, presence, history and limits. The connection carries the environment key and, when signed in, the
person's access token; rules see who they are.

## Live queries

```ts
const open = pawabase.realtime.live<Task>("tasks", { filter: { done: "is.false" }, sort: "-created_at", limit: 20 });
open.onChange(({ data, total }) => render(data));
await open.ready();          // the first result
open.stop();                 // when the view goes away
```

```python
async with pb.realtime.live("tasks", filter={"done": "is.false"}, sort="-created_at", limit=20) as live:
    async for result in live:
        render(result["data"])
```

- The table needs **Broadcast changes** on. Filters, `sort`, `select`, `q` (search) and the list policy are the same as
  `GET /rest/v1/<table>`, so each person only receives rows they may read; `total` is `null` when a row policy makes the count
  unreliable.
- `filter` is sent as written: `{ status: "eq.paid" }`. Booleans and nulls go through `is` (`is.false`, `is.null`).
- `limit` is 1 to 200. Each live query costs the server a re-run on every change to the table; keep them per view, not per row.
- It reopens by itself after a reconnect and delivers a fresh result, so there is no gap to patch.
- Python: `AsyncPawabase` and `pip install "pawabase[realtime]"`.

## Record changes

With **Broadcast changes** on, subscribe to `resource:<table>` for `created`, `updated` and `deleted` events carrying
`payload.record`. The table's read rule decides who receives each change. Apps cannot publish to `resource:` channels. Changes
made outside the API (direct SQL) need the separate change-capture setting.

To avoid a gap on first load: subscribe, then read the list. Merge events by record id. After a reconnect, refetch when history
may not cover the time you were away. If you are doing this for a list on screen, a live query is simpler.

## Channels

```ts
const room = pawabase.realtime.channel<{ text: string }>("chat:lobby", { presence: { name: "Ada" }, replay: 50 });
const stop = room.onEvent("message", ({ payload, from }) => show(from, payload.text));
room.on("presence", ({ members }) => showRoster(members));   // joins and leaves too
await room.subscribe();
await room.send("message", { text: "hello" });
const recent = await room.history(50);
stop();
await room.unsubscribe();
```

```python
room = pb.realtime.channel("chat:lobby", presence={"name": "Ada"}, replay=50)   # AsyncPawabase
room.on("message", lambda message: show(message))
await room.subscribe()
await room.send("message", {"text": "hello"})
```

- The client opens one WebSocket on the first subscription, heartbeats, reconnects with backoff, rejoins channels, and with
  `replay` fetches the messages missed while away. It swaps in a refreshed token without reconnecting.
- `on("message")` gets every message; `onEvent(name)` filters by event. Other channel events: `presence`, `subscribed`,
  `closed`, `error`. The sender also receives its own message: render delivered messages and deduplicate by id.
- Show connection state from `realtime.status` / `onStatusChange`. On old Node without a global `WebSocket`, pass one in the
  `realtime` options.
- Presence metadata is visible to everyone on the channel: no secrets in it.
- **Ephemeral** channels keep nothing for a disconnected client; history depth keeps a bounded backlog; **durable** channels
  keep messages until retention. Messages that must stay (a chat log) belong in a table as well.
- For typing indicators and cursors, send ephemeral events; never write every movement to a table.

## Without a socket

Publishing, presence and history work over HTTP from any server: `realtime.publish(channel, event, payload)`,
`realtime.presence(channel)`, `realtime.history(channel, limit)` (TypeScript and Python). To listen without a socket, SSE:
`realtime.stream(channels)` in TypeScript, `realtime.sse(channels)` in Python, at most 20 channels, listen only.

The wire: `POST /realtime/v1/publish`, `GET /realtime/v1/channels/{channel}/history`,
`GET /realtime/v1/channels/{channel}/presence`, `GET /realtime/v1/sse`, and the WebSocket protocol in
`realtime/connection.mdx`. There is no MQTT, HTTP streaming or long polling.

## When it does not arrive

Studio → Realtime has a playground, live connections and history; Activity shows refused joins. Check in order: the channel
rule (subscribe and publish are separate), the key's environment, the token, **Broadcast changes** on the table, and the
table's read rule for the receiving person. See `realtime/record-changes.mdx` and `realtime/patterns.mdx`.
