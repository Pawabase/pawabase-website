import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { github } from "../config";
import { Moon, Sun } from "./Icons";

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

/** Pre-launch: the brand, the theme, and one way to follow the project. Every other destination is off until it exists. */
export function Nav() {
  const { dark, toggle } = useTheme();
  return (
    <header className="nav">
      <i className="nav-rule" aria-hidden="true" />
      <div className="wrap nav-inner">
        <Brand />
        <div className="nav-end" style={{ gridColumn: "-2 / -1", justifySelf: "end" }}>
          <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            {dark ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn-primary btn-sm" href={github}>
            Follow on GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
