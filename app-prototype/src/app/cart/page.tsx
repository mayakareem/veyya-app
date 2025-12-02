"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { getServiceImage } from "@/lib/utils/serviceImages";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Calendar, Clock, Home, MapPin, CreditCard, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type CheckoutStep = "review" | "datetime" | "address" | "payment" | "complete";

interface SavedAddress {
  id: string;
  label: string;
  street: string;
  district: string;
  city: string;
  postalCode: string;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate time slots
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 20) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateBookingDetails,
    getTotalPrice,
    getTotalDuration,
    getPrimaryService,
    getSecondaryServices,
  } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("review");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Saved addresses
  const [savedAddresses] = useState<SavedAddress[]>([
    {
      id: "1",
      label: "Home",
      street: "123 Sukhumvit Road, Apartment 45",
      district: "Watthana",
      city: "Bangkok",
      postalCode: "10110"
    },
    {
      id: "2",
      label: "Work",
      street: "456 Silom Road, Office Tower 12th Floor",
      district: "Bang Rak",
      city: "Bangkok",
      postalCode: "10500"
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    district: "",
    city: "Bangkok",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const primaryService = getPrimaryService();
  const secondaryServices = getSecondaryServices();
  const totalPrice = getTotalPrice();
  const totalDuration = getTotalDuration();
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    return date < today;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const canGoToPrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const todayMonth = new Date(today.getFullYear(), today.getMonth());
    return prevMonth >= todayMonth;
  };

  const handleDateTimeConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }
    setCurrentStep("address");
    toast.success("Date & time confirmed!");
  };

  const handleAddressConfirm = () => {
    if (!selectedAddressId && !showNewAddressForm) {
      toast.error("Please select or add an address");
      return;
    }
    if (showNewAddressForm && (!newAddress.street || !newAddress.district || !newAddress.postalCode)) {
      toast.error("Please fill in all address fields");
      return;
    }
    setCurrentStep("payment");
    toast.success("Address confirmed!");
  };

  const handlePaymentConfirm = () => {
    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error("Please fill in all card details");
        return;
      }
    }

    if (primaryService && selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      updateBookingDetails(primaryService.name, dateStr, selectedTime);
    }

    setCurrentStep("complete");
    toast.success("Order placed successfully!");

    setTimeout(() => {
      router.push("/confirmation");
    }, 2000);
  };

  const getSelectedAddress = () => {
    if (selectedAddressId) {
      return savedAddresses.find(addr => addr.id === selectedAddressId);
    }
    if (showNewAddressForm && newAddress.street) {
      return newAddress;
    }
    return null;
  };

  const steps = [
    { key: "review", label: "Review Cart", icon: ShoppingBag },
    { key: "datetime", label: "Date & Time", icon: Calendar },
    { key: "address", label: "Address", icon: Home },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);
  const days = getDaysInMonth(currentMonth);

  if (cart.length === 0) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some services to get started</p>
          </div>
          <Button onClick={() => router.push("/")} size="lg">
            Browse Services
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <p className="text-sm text-muted-foreground">
              {cart.length} {cart.length === 1 ? "service" : "services"} • Total: ฿{grandTotal.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 bg-white dark:bg-card border rounded-lg p-4 sm:p-6 overflow-x-auto">
          <div className="flex items-center justify-between min-w-max sm:min-w-0">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = step.key === currentStep;

              return (
                <div key={step.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center min-w-[80px] sm:min-w-0">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white dark:bg-green-600 dark:border-green-600"
                          : isCurrent
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <StepIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <p
                      className={`text-[10px] sm:text-xs mt-2 font-medium text-center ${
                        isCurrent ? "text-primary" : isCompleted ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Review Cart */}
            {currentStep === "review" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Review Your Services
                </h2>

                {primaryService && (
                  <div className="border-2 border-primary/20 rounded-lg bg-white shadow-sm p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Primary Service</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={getServiceImage(primaryService.name, "")}
                          alt={primaryService.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 text-base sm:text-lg">{primaryService.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {primaryService.duration} min • ฿{primaryService.price}
                        </p>

                        {/* Mobile controls */}
                        <div className="flex sm:hidden items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(primaryService.name)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {primaryService.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => addToCart(primaryService)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-3">
                            <p className="font-semibold">
                              ฿{(primaryService.price * primaryService.quantity).toLocaleString()}
                            </p>
                            <button
                              onClick={() => updateQuantity(primaryService.name, 0)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop controls */}
                      <div className="hidden sm:flex flex-col items-end justify-between">
                        <button
                          onClick={() => updateQuantity(primaryService.name, 0)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(primaryService.name)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {primaryService.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => addToCart(primaryService)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <p className="font-semibold">
                          ฿{(primaryService.price * primaryService.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {secondaryServices.length > 0 && (
                  <div className="border rounded-lg bg-white">
                    <div className="px-4 py-3 bg-muted/30 border-b">
                      <h3 className="text-sm font-medium">Additional Services</h3>
                    </div>
                    <div className="divide-y">
                      {secondaryServices.map((item) => (
                        <div key={item.name} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="relative w-full sm:w-16 h-24 sm:h-16 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={getServiceImage(item.name, "")}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0 w-full sm:w-auto">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2 sm:mb-0">
                              {item.duration} min • ฿{item.price}
                            </p>

                            {/* Mobile controls */}
                            <div className="flex sm:hidden items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => removeFromCart(item.name)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => addToCart(item)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold">
                                  ฿{(item.price * item.quantity).toLocaleString()}
                                </p>
                                <button
                                  onClick={() => updateQuantity(item.name, 0)}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Desktop controls */}
                          <div className="hidden sm:flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => removeFromCart(item.name)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => addToCart(item)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="text-right w-20">
                              <p className="text-sm font-semibold">
                                ฿{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>

                            <button
                              onClick={() => updateQuantity(item.name, 0)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => setCurrentStep("datetime")}
                >
                  Continue to Date & Time
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Date & Time - Inline Calendar */}
            {currentStep === "datetime" && (
              <div className="border-2 border-primary/20 rounded-lg bg-white p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  Select Date & Time
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        disabled={!canGoToPrevMonth()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="text-center font-semibold">
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </div>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="border rounded-xl overflow-hidden bg-white">
                      <div className="grid grid-cols-7 bg-gray-50">
                        {DAYS_OF_WEEK.map((day) => (
                          <div key={day} className="text-center text-xs font-medium py-2 text-muted-foreground">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 bg-white">
                        {days.map((date, index) => {
                          const disabled = isDateDisabled(date);
                          const selected = isSameDay(date, selectedDate);
                          const isToday = date && isSameDay(date, today);

                          return (
                            <button
                              key={index}
                              onClick={() => !disabled && setSelectedDate(date)}
                              disabled={disabled}
                              className={`
                                aspect-square p-2 text-sm border-b border-r bg-white transition-all
                                ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
                                ${selected ? "!bg-primary text-primary-foreground font-bold hover:!bg-primary" : ""}
                                ${isToday && !selected ? "border-2 border-primary" : ""}
                              `}
                            >
                              {date ? date.getDate() : ""}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm font-medium text-green-700">Selected Date:</div>
                        <div className="text-sm mt-1 text-green-600">
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Select Time
                    </h3>

                    {!selectedDate ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Please select a date first</p>
                      </div>
                    ) : (
                      <div className="border rounded-xl p-4 max-h-[400px] overflow-y-auto bg-white">
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((time) => {
                            const selected = time === selectedTime;
                            return (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                  py-3 px-2 text-sm rounded-lg border transition-all bg-white
                                  ${selected
                                    ? "!bg-primary text-primary-foreground border-primary font-semibold"
                                    : "hover:bg-gray-50 hover:border-primary/50"
                                  }
                                `}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedTime && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm font-medium text-green-700">Selected Time:</div>
                        <div className="text-sm mt-1 text-green-600">{selectedTime}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("review")}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleDateTimeConfirm}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue to Address
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Address Selection */}
            {currentStep === "address" && (
              <div className="border-2 border-primary/20 rounded-lg bg-white p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Home className="w-5 h-5 text-primary" />
                  Service Address
                </h2>

                <div className="space-y-4">
                  <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                    {savedAddresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedAddressId === address.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-gray-400"
                        }`}
                        onClick={() => {
                          setSelectedAddressId(address.id);
                          setShowNewAddressForm(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={address.id} id={address.id} />
                          <div className="flex-1">
                            <Label htmlFor={address.id} className="font-medium cursor-pointer">
                              {address.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {address.street}, {address.district}, {address.city} {address.postalCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowNewAddressForm(!showNewAddressForm);
                      setSelectedAddressId("");
                    }}
                  >
                    {showNewAddressForm ? "Cancel" : "+ Add New Address"}
                  </Button>

                  {showNewAddressForm && (
                    <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
                      <div className="space-y-2">
                        <Label htmlFor="new-street">Street Address *</Label>
                        <Input
                          id="new-street"
                          placeholder="123 Sukhumvit Road, Apartment 45"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-district">District *</Label>
                          <Input
                            id="new-district"
                            placeholder="Watthana"
                            value={newAddress.district}
                            onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-postal">Postal Code *</Label>
                          <Input
                            id="new-postal"
                            placeholder="10110"
                            value={newAddress.postalCode}
                            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-city">City *</Label>
                        <Input
                          id="new-city"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("datetime")}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      className="flex-1 gap-2"
                      onClick={handleAddressConfirm}
                      disabled={!selectedAddressId && (!showNewAddressForm || !newAddress.street)}
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === "payment" && (
              <div className="border-2 border-primary/20 rounded-lg bg-white p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "promptpay")}>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-medium cursor-pointer">
                        Credit / Debit Card
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === "promptpay" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setPaymentMethod("promptpay")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="promptpay" id="promptpay" />
                      <Label htmlFor="promptpay" className="font-medium cursor-pointer">
                        PromptPay
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number *</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name *</Label>
                      <Input
                        id="card-name"
                        placeholder="JOHN DOE"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date *</Label>
                        <Input
                          id="card-expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV *</Label>
                        <Input
                          id="card-cvv"
                          placeholder="123"
                          type="password"
                          maxLength={3}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "promptpay" && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      You will receive a PromptPay QR code after clicking "Complete Order"
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("address")}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handlePaymentConfirm}
                  >
                    Complete Order
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Order Complete */}
            {currentStep === "complete" && (
              <div className="border-2 border-green-500 rounded-lg bg-green-50 p-8 text-center">
                <CheckCircle2 className="w-20 h-20 mx-auto text-green-600 mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Order Placed Successfully!</h2>
                <p className="text-green-600 mb-6">
                  Redirecting you to the confirmation page...
                </p>
              </div>
            )}
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-white sticky top-4 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              {selectedDate && selectedTime && (
                <div className="pb-4 border-b space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Booking Time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    at {selectedTime}
                  </p>
                </div>
              )}

              {getSelectedAddress() && (
                <div className="pb-4 border-b space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Service Location</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getSelectedAddress()?.street}, {getSelectedAddress()?.district}
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration</span>
                  <span className="font-medium">{totalDuration} min</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/"
                className="block text-center text-sm text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
