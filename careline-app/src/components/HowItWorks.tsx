import React from "react";
import styles from "./HowItWorks.module.css";
import { MessageSquareText, FileCheck, Rocket, Check } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "STEP 01",
      icon: <MessageSquareText size={20} />,
      title: "Tell us about your clinic",
      description:
        "We discuss call volume, business hours, EHR/scheduling tools and common patient requests to establish clear scope.",
      deliverable: "Practice profile & call volume assessment",
    },
    {
      num: "STEP 02",
      icon: <FileCheck size={20} />,
      title: "Agree on the workflow",
      description:
        "We document scripts, access permissions, clinical escalation rules, privacy requirements and coverage windows.",
      deliverable: "Approved clinic protocol & escalation playbook",
    },
    {
      num: "STEP 03",
      icon: <Rocket size={20} />,
      title: "Launch a pilot",
      description:
        "Start with an agreed coverage window, review service quality, inspect call logs, and adjust before expanding.",
      deliverable: "14-day calibration review & continuous quality check",
    },
  ];

  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Simple process</div>
          <h2 id="how-title">Getting started is straightforward</h2>
          <p>
            A clear setup helps your team know what to expect from day one without disrupting active patients.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepIcon}>{step.icon}</div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              <div className={styles.deliverable}>
                <Check size={14} color="var(--teal)" strokeWidth={3} />
                <span>{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
