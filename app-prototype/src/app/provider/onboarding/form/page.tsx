"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  MapPin,
  CreditCard,
  CheckCircle2,
  Upload
} from "lucide-react";
import { toast } from "sonner";

const FORM_STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Services", icon: Briefcase },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Payment", icon: CreditCard }
];

export default function ProviderOnboardingForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    experience: "",
    profilePhoto: null as File | null,

    // Services
    services: [] as string[],

    // Location
    address: "",
    district: "",
    city: "Bangkok",
    postalCode: "",
    serviceRadius: "10",

    // Payment
    bankName: "",
    accountNumber: "",
    accountName: "",
    taxId: ""
  });

  const progress = (currentStep / FORM_STEPS.length) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceName)) {
        return prev.filter(s => s !== serviceName);
      }
      return [...prev, serviceName];
    });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.bio) {
          toast.error("Please fill in all required fields");
          return false;
        }
        break;
      case 2:
        if (selectedServices.length === 0) {
          toast.error("Please select at least one service category");
          return false;
        }
        break;
      case 3:
        if (!formData.address || !formData.district || !formData.postalCode) {
          toast.error("Please fill in your complete address");
          return false;
        }
        break;
      case 4:
        if (!formData.bankName || !formData.accountNumber || !formData.accountName) {
          toast.error("Please fill in all payment details");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      services: selectedServices,
      timestamp: new Date().toISOString()
    };

    console.log("Provider Application Submitted:", submissionData);
    toast.success("Application details saved!");

    setTimeout(() => {
      router.push("/provider/onboarding/service-pact");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Container className="py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {FORM_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isActive
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {index < FORM_STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          isCompleted ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Card */}
          <div className="bg-card border rounded-2xl p-8 shadow-lg">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                  <p className="text-muted-foreground">
                    Tell us about yourself and your professional experience
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+66 12 345 6789"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell customers about your experience, expertise, and what makes you great at what you do..."
                      rows={4}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be displayed on your public profile
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="5"
                      min="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Photo (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Services */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Service Categories</h2>
                  <p className="text-muted-foreground">
                    Select the services you offer. You can add specific services later.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES.map((category) => {
                    const Icon = category.Icon;
                    const isSelected = selectedServices.includes(category.name);

                    return (
                      <div
                        key={category.name}
                        onClick={() => handleServiceToggle(category.name)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleServiceToggle(category.name)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-5 h-5 text-primary" />
                              <h3 className="font-semibold">{category.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-muted-foreground">
                  Selected: {selectedServices.length} {selectedServices.length === 1 ? "category" : "categories"}
                </p>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Service Location</h2>
                  <p className="text-muted-foreground">
                    Where do you provide your services?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Sukhumvit Road"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        placeholder="Watthana"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="10110"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceRadius">Service Radius (km)</Label>
                    <Input
                      id="serviceRadius"
                      type="number"
                      value={formData.serviceRadius}
                      onChange={(e) => handleInputChange("serviceRadius", e.target.value)}
                      placeholder="10"
                      min="1"
                      max="50"
                    />
                    <p className="text-xs text-muted-foreground">
                      How far are you willing to travel for services?
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
                  <p className="text-muted-foreground">
                    Where should we send your earnings?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange("bankName", e.target.value)}
                      placeholder="Bangkok Bank"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      placeholder="123-4-56789-0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder Name *</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => handleInputChange("accountName", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID (Optional)</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange("taxId", e.target.value)}
                      placeholder="1234567890123"
                    />
                    <p className="text-xs text-muted-foreground">
                      For tax reporting purposes
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <p className="text-sm font-medium mb-2">Payment Schedule</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Weekly payouts every Monday</li>
                      <li>• 25-30% platform commission</li>
                      <li>• Earnings available after service completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="gap-2"
                size="lg"
              >
                {currentStep === FORM_STEPS.length ? "Submit Application" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
