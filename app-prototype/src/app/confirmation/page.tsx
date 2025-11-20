"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, Mail, Download, ArrowRight } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();

  // In a real app, this would come from a query param or state
  const bookingId = `VY${Date.now().toString().slice(-8)}`;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 1);

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your booking. Your payment has been received.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="border rounded-lg p-6 bg-card space-y-6 mb-6">
          <div className="flex items-start justify-between pb-4 border-b">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
              <p className="text-xl font-semibold font-mono">{bookingId}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Appointment Details</p>
                <p className="text-sm text-muted-foreground">
                  Your services are scheduled and the provider will contact you shortly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Confirmation Email</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your registered email address
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Service Location</p>
                <p className="text-sm text-muted-foreground">
                  The provider will arrive at your specified address
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="border rounded-lg p-6 bg-muted/30 mb-6">
          <h2 className="font-semibold mb-3">What happens next?</h2>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                1
              </span>
              <span className="text-muted-foreground">
                We'll match you with the best available provider for your services
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                2
              </span>
              <span className="text-muted-foreground">
                The provider will contact you to confirm the appointment time
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                3
              </span>
              <span className="text-muted-foreground">
                Enjoy your service at your preferred time and location
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                4
              </span>
              <span className="text-muted-foreground">
                Rate and review your experience to help others
              </span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => router.push("/bookings")}
          >
            View My Bookings
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Book More Services
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 border rounded-lg bg-card text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Need help with your booking?
          </p>
          <Button variant="link" className="text-primary">
            Contact Support
          </Button>
        </div>
      </div>
    </Container>
  );
}
