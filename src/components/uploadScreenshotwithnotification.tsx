"use client";
import React, { useState } from "react";

interface UploadScreenshotProps {
  appId: string;
  studentName: string;
  email: string;
  phone: string;
  onCompleted?: () => void;
}

export default function UploadScreenshotWithNotification({
  appId,
  studentName,
  email,
  phone,
  onCompleted,
}: UploadScreenshotProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate file upload (replace with actual API upload if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 1️⃣ Send Email notification
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Admission Fee Submitted Successfully",
          message: `Hello ${studentName},\n\nYour admission fee has been submitted successfully. Thank you for completing the process.\n\nBest regards,\nAdmission Office`,
        }),
      });

      // 2️⃣ Send WhatsApp notification
      await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          message: `Hello ${studentName}, your admission fee has been successfully submitted.`,
        }),
      });

      setSuccess(true);
      onCompleted?.();
    } catch (err: any) {
      console.error(err);
      setError("Failed to upload or send notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">📷 Upload Payment Proof</h2>
      <p className="text-gray-600 text-sm">
        Upload a screenshot or scanned copy of your paid fee slip (JPG, PNG, PDF).
      </p>
      <input
        id="fileUpload"
        type="file"
        aria-label="Upload Screenshot"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">✅ Fee proof uploaded and notifications sent!</p>}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading || success}
        className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading & Sending..." : success ? "Completed" : "Upload & Notify"}
      </button>
    </div>
  );
}
