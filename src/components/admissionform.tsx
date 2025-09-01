"use client";
import React, { useState } from "react";

interface AdmissionFormProps {
  onSubmitted: (data: any) => void;
}

export default function AdmissionForm({ onSubmitted }: AdmissionFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !course) {
      setError("Please fill all the required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, course }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData?.error || "Submission failed. Try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      onSubmitted(data); // Pass submitted data to parent
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">📝 Admission Form</h2>
      <p className="text-gray-600 text-sm">
        Fill in your details to start the admission process.
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
        title="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Course</option>
          <option value="BSc Computer Science">BSc Computer Science</option>
          <option value="BBA">BBA</option>
          <option value="BA English">BA English</option>
          <option value="BCom">BCom</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Form"}
        </button>
      </form>
    </div>
  );
}
