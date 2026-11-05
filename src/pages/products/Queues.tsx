import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "queues",
  name: "Queues",
  description: "Background jobs with durable retries, schedules, and failed jobs you can see and run again.",
  promise: "Work that doesn't make people wait.",
  line: "Move slow work into the background, retry what fails, and run jobs on a schedule.",
  tiles: [
    {
      kind: "chips",
      icon: "queues",
      title: "Jobs you can see",
      line: "Know what is waiting, running, done or failed.",
      chips: ["Waiting", "Active", "Completed", "Failed", "Retried"],
    },
    { kind: "solid", icon: "refresh", title: "Retries built in", line: "A failed job is tried again, waiting a little longer each time." },
    { kind: "word", icon: "scheduling", word: "LATER", title: "Schedules", line: "Run work every hour, every night or on any timetable." },
    {
      kind: "chips",
      icon: "activity",
      title: "Recover with confidence",
      line: "Failed jobs are kept with their reason, ready to run again.",
      chips: ["Failed jobs", "Run again", "Job history"],
    },
  ],
  capabilities: [
    { icon: "queues", title: "Background jobs", line: "Send email, resize images and call services after the response." },
    { icon: "refresh", title: "Durable retries", line: "Retries survive restarts, so no work is lost." },
    { icon: "scheduling", title: "Schedules", line: "Recurring work on the timetable you set." },
    { icon: "activity", title: "Failed jobs", line: "See what failed and why, then run it again." },
    { icon: "automation", title: "Jobs from flows", line: "Start background work from any flow." },
    { icon: "events", title: "Jobs from events", line: "React to what happens in your system." },
  ],
};

export default function QueuesPage() {
  return <ProductPage {...INFO} />;
}
