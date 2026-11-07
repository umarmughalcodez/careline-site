"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Col */}
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.brandLink}>
              <span className={styles.logo} aria-hidden="true">✚</span>
              <span>CareLine Reception</span>
            </Link>
            <p className={styles.brandDesc}>
              Virtual medical receptionist support for independent clinics and group practices across the United States.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Explore CareLine</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/services#services-grid" className={styles.footerLink}>Services</Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>Why CareLine</Link>
              </li>
              <li>
                <Link href="/calculator" className={styles.footerLink}>Coverage Estimator</Link>
              </li>
              <li>
                <Link href="/how#timeline-title" className={styles.footerLink}>How It Works</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Getting Started</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/contact#scheduler" className={styles.footerLink}>Book a discovery call</Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <span>
            © {currentYear} CareLine Medical Reception
          </span>
          <button
            type="button"
            className={styles.scrollTopBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
