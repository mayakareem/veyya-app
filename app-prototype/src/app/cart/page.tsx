"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { getServiceImage } from "@/lib/utils/serviceImages";
import DateTimeSelector from "@/components/booking/DateTimeSelector";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

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
    clearCart
  } = useCart();

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const primaryService = getPrimaryService();
  const secondaryServices = getSecondaryServices();
  const totalPrice = getTotalPrice();
  const totalDuration = getTotalDuration();
  const serviceFee = Math.round(totalPrice * 0.05); // 5% service fee
  const grandTotal = totalPrice + serviceFee;

  const handleDateTimeConfirm = (date: string, time: string) => {
    if (primaryService) {
      updateBookingDetails(primaryService.name, date, time);
      setShowDateTimePicker(false);
      toast.success("Booking time updated");
    }
  };

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
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <p className="text-sm text-muted-foreground">
              {cart.length} {cart.length === 1 ? "service" : "services"} • Total duration: {totalDuration} min
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Primary Service - with time selection */}
            {primaryService && (
              <div className="border-2 border-primary/20 rounded-lg bg-card shadow-sm">
                <div className="p-4 bg-primary/5 border-b">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Calendar className="w-4 h-4" />
                    <span>Primary Service (Time selection applies to all services)</span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={getServiceImage(primaryService.name, "")}
                        alt={primaryService.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{primaryService.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {primaryService.duration} min • ฿{primaryService.price}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {primaryService.description}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
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

                      <div className="text-right">
                        <p className="font-semibold">
                          ฿{(primaryService.price * primaryService.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {primaryService.bookingDate && primaryService.bookingTime ? (
                          <span className="text-muted-foreground">
                            {new Date(primaryService.bookingDate).toLocaleDateString()} at {primaryService.bookingTime}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">No time selected</span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDateTimePicker(true)}
                      >
                        {primaryService.bookingDate ? "Change Time" : "Select Time"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Services - line items only */}
            {secondaryServices.length > 0 && (
              <div className="border rounded-lg bg-card">
                <div className="px-4 py-3 bg-muted/30 border-b">
                  <h3 className="text-sm font-medium">Additional Services</h3>
                  <p className="text-xs text-muted-foreground">These will be scheduled consecutively after your primary service</p>
                </div>
                <div className="divide-y">
                  {secondaryServices.map((item) => {
                    const itemTotal = item.price * item.quantity;
                    return (
                      <div key={item.name} className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                        {/* Compact Image */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={getServiceImage(item.name, "")}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {item.duration} min • ฿{item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
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
                            <p className="text-sm font-semibold">฿{itemTotal.toLocaleString()}</p>
                          </div>

                          <button
                            onClick={() => updateQuantity(item.name, 0)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              onClick={clearCart}
              className="w-full text-muted-foreground hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-card sticky top-4 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>

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

              {primaryService && !primaryService.bookingDate && (
                <div className="bg-orange-50 border border-orange-200 rounded p-3 text-xs text-orange-700">
                  Please select a booking time for your service
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push("/checkout")}
                disabled={!primaryService?.bookingDate}
              >
                Proceed to Checkout
              </Button>

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

      {/* Date & Time Picker Modal */}
      {showDateTimePicker && primaryService && (
        <DateTimeSelector
          service={primaryService}
          onConfirm={handleDateTimeConfirm}
          onCancel={() => setShowDateTimePicker(false)}
        />
      )}
    </Container>
  );
}
