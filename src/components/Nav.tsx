import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { dashboard, developerLinks, docs, products } from "../config";
import { ArrowRight, Chevron, MenuIcon, Moon, ProductIcon, Sun } from "./Icons";

const THEME_KEY = "pawabase.website.theme";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Pawabase home">
      <img className="mark-light" src="/brand/mark.svg" alt="" width="34" height="31" />
      <img className="mark-dark" src="/brand/mark-dark.svg" alt="" width="34" height="31" />
      pawabase
    </Link>
  );
}

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* the choice just does not persist */
    }
  };
  return { dark, toggle };
}

const Column = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <div className="drop-col">
    <h3 className="drop-heading">{heading}</h3>
    {children}
  </div>
);

const RichItem = ({ to, icon, name, line }: { to: string; icon: ReactNode; name: string; line: string }) => (
  <Link to={to} className="drop-rich">
    <i className="drop-icon">{icon}</i>
    <span className="drop-text">
      <b>{name}</b>
      <span>{line}</span>
    </span>
  </Link>
);

const Terminal = () => (
  <div className="drop-term" aria-hidden="true">
    <div className="drop-term-bar"><i /><i /><i /><span>Your first project</span></div>
    <pre>
      <span className="p">$</span> pip install pawabase{"\n"}
      <span className="p">$</span> pawabase init{"\n"}
      <span className="p">$</span> pawabase emulate{"\n"}
      <span className="p">$</span> pawabase deploy{"\n"}
      <span className="ok">✓ live in Lagos</span>
    </pre>
  </div>
);

type MenuKey = "products" | "developers" | null;

export function Nav() {
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const { dark, toggle } = useTheme();
  const root = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenu(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", esc);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const toggleMenu = (key: Exclude<MenuKey, null>) => setMenu((m) => (m === key ? null : key));
  const cta = (
    <a className="btn btn-primary btn-sm" href={docs("quickstart")}>
      Get started
    </a>
  );

  return (
    <header className="nav" ref={root}>
      <i className="nav-rule" aria-hidden="true" />
      <div className="wrap nav-inner">
        <Brand />
        <nav id="site-nav" className={`nav-links ${mobile ? "open" : ""}`} aria-label="Main">
          <button className="nav-link" aria-expanded={menu === "products"} aria-controls="menu-products" onClick={() => toggleMenu("products")}>
            Products <Chevron />
          </button>
          {menu === "products" && (
            <div className="drop" id="menu-products">
              <div className="drop-panel">
                <Column heading="Build">
                  {products.slice(0, 3).map((p) => (
                    <RichItem key={p.key} to={p.path} icon={<ProductIcon name={p.key} />} name={p.name} line={p.line} />
                  ))}
                </Column>
                <Column heading="Run">
                  {products.slice(3).map((p) => (
                    <RichItem key={p.key} to={p.path} icon={<ProductIcon name={p.key} />} name={p.name} line={p.line} />
                  ))}
                </Column>
                <Column heading="Learn">
                  {developerLinks.slice(0, 4).map((l) => (
                    <a key={l.name} href={l.href} className="drop-link">
                      {l.name}
                    </a>
                  ))}
                  <a href={docs("index")} className="drop-more">
                    View all <ArrowRight />
                  </a>
                </Column>
                <Terminal />
              </div>
            </div>
          )}
          <Link className="nav-link" to="/cloud" aria-current={pathname === "/cloud" ? "page" : undefined}>
            Cloud
          </Link>
          <button className="nav-link" aria-expanded={menu === "developers"} aria-controls="menu-developers" onClick={() => toggleMenu("developers")}>
            Developers <Chevron />
          </button>
          {menu === "developers" && (
            <div className="drop" id="menu-developers">
              <div className="drop-panel">
                <Column heading="Documentation">
                  {developerLinks.slice(0, 3).map((l) => (
                    <a key={l.name} href={l.href} className="drop-rich plain">
                      <span className="drop-text">
                        <b>{l.name}</b>
                        <span>{l.line}</span>
                      </span>
                    </a>
                  ))}
                </Column>
                <Column heading="Build with">
                  {developerLinks.slice(3).map((l) => (
                    <a key={l.name} href={l.href} className="drop-rich plain">
                      <span className="drop-text">
                        <b>{l.name}</b>
                        <span>{l.line}</span>
                      </span>
                    </a>
                  ))}
                </Column>
                <Terminal />
              </div>
            </div>
          )}
          <a className="nav-link" href={docs("index")}>
            Docs
          </a>
          <Link className="nav-link" to="/cloud" hash="plans">
            Pricing
          </Link>
          <span className="mobile-cta">{cta}</span>
        </nav>
        <div className="nav-end">
          {dashboard && (
            <a className="nav-link" href={dashboard} style={{ display: "inline-flex" }}>
              Sign in
            </a>
          )}
          <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            {dark ? <Sun /> : <Moon />}
          </button>
          {cta}
          <button className="icon-btn menu-toggle" aria-expanded={mobile} aria-controls="site-nav" aria-label={mobile ? "Close menu" : "Open menu"} onClick={() => setMobile((m) => !m)}>
            <MenuIcon open={mobile} />
          </button>
        </div>
      </div>
    </header>
  );
}
