import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPageHero, { type LegalPageIcon } from "./LegalPageHero";
import styles from "./LegalPage.module.css";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  kicker: string;
  title: string;
  description: string;
  icon: LegalPageIcon;
  sections: LegalSection[];
};

export default function LegalPage({ kicker, title, description, icon, sections }: LegalPageProps) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="top" className={styles.page}>
        <LegalPageHero kicker={kicker} title={title} description={description} icon={icon} />

        <div className={styles.contentArea}>
          <div className={styles.container}>
            <details className={styles.mobileContents}>
              <summary>
                <span>On this page</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <ol className={styles.contentsList}>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className={styles.layout}>
              <aside className={styles.sidebar}>
                <nav aria-label={`${title} sections`} className={styles.contentsNav}>
                  <span className={styles.contentsHeading}>On this page</span>
                  <ol className={styles.contentsList}>
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`}>
                          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className={styles.document}>
                {sections.map((section, index) => (
                  <section
                    id={section.id}
                    key={section.id}
                    className={styles.documentSection}
                    aria-labelledby={`${section.id}-heading`}
                  >
                    <div className={styles.sectionHeading}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h2 id={`${section.id}-heading`}>{section.title}</h2>
                    </div>
                    <div className={styles.sectionBody}>{section.content}</div>
                  </section>
                ))}
              </div>
            </div>

            <section className={styles.contactCta} aria-labelledby="legal-contact-title">
              <div>
                <span className={styles.ctaKicker}>CareLine Medical Reception</span>
                <h2 id="legal-contact-title">Have Questions?</h2>
                <p>If you need clarification about our policies or services, our team is happy to help.</p>
              </div>
              <Link href="/contact" className={styles.ctaLink}>
                Contact CareLine <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </section>

            <div className={styles.pageEnd}>
              <span>Last updated November 14, 2026</span>
              <a href="#top">Back to top</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}