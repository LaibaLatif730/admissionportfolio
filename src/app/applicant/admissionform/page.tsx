"use client";
import React, { useState } from "react";

interface AdmissionFormProps {
  onSubmitted: (data: any) => void;
}

export default function AdmissionForm({ onSubmitted }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      onSubmitted(formData);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">📝 Admission Form</h2>
      <p className="text-gray-600 text-sm">
        Please fill out your personal and course details below.
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
        title="form"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Select Course</option>
          <option value="BSc Computer Science">BSc Computer Science</option>
          <option value="BA Economics">BA Economics</option>
          <option value="BCom">BCom</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition-all duration-200 ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Admission Form"}
        </button>
      </form>
    </div>
  );
}
