import { Icon, type IconName } from "../Icon";
import { Kicker, RailSection } from "./Section";

const CHANNELS: Array<{
  icon: IconName;
  title: string;
  copy: string;
}> = [
  {
    icon: "mail",
    title: "Mail",
    copy: "Templates, delivery, retries.",
  },
  {
    icon: "webhooks",
    title: "Webhooks",
    copy: "Signed, retried, observable.",
  },
  {
    icon: "queues",
    title: "Queues",
    copy: "Durable jobs with backoff.",
  },
  {
    icon: "realtime",
    title: "Realtime",
    copy: "Live updates over sockets.",
  },
  {
    icon: "storage",
    title: "Storage",
    copy: "Files with access policies.",
  },
  {
    icon: "scheduling",
    title: "Scheduler",
    copy: "Cron without another service.",
  },
];

export function ChannelsSection() {
  return (
    <RailSection id="channels" labelledBy="channels-title">
      <div className="grid grid-cols-1 min-[980px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="order-1 flex flex-col justify-center px-6 py-[clamp(60px,7.5vw,92px)] min-[768px]:px-10 min-[900px]:px-12 min-[981px]:px-14 min-[1241px]:px-16">
          <Kicker>Channels</Kicker>

          <h2
            id="channels-title"
            className="mt-6 max-w-[16ch] text-[clamp(34px,4.2vw,52px)] font-medium leading-[1.02] tracking-[-0.058em] text-text"
          >
            Every way out, already wired.
          </h2>

          <p className="mt-7 max-w-[36ch] text-[13.5px] leading-[1.72] tracking-[-0.01em] text-muted">
            Mail, webhooks, queues, realtime, storage, and schedules share the
            same project — and the same rules.
          </p>
        </div>

        <div className="order-2 flex min-h-[440px] flex-col justify-center border-t border-line bg-[#101315] px-6 py-12 min-[768px]:px-10 min-[980px]:min-h-[560px] min-[980px]:border-t-0 min-[980px]:border-l min-[981px]:px-12 min-[1241px]:px-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 min-[768px]:gap-x-10 min-[768px]:gap-y-10">
            {CHANNELS.map((channel) => (
              <div key={channel.title} className="group min-w-0">
                <span className="inline-flex text-brand/80 transition-colors group-hover:text-brand">
                  <Icon
                    name={channel.icon}
                    size={26}
                    variant="Bulk"
                    className="block"
                  />
                </span>
                <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.02em] text-text">
                  {channel.title}
                </h3>
                <p className="mt-2 max-w-[26ch] text-[14px] leading-[1.6] tracking-[-0.01em] text-muted">
                  {channel.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RailSection>
  );
}
