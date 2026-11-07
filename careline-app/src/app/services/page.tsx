"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  PhoneIncoming,
  PhoneOutgoing,
  CalendarCheck,
  BellRing,
  Database,
  Moon,
  Check,
  ArrowRight,
  Phone,
  CalendarX,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Service = {
  id: string;
  icon: React.ElementType;
  tone: "blue" | "teal" | "amber";
  title: string;
  description: string;
  points: string[];
};

const SERVICES: Service[] = [
  {
    id: "inbound",
    icon: PhoneIncoming,
    tone: "blue",
    title: "Inbound patient calls",
    description:
      "Every call answered by a trained receptionist who knows your clinic, your providers and your scheduling rules.",
    points: ["Live answering, no voicemail", "Urdu & English fluency", "Warm transfer to staff on request"],
  },
  {
    id: "outbound",
    icon: PhoneOutgoing,
    tone: "teal",
    title: "Outbound patient calls",
    description:
      "Recalls, confirmations and no-show follow-ups that keep your schedule full and your patients informed.",
    points: ["Appointment confirmations", "Recall & re-engagement", "No-show recovery calls"],
  },
  {
    id: "scheduling",
    icon: CalendarCheck,
    tone: "amber",
    title: "Scheduling & cancellations",
    description:
      "Bookings, reschedules and cancellations handled directly in your EHR, following the rules your clinic sets.",
    points: ["Real-time calendar updates", "Cancellation & reschedule flow", "Waitlist and slot filling"],
  },
  {
    id: "reminders",
    icon: BellRing,
    tone: "blue",
    title: "Reminders & follow-ups",
    description:
      "Timely reminders and post-visit follow-ups that reduce no-shows and keep patients on track.",
    points: ["SMS & call reminders", "Post-visit check-ins", "Prescription refill routing"],
  },
  {
    id: "ehr",
    icon: Database,
    tone: "teal",
    title: "EHR-authorized support",
    description:
      "Least-privilege access to the systems you choose, with every action logged and controlled by your clinic.",
    points: ["Clinic-controlled logins", "Role-scoped permissions", "Audit-ready activity logs"],
  },
  {
    id: "afterhours",
    icon: Moon,
    tone: "amber",
    title: "Overflow & after-hours",
    description:
      "Nights, weekends and peak-hour overflow covered by a Pakistan-based team working on US time zones.",
    points: ["ET / CT / MT / PT coverage", "Holiday & weekend cover", "Overflow when your desk is full"],
  },
];

const BENEFITS = [
  { title: "Fewer missed calls", text: "Every call answered live during coverage hours, with no voicemail and no lost patients." },
  { title: "Fuller schedules", text: "Cancellations get refilled, no-shows get recovered and reminders go out on time." },
  { title: "Less front-desk stress", text: "Your staff focuses on patients in the room, not the phone ringing off the hook." },
  { title: "Cost advantage", text: "US-hours coverage from a Pakistan-based team at a fraction of local hiring cost." },
];

const STEPS = [
  { label: "Step 1", title: "Discovery call", text: "We learn your clinic, providers, scheduling rules and the systems you use." },
  { label: "Step 2", title: "Setup & training", text: "We configure your scripts, EHR access (least-privilege) and call flows." },
  { label: "Step 3", title: "Go live", text: "Your dedicated team starts answering calls on your schedule." },
];

