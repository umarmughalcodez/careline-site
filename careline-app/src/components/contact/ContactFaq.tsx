"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./ContactPage.module.css";

const faqItems = [
  {
    question: "How fast can we start?",
    answer:
      "Most inquiries move from the first message to a discovery call within a few business days, depending on your clinic workflow, coverage needs, and scheduling availability.",
  },
  {
    question: "Do you work with our scheduling software?",
    answer:
      "We can align with the tools and process your practice already uses, and we can help clarify what support fits into your current scheduling and message-handling flow.",
  },
  {
    question: "What does a pilot look like?",
    answer:
      "A pilot typically begins with a focused scope, a short onboarding discussion, and a small set of calls or tasks to confirm the process before scaling support further.",
  },
  {
    question: "How do you handle privacy?",
    answer:
      "We keep processes privacy-conscious by agreeing on what information is required, who receives it, and how it is handled at each step of the workflow.",
  },
  {
    question: "Can you cover after-hours or overflow calls only?",
    answer:
      "Yes. We can support selective coverage windows, overflow call handling, and after-hours help depending on what is most helpful for your clinic scheduling and patient demand.",
  },
  {
    question: "What happens in an emergency?",
    answer:
      "Emergency situations should be managed according to your clinic protocol and local emergency response guidance. We do not provide medical advice or replace emergency workflows.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.faqHeader}>
          <div className="kicker">FAQ</div>
          <h2 id="faq-title">Common questions before we talk.</h2>
        </div>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.faqChevron}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className={styles.faqAnswerWrap}
                    >
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
