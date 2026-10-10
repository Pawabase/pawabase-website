import { Code } from "../components/Code";
import { Next } from "../components/Next";
import { PageHead } from "../components/PageHead";
import { docs } from "../config";

const UPLOAD = `
curl -X POST "$GW/storage/v1/documents/reports/q3-2026.pdf" \\
  -H "apikey: $PK" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/pdf" \\
  --data-binary @q3-2026.pdf
`;

const settings = [
  ["name", "Lowercase letters, digits and hyphens. Unique in the environment."],
  ["read_policy", "Who may download. Authenticated by default."],
  ["write_policy", "Who may upload. Authenticated by default."],
  ["max_size", "Largest object in bytes. Unlimited when omitted."],
  ["allowed_types", "Accepted MIME types. Everything when omitted."],
];

export default function Storage() {
  return (
    <>
      <PageHead
        title="Storage"
        lede="Files live in buckets. Each bucket has a policy for who reads and who writes."
        figure="bucket"
        figureLabel="Three crates of different sizes on a plate and a dashed footprint for one that does not exist yet. The crate under the pointer lifts."
        primary={{ href: docs("storage/overview"), label: "Read about Storage" }}
        secondary={{ href: docs("storage/buckets"), label: "Buckets" }}
      />

      <section className="section" aria-labelledby="buckets">
      <i className="fx dots patch tr" aria-hidden="true" />
        <div className="wrap">
          <h2 id="buckets" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            A bucket is a container with rules.
          </h2>
          <div className="sheet">
            <table className="spec">
              <tbody>
                {settings.map(([a, b]) => (
                  <tr key={a}><td><code>{a}</code></td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section ink" aria-labelledby="path">
      <i className="fx iso big br" aria-hidden="true" />
        <div className="wrap split">
          <div className="c5 stack" style={{ ["--gap" as string]: "16px" }}>
            <h2 id="path" className="h1">
              Checked before it reaches the disk.
            </h2>
            <p className="lede">The gateway resolves the key, checks who is calling, evaluates the bucket policy, then forwards to the driver.</p>
            <p className="small">A secret key bypasses the policy. Keep it on a server.</p>
          </div>
          <div className="c7">
            <Code lang="bash" caption="An upload with a publishable key and a user token." source="pawabase-docs, Storage › Uploads">
              {UPLOAD}
            </Code>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="where">
      <i className="fx ticks strip-h tl" aria-hidden="true" />
        <div className="wrap two">
          <div className="sheet blurb">
            <h2 id="where" className="h2">Where files go.</h2>
            <p className="body">One driver per environment: local disk, or any S3-compatible service such as AWS S3, MinIO, Tigris, Cloudflare R2 or DigitalOcean Spaces.</p>
          </div>
          <div className="sheet blurb">
            <h2 className="h2">Not included.</h2>
            <p className="body">No Google Cloud Storage or Azure Blob driver. No multipart uploads. No per-bucket driver.</p>
          </div>
        </div>
      </section>
      <Next current="storage" docsHref={docs("storage/overview")} docsLabel="Storage" />
    </>
  );
}
