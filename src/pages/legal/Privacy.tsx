import { LegalShell } from "@/components/legal/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      description="How Pawabase collects, uses, and protects your personal information when you use our website, products, and services."
      lastUpdated="October 24, 2025"
      activeHref="/legal/privacy"
    >
      <section>
        <h2>1. Introduction</h2>
        <p>
          Pawabase, Inc. ("Pawabase", "we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at pawabase.com, use our products and services, or otherwise interact with us.
        </p>
        <p>
          By accessing or using our services, you agree to the collection and use of information in accordance with this Privacy Policy.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>Information you provide to us</h3>
        <p>We may collect information you directly provide, including:</p>
        <ul>
          <li><strong>Account information:</strong> Name, email address, password, and other registration details.</li>
          <li><strong>Billing information:</strong> Payment details and billing address when you subscribe to paid services.</li>
          <li><strong>Communications:</strong> Information you provide when you contact us, request support, or participate in surveys.</li>
          <li><strong>Content:</strong> Data, files, or content you upload, store, or process using our services.</li>
        </ul>

        <h3>Information collected automatically</h3>
        <p>When you use our website or services, we automatically collect certain information, including:</p>
        <ul>
          <li><strong>Usage data:</strong> Pages viewed, features used, actions taken, and time spent.</li>
          <li><strong>Device information:</strong> IP address, browser type, operating system, and device identifiers.</li>
          <li><strong>Log data:</strong> Server logs, access times, and referring URLs.</li>
          <li><strong>Cookies and similar technologies:</strong> As described in our Cookie Policy.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain our services</li>
          <li>Process transactions and send related information</li>
          <li>Respond to your comments, questions, and support requests</li>
          <li>Send you technical notices, updates, security alerts, and administrative messages</li>
          <li>Improve, personalize, and expand our services</li>
          <li>Monitor and analyze usage and trends to improve user experience</li>
          <li>Detect, prevent, and address technical issues, fraud, or security risks</li>
          <li>Comply with legal obligations and enforce our terms</li>
        </ul>
      </section>

      <section>
        <h2>4. How We Share Your Information</h2>
        <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
        <ul>
          <li><strong>Service providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, cloud hosting, analytics).</li>
          <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          <li><strong>Legal requirements:</strong> When required by law, court order, or government request.</li>
          <li><strong>Protection of rights:</strong> To protect the rights, property, or safety of Pawabase, our users, or others.</li>
          <li><strong>With your consent:</strong> When you have given us explicit permission to share your information.</li>
        </ul>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>6. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
        </p>
      </section>

      <section>
        <h2>7. Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information.</li>
          <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format.</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications or object to certain processing.</li>
        </ul>
        <p>To exercise these rights, please contact us at <a href="mailto:hello@pawabase.com">hello@pawabase.com</a>.</p>
      </section>

      <section>
        <h2>8. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
        </p>
      </section>

      <section>
        <h2>9. Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:hello@pawabase.com">hello@pawabase.com</a></li>
          <li><strong>Website:</strong> <a href="https://pawabase.com">https://pawabase.com</a></li>
        </ul>
      </section>
    </LegalShell>
  );
}
