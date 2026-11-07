import nodemailer from "nodemailer";

export type EmailRow = {
  label: string;
  value: string | number | boolean | null | undefined;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function sendStructuredEmail({
  to,
  subject,
  heading,
  rows,
  replyTo,
}: {
  to: string;
  subject: string;
  heading: string;
  rows: EmailRow[];
  replyTo?: string;
}) {
  const smtpUser = process.env.SMTP_USER || "buycrazeshop@gmail.com";
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!smtpPass) {
    throw new Error("Missing SMTP_PASS or GMAIL_APP_PASSWORD environment variable.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const rowsHtml = rows
    .map(({ label, value }) => {
      const safeValue = value == null || value === "" ? "Not provided" : String(value);
      return `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #e5edf6; font-weight:700; color:#102a43; vertical-align:top; width:35%;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px; border-bottom:1px solid #e5edf6; color:#334e68; vertical-align:top;">${escapeHtml(safeValue)}</td>
        </tr>
      `;
    })
    .join("");

  const textBody = rows
    .map(({ label, value }) => `${label}: ${value == null || value === "" ? "Not provided" : value}`)
    .join("\n");

  await transporter.sendMail({
    from: `CareLine <${smtpUser}>`,
    to,
    replyTo: replyTo || smtpUser,
    subject,
    text: `${heading}\n\n${textBody}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f5f9ff; padding:32px 16px; color:#183247;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #dfeaf5; border-radius:18px; overflow:hidden;">
          <div style="padding:22px 24px; background:linear-gradient(135deg, #1e4ca6 0%, #1c8d87 100%); color:#ffffff;">
            <h2 style="margin:0; font-size:24px;">${escapeHtml(heading)}</h2>
          </div>
          <div style="padding:20px 24px 24px;">
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
  });
}
