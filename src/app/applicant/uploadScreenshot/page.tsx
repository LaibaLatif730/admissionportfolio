"use client";
import React, { useState } from "react";

interface UploadScreenshotProps {
  appId?: string;
  studentName: string;
  email: string;
  phone: string;
  onCompleted: () => void;
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
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Trigger Email & WhatsApp notification
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          message: `Your admission fee has been submitted successfully. Thank you, ${studentName}.`,
        }),
      });

      onCompleted();
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">📷 Upload Payment Proof</h2>
      <p className="text-gray-600 text-sm">
        Upload a screenshot or scanned copy of your paid fee slip (JPG, PNG, PDF).
      </p>
      <input
        type="file"
        id="screenshot"
        aria-label="Upload screenshot"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition-all duration-200 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Proof"}
      </button>
    </div>
  );
}
