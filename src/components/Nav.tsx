import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { dashboard, developerLinks, docs, products } from "../config";
import { Chevron, MenuIcon, Moon, ProductIcon, Sun } from "./Icons";

const THEME_KEY = "pawabase.website.theme";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Pawabase home">
      <img className="mark-light" src="/brand/mark.svg" alt="" width="30" height="27" />
      <img className="mark-dark" src="/brand/mark-dark.svg" alt="" width="30" height="27" />
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
      <div className="wrap nav-inner">
        <Brand />
        <nav id="site-nav" className={`nav-links ${mobile ? "open" : ""}`} aria-label="Main">
          <button className="nav-link" aria-expanded={menu === "products"} aria-controls="menu-products" onClick={() => toggleMenu("products")}>
            Products <Chevron />
          </button>
          {menu === "products" && (
            <div className="drop" id="menu-products">
              <div className="wrap drop-inner">
                <div className="drop-lead">
                  <h2 className="h4">One platform</h2>
                  <p>Identity, data, files, application logic and automation share one runtime, one policy language and one place to operate them.</p>
                  <Link className="arrow" to="/" style={{ alignSelf: "flex-start" }}>
                    How it fits together
                  </Link>
                </div>
                <div className="drop-grid">
                  {products.map((p) => (
                    <Link key={p.key} to={p.path} className="drop-item">
                      <ProductIcon name={p.key} />
                      <b>Pawabase {p.name}</b>
                      <span>{p.line}</span>
                    </Link>
                  ))}
                </div>
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
              <div className="wrap">
                <div className="drop-simple drop-wrap-narrow">
                  {developerLinks.map((l) => (
                    <a key={l.name} href={l.href} className="drop-item" style={{ gridTemplateColumns: "1fr" }}>
                      <b>{l.name}</b>
                      <span>{l.line}</span>
                    </a>
                  ))}
                </div>
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
