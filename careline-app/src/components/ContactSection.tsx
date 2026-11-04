"use client";

import React, { useState } from "react";
import styles from "./ContactSection.module.css";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Copy,
} from "lucide-react";

interface FormDataState {
  name: string;
  clinic: string;
  email: string;
  coverage: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    clinic: "",
    email: "",
    coverage: "Weekday call support",
    message: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Virtual receptionist inquiry — ${formData.clinic}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Clinic: ${formData.clinic}\n` +
      `Work email: ${formData.email}\n` +
      `Coverage needed: ${formData.coverage}\n\n` +
      `Needs: ${formData.message || "Not specified"}`
    );

    const mailtoUrl = `mailto:hello@youragency.com?subject=${subject}&body=${body}`;

    // Open email client via window.location
    window.location.href = mailtoUrl;

    // Show modal dialog feedback
    setSubmitted(true);
  };

  const handleCopySummary = async () => {
    const textToCopy = 
      `Inquiry for CareLine Medical Reception\n` +
      `Name: ${formData.name}\n` +
      `Clinic: ${formData.clinic}\n` +
      `Email: ${formData.email}\n` +
      `Coverage: ${formData.coverage}\n` +
      `Details: ${formData.message}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
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
                <b>Email inquiry</b>
                <a href="mailto:hello@youragency.com">hello@youragency.com</a>
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
                <b>Response time</b>
                <span>Within 2 business hours</span>
              </div>
            </div>
          </div>

          <p className={styles.disclaimer}>
            Replace the sample email and agency details before publishing to your production domain.
          </p>
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
                <option value="24/7 coverage discussion">24/7 coverage discussion</option>
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
                placeholder="For example: missed calls during lunch hour, appointment intake requests, after-hours coverage…"
                className={styles.textarea}
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <button className="btn" type="submit" style={{ width: "100%" }}>
                <span>Prepare inquiry email</span>
                <Send size={16} aria-hidden="true" />
              </button>
            </div>

            <p className={styles.formNote}>
              Demo form: it opens an email draft in your default mail app. Connect a real form service or your business inbox before publishing.
            </p>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSubmitted(false)}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalCheckIcon}>
                <CheckCircle size={28} />
              </div>
              <div>
                <h3 id="modal-title">Email Draft Prepared!</h3>
                <p style={{ fontSize: "0.85rem", color: "#61778c" }}>
                  Your email client has been triggered with the details below.
                </p>
              </div>
            </div>

            <div className={styles.modalSummary}>
              <div className={styles.modalSummaryRow}>
                <span>Clinic:</span>
                <b>{formData.clinic}</b>
              </div>
              <div className={styles.modalSummaryRow}>
                <span>Contact Name:</span>
                <b>{formData.name}</b>
              </div>
              <div className={styles.modalSummaryRow}>
                <span>Work Email:</span>
                <b>{formData.email}</b>
              </div>
              <div className={styles.modalSummaryRow}>
                <span>Coverage Needed:</span>
                <b>{formData.coverage}</b>
              </div>
              {formData.message && (
                <div style={{ marginTop: "4px" }}>
                  <span style={{ fontSize: "0.78rem", color: "#718598" }}>Specific Needs:</span>
                  <p style={{ color: "var(--navy)", marginTop: "2px" }}>{formData.message}</p>
                </div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className="btn secondary"
                onClick={handleCopySummary}
                style={{ flex: "1" }}
              >
                <Copy size={16} />
                <span>{copied ? "Copied to clipboard!" : "Copy inquiry text"}</span>
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => setSubmitted(false)}
                style={{ flex: "1" }}
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
