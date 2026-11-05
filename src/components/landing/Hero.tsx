import { Icon } from "@/components/Icon";
import { SIGN_UP } from "@/lib/links";

/* The Orange Planet mark rises from the panel's lower edge like a sun, drawn in the panel's own dot matrix
   (its shapes are CSS masks in styles.css, so the lit dots sit exactly on the panel's grid). */

export function Hero() {
  return (
    <section id="platform" aria-labelledby="hero-title" className="hero-sun relative w-full px-2 pb-2 min-[768px]:px-3">
      <div className="hero-sun-panel relative isolate overflow-hidden">
        {/* the panel's dot matrix, and the light rising through it */}
        <div className="hero-sun-matrix" aria-hidden="true" />
        <div className="hero-sun-light" aria-hidden="true" />

        {/* the planet, rising: the same LED grid, lit in sunlight inside the mark's upper shape and in ivory inside its crescent */}
        <div className="hero-sun-planet upper" aria-hidden="true" />
        <div className="hero-sun-planet lower" aria-hidden="true" />

        <div className="hero-sun-copy relative mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <h1 id="hero-title" className="m-0 text-[clamp(40px,5.6vw,80px)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
            Data, auth, agents and APIs.
            <span className="block">One system, every team.</span>
          </h1>
          <p className="m-0 mt-7 max-w-[560px] text-[clamp(15px,1.25vw,18px)] leading-[1.65] text-white/85">
            Build it once in Pawabase. Your apps, your team and your AI all work from it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={SIGN_UP} className="hero-sun-cta">Get started</a>
            <a href="#features" className="hero-sun-link">
              See how it works
              <Icon name="arrowRight" size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
