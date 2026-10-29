import type { ReactNode } from "react";
import { Icon, type IconName } from "../Icon";
import { Kicker, RailSection } from "./Section";

const CARD =
  "group relative flex flex-col overflow-hidden border-line p-6 transition-colors hover:bg-white/[0.02] min-[768px]:p-8";

const USERS = [
  {
    initials: "AM",
    name: "Amara Mensah",
    email: "amara@acme.co",
    role: "Admin",
    status: "Active",
    avatar: "bg-brand/15 text-brand",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "JL",
    name: "Jonas Lee",
    email: "jonas@acme.co",
    role: "Editor",
    status: "Active",
    avatar: "bg-[#F5F3EE]/15 text-[#F5F3EE]",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "SK",
    name: "Sofia Kim",
    email: "sofia@acme.co",
    role: "Viewer",
    status: "Invited",
    avatar: "bg-[#F5F3EE]/12 text-[#F5F3EE]",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "DR",
    name: "Diego Ruiz",
    email: "diego@acme.co",
    role: "Editor",
    status: "Active",
    avatar: "bg-[#F5F3EE]/12 text-[#F5F3EE]",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "PS",
    name: "Priya Shah",
    email: "priya@acme.co",
    role: "Viewer",
    status: "Active",
    avatar: "bg-white/[0.06] text-white/60",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "NB",
    name: "Noah Bennett",
    email: "noah@acme.co",
    role: "Editor",
    status: "Active",
    avatar: "bg-[#F5F3EE]/15 text-[#F5F3EE]",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "LO",
    name: "Lena Ortiz",
    email: "lena@acme.co",
    role: "Viewer",
    status: "Invited",
    avatar: "bg-[#F5F3EE]/12 text-[#F5F3EE]",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "MC",
    name: "Marcus Chen",
    email: "marcus@acme.co",
    role: "Admin",
    status: "Active",
    avatar: "bg-brand/15 text-brand",
    dot: "bg-[#F5F3EE]",
  },
  {
    initials: "AO",
    name: "Ada Okafor",
    email: "ada@acme.co",
    role: "Viewer",
    status: "Active",
    avatar: "bg-white/[0.06] text-white/60",
    dot: "bg-[#F5F3EE]",
  },
];

const EVENTS = [
  {
    icon: "document",
    text: "Sofia created invoice #34383F22",
    meta: "just now",
    accent: true,
  },
  {
    icon: "realtime",
    text: "Jonas updated project Atlas",
    meta: "12s ago",
    accent: false,
  },
  {
    icon: "users",
    text: "Amara invited a teammate",
    meta: "1m ago",
    accent: false,
  },
  {
    icon: "webhooks",
    text: "Webhook delivered to Stripe",
    meta: "3m ago",
    accent: false,
  },
  {
    icon: "events",
    text: "Task queue drained",
    meta: "6m ago",
    accent: false,
  },
] satisfies Array<{ icon: IconName; text: string; meta: string; accent: boolean }>;

const FILES = [
  {
    icon: "storage",
    name: "brand-assets.zip",
    meta: "24.8 MB · 2m ago",
  },
  {
    icon: "image",
    name: "hero.png",
    meta: "1.2 MB · 1h ago",
  },
  {
    icon: "document",
    name: "invoice-1042.pdf",
    meta: "248 KB · 3h ago",
  },
  {
    icon: "video",
    name: "launch.mp4",
    meta: "48.2 MB · 2d ago",
  },
  {
    icon: "storage",
    name: "contracts/",
    meta: "12 files · 4d ago",
  },
] satisfies Array<{ icon: IconName; name: string; meta: string }>;

const RUNS = [
  {
    name: "Send welcome email",
    meta: "12 runs today",
    status: "Done",
    dot: "bg-[#F5F3EE]",
    statusClass: "text-[#F5F3EE]",
  },
  {
    name: "Sync Stripe invoices",
    meta: "running now",
    status: "Live",
    dot: "bg-brand",
    statusClass: "text-brand/80",
  },
  {
    name: "Nightly cleanup",
    meta: "scheduled 02:00",
    status: "Queued",
    dot: "bg-white/30",
    statusClass: "text-white/30",
  },
  {
    name: "Deliver webhooks",
    meta: "48 delivered",
    status: "Done",
    dot: "bg-[#F5F3EE]",
    statusClass: "text-[#F5F3EE]",
  },
  {
    name: "Rebuild search index",
    meta: "3 runs today",
    status: "Done",
    dot: "bg-[#F5F3EE]",
    statusClass: "text-[#F5F3EE]",
  },
];

function UiPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden border-t border-line bg-[#101315] ${className}`}
    >
      {children}
    </div>
  );
}

function IdentityUi() {
  return (
    <UiPanel className="h-[460px] min-[1120px]:h-[620px]">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-4">
        <span className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-white/[0.02] px-3">
          <Icon name="search" size={14} className="shrink-0 text-white/40" />
          <span className="truncate text-[13px] text-white/50">
            Search users
          </span>
        </span>
        <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-brand px-3 text-[12px] font-semibold text-[#101315]">
          <Icon name="add" size={12} />
          Invite
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-5 border-b border-line px-4 py-2.5 text-[11px] font-medium text-white/40">
        <span className="text-white/60">
          All <span className="text-white/25">24</span>
        </span>
        <span>
          Active <span className="text-white/25">18</span>
        </span>
        <span>
          Pending <span className="text-white/25">6</span>
        </span>
      </div>

      <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_76px_74px] border-b border-line px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
        <span>User</span>
        <span>Role</span>
        <span>Status</span>
      </div>

      {USERS.map((user, index) => (
        <div
          key={user.email}
          className={`grid grid-cols-[minmax(0,1fr)_76px_74px] items-center border-b border-line-subtle px-4 py-2.5 ${index >= 6 ? "hidden min-[1120px]:grid" : ""}`}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${user.avatar}`}
            >
              {user.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium leading-tight text-white/85">
                {user.name}
              </span>
              <span className="block truncate text-[11px] leading-tight text-white/35">
                {user.email}
              </span>
            </span>
          </span>
          <span className="text-[12px] text-white/50">
            {user.role}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/50">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${user.dot}`} />
            {user.status}
          </span>
        </div>
      ))}
    </UiPanel>
  );
}

