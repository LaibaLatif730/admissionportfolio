"use client";
import React, { useRef } from "react";

interface ChallanFormProps {
  student?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    course?: string;
  };
  challan?: {
    number?: string;
    amount?: number;
    dueDate?: string;
    bank?: string;
  };
}

export default function ChallanForm({ student, challan }: ChallanFormProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Challan Form</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #f9fafb; }
              .card { border: 1px solid #e5e7eb; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background: #ffffff; }
              h2 { color: #1e40af; font-size: 1.75rem; margin-bottom: 10px; }
              p { color: #4b5563; font-size: 0.95rem; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              td { padding: 10px 8px; border-bottom: 1px solid #e5e7eb; font-size: 0.95rem; }
              td:first-child { font-weight: 600; color: #1e3a8a; width: 40%; }
              .highlight { background: #f0f9ff; font-weight: 700; color: #1e40af; border-radius: 6px; padding: 4px 8px; display: inline-block; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  };

  // Render loading if student or challan is missing
  if (!student || !challan) {
    return (
      <div className="text-center p-6 bg-white rounded-2xl shadow-md">
        <p className="text-gray-600">Loading challan details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div
        ref={printRef}
        className="bg-gradient-to-b from-white to-blue-50 border border-gray-200 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-800">💳 Challan Form</h2>
        <p className="text-gray-600 text-sm">
          Please use this challan to complete your admission fee payment.
        </p>

        <table className="w-full">
          <tbody>
            <tr>
              <td>Student Name</td>
              <td>{student.name || "N/A"}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{student.email || "N/A"}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{student.phone || "N/A"}</td>
            </tr>
            <tr>
              <td>Course</td>
              <td>{student.course || "N/A"}</td>
            </tr>
            <tr>
              <td>Challan Number</td>
              <td><span className="highlight">{challan.number || "N/A"}</span></td>
            </tr>
            <tr>
              <td>Amount</td>
              <td><span className="highlight">₹ {challan.amount ?? 0}</span></td>
            </tr>
            <tr>
              <td>Due Date</td>
              <td>{challan.dueDate || "N/A"}</td>
            </tr>
            <tr>
              <td>Bank</td>
              <td>{challan.bank || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
      >
        🖨 Print / Download Challan
      </button>
    </div>
  );
}
