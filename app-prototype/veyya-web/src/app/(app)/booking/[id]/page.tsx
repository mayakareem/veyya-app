"use client";

import { use, useState } from "react";
import { getProviderById } from "@/lib/cms";
import BookingStepper from "@/components/BookingStepper";
import type { CompleteBookingData } from "@/lib/validations/booking";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/actions";
import { toast } from "sonner";

type Props = { params: Promise<{ id: string }> };

export default function Booking({ params }: Props) {
  const router = useRouter();
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Fetch provider data in a proper client component pattern
  // For now, using mock data
  const provider = {
    id,
    name: "Lina Beauty Studio",
  };

  const handleBookingComplete = async (bookingData: CompleteBookingData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Call server action to create booking
      const result = await createBooking({
        providerId: id,
        ...bookingData,
      });

      if (result.ok) {
        toast.success("Booking created successfully!", {
          description: "You'll receive a confirmation email shortly.",
        });

        // TODO: Navigate to confirmation page when it exists
        // router.push(`/booking/${result.bookingId}/confirmation`);

        // For now, redirect to search
        router.push('/search');
      } else {
        toast.error("Failed to create booking", {
          description: "Please try again or contact support.",
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Something went wrong", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <BookingStepper
          providerId={provider.id}
          providerName={provider.name}
          onComplete={handleBookingComplete}
        />
      </div>
    </main>
  );
}
