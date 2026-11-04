import { z } from "zod";

const roleOptions = ["Practice owner", "Practice manager", "Front-desk lead", "Other"] as const;
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
const contactMethodOptions = ["Email", "Phone"] as const;
const timeOptions = ["Morning", "Afternoon", "Evening", "Any time"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  clinicName: z.string().trim().min(2, "Please tell us your clinic name."),
  workEmail: z.string().trim().email("Please use a valid work email."),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || /^[+]?[0-9()\-\s]{7,20}$/.test(value), {
      message: "Please use a valid US phone number.",
    }),
  role: z
    .string()
    .refine((value) => roleOptions.includes(value as (typeof roleOptions)[number]), {
      message: "Please select your role.",
    }),
  practiceType: z
    .string()
    .refine((value) => practiceTypeOptions.includes(value as (typeof practiceTypeOptions)[number]), {
      message: "Please choose your practice type.",
    }),
  providers: z
    .string()
    .refine((value) => providerOptions.includes(value as (typeof providerOptions)[number]), {
      message: "Please select provider count.",
    }),
  coverage: z
    .array(z.string())
    .refine((value) => value.length > 0, { message: "Please select at least one coverage need." }),
  schedulingSoftware: z.string().trim().max(120).optional().or(z.literal("")),
  preferredContactMethod: z
    .string()
    .refine((value) => contactMethodOptions.includes(value as (typeof contactMethodOptions)[number]), {
      message: "Please choose a preferred contact method.",
    }),
  preferredTime: z
    .string()
    .refine((value) => timeOptions.includes(value as (typeof timeOptions)[number]), {
      message: "Please choose a preferred time.",
    }),
  message: z
    .string()
    .trim()
    .min(10, "Please share a bit more detail about your inquiry.")
    .max(600, "Please keep your message under 600 characters."),
  consent: z.boolean().refine((value) => value, {
    message: "Please confirm you agree to be contacted.",
  }),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export { coverageOptions };
