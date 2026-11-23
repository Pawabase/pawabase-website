import { LegalShell } from "@/components/legal/LegalLayout";

export default function RefundPage() {
  return (
    <LegalShell
      title="Refund Policy"
      description="How refunds work for Pawabase plans and the credits you buy: monthly plans through Paystack, and unused credits."
      lastUpdated="November 23, 2026"
      activeHref="/legal/refund"
    >
      <section>
        <h2>1. General Policy</h2>
        <p>
          At Pawabase, we want you to be satisfied with our services. This Refund Policy outlines the circumstances under which we may issue refunds for paid plans and credits.
        </p>
        <p>
          All fees are charged in accordance with our pricing as displayed at the time of purchase.
        </p>
      </section>

      <section>
        <h2>2. Plans</h2>
        <p>
          Paid plans are billed monthly in Nigerian naira through Paystack, and renew each month until you move to the Free plan. We do not
          offer refunds for partial months. When you move to Free, your plan stays until the end of the month you paid for.
        </p>
        <p>
          The compute credit that comes with a plan is part of that plan. Credit left unused at the end of a month is not refunded or paid
          out.
        </p>
      </section>

      <section>
        <h2>3. Credits You Buy</h2>
        <p>
          Credits you buy are added to your organization and do not expire. Credits that have not been used may be refunded on a
          case-by-case basis within 14 days of purchase, subject to our review. Credits already used for servers, storage or usage are not
          refundable.
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
          <li>The organization, and the payment reference from Paystack</li>
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
