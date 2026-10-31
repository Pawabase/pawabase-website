import { Icon, type IconName } from "@/components/Icon";

import { RailSection } from "./Section";

const SCHEMA: {
  field: string;
  type: string;
  access: string;
  icon: IconName;
  emphasis?: boolean;
}[] = [
  { field: "id", type: "uuid", access: "read", icon: "database" },
  { field: "title", type: "text", access: "read · write", icon: "code" },
  { field: "status", type: "enum", access: "read · write", icon: "activity" },
  {
    field: "owner_id",
    type: "relation",
    access: "policy",
    icon: "users",
    emphasis: true,
  },
];

export function DataFreedom() {
  return (
    <RailSection id="data" labelledBy="data-title">
      <div className="grid grid-cols-1 min-[980px]:grid-cols-[minmax(0,34%)_minmax(0,66%)]">
        <div className="flex flex-col justify-center px-6 py-[clamp(60px,7.5vw,100px)] min-[768px]:px-10 min-[981px]:pl-14 min-[981px]:pr-12 min-[1241px]:pl-16 min-[1241px]:pr-14">
          <h2
            id="data-title"
            className="max-w-[10ch] text-[clamp(38px,4.7vw,58px)] font-medium leading-[1.01] tracking-[-0.06em] text-text"
          >
            Your data.
            <span className="block text-muted">Your way.</span>
          </h2>

          <p className="mt-7 max-w-[35ch] text-[15px] leading-[1.65] tracking-[-0.01em] text-muted">
            Write SQL when it helps. Work visually when it doesn't. Either way,
            it's the same database, the same rules, and the same API.
          </p>
        </div>

        <div className="flex flex-col border-t border-line bg-surface min-[980px]:border-l min-[980px]:border-t-0">
          <div className="flex h-14 items-center justify-between gap-4 border-b border-line px-5 min-[768px]:px-6">
            <div className="flex items-center gap-2.5">
              <Icon
                name="database"
                size={18}
                variant="TwoTone"
                className="text-brand"
              />
              <span className="text-[13px] font-semibold text-white/80">
                tasks
              </span>
            </div>
            <span className="flex items-center gap-2 text-[11px] font-medium text-white/45">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand/80"
                aria-hidden="true"
              />
              Live schema
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[46%]" />
                <col className="w-[24%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-line bg-shell/30 text-[11px] font-semibold uppercase tracking-[0.1em] text-faint">
                  <th
                    scope="col"
                    className="border-r border-line-subtle px-3.5 py-3.5 font-normal min-[768px]:px-6"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon name="database" size={14} />
                      Field
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="border-r border-line-subtle px-3 py-3.5 font-normal min-[768px]:px-4"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3.5 py-3.5 text-right font-normal min-[768px]:px-6"
                  >
                    Access
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCHEMA.map((row) => (
                  <tr
                    key={row.field}
                    className={`border-b border-line-subtle transition-colors last:border-b-0 hover:bg-white/[0.025] ${
                      row.emphasis ? "bg-white/[0.025]" : ""
                    }`}
                  >
                    <td className="border-r border-line-subtle px-3.5 py-4 min-[768px]:px-6">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Icon
                          name={row.icon}
                          size={16}
                          variant="TwoTone"
                          className={
                            row.emphasis ? "text-brand" : "text-white/30"
                          }
                        />
                        <span className="truncate text-[14px] font-medium text-white/85">
                          {row.field}
                        </span>
                      </span>
                    </td>
                    <td className="truncate border-r border-line-subtle px-3 py-4 text-[13px] text-white/45 min-[768px]:px-4">
                      {row.type}
                    </td>
                    <td
                      className={`truncate px-3.5 py-4 text-right text-[13px] min-[768px]:px-6 ${
                        row.emphasis ? "text-brand/85" : "text-white/45"
                      }`}
                    >
                      {row.access}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-auto grid grid-cols-1 border-t border-line min-[640px]:grid-cols-2">
            <div className="border-b border-line p-5 min-[640px]:border-b-0 min-[640px]:border-r min-[768px]:p-7">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                <Icon name="apiSecurity" size={16} variant="TwoTone" />
                API
              </div>
              <p className="mt-3 break-words text-[14px] leading-[1.8] text-white/85">
                <span className="text-brand">GET</span> /rest/v1/tasks
              </p>
              <p className="break-words text-[12px] leading-[1.8] text-white/40">
                ?select=title,status
              </p>
            </div>

            <div className="p-5 min-[768px]:p-7">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                <Icon name="code" size={16} variant="TwoTone" />
                SQL
              </div>
              <pre className="mt-3 overflow-x-auto text-[13px] leading-[1.85] text-white/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <code>
                  <span className="text-brand">select</span> title, status{"\n"}
                  <span className="text-brand">from</span> tasks{"\n"}
                  <span className="text-brand">where</span> owner_id = $1;
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </RailSection>
  );
}
