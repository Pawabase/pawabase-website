import { LegalShell } from "@/components/legal/LegalLayout";

export default function AcceptableUsePage() {
  return (
    <LegalShell
      title="Acceptable Use Policy"
      description="Guidelines for appropriate and safe use of Pawabase's services and platform."
      lastUpdated="October 24, 2025"
      activeHref="/legal/acceptable-use"
    >
      <section>
        <h2>1. Purpose</h2>
        <p>
          This Acceptable Use Policy ("AUP") outlines the rules and guidelines for using Pawabase's services. By using our Services, you agree to comply with this policy. Violations may result in suspension or termination of your account.
        </p>
      </section>

      <section>
        <h2>2. Prohibited Activities</h2>
        <p>You may not use our Services to:</p>
        <ul>
          <li><strong>Illegal activities:</strong> Engage in any activity that violates local, national, or international laws or regulations</li>
          <li><strong>Harmful content:</strong> Transmit or store content that is abusive, harassing, defamatory, hateful, or threatening</li>
          <li><strong>Malware and exploits:</strong> Distribute viruses, malware, ransomware, or engage in hacking, phishing, or other malicious activities</li>
          <li><strong>Spam:</strong> Send unsolicited emails, messages, or bulk communications</li>
          <li><strong>Intellectual property violations:</strong> Infringe on copyrights, trademarks, patents, or other intellectual property rights</li>
          <li><strong>Privacy violations:</strong> Collect or process personal data without proper consent or legal basis</li>
          <li><strong>Fraud:</strong> Engage in fraudulent activities, identity theft, or financial scams</li>
          <li><strong>Abuse of resources:</strong> Excessively consume system resources in a way that impacts other users</li>
        </ul>
      </section>

      <section>
        <h2>3. Security Requirements</h2>
        <p>You must:</p>
        <ul>
          <li>Keep your account credentials secure and not share them with others</li>
          <li>Implement appropriate security measures for your applications and data</li>
          <li>Not attempt to bypass security features or access controls</li>
          <li>Not probe, scan, or test the vulnerability of our systems without written permission</li>
          <li>Report any security vulnerabilities you discover to <a href="mailto:hello@pawabase.com">hello@pawabase.com</a></li>
        </ul>
      </section>

      <section>
        <h2>4. Content Guidelines</h2>
        <p>
          While we respect freedom of expression, content that is illegal, harmful, or violates the rights of others is not permitted. We reserve the right to remove content that violates this policy.
        </p>
      </section>

      <section>
        <h2>5. API Usage</h2>
        <p>
          If you use our APIs, you must comply with any rate limits, usage guidelines, and documentation provided. Excessive or abusive API usage may result in throttling or suspension.
        </p>
      </section>

      <section>
        <h2>6. Reporting Violations</h2>
        <p>
          If you become aware of any violation of this AUP, please report it to us immediately at <a href="mailto:hello@pawabase.com">hello@pawabase.com</a>. Include as much detail as possible about the violation.
        </p>
      </section>

      <section>
        <h2>7. Enforcement</h2>
        <p>
          We may investigate any suspected violations of this policy. Depending on the severity, we may:
        </p>
        <ul>
          <li>Issue a warning and request corrective action</li>
          <li>Suspend access to the Services temporarily</li>
          <li>Terminate your account and access permanently</li>
          <li>Report illegal activities to law enforcement authorities</li>
        </ul>
        <p>
          We reserve the right to take enforcement action at our sole discretion.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Acceptable Use Policy from time to time. We will notify users of material changes by posting the updated policy with a new "Last updated" date. Your continued use of the Services after such changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>If you have any questions about this Acceptable Use Policy, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:hello@pawabase.com">hello@pawabase.com</a></li>
          <li><strong>Website:</strong> <a href="https://pawabase.com">https://pawabase.com</a></li>
        </ul>
      </section>
    </LegalShell>
  );
}
