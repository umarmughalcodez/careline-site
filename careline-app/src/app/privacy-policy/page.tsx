import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUp, ChevronDown, Mail, ShieldAlert } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicyHero from "./PrivacyPolicyHero";
import styles from "./PrivacyPolicy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | CareLine Medical Reception",
  description:
    "Learn how CareLine handles information submitted through its website, including business inquiries and discovery call requests.",
};

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "information-sharing", label: "Information Sharing" },
  { id: "data-storage-security", label: "Data Storage and Security" },
  { id: "international-processing", label: "International Data Processing" },
  { id: "cookies-browser-storage", label: "Cookies and Browser Storage" },
  { id: "patient-information", label: "Patient Information" },
  { id: "privacy-rights", label: "Your Privacy Rights" },
  { id: "third-party-websites", label: "Third-Party Websites" },
  { id: "policy-updates", label: "Policy Updates" },
  { id: "contact-information", label: "Contact Information" },
] as const;

function PolicyLinks({ className }: { className: string }) {
  return (
    <ol className={className}>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={`#${section.id}`}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {section.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="top" className={styles.page}>
        <PrivacyPolicyHero />

        <div className={styles.policyArea}>
          <div className={styles.policyContainer}>
            <details className={styles.mobileToc}>
              <summary>
                <span>On this page</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <PolicyLinks className={styles.tocLinks} />
            </details>

            <div className={styles.policyLayout}>
              <aside className={styles.sidebar}>
                <nav aria-label="Privacy policy sections" className={styles.desktopToc}>
                  <span className={styles.tocHeading}>On this page</span>
                  <PolicyLinks className={styles.tocLinks} />
                </nav>
              </aside>

              <div className={styles.policyContent}>
                <section id="introduction" className={styles.policyCard} aria-labelledby="introduction-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>01</span>
                    <h2 id="introduction-title">Introduction</h2>
                  </div>
                  <p>
                    CareLine provides virtual medical receptionist support to independent clinics and healthcare
                    practices, including call answering, appointment scheduling, reminders, follow-ups, and agreed
                    overflow or after-hours coverage. This Privacy Policy explains how we handle information when
                    you visit our website or submit a business inquiry or discovery call request.
                  </p>
                  <p>
                    This notice concerns information collected through the public website. It does not describe the
                    separate arrangements that may apply if a clinic engages CareLine for services.
                  </p>
                </section>

                <section id="information-we-collect" className={styles.policyCard} aria-labelledby="information-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>02</span>
                    <h2 id="information-title">Information We Collect</h2>
                  </div>
                  <p>When you choose to contact us or request a discovery call, you may provide:</p>
                  <ul>
                    <li>Your full name, clinic or practice name, work email, and phone number.</li>
                    <li>Your professional role, practice type, and number of providers.</li>
                    <li>Your requested call coverage, scheduling software, preferred contact method, and preferred contact time.</li>
                    <li>Messages, notes, and other details you choose to include.</li>
                    <li>For a discovery call, your selected date and time and your browser time zone.</li>
                  </ul>
                  <p>
                    When a form is submitted, our server may also receive an IP address or a forwarded IP address
                    supplied by the hosting infrastructure. We use this information for basic abuse prevention and
                    request rate limiting.
                  </p>
                </section>

                <section id="how-we-use-information" className={styles.policyCard} aria-labelledby="use-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>03</span>
                    <h2 id="use-title">How We Use Information</h2>
                  </div>
                  <p>We use information submitted through the website to:</p>
                  <ul>
                    <li>Respond to business inquiries and review a practice’s service requirements.</li>
                    <li>Schedule and coordinate discovery calls.</li>
                    <li>Communicate with you about the services or support you requested.</li>
                    <li>Prevent spam, misuse, and excessive automated requests.</li>
                    <li>Operate, maintain, and improve the website and its inquiry process.</li>
                  </ul>
                  <p>We do not describe website inquiry information as being used for advertising in this policy.</p>
                </section>

                <section id="information-sharing" className={styles.policyCard} aria-labelledby="sharing-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>04</span>
                    <h2 id="sharing-title">Information Sharing</h2>
                  </div>
                  <p>
                    We may share submitted information with service providers when needed to operate the website,
                    deliver form submissions, or respond to your inquiry. The current website implementation uses
                    Gmail SMTP for email delivery. Providers may process information in accordance with their own
                    terms and privacy practices.
                  </p>
                  <p>We do not disclose inquiry information to unrelated parties except as described here or where required by law.</p>
                </section>

                <section id="data-storage-security" className={styles.policyCard} aria-labelledby="storage-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>05</span>
                    <h2 id="storage-title">Data Storage and Security</h2>
                  </div>
                  <p>
                    Contact and scheduling submissions are sent to CareLine through its email notification system.
                    The website’s current form handlers do not write these submissions to a website database.
                    Contact-form drafts are temporarily held in your browser’s session storage and are removed after
                    a successful submission.
                  </p>
                  <p>
                    CareLine takes reasonable steps to protect information it handles. No website, email service, or
                    electronic transmission can be guaranteed to be completely secure, so please do not send sensitive
                    information through public forms.
                  </p>
                </section>

                <section id="international-processing" className={styles.policyCard} aria-labelledby="international-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>06</span>
                    <h2 id="international-title">International Data Processing</h2>
                  </div>
                  <p>
                    CareLine operates from Pakistan and serves clinics in the United States. Information submitted
                    through this website may be processed by CareLine personnel in Pakistan and by relevant service
                    providers in other countries, including providers involved in website hosting and email delivery.
                    Privacy laws in those locations may differ from the laws where you live.
                  </p>
                </section>

                <section id="cookies-browser-storage" className={styles.policyCard} aria-labelledby="browser-storage-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>07</span>
                    <h2 id="browser-storage-title">Cookies and Browser Storage</h2>
                  </div>
                  <p>
                    The contact form uses your browser’s session storage to keep a draft of the information you enter
                    so it can be restored if you return during that browser session. The draft is removed after the
                    form is successfully submitted. The discovery call form does not currently save a draft in browser
                    storage.
                  </p>
                  <p>
                    Browser storage is held on your device and can be cleared through your browser settings. This
                    policy describes the form storage currently used by the website and does not make claims about
                    technologies provided by your browser or hosting environment.
                  </p>
                </section>

                <section id="patient-information" className={`${styles.policyCard} ${styles.patientCard}`} aria-labelledby="patient-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>08</span>
                    <h2 id="patient-title">Patient Information</h2>
                  </div>
                  <div className={styles.patientNotice} role="note">
                    <ShieldAlert size={22} aria-hidden="true" />
                    <p>
                      <strong>Please do not submit patient names, medical records, diagnoses, insurance details or other sensitive patient information through our public website forms.</strong>
                    </p>
                  </div>
                  <p>
                    The contact and discovery forms are intended for business inquiries about clinic services, not
                    for transmitting patient medical records or other sensitive health information. Please keep any
                    notes you provide focused on your practice’s general service needs.
                  </p>
                </section>

                <section id="privacy-rights" className={styles.policyCard} aria-labelledby="rights-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>09</span>
                    <h2 id="rights-title">Your Privacy Rights</h2>
                  </div>
                  <p>
                    Depending on your location and applicable law, you may ask us to provide access to, correct, or
                    delete information you submitted through the website. We may need to verify your request and may
                    retain information where permitted or required by law, or where it is reasonably needed to address
                    an ongoing inquiry.
                  </p>
                  <p>To make a request, email us using the contact details below and describe what you would like us to review.</p>
                </section>

                <section id="third-party-websites" className={styles.policyCard} aria-labelledby="third-party-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>10</span>
                    <h2 id="third-party-title">Third-Party Websites</h2>
                  </div>
                  <p>
                    Our website may link to third-party websites or services. Those sites are operated independently
                    and their own privacy policies and practices apply when you visit or use them. We encourage you
                    to review their notices before providing information.
                  </p>
                </section>

                <section id="policy-updates" className={styles.policyCard} aria-labelledby="updates-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>11</span>
                    <h2 id="updates-title">Policy Updates</h2>
                  </div>
                  <p>
                    We may update this Privacy Policy as our website or practices change. When we do, we will revise
                    the last-updated date shown at the top of this page. Please review this page periodically for
                    the latest version.
                  </p>
                </section>

                <section id="contact-information" className={styles.contactCard} aria-labelledby="contact-title">
                  <div className={styles.cardHeading}>
                    <span className={styles.sectionNumber}>12</span>
                    <h2 id="contact-title">Contact Information</h2>
                  </div>
                  <p>For questions or requests about this Privacy Policy or information you submitted, contact CareLine:</p>
                  <a className={styles.contactLink} href="mailto:buycrazeshop@gmail.com">
                    <Mail size={18} aria-hidden="true" />
                    buycrazeshop@gmail.com
                  </a>
                  <p>
                    You can also use our <Link href="/contact">contact page</Link> to reach the team.
                  </p>
                </section>

                <div className={styles.pageEnd}>
                  <span>Last updated November 14, 2026</span>
                  <a href="#top" className={styles.backToTop}>
                    Back to top <ArrowUp size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}