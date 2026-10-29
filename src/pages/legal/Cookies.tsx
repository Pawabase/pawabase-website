import { LegalShell } from "@/components/legal/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalShell
      title="Cookie Policy"
      description="How Pawabase uses cookies and similar tracking technologies on our website."
      lastUpdated="October 24, 2025"
      activeHref="/legal/cookies"
    >
      <section>
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
        </p>
        <p>
          We use cookies and similar technologies like web beacons, pixels, and local storage to help us provide our services, understand how they're used, and improve your experience.
        </p>
      </section>

      <section>
        <h2>2. Types of Cookies We Use</h2>
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.
        </p>
        <ul>
          <li><strong>Authentication cookies:</strong> Help us identify you when you log into your account</li>
          <li><strong>Security cookies:</strong> Help protect against fraud and secure your data</li>
          <li><strong>Session cookies:</strong> Maintain your session as you navigate the site</li>
        </ul>

        <h3>Performance and Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
        </p>
        <ul>
          <li><strong>Usage analytics:</strong> Track page views, traffic sources, and user behavior</li>
          <li><strong>Performance monitoring:</strong> Help us identify and fix technical issues</li>
        </ul>

        <h3>Functionality Cookies</h3>
        <p>
          These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
        </p>
        <ul>
          <li><strong>Preference cookies:</strong> Remember your settings and choices</li>
          <li><strong>Feature cookies:</strong> Enable specific features to work properly</li>
        </ul>
      </section>

      <section>
        <h2>3. Third-Party Cookies</h2>
        <p>
          In some cases, we may use third-party cookies provided by trusted partners. These may include analytics providers or other service providers who help us operate our website and services.
        </p>
        <p>
          We carefully select our partners and ensure they adhere to appropriate privacy and data protection standards.
        </p>
      </section>

      <section>
        <h2>4. How to Control Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings preferences. You can set your browser to refuse cookies or delete certain cookies. However, if you disable or refuse cookies, some parts of our website may not function properly.
        </p>
        <p>Here's how to manage cookies in popular browsers:</p>
        <ul>
          <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
        </ul>
      </section>

      <section>
        <h2>5. Do Not Track</h2>
        <p>
          Some browsers have a "Do Not Track" (DNT) feature that signals to websites that you do not want to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT signals, but we are committed to respecting your privacy choices.
        </p>
      </section>

      <section>
        <h2>6. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We will notify you of any material changes by updating the "Last updated" date at the top of this policy.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>If you have any questions about our use of cookies, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:hello@pawabase.com">hello@pawabase.com</a></li>
          <li><strong>Website:</strong> <a href="https://pawabase.com">https://pawabase.com</a></li>
        </ul>
      </section>
    </LegalShell>
  );
}
