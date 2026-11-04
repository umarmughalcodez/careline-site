"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact";
import styles from "./ContactPage.module.css";

const STORAGE_KEY = "careline-contact-form";

const roleOptions = [
  "Practice owner",
  "Practice manager",
  "Front-desk lead",
  "Other",
] as const;

const practiceTypeOptions = [
  "Primary care",
  "Dental",
  "Dermatology",
  "Pediatrics",
  "Mental health",
  "Physical therapy",
  "Other",
] as const;

const providerOptions = ["1", "2–5", "6–10", "10+"] as const;
const coverageOptions = [
  "Weekday call support",
  "Extended-hour coverage",
  "Overflow call handling",
  "After-hours coverage",
  "24/7 discussion",
] as const;
const timeOptions = ["Morning", "Afternoon", "Evening", "Any time"] as const;
const preferredContactOptions = ["Email", "Phone"] as const;

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [toast, setToast] = useState("");
  const [savedSummary, setSavedSummary] = useState<ContactFormValues | null>(null);
  const mountedRef = useRef(false);

  const { register, handleSubmit, setValue, setFocus, reset, formState, getValues, control } =
    useForm<ContactFormValues>({
      resolver: zodResolver(contactSchema),
      defaultValues: {
        name: "",
        clinicName: "",
        workEmail: "",
        phone: "",
        role: "Practice owner",
        practiceType: "Primary care",
        providers: "1",
        coverage: [],
        schedulingSoftware: "",
        preferredContactMethod: "Email",
        preferredTime: "Any time",
        message: "",
        consent: false,
        honeypot: "",
      },
      mode: "onBlur",
    });

  const values = useWatch({ control });

  useEffect(() => {
    if (typeof window === "undefined") return;
    mountedRef.current = true;

    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<ContactFormValues>;
      reset(parsed);
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [reset]);

  useEffect(() => {
    if (!mountedRef.current || typeof window === "undefined") return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const requiredProgress = useMemo(() => {
    const requiredFields = [
      values.name,
      values.clinicName,
      values.workEmail,
      values.role,
      values.practiceType,
      values.providers,
      values.preferredContactMethod,
      values.preferredTime,
      values.consent,
    ] as const;

    const completed = requiredFields.filter(Boolean).length;
    return `${completed}/9`;
  }, [values]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    setValue("phone", formatted, { shouldValidate: true, shouldDirty: true });
  };

  const toggleCoverage = (value: string) => {
    const current = values.coverage ?? [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setValue("coverage", updated, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data: ContactFormValues) => {
    if (data.honeypot) {
      setSubmitError("Submission rejected.");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();

      if (!response.ok) {
        const rawErrors = (payload?.errors ?? {}) as Record<string, string[]>;
        const keys = Object.keys(rawErrors);
        const firstValue = keys.length > 0 ? rawErrors[keys[0]]?.[0] : undefined;
        setSubmitError(firstValue || payload?.message || "Something went wrong. Please try again.");
        if (keys.length > 0) {
          const target = keys[0] as keyof ContactFormValues;
          setFocus(target);
        }
        return;
      }

      setSavedSummary(data);
      setIsSuccess(true);
      window.sessionStorage.removeItem(STORAGE_KEY);
      setToast("Inquiry sent");
      reset({
        name: "",
        clinicName: "",
        workEmail: "",
        phone: "",
        role: "Practice owner",
        practiceType: "Primary care",
        providers: "1",
        coverage: [],
        schedulingSoftware: "",
        preferredContactMethod: "Email",
        preferredTime: "Any time",
        message: "",
        consent: false,
        honeypot: "",
      });
    } catch {
      setSubmitError("We couldn’t send this message. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors: Record<string, { message?: string }>) => {
    const firstKey = Object.keys(errors)[0] as keyof ContactFormValues | undefined;
    if (firstKey) {
      setFocus(firstKey);
    }
  };

  const renderFieldState = (fieldName: keyof ContactFormValues) => {
    const hasValue = !!getValues(fieldName);
    const hasError = !!formState.errors[fieldName]?.message;
    if (hasError) return "error";
    if (hasValue) return "valid";
    return "idle";
  };

  if (isSuccess && savedSummary) {
    return (
      <div className={styles.successCard} aria-live="polite">
        <div className={styles.successBurst} aria-hidden="true">
          <Sparkles size={24} />
        </div>
        <div className={styles.successCheckWrap}>
          <CheckCircle2 size={36} />
        </div>
        <h3>Thank you! We&apos;ll be in touch within one business day.</h3>
        <p>Your message has been prepared for follow-up. Here&apos;s a quick recap of what you shared:</p>
        <div className={styles.successSummary}>
          <div><span>Clinic</span><strong>{savedSummary.clinicName}</strong></div>
          <div><span>Contact</span><strong>{savedSummary.name}</strong></div>
          <div><span>Coverage</span><strong>{savedSummary.coverage.join(", ") || "Not specified"}</strong></div>
        </div>
        <button
          type="button"
          className="btn secondary"
          onClick={() => {
            setIsSuccess(false);
            setSubmittedToast();
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.formCard} id="form">
        <div className={styles.formHeader}>
          <div>
            <div className={styles.formTitle}>Send us a message</div>
            <p>Takes about a minute</p>
          </div>
          <div className={styles.progressPill}>{requiredProgress}</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.formGrid} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="name">Full name</label>
            <div className={`${styles.inputWrap} ${renderFieldState("name") === "error" ? styles.inputError : ""}`}>
              <input
                id="name"
                {...register("name")}
                aria-invalid={!!formState.errors.name}
                aria-describedby={formState.errors.name ? "name-error" : undefined}
                placeholder="Dr. Sarah Mitchell"
              />
              {renderFieldState("name") === "valid" && <Check size={16} className={styles.validIcon} />}
            </div>
            {formState.errors.name && <span id="name-error" className={styles.errorText}>{formState.errors.name.message}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="clinicName">Clinic name</label>
            <div className={`${styles.inputWrap} ${renderFieldState("clinicName") === "error" ? styles.inputError : ""}`}>
              <input
                id="clinicName"
                {...register("clinicName")}
                aria-invalid={!!formState.errors.clinicName}
                aria-describedby={formState.errors.clinicName ? "clinicName-error" : undefined}
                placeholder="Northwest Family Medicine"
              />
              {renderFieldState("clinicName") === "valid" && <Check size={16} className={styles.validIcon} />}
            </div>
            {formState.errors.clinicName && (
              <span id="clinicName-error" className={styles.errorText}>{formState.errors.clinicName.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="workEmail">Work email</label>
            <div className={`${styles.inputWrap} ${renderFieldState("workEmail") === "error" ? styles.inputError : ""}`}>
              <input
                id="workEmail"
                type="email"
                {...register("workEmail")}
                aria-invalid={!!formState.errors.workEmail}
                aria-describedby={formState.errors.workEmail ? "workEmail-error" : undefined}
                placeholder="s.mitchell@clinic.com"
              />
              {renderFieldState("workEmail") === "valid" && <Check size={16} className={styles.validIcon} />}
            </div>
            {formState.errors.workEmail && (
              <span id="workEmail-error" className={styles.errorText}>{formState.errors.workEmail.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="phone">Phone</label>
            <div className={`${styles.inputWrap} ${renderFieldState("phone") === "error" ? styles.inputError : ""}`}>
              <input
                id="phone"
                {...register("phone")}
                onChange={handlePhoneChange}
                placeholder="(415) 555-0147"
                aria-invalid={!!formState.errors.phone}
                aria-describedby={formState.errors.phone ? "phone-error" : undefined}
              />
              {renderFieldState("phone") === "valid" && <Check size={16} className={styles.validIcon} />}
            </div>
            {formState.errors.phone && <span id="phone-error" className={styles.errorText}>{formState.errors.phone.message}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="role">Role</label>
            <div className={`${styles.selectWrap} ${renderFieldState("role") === "error" ? styles.inputError : ""}`}>
              <select id="role" {...register("role")} aria-invalid={!!formState.errors.role}>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            {formState.errors.role && <span className={styles.errorText}>{formState.errors.role.message}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="practiceType">Practice type</label>
            <div className={`${styles.selectWrap} ${renderFieldState("practiceType") === "error" ? styles.inputError : ""}`}>
              <select id="practiceType" {...register("practiceType")} aria-invalid={!!formState.errors.practiceType}>
                {practiceTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {formState.errors.practiceType && <span className={styles.errorText}>{formState.errors.practiceType.message}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="providers">Number of providers</label>
            <div className={`${styles.selectWrap} ${renderFieldState("providers") === "error" ? styles.inputError : ""}`}>
              <select id="providers" {...register("providers")} aria-invalid={!!formState.errors.providers}>
                {providerOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {formState.errors.providers && <span className={styles.errorText}>{formState.errors.providers.message}</span>}
          </div>

          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label>Coverage needed</label>
            <div className={styles.chipGrid}>
              {coverageOptions.map((option) => {
                const selected = (values.coverage ?? []).includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                    onClick={() => toggleCoverage(option)}
                    aria-pressed={selected}
                  >
                    <span>{option}</span>
                    {selected && <Check size={14} />}
                  </button>
                );
              })}
            </div>
            {formState.errors.coverage && <span className={styles.errorText}>{formState.errors.coverage.message}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="schedulingSoftware">Current scheduling software</label>
            <div className={styles.inputWrap}>
              <input
                id="schedulingSoftware"
                {...register("schedulingSoftware")}
                placeholder="Athenahealth, Dentrix, etc."
              />
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label>Preferred contact method</label>
            <div className={styles.radioGrid}>
              {preferredContactOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.radioCard} ${values.preferredContactMethod === option ? styles.radioCardSelected : ""}`}
                  onClick={() => setValue("preferredContactMethod", option, { shouldValidate: true })}
                >
                  <span>{option}</span>
                  {values.preferredContactMethod === option && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label>Preferred time</label>
            <div className={styles.radioGrid}>
              {timeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.radioCard} ${values.preferredTime === option ? styles.radioCardSelected : ""}`}
                  onClick={() => setValue("preferredTime", option, { shouldValidate: true })}
                >
                  <span>{option}</span>
                  {values.preferredTime === option && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label htmlFor="message">Message</label>
            <div className={`${styles.textareaWrap} ${renderFieldState("message") === "error" ? styles.inputError : ""}`}>
              <textarea
                id="message"
                {...register("message")}
                maxLength={600}
                placeholder="For example: overflow support for lunch hour, appointment intake help, or after-hours call coverage."
                aria-invalid={!!formState.errors.message}
              />
              <div className={styles.counter}>{(values.message || "").length}/600</div>
            </div>
            {formState.errors.message && <span className={styles.errorText}>{formState.errors.message.message}</span>}
          </div>

          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label className={styles.checkboxRow}>
              <input type="checkbox" {...register("consent")} aria-invalid={!!formState.errors.consent} />
              <span>I agree to be contacted about my inquiry.</span>
            </label>
            <div className={styles.privacyRow}>
              <ShieldCheck size={14} />
              <a href="/privacy-policy">Privacy note</a>
            </div>
            {formState.errors.consent && <span className={styles.errorText}>{formState.errors.consent.message}</span>}
          </div>

          <input type="text" className={styles.honeypot} tabIndex={-1} autoComplete="off" {...register("honeypot")} />

          {submitError && <div className={styles.serverError}>{submitError}</div>}

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send inquiry</span>
                <Send size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={styles.toast}
            aria-live="polite"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function setSubmittedToast() {
    setToast("Ready to send another message");
  }
}