function RealtimeUi() {
  return (
    <UiPanel className="h-[220px] min-[1120px]:h-full">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/65">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5F3EE] motion-reduce:animate-none" />
          Live feed
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-white/35"><span className="h-1.5 w-1.5 rounded-full bg-[#F5F3EE]" />Live</span>
      </div>

      {EVENTS.slice(0, 3).map((event, index) => (
        <div
          key={event.text}
          className={`flex flex-1 items-start gap-3 border-b border-line-subtle px-4 py-2 ${
            index === 0 ? "bg-white/[0.015]" : ""
          }`}
        >
          <span
            className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border ${
              event.accent
                ? "border-brand/20 bg-brand/10 text-brand"
                : "border-line bg-white/[0.03] text-white/45"
            }`}
          >
            <Icon name={event.icon} size={14} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] text-white/80">
              {event.text}
            </span>
            <span className="mt-1 block text-[11px] text-white/35">
              {event.meta}
            </span>
          </span>
        </div>
      ))}
    </UiPanel>
  );
}

function StorageUi() {
  return (
    <UiPanel className="h-[220px] min-[1120px]:h-full">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-4">
        <Icon name="storage" size={15} className="shrink-0 text-white/50" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/65">
          Files
        </span>
        <span className="ml-auto text-[11px] text-white/35">
          12.4 GB
        </span>
        <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded border border-line px-2 text-[11px] text-white/55">
          <Icon name="add" size={11} />
          Upload
        </span>
      </div>

      {FILES.slice(0, 3).map((file) => (
        <div
          key={file.name}
          className="flex flex-1 items-center gap-3 border-b border-line-subtle px-4 py-2"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line bg-white/[0.03] text-white/55">
            <Icon name={file.icon} size={15} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] text-white/80">
              {file.name}
            </span>
            <span className="block truncate text-[11px] text-white/35">
              {file.meta}
            </span>
          </span>
        </div>
      ))}
    </UiPanel>
  );
}

function AutomationUi() {
  return (
    <UiPanel className="h-[220px] min-[1120px]:h-full">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-4">
        <Icon name="automation" size={15} className="shrink-0 text-white/50" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/65">
          Runs
        </span>
        <span className="ml-auto text-[11px] text-white/35">
          Today
        </span>
      </div>

      {RUNS.slice(0, 3).map((run) => (
        <div
          key={run.name}
          className="flex flex-1 items-center gap-3 border-b border-line-subtle px-4 py-2"
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${run.dot}`} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] text-white/80">
              {run.name}
            </span>
            <span className="block truncate text-[11px] text-white/35">
              {run.meta}
            </span>
          </span>
          <span
            className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] ${run.statusClass}`}
          >
            {run.status}
          </span>
        </div>
      ))}
    </UiPanel>
  );
}

export function BeyondDatabase() {
  return (
    <RailSection id="breadth" labelledBy="breadth-title" className="bg-surface">
      <div className="grid gap-8 px-6 py-[clamp(56px,7vw,88px)] min-[768px]:px-10 min-[980px]:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] min-[980px]:items-end min-[981px]:px-14 min-[1241px]:px-16">
        <div>
          <Kicker>Beyond the database</Kicker>
          <h2
            id="breadth-title"
            className="mt-5 max-w-[15ch] text-[clamp(34px,4.4vw,58px)] font-medium leading-[1.02] tracking-[-0.058em] text-text"
          >
            A lot more than rows and columns.
          </h2>
        </div>

        <p className="max-w-[42ch] text-[13.5px] leading-[1.72] tracking-[-0.01em] text-muted min-[980px]:pb-1">
          Your data is the starting point. Identity, storage, realtime,
          queues, and policies are already part of the same project.
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-line min-[1120px]:auto-rows-[430px] min-[1120px]:grid-cols-12">
        <article
          className={`${CARD} min-h-[680px] border-b min-[1120px]:col-span-5 min-[1120px]:row-span-2 min-[1120px]:min-h-0 min-[1120px]:border-b-0 min-[1120px]:border-r`}
        >
          <Kicker>Identity</Kicker>

          <h3 className="mt-4 max-w-[16ch] text-[clamp(22px,2vw,29px)] font-medium leading-[1.14] tracking-[-0.043em] text-text">
            Users, sessions, and what they can do.
          </h3>

          <p className="mt-3 max-w-[32ch] text-[14px] leading-[1.6] tracking-[-0.01em] text-muted">
            Sign people in. Keep the session. Apply the same rules to every
            request that follows.
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-6 flex min-h-0 flex-1 select-none flex-col justify-end overflow-hidden -mx-6 -mb-6 min-[768px]:-mx-8 min-[768px]:-mb-8"
          >
            <IdentityUi />
          </div>

        </article>

        <article
          className={`${CARD} min-h-[430px] border-b min-[1120px]:col-span-4 min-[1120px]:min-h-0 min-[1120px]:border-r`}
        >
          <Kicker>Realtime</Kicker>

          <h3 className="mt-4 max-w-[15ch] text-[clamp(21px,1.8vw,27px)] font-medium leading-[1.16] tracking-[-0.04em] text-text">
            Changes arrive as they happen.
          </h3>

          <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] tracking-[-0.01em] text-muted">
            Subscribe once. Keep the screen current without asking again.
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-6 flex min-h-0 flex-1 select-none flex-col justify-end overflow-hidden -mx-6 -mb-6 min-[768px]:-mx-8 min-[768px]:-mb-8"
          >
            <RealtimeUi />
          </div>

        </article>

        <article
          className={`${CARD} min-h-[430px] border-b min-[1120px]:col-span-3 min-[1120px]:min-h-0`}
        >
          <Kicker>Storage</Kicker>

          <h3 className="mt-4 max-w-[13ch] text-[clamp(21px,1.8vw,27px)] font-medium leading-[1.16] tracking-[-0.04em] text-text">
            Files that live with your data.
          </h3>

          <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.6] tracking-[-0.01em] text-muted">
            Objects, with the same access rules as everything else.
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-6 flex min-h-0 flex-1 select-none flex-col justify-end overflow-hidden -mx-6 -mb-6 min-[768px]:-mx-8 min-[768px]:-mb-8"
          >
            <StorageUi />
          </div>

        </article>

        <article
          className={`${CARD} min-h-[430px] min-[1120px]:col-span-3 min-[1120px]:min-h-0`}
        >
          <Kicker>Automation</Kicker>

          <h3 className="mt-4 max-w-[12ch] text-[clamp(21px,1.8vw,27px)] font-medium leading-[1.16] tracking-[-0.04em] text-text">
            Events in. Work out.
          </h3>

          <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] tracking-[-0.01em] text-muted">
            Queue jobs, deliver webhooks, and keep the request path short.
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-6 flex min-h-0 flex-1 select-none flex-col justify-end overflow-hidden -mx-6 -mb-6 min-[768px]:-mx-8 min-[768px]:-mb-8"
          >
            <AutomationUi />
          </div>

        </article>
      </div>
    </RailSection>
  );
}
