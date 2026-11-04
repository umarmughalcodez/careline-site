import React from "react";
import styles from "./TopBar.module.css";
import { Phone, ShieldCheck } from "lucide-react";

export default function TopBar() {
  return (
    <aside className={styles.topbar} aria-label="Quick announcements and office hours">
      <div className={`container ${styles.topbarContainer}`}>
        <div className={styles.leftGroup}>
          <span className={styles.liveBadge}>
            <span className={styles.liveBadgeDot}></span> Live Coverage
          </span>
          <span>Virtual receptionist support for independent medical practices</span>
        </div>
        <div className={styles.rightGroup}>
          <span>Call coverage · Scheduling · Follow-ups</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <a href="tel:18005550199" className={styles.contactLink}>
            <Phone size={13} aria-hidden="true" />
            <span>(800) 555-0199</span>
          </a>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <ShieldCheck size={14} color="#5eead4" aria-hidden="true" />
            <span>HIPAA-Trained</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
