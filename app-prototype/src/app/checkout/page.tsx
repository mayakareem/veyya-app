"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { getServiceImage } from "@/lib/utils/serviceImages";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Home
} from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();

  // Form state
  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");
  const [savePaymentDetails, setSavePaymentDetails] = useState(false);
  const [formData, setFormData] = useState({
    // Personal details
    fullName: "",
    email: "",
    phone: "",
    // Address
    address: "",
    district: "",
    city: "Bangkok",
    postalCode: "",
    // Appointment
    appointmentDate: "",
    appointmentTime: "",
    // Card details
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const totalPrice = getTotalPrice();
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  if (cart.length === 0) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some services to get started</p>
          <Button onClick={() => router.push("/")} size="lg">
            Browse Services
          </Button>
        </div>
      </Container>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all personal details");
      return;
    }

    if (!formData.address || !formData.district || !formData.postalCode) {
      toast.error("Please fill in your complete address");
      return;
    }

    // Check if all services have booking dates and times
    const missingBookings = cart.filter(item => !item.bookingDate || !item.bookingTime);
    if (missingBookings.length > 0) {
      toast.error("Please select date and time for all services");
      return;
    }

    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        toast.error("Please fill in all card details");
        return;
      }
    }

    // Simulate payment processing
    toast.success("Processing payment...");

    setTimeout(() => {
      clearCart();
      router.push("/confirmation");
    }, 1500);
  };

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
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
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Secure checkout
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Details */}
              <div className="border rounded-lg p-6 bg-card space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Personal Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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

              {/* Service Address */}
              <div className="border rounded-lg p-6 bg-card space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Service Address</h2>
                </div>

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
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-6 bg-card space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="promptpay" id="promptpay" />
                    <Label htmlFor="promptpay" className="flex-1 cursor-pointer">
                      PromptPay
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="savePayment"
                        checked={savePaymentDetails}
                        onCheckedChange={(checked) => setSavePaymentDetails(checked as boolean)}
                      />
                      <Label htmlFor="savePayment" className="text-sm cursor-pointer">
                        Save payment details for future bookings
                      </Label>
                    </div>
                  </div>
                )}

                {/* PromptPay */}
                {paymentMethod === "promptpay" && (
                  <div className="pt-4 border-t text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      You will receive a PromptPay QR code after placing your order
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-card sticky top-4 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                {/* Services List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => {
                    const imageUrl = getServiceImage(item.name, "");
                    return (
                      <div key={item.name} className="flex gap-3 pb-3 border-b">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ฿{item.price} × {item.quantity}
                          </p>
                          {item.bookingDate && item.bookingTime && (
                            <div className="flex items-center gap-3 mt-1 text-xs text-primary">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.bookingDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.bookingTime}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            ฿{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee (5%)</span>
                    <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-primary">
                      ฿{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Pay ฿{grandTotal.toLocaleString()}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
