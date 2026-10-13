import { github } from "../config";
import { Brand } from "./Nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Brand />
            <p className="footer-note">An end-to-end application development platform: identity, data, files, functions, workflows and realtime, designed to work together. Self-host it, or use Pawabase Cloud.</p>
          </div>
          <div>
            <h2>Project</h2>
            <ul>
              <li>
                <a href={github}>GitHub</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Pawabase</span>
          <span>Source and documentation are public on GitHub.</span>
        </div>
      </div>
    </footer>
  );
}
