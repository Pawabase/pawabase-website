import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { Icon, type IconName } from "@/components/Icon";

import { Wordmark } from "./Brand";

const DOCS_URL = "https://docs.sillo.build";
const APP_URL = "https://app.pawabase.com";

type NavLink = {
  label: string;
  href: string;
  description: string;
  icon: IconName;
  external?: boolean;
};

type NavColumn = {
  heading: string;
  links: NavLink[];
};

type NavFeatured = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  glyph: string;
  tint: string;
  external?: boolean;
};

type NavGroup = {
  id: string;
  label: string;
  intro: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    external?: boolean;
  };
  columns: NavColumn[];
  featured: NavFeatured;
};

const EXTRA_LINKS = [
  { label: "Docs", href: DOCS_URL, external: true },
];

const NAV_GROUPS: NavGroup[] = [
  {
    id: "products",
    label: "Products",
    intro: {
      title: "The pieces, already connected.",
      description:
        "Every product below is part of the same backend. Add one, and the rest already know how to talk to it.",
      ctaLabel: "See the whole platform",
      ctaHref: "/#features",
    },
    columns: [
      {
        heading: "Data",
        links: [
          { label: "Database", href: "/products/database", description: "Tables on Postgres, with an API", icon: "database" },
          { label: "Data API", href: "/products/data-api", description: "A REST API for every table", icon: "document" },
          { label: "Storage", href: "/products/storage", description: "Files, images and share links", icon: "storage" },
          { label: "Realtime", href: "/products/realtime", description: "Live updates and presence", icon: "realtime" },
        ],
      },
      {
        heading: "Identity & security",
        links: [
          { label: "Authentication", href: "/products/authentication", description: "Sign-in, teams and two-step codes", icon: "users" },
          { label: "Access policies", href: "/products/policies", description: "Who can see and change what", icon: "policies" },
          { label: "API security", href: "/products/api-security", description: "Keys, firewall and rate limits", icon: "apiSecurity" },
        ],
      },
      {
        heading: "Logic",
        links: [
          { label: "Flows", href: "/products/flows", description: "Visual workflows and schedules", icon: "automation" },
          { label: "Queues", href: "/products/queues", description: "Background jobs with retries", icon: "queues" },
          { label: "Mail", href: "/products/mail", description: "Transactional email from templates", icon: "mail" },
          { label: "Webhooks", href: "/products/webhooks", description: "Events in and out", icon: "webhooks" },
        ],
      },
      {
        heading: "Operations",
        links: [
          { label: "Releases", href: "/products/releases", description: "Environments, rollback, backups", icon: "refresh" },
          { label: "Observability", href: "/products/observability", description: "Logs, metrics and alarms", icon: "activity" },
        ],
      },
    ],
    featured: {
      eyebrow: "Pawabase Cloud",
      title: "Rather we run it?",
      description:
        "A project with its own database in about a minute. No servers to set up.",
      ctaLabel: "Create a project",
      href: APP_URL,
      glyph: "PB",
      tint: "255,112,73",
      external: true,
    },
  },
  {
    id: "developers",
    label: "Developers",
    intro: {
      title: "Read it. Ship it.",
      description:
        "Documentation, API reference, and practical guidance for building against Pawabase.",
      ctaLabel: "Open documentation",
      ctaHref: DOCS_URL,
      external: true,
    },
    columns: [
      {
        heading: "Documentation",
        links: [
          {
            label: "Documentation",
            href: DOCS_URL,
            description: "Guides and references",
            icon: "document",
            external: true,
          },
          {
            label: "API reference",
            href: DOCS_URL,
            description: "Every endpoint, documented",
            icon: "apiSecurity",
            external: true,
          },
          {
            label: "Quickstart",
            href: DOCS_URL,
            description: "From zero to running",
            icon: "play",
            external: true,
          },
        ],
      },
      {
        heading: "Build with Pawabase",
        links: [
          {
            label: "Quickstart",
            href: DOCS_URL,
            description: "Your first project",
            icon: "play",
            external: true,
          },
          {
            label: "Security",
            href: "/products/api-security",
            description: "Keys, policies and firewall",
            icon: "apiSecurity",
          },
          {
            label: "Cloud",
            href: APP_URL,
            description: "Start a managed project",
            icon: "sparkle",
            external: true,
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Developer first",
      title: "No black boxes.",
      description:
        "The docs are the product. Learn the API, understand each primitive, and ship.",
      ctaLabel: "Read the docs",
      href: DOCS_URL,
      glyph: "</>",
      tint: "255,112,73",
      external: true,
    },
  },
  {
    id: "company",
    label: "Company",
    intro: {
      title: "Building the backend we wanted to use.",
      description:
        "Meet Pawabase, follow what we are learning, and find a way to build with us.",
      ctaLabel: "About Pawabase",
      ctaHref: "/company",
    },
    columns: [
      {
        heading: "Inside Pawabase",
        links: [
          {
            label: "About",
            href: "/company",
            description: "Why we are building Pawabase",
            icon: "sparkle",
          },
          {
            label: "Blog",
            href: "/blog",
            description: "Product and engineering notes",
            icon: "document",
          },
        ],
      },
      {
        heading: "Work with us",
        links: [
          {
            label: "Careers",
            href: "/company/careers",
            description: "Help shape what comes next",
            icon: "users",
          },
          {
            label: "Contact",
            href: "/company/contact",
            description: "Talk to the Pawabase team",
            icon: "mail",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Pawabase Cloud",
      title: "Start with a complete backend.",
      description:
        "Build your product with data, identity, automation and operations already connected.",
      ctaLabel: "Create a project",
      href: APP_URL,
      glyph: "PB",
      tint: "255,112,73",
      external: true,
    },
  },
];

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h9" />
      <path d="M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

function externalProps(external?: boolean) {
  return external
    ? ({ target: "_blank", rel: "noreferrer" } as const)
    : {};
}

function NavLinkRow({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate: () => void;
}) {
  return (
    <a
      href={link.href}
      {...externalProps(link.external)}
      onClick={onNavigate}
      className="group -mx-2 flex gap-2.5 rounded-xl p-2 transition-colors duration-150 hover:bg-white/[0.05] focus-visible:bg-white/[0.05]"
    >
      <span className="mt-0.5 shrink-0 text-brand/85 transition-colors duration-150 group-hover:text-brand">
        <Icon name={link.icon} size={18} variant="Bulk" />
      </span>

      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-[1.35] tracking-[-0.015em] text-text">
          {link.label}
        </span>
        <span className="mt-0.5 block text-[13px] leading-[1.4] text-muted/75">
          {link.description}
        </span>
      </span>
    </a>
  );
}

function NavFeaturedCard({ featured, onNavigate }: { featured: NavFeatured; onNavigate: () => void }) {
  return (
    <div className="p-2">
      <div
        className="flex h-full flex-col rounded-2xl border border-white/[0.08] p-4"
        style={{
          background: `radial-gradient(120% 100% at 20% 0%, rgba(${featured.tint}, 0.16), transparent 62%), rgba(255, 255, 255, 0.022)`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/40">
            {featured.eyebrow}
          </span>
          <span
            className="font-mono text-[22px] font-bold leading-none tracking-[-0.05em]"
            style={{ color: `rgb(${featured.tint})` }}
          >
            {featured.glyph}
          </span>
        </div>

        <p className="mt-4 text-[16px] font-semibold leading-[1.25] tracking-[-0.03em] text-text">
          {featured.title}
        </p>

        <p className="mt-2 text-[13px] leading-[1.45] text-muted/80">
          {featured.description}
        </p>

        <a
          href={featured.href}
          {...externalProps(featured.external)}
          onClick={onNavigate}
          className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-brand no-underline transition-colors hover:text-white"
        >
          {featured.ctaLabel}
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

function DesktopPanel({
  group,
  activeId,
  onNavigate,
}: {
  group: NavGroup | null;
  activeId: string | null;
  onNavigate: () => void;
}) {
  const tracks = group
    ? `repeat(${group.columns.length}, minmax(0, 1fr)) minmax(240px, 1.35fr)`
    : undefined;

  return (
    <div
      id="desktop-nav-panel"
      aria-hidden={!group}
      aria-labelledby={activeId ? `nav-trigger-${activeId}` : undefined}
      className={`absolute inset-x-0 top-[calc(100%+10px)] z-40 hidden overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#111112]/95 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-out min-[900px]:block ${
        group
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      {group ? (
        <>
          <div className="flex items-end justify-between gap-6 px-2 pb-3 pt-1">
            <div>
              <p className="text-[15.5px] font-semibold tracking-[-0.025em] text-text">
                {group.intro.title}
              </p>
              <p className="mt-1 max-w-[64ch] text-[13.5px] leading-[1.5] text-muted">
                {group.intro.description}
              </p>
            </div>

            <a
              href={group.intro.ctaHref}
              {...externalProps(group.intro.external)}
              onClick={onNavigate}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.14] px-3.5 py-2 text-[13px] font-semibold text-text no-underline transition-colors hover:border-brand/45 hover:text-brand"
            >
              {group.intro.ctaLabel}
              <ArrowIcon />
            </a>
          </div>

          <div
            className="grid divide-x divide-white/[0.08]"
            style={{ gridTemplateColumns: tracks }}
          >
            {group.columns.map((column) => (
              <div key={column.heading} className="min-w-0 px-4 py-3">
                <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-brand/75">
                  {column.heading}
                </p>

                <div className="space-y-0.5">
                  {column.links.map((link) => (
                    <NavLinkRow
                      key={link.label}
                      link={link}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </div>
            ))}

            <NavFeaturedCard featured={group.featured} onNavigate={onNavigate} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export function TopBar() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("products");
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeGroup = NAV_GROUPS.find((group) => group.id === activeId) ?? null;

  const closeAll = () => {
    setActiveId(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!activeGroup && !mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeAll();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGroup, mobileOpen]);

  const toggleDesktopGroup = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
    setMobileOpen(false);
  };

  const toggleMobile = () => {
    setMobileOpen((current) => {
      if (!current) setMobileGroup("products");
      return !current;
    });
    setActiveId(null);
  };

  const onTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + step + NAV_GROUPS.length) % NAV_GROUPS.length;
    const nextGroup = NAV_GROUPS[next];

    triggerRefs.current[nextGroup.id]?.focus();
    if (activeId) setActiveId(nextGroup.id);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 px-4 py-2 min-[768px]:px-6"
    >
      <div className="relative mx-auto w-full max-w-[1160px]">
        <nav
          className="flex h-[56px] items-center justify-between gap-3 rounded-2xl border border-white/[0.12] bg-[#111112]/84 px-2 pl-4 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl min-[768px]:h-[60px]"
          aria-label="Primary navigation"
        >
          <a
            href="/"
            className="inline-flex w-fit shrink-0 items-center"
            aria-label="Pawabase home"
            onClick={closeAll}
          >
            <Wordmark />
          </a>

          <div className="hidden items-center gap-0.5 min-[900px]:flex">
            {NAV_GROUPS.map((group, index) => {
              const open = activeId === group.id;

              return (
                <button
                  key={group.id}
                  id={`nav-trigger-${group.id}`}
                  ref={(element) => {
                    triggerRefs.current[group.id] = element;
                  }}
                  type="button"
                  aria-expanded={open}
                  aria-controls="desktop-nav-panel"
                  onClick={() => toggleDesktopGroup(group.id)}
                  onKeyDown={(event) => onTriggerKeyDown(event, index)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-150 ${
                    open
                      ? "bg-white/[0.1] text-text"
                      : "text-muted hover:bg-white/[0.07] hover:text-text"
                  }`}
                >
                  {group.label}
                  <Chevron open={open} />
                </button>
              );
            })}

            <a
              href="/pricing"
              onClick={closeAll}
              className="rounded-lg px-3.5 py-2 text-[15px] font-medium tracking-[-0.01em] text-muted no-underline transition-colors duration-150 hover:bg-white/[0.07] hover:text-text"
            >
              Pricing
            </a>
            {EXTRA_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...externalProps(link.external)}
                onClick={closeAll}
                className="rounded-lg px-3.5 py-2 text-[15px] font-medium tracking-[-0.01em] text-muted no-underline transition-colors duration-150 hover:bg-white/[0.07] hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.78] bg-[#F5F5F6] px-4 text-[15px] font-bold tracking-[-0.02em] text-[#111315] no-underline shadow-[inset_0_-2px_0_rgba(255,112,73,0.45)] transition-colors duration-200 hover:bg-white min-[900px]:inline-flex"
          >
            Start building
            <Icon name="arrowRight" size={15} />
          </a>

          <button
            type="button"
            className="inline-grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-text transition-colors hover:bg-white/[0.08] min-[900px]:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMobile}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={19} />
          </button>
        </nav>

        <DesktopPanel
          group={activeGroup}
          activeId={activeId}
          onNavigate={closeAll}
        />

        {mobileOpen ? (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-[calc(100%+8px)] z-40 max-h-[calc(100svh-84px)] overflow-y-auto overscroll-contain rounded-[24px] border border-white/[0.12] bg-[#111112]/98 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl min-[900px]:hidden"
          >
            <nav aria-label="Mobile navigation">
              {NAV_GROUPS.map((group) => {
                const open = mobileGroup === group.id;

                return (
                  <div
                    key={group.id}
                    className="border-b border-white/[0.07] last:border-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileGroup((current) =>
                          current === group.id ? null : group.id,
                        )
                      }
                      aria-expanded={open}
                      aria-controls={`mobile-group-${group.id}`}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 py-3.5 text-left"
                    >
                      <span className="text-[15.5px] font-semibold tracking-[-0.02em] text-text">
                        {group.label}
                      </span>
                      <Chevron open={open} />
                    </button>

                    {open ? (
                      <div
                        id={`mobile-group-${group.id}`}
                        className="space-y-0.5 pb-3 min-[640px]:grid min-[640px]:grid-cols-2 min-[640px]:gap-1 min-[640px]:space-y-0"
                      >
                        {group.columns.flatMap((column) =>
                          column.links.map((link) => (
                            <NavLinkRow
                              key={link.label}
                              link={link}
                              onNavigate={closeAll}
                            />
                          )),
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              <a
                href="/pricing"
                onClick={closeAll}
                className="flex items-center justify-between border-b border-white/[0.07] py-3.5 text-[15.5px] font-semibold tracking-[-0.02em] text-text no-underline"
              >
                Pricing
                <ArrowIcon />
              </a>

              {EXTRA_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...externalProps(link.external)}
                  onClick={closeAll}
                  className="flex items-center justify-between border-b border-white/[0.07] py-3.5 text-[15.5px] font-semibold tracking-[-0.02em] text-text no-underline"
                >
                  {link.label}
                  <ArrowIcon />
                </a>
              ))}

              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeAll}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.78] bg-[#F5F5F6] text-[15px] font-bold tracking-[-0.02em] text-[#111315] no-underline shadow-[inset_0_-2px_0_rgba(255,112,73,0.45)]"
              >
                Start building
                <Icon name="arrowRight" size={15} />
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
