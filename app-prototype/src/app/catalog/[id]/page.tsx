"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { MultiStepBooking, type BookingData } from "@/components/booking/MultiStepBooking";
import { getServiceById } from "@/lib/constants/services";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceId = decodeURIComponent(resolvedParams.id);

  // Get service details
  const serviceData = getServiceById(serviceId);

  if (!serviceData) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </Container>
      </main>
    );
  }

  const { service, subcategory, category } = serviceData;

  // Parse price (take first value from range)
  const priceMatch = service.priceRange?.match(/฿([\d,]+)/);
  const basePrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, "")) * 100 : 0;

  // Parse duration
  const durationMatch = service.duration?.match(/(\d+)/);
  const baseDuration = durationMatch ? parseInt(durationMatch[1]) : 60;

  const handleBookingComplete = (bookingData: BookingData) => {
    // In production, this would make an API call to create the booking
    console.log("Booking data:", bookingData);

    // Show success message
    toast.success("Booking confirmed!", {
      description: `Your ${service.name} is scheduled for ${bookingData.date.toLocaleDateString()} at ${bookingData.time}`,
    });

    // Redirect to confirmation page
    setTimeout(() => {
      router.push("/confirmation");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-muted/30 py-6">
      <Container>
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Service Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
          <p className="text-muted-foreground">
            {category.name} • {subcategory.name}
          </p>
        </div>

        {/* Multi-Step Booking Component */}
        <MultiStepBooking
          serviceName={service.name}
          basePrice={basePrice}
          baseDuration={baseDuration}
          onComplete={handleBookingComplete}
        />
      </Container>
    </main>
  );
}
