import React from "react";
import styles from "./CtaBanner.module.css";
import { ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className={styles.cta} aria-label="Call to Action">
      <div className={`container ${styles.ctaContainer}`}>
        <h2>Let’s make patient calls easier to manage.</h2>
        <p>
          Book a short introductory call to discuss your clinic’s needs and see whether virtual receptionist support is a fit for your practice.
        </p>

        <div className={styles.ctaActions}>
          <a className="btn white-btn" href="/contact">
            <span>Talk with our team</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a className="btn secondary" href="tel:18005550199" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)" }}>
            <span>Call (800) 555-0199</span>
          </a>
        </div>

        <div className={styles.trustList}>
          <div className={styles.trustItem}>
            <Shield size={14} color="#5eead4" />
            <span>Zero long-term lock-in</span>
          </div>
          <div className={styles.trustItem}>
            <Zap size={14} color="#5eead4" />
            <span>Setup in under 5 business days</span>
          </div>
          <div className={styles.trustItem}>
            <Sparkles size={14} color="#5eead4" />
            <span>Dedicated medical receptionist team</span>
          </div>
        </div>
      </div>
    </section>
  );
}
