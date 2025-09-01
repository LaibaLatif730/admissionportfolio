"use client";
import React, { useState, useEffect } from "react";
import StepIndicator from "@/components/stepIndicator";
import AdmissionForm from "@/components/admissionform";
import ChallanForm from "@/components/challanform";
import FeePayment from "@/components/feepayment";
import UploadScreenshotWithNotification from "@/components/uploadScreenshotwithnotification";

export default function ApplicantPortalPage() {
  const [step, setStep] = useState(0); // 0: Admission, 1: Challan, 2: Fee Payment, 3: Upload Proof, 4: Confirmation
  const [application, setApplication] = useState<any>(null);

  // Generate a unique challan number
  const generateChallan = () => `CHL-${Math.floor(100000 + Math.random() * 900000)}`;

  // Step 0 → Admission Form submitted
  const handleFormSubmit = (data: any) => {
    const challan = {
      number: generateChallan(),
      amount: 5000,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      bank: "ABC Bank",
    };

    setApplication({ ...data, challan });
    setStep(1);
  };

  // Step 3 → Upload proof & notifications completed
  const handleProofUpload = () => {
    setStep(4);
  };

  // Protect steps from direct access
  useEffect(() => {
    if (step > 0 && !application) setStep(0);
  }, [step, application]);

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">🎓 Applicant Portal</h1>
      <p className="text-gray-600 mb-6">Complete your admission process step by step.</p>

      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* Step 0: Admission Form */}
      {step === 0 && <AdmissionForm onSubmitted={handleFormSubmit} />}

      {/* Step 1: Challan Form */}
      {step === 1 && application && (
        <div className="space-y-4">
          <ChallanForm student={application} challan={application.challan} />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(0)}
              className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md"
            >
              ⬅ Return
            </button>
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md"
            >
              Proceed to Fee Payment ➡
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Fee Payment */}
      {step === 2 && application && (
        <div className="space-y-4">
          <FeePayment
            studentName={application.name}
            challanNumber={application.challan.number}
            amount={application.challan.amount}
            dueDate={application.challan.dueDate}
            bank={application.challan.bank}
            onPaid={() => setStep(3)}
          />
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md"
            >
              ⬅ Return
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Upload Payment Proof */}
      {step === 3 && application && (
        <div className="space-y-4">
          <UploadScreenshotWithNotification
            appId={application.id}
            studentName={application.name}
            email={application.email}
            phone={application.phone}
            onCompleted={handleProofUpload}
          />
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 shadow-md"
            >
              ⬅ Return
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-md space-y-2">
          <h3 className="text-xl font-semibold text-green-800">✅ Admission Completed</h3>
          <p className="text-gray-700">
            Your admission fee has been submitted successfully. A confirmation email and WhatsApp
            notification have been sent to your provided contact details.
          </p>
        </div>
      )}
    </div>
  );
}
