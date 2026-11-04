"use client";

import React, { useState } from "react";
import styles from "./CoverageCalculator.module.css";
import { ArrowRight, Clock, Users, PhoneCall } from "lucide-react";

export default function CoverageCalculator() {
  const [weeklyCalls, setWeeklyCalls] = useState<number>(250);
  const [providers, setProviders] = useState<number>(2);
  const [coverageType, setCoverageType] = useState<"standard" | "overflow" | "extended">("standard");

  // Calculate metrics dynamically
  const missedRate = coverageType === "overflow" ? 0.28 : coverageType === "extended" ? 0.32 : 0.22;
  const recoveredCallsPerMonth = Math.round(weeklyCalls * 4.2 * missedRate);
  const staffHoursSavedPerWeek = Math.round((weeklyCalls * 4.5) / 60);
  const patientRetentionRate = Math.min(99, 82 + Math.round(providers * 2.5));

  return (
    <section className={`section ${styles.calcSection}`} id="calculator" aria-label="Coverage and Resource Estimator">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Interactive Practice Estimator</div>
          <h2>Estimate Your Clinic’s Coverage Impact</h2>
          <p>
            See how much front-desk relief and patient call recovery virtual medical receptionist support provides for your specific practice size.
          </p>
        </div>

        <div className={styles.calcCard}>
          {/* Controls Column */}
          <div className={styles.controlsColumn}>
            {/* Control 1: Weekly Calls */}
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <label htmlFor="weeklyCalls" className={styles.controlLabel}>
                  Estimated Weekly Inbound Calls
                </label>
                <span className={styles.controlValue}>{weeklyCalls} calls / week</span>
              </div>
              <input
                id="weeklyCalls"
                type="range"
                min="50"
                max="1000"
                step="25"
                value={weeklyCalls}
                onChange={(e) => setWeeklyCalls(Number(e.target.value))}
                className={styles.slider}
                aria-valuemin={50}
                aria-valuemax={1000}
                aria-valuenow={weeklyCalls}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#8a9ba8" }}>
                <span>50 (Solo Clinic)</span>
                <span>500 (Mid-Size Group)</span>
                <span>1,000+ (Multi-Provider)</span>
              </div>
            </div>

            {/* Control 2: Number of Providers */}
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <label htmlFor="providers" className={styles.controlLabel}>
                  Number of Practicing Clinicians / Doctors
                </label>
                <span className={styles.controlValue}>{providers} {providers === 1 ? "Provider" : "Providers"}</span>
              </div>
              <input
                id="providers"
                type="range"
                min="1"
                max="12"
                step="1"
                value={providers}
                onChange={(e) => setProviders(Number(e.target.value))}
                className={styles.slider}
                aria-valuemin={1}
                aria-valuemax={12}
                aria-valuenow={providers}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#8a9ba8" }}>
                <span>1 Clinician</span>
                <span>6 Clinicians</span>
                <span>12+ Clinicians</span>
              </div>
            </div>

            {/* Control 3: Coverage Window */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>Target Coverage Model</label>
              <div className={styles.coverageTypeGrid}>
                <button
                  type="button"
                  className={`${styles.coverageBtn} ${coverageType === "standard" ? styles.active : ""}`}
                  onClick={() => setCoverageType("standard")}
                >
                  <Clock size={16} />
                  <span>Business Hours</span>
                  <small style={{ opacity: 0.85, fontSize: "0.7rem" }}>Mon-Fri 8am-5pm</small>
                </button>

                <button
                  type="button"
                  className={`${styles.coverageBtn} ${coverageType === "overflow" ? styles.active : ""}`}
                  onClick={() => setCoverageType("overflow")}
                >
                  <PhoneCall size={16} />
                  <span>Peak Overflow</span>
                  <small style={{ opacity: 0.85, fontSize: "0.7rem" }}>Lunch & Rush Backup</small>
                </button>

                <button
                  type="button"
                  className={`${styles.coverageBtn} ${coverageType === "extended" ? styles.active : ""}`}
                  onClick={() => setCoverageType("extended")}
                >
                  <Users size={16} />
                  <span>Extended Hours</span>
                  <small style={{ opacity: 0.85, fontSize: "0.7rem" }}>Evenings & Weekends</small>
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultsColumn}>
            <div className={styles.resultsHeader}>
              <span>Practice Impact Analysis</span>
              <h3>Projected Monthly Results</h3>
            </div>

            <div className={styles.statGrid}>
              <div className={styles.statBox}>
                <strong>~{recoveredCallsPerMonth}</strong>
                <span>Calls & Appointments Recovered / Mo</span>
              </div>

              <div className={styles.statBox}>
                <strong>~{staffHoursSavedPerWeek} hrs</strong>
                <span>Front-Desk Time Reclaimed / Wk</span>
              </div>
            </div>

            <div className={styles.recommendationBox}>
              <b>Recommended Team Scope:</b>
              <span>
                Dedicated 2-person reception pod trained on your EHR/PMS, providing {coverageType === "overflow" ? "seamless ring-overflow pickup" : coverageType === "extended" ? "comprehensive 12-hour weekday + weekend on-call coverage" : "full 8am–5pm primary patient line coverage"}.
              </span>
              <span style={{ display: "block", marginTop: "10px", color: "#2b5b8c", fontWeight: 700 }}>
                Estimated patient retention lift: +{patientRetentionRate}% with more reliable follow-up coverage.
              </span>
            </div>

            <a className="btn white-btn" href="/contact" style={{ width: "100%" }}>
              <span>Discuss this setup for your clinic</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
