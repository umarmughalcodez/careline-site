import { NextResponse } from "next/server";
import { discoverySchema } from "../../../lib/schemas/discovery";
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

  const parsed = discoverySchema.safeParse(body);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return NextResponse.json({ message: first || "Please check your details." }, { status: 422 });
  }

  const d = parsed.data;

  const day = new Date(`${d.date}T12:00:00Z`);
  const todayUtc = new Date();
  todayUtc.setUTCHours(0, 0, 0, 0);
  const dow = day.getUTCDay();
  if (Number.isNaN(day.getTime()) || day.getTime() < todayUtc.getTime() - 86400000 || dow === 0 || dow === 6) {
    return NextResponse.json({ message: "Please choose a weekday that is today or later." }, { status: 422 });
  }

  const dateLabel = day.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  try {
    await sendNotification({
      title: "New discovery call request",
      subject: `Discovery call request: ${d.clinicName}, ${dateLabel} ${d.slot} ET`,
      replyTo: d.email,
      rows: [
        ["Requested date", dateLabel],
        ["Requested time", `${d.slot} Eastern Time (ET)`],
        ["Visitor time zone", d.timezone],
        ["Name", d.name],
        ["Email", d.email],
        ["Clinic", d.clinicName],
        ["Notes", d.notes],
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[discovery] email failed:", err);
    return NextResponse.json(
      { message: "We couldn’t send your request right now. Please try again or email us directly." },
      { status: 500 }
    );
  }
}