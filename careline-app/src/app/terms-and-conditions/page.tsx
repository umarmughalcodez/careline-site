import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/app/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | CareLine Medical Reception",
  description:
    "Review the terms governing your use of the CareLine website and information about our virtual medical receptionist services.",
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>Welcome to CareLine Medical Reception.</p>
        <p>
          These Terms &amp; Conditions govern your access to and use of the CareLine website and its publicly
          available information. By accessing or using this website, you acknowledge that you have read and
          understood these terms. If you do not agree with them, please discontinue use of the website.
        </p>
      </>
    ),
  },
  {
    id: "about-careline",
    title: "About CareLine",
    content: (
      <>
        <p>
          CareLine provides virtual medical receptionist services designed to help healthcare practices manage
          patient communications and administrative workflows. Services may include:
        </p>
        <ul>
          <li>Incoming and outgoing calls.</li>
          <li>Appointment scheduling, changes, and cancellations.</li>
          <li>Appointment reminders and patient follow-ups.</li>
          <li>Overflow and after-hours call handling.</li>
        </ul>
        <p>
          Specific services, responsibilities, pricing, and service arrangements are subject to separate agreements
          between CareLine and its clients.
        </p>
      </>
    ),
  },
  {
    id: "website-use",
    title: "Website Use",
    content: (
      <>
        <p>You agree to use this website only for lawful and legitimate purposes. You must not:</p>
        <ul>
          <li>Use the website for fraudulent or misleading activities.</li>
          <li>Attempt unauthorized access to website systems or interfere with website functionality.</li>
          <li>Introduce malicious code or other harmful material.</li>
          <li>Use website forms to transmit spam or misuse website content or contact information.</li>
        </ul>
        <p>CareLine may restrict access where misuse is identified.</p>
      </>
    ),
  },
  {
    id: "no-medical-advice",
    title: "No Medical Advice",
    content: (
      <p>
        CareLine is a virtual administrative and receptionist service provider. The website does not provide medical
        diagnoses, treatment recommendations, prescriptions, or professional medical advice. Information on this
        website should not replace consultation with a qualified healthcare professional.
      </p>
    ),
  },
  {
    id: "service-information",
    title: "Service Information",
    content: (
      <p>
        We aim to keep information about our services accurate and up to date. Website descriptions are general
        information and do not guarantee that every service, feature, schedule, or coverage arrangement will be
        available to every clinic. Actual services depend on agreed requirements and applicable service agreements.
      </p>
    ),
  },
  {
    id: "client-responsibilities",
    title: "Client Responsibilities",
    content: (
      <>
        <p>Clinics engaging CareLine are responsible for:</p>
        <ul>
          <li>Providing accurate business and operational information.</li>
          <li>Defining the receptionist’s authorized responsibilities.</li>
          <li>Approving scheduling and communication procedures.</li>
          <li>Providing appropriate system access where necessary and maintaining control over their clinical systems.</li>
          <li>Providing accurate instructions for appointment handling and escalation.</li>
        </ul>
        <p>
          Clients must ensure that their instructions and arrangements are appropriate for their operations and
          legal obligations.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <p>
        Unless otherwise stated, website content, branding, text, graphics, design elements, and other materials are
        owned by CareLine or used with permission. You may not reproduce, redistribute, modify, or commercially
        exploit website content without appropriate authorization.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services and Links",
    content: (
      <p>
        The website may contain links to third-party websites or services. CareLine does not control the availability,
        content, security, or privacy practices of external websites. Your use of third-party services is subject to
        their respective terms and policies.
      </p>
    ),
  },
  {
    id: "website-availability",
    title: "Website Availability",
    content: (
      <p>
        We aim to keep the website accessible and functional, but we do not guarantee uninterrupted availability or
        error-free operation. Maintenance, technical issues, hosting problems, and circumstances outside our control
        may temporarily affect availability.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <p>
        To the extent permitted by applicable law, CareLine shall not be responsible for indirect, incidental, or
        consequential losses arising from use of this website or reliance on its general information. Nothing in
        these terms excludes liability that cannot legally be excluded. Any limitations relating to contracted
        receptionist services must be governed by the relevant client service agreement.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    content: (
      <p>
        Your use of the website is also subject to our <Link href="/privacy-policy">Privacy Policy</Link>, which
        explains how information submitted through the website is collected and handled.
      </p>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to These Terms",
    content: (
      <p>
        CareLine may update these Terms &amp; Conditions when necessary. Updated versions will be published on this
        page with a revised last-updated date.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>
        CareLine operates from Pakistan and serves clients in the United States. The applicable governing law and
        jurisdiction for specific client relationships should be determined by the relevant signed service
        agreement and applicable law.
      </p>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: (
      <p>
        For questions about these Terms &amp; Conditions, please contact CareLine through the official contact
        information displayed on our <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      kicker="Terms & Conditions"
      title="Terms & Conditions"
      description="Please review these terms carefully before using the CareLine website or exploring our virtual medical reception services. These terms explain the conditions that apply to your use of our website."
      icon="document"
      sections={sections}
    />
  );
}