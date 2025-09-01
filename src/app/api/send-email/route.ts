import { NextResponse } from "next/server";

// Example: using Nodemailer for sending emails
import nodemailer from "nodemailer";

// Configure your SMTP settings (replace with real credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send the email
    await transporter.sendMail({
      from: `"Admission Office" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
