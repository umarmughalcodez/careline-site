"use client";

import React, { useState } from "react";
import styles from "./ContactSection.module.css";
import {
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

interface FormDataState {
  name: string;
  clinic: string;
  email: string;
  coverage: string;
  message: string;
  consent: boolean;
}

type SubmissionState = "idle" | "sending" | "success" | "error";

const initialFormData: FormDataState = {
  name: "",
  clinic: "",
  email: "",
  coverage: "Weekday call support",
  message: "",
  consent: false,
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionState("sending");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "quick",
          name: formData.name,
          clinicName: formData.clinic,
          workEmail: formData.email,
          coverage: formData.coverage,
          message: formData.message,
          consent: formData.consent,
          honeypot: "",
        }),
      });
      const payload = await response.json().catch(() => null) as {
        message?: string;
        errors?: Record<string, string[]>;
      } | null;

      if (!response.ok) {
        const firstError = Object.values(payload?.errors ?? {}).flat()[0];
        throw new Error(firstError || payload?.message || "We couldn’t send your inquiry. Please try again.");
      }

      setSubmissionState("success");
      setSubmissionMessage("Inquiry sent. Thank you for getting in touch.");
      setFormData(initialFormData);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(error instanceof Error ? error.message : "We couldn’t send your inquiry. Please try again.");
    }
  };

  return (
    <section className="section alt" id="contact" aria-labelledby="contact-title">
      <div className={`container ${styles.contactGrid}`}>
        {/* Left Column: Direct Info */}
        <div className={styles.contactInfo}>
          <div className="kicker">Contact us</div>
          <h2 id="contact-title">Tell us what your clinic needs.</h2>
          <p>
            Share a few details and we can arrange a short conversation about call coverage, scheduling support and next steps.
          </p>

          <div className={styles.contactCards}>
            <div className={styles.contactItem}>
              <div className={styles.contactItemIcon}>
                <Mail size={18} />
              </div>
              <div>
                <b>Send an inquiry</b>
                <span>Use the form to reach our team.</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactItemIcon}>
                <MapPin size={18} />
              </div>
              <div>
                <b>Service area</b>
                <span>Supporting US medical practices remotely</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactItemIcon}>
                <Clock size={18} />
              </div>
              <div>
                <b>What happens next</b>
                <span>We&apos;ll reply to your work email.</span>
              </div>
            </div>
          </div>


        </div>

        {/* Right Column: Inquiry Form */}
        <div className={styles.formCard}>
          <form id="contactForm" onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                <span>Your name</span>
                <span className={styles.requiredMark}>*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Sarah Mitchell"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="clinic" className={styles.label}>
                <span>Clinic / Practice name</span>
                <span className={styles.requiredMark}>*</span>
              </label>
              <input
                id="clinic"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                placeholder="Northwest Family Medicine"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                <span>Work email</span>
                <span className={styles.requiredMark}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="s.mitchell@clinic.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="coverage" className={styles.label}>
                <span>Coverage needed</span>
              </label>
              <select
                id="coverage"
                name="coverage"
                value={formData.coverage}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Weekday call support">Weekday call support (8am - 5pm)</option>
                <option value="Extended-hour coverage">Extended-hour coverage (Evenings & Weekends)</option>
                <option value="Overflow call handling">Overflow call handling (Peak busy hours)</option>
                <option value="24/7 discussion">24/7 coverage discussion</option>
              </select>
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="message" className={styles.label}>
                <span>What would you like help with?</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={600}
                placeholder="For example: missed calls during lunch hour, appointment intake requests, after-hours coverage…"
                className={styles.textarea}
              />
            </div>

            <label className={`${styles.field} ${styles.full} ${styles.consentField}`}>
              <span className={styles.consentLabel}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={(event) => setFormData((previous) => ({ ...previous, consent: event.target.checked }))}
                  required
                />
                <span>I agree to be contacted about this inquiry.</span>
              </span>
            </label>

            <div className={`${styles.field} ${styles.full}`}>
              <button className="btn" type="submit" disabled={submissionState === "sending"} style={{ width: "100%" }}>
                <span>{submissionState === "sending" ? "Sending inquiry..." : "Send inquiry"}</span>
                <Send size={16} aria-hidden="true" />
              </button>
            </div>

            <p className={styles.formNote} role={submissionState === "error" ? "alert" : "status"} aria-live="polite">
              {submissionMessage || "Your inquiry will be sent to the CareLine team."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
