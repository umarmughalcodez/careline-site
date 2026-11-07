import { NextResponse } from "next/server";
import { z } from "zod";
import { sendStructuredEmail } from "@/lib/email";

const discoverySchema = z.object({
  name: z.string().trim().min(2, "Please provide your name."),
  email: z.string().trim().email("Please provide a valid email."),
  clinicName: z.string().trim().min(2, "Please provide your clinic name."),
  selectedDate: z.string().min(1, "Please choose a date."),
  selectedSlot: z.string().min(1, "Please choose a time."),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = discoverySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "buycrazeshop@gmail.com";
    const data = parsed.data;

    await sendStructuredEmail({
      to,
      subject: `Discovery call request from ${data.clinicName}`,
      heading: "New discovery call request",
      replyTo: data.email,
      rows: [
        { label: "Full name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Clinic name", value: data.clinicName },
        { label: "Preferred date", value: data.selectedDate },
        { label: "Preferred time", value: data.selectedSlot },
        { label: "Notes", value: data.notes || "No notes provided" },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Discovery call request sent.",
    });
  } catch (error) {
    console.error("Discovery API error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error && error.message.includes("SMTP")
            ? "Email delivery is not configured yet. Add SMTP_PASS to enable sending."
            : "Something went wrong while submitting the discovery call request.",
      },
      { status: 500 }
    );
  }
}
