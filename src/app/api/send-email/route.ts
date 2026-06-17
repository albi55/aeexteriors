import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export async function POST(req: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || pass === "your-app-password-here") {
    console.error(
      "[send-email] GMAIL_USER / GMAIL_APP_PASSWORD not configured. " +
        "Generate a Gmail App Password at https://myaccount.google.com/apppasswords " +
        "and set it in .env.local (and your hosting provider's env vars)."
    );
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  let body: {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
    message?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, email, service, message } = body;

  if (!name || !phone || !service) {
    return NextResponse.json(
      { error: "Name, phone, and service are required." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
  } catch (err) {
    console.error("[send-email] SMTP verify failed:", err);
    return NextResponse.json(
      { error: "Could not connect to mail server. Check Gmail App Password." },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from: `"A&E Exteriors Website" <${user}>`,
      to: "aeexteriorsnj@gmail.com",
      replyTo: email || undefined,
      subject: `New Estimate Request — ${service} — ${name}`,
      text:
        `New Estimate Request\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email || "Not provided"}\n` +
        `Service: ${service}\n` +
        `Details: ${message || "None"}\n`,
      html: `
        <h2 style="margin:0 0 16px">New Estimate Request</h2>
        <table style="border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#666">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#666">Phone</td><td style="padding:6px 0"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#666">Email</td><td style="padding:6px 0">${email ? escapeHtml(email) : "Not provided"}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#666">Service</td><td style="padding:6px 0">${escapeHtml(service)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#666;vertical-align:top">Details</td><td style="padding:6px 0">${message ? escapeHtml(message).replace(/\n/g, "<br/>") : "None"}</td></tr>
        </table>
        <hr style="margin:20px 0;border:none;border-top:1px solid #eee" />
        <p style="font-size:12px;color:#999">Sent from aeexteriorsnj.com</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-email] sendMail failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or call us." },
      { status: 500 }
    );
  }
}
