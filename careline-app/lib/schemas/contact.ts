import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  clinicName: z.string().trim().min(2, "Please enter your clinic name."),
  workEmail: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || v.replace(/\D/g, "").length === 10, "Enter a 10-digit US phone number."),
  role: z.string().min(1, "Please choose a role."),
  practiceType: z.string().min(1, "Please choose a practice type."),
  providers: z.string().min(1, "Please choose a provider count."),
  coverage: z.array(z.string()).min(1, "Select at least one coverage option."),
  schedulingSoftware: z.string().trim().max(120),
  preferredContactMethod: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().trim().max(600, "Message must be 600 characters or fewer."),
  consent: z.boolean().refine((v) => v === true, "Please agree to be contacted."),
  honeypot: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;