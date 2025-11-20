"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  bookingReviewSchema,
  type BookingReviewData,
  type CompleteBookingData,
} from "@/lib/validations/booking";
import { format } from "date-fns";

interface ReviewStepProps {
  providerId: string;
  providerName: string;
  bookingData: Partial<CompleteBookingData>;
  initialData?: Partial<BookingReviewData>;
  onNext: (data: BookingReviewData) => void;
  onBack: () => void;
}

// Mock service data - match with actual service from bookingData
const MOCK_SERVICES = [
  { id: "s1", name: "Gel Manicure", price: 120, duration: 60 },
  { id: "s2", name: "Spa Pedicure", price: 150, duration: 75 },
  { id: "s3", name: "Full Nail Set", price: 200, duration: 90 },
];

export default function ReviewStep({
  providerId,
  providerName,
  bookingData,
  initialData,
  onNext,
  onBack,
}: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingReviewData>({
    resolver: zodResolver(bookingReviewSchema),
    defaultValues: initialData,
  });

  const acceptTerms = watch("acceptTerms");
  const paymentMethod = watch("paymentMethod");

  const selectedService = MOCK_SERVICES.find(
    (s) => s.id === bookingData.serviceId
  );
  const totalAmount = selectedService?.price || 0;

  const onSubmit = async (data: BookingReviewData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onNext(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Booking Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>

        <div className="space-y-4">
          {/* Provider */}
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground">Provider</span>
            <span className="font-medium text-right">{providerName}</span>
          </div>

          {/* Service */}
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground">Service</span>
            <div className="text-right">
              <p className="font-medium">{selectedService?.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedService?.duration} minutes
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground">Date & Time</span>
            <div className="text-right">
              <p className="font-medium">
                {bookingData.date
                  ? format(new Date(bookingData.date), "EEEE, MMMM d, yyyy")
                  : "-"}
              </p>
              <p className="text-sm text-muted-foreground">
                {bookingData.timeSlot || "-"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground">Location</span>
            <p className="font-medium text-right max-w-xs">
              {bookingData.address || "-"}
            </p>
          </div>

          {/* Instructions */}
          {bookingData.specialInstructions && (
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Instructions</span>
              <p className="text-sm text-right max-w-xs">
                {bookingData.specialInstructions}
              </p>
            </div>
          )}

          <hr className="my-4" />

          {/* Pricing */}
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total Amount</span>
            <span className="font-bold text-2xl">฿{totalAmount}</span>
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <RadioGroup
          onValueChange={(value) =>
            setValue("paymentMethod", value as "card" | "promptpay")
          }
          defaultValue={initialData?.paymentMethod}
          aria-label="Select payment method"
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted cursor-pointer">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">
                    Visa, Mastercard, American Express
                  </p>
                </div>
                <span className="text-2xl">💳</span>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted cursor-pointer">
            <RadioGroupItem value="promptpay" id="promptpay" />
            <Label htmlFor="promptpay" className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">PromptPay</p>
                  <p className="text-sm text-muted-foreground">
                    Scan QR code to pay via Thai banking app
                  </p>
                </div>
                <span className="text-2xl">📱</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-sm text-destructive mt-2" role="alert">
            {errors.paymentMethod.message}
          </p>
        )}
      </Card>

      {/* Escrow Protection Notice */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Payment Protection
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              Your payment is held securely in escrow. The provider receives payment
              only after service completion and your confirmation, or automatically
              after 24 hours. This protects both parties.
            </p>
          </div>
        </div>
      </Card>

      {/* Cancellation Policy */}
      <Card className="p-6 bg-muted">
        <div className="flex gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="font-semibold mb-2">Cancellation Policy</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Free cancellation up to 12 hours before service</li>
              <li>• 50% fee if cancelled within 12 hours</li>
              <li>• No-show results in full charge</li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-sm text-primary underline mt-2"
                >
                  Read full terms & conditions
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Terms & Conditions</DialogTitle>
                  <DialogDescription>
                    Please review our booking terms and cancellation policy
                  </DialogDescription>
                </DialogHeader>
                <div className="prose prose-sm">
                  <h3>Booking Terms</h3>
                  <p>
                    By booking through Veyya, you agree to our platform terms
                    including payment processing, service delivery expectations, and
                    dispute resolution procedures.
                  </p>
                  <h3>Cancellation Policy</h3>
                  <p>
                    <strong>Free Cancellation:</strong> Cancel up to 12 hours before
                    your scheduled service for a full refund.
                  </p>
                  <p>
                    <strong>Late Cancellation:</strong> Cancellations within 12 hours
                    of service incur a 50% fee to compensate the provider.
                  </p>
                  <p>
                    <strong>No-Show:</strong> Failure to be present at the scheduled
                    time results in full charge.
                  </p>
                  <h3>Payment & Escrow</h3>
                  <p>
                    Payments are held in escrow and released to providers after
                    service completion or 24 hours, whichever comes first.
                  </p>
                  <h3>Dispute Resolution</h3>
                  <p>
                    If issues arise, contact our support team within 24 hours for
                    resolution assistance.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Terms Agreement */}
      <Card className="p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) =>
              setValue("acceptTerms", checked as boolean)
            }
            aria-invalid={errors.acceptTerms ? "true" : "false"}
            aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
          />
          <div className="flex-1">
            <Label
              htmlFor="terms"
              className="text-sm font-normal cursor-pointer leading-relaxed"
            >
              I agree to the terms & conditions and cancellation policy. I
              understand that my payment will be held in escrow until service
              completion.
            </Label>
            {errors.acceptTerms && (
              <p id="terms-error" className="text-sm text-destructive mt-2" role="alert">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
          aria-label="Go back to details"
        >
          ← Back
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!acceptTerms || !paymentMethod || isSubmitting}
          className="min-w-[200px]"
          aria-label="Confirm booking and proceed to payment"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processing...
            </>
          ) : (
            <>Confirm & Pay ฿{totalAmount}</>
          )}
        </Button>
      </div>
    </form>
  );
}
