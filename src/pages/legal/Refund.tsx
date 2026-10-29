import { LegalShell } from "@/components/legal/LegalLayout";

export default function RefundPage() {
  return (
    <LegalShell
      title="Refund Policy"
      description="Our policy regarding refunds for Pawabase paid services and subscriptions."
      lastUpdated="October 24, 2025"
      activeHref="/legal/refund"
    >
      <section>
        <h2>1. General Policy</h2>
        <p>
          At Pawabase, we want you to be satisfied with our services. This Refund Policy outlines the circumstances under which we may issue refunds for paid subscriptions and services.
        </p>
        <p>
          All fees are charged in accordance with our pricing as displayed at the time of purchase.
        </p>
      </section>

      <section>
        <h2>2. Subscription Refunds</h2>
        <h3>Free Trial</h3>
        <p>
          If we offer a free trial, you will not be charged until the trial period ends. You can cancel your subscription before the trial ends to avoid charges.
        </p>

        <h3>Monthly Subscriptions</h3>
        <p>
          For monthly subscriptions, we do not offer refunds for partial months of service. If you cancel your subscription, you will continue to have access to paid features until the end of your current billing period.
        </p>

        <h3>Annual Subscriptions</h3>
        <p>
          For annual subscriptions, we may offer a prorated refund within the first 30 days of your subscription if you are not satisfied with our services. After 30 days, annual subscriptions are non-refundable.
        </p>
      </section>

      <section>
        <h2>3. One-Time Purchases</h2>
        <p>
          For any one-time purchases (such as credits or add-ons), refunds may be considered on a case-by-case basis within 14 days of purchase, subject to our review.
        </p>
      </section>

      <section>
        <h2>4. Exceptional Circumstances</h2>
        <p>We may issue refunds outside of the above policy in exceptional circumstances, including:</p>
        <ul>
          <li>Service outages that significantly impact your ability to use the Services</li>
          <li>Billing errors or unauthorized charges</li>
          <li>Other situations where we determine a refund is appropriate in fairness</li>
        </ul>
      </section>

      <section>
        <h2>5. How to Request a Refund</h2>
        <p>To request a refund, please contact our support team with the following information:</p>
        <ul>
          <li>Your account email address</li>
          <li>Subscription or transaction details</li>
          <li>Reason for the refund request</li>
          <li>Any relevant documentation or screenshots</li>
        </ul>
        <p>
          Send your refund request to <a href="mailto:hello@pawabase.com">hello@pawabase.com</a>. We will review your request and respond within 3-5 business days.
        </p>
      </section>

      <section>
        <h2>6. Processing of Refunds</h2>
        <p>
          If approved, refunds will be processed to the original payment method used for the purchase. Depending on your bank or payment provider, it may take 5-10 business days for the refund to appear on your statement.
        </p>
      </section>

      <section>
        <h2>7. Changes to This Refund Policy</h2>
        <p>
          We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our Services after changes are posted constitutes your acceptance of the modified policy.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Refund Policy, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:hello@pawabase.com">hello@pawabase.com</a></li>
          <li><strong>Website:</strong> <a href="https://pawabase.com">https://pawabase.com</a></li>
        </ul>
      </section>
    </LegalShell>
  );
}
