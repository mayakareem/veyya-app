"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Provider } from "@/lib/types";
import DateStep from "./DateStep";
import TimeStep from "./TimeStep";
import DetailsStep from "./DetailsStep";
import ReviewStep from "./ReviewStep";
import type {
  BookingDateData,
  BookingTimeData,
  BookingDetailsData,
  BookingReviewData,
  CompleteBookingData,
} from "@/lib/validations/booking";

interface BookingStepperProps {
  providerId: string;
  providerName: string;
  onComplete: (data: CompleteBookingData) => void;
}

type Step = "date" | "time" | "details" | "review";

const STEPS: { id: Step; label: string; description: string }[] = [
  { id: "date", label: "Date", description: "Choose a date" },
  { id: "time", label: "Time", description: "Select time slot" },
  { id: "details", label: "Details", description: "Service & location" },
  { id: "review", label: "Review & Pay", description: "Confirm booking" },
];

export default function BookingStepper({
  providerId,
  providerName,
  onComplete,
}: BookingStepperProps) {
  const [currentStep, setCurrentStep] = useState<Step>("date");
  const [formData, setFormData] = useState<Partial<CompleteBookingData>>({});

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const handleDateComplete = (data: BookingDateData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep("time");
  };

  const handleTimeComplete = (data: BookingTimeData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep("details");
  };

  const handleDetailsComplete = (data: BookingDetailsData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep("review");
  };

  const handleReviewComplete = (data: BookingReviewData) => {
    const completeData = { ...formData, ...data } as CompleteBookingData;
    onComplete(completeData);
  };

  const handleBack = () => {
    const prevIndex = Math.max(0, currentStepIndex - 1);
    setCurrentStep(STEPS[prevIndex].id);
  };

  return (
    <div className="w-full">
      {/* Progress Steps */}
      <nav aria-label="Booking progress" className="mb-8">
        <ol className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.id === currentStep;

            return (
              <li key={step.id} className="flex-1 relative">
                {/* Connector Line */}
                {index !== STEPS.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-5 left-1/2 h-0.5 w-full",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Step Button */}
                <button
                  type="button"
                  onClick={() => {
                    // Allow navigation to completed steps
                    if (index < currentStepIndex) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={index > currentStepIndex}
                  className={cn(
                    "relative flex flex-col items-center group",
                    index <= currentStepIndex
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {/* Step Circle */}
                  <span
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors mb-2 relative z-10 bg-background",
                      isCompleted &&
                        "border-primary bg-primary text-primary-foreground",
                      isCurrent &&
                        "border-primary text-primary animate-pulse",
                      !isCompleted &&
                        !isCurrent &&
                        "border-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>

                  {/* Step Label */}
                  <span
                    className={cn(
                      "text-xs font-medium text-center",
                      isCurrent && "text-primary",
                      !isCurrent && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {currentStep === "date" && (
          <DateStep
            providerId={providerId}
            initialData={formData}
            onNext={handleDateComplete}
          />
        )}

        {currentStep === "time" && (
          <TimeStep
            providerId={providerId}
            selectedDate={formData.date || ""}
            initialData={formData}
            onNext={handleTimeComplete}
            onBack={handleBack}
          />
        )}

        {currentStep === "details" && (
          <DetailsStep
            providerId={providerId}
            providerName={providerName}
            initialData={formData}
            onNext={handleDetailsComplete}
            onBack={handleBack}
          />
        )}

        {currentStep === "review" && (
          <ReviewStep
            providerId={providerId}
            providerName={providerName}
            bookingData={formData}
            initialData={formData}
            onNext={handleReviewComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
