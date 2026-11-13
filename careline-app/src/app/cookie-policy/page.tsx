import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/app/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | CareLine Medical Reception",
  description:
    "Learn how CareLine uses browser storage and cookies, and how you can manage your browser preferences.",
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <p>
        This Cookie Policy explains how cookies and similar browser technologies may be used when you visit the
        CareLine website. Visitors should understand how information may be stored on their devices and how to manage
        browser preferences.
      </p>
    ),
  },
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    content: (
      <>
        <p>
          Cookies are small text files stored in your browser or on your device when you visit a website. Depending
          on how a site is built, they may help it remember preferences, support basic functionality, understand page
          use, or provide security and performance features. Related browser technologies can include session storage
          and local storage.
        </p>
      </>
    ),
  },
  {
    id: "browser-storage-use",
    title: "How CareLine Uses Browser Storage",
    content: (
      <p>
        The current CareLine contact form uses browser session storage to temporarily preserve form drafts. This
        helps restore information if you refresh the page or navigate away during an unfinished inquiry. The draft is
        removed after successful form submission. Session storage is generally associated with a browser tab’s
        session and differs from a persistent cookie; it is not automatically sent to the server with each request.
      </p>
    ),
  },
  {
    id: "technology-categories",
    title: "Types of Cookies and Technologies",
    content: (
      <>
        <p>The categories below describe common technology types, not confirmation that each is used by CareLine:</p>
        <ul>
          <li>
            <strong>Essential technologies:</strong> May support basic operation, security, and functionality. The
            current implementation review identified contact-form session storage; it did not identify specific cookies.
          </li>
          <li>
            <strong>Preference technologies:</strong> May remember visitor choices or settings. Their use has not
            been identified in the current website implementation.
          </li>
          <li>
            <strong>Analytics technologies:</strong> May help understand website traffic and interactions. Their
            use has not been identified in the current website implementation.
          </li>
          <li>
            <strong>Advertising technologies:</strong> May support advertising measurement or personalization. Their
            use has not been identified in the current website implementation.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-technologies",
    title: "Third-Party Technologies",
    content: (
      <p>
        The website uses Gmail SMTP for email delivery after a form is submitted. The source review did not identify
        a browser-based analytics or advertising provider integrated into the website. Third-party websites you visit
        through external links may use their own cookies or similar technologies, depending on their configuration;
        their own privacy notices apply.
      </p>
    ),
  },
  {
    id: "managing-cookies",
    title: "Managing Cookies",
    content: (
      <>
        <p>Your browser settings generally let you:</p>
        <ul>
          <li>View and delete existing cookies.</li>
          <li>Block selected cookies or block all cookies.</li>
          <li>Receive notifications when cookies are stored.</li>
        </ul>
        <p>Disabling technologies necessary for basic operation may affect some website functionality.</p>
      </>
    ),
  },
  {
    id: "browser-storage-management",
    title: "Browser Storage Management",
    content: (
      <p>
        You can clear session storage and other website data through your browser settings. Clearing stored site data
        may remove an unfinished contact-form draft.
      </p>
    ),
  },
  {
    id: "policy-updates",
    title: "Changes to This Cookie Policy",
    content: (
      <p>
        CareLine may update this policy to reflect changes in website functionality, technology, or applicable
        requirements. Updates will be displayed on this page with a revised last-updated date.
      </p>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: (
      <p>
        For questions about cookies or browser storage, please contact CareLine through the website’s
        <a href="/contact"> contact page</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      kicker="Website Transparency"
      title="Cookie Policy"
      description="Learn how cookies and browser storage may be used when you visit the CareLine website, and understand the choices available to you."
      icon="cookie"
      sections={sections}
    />
  );
}