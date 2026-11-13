import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/app/legal/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer | CareLine Medical Reception",
  description:
    "Read important information about CareLine's virtual receptionist services, website content and service responsibilities.",
};

const sections: LegalSection[] = [
  {
    id: "general-information",
    title: "General Information",
    content: (
      <p>
        Information provided on the CareLine website is intended for general informational and business purposes.
        While we aim to maintain accurate and useful information, we do not guarantee that every statement, service
        description, or website detail will always be complete, current, or error-free.
      </p>
    ),
  },
  {
    id: "no-medical-advice",
    title: "No Medical Advice",
    content: (
      <>
        <p>
          CareLine provides administrative and virtual receptionist support. CareLine does not operate as a medical
          clinic, healthcare practitioner, or medical advice provider through this website. Nothing here should be
          interpreted as:
        </p>
        <ul>
          <li>A medical diagnosis or treatment recommendation.</li>
          <li>A prescription.</li>
          <li>A substitute for professional medical consultation.</li>
          <li>An emergency medical service.</li>
        </ul>
        <p>Visitors should contact an appropriately qualified healthcare professional for medical concerns.</p>
      </>
    ),
  },
  {
    id: "virtual-reception-services",
    title: "Nature of Virtual Receptionist Services",
    content: (
      <>
        <p>Our services support administrative communication between healthcare practices and their patients. Examples include:</p>
        <ul>
          <li>Answering incoming calls and taking or forwarding messages.</li>
          <li>Scheduling appointments according to clinic-approved procedures and handling appointment changes.</li>
          <li>Sending reminders and conducting authorized follow-ups.</li>
          <li>Managing overflow and after-hours communications.</li>
        </ul>
        <p>
          CareLine does not independently make clinical decisions or determine medical treatment. Medical questions,
          urgent clinical concerns, and matters outside the receptionist’s authorized responsibilities should be
          directed to appropriate clinic personnel or emergency services according to the clinic’s approved procedures.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantee-of-results",
    title: "No Guarantee of Results",
    content: (
      <>
        <p>Although CareLine aims to provide reliable and professional administrative support, we do not guarantee:</p>
        <ul>
          <li>A specific number of booked appointments, increased patient volume, or increased clinic revenue.</li>
          <li>A particular patient satisfaction score or elimination of missed calls.</li>
          <li>Uninterrupted availability under every circumstance.</li>
        </ul>
        <p>
          Results may depend on clinic procedures, service arrangements, call volume, technology, and other external factors.
        </p>
      </>
    ),
  },
  {
    id: "clinic-responsibilities",
    title: "Clinic Responsibilities",
    content: (
      <>
        <p>Clinics remain responsible for their medical operations and clinical decisions, including:</p>
        <ul>
          <li>Diagnoses, treatment, clinical advice, and patient care decisions.</li>
          <li>Medical record accuracy and clinical escalation procedures.</li>
          <li>Approval of receptionist workflows and authorization and management of system access.</li>
        </ul>
        <p>CareLine’s administrative support does not replace the responsibilities of licensed healthcare professionals.</p>
      </>
    ),
  },
  {
    id: "third-party-technology",
    title: "Third-Party Technology",
    content: (
      <p>
        Our operations may involve third-party communication platforms, email systems, scheduling software, and
        clinic-approved systems. Their availability and functionality may depend on external providers, and CareLine
        cannot guarantee that every third-party platform will operate without interruption.
      </p>
    ),
  },
  {
    id: "privacy-sensitive-information",
    title: "Privacy and Sensitive Information",
    content: (
      <>
        <p className="warningText">
          Please do not submit patient medical records, diagnoses, insurance information, or other sensitive patient
          information through public website contact or discovery forms. These forms are intended for business inquiries.
        </p>
        <p>
          The handling of patient information during contracted services is subject to applicable agreements,
          authorized procedures, and relevant legal requirements.
        </p>
      </>
    ),
  },
  {
    id: "external-links",
    title: "External Links",
    content: (
      <p>
        Our website may reference external resources. Those references are provided for convenience and do not
        necessarily represent an endorsement of those websites, products, or services.
      </p>
    ),
  },
  {
    id: "changes-to-disclaimer",
    title: "Changes to This Disclaimer",
    content: (
      <p>CareLine may update this disclaimer as its website and services evolve. Changes will be published on this page.</p>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <p>
        For clarification regarding this disclaimer or CareLine services, please contact our team through the
        website’s <a href="/contact">contact page</a>.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      kicker="Important Information"
      title="Disclaimer"
      description="Important information about our services, website content and the responsibilities associated with virtual medical reception support."
      icon="information"
      sections={sections}
    />
  );
}