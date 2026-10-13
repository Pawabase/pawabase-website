import { github } from "../config";
import { Brand } from "./Nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Brand />
            <p className="footer-note">A set of independent backend services (sign-in, data, functions, files, queues and monitoring) that combine on one shared account, one set of rules and one request trail.</p>
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
          <span>In pre-launch. Source is public on GitHub.</span>
        </div>
      </div>
    </footer>
  );
}
