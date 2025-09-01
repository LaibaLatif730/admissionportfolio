"use client";

import { useState } from "react";

export default function ApplicantPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    setStatus("Sending...");
    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        email,
        subject: "Admission Portal Update",
        message,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setStatus(data.success ? "✅ Email sent!" : "❌ Failed to send email");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📧 Send Test Email</h1>
      <input
        type="email"
        placeholder="Recipient email"
        className="border p-2 rounded w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message"
        className="border p-2 rounded w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendEmail}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Email
      </button>
      <p>{status}</p>
    </div>
  );
}