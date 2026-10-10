import { useEffect, useRef, useState } from "react";
import { Brand } from "./Primitives";
import { dashboard, docs, github } from "../config";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [dark, setDark] = useState(false);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pawabase.website.theme");
    const next = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }, []);
  useEffect(() => {
    const on = () => setStuck(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const outside = (e: PointerEvent) => { if (!nav.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", esc);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", esc); document.removeEventListener("pointerdown", outside); };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("pawabase.website.theme", next ? "dark" : "light");
  };
  const close = () => setOpen(false);

  return (
    <header ref={nav} className={`site-nav ${stuck || open ? "stuck" : ""}`}>
      <nav className="nav-inner" aria-label="Main navigation">
        <Brand />
        <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <div id="nav-links" className={`nav-links ${open ? "open" : ""}`}>
          <a href="#studio" onClick={close}>Platform</a>
          <a href="#build" onClick={close}>Solutions</a>
          <a href="#developers" onClick={close}>Developers</a>
          <a href="#ownership" onClick={close}>Deploy</a>
          <a href={docs()} onClick={close}>Docs</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
            <span aria-hidden="true">{dark ? "☀" : "◐"}</span>
          </button>
          <a className="btn btn-light" href={dashboard || docs("quickstart")} onClick={close}>
            {dashboard ? "Open Pawabase" : "Start building"}
          </a>
        </div>
      </nav>
    </header>
  );
}

export { github };
