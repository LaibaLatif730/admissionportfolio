"use client";
import React, { useRef } from "react";

interface ChallanFormProps {
  student: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    course: string;
  };
  challan: {
    number: string;
    amount: number;
    dueDate: string;
    bank: string;
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
              body { font-family: Arial, sans-serif; padding: 20px; }
              .card { border: 1px solid #ccc; padding: 20px; border-radius: 10px; }
              h2 { color: #1e3a8a; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              td { padding: 8px; border: 1px solid #ddd; }
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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
      <div ref={printRef} className="card">
        <h2 className="text-xl font-bold text-blue-800 mb-4">💳 Challan Form</h2>
        <p className="text-gray-600 text-sm mb-2">Please pay the admission fee using this challan.</p>

        <table>
          <tbody>
            <tr>
              <td><strong>Student Name</strong></td>
              <td>{student.name}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>{student.email}</td>
            </tr>
            <tr>
              <td><strong>Phone</strong></td>
              <td>{student.phone}</td>
            </tr>
            <tr>
              <td><strong>Course</strong></td>
              <td>{student.course}</td>
            </tr>
            <tr>
              <td><strong>Challan Number</strong></td>
              <td>{challan.number}</td>
            </tr>
            <tr>
              <td><strong>Amount</strong></td>
              <td>₹ {challan.amount}</td>
            </tr>
            <tr>
              <td><strong>Due Date</strong></td>
              <td>{challan.dueDate}</td>
            </tr>
            <tr>
              <td><strong>Bank</strong></td>
              <td>{challan.bank}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePrint}
        className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        🖨 Print / Download Challan
      </button>
    </div>
  );
}
