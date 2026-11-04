import React from "react";
import styles from "./WhyUs.module.css";
import { Check } from "lucide-react";

export default function WhyUs() {
  const benefits = [
    {
      title: "Coverage that fits your clinic",
      description: "Discuss weekday, extended-hour or overflow support tailored to your staffing levels.",
    },
    {
      title: "Consistent call handling",
      description: "Use scripts and escalation rules approved by your clinical and administrative team.",
    },
    {
      title: "Clear service reporting",
      description: "Agree on call logs, patient message delivery channels, and reporting frequency.",
    },
  ];

  const workflowPills = [
    "Call answering",
    "Scheduling support",
    "Overflow coverage",
    "Message taking",
    "HIPAA compliant",
    "EHR calendar sync",
    "Doctor triage routing",
  ];

  return (
    <section className="section alt" id="about" aria-labelledby="why-title">
      <div className={`container ${styles.twoCol}`}>
        {/* Left Column: Practice Needs */}
        <div className={styles.leftCol}>
          <div>
            <div className="kicker">Designed for independent practices</div>
            <h2 id="why-title">More support when your team is busy</h2>
            <p>
              Missed calls can frustrate patients and add pressure to a busy front desk. A virtual receptionist team can provide extra administrative support without requiring another person at the clinic reception desk.
            </p>
          </div>

          <div className={styles.benefitPanel}>
            {benefits.map((b, idx) => (
              <div key={idx} className={styles.benefit}>
                <span className={styles.tick} aria-hidden="true">
                  <Check size={16} strokeWidth={3} />
                </span>
                <div>
                  <b>{b.title}</b>
                  <span>{b.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Practical Partnership Card */}
        <div className={styles.quotePanel}>
          <div className={styles.quoteKicker}>A practical partnership</div>
          <h3>Reception support shaped around the way your clinic works.</h3>
          <p>
            We start by learning your call flow, appointment process, coverage hours and escalation preferences. Then we agree on a clear, limited scope before service begins.
          </p>

          <div className={styles.pillRow} aria-label="Practice capabilities">
            {workflowPills.map((pill, idx) => (
              <span key={idx} className={styles.pill}>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
