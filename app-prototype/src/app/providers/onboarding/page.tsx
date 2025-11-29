"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import BusinessTypeStep from "@/components/onboarding/BusinessTypeStep";
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import BusinessInfoStep from "@/components/onboarding/BusinessInfoStep";
import ServiceSelectionStep from "@/components/onboarding/ServiceSelectionStep";
import BankingInfoStep from "@/components/onboarding/BankingInfoStep";
import DocumentUploadStep from "@/components/onboarding/DocumentUploadStep";
import VeyyaPactStep from "@/components/onboarding/VeyyaPactStep";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2, User, Building2, Briefcase, FileText, CreditCard, Shield } from "lucide-react";

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
  selectedSubcategories: Array<{
    categoryName: string;
    subcategoryName: string;
    yearsOfExperience: string;
    certifications: string;
  }>;
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
    selectedSubcategories: [],
    services: [],
    bankName: "",
    accountNumber: "",
    accountName: "",
    branchName: "",
    documents: {},
  });

  const totalSteps = 6;
  const steps = [
    { id: 1, title: "Business Type", icon: Building2 },
    { id: 2, title: "Personal Info", icon: User },
    { id: 3, title: "Business Info", icon: Briefcase },
    { id: 4, title: "Services", icon: Briefcase },
    { id: 5, title: "Banking", icon: CreditCard },
    { id: 6, title: "Veyya Pact", icon: Shield }
  ];

  const progress = (currentStep / totalSteps) * 100;

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
    <>
      <ProviderHeader />
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Provider Application
            </h1>
            <p className="text-muted-foreground mb-4">
              Complete all steps to join Veyya's provider network
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Trusted by 1,000+ providers</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Free to join</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Weekly payouts</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center w-full">
                      <button
                        onClick={() => {
                          setCurrentStep(step.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all cursor-pointer hover:scale-110 ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isActive
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-lg"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </button>
                      <p className={`text-xs mt-2 text-center hidden md:block font-medium transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 px-2">
                        <div
                          className={`h-0.5 w-full transition-colors ${
                            isCompleted ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Content */}
          <div className="bg-card border rounded-2xl p-6 md:p-8 mb-6 shadow-lg">
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

          {/* Trust Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>🔒 Your information is secure and encrypted</p>
            <p className="mt-2">Application reviewed within 2-3 business days</p>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
