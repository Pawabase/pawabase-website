import { LegalShell } from "@/components/legal/LegalLayout";

export default function DpaPage() {
  return (
    <LegalShell
      title="Data Processing Addendum (DPA)"
      description="Terms governing the processing of personal data in accordance with applicable data protection laws, including GDPR."
      lastUpdated="October 24, 2025"
      activeHref="/legal/dpa"
    >
      <section>
        <h2>1. Purpose and Scope</h2>
        <p>
          This Data Processing Addendum ("DPA") forms part of the Terms of Service between Pawabase, Inc. ("Pawabase", "Processor") and the customer ("Controller") for the provision of Pawabase services. This DPA applies to the Processing of Personal Data by Pawabase on behalf of the Controller in the course of providing the Services.
        </p>
      </section>

      <section>
        <h2>2. Definitions</h2>
        <p>For the purposes of this DPA:</p>
        <ul>
          <li><strong>GDPR:</strong> The General Data Protection Regulation (EU) 2016/679</li>
          <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person</li>
          <li><strong>Processing:</strong> Any operation performed on Personal Data</li>
          <li><strong>Data Subject:</strong> The individual to whom Personal Data relates</li>
          <li><strong>Sub-processor:</strong> Any third party engaged by Pawabase to process Personal Data</li>
        </ul>
      </section>

      <section>
        <h2>3. Processing Details</h2>
        <p>
          Pawabase will process Personal Data only in accordance with the Controller's documented instructions and for the purposes of providing the Services as described in the Terms of Service. The subject matter, duration, nature, purpose, and categories of Personal Data and Data Subjects are as agreed in the Terms of Service.
        </p>
      </section>

      <section>
        <h2>4. Pawabase Obligations as Processor</h2>
        <p>Pawabase shall:</p>
        <ul>
          <li>Process Personal Data only on documented instructions from the Controller</li>
          <li>Ensure persons authorized to process Personal Data are bound by confidentiality obligations</li>
          <li>Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk</li>
          <li>Not engage another processor without prior written authorization from the Controller</li>
          <li>Assist the Controller in responding to Data Subject requests</li>
          <li>Assist the Controller in ensuring compliance with security, breach notification, and impact assessment obligations</li>
          <li>Delete or return all Personal Data to the Controller at the end of the Services, unless required by law to retain it</li>
          <li>Make available to the Controller all information necessary to demonstrate compliance with this DPA</li>
        </ul>
      </section>

      <section>
        <h2>5. Sub-processors</h2>
        <p>
          The Controller authorizes Pawabase to engage sub-processors to process Personal Data. Pawabase maintains a list of current sub-processors and will notify the Controller of any intended changes, giving the Controller the opportunity to object. If the Controller reasonably objects, the parties will work together in good faith to find a solution.
        </p>
      </section>

      <section>
        <h2>6. Data Subject Rights</h2>
        <p>
          Taking into account the nature of Processing, Pawabase shall assist the Controller by appropriate technical and organizational measures, insofar as possible, for the fulfillment of the Controller's obligation to respond to requests for exercising the Data Subject's rights under the GDPR.
        </p>
      </section>

      <section>
        <h2>7. Personal Data Breach</h2>
        <p>
          Pawabase shall notify the Controller without undue delay after becoming aware of a Personal Data breach affecting Personal Data processed by Pawabase on behalf of the Controller. The notification shall include information to allow the Controller to meet its breach notification obligations.
        </p>
      </section>

      <section>
        <h2>8. Cross-Border Transfers</h2>
        <p>
          If Personal Data is transferred outside the European Economic Area, Pawabase shall ensure such transfers are conducted in compliance with applicable data protection laws, including by using appropriate transfer mechanisms such as Standard Contractual Clauses where required.
        </p>
      </section>

      <section>
        <h2>9. Audit Rights</h2>
        <p>
          The Controller may conduct audits or inspections of Pawabase's data processing activities to verify compliance with this DPA, at its own expense and with reasonable notice. Pawabase shall cooperate with such audits and provide reasonable assistance.
        </p>
      </section>

      <section>
        <h2>10. Liability</h2>
        <p>
          Each party's liability under this DPA shall be subject to the limitations of liability set forth in the Terms of Service, except where such limitations are not permitted by applicable law.
        </p>
      </section>

      <section>
        <h2>11. Term and Termination</h2>
        <p>
          This DPA shall remain in effect for as long as Pawabase processes Personal Data on behalf of the Controller. Upon termination of the Services, Pawabase shall comply with its obligations regarding deletion or return of Personal Data as set forth in Section 4.
        </p>
      </section>

      <section>
        <h2>12. Contact Us</h2>
        <p>For questions about this DPA, please contact us at <a href="mailto:hello@pawabase.com">hello@pawabase.com</a>.</p>
      </section>
    </LegalShell>
  );
}
