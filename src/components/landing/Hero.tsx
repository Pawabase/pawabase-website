import { Icon } from "@/components/Icon";

const TILES = [
  { name: "database", x: -480, y: 11 },
  { name: "users", x: -640, y: 91 },
  { name: "storage", x: -560, y: 251 },
  { name: "realtime", x: 400, y: 11 },
  { name: "mail", x: 560, y: 91 },
  { name: "automation", x: 480, y: 251 },
] as const;

const DOTS = [
  { x: -240, y: 91, tone: "bg-brand" },
  { x: 240, y: 171, tone: "bg-brand" },
  { x: 400, y: 331, tone: "bg-white/25" },
] as const;

const PILL =
  "inline-flex h-[50px] items-center justify-center gap-2 px-[25px] text-[14px] no-underline";

export function Hero() {
  return (
    <section
      id="platform"
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-clip bg-shell px-5 pb-[clamp(40px,4vw,56px)] pt-[clamp(40px,5vw,73px)] min-[768px]:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 hidden h-[420px] w-[1440px] -translate-x-1/2 min-[900px]:block [mask-image:radial-gradient(ellipse_55%_80%_at_50%_45%,black_30%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_55%_80%_at_50%_45%,black_30%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,243,238,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.045) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: "0 11px",
        }}
      >
        {TILES.map((tile) => (
          <span
            key={tile.name}
            className="absolute flex size-20 items-center justify-center bg-white/[0.045] text-white/30"
            style={{ left: `calc(50% + ${tile.x}px)`, top: tile.y }}
          >
            <Icon name={tile.name} size={30} variant="TwoTone" />
          </span>
        ))}
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className={`absolute size-2 rounded-full ${dot.tone}`}
            style={{ left: `calc(50% + ${dot.x}px)`, top: dot.y }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <p className="m-0 inline-flex h-10 items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
          <span aria-hidden="true">✦</span>
          Backend for any app
          <span aria-hidden="true">✦</span>
        </p>

        <h1
          id="hero-title"
          className="m-0 mt-8 text-[clamp(38px,5.3vw,76px)] font-medium leading-[1.1] tracking-[-0.03em] text-text"
        >
          Your data, auth and storage
          <span className="block">in one reliable backend</span>
        </h1>

        <p className="m-0 mt-7 max-w-[560px] text-[clamp(15px,1.25vw,18px)] leading-[1.7] text-muted">
          The easiest way to run a database, sign-in, files, realtime and email for your app,
          without managing a single server.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href="https://app.pawabase.com"
            className={`${PILL} btn-clay`}
          >
            Get started
          </a>
          <a href="#features" className={`${PILL} btn-clay-dark`}>
            Explore features
            <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
