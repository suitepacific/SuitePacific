import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateOtp(): string {
  return String(crypto.randomInt(100000, 1000000));
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string): Promise<void> {
  await resend.emails.send({
    from: "SuiteCompare <noreply@suitepacific.com>",
    to,
    subject: "Reset your SuiteCompare password",
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#0f172a">
        <div style="margin-bottom:24px">
          <span style="font-size:13px;font-weight:600;color:#6366f1;letter-spacing:.05em;text-transform:uppercase">SuiteCompare</span>
        </div>
        <h1 style="font-size:22px;font-weight:700;margin:0 0 8px">Reset your password</h1>
        <p style="color:#64748b;font-size:15px;margin:0 0 28px">Hi ${name}, click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#6366f1;color:#fff;font-weight:600;font-size:14px;padding:12px 28px;border-radius:100px;text-decoration:none;margin-bottom:28px">Reset password</a>
        <p style="color:#94a3b8;font-size:13px;margin:0">If you didn&apos;t request this, you can ignore this email — your password won&apos;t change.</p>
        <p style="color:#cbd5e1;font-size:12px;margin:12px 0 0">Or copy this link: <span style="color:#6366f1">${resetUrl}</span></p>
      </div>
    `,
  });
}

export async function sendOtpEmail(to: string, name: string, otp: string): Promise<void> {
  await resend.emails.send({
    from: "SuiteCompare <noreply@suitepacific.com>",
    to,
    subject: `${otp} — your SuiteCompare verification code`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#0f172a">
        <div style="margin-bottom:24px">
          <span style="font-size:13px;font-weight:600;color:#6366f1;letter-spacing:.05em;text-transform:uppercase">SuiteCompare</span>
        </div>
        <h1 style="font-size:22px;font-weight:700;margin:0 0 8px">Verify your email</h1>
        <p style="color:#64748b;font-size:15px;margin:0 0 28px">Hi ${name}, enter the code below to verify your account. It expires in <strong>10 minutes</strong>.</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:28px;text-align:center;margin-bottom:28px">
          <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#0f172a;font-variant-numeric:tabular-nums">${otp}</span>
        </div>
        <p style="color:#94a3b8;font-size:13px;margin:0">If you didn't sign up for SuiteCompare, ignore this email.</p>
      </div>
    `,
  });
}
