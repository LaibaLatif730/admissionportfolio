"use client";
import React, { useState } from "react";

interface FeePaymentProps {
  studentName: string;
  challanNumber: string;
  amount: number;
  dueDate: string;
  bank: string;
  onPaid: () => void;
}

export default function FeePayment({
  studentName,
  challanNumber,
  amount,
  dueDate,
  bank,
  onPaid,
}: FeePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setError("");
    setLoading(true);

    try {
      // Simulate payment processing (replace with real payment gateway integration)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setPaid(true);
      onPaid();
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">💰 Fee Payment</h2>
      <p className="text-gray-600 text-sm">
        Please pay your admission fee using the details below or proceed with online payment.
      </p>

      {/* Payment Details Card */}
      <div className="bg-blue-50 p-4 rounded-xl space-y-2 border border-blue-100">
        <p>
          <span className="font-semibold text-blue-700">Student:</span> {studentName}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Challan Number:</span> {challanNumber}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Amount:</span> ₹ {amount}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Due Date:</span> {dueDate}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Bank:</span> {bank}
        </p>
      </div>

      {/* Error / Success Messages */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {paid && (
        <p className="text-green-600 text-sm">
          ✅ Payment successful! Please upload the proof in the next step.
        </p>
      )}

      {/* Payment Button */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || paid}
        className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing Payment..." : paid ? "Paid" : "Pay Now"}
      </button>

      {/* Bank Transfer Instruction */}
      <p className="text-gray-500 text-sm mt-2">
        For bank transfer, use the above details and upload the payment proof in the next step.
      </p>
    </div>
  );
}
