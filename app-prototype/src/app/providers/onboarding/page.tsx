"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import BusinessTypeStep from "@/components/onboarding/BusinessTypeStep";
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import BusinessInfoStep from "@/components/onboarding/BusinessInfoStep";
import ServiceSelectionStep from "@/components/onboarding/ServiceSelectionStep";
import BankingInfoStep from "@/components/onboarding/BankingInfoStep";
import DocumentUploadStep from "@/components/onboarding/DocumentUploadStep";
import VeyyaPactStep from "@/components/onboarding/VeyyaPactStep";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type OnboardingData = {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationalId: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;

  // Business Information
  businessType: "individual" | "registered";
  businessName: string;
  businessRegistrationNumber: string;
  taxId: string;
  yearsOfExperience: string;
  bio: string;

  // Services
  selectedCategories: string[];
  services: Array<{
    name: string;
    price: string;
    duration: string;
    description: string;
  }>;

  // Banking
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName: string;

  // Documents
  documents: {
    nationalIdFile?: File;
    businessRegistrationFile?: File;
    certificationsFile?: File;
    profilePhoto?: File;
    portfolioImages?: File[];
  };

  // Veyya Pact
  acceptedPact?: boolean;
  acceptedTerms?: boolean;
};

export default function ProviderOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationalId: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    businessType: "individual",
    businessName: "",
    businessRegistrationNumber: "",
    taxId: "",
    yearsOfExperience: "",
    bio: "",
    selectedCategories: [],
    services: [],
    bankName: "",
    accountNumber: "",
    accountName: "",
    branchName: "",
    documents: {},
  });

  const totalSteps = 6;
  const steps = [
    "Business Type",
    "Personal Info",
    "Business Info",
    "Services",
    "Banking",
    "Veyya Pact"
  ];

  const updateFormData = (data: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    // Validate Veyya Pact acceptance
    if (!formData.acceptedPact || !formData.acceptedTerms) {
      alert("Please accept the Veyya Pact and Terms of Service to continue.");
      return;
    }

    console.log("Submitting application:", formData);
    // TODO: Submit to API
    alert("Application submitted! You'll hear from us within 2-3 business days.");
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Provider Application
            </h1>
            <p className="text-muted-foreground">
              Complete all steps to join Veyya's provider network
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        setCurrentStep(index + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all cursor-pointer hover:scale-110 ${
                        index + 1 === currentStep
                          ? "bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20"
                          : index + 1 < currentStep
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {index + 1}
                    </button>
                    <p className={`text-xs mt-2 text-center hidden md:block transition-colors ${
                      index + 1 === currentStep
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}>
                      {step}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-[50%] w-full h-0.5 -z-10 transition-colors ${
                        index + 1 < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-background border rounded-lg p-6 md:p-8 mb-6">
            {currentStep === 1 && (
              <BusinessTypeStep data={formData} updateData={updateFormData} />
            )}
            {currentStep === 2 && (
              <PersonalInfoStep data={formData} updateData={updateFormData} />
            )}
            {currentStep === 3 && (
              <BusinessInfoStep data={formData} updateData={updateFormData} />
            )}
            {currentStep === 4 && (
              <ServiceSelectionStep data={formData} updateData={updateFormData} />
            )}
            {currentStep === 5 && (
              <BankingInfoStep data={formData} updateData={updateFormData} />
            )}
            {currentStep === 6 && (
              <VeyyaPactStep data={formData} updateData={updateFormData} />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
