"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { SERVICE_CATEGORIES, DETAILED_SERVICES } from "@/lib/constants/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Minus, ShoppingCart, Clock, LayoutGrid, List, CreditCard, Lock, Calendar, User, Home } from "lucide-react";
import { getServiceImage } from "@/lib/utils/serviceImages";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const categoryName = decodeURIComponent(resolvedParams.name);

  const { cart, addToCart, removeFromCart, getItemQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [viewMode, setViewMode] = useState<"list" | "tile">("tile");
  const [showCheckout, setShowCheckout] = useState(false);

  // Form state
  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");
  const [savePaymentDetails, setSavePaymentDetails] = useState(true); // Auto-selected
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    city: "Bangkok",
    postalCode: "",
    appointmentDate: "",
    appointmentTime: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const category = SERVICE_CATEGORIES.find(c => c.name === categoryName);
  const services = DETAILED_SERVICES[categoryName] || [];

  if (!category) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </Container>
      </main>
    );
  }

  const Icon = category.Icon;
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
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

    if (!formData.appointmentDate || !formData.appointmentTime) {
      toast.error("Please select appointment date and time");
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
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-xl">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                <p className="text-muted-foreground mt-1">{category.description}</p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "tile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tile")}
                className="gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline">Tile</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">List</span>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {services.length} services available • Select services and proceed to checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Services - List or Tile View */}
          <div className="lg:col-span-2">
            {viewMode === "list" ? (
              /* List View */
              <div className="space-y-3">
                {services.map((service) => {
                  const quantity = getItemQuantity(service.name);

                  return (
                    <div
                      key={service.name}
                      className="bg-background border rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {service.duration} min
                            </div>
                            <div className="font-semibold text-white bg-primary px-3 py-1 rounded-full">
                              ฿{service.price}
                            </div>
                          </div>
                        </div>

                        {/* Add to Cart Controls */}
                        <div className="flex-shrink-0">
                          {quantity === 0 ? (
                            <Button
                              onClick={() => addToCart(service)}
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                              <Button
                                onClick={() => removeFromCart(service.name)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {quantity}
                              </span>
                              <Button
                                onClick={() => addToCart(service)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Tile View */
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => {
                  const quantity = getItemQuantity(service.name);
                  const imageUrl = getServiceImage(service.name, categoryName);

                  return (
                    <div
                      key={service.name}
                      className="bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                    >
                      {/* Service Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-muted">
                        <Image
                          src={imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 font-semibold text-white bg-primary px-3 py-1.5 rounded-full shadow-lg">
                          ฿{service.price}
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {service.duration} min
                          </div>

                          {/* Add to Cart Controls */}
                          {quantity === 0 ? (
                            <Button
                              onClick={() => addToCart(service)}
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                              <Button
                                onClick={() => removeFromCart(service.name)}
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center font-semibold text-sm">
                                {quantity}
                              </span>
                              <Button
                                onClick={() => addToCart(service)}
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Summary / Checkout Form - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-background border rounded-lg sticky top-6">
              {!showCheckout ? (
                /* Cart Summary */
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ShoppingCart className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Your Cart</h2>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm">
                        No services added yet
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                        {cart.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-start justify-between gap-2 pb-3 border-b"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                ฿{item.price} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold">
                              ฿{item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4 space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Service Fee (5%):</span>
                          <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary">฿{grandTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setShowCheckout(true)}
                      >
                        Continue to Checkout
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleCheckout} className="max-h-[calc(100vh-120px)] overflow-y-auto">
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b">
                      <h2 className="text-lg font-semibold">Checkout</h2>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCheckout(false)}
                      >
                        Back to Cart
                      </Button>
                    </div>

                    {/* Order Summary Compact */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{totalItems} items</span>
                        <span className="font-semibold">฿{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span className="font-semibold">฿{serviceFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold border-t pt-2">
                        <span>Total</span>
                        <span className="text-primary">฿{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-sm">Personal Details</h3>
                      </div>
                      <Input
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>

                    {/* Service Address */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-sm">Service Address</h3>
                      </div>
                      <Input
                        placeholder="Street Address *"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="District *"
                          value={formData.district}
                          onChange={(e) => handleInputChange("district", e.target.value)}
                          required
                        />
                        <Input
                          placeholder="Postal Code *"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          required
                        />
                      </div>
                      <Input
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>

                    {/* Appointment */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-sm">Appointment</h3>
                      </div>
                      <Input
                        type="date"
                        value={formData.appointmentDate}
                        onChange={(e) => handleInputChange("appointmentDate", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <Input
                        type="time"
                        value={formData.appointmentTime}
                        onChange={(e) => handleInputChange("appointmentTime", e.target.value)}
                        required
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-sm">Payment Method</h3>
                      </div>

                      <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <RadioGroupItem value="card" id="card-inline" />
                          <Label htmlFor="card-inline" className="flex-1 cursor-pointer text-sm">
                            Credit / Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <RadioGroupItem value="promptpay" id="promptpay-inline" />
                          <Label htmlFor="promptpay-inline" className="flex-1 cursor-pointer text-sm">
                            PromptPay
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "card" && (
                        <div className="space-y-3 pt-3">
                          <Input
                            placeholder="Card Number *"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            maxLength={19}
                            required
                          />
                          <Input
                            placeholder="Cardholder Name *"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            required
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="MM/YY *"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                              maxLength={5}
                              required
                            />
                            <Input
                              placeholder="CVV *"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              maxLength={4}
                              type="password"
                              required
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="savePayment-inline"
                              checked={savePaymentDetails}
                              onCheckedChange={(checked) => setSavePaymentDetails(checked as boolean)}
                            />
                            <Label htmlFor="savePayment-inline" className="text-xs cursor-pointer">
                              Save payment details for future bookings
                            </Label>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "promptpay" && (
                        <div className="text-center py-3">
                          <p className="text-xs text-muted-foreground">
                            You will receive a PromptPay QR code after placing your order
                          </p>
                        </div>
                      )}
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Pay ฿{grandTotal.toLocaleString()}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
