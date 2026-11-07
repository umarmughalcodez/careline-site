import React from "react";
import styles from "./TopBar.module.css";
import { Phone, ShieldCheck } from "lucide-react";

export default function TopBar() {
  return (
    <aside className={styles.topbar} aria-label="Quick announcements and office hours">
      <div className={`container ${styles.topbarContainer}`}>
        <div className={styles.leftGroup}>
          <span className={styles.liveBadge}>
            <span className={styles.liveBadgeDot}></span> Live Call Coverage 24/7
          </span>
          <span className={styles.tagline}>
            Virtual receptionist for medical practices
          </span>
        </div>
        <div className={styles.rightGroup}>
          <span className={styles.serviceList}>
            Call coverage · Scheduling · Follow-ups
          </span>
          <span className={styles.divider}>|</span>
          <a href="tel:18005550199" className={styles.contactLink}>
            <Phone size={13} aria-hidden="true" />
            <span className={styles.phoneFull}>(800) 555-0199</span>
            <span className={styles.phoneShort}>(92) 300 123 4567</span>
          </a>
          <span className={styles.divider}>|</span>
          <span className={styles.trustItem}>
            <ShieldCheck size={14} color="#5eead4" aria-hidden="true" />
            <span className={styles.trustFull}>HIPAA-Trained</span>
          </span>
        </div>
      </div>
    </aside>
  );
}