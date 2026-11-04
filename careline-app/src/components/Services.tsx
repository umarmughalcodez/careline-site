import React from "react";
import styles from "./Services.module.css";
import { PhoneCall, CalendarDays, RefreshCw, CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "calls",
      type: "blue",
      badge: "Inbound Reception",
      icon: <PhoneCall size={24} />,
      title: "Live call answering",
      description:
        "Help answer incoming calls, take messages and route requests using your clinic’s specific instructions and triage rules.",
      features: [
        "Warm greeting under your clinic's brand name",
        "Urgent medical call escalation protocol",
        "HIPAA-compliant message logging & routing",
        "Overflow and peak-volume call backup",
      ],
    },
    {
      id: "appointments",
      type: "teal",
      badge: "Calendar Coordination",
      icon: <CalendarDays size={24} />,
      title: "Appointment coordination",
      description:
        "Support booking, rescheduling and cancellation requests through your approved scheduling software and calendar rules.",
      features: [
        "Direct integration into your EHR/PMS calendar",
        "Slot optimization to prevent doctor downtime",
        "Pre-appointment intake guidance & reminders",
        "Cancellation backfill management",
      ],
    },
    {
      id: "reminders",
      type: "amber",
      badge: "Patient Retention",
      icon: <RefreshCw size={24} />,
      title: "Reminders & follow-ups",
      description:
        "Help coordinate reminders, return-call lists and routine follow-ups according to your established clinic procedures.",
      features: [
        "Proactive appointment confirmation calls",
        "Overdue routine check-up recall lists",
        "Lab test ready notifications",
        "Post-visit satisfaction touchpoints",
      ],
    },
  ];

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <div className="kicker">What we do</div>
          <h2 id="services-title">Extra support for your front desk</h2>
          <p>
            Choose the services that fit your clinic’s workflow and coverage needs.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((item) => (
            <article
              key={item.id}
              className={`${styles.serviceCard} ${
                item.type === "blue"
                  ? styles.cardBlue
                  : item.type === "teal"
                  ? styles.cardTeal
                  : styles.cardAmber
              }`}
            >
              <div
                className={`${styles.iconbox} ${
                  item.type === "teal"
                    ? styles.iconboxTeal
                    : item.type === "amber"
                    ? styles.iconboxAmber
                    : ""
                }`}
              >
                {item.icon}
              </div>

              <span
                className={`${styles.badge} ${
                  item.type === "blue"
                    ? styles.badgeBlue
                    : item.type === "teal"
                    ? styles.badgeTeal
                    : styles.badgeAmber
                }`}
              >
                {item.badge}
              </span>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <ul className={styles.featureList}>
                {item.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.featureIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
