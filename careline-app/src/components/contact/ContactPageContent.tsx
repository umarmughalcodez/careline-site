"use client";

import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import DiscoveryScheduler from "@/components/contact/DiscoveryScheduler";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactForm from "@/components/contact/ContactForm";
import styles from "./ContactPage.module.css";

const contactOptions = [
  {
    id: "email",
    tint: "blue",
    icon: Mail,
    title: "Email us",
    value: "test@gmail.com",
    helper: "Reply within one business day",
    action: "Copy email",
    href: "mailto:buycrazeshop@gmail.com",
  },
  {
    id: "call",
    tint: "teal",
    icon: Phone,
    title: "Book a discovery call",
    value: "10-minute intro call",
    helper: "Share your needs and preferred timing",
    action: "Open scheduler",
    href: "#scheduler",
  },
  {
    id: "area",
    tint: "amber",
    icon: MapPin,
    title: "Service area",
    value: "Supporting US medical practices remotely",
    helper: "Virtual support across the United States",
    action: "View details",
    href: "#details",
  },
] as const;

const steps = [
  "We review your message and your current workflow.",
  "We schedule a short call to work through coverage needs.",
  "We agree a small pilot scope before moving forward.",
] as const;

const trustChips = [
  "Reply within one business day",
  "No obligation",
  "Privacy-conscious workflows",
] as const;

// const schedulerDays = [
//   "Mon",
//   "Tue",
//   "Wed",
//   "Thu",
//   "Fri",
//   "Sat",
//   "Sun",
// ] as const;

// const timeSlots = [
//   "9:00 AM",
//   "10:30 AM",
//   "12:00 PM",
//   "2:00 PM",
//   "3:30 PM",
//   "5:00 PM",
// ] as const;

const faqPageJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can we start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most new inquiries move from first contact to an initial call within a few business days, depending on your clinic needs and scheduling availability.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with our scheduling software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can align with your current process and support the workflow your practice already uses, including common scheduling and communication tools.",
      },
    },
    {
      "@type": "Question",
      name: "What does a pilot look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A pilot usually begins with a focused scope, a short onboarding walkthrough, and a small set of calls or tasks to confirm the process before a broader rollout.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle privacy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We keep workflows privacy-conscious by relying on clear intake rules, limited access to sensitive information, and a practice-approved communication process.",
      },
    },
    {
      "@type": "Question",
      name: "Can you cover after-hours or overflow calls only?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We can support selective coverage, overflow queues, and limited after-hours windows depending on your clinic’s staffing and patient budget.",
      },
    },
    {
      "@type": "Question",
      name: "What happens in an emergency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Emergency situations should be handled according to your clinic’s existing medical protocol and local emergency services. We do not provide medical advice or replace emergency response workflows.",
      },
    },
  ],
};

