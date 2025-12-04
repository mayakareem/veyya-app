"use client";

import { useState } from "react";
import { X, Clock, MapPin, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import type { Service } from "@/data/servicesData";
import SimpleDateTimeSelector from "@/components/booking/SimpleDateTimeSelector";
import AddressSelector from "@/components/booking/AddressSelector";

interface ServiceDetailModalProps {
  service: Service;
  category: string;
  subcategory: string;
  onClose: () => void;
}

// Common add-ons for services
const commonAddOns = [
  { id: "rush", name: "Rush Service (Within 2 hours)", price: 50 },
  { id: "weekend", name: "Weekend Premium", price: 30 },
  { id: "extended", name: "Extended Session (+30 mins)", price: 40 },
  { id: "premium", name: "Premium Products", price: 25 },
];

export default function ServiceDetailModal({
  service,
  category,
  subcategory,
  onClose,
}: ServiceDetailModalProps) {
  const { addToCart } = useCart();
  const [step, setStep] = useState<"details" | "address" | "datetime" | "addons">("details");
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    service.variants && service.variants.length > 0 ? service.variants[0].name : null
  );
  const [quantity, setQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<{
    date: Date | undefined;
    time: string;
  }>({ date: undefined, time: "" });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Mock pricing - in real app this would come from backend
  const basePrice = 150;
  const variantPrice = selectedVariant ? 20 : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
    const addon = commonAddOns.find((a) => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);
  const totalPrice = (basePrice + variantPrice + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    // Create a ServiceDetail-compatible object
    const serviceDetail = {
      name: service.name,
      price: basePrice + variantPrice,
      duration: 60, // Default duration, could be made configurable
      description: service.notes || `${service.name} service from ${subcategory} category`,
    };

    // Format date for cart
    const bookingDate = selectedDateTime.date?.toISOString().split("T")[0];
    const bookingTime = selectedDateTime.time;

    addToCart(serviceDetail, bookingDate, bookingTime);
    toast.success("Added to cart!", {
      description: `${service.name} has been added to your cart.`,
    });
    onClose();
  };

  const canProceedToNextStep = () => {
    if (step === "details") return true;
    if (step === "address") return selectedAddress !== null;
    if (step === "datetime") return selectedDateTime.date && selectedDateTime.time;
    if (step === "addons") return true;
    return false;
  };

  const handleNextStep = () => {
    if (step === "details") setStep("address");
    else if (step === "address") setStep("datetime");
    else if (step === "datetime") setStep("addons");
    else if (step === "addons") handleAddToCart();
  };

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">
              {subcategory}
            </Badge>
            <h2 className="text-2xl font-bold">{service.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{category}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-muted/20 border-b">
          <div className="flex items-center justify-between">
            {["Details", "Address", "Date & Time", "Add-ons"].map((label, index) => {
              const stepKey = ["details", "address", "datetime", "addons"][index];
              const isActive = step === stepKey;
              const isCompleted =
                ["details", "address", "datetime", "addons"].indexOf(step) >
                index;

              return (
                <div key={label} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <p
                    className={`ml-2 text-xs font-medium hidden sm:block ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </p>
                  {index < 3 && (
                    <div
                      className={`w-8 sm:w-12 h-0.5 mx-2 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {step === "details" && (
            <div className="space-y-6">
              {/* Service Description */}
              {service.notes && (
                <div>
                  <h3 className="font-semibold mb-2">About This Service</h3>
                  <p className="text-sm text-muted-foreground">{service.notes}</p>
                </div>
              )}

              {/* Variants */}
              {service.variants && service.variants.length > 0 && (
                <div>
                  <Label className="mb-3 block">Select Option</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {service.variants.map((variant) => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedVariant(variant.name)}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          selectedVariant === variant.name
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {variant.name}
                        {variant.notes && (
                          <p className="text-xs text-muted-foreground mt-1 font-normal">
                            {variant.notes}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="mb-3 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <Label htmlFor="special-requests" className="mb-3 block">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any specific requirements or preferences..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === "address" && (
            <AddressSelector
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
            />
          )}

          {step === "datetime" && (
            <SimpleDateTimeSelector
              selectedDate={selectedDateTime.date}
              selectedTime={selectedDateTime.time}
              onDateChange={(date) =>
                setSelectedDateTime({ ...selectedDateTime, date })
              }
              onTimeChange={(time) =>
                setSelectedDateTime({ ...selectedDateTime, time })
              }
            />
          )}

          {step === "addons" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Enhance Your Service</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add optional extras to customize your experience
                </p>
              </div>

              <div className="space-y-3">
                {commonAddOns.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedAddOns.includes(addon.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                              selectedAddOns.includes(addon.id)
                                ? "bg-primary border-primary"
                                : "border-muted-foreground"
                            }`}
                          >
                            {selectedAddOns.includes(addon.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <p className="font-medium">{addon.name}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-primary">
                        +{addon.price} AED
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-muted/30 rounded-lg p-4 mt-6">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {service.name} {selectedVariant && `(${selectedVariant})`}
                    </span>
                    <span>{basePrice + variantPrice} AED</span>
                  </div>
                  {quantity > 1 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity</span>
                      <span>× {quantity}</span>
                    </div>
                  )}
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Add-ons</span>
                      <span>{addOnsTotal} AED</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-primary">{totalPrice} AED</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-primary">{totalPrice} AED</p>
          </div>
          <div className="flex gap-2">
            {step !== "details" && (
              <Button
                variant="outline"
                onClick={() => {
                  if (step === "address") setStep("details");
                  else if (step === "datetime") setStep("address");
                  else if (step === "addons") setStep("datetime");
                }}
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              disabled={!canProceedToNextStep()}
              className="min-w-32"
            >
              {step === "addons" ? "Add to Cart" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
