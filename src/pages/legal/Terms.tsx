import { LegalShell } from "@/components/legal/LegalLayout";

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      description="The terms and conditions governing your use of Pawabase's website, products, and services."
      lastUpdated="October 24, 2025"
      activeHref="/legal/terms"
    >
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Pawabase's website, products, or services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services.
        </p>
        <p>
          These Terms apply to all visitors, users, and others who access or use the Services.
        </p>
      </section>

      <section>
        <h2>2. Description of Services</h2>
        <p>
          Pawabase provides a complete backend platform that includes database, authentication, storage, workflows, and related infrastructure services. We may update, modify, or discontinue any part of our Services at any time with or without notice.
        </p>
      </section>

      <section>
        <h2>3. User Accounts</h2>
        <p>When you create an account with us, you must:</p>
        <ul>
          <li>Provide accurate, complete, and current information</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security of your password and account</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms or are inactive for extended periods.
        </p>
      </section>

      <section>
        <h2>4. Acceptable Use</h2>
        <p>You agree not to use the Services to:</p>
        <ul>
          <li>Violate any applicable laws, regulations, or third-party rights</li>
          <li>Transmit harmful, offensive, or illegal content</li>
          <li>Interfere with or disrupt the integrity or performance of the Services</li>
          <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
          <li>Use the Services for spam, phishing, or malicious purposes</li>
          <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
          <li>Resell or redistribute the Services without our express written permission</li>
        </ul>
        <p>See our <a href="/legal/acceptable-use">Acceptable Use Policy</a> for more details.</p>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          The Services and their original content, features, and functionality are owned by Pawabase and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        <p>
          Nothing in these Terms grants you a right to use our trademarks, logos, or other brand features without our prior written consent.
        </p>
      </section>

      <section>
        <h2>6. Your Content</h2>
        <p>
          You retain all rights to any content you submit, post, or display on or through the Services ("Your Content"). By using the Services, you grant us a limited license to use, store, and process Your Content solely to provide and improve the Services.
        </p>
        <p>
          You are solely responsible for Your Content and the consequences of posting or publishing it. You represent and warrant that you have all necessary rights to Your Content and that it does not violate any third-party rights or applicable laws.
        </p>
      </section>

      <section>
        <h2>7. Payment and Subscriptions</h2>
        <p>
          Some aspects of the Services may be provided for a fee. You agree to pay all applicable fees as described on our pricing page. All payments are non-refundable except as required by law or as specified in our <a href="/legal/refund">Refund Policy</a>.
        </p>
        <p>
          We reserve the right to change our pricing at any time. Price changes will not affect existing subscriptions until renewal.
        </p>
      </section>

      <section>
        <h2>8. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </section>

      <section>
        <h2>9. Disclaimers</h2>
        <p>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
        </p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL PAWABASE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
        </p>
      </section>

      <section>
        <h2>11. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Pawabase and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your use of the Services or violation of these Terms.
        </p>
      </section>

      <section>
        <h2>12. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Pawabase is incorporated, without regard to its conflict of law provisions.
        </p>
      </section>

      <section>
        <h2>13. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        <p>
          By continuing to access or use our Services after revisions become effective, you agree to be bound by the revised terms.
        </p>
      </section>

      <section>
        <h2>14. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:hello@pawabase.com">hello@pawabase.com</a></li>
          <li><strong>Website:</strong> <a href="https://pawabase.com">https://pawabase.com</a></li>
        </ul>
      </section>
    </LegalShell>
  );
}
