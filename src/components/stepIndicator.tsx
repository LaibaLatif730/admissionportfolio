"use client";
import React from "react";

interface StepIndicatorProps {
  step: number; // current step index
}

const steps = ["Admission Form", "Challan", "Fee Payment", "Confirmation"];

export default function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto mb-6">
      {steps.map((label, index) => {
        const isCompleted = step > index;
        const isActive = step === index;

        return (
          <div key={index} className="flex-1 flex items-center relative">
            {/* Step circle */}
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white cursor-default transition-all duration-300
                  ${isCompleted ? "bg-green-500" : isActive ? "bg-blue-600" : "bg-gray-300"}`}
                title={label} // tooltip
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <span className="mt-2 text-sm text-gray-700 text-center">{label}</span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                  step > index ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
