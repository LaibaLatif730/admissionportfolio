"use client";
import React, { useState } from "react";

interface WhatsAppNotificationProps {
  phone: string;
  message: string;
}

export default function WhatsAppNotificationPage({
  phone,
  message,
}: WhatsAppNotificationProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send WhatsApp notification");
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send WhatsApp notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4 mt-6">
      <h2 className="text-2xl font-bold text-green-800">💬 WhatsApp Notification</h2>
      <p className="text-gray-600 text-sm">
        Send a WhatsApp message to the student regarding admission updates.
      </p>

      <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
        <p>
          <span className="font-semibold text-green-700">Phone:</span> {phone}
        </p>
        <p>
          <span className="font-semibold text-green-700">Message:</span> {message}
        </p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {sent && <p className="text-green-600 text-sm">✅ WhatsApp notification sent successfully!</p>}

      <button
        onClick={handleSend}
        disabled={loading || sent}
        className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
          loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Sending..." : sent ? "Sent" : "Send Notification"}
      </button>
    </div>
  );
}
