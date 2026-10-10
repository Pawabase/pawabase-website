import { Link } from "@tanstack/react-router";
import { developerLinks, docs, github, products } from "../config";
import { Brand } from "./Nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Brand />
            <p className="footer-note">An application development platform: identity, data, files, logic and automation in one runtime. Managed, or on your own servers.</p>
          </div>
          <div>
            <h2>Products</h2>
            <ul>
              {products.map((p) => (
                <li key={p.key}>
                  <Link to={p.path}>Pawabase {p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Developers</h2>
            <ul>
              {developerLinks.map((l) => (
                <li key={l.name}>
                  <a href={l.href}>{l.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Project</h2>
            <ul>
              <li>
                <a href={github}>GitHub</a>
              </li>
              <li>
                <a href={docs("reference/changelog")}>Changelog</a>
              </li>
              <li>
                <a href={docs("compare/overview")}>Compared with the alternatives</a>
              </li>
              <li>
                <a href={docs("compare/when-not-to-use-pawabase")}>When not to use Pawabase</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Pawabase</span>
          <span>Documentation and source are public on GitHub.</span>
        </div>
      </div>
    </footer>
  );
}
