import { z } from "zod";

export const DISCOVERY_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"] as const;

export const discoverySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  clinicName: z.string().trim().min(2, "Please enter your clinic name."),
  notes: z.string().trim().max(1000, "Notes must be 1000 characters or fewer.").optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date."),
  slot: z.enum(DISCOVERY_SLOTS, { message: "Please choose a time." }),
  timezone: z.string().max(60).optional().default(""),
  honeypot: z.string().optional().default(""),
});

export type DiscoveryValues = z.infer<typeof discoverySchema>;