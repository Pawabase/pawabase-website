import { BrandMark } from "./Brand";
import { FooterNavLink } from "./FooterNavLink";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterSocialLink } from "./FooterSocialLink";
import { FOOTER_LINK_GROUPS, FOOTER_SOCIALS } from "./footerLinks";
import { RAIL_GRID } from "./Section";

export function Footer() {
  return (
    <footer
      className="border-t border-line bg-shell"
      aria-label="Pawabase footer"
    >
      <div className={RAIL_GRID}>
        <div className="col-start-2 row-start-1 min-w-0">
          <div className="px-6 pb-[clamp(44px,5vw,72px)] pt-[clamp(56px,6vw,88px)] min-[768px]:px-10 min-[981px]:px-14 min-[1241px]:px-16">

            <div className="grid grid-cols-1 gap-x-10 gap-y-14 min-[768px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[1100px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.55fr)_minmax(0,1.05fr)] min-[1100px]:gap-16">
              <div>
                <a
                  href="/"
                  className="inline-flex items-center gap-2.5 text-text no-underline"
                  aria-label="Pawabase home"
                >
                  <BrandMark size={28} />
                  <span className="text-[22px] font-medium tracking-[-0.045em]">
                    pawabase
                  </span>
                </a>

                <p className="mt-5 max-w-[24ch] text-[16px] font-medium leading-[1.5] tracking-[-0.02em] text-text">
                  The backend behind what's next.
                </p>

                <p className="mt-2 max-w-[32ch] text-[15px] leading-[1.7] tracking-[-0.01em] text-muted">
                  Build ambitious applications without rebuilding the backend.
                </p>
              </div>

              <nav
                aria-label="Footer navigation"
                className="grid grid-cols-2 gap-x-8 gap-y-8 min-[560px]:grid-cols-3 min-[768px]:grid-cols-3"
              >
                {FOOTER_LINK_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/75">
                      {group.title}
                    </h2>

                    <ul className="mt-5 space-y-2.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <FooterNavLink link={link} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="min-[768px]:col-span-2 min-[1100px]:col-span-1">
                <h2 className="text-[18px] font-medium tracking-[-0.02em] text-text">
                  Good things are being built.
                </h2>

                <p className="mt-2.5 max-w-[38ch] text-[15px] leading-[1.7] tracking-[-0.01em] text-muted">
                  Product updates, engineering stories, and ideas worth sharing.
                  Straight to your inbox.
                </p>

                <FooterNewsletter />

                <div className="mt-7">
                  <h2 className="text-[12px] uppercase tracking-[0.14em] text-faint">
                    Follow
                  </h2>

                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    {FOOTER_SOCIALS.map((link) => (
                      <li key={link.label}>
                        <FooterSocialLink link={link} />
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 text-[13px] leading-[1.6] text-faint/75">
                    More channels are being set up.
                  </p>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="mt-[clamp(56px,7vw,96px)] text-center"
            >
              <p className="select-none whitespace-nowrap text-[clamp(56px,14vw,200px)] font-normal leading-[0.8] tracking-[-0.075em] text-brand/20">
                PAWABASE
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
