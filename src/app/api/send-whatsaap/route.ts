import { NextResponse } from "next/server";

// Correct import for TypeScript
import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);
const WHATSAPP_FROM = process.env.WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send WhatsApp message
    await client.messages.create({
      from: `whatsapp:${WHATSAPP_FROM}`,
      to: `whatsapp:${phone}`,
      body: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("WhatsApp sending error:", err);
    return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 });
  }
}