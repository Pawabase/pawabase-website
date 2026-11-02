import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Updates as they happen",
    blocks: [
      { p: "Realtime pushes updates to your app the moment they happen: a chat message arrives, a teammate joins a document, a record changes. You use it through `pawabase.realtime`. In Studio you set up who may join and send, and you watch traffic live." },
      { p: "It runs on the same identity and access rules as the rest of your backend, so there is no separate permission system to keep in step with your database." },
    ],
  },
  {
    title: "Channels and messages",
    blocks: [
      { p: "A channel is just a name. Everyone subscribed receives what is sent to it. Use a prefix and an id so one channel rule can cover a whole group of them, such as `chat:lobby`, `order:42` or `doc:abc`. Asking for the same name twice returns the same channel, so different parts of your app share one subscription, and the first `subscribe()` opens the connection." },
      { table: { head: ["Field", "Meaning"], rows: [
        ["`id`", "Unique. The client uses it to drop duplicates."],
        ["`channel`", "The channel name."],
        ["`event`", "The label the message was sent with."],
        ["`payload`", "Whatever was sent, as JSON."],
        ["`from`", "The sender's user id, or `\"server\"` for messages from your backend."],
        ["`sent_at`", "When it was accepted."],
      ] } },
    ],
  },
  {
    title: "Channel rules",
    blocks: [
      { p: "A channel rule applies to every channel whose name matches a pattern. It decides who may join, who may send, whether presence and history are on, and how much is allowed. By default signed-in users may join and send. Rules are matched from top to bottom." },
      { p: "Patterns can use `*` as a wildcard and placeholders that insert facts about the caller. A pattern such as `user:{{ auth.id }}` matches only a person's own inbox, and `org:{{ auth.org }}` matches only their organization's channel." },
      { table: { head: ["Field", "Meaning"], rows: [
        ["Subscribe policy, Publish policy", "Who may join and who may send, chosen in the usual rule picker."],
        ["Presence", "Track who is on the channel."],
        ["History depth", "How many recent messages to keep for latecomers."],
        ["Retention", "For durable channels, how long a message is kept before it is purged."],
        ["Message size limit", "The largest message, in bytes."],
        ["Publish rate limit", "How often one sender may publish, per second."],
        ["Subscriber limit", "The most people on one channel."],
      ] } },
      { table: { head: ["Kind", "What it means"], rows: [
        ["Public", "Anyone who can subscribe sees it."],
        ["Private", "Scoped to the caller, such as `user:{{ auth.id }}`, which only that user can open."],
        ["Presence", "Tracks who is on the channel, as well as messages."],
        ["Protected", "Subscribe is open and publish is restricted: a broadcast-only channel."],
        ["Ephemeral", "Nothing is kept. A disconnected subscriber misses what happened while away."],
        ["Durable", "Every publish is written to the database, deduplicated, and survives a restart."],
      ] } },
    ],
  },
  {
    title: "Presence",
    blocks: [
      { p: "Presence answers \"who is here right now?\" Each person on a channel can attach small details, such as a name or a colour, and everyone sees them update live. Entries disappear when someone disconnects. Switch **Presence** on for a channel rule, and join with your details." },
      { p: "Each member has a `user_id`, which is `null` for an anonymous visitor, the `meta` they attached, a `presence_ref` for that connection and an `online_at` time. One person on two devices appears twice, so group by `user_id` to show one avatar per person." },
      { p: "Keep presence small and long-lived. For fast signals such as a cursor position or \"typing…\", send an ordinary message instead." },
    ],
  },
  {
    title: "History and catching up",
    blocks: [
      { p: "A channel can keep a short backlog. It lets a screen open with context, such as the last 50 chat messages, and lets a client that lost its connection catch up. Set the **History depth** between 0 and 1000. With none set, nothing is kept." },
      { table: { head: ["Kind", "Replay"], rows: [
        ["Ephemeral", "None"],
        ["Any kind with a history depth", "The last N messages"],
        ["Durable", "Written to the database, survives restarts and is kept for the retention you choose"],
      ] } },
      { p: "Each message has a `seq` that increases along the channel, so you can order them and remember where you stopped. A good chat screen subscribes first, so new messages start arriving, then loads history, then shows history followed by live messages while skipping any id it already has." },
    ],
  },
  {
    title: "Live records",
    blocks: [
      { p: "Instead of polling, subscribe to a table. When a record is created, updated or deleted, you hear about it on the channel `resource:<table>`. Switch **Broadcast changes** on in the table's settings, and the table's access rules decide who receives what." },
      { p: "People receive changes only for rows their read rule allows, checked against the row as it was and as it is now. If the table broadcasts changes, you also receive your own writes back as messages, so merge by `id` to avoid adding the same record twice." },
    ],
  },
  {
    title: "Publishing from your server",
    blocks: [
      { p: "Your backend can push to connected clients without holding a connection: \"your export is ready\", \"the order shipped\", \"maintenance in five minutes\". With a secret key the message arrives from `\"server\"`. A publishable key is subject to the channel's publish policy, which is how a browser can publish without a socket." },
      { p: "Flows can publish too. Add the **Realtime publish** step in the flow editor, choose the channel and event, and map the payload from earlier steps, with no code. You can also add a webhook subscription that fires on every publish, to mirror live traffic into a log or an analytics tool." },
      { h3: "A pattern for telling one person" },
      { steps: [
        "Add a channel rule `user:{{ auth.id }}`, private, with subscribe for signed-in users and publish limited to secret keys and Studio. A person can only open their own inbox.",
        "Each signed-in client subscribes to `user:<their id>`.",
        "Your server or a flow publishes to that channel when something happens.",
      ] },
    ],
  },
  {
    title: "Connections and protocols",
    blocks: [
      { p: "The first `subscribe()` opens a WebSocket. The client keeps it healthy with heartbeats, automatic reconnecting and rejoining your channels, so you rarely need more than its status. Show a small \"reconnecting\" hint when the status is not `open`, and disconnect when you discard a client so timers stop." },
      { table: { head: ["Protocol", "Status", "What it does"], rows: [
        ["WebSocket", "Live", "Full duplex: subscribe, publish, presence and history replay over one socket."],
        ["Server-Sent Events", "Live", "One-way: receive messages and presence changes. Publishing goes through a plain HTTP call."],
        ["MQTT, MQTT over WebSocket", "Not yet available", "For IoT and embedded clients."],
        ["HTTP streaming, long polling", "Not yet available", "Fallbacks for clients that cannot hold a streaming connection."],
      ] } },
      { p: "Use WebSocket for chat, presence and collaboration, Server-Sent Events for listen-only dashboards and strict proxies, and a plain publish call when you only need to send. Anything that can open a WebSocket or an event stream can use realtime from any language, and the same channel rules apply to every protocol." },
    ],
  },
];

export default function RealtimePage() {
  return (
    <ProductArticle
      icon="realtime"
      name="Realtime"
      category="Live data"
      description="Broadcast, presence and history over WebSockets, with the same access rules as the rest of your backend."
      intro="Realtime pushes updates to your app as they happen, with the same identity and access rules as the rest of your backend. This page covers channels, rules, presence, history, live record changes, publishing from your server and the protocols you can connect with."
      sections={SECTIONS}
      next={{ label: "Next: Flows", href: "/products/flows" }}
    />
  );
}
