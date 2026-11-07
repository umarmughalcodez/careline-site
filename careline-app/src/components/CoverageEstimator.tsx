"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, PhoneCall } from "lucide-react";
import styles from "./CoverageEstimator.module.css";

type Period = "week" | "month" | "year";

const periods: { value: Period; label: string; days: number }[] = [
  { value: "week", label: "Per week", days: 7 },
  { value: "month", label: "Per month", days: 30 },
  { value: "year", label: "Per year", days: 365 },
];

const CALL_STEP = 25;
const RATE_MIN = 300;
const RATE_STEP = 20;
const numberFormat = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
const decimalFormat = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 2 });
const formatPkr = (amount: number) => `PKR ${numberFormat.format(Math.round(amount))}`;

export default function CoverageEstimator() {
  const [callsInput, setCallsInput] = useState("250");
  const [rateInput, setRateInput] = useState(String(RATE_MIN));
  const [callMinutes, setCallMinutes] = useState(5);
  const [period, setPeriod] = useState<Period>("month");

  const calls = Number.isFinite(Number(callsInput)) ? Math.max(0, Number(callsInput)) : 0;
  const rate = Number.isFinite(Number(rateInput)) ? Math.max(RATE_MIN, Number(rateInput)) : RATE_MIN;
  const callsRangeMax = Math.max(1000, Math.ceil(calls / 1000) * 1000);
  const callsSliderValue = Math.min(callsRangeMax, Math.round(calls / CALL_STEP) * CALL_STEP);
  const rateRangeMax = Math.max(
    RATE_MIN + RATE_STEP * 250,
    RATE_MIN + Math.ceil(Math.max(0, rate - RATE_MIN) / RATE_STEP) * RATE_STEP
  );
  const rateSliderValue = Math.min(
    rateRangeMax,
    RATE_MIN + Math.round((rate - RATE_MIN) / RATE_STEP) * RATE_STEP
  );
  const selectedPeriod = periods.find((option) => option.value === period) ?? periods[1];
  const monthlyCalls = (calls / selectedPeriod.days) * 30;
  const yearlyCalls = (calls / selectedPeriod.days) * 365;
  const periodEstimate = (calls * callMinutes * rate) / 60;
  const monthlyEstimate = (monthlyCalls * callMinutes * rate) / 60;
  const yearlyEstimate = (yearlyCalls * callMinutes * rate) / 60;
  const monthlyHours = (monthlyCalls * callMinutes) / 60;
  const ratePerMinute = rate / 60;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> Coverage planning</div>
            <h1>Put a number on your call coverage.</h1>
            <p>
              Explore weekly, monthly, or yearly coverage costs using your call volume, average call length, and an
              hourly coverage rate.
            </p>
            <a className="btn" href="#estimator">
              Build an estimate <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.heroNote}>
            <span className={styles.noteIcon}><PhoneCall size={20} aria-hidden="true" /></span>
            <div>
              <span className={styles.noteLabel}>Starting rate assumption</span>
              <strong>PKR 300 <small>/ hour</small></strong>
              <p>That is PKR 5 per minute. Adjust the hourly rate in PKR 20 steps.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.estimatorSection} id="estimator" aria-labelledby="estimator-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>Your estimate</span>
            <h2 id="estimator-title">Adjust the numbers to fit your clinic</h2>
            <p>Change any input to see the estimate update instantly.</p>
          </div>

          <div className={styles.estimator}>
            <div className={styles.inputs}>
              <div className={styles.field}>
                <label htmlFor="call-volume">Calls in this period</label>
                <div className={styles.numberInput}>
                  <PhoneCall size={18} aria-hidden="true" />
                  <input
                    id="call-volume"
                    type="number"
                    min="0"
                    max="1000000"
                    step={CALL_STEP}
                    inputMode="numeric"
                    value={callsInput}
                    onChange={(event) => setCallsInput(event.target.value)}
                    onBlur={() => setCallsInput(String(callsSliderValue))}
                  />
                  <span>calls</span>
                </div>
                <input
                  id="call-volume-range"
                  className={styles.rangeInput}
                  type="range"
                  min="0"
                  max={callsRangeMax}
                  step={CALL_STEP}
                  value={callsSliderValue}
                  aria-label="Adjust calls in this period"
                  aria-valuetext={`${numberFormat.format(callsSliderValue)} calls`}
                  onChange={(event) => setCallsInput(event.target.value)}
                />
                <div className={styles.rangeEnds} aria-hidden="true">
                  <span>0 calls</span>
                  <span>{numberFormat.format(callsRangeMax)} calls</span>
                </div>
                <span className={styles.hint}>Use your average answered or covered calls.</span>
              </div>

              <fieldset className={styles.periodField}>
                <legend>How often is that?</legend>
                <div className={styles.periodOptions}>
                  {periods.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={period === option.value}
                      className={period === option.value ? styles.selectedPeriod : ""}
                      onClick={() => setPeriod(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className={styles.field}>
                <div className={styles.rangeHeader}>
                  <label htmlFor="call-duration">Average call duration</label>
                  <output htmlFor="call-duration" className={styles.rangeValue}>{callMinutes} min / call</output>
                </div>
                <input
                  id="call-duration"
                  className={styles.rangeInput}
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={callMinutes}
                  aria-valuetext={`${callMinutes} minutes per call`}
                  onChange={(event) => setCallMinutes(Number(event.target.value))}
                />
                <div className={styles.rangeEnds} aria-hidden="true">
                  <span>1 minute</span>
                  <span>15 minutes</span>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="call-rate">Hourly coverage rate</label>
                <div className={styles.rateInput}>
                  <span aria-hidden="true">PKR</span>
                  <input
                    id="call-rate"
                    type="number"
                    min={RATE_MIN}
                    max="1000000"
                    step={RATE_STEP}
                    inputMode="decimal"
                    value={rateInput}
                    onChange={(event) => setRateInput(event.target.value)}
                    onBlur={() => {
                      const snappedRate = RATE_MIN + Math.round((rate - RATE_MIN) / RATE_STEP) * RATE_STEP;
                      setRateInput(String(snappedRate));
                    }}
                  />
                  <span className={styles.rateUnit}>per hour</span>
                </div>
                <input
                  id="call-rate-range"
                  className={styles.rangeInput}
                  type="range"
                  min={RATE_MIN}
                  max={rateRangeMax}
                  step={RATE_STEP}
                  value={rateSliderValue}
                  aria-label="Adjust hourly coverage rate"
                  aria-valuetext={`${formatPkr(rateSliderValue)} per hour, ${decimalFormat.format(rateSliderValue / 60)} PKR per minute`}
                  onChange={(event) => setRateInput(event.target.value)}
                />
                <div className={styles.rangeEnds} aria-hidden="true">
                  <span>PKR {RATE_MIN} / hr</span>
                  <span>{formatPkr(rateRangeMax)} / hr</span>
                </div>
                <span className={styles.hint}>
                  About PKR {decimalFormat.format(ratePerMinute)} per minute at this hourly rate.
                </span>
              </div>

              <div className={styles.rateNote}>
                <Clock3 size={17} aria-hidden="true" />
                <p>Estimate uses your selected call length. Timeframe comparisons use 30 days per month and 365 days per year.</p>
              </div>
            </div>

            <aside className={styles.results} aria-live="polite" aria-atomic="true">
              <div className={styles.resultTopline}>
                <span>Estimated coverage cost</span>
                <span className={styles.resultIcon}><CalendarDays size={18} aria-hidden="true" /></span>
              </div>
              <div className={styles.primaryTotal}>
                <strong>~ {formatPkr(periodEstimate)}</strong>
                <span>{selectedPeriod.label.toLowerCase()}</span>
              </div>
              <div className={styles.resultRows}>
                <div><span>Estimated calls / month</span><strong>~ {numberFormat.format(Math.round(monthlyCalls))}</strong></div>
                <div><span>Estimated call time / month</span><strong>~ {decimalFormat.format(monthlyHours)} hrs</strong></div>
                <div><span>Monthly equivalent</span><strong>~ {formatPkr(monthlyEstimate)}</strong></div>
                <div><span>Yearly equivalent</span><strong>~ {formatPkr(yearlyEstimate)}</strong></div>
              </div>
              <p className={styles.disclaimer}>
                Approximate planning estimate based on call duration and the selected hourly rate. Your final quote may vary with coverage hours and agreed scope.
              </p>
              <a className={styles.resultCta} href="/contact">
                Discuss this estimate <ArrowRight size={17} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.detailsSection} aria-labelledby="estimate-details-title">
        <div className={`container ${styles.detailsInner}`}>
          <div className={styles.detailsIntro}>
            <span className={styles.kicker}>A useful starting point</span>
            <h2 id="estimate-details-title">Simple math, clear assumptions.</h2>
            <p>Use this as a first pass at your call budget. We can refine it together around the hours and tasks your team needs covered.</p>
          </div>
          <div className={styles.detailList}>
            <article>
              <span>01</span>
              <div><h3>Choose your call volume</h3><p>Enter the calls you expect in a typical week, month, or year.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>Set a coverage rate</h3><p>Start at PKR 300 per hour, equivalent to PKR 5 per minute, then adjust in PKR 20 increments.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>Confirm your coverage scope</h3><p>Hours, workflows, and any additional services can affect a final proposal.</p></div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}