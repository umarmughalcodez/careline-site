"use client";

import React from "react";
import styles from "./Footer.module.css";
import { ArrowUp, ShieldCheck } from "lucide-react";

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
            <a href="#home" className={styles.brandLink}>
              <span className={styles.logo} aria-hidden="true">✚</span>
              <span>CareLine Reception</span>
            </a>
            <p className={styles.brandDesc}>
              Virtual medical receptionist support for independent clinics and group practices across the United States.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.76rem", color: "#6ee7b7" }}>
                <ShieldCheck size={14} />
                <span>HIPAA-Conscious Procedures</span>
              </span>
            </div>
          </div>

          {/* Nav Col */}
          <div className={styles.footerCol}>
            <h4>Practice Solutions</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#services" className={styles.footerLink}>
                  Live Call Answering
                </a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>
                  Appointment Scheduling
                </a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>
                  Patient Reminders & Recalls
                </a>
              </li>
              <li>
                <a href="#calculator" className={styles.footerLink}>
                  Practice Coverage Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Workflows Col */}
          <div className={styles.footerCol}>
            <h4>Getting Started</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#how" className={styles.footerLink}>
                  How It Works (3 Steps)
                </a>
              </li>
              <li>
                <a href="#about" className={styles.footerLink}>
                  Why Independent Clinics Choose Us
                </a>
              </li>
              <li>
                <a href="/contact" className={styles.footerLink}>
                  Book Discovery Call
                </a>
              </li>
              <li>
                <a href="mailto:hello@youragency.com" className={styles.footerLink}>
                  Email Practice Coordinator
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <span>
            © <span id="year">{currentYear}</span> CareLine Medical Reception. All rights reserved.
          </span>
          <span>Privacy-conscious workflows · Clinic-approved procedures</span>
          <button
            type="button"
            className={styles.scrollTopBtn}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
