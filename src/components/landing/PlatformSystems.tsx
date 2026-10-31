import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";

const C = {
  shell: "var(--color-shell, #06080b)",
  elevated: "var(--color-elevated, #06080b)",
  text: "var(--color-text, #F5F3EE)",
  muted: "var(--color-muted, #70757D)",
  faint: "var(--color-faint, #70757D)",
  line: "var(--color-line, #34383F)",
  brand: "var(--color-brand, #F5F3EE)",
};

const border = `1px solid ${C.line}`;

function useScreenWidth() {
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 1200 : window.innerWidth,
  );

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

function VisualStage({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        height: 360,
        marginTop: "auto",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundImage: `radial-gradient(${C.line} 0.8px, transparent 0.8px)`,
          backgroundSize: "12px 12px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 35%, black)",
          opacity: 0.7,
        }}
      />
      {children}
    </div>
  );
}

function Window({
  title,
  meta,
  icon,
  children,
  style,
}: {
  title: string;
  meta: string;
  icon: IconName;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        overflow: "hidden",
        border,
        borderRadius: 16,
        background: C.elevated,
        boxShadow: "0 22px 64px rgba(16,19,21,0.38)",
        ...style,
      }}
    >
      <div
        style={{
          height: 48,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: border,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 26,
              height: 26,
              display: "grid",
              placeItems: "center",
              border: border,
              borderRadius: 8,
              color: C.brand,
              background: C.shell,
            }}
          >
            <Icon name={icon} size={14} variant="TwoTone" />
          </span>
          <span
            style={{
              color: C.text,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {title}
          </span>
        </span>
        <span
          style={{
            color: C.faint,
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {meta}
        </span>
      </div>
      {children}
    </div>
  );
}

function ServicesVisual() {
  const items: [IconName, string, string][] = [
    ["database", "Database", "Connected"],
    ["users", "Authentication", "Active"],
    ["storage", "Storage", "Connected"],
    ["realtime", "Realtime", "Listening"],
    ["apiSecurity", "API Gateway", "Healthy"],
  ];

  return (
    <VisualStage>
      <Window
        title="Backend services"
        meta="PROJECT / DEFAULT"
        icon="database"
        style={{
          top: 26,
          left: "4%",
          width: "92%",
        }}
      >
        <div style={{ padding: 9 }}>
          {items.map(([icon, name, status], index) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                height: 54,
                padding: "0 14px",
                borderRadius: 8,
                background: index === 0 ? C.brand : "transparent",
                color: index === 0 ? C.shell : C.muted,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  border: `1px solid currentColor`,
                  borderRadius: 5,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  opacity: 0.85,
                }}
              >
                <Icon
                  name={icon}
                  size={12}
                  variant={index === 0 ? "Bulk" : "Linear"}
                />
              </span>

              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: index === 0 ? 700 : 500,
                }}
              >
                {name}
              </span>

              <span
                style={{
                  
                  fontSize: 12,
                  opacity: 0.9,
                }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </Window>
    </VisualStage>
  );
}

function SecurityVisual() {
  return (
    <VisualStage>
      <Window
        title="Request firewall"
        meta="POLICIES / LIVE"
        icon="firewall"
        style={{
          top: 26,
          left: "4%",
          width: "92%",
        }}
      >
        <div style={{ padding: "20px 18px 12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: C.faint,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            <span>Requests</span>
            <span>Evaluation</span>
          </div>

          <svg
            viewBox="0 0 360 185"
            style={{
              width: "100%",
              height: 190,
              display: "block",
            }}
            role="img"
            aria-label="Requests flowing through the Pawabase policy engine"
          >
            <g fill="none" stroke={C.muted} strokeWidth="1.1" opacity="0.65">
              <path d="M0 30 C75 30 105 65 151 70" />
              <path d="M0 65 C80 65 110 78 151 83" />
              <path d="M0 100 C80 100 110 95 151 96" />
              <path d="M0 135 C75 135 105 110 151 109" />
            </g>

            <rect
              x="151"
              y="48"
              width="62"
              height="88"
              rx="11"
              fill={C.shell}
              stroke={C.line}
            />

            <text
              x="182"
              y="85"
              textAnchor="middle"
              fill={C.text}
              fontSize="14"
              fontWeight="700"
            >
              PB
            </text>
            <text
              x="182"
              y="101"
              textAnchor="middle"
              fill={C.faint}
              fontSize="10"
            >
              POLICY
            </text>

            <path
              d="M213 75 C270 75 292 38 360 38"
              stroke={C.brand}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M213 108 C270 108 292 148 360 148"
              stroke={C.muted}
              strokeWidth="1.5"
              strokeDasharray="4 5"
              fill="none"
            />

            <circle cx="213" cy="75" r="4" fill={C.brand} />
            <circle cx="213" cy="108" r="4" fill={C.muted} />

            <text
              x="280"
              y="25"
              fill={C.brand}
              fontSize="12"
              fontWeight="600"
            >
              ALLOWED
            </text>
            <text
              x="282"
              y="166"
              fill={C.muted}
              fontSize="12"
              fontWeight="600"
            >
              BLOCKED
            </text>
          </svg>
        </div>

        <div
          style={{
            borderTop: border,
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: C.muted,
          }}
        >
          <span>Access policies</span>
          <span style={{ color: C.brand }}>Enforced</span>
        </div>
      </Window>
    </VisualStage>
  );
}

function AutomationVisual() {
  const steps: [IconName, string, string][] = [
    ["events", "Event received", "09:41:02"],
    ["policies", "Policy evaluated", "Passed"],
    ["automation", "Flow completed", "42ms"],
    ["queues", "Job dispatched", "Queued"],
    ["webhooks", "Webhook delivered", "200 OK"],
  ];

  return (
    <VisualStage>
      <Window
        title="Execution trace"
        meta="RUN_01M4"
        icon="automation"
        style={{
          top: 26,
          left: "4%",
          width: "92%",
        }}
      >
        <div style={{ padding: "10px 16px" }}>
          {steps.map(([icon, label, detail], index) => (
            <div
              key={label}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 13,
                height: 50,
              }}
            >
              {index < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 38,
                    left: 15,
                    width: 1,
                    height: 24,
                    background: C.line,
                  }}
                />
              )}

              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  
                  border: index === 2 ? `1px solid ${C.brand}` : border,
                  background: index === 2 ? C.brand : C.shell,
                  color: index === 2 ? C.shell : C.muted,
                }}
              >
                <Icon
                  name={icon}
                  size={14}
                  variant={index === 2 ? "Bulk" : "Linear"}
                />
              </span>

              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: index === 2 ? C.text : C.muted,
                  fontWeight: index === 2 ? 700 : 500,
                }}
              >
                {label}
              </span>

              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: index === 2 ? C.brand : C.faint,
                }}
              >
                {detail}
              </span>
            </div>
          ))}
        </div>
      </Window>
    </VisualStage>
  );
}