export default function ContactPageContent() {
  const [copied, setCopied] = useState(false);
  

  const handleCopyEmail = async () => {
  try {
    await navigator.clipboard.writeText("contact@careline.com");
    setCopied(true);
    toast.success("Email address copied!");
    window.setTimeout(() => setCopied(false), 1800);
  } catch {
    setCopied(false);
    toast.error("Couldn’t copy. Please copy it manually: contact@careline.com");
  }
};

  
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJson) }}
      />

      <section className={styles.heroSection} aria-label="Contact page hero">
        <div className="container">
          <div className={styles.heroGrid}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={styles.copyCol}
            >
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span aria-current="page">Contact</span>
              </nav>

              <div className={styles.eyebrow}>
                <span className={styles.dot} aria-hidden="true" />
                <span>We&apos;re here to help</span>
              </div>

              <h1>
                Let&apos;s talk about your clinic&apos;s <span>front desk.</span>
              </h1>

              <p className={styles.lead}>
                Tell us what your practice needs. We can talk through call coverage,
                overflow support, scheduling workflows, and a simple first step that fits your team.
              </p>

              <div className={styles.trustList}>
                {trustChips.map((chip) => (
                  <span key={chip} className={styles.trustChip}>
                    <CheckCircle2 size={15} />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className={styles.visualCol}
              aria-hidden="true"
            >
              <div className={styles.orb} />
              <div className={`${styles.floatBubble} ${styles.floatBubbleOne}`}>
                <Phone size={17} />
              </div>
              <div className={`${styles.floatBubble} ${styles.floatBubbleTwo}`}>
                <CalendarDays size={17} />
              </div>
              <div className={`${styles.floatBubble} ${styles.floatBubbleThree}`}>
                <MessageSquare size={17} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.optionsSection} aria-label="Contact options">
        <div className="container">
          <div className={styles.optionGrid}>
            {contactOptions.map(({ id, tint, icon: Icon, title, value, helper, action, href }, index) => (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={styles.optionCard}
              >
                <div className={`${styles.optionIcon} ${styles[tint]}`}>
                  <Icon size={22} />
                </div>
                <span className={styles.optionKicker}>{title}</span>
                <h3>{value}</h3>
                <p>{helper}</p>
                {id === "email" ? (
                  <button type="button" className={styles.optionAction} onClick={handleCopyEmail}>
                    <span>{copied ? "Copied!" : action}</span>
                    <Copy size={15} />
                  </button>
                ) : (
                  <a href={href} className={styles.optionAction}>
                    <span>{action}</span>
                    <ArrowRight size={15} />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mainSection} id="details" aria-labelledby="contact-main-title">
        <div className="container">
          <div className={styles.mainGrid}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className={styles.leftPanel}
            >
              <div className="kicker">Contact us</div>
              <h2 id="contact-main-title">Tell us what your clinic needs.</h2>
              <p>
                We&apos;ll listen to the process you have today and talk through the support that would make your front desk easier to manage.
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={`${styles.detailIcon} ${styles.detailBlue}`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <b>Email</b>
                    <a href="mailto:buycrazeshop@gmail.com">contact@careline.com</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={`${styles.detailIcon} ${styles.detailTeal}`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <b>Service area</b>
                    <span>Supporting US medical practices remotely</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={`${styles.detailIcon} ${styles.detailAmber}`}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <b>Hours</b>
                    <span>Mon–Fri, 9am–6pm ET</span>
                  </div>
                </div>
              </div>

              <div className={styles.stepsBlock}>
                <h3>What happens next</h3>
                <div className={styles.stepper} aria-label="How we work">
                  {steps.map((step, index) => (
                    <div key={step} className={styles.stepItem}>
                      <div className={styles.stepDotWrap}>
                        <span className={styles.stepDot}>{index + 1}</span>
                        {index < steps.length - 1 && (
                          <motion.span
                            className={styles.stepLine}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.5, delay: index * 0.12 }}
                            style={{ transformOrigin: "top center" }}
                          />
                        )}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.reassurancePanel}>
                <div className={styles.reassuranceRing} aria-hidden="true" />
                <div className={styles.reassuranceContent}>
                  <div className={styles.reassuranceLabel}>Practical, privacy-conscious support</div>
                  <div className={styles.pillRow}>
                    {[
                      "Privacy-conscious workflows",
                      "Clinic-approved procedures",
                      "Human support",
                    ].map((pill) => (
                      <span key={pill} className={styles.pill}>
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className={styles.formColumn}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.schedulerSection} id="scheduler" aria-labelledby="scheduler-title">
        <div className="container">
          <div className={styles.schedulerGrid}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className={styles.schedulerCopy}
            >
              <div className="kicker">10-minute discovery call</div>
              <h2 id="scheduler-title">A short call to look at your front desk workflow.</h2>
              <p>
                We can talk through peak call times, scheduling support, follow-ups, and where the extra help would be most useful.
              </p>
              <ul className={styles.benefitList}>
                {[
                  "Explain your current call flow",
                  "Review the coverage model that fits",
                  "Agree on a practical next step",
                ].map((item) => (
                  <li key={item}>
                    <span className={styles.checkBubble}>
                      <Check size={14} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className={styles.schedulerCard}
            >
              <DiscoveryScheduler />
            </motion.div>
          </div>
        </div>
      </section>

      <ContactFaq />

      <section className={styles.ctaBand} aria-label="Final call to action">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <div className={styles.ctaKicker}>Need a quick conversation?</div>
              <h2>Prefer to talk it through? Book a short intro call.</h2>
            </div>
            <a href="/contact#form" className="btn white-btn">
              <span>Book a discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
