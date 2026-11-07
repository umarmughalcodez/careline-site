"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ContactPage.module.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"] as const;

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

type Status = "idle" | "loading" | "success" | "error";

export default function DiscoveryScheduler() {
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState(() => new Date(1970, 0, 1));
  const [selectedISO, setSelectedISO] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [form, setForm] = useState({ name: "", email: "", clinicName: "", notes: "", honeypot: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      setToday(currentDate);
      setMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const monthLabel = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const isCurrentMonth = today === null || (month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth());
  const monthsAhead = today === null ? 0 : (month.getFullYear() - today.getFullYear()) * 12 + month.getMonth() - today.getMonth();

  const cells = useMemo(() => {
    const offset = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7;
    const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const list: (Date | null)[] = Array(offset).fill(null);
    for (let day = 1; day <= total; day++) list.push(new Date(month.getFullYear(), month.getMonth(), day));
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [month]);

  const selectedLabel = selectedISO
    ? new Date(`${selectedISO}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((cur) => ({ ...cur, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.clinicName.trim()) {
      setStatus("error");
      setMessage("Please fill in your name, email, and clinic name.");
      return;
    }
    if (!selectedISO || !selectedSlot) {
      setStatus("error");
      setMessage("Please choose a date and a time.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: selectedISO,
          slot: selectedSlot,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.message || "Unable to send your request.");

      setStatus("success");
      setMessage("Request sent. We’ll confirm your call by email within one business day.");
      setForm({ name: "", email: "", clinicName: "", notes: "", honeypot: "" });
      setSelectedISO("");
      setSelectedSlot("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "We couldn’t send your request. Please try again.");
    }
  };

  if (!today) {
    return <div className={styles.calendarBox} role="status">Loading available times...</div>;
  }

  return (
    <form onSubmit={onSubmit} className={styles.discoveryForm} noValidate>
      <div className={styles.schedulerHeader}>
        <div>
          <div className={styles.schedulerBadge}>Discovery call</div>
          <h3>Choose a time</h3>
        </div>
        <span className={styles.schedulerHint}>Times shown in ET</span>
      </div>

      <div className={styles.calendarBox}>
        <div className={styles.calendarHead}>
          <span>{monthLabel}</span>
          <span style={{ display: "inline-flex", gap: 6 }}>
            <button
              type="button"
              aria-label="Previous month"
              disabled={isCurrentMonth}
              onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
              style={{ padding: "2px 10px", cursor: isCurrentMonth ? "not-allowed" : "pointer", opacity: isCurrentMonth ? 0.35 : 1 }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next month"
              disabled={monthsAhead >= 3}
              onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
              style={{ padding: "2px 10px", cursor: monthsAhead >= 3 ? "not-allowed" : "pointer", opacity: monthsAhead >= 3 ? 0.35 : 1 }}
            >
              ›
            </button>
          </span>
        </div>

        <div className={styles.weekRow}>
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className={styles.dateGrid}>
          {cells.map((date, i) => {
            if (!date) return <span key={`empty-${i}`} />;
            const iso = toISO(date);
            const weekend = date.getDay() === 0 || date.getDay() === 6;
            const disabled = date < today || weekend;
            const active = iso === selectedISO;
            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                aria-pressed={active}
                aria-label={date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                className={`${styles.dateCell} ${active ? styles.dateCellActive : ""}`}
                style={disabled ? { opacity: 0.35, cursor: "not-allowed" } : undefined}
                onClick={() => setSelectedISO(iso)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.slotWrap}>
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            type="button"
            aria-pressed={selectedSlot === slot}
            className={`${styles.slotBtn} ${selectedSlot === slot ? styles.slotBtnActive : ""}`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className={styles.discoveryFields}>
        <label className={styles.discoveryField}>
          <span>Name</span>
          <input type="text" value={form.name} onChange={update("name")} placeholder="Your full name" autoComplete="name" />
        </label>

        <label className={styles.discoveryField}>
          <span>Email</span>
          <input type="email" value={form.email} onChange={update("email")} placeholder="you@clinic.com" autoComplete="email" />
        </label>

        <label className={`${styles.discoveryField} ${styles.discoveryFieldFull}`}>
          <span>Clinic</span>
          <input type="text" value={form.clinicName} onChange={update("clinicName")} placeholder="Clinic name" autoComplete="organization" />
        </label>

        <label className={`${styles.discoveryField} ${styles.discoveryFieldFull}`}>
          <span>Notes (optional)</span>
          <textarea value={form.notes} onChange={update("notes")} maxLength={1000} placeholder="Tell us what support you need" />
        </label>

        <input
          type="text"
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.honeypot}
          onChange={update("honeypot")}
        />
      </div>

      <div className={styles.summaryRow}>
        <div>
          <div className={styles.summaryLabel}>Selected</div>
          <strong>{selectedISO && selectedSlot ? `${selectedLabel} · ${selectedSlot} ET` : "Pick a date and time"}</strong>
        </div>
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Confirm request"}
        </button>
      </div>

      {message ? (
        <div
          role="status"
          className={`${styles.discoveryMessage} ${status === "success" ? styles.discoveryMessageSuccess : ""} ${
            status === "error" ? styles.discoveryMessageError : ""
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}