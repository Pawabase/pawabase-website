import { Icon } from "@/components/Icon";

const ROWS = [
  ["1042", "ada@northwind", "Shipped"],
  ["1291", "leo@field", "New"],
  ["1304", "mina@studio", "Paid"],
] as const;

function Records() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.16),transparent_68%)]"
      />
      <div className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0c1117]/90 shadow-[0_40px_80px_-48px_rgba(255,106,0,0.8)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <span className="text-[13px] font-medium tracking-[-0.01em] text-text">orders</span>
          <span className="text-[12px] text-muted">Today</span>
        </div>
        <div className="grid grid-cols-[64px_1fr_88px] px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-faint">
          <span>Id</span>
          <span>Customer</span>
          <span className="text-right">Status</span>
        </div>
        {ROWS.map(([id, who, status]) => (
          <div
            key={id}
            className={`grid grid-cols-[64px_1fr_88px] items-center px-4 py-2.5 text-[13px] ${
              status === "New" ? "bg-brand/[0.08] text-text" : "text-muted"
            }`}
          >
            <span className="font-medium text-text">{id}</span>
            <span>{who}</span>
            <span className={`text-right ${status === "New" ? "text-brand" : ""}`}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignedIn() {
  return (
    <div className="flex w-[220px] flex-col items-end gap-4">
      <div className="flex -space-x-2">
        {["A", "L", "M"].map((letter, i) => (
          <span
            key={letter}
            className={`flex size-9 items-center justify-center rounded-full border border-[#0c1117] text-[12px] font-medium ${
              i === 0 ? "bg-brand text-[#121316]" : i === 1 ? "bg-[#FCF8F5] text-[#121316]" : "bg-[#143f3a] text-brand"
            }`}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-text shadow-[0_16px_40px_-24px_rgba(255,106,0,0.9)]">
        <Icon name="users" size={14} className="text-brand" />
        Signed in as Ada
        <span className="size-1.5 rounded-full bg-brand" />
      </div>
    </div>
  );
}

function SavedFile() {
  return (
    <div className="w-[230px] rounded-[16px] border border-white/[0.08] bg-[#0c1117] p-3.5 shadow-[0_24px_50px_-32px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand/15 text-brand">
          <Icon name="storage" size={18} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium text-text">invoice.pdf</span>
          <span className="block text-[12px] text-muted">Saved with the order</span>
        </span>
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-brand">
        <span className="size-1.5 rounded-full bg-brand" />
        Link ready
      </div>
    </div>
  );
}

const SENT = [
  ["Welcome", "Delivered", "12:07"],
  ["Receipt", "Opened", "11:43"],
  ["Invite", "Sent", "11:19"],
] as const;

function SentMail() {
  return (
    <ol className="m-0 w-[210px] list-none p-0">
      {SENT.map(([name, state, time], i) => (
        <li key={name} className="relative flex gap-3 pb-4 last:pb-0">
          {i < SENT.length - 1 ? (
            <span aria-hidden="true" className="absolute left-[5px] top-3 h-[calc(100%-4px)] w-px bg-white/10" />
          ) : null}
          <span className={`relative mt-1 size-[11px] shrink-0 rounded-full ${i === 0 ? "bg-brand" : "bg-white/25"}`} />
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-medium text-text">{name}</span>
              <span className="text-[11px] text-faint">{time}</span>
            </span>
            <span className="block text-[12px] text-muted">{state}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Copy({ title, children }: { title: string; children: string }) {
  return (
    <div className="max-w-[34ch]">
      <h3 className="m-0 text-[22px] font-medium leading-[1.2] tracking-[-0.03em] text-text min-[900px]:text-[24px]">
        {title}
      </h3>
      <p className="m-0 mt-2 text-[15px] leading-[1.55] text-muted">{children}</p>
    </div>
  );
}

/**
 * Four quiet product scenes. The page rails and the rules above and below
 * are the frame, so the grid has no box of its own.
 */
export function CapabilityBoard() {
  return (
    <div aria-label="What you get">
      <div className="mx-auto grid w-[min(calc(100%-32px),1320px)] min-[900px]:grid-cols-2">
        <article className="flex flex-col justify-between gap-10 border-b border-line p-8 min-[900px]:border-r min-[900px]:p-10">
          <div className="flex flex-1 items-center py-4">
            <Records />
          </div>
          <Copy title="The product remembers">
            Orders, customers and status stay in one place, so the screen you ship is telling the truth.
          </Copy>
        </article>

        <article className="flex flex-col justify-between gap-8 border-b border-line p-8 min-[900px]:flex-row min-[900px]:items-end min-[900px]:p-10">
          <Copy title="A visitor becomes a customer">
            They sign in once. After that, the app knows who they are and what they are allowed to see.
          </Copy>
          <SignedIn />
        </article>

        <article className="flex flex-col justify-between gap-8 border-b border-line p-8 min-[900px]:flex-row min-[900px]:items-end min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:p-10">
          <Copy title="The file stays with the work">
            The invoice lands beside the order, and the person who should open it still can tomorrow.
          </Copy>
          <SavedFile />
        </article>

        <article className="flex flex-col justify-between gap-8 p-8 min-[900px]:flex-row min-[900px]:items-end min-[900px]:p-10">
          <Copy title="They hear from you">
            The welcome, the receipt, the invite. Each one goes out, and you can tell which were opened.
          </Copy>
          <SentMail />
        </article>
      </div>
    </div>
  );
}
