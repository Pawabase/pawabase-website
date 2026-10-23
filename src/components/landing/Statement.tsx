export function Statement() {
  return (
    <section className="border-t border-line bg-shell">
      <div className="grid grid-cols-[14px_minmax(0,1fr)_14px] min-[768px]:grid-cols-[42px_minmax(0,1fr)_42px] min-[1241px]:grid-cols-[minmax(86px,9.25%)_minmax(0,1fr)_minmax(86px,9.25%)]">
        <div className="col-start-1 row-start-1 border-r border-line" aria-hidden="true" />
        <div className="col-start-2 row-start-1 px-6 py-[clamp(64px,8.5vw,116px)] min-[768px]:px-10 min-[981px]:px-14 min-[1241px]:px-16">
          <div className="mx-auto max-w-[1000px]">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-faint">One platform</p>
            <p className="mt-6 text-[clamp(26px,3.9vw,54px)] font-semibold leading-[1.14] tracking-[-0.045em] text-text">
              One platform for your entire backend infrastructure.
              <span className="mt-2 block text-muted">
                Everything you need to build, ship, and scale.
              </span>
            </p>
          </div>
        </div>
        <div className="col-start-3 row-start-1 border-l border-line" aria-hidden="true" />
      </div>
    </section>
  );
}
