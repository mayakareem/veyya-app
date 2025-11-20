"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bookingDetailsSchema,
  type BookingDetailsData,
} from "@/lib/validations/booking";

interface DetailsStepProps {
  providerId: string;
  providerName: string;
  initialData?: Partial<BookingDetailsData>;
  onNext: (data: BookingDetailsData) => void;
  onBack: () => void;
}

// Mock services - in production, fetch from API
const MOCK_SERVICES = [
  { id: "s1", name: "Gel Manicure", price: 120, duration: 60 },
  { id: "s2", name: "Spa Pedicure", price: 150, duration: 75 },
  { id: "s3", name: "Full Nail Set", price: 200, duration: 90 },
];

export default function DetailsStep({
  providerId,
  providerName,
  initialData,
  onNext,
  onBack,
}: DetailsStepProps) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingDetailsData>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: initialData,
  });

  const selectedServiceId = watch("serviceId");
  const specialInstructions = watch("specialInstructions");
  const selectedService = MOCK_SERVICES.find((s) => s.id === selectedServiceId);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setUseCurrentLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("lat", position.coords.latitude);
          setValue("lng", position.coords.longitude);
          // TODO: Reverse geocode to get address
          setValue("address", "Current Location (GPS)");
        },
        (error) => {
          console.error("Error getting location:", error);
          setUseCurrentLocation(false);
          alert("Unable to get your location. Please enter your address manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const onSubmit = (data: BookingDetailsData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Service Selection */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Select Service</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="service-select">Service *</Label>
            <Select
              onValueChange={(value) => setValue("serviceId", value)}
              defaultValue={initialData?.serviceId}
            >
              <SelectTrigger id="service-select" aria-label="Select service">
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_SERVICES.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex justify-between items-center gap-4">
                      <span>{service.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ฿{service.price} · {service.duration} min
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceId && (
              <p className="text-sm text-destructive mt-1" role="alert">
                {errors.serviceId.message}
              </p>
            )}
          </div>

          {selectedService && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedService.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Duration: {selectedService.duration} minutes
                  </p>
                </div>
                <p className="text-lg font-semibold">฿{selectedService.price}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Service Location */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Service Location</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Address *</Label>
            <div className="space-y-2">
              <Textarea
                id="address"
                placeholder="Enter your complete address (street, building, floor, room)"
                className="min-h-[100px]"
                {...register("address")}
                aria-invalid={errors.address ? "true" : "false"}
                aria-describedby={errors.address ? "address-error" : undefined}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetLocation}
                disabled={useCurrentLocation}
                className="w-full sm:w-auto"
              >
                📍 Use my current location
              </Button>
            </div>
            {errors.address && (
              <p id="address-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-1">
              📌 Location Privacy
            </p>
            <p className="text-blue-700">
              Your exact address is only shared with {providerName} after booking
              confirmation. We strip GPS metadata from all photos for your safety.
            </p>
          </div>
        </div>
      </Card>

      {/* Special Instructions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Special Instructions <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
        </h2>
        <div className="space-y-2">
          <Textarea
            id="special-instructions"
            placeholder="Any special requests, allergies, or instructions for the provider..."
            className="min-h-[120px]"
            maxLength={500}
            {...register("specialInstructions")}
            aria-label="Special instructions for the provider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Optional but helpful for the provider</span>
            <span>{specialInstructions?.length || 0}/500</span>
          </div>
          {errors.specialInstructions && (
            <p className="text-sm text-destructive" role="alert">
              {errors.specialInstructions.message}
            </p>
          )}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          aria-label="Go back to time selection"
        >
          ← Back
        </Button>
        <Button
          type="submit"
          size="lg"
          aria-label="Continue to review and payment"
        >
          Continue to Review →
        </Button>
      </div>
    </form>
  );
}
