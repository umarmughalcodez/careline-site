import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!user || !pass) throw new Error("Email is not configured (GMAIL_USER / GMAIL_APP_PASSWORD).");

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return transporter;
}

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export type MailRow = [label: string, value: string];

export async function sendNotification(opts: {
  subject: string;
  title: string;
  rows: MailRow[];
  replyTo?: string;
}) {
  const from = process.env.GMAIL_USER!;
  const to = process.env.CONTACT_TO_EMAIL || from;

  const text = `${opts.title}\n\n${opts.rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n")}`;

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;background:#f2f7fb;padding:24px">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #dce6ef;border-radius:14px;overflow:hidden">
      <div style="background:#102a43;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:700">${esc(opts.title)}</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#183247">
        ${opts.rows
          .map(
            ([k, v]) => `<tr>
          <td style="padding:12px 24px;border-bottom:1px solid #edf1f5;width:170px;color:#566b80;vertical-align:top"><b>${esc(k)}</b></td>
          <td style="padding:12px 24px;border-bottom:1px solid #edf1f5;white-space:pre-wrap">${esc(v || "-")}</td>
        </tr>`
          )
          .join("")}
      </table>
    </div>
  </div>`;

  await getTransporter().sendMail({
    from: `"CareLine Website" <${from}>`,
    to,
    replyTo: opts.replyTo,
    subject: oneLine(opts.subject),
    text,
    html,
  });
}

const hits = new Map<string, number[]>();

export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}