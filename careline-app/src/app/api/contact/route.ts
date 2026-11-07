import { NextResponse } from "next/server";
import { contactSchema, quickInquirySchema } from "../../../lib/schemas/contact";
import { clientIp, rateLimited, sendNotification } from "../../../lib/mailer";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if ((body as { honeypot?: string } | null)?.honeypot) {
    return NextResponse.json({ ok: true });
  }

  let notification: Parameters<typeof sendNotification>[0];
  const isQuickInquiry = (body as { formType?: unknown } | null)?.formType === "quick";

  if (isQuickInquiry) {
    const parsed = quickInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const d = parsed.data;
    notification = {
      title: "New website inquiry",
      subject: `New inquiry: ${d.clinicName} (${d.name})`,
      replyTo: d.workEmail,
      rows: [
        ["Name", d.name],
        ["Clinic", d.clinicName],
        ["Work email", d.workEmail],
        ["Coverage needed", d.coverage],
        ["Message", d.message || "Not specified"],
        ["Consent to be contacted", "Yes"],
      ],
    };
  } else {
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const d = parsed.data;
    notification = {
      title: "New website inquiry",
      subject: `New inquiry: ${d.clinicName} (${d.name})`,
      replyTo: d.workEmail,
      rows: [
        ["Name", d.name],
        ["Clinic", d.clinicName],
        ["Work email", d.workEmail],
        ["Phone", d.phone ?? ""],
        ["Role", d.role],
        ["Practice type", d.practiceType],
        ["Providers", d.providers],
        ["Coverage needed", d.coverage.join(", ")],
        ["Scheduling software", d.schedulingSoftware ?? ""],
        ["Preferred contact", d.preferredContactMethod],
        ["Preferred time", d.preferredTime],
        ["Message", d.message],
        ["Consent to be contacted", d.consent ? "Yes" : "No"],
      ],
    };
  }

  try {
    await sendNotification(notification);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] email failed:", err);
    return NextResponse.json(
      { message: "We couldn’t send your message right now. Please try again or email us directly." },
      { status: 500 }
    );
  }
}