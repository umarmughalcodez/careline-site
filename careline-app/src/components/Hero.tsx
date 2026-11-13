"use client";

import React, { useState } from "react";
import { FlipWords } from "./FlipWords";
import styles from "./Hero.module.css";
import {
  PhoneCall,
  Calendar,
  RotateCw,
  Check,
  ArrowRight,
  CheckCircle2,
  Info,
  Phone,
} from "lucide-react";

interface ActivityItem {
  id: string;
  icon: "call" | "calendar" | "follow";
  title: string;
  subtitle: string;
  detail: string;
}

export default function Hero() {
  const [selectedActivity, setSelectedActivity] = useState<string>("call");

  const activities: ActivityItem[] = [
    {
      id: "call",
      icon: "call",
      title: "Inbound call handling",
      subtitle: "Answer and route calls in clinic tone",
      detail: "Receptionist Maria answered in 2 rings: Patient Mrs. Jenkins inquiring about prescription refill. Escalated to clinic nurse line per agreed triage rules.",
    },
    {
      id: "calendar",
      icon: "calendar",
      title: "Appointment requests",
      subtitle: "Follow clinic-approved booking steps",
      detail: "Scheduled new patient consultation for Thursday 2:30 PM with Dr. Roberts. Insurance pre-verified and intake link dispatched via SMS.",
    },
    {
      id: "follow",
      icon: "follow",
      title: "Follow-up coordination",
      subtitle: "Reminders, recall lists & messages",
      detail: "Completed 14 morning appointment reminder calls. 12 confirmed, 2 rescheduled into open afternoon slots, preserving full clinic schedule.",
    },
  ];

  return (
    <section className={styles.hero} id="home" aria-label="Hero Section">
      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column: Copy & Actions */}
        <div className={styles.heroContent}>
          <div className="eyebrow">
            <span className="dot" aria-hidden="true"></span>
            <span>SUPPORT FOR BUSY MEDICAL TEAMS</span>
          </div>

          <h1 className={styles.heroHeading}>
  Your patients call.
  <br />
  <span className={styles.gradientText}>We handle your</span>{" "}
  <FlipWords
    words={["calls.", "appointments.", "reminders.", "follow-ups."]}
  />
</h1>

          <p className={styles.heroLead}>
            Friendly virtual receptionist support for independent clinics—helping manage incoming calls, appointment requests, reminders and follow-ups so your team can focus on patients in front of them.
          </p>

          <div className={styles.actions}>
            <a className="btn" href="/contact">
              <span>Schedule a 10-minute call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn secondary" href="#services">
              <span>Explore services</span>
            </a>
          </div>

          <div className={styles.micro}>
            <span className={styles.microItem}>
              <CheckCircle2 size={15} color="var(--teal)" aria-hidden="true" />
              <span>Flexible coverage options</span>
            </span>
            <span className={styles.microDot} aria-hidden="true"></span>
            <span className={styles.microItem}>
              <CheckCircle2 size={15} color="var(--teal)" aria-hidden="true" />
              <span>Clear workflows</span>
            </span>
            <span className={styles.microDot} aria-hidden="true"></span>
            <span className={styles.microItem}>
              <CheckCircle2 size={15} color="var(--teal)" aria-hidden="true" />
              <span>Human support</span>
            </span>
          </div>
        </div>

        {/* Right Column: Hero Art & Live Interactive Reception Dashboard */}
        <div className={styles.heroArt} aria-label="Interactive Reception Dashboard">
          <div className={styles.orb} aria-hidden="true"></div>

          {/* Top Floating Badge */}
          <div className={`${styles.floatCard} ${styles.floatTwo} ${styles.floatAnimation}`}>
            <div className={styles.floatIcon}>
              <Phone size={18} />
            </div>
            <div>
              <b>Call support</b>
              <span>Patient-first medical service</span>
            </div>
          </div>

          {/* Reception Dashboard Card */}
          <div className={styles.dashboard}>
            <div className={styles.dashHead}>
              <div>
                <div className={styles.dashTitle}>Reception overview</div>
                <div className={styles.dashSub}>Interactive service preview</div>
              </div>
              <span className={styles.liveTag}>
                <span className={styles.liveTagDot}></span> SERVICE READY
              </span>
            </div>

            <div className={styles.metricRow}>
              <div className={styles.metric}>
                <strong>
                  48<small>+</small>
                </strong>
                <span>Incoming call support</span>
              </div>
              <div className={styles.metric}>
                <strong>
                  29<small>+</small>
                </strong>
                <span>Appointment requests</span>
              </div>
            </div>

            <div className={styles.callList} role="list" aria-label="Reception Queue Activities">
              {activities.map((item) => {
                const isActive = selectedActivity === item.id;
                return (
                  <div
                    key={item.id}
                    className={`${styles.callItem} ${isActive ? styles.active : ""}`}
                    onClick={() => setSelectedActivity(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedActivity(item.id);
                      }
                    }}
                    aria-label={`View details for ${item.title}`}
                  >
                    <div
                      className={`${styles.callIcon} ${
                        item.icon === "calendar"
                          ? styles.callIconCalendar
                          : item.icon === "follow"
                          ? styles.callIconFollow
                          : ""
                      }`}
                    >
                      {item.icon === "call" && <PhoneCall size={18} />}
                      {item.icon === "calendar" && <Calendar size={18} />}
                      {item.icon === "follow" && <RotateCw size={18} />}
                    </div>
                    <div className={styles.callInfo}>
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </div>
                    <span className={styles.callCheck} title="Verified & Completed">
                      ✓
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Click-to-view Activity Detail */}
            {selectedActivity && (
              <div className={styles.activityDetail}>
                <div className={styles.activityDetailHeader}>
                  <Info size={14} color="var(--blue)" />
                  <span>Receptionist Log Entry</span>
                </div>
                <p>
                  {activities.find((a) => a.id === selectedActivity)?.detail}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Floating Badge */}
          {/* <div className={`${styles.floatCard} ${styles.floatOne} ${styles.floatAnimation}`}>
            <div className={`${styles.floatIcon} ${styles.floatIconCheck}`}>
              <Check size={18} />
            </div>
            <div>
              <b>Consistent communication</b>
              <span>Built around your practice workflow</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}