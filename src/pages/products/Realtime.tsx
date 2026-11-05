import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "realtime",
  name: "Realtime",
  description: "Live table changes, channels, presence and durable message history, over WebSockets or server-sent events.",
  promise: "Live updates, no socket server.",
  line: "Your app hears about changes the moment they happen, with channels and presence for everything else.",
  tiles: [
    {
      kind: "chips",
      icon: "realtime",
      title: "Everything, live",
      line: "Table changes, your own messages and who is online.",
      chips: ["Record created", "Record updated", "Record deleted", "Channels", "Presence"],
    },
    { kind: "solid", icon: "policies", title: "Rules on every channel", line: "Decide who may listen and who may publish." },
    { kind: "word", icon: "users", word: "LIVE", title: "Presence", line: "See who is in a room, as it changes." },
    {
      kind: "chips",
      icon: "activity",
      title: "Built to keep up",
      line: "Durable channels keep their history, over the connection that suits the client.",
      chips: ["Durable channels", "Message history", "WebSockets", "Server-sent events"],
    },
  ],
  capabilities: [
    { icon: "database", title: "Live table changes", line: "Show new and changed records without a refresh." },
    { icon: "realtime", title: "Channels", line: "Send your own messages to everyone in a room." },
    { icon: "users", title: "Presence", line: "Online, typing and viewing, kept up to date." },
    { icon: "document", title: "Message history", line: "Durable channels remember what was sent." },
    { icon: "automation", title: "Flows from messages", line: "A message on a channel can start a flow." },
    { icon: "policies", title: "Access rules", line: "Listen and publish only where you are allowed." },
  ],
};

export default function RealtimePage() {
  return <ProductPage {...INFO} />;
}
