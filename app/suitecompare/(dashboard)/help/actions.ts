"use server";

import { requireScUser } from "@/lib/sc-auth";
import { Resend } from "resend";

export async function sendSupportAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireScUser();
  const subject = String(formData.get("subject") ?? "").trim() || "Support Request";
  const message = String(formData.get("message") ?? "").trim();

  if (!message) return { error: "Please enter a message." };
  if (message.length < 10) return { error: "Message is too short." };

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "SuiteCompare <noreply@suitepacific.com>",
    to: "info@suitepacific.com",
    replyTo: user.email,
    subject: `[SuiteCompare Support] ${subject}`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#0f172a">
        <div style="margin-bottom:24px">
          <span style="font-size:13px;font-weight:600;color:#6366f1;letter-spacing:.05em;text-transform:uppercase">SuiteCompare Support</span>
        </div>
        <h1 style="font-size:20px;font-weight:700;margin:0 0 16px">${subject}</h1>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:24px">
          <p style="margin:0;font-size:13px;color:#64748b"><strong>From:</strong> ${user.name} &lt;${user.email}&gt;</p>
        </div>
        <p style="font-size:15px;color:#334155;white-space:pre-wrap;line-height:1.7">${message}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0" />
        <p style="font-size:12px;color:#94a3b8">Reply directly to this email to respond to the user.</p>
      </div>
    `,
  });

  return { success: true };
}
