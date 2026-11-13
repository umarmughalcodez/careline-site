"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicyHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="privacy-title">
      <div className={styles.heroContainer}>
        <motion.div
          className={styles.heroCopy}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <span className={styles.kicker}>Privacy &amp; Trust</span>
          <h1 id="privacy-title">Privacy Policy</h1>
          <p>
            Your trust matters to us. Learn how CareLine collects, uses, stores and protects the information you
            share when interacting with our website.
          </p>
          <div className={styles.updated}>
            <span>Effective date</span>
            <time dateTime="2026-11-14">November 14, 2026</time>
            <span className={styles.updatedDivider} aria-hidden="true" />
            <span>Last updated</span>
            <time dateTime="2026-11-14">November 14, 2026</time>
          </div>
        </motion.div>
        <div className={styles.heroIcon} aria-hidden="true">
          <ShieldCheck size={34} strokeWidth={1.6} />
        </div>
      </div>
    </section>
  );
}