const columns = [
  {
    title: "Backend services, ready when you are.",
    description:
      "Authentication, databases, storage, realtime, and APIs. The infrastructure your applications need, already connected.",
    visual: <ServicesVisual />,
  },
  {
    title: "Control what gets through.",
    description:
      "Define access policies, protect endpoints, and enforce permissions across your backend from one consistent security layer.",
    visual: <SecurityVisual />,
  },
  {
    title: "From event to execution.",
    description:
      "Run flows, process jobs, trigger webhooks, and automate backend operations without stitching together separate systems.",
    visual: <AutomationVisual />,
  },
];

export function PlatformSystems() {
  const width = useScreenWidth();
  const desktop = width >= 900;

  const gutter = width >= 1241 ? "9.25%" : width >= 768 ? 42 : 14;

  return (
    <section
      id="systems"
      aria-label="Pawabase platform capabilities"
      style={{
        background: C.shell,
        borderTop: border,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${typeof gutter === "number" ? `${gutter}px` : gutter} minmax(0, 1fr) ${typeof gutter === "number" ? `${gutter}px` : gutter}`,
        }}
      >
        <div style={{ borderRight: border }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: desktop
              ? "repeat(3, minmax(0, 1fr))"
              : "minmax(0, 1fr)",
            minWidth: 0,
          }}
        >
          {columns.map((column, index) => (
            <article
              key={column.title}
              style={{
                minWidth: 0,
                minHeight: desktop ? 600 : 500,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                paddingTop: 47,
                borderRight: desktop && index < 2 ? border : undefined,
                borderBottom: !desktop && index < 2 ? border : undefined,
              }}
            >
              <div
                style={{
                  padding: desktop ? "0 30px" : "0 26px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    maxWidth: "24ch",
                    color: C.text,
                    fontSize: "clamp(22px, 1.9vw, 27px)",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {column.title}
                </h3>

                <p
                  style={{
                    margin: "14px 0 0",
                    maxWidth: "38ch",
                    color: C.muted,
                    fontSize: 15,
                    lineHeight: 1.65,
                  }}
                >
                  {column.description}
                </p>
              </div>

              {column.visual}
            </article>
          ))}
        </div>

        <div style={{ borderLeft: border }} />
      </div>
    </section>
  );
}
