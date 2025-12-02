"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Home,
  Briefcase,
  Plus,
  User,
  Users,
  Calendar,
  Clock,
  CreditCard,
  Tag,
  CheckCircle2,
  ChevronRight,
  Star
} from "lucide-react";

type BookingStep = "address" | "service-details" | "professional" | "datetime" | "instructions" | "payment";

interface Address {
  id: string;
  label: string;
  address: string;
  icon: typeof Home | typeof Briefcase;
}

interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Professional {
  id: string;
  name: string;
  rating: number;
  completedServices: number;
  avatar?: string;
  specialties: string[];
}

interface PaymentMethod {
  id: string;
  type: "card" | "promptpay";
  label: string;
  last4?: string;
}

interface MultiStepBookingProps {
  serviceName: string;
  basePrice: number;
  baseDuration: number;
  onComplete: (bookingData: BookingData) => void;
}

export interface BookingData {
  addressId: string;
  customAddress?: string;
  selectedAddOns: string[];
  professionalId: string;
  date: Date;
  time: string;
  instructions: string;
  paymentMethodId: string;
  voucherCode?: string;
  totalPrice: number;
}

export function MultiStepBooking({
  serviceName,
  basePrice,
  baseDuration,
  onComplete
}: MultiStepBookingProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>("address");

  // Address step state
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [customAddress, setCustomAddress] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Service details step state
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Professional step state
  const [professionalChoice, setProfessionalChoice] = useState<"auto" | "manual">("auto");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>("auto-assign");

  // Date/time step state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Instructions step state
  const [instructions, setInstructions] = useState<string>("");

  // Payment step state
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Mock data - In production, these would come from APIs
  const savedAddresses: Address[] = [
    { id: "home", label: "Home", address: "123 Sukhumvit Rd, Bangkok 10110", icon: Home },
    { id: "work", label: "Work", address: "456 Silom Rd, Bangkok 10500", icon: Briefcase },
  ];

  const addOns: ServiceAddOn[] = [
    { id: "addon-1", name: "ECG Test", price: 1200, duration: 20 },
    { id: "addon-2", name: "Blood Pressure Monitoring", price: 500, duration: 15 },
    { id: "addon-3", name: "Consultation Report", price: 300, duration: 10 },
  ];

  const professionals: Professional[] = [
    {
      id: "prof-1",
      name: "Dr. Somchai Patel",
      rating: 4.9,
      completedServices: 234,
      specialties: ["General Medicine", "Cardiology"]
    },
    {
      id: "prof-2",
      name: "Dr. Niran Kumar",
      rating: 4.8,
      completedServices: 189,
      specialties: ["Internal Medicine", "Diagnostics"]
    },
    {
      id: "prof-3",
      name: "Dr. Ananya Chen",
      rating: 4.95,
      completedServices: 312,
      specialties: ["Family Medicine", "Pediatrics"]
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    { id: "card-1", type: "card", label: "Visa", last4: "4242" },
    { id: "promptpay-1", type: "promptpay", label: "PromptPay" },
  ];

  // Available dates (next 14 days)
  const getAvailableDates = () => {
    const dates: Date[] = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Available time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00"
  ];

  // Calculate total price
  const calculateTotalPrice = () => {
    const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);
    return basePrice + addOnsTotal;
  };

  // Calculate total duration
  const calculateTotalDuration = () => {
    const addOnsDuration = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.duration || 0);
    }, 0);
    return baseDuration + addOnsDuration;
  };

  // Step validation
  const canProceed = () => {
    switch (currentStep) {
      case "address":
        return selectedAddressId !== "" || (showAddressForm && customAddress.trim() !== "");
      case "service-details":
        return true; // Can proceed even without add-ons
      case "professional":
        return professionalChoice === "auto" || selectedProfessionalId !== "";
      case "datetime":
        return selectedDate !== null && selectedTime !== "";
      case "instructions":
        return true; // Instructions are optional
      case "payment":
        return selectedPaymentId !== "" || (showPaymentForm && true);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    const steps: BookingStep[] = ["address", "service-details", "professional", "datetime", "instructions", "payment"];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = ["address", "service-details", "professional", "datetime", "instructions", "payment"];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = () => {
    if (!canProceed()) return;

    const bookingData: BookingData = {
      addressId: selectedAddressId,
      customAddress: showAddressForm ? customAddress : undefined,
      selectedAddOns,
      professionalId: professionalChoice === "auto" ? "auto-assign" : selectedProfessionalId,
      date: selectedDate!,
      time: selectedTime,
      instructions,
      paymentMethodId: selectedPaymentId,
      voucherCode: voucherCode || undefined,
      totalPrice: calculateTotalPrice(),
    };

    onComplete(bookingData);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Progress indicator
  const steps: { key: BookingStep; label: string; icon: typeof MapPin }[] = [
    { key: "address", label: "Address", icon: MapPin },
    { key: "service-details", label: "Details", icon: Plus },
    { key: "professional", label: "Professional", icon: User },
    { key: "datetime", label: "Date & Time", icon: Calendar },
    { key: "instructions", label: "Instructions", icon: CheckCircle2 },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.key === currentStep;

            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-1 ${isCurrent ? "font-semibold" : ""}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{serviceName}</CardTitle>
          <CardDescription>
            ฿{(calculateTotalPrice() / 100).toFixed(2)} • {calculateTotalDuration()} min
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Address Selection */}
          {currentStep === "address" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Select Service Address</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Where should the professional provide this service?
                </p>
              </div>

              <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                {savedAddresses.map((address) => {
                  const Icon = address.icon;
                  return (
                    <label
                      key={address.id}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value={address.id} className="mt-1" />
                      <Icon className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{address.label}</div>
                        <div className="text-sm text-muted-foreground">{address.address}</div>
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>

              <button
                onClick={() => {
                  setShowAddressForm(!showAddressForm);
                  setSelectedAddressId(showAddressForm ? "" : "new");
                }}
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Address</span>
              </button>

              {showAddressForm && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="custom-address">Full Address</Label>
                    <Textarea
                      id="custom-address"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      placeholder="Enter complete address including building, street, district, and postal code"
                      rows={3}
                      className="bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Service Details & Add-ons */}
          {currentStep === "service-details" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Service Details & Add-ons</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Customize your service with additional options
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{serviceName}</span>
                    <span className="font-semibold">฿{(basePrice / 100).toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{baseDuration} minutes</div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Available Add-ons</h4>
                  {addOns.map((addOn) => (
                    <label
                      key={addOn.id}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all mb-2 ${
                        selectedAddOns.includes(addOn.id)
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <Checkbox
                        checked={selectedAddOns.includes(addOn.id)}
                        onCheckedChange={() => toggleAddOn(addOn.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{addOn.name}</span>
                          <span className="font-semibold">฿{(addOn.price / 100).toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">+{addOn.duration} minutes</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Total Price</span>
                    <span className="text-xl font-bold">฿{(calculateTotalPrice() / 100).toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Duration: {calculateTotalDuration()} minutes
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Professional Selection */}
          {currentStep === "professional" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Select Professional</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose how you'd like your professional assigned
                </p>
              </div>

              <RadioGroup
                value={professionalChoice}
                onValueChange={(val) => {
                  setProfessionalChoice(val as "auto" | "manual");
                  if (val === "auto") setSelectedProfessionalId("auto-assign");
                }}
              >
                <label
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    professionalChoice === "auto"
                      ? "border-primary bg-primary/5"
                      : "hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="auto" className="mt-1" />
                  <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Auto-Assign (Recommended)</div>
                    <div className="text-sm text-muted-foreground">
                      We'll match you with the best available professional based on your needs
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    professionalChoice === "manual"
                      ? "border-primary bg-primary/5"
                      : "hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="manual" className="mt-1" />
                  <User className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Select Specific Professional</div>
                    <div className="text-sm text-muted-foreground">
                      Choose from our available professionals
                    </div>
                  </div>
                </label>
              </RadioGroup>

              {professionalChoice === "manual" && (
                <div className="space-y-3 mt-4">
                  <h4 className="font-medium">Available Professionals</h4>
                  <RadioGroup value={selectedProfessionalId} onValueChange={setSelectedProfessionalId}>
                    {professionals.map((prof) => (
                      <label
                        key={prof.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedProfessionalId === prof.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={prof.id} className="mt-1" />
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {prof.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{prof.name}</div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {prof.rating}
                            </span>
                            <span>•</span>
                            <span>{prof.completedServices} services</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {prof.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Date & Time Selection */}
          {currentStep === "datetime" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Select Date & Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose when you'd like the service
                </p>
              </div>

              <div>
                <Label className="mb-2 block">Select Date</Label>
                <div className="grid grid-cols-7 gap-2">
                  {getAvailableDates().map((date) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <div className="text-xs">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                        <div className="font-semibold">{date.getDate()}</div>
                        <div className="text-xs">{date.toLocaleDateString("en-US", { month: "short" })}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <Label className="mb-2 block">Select Time</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            isSelected
                              ? "border-primary bg-primary text-white"
                              : "hover:border-gray-300"
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          <div className="font-medium">{time}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">
                      Scheduled for {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Special Instructions */}
          {currentStep === "instructions" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Special Instructions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Any specific instructions for your service provider?
                </p>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="E.g., Please bring extra equipment, preferred consultation language, special health considerations, etc."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {instructions.length} / 500 characters
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Providing detailed instructions helps our professionals prepare better and deliver the best possible service.
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Payment Method */}
          {currentStep === "payment" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Payment Method</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select or add a payment method
                </p>
              </div>

              <RadioGroup value={selectedPaymentId} onValueChange={setSelectedPaymentId}>
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPaymentId === method.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value={method.id} />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium">{method.label}</div>
                      {method.last4 && (
                        <div className="text-sm text-muted-foreground">
                          •••• {method.last4}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <button
                onClick={() => {
                  setShowPaymentForm(!showPaymentForm);
                  setSelectedPaymentId(showPaymentForm ? "" : "new");
                }}
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Payment Method</span>
              </button>

              {showPaymentForm && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="voucher-code">Voucher Code (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="voucher-code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    placeholder="Enter voucher code"
                    className="flex-1"
                  />
                  <Button variant="outline" className="flex-shrink-0">
                    <Tag className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Service Price</span>
                    <span>฿{(basePrice / 100).toFixed(2)}</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span>Add-ons ({selectedAddOns.length})</span>
                      <span>
                        ฿{(selectedAddOns.reduce((sum, id) => {
                          const addOn = addOns.find(a => a.id === id);
                          return sum + (addOn?.price || 0);
                        }, 0) / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-semibold text-lg">Total Amount</span>
                    <span className="font-bold text-2xl text-primary">
                      ฿{(calculateTotalPrice() / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === "address"}
          className="w-32"
        >
          Back
        </Button>

        {currentStep === "payment" ? (
          <Button
            onClick={handleComplete}
            disabled={!canProceed()}
            className="flex-1"
            size="lg"
          >
            Complete Booking
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
            size="lg"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
