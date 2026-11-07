import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";
import { sendStructuredEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

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
      subject: `New contact inquiry from ${data.clinicName}`,
      heading: "New clinic inquiry",
      replyTo: data.workEmail,
      rows: [
        { label: "Full name", value: data.name },
        { label: "Clinic name", value: data.clinicName },
        { label: "Work email", value: data.workEmail },
        { label: "Phone", value: data.phone || "Not provided" },
        { label: "Role", value: data.role },
        { label: "Practice type", value: data.practiceType },
        { label: "Providers", value: data.providers },
        { label: "Coverage needs", value: data.coverage.join(", ") },
        { label: "Scheduling software", value: data.schedulingSoftware || "Not provided" },
        { label: "Preferred contact", value: data.preferredContactMethod },
        { label: "Preferred time", value: data.preferredTime },
        { label: "Message", value: data.message },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received.",
      data,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error && error.message.includes("SMTP")
            ? "Email delivery is not configured yet. Add SMTP_PASS to enable sending."
            : "Something went wrong while submitting the inquiry.",
      },
      { status: 500 }
    );
  }
}