/* ------------------------------------------------------------------ */
/*  Reveal (one gentle entrance per block, respects reduced motion)    */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sv-reveal ${visible ? "is-in" : ""} ${stagger ? "sv-stagger" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      <main className="sv">
        {/* ============ HERO ============ */}
        <section className="sv-hero">
          <div className="sv-wrap sv-hero-grid">
            <div className="sv-hero-copy">
              <span className="sv-pill">
                <span className="sv-dot" />
                Our services
              </span>
              <h1 className="sv-h1">
                Patient calls answered, <span>schedules kept full</span>, so your front desk can breathe.
              </h1>
              <p className="sv-lead">
                A Pakistan-based medical receptionist team covering US hours. We handle inbound and outbound patient
                calls, scheduling and cancellations, reminders and EHR-authorized support, using clinic-approved
                procedures and privacy-conscious workflows.
              </p>
              <div className="sv-actions">
                <a href="#contact" className="sv-btn sv-btn--primary">
                  Book a call <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#services-grid" className="sv-btn sv-btn--secondary">
                  Explore services
                </a>
              </div>
              <p className="sv-micro">Clinic-approved scripts · Least-privilege EHR access · Human receptionists</p>
            </div>

            {/* Illustrative front-desk card */}
            <div className="sv-hero-art" aria-hidden="true">
              <div className="sv-orb" />
              <div className="sv-panel">
                <div className="sv-panel-head">
                  <div>
                    <div className="sv-panel-title">Front desk queue</div>
                    <div className="sv-panel-sub">Illustrative example</div>
                  </div>
                  <span className="sv-live">On shift</span>
                </div>

                <div className="sv-row">
                  <span className="sv-row-icon sv-row-icon--blue"><PhoneIncoming size={18} /></span>
                  <div>
                    <strong>New patient call</strong>
                    <small>Booked with Dr. Henry, Tue 10:30</small>
                  </div>
                  <Check className="sv-row-check" size={18} strokeWidth={3} />
                </div>
                <div className="sv-row">
                  <span className="sv-row-icon sv-row-icon--teal"><PhoneOutgoing size={18} /></span>
                  <div>
                    <strong>Confirmation calls</strong>
                    <small>Tomorrow&apos;s appointments</small>
                  </div>
                  <Check className="sv-row-check" size={18} strokeWidth={3} />
                </div>
                <div className="sv-row">
                  <span className="sv-row-icon sv-row-icon--amber"><CalendarX size={18} /></span>
                  <div>
                    <strong>Cancellation</strong>
                    <small>Slot offered to waitlist</small>
                  </div>
                  <Check className="sv-row-check" size={18} strokeWidth={3} />
                </div>
              </div>

              <div className="sv-float">
                <Phone size={16} />
                <div>
                  <b>No voicemail</b>
                  <span>Live answer, every call</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services-grid" className="sv-section sv-section--alt">
          <div className="sv-wrap">
            <Reveal className="sv-head">
              <span className="sv-kicker">What we cover</span>
              <h2 className="sv-h2">Six services, one calm front desk.</h2>
              <p className="sv-sub">
                Everything a US clinic needs to stop missing calls, handled by a trained team that works your hours.
              </p>
            </Reveal>

            <Reveal stagger className="sv-cards">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <article key={s.id} className="sv-card">
                    <span className={`sv-icon sv-icon--${s.tone}`}>
                      <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <ul>
                      {s.points.map((pt) => (
                        <li key={pt}>
                          <span className="sv-tick" aria-hidden="true">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </Reveal>
          </div>
        </section>

        {/* ============ DARK PANEL ============ */}
        <section className="sv-section">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-dark">
                <span className="sv-ring" aria-hidden="true" />
                <div className="sv-dark-inner">
                  <span className="sv-kicker sv-kicker--light">Why clinics switch</span>
                  <h2>Fewer missed calls. Fuller schedules. A calmer front desk.</h2>
                  <p>
                    Your team stops juggling ringing phones and starts focusing on the patients in front of them.
                    Every call is answered, every booking is logged and every follow-up happens on time.
                  </p>
                  <div className="sv-chips">
                    {["Coverage on US hours", "Clinic-approved rules", "EHR-authorized access"].map((c) => (
                      <span key={c} className="sv-chip">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ BENEFITS ============ */}
        <section className="sv-section sv-section--alt">
          <div className="sv-wrap sv-two">
            <Reveal className="sv-two-copy">
              <span className="sv-kicker">The payoff</span>
              <h2 className="sv-h2">What changes in the first 30 days.</h2>
              <p className="sv-sub">
                We don&apos;t just answer phones. We protect your schedule and your patients&apos; experience.
              </p>
            </Reveal>

            <Reveal className="sv-benefits">
              {BENEFITS.map((b) => (
                <div key={b.title} className="sv-benefit">
                  <span className="sv-tick sv-tick--lg" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ============ STEPS ============ */}
        <section className="sv-section">
          <div className="sv-wrap">
            <Reveal className="sv-head">
              <span className="sv-kicker">Getting started</span>
              <h2 className="sv-h2">Live in three simple steps.</h2>
            </Reveal>

            <Reveal stagger className="sv-steps">
              {STEPS.map((s) => (
                <div key={s.label} className="sv-step">
                  <span className="sv-step-label">{s.label}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section id="contact" className="sv-section sv-section--tight">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-cta">
                <div className="sv-cta-copy">
                  <h2>Ready to stop missing calls?</h2>
                  <p>Book a 20-minute call and we&apos;ll show you exactly how coverage would work for your clinic.</p>
                </div>
                <a href="/contact" className="sv-btn sv-btn--white">
                  Book a call <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ STYLES ============
            Everything is scoped under .sv and written as plain CSS so global
            resets (padding:0, a{color:inherit}, h2{color:...}) cannot
            override button padding or text colors on dark backgrounds. */}
        <style jsx global>{`
          .sv {
            --navy: #102a43;
            --blue: #2864dc;
            --blue-dark: #1d4fb5;
            --teal: #1c9b91;
            --teal-text: #147a72;
            --ink: #183247;
            --muted: #566b80;
            --pale: #f2f7fb;
            --line: #dce6ef;
            --mint: #dff6f0;
            background: #fff;
            color: var(--ink);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
          }
          .sv *,
          .sv *::before,
          .sv *::after {
            box-sizing: border-box;
          }
          .sv .sv-wrap {
            width: min(1120px, calc(100% - 40px));
            margin-inline: auto;
          }

          /* ---------- Buttons ---------- */
          .sv .sv-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 50px;
            padding: 14px 26px;
            border-radius: 12px;
            border: 1px solid transparent;
            font-family: inherit;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.2;
            text-decoration: none;
            white-space: nowrap;
            cursor: pointer;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease,
              border-color 0.15s ease;
          }
          .sv .sv-btn:hover {
            transform: translateY(-1px);
          }
          .sv .sv-btn:focus-visible {
            outline: 3px solid rgba(40, 100, 220, 0.45);
            outline-offset: 3px;
          }
          .sv a.sv-btn.sv-btn--primary,
          .sv a.sv-btn.sv-btn--primary:visited {
            background: var(--blue);
            color: #fff;
            box-shadow: 0 8px 20px rgba(40, 100, 220, 0.28);
          }
          .sv a.sv-btn.sv-btn--primary:hover {
            background: var(--blue-dark);
            color: #fff;
          }
          .sv a.sv-btn.sv-btn--secondary,
          .sv a.sv-btn.sv-btn--secondary:visited {
            background: #fff;
            color: var(--navy);
            border-color: #c9d8e5;
          }
          .sv a.sv-btn.sv-btn--secondary:hover {
            border-color: var(--blue);
            color: var(--blue-dark);
          }
          .sv a.sv-btn.sv-btn--white,
          .sv a.sv-btn.sv-btn--white:visited {
            background: #fff;
            color: var(--navy);
            box-shadow: 0 10px 24px rgba(8, 26, 48, 0.22);
          }
          .sv a.sv-btn.sv-btn--white:hover {
            color: var(--navy);
            box-shadow: 0 14px 30px rgba(8, 26, 48, 0.3);
          }

          /* ---------- Hero ---------- */
          .sv .sv-hero {
            position: relative;
            padding: 72px 0 84px;
            background: radial-gradient(circle at 88% 18%, #d8f6f0 0, transparent 34%),
              linear-gradient(135deg, #f4f8ff, #f5fbfa);
            overflow: hidden;
          }
          .sv .sv-hero-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 56px;
            align-items: center;
          }
          .sv .sv-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 14px;
            background: #fff;
            border: 1px solid #cde3f1;
            border-radius: 999px;
            color: #2c6788;
            font-size: 13px;
            font-weight: 700;
          }
          .sv .sv-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--teal);
          }
          .sv .sv-h1 {
            margin: 20px 0 20px;
            color: var(--navy);
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 800;
            line-height: 1.08;
            letter-spacing: -0.04em;
            max-width: 14em;
          }
          .sv .sv-h1 span {
            color: var(--blue);
          }
          .sv .sv-lead {
            margin: 0 0 30px;
            max-width: 56ch;
            color: #4a6075;
            font-size: 17px;
            line-height: 1.65;
          }
          .sv .sv-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }
          .sv .sv-micro {
            margin: 18px 0 0;
            color: var(--muted);
            font-size: 13px;
          }

          /* Hero art */
          .sv .sv-hero-art {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
          }
          .sv .sv-orb {
            position: absolute;
            top: 4%;
            right: 4%;
            width: 310px;
            height: 310px;
            border-radius: 50%;
            background: linear-gradient(145deg, #c8eee9, #e1eaff);
          }
          .sv .sv-panel {
            position: relative;
            z-index: 1;
            width: min(400px, 100%);
            padding: 22px;
            background: #fff;
            border: 1px solid #e2eaf2;
            border-radius: 20px;
            box-shadow: 0 28px 60px rgba(22, 58, 91, 0.18);
          }
          .sv .sv-panel-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding-bottom: 16px;
          }
          .sv .sv-panel-title {
            color: var(--navy);
            font-weight: 800;
          }
          .sv .sv-panel-sub {
            margin-top: 2px;
            color: #6b7e90;
            font-size: 12px;
          }
          .sv .sv-live {
            padding: 5px 10px;
            border-radius: 999px;
            background: #e5f8f2;
            color: #0f6f60;
            font-size: 11px;
            font-weight: 800;
          }
          .sv .sv-row {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 13px 0;
            border-top: 1px solid #edf1f5;
          }
          .sv .sv-row strong {
            display: block;
            color: var(--navy);
            font-size: 14px;
          }
          .sv .sv-row small {
            color: #6b7e90;
            font-size: 12px;
          }
          .sv .sv-row-icon {
            flex: none;
            display: grid;
            place-items: center;
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }
          .sv .sv-row-icon--blue { background: #e9f1ff; color: var(--blue); }
          .sv .sv-row-icon--teal { background: #e3f8f2; color: #168c7c; }
          .sv .sv-row-icon--amber { background: #fff2df; color: #a8680f; }
          .sv .sv-row-check {
            margin-left: auto;
            flex: none;
            color: #138777;
          }
          .sv .sv-float {
            position: absolute;
            z-index: 2;
            left: -6px;
            bottom: 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            background: #fff;
            border: 1px solid #e2eaf2;
            border-radius: 14px;
            box-shadow: 0 14px 30px rgba(22, 58, 91, 0.14);
            color: var(--teal-text);
            font-size: 12px;
          }
          .sv .sv-float b {
            display: block;
            color: var(--navy);
            font-size: 14px;
          }
          .sv .sv-float span {
            color: #6b7e90;
          }

          /* ---------- Sections ---------- */
          .sv .sv-section {
            padding: 84px 0;
            background: #fff;
          }
          .sv .sv-section--alt {
            background: var(--pale);
          }
          .sv .sv-section--tight {
            padding-top: 20px;
          }
          .sv .sv-head {
            max-width: 680px;
            margin: 0 auto 44px;
            text-align: center;
          }
          .sv .sv-kicker {
            display: inline-block;
            color: var(--teal-text);
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .sv .sv-kicker--light {
            color: #8fe6d6;
          }
          .sv .sv-h2 {
            margin: 12px 0 14px;
            color: var(--navy);
            font-size: clamp(28px, 3.6vw, 40px);
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: -0.03em;
          }
          .sv .sv-sub {
            margin: 0;
            max-width: 58ch;
            color: var(--muted);
            font-size: 16px;
            line-height: 1.65;
          }
          .sv .sv-head .sv-sub {
            margin-inline: auto;
          }

          /* ---------- Cards ---------- */
          .sv .sv-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
          }
          .sv .sv-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 28px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 18px;
            box-shadow: 0 8px 24px rgba(21, 59, 90, 0.06);
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .sv .sv-card:hover {
            border-color: #bcd3e6;
            box-shadow: 0 16px 36px rgba(21, 59, 90, 0.11);
          }
          .sv .sv-icon {
            display: grid;
            place-items: center;
            width: 48px;
            height: 48px;
            margin-bottom: 18px;
            border-radius: 14px;
          }
          .sv .sv-icon--blue { background: #e9f1ff; color: var(--blue); }
          .sv .sv-icon--teal { background: #e3f8f2; color: #168c7c; }
          .sv .sv-icon--amber { background: #fff2df; color: #a8680f; }
          .sv .sv-card h3 {
            margin: 0 0 8px;
            color: var(--navy);
            font-size: 19px;
            font-weight: 700;
            letter-spacing: -0.01em;
          }
          .sv .sv-card p {
            margin: 0 0 18px;
            color: var(--muted);
            font-size: 14.5px;
            line-height: 1.6;
          }
          .sv .sv-card ul {
            list-style: none;
            margin: auto 0 0;
            padding: 18px 0 0;
            border-top: 1px solid #edf1f5;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .sv .sv-card li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: var(--ink);
            font-size: 13.5px;
            line-height: 1.45;
          }
          .sv .sv-tick {
            flex: none;
            display: inline-grid;
            place-items: center;
            width: 18px;
            height: 18px;
            margin-top: 1px;
            border-radius: 50%;
            background: var(--mint);
            color: var(--teal-text);
          }
          .sv .sv-tick--lg {
            width: 26px;
            height: 26px;
            margin-top: 0;
          }

          /* ---------- Dark panel (explicit light text) ---------- */
          .sv .sv-dark {
            position: relative;
            overflow: hidden;
            padding: 52px 48px;
            border-radius: 24px;
            background: linear-gradient(135deg, #102a43, #153a5c);
            color: #ffffff;
            box-shadow: 0 24px 60px rgba(16, 42, 67, 0.22);
          }
          .sv .sv-ring {
            position: absolute;
            right: -80px;
            bottom: -100px;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            border: 34px solid rgba(255, 255, 255, 0.06);
            pointer-events: none;
          }
          .sv .sv-dark-inner {
            position: relative;
            z-index: 1;
            max-width: 680px;
          }
          .sv .sv-dark h2 {
            margin: 14px 0 16px;
            color: #ffffff;
            font-size: clamp(26px, 3.2vw, 34px);
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.02em;
          }
          .sv .sv-dark p {
            margin: 0 0 26px;
            color: #d3e2f0;
            font-size: 16px;
            line-height: 1.7;
          }
          .sv .sv-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .sv .sv-chip {
            display: inline-flex;
            align-items: center;
            padding: 8px 14px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.28);
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
          }

          /* ---------- Benefits ---------- */
          .sv .sv-two {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: start;
          }
          .sv .sv-benefits {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .sv .sv-benefit {
            display: flex;
            gap: 16px;
            align-items: flex-start;
            padding: 20px 22px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 16px;
          }
          .sv .sv-benefit h3 {
            margin: 0 0 4px;
            color: var(--navy);
            font-size: 16px;
            font-weight: 700;
          }
          .sv .sv-benefit p {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.6;
          }

          /* ---------- Steps ---------- */
          .sv .sv-steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
          }
          .sv .sv-step {
            padding: 28px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 18px;
            border-top: 4px solid var(--teal);
          }
          .sv .sv-step-label {
            color: var(--teal-text);
            font-size: 13px;
            font-weight: 800;
          }
          .sv .sv-step h3 {
            margin: 8px 0 8px;
            color: var(--navy);
            font-size: 19px;
            font-weight: 700;
          }
          .sv .sv-step p {
            margin: 0;
            color: var(--muted);
            font-size: 14.5px;
            line-height: 1.6;
          }

          /* ---------- CTA band (explicit light text) ---------- */
          .sv .sv-cta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 28px;
            padding: 44px 48px;
            border-radius: 24px;
            background: linear-gradient(120deg, #1e4ca6, #1c8d87);
            color: #ffffff;
            box-shadow: 0 24px 56px rgba(22, 92, 122, 0.22);
          }
          .sv .sv-cta h2 {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: clamp(24px, 3vw, 32px);
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.02em;
          }
          .sv .sv-cta p {
            margin: 0;
            max-width: 52ch;
            color: #e6f1ff;
            font-size: 16px;
            line-height: 1.65;
          }

          /* ---------- Reveal: one soft entrance ---------- */
          .sv .sv-reveal {
            opacity: 0;
            transform: translateY(14px);
            transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .sv .sv-reveal.is-in {
            opacity: 1;
            transform: none;
          }
          .sv .sv-stagger > * {
            opacity: 0;
            transform: translateY(14px);
            transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .sv .sv-stagger.is-in > * { opacity: 1; transform: none; }
          .sv .sv-stagger.is-in > *:nth-child(2) { transition-delay: 60ms; }
          .sv .sv-stagger.is-in > *:nth-child(3) { transition-delay: 120ms; }
          .sv .sv-stagger.is-in > *:nth-child(4) { transition-delay: 180ms; }
          .sv .sv-stagger.is-in > *:nth-child(5) { transition-delay: 240ms; }
          .sv .sv-stagger.is-in > *:nth-child(6) { transition-delay: 300ms; }
          .sv .sv-stagger.sv-reveal { opacity: 1; transform: none; }

          /* ---------- Responsive ---------- */
          @media (max-width: 980px) {
            .sv .sv-cards { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 860px) {
            .sv .sv-hero { padding: 52px 0 60px; }
            .sv .sv-hero-grid,
            .sv .sv-two { grid-template-columns: 1fr; gap: 36px; }
            .sv .sv-hero-art { min-height: 340px; }
            .sv .sv-orb { width: 250px; height: 250px; right: 8%; }
            .sv .sv-steps { grid-template-columns: 1fr; }
            .sv .sv-section { padding: 60px 0; }
            .sv .sv-section--tight { padding-top: 10px; }
            .sv .sv-cta { flex-direction: column; align-items: flex-start; padding: 34px 28px; }
            .sv .sv-dark { padding: 38px 28px; }
          }
          @media (max-width: 600px) {
            .sv .sv-cards { grid-template-columns: 1fr; }
            .sv .sv-actions { flex-direction: column; }
            .sv .sv-actions .sv-btn,
            .sv .sv-cta .sv-btn { width: 100%; }
            .sv .sv-card,
            .sv .sv-step { padding: 22px 20px; }
            .sv .sv-panel { padding: 16px; }
            .sv .sv-float { left: 0; bottom: 6px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .sv .sv-reveal,
            .sv .sv-stagger > *,
            .sv .sv-btn,
            .sv .sv-card {
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}
