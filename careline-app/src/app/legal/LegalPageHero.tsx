"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cookie, FileText, Info } from "lucide-react";
import styles from "./LegalPage.module.css";

export type LegalPageIcon = "document" | "information" | "cookie";

const icons = {
  document: FileText,
  information: Info,
  cookie: Cookie,
} as const;

type LegalPageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  icon: LegalPageIcon;
};

export default function LegalPageHero({ kicker, title, description, icon }: LegalPageHeroProps) {
  const reduceMotion = useReducedMotion();
  const Icon = icons[icon];

  return (
    <section className={styles.hero} aria-labelledby="legal-page-title">
      <div className={styles.heroInner}>
        <motion.div
          className={styles.heroCopy}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <span className={styles.kicker}>{kicker}</span>
          <h1 id="legal-page-title">{title}</h1>
          <p>{description}</p>
          <div className={styles.updated}>
            <span>Last updated</span>
            <time dateTime="2026-11-14">November 14, 2026</time>
          </div>
        </motion.div>
        <span className={styles.heroIcon} aria-hidden="true">
          <Icon size={30} strokeWidth={1.7} />
        </span>
      </div>
    </section>
  );
}