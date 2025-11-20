"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  TrendingUp,
  Shield,
  Users,
  Star,
  Calendar,
  CreditCard,
  Award,
  ArrowRight,
  Clock
} from "lucide-react";

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Access thousands of verified customers actively looking for your services"
  },
  {
    icon: Shield,
    title: "Verified Customers",
    description: "Work only with verified clients for your safety and peace of mind"
  },
  {
    icon: CreditCard,
    title: "Guaranteed Payments",
    description: "Transparent, timely payments with weekly payouts directly to your account"
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "You're in control. Accept bookings that work for your schedule"
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    description: "Earn ratings and reviews to grow your profile and attract more customers"
  },
  {
    icon: Award,
    title: "Excellence Program",
    description: "Top-rated providers get rewards, promotions, and priority bookings"
  }
];

const ONBOARDING_STEPS = [
  {
    number: 1,
    title: "Service Pact",
    description: "Review and accept our standards of service",
    duration: "5 min"
  },
  {
    number: 2,
    title: "Profile Setup",
    description: "Create your professional profile and select services",
    duration: "10 min"
  },
  {
    number: 3,
    title: "Verification",
    description: "Upload ID and complete background check",
    duration: "2-3 days"
  },
  {
    number: 4,
    title: "Get Started",
    description: "Start receiving bookings and building your business",
    duration: "Same day"
  }
];

export default function ProviderOnboardingLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <Container className="py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Join 1,000+ trusted providers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Become a Veyya Provider
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empower your business with Veyya. Connect with verified customers,
              grow your income, and build your reputation on Thailand's trusted
              service platform.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Onboarding Steps */}
          <div className="bg-card border rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Getting Started is Easy</h2>
              <p className="text-muted-foreground">
                Complete these simple steps to start accepting bookings
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {ONBOARDING_STEPS.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-muted z-0" />
                  )}

                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg">
                        {step.number}
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="gap-2 text-lg px-8 py-6"
                onClick={() => router.push("/provider/onboarding/service-pact")}
              >
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Free to join • No upfront costs • Flexible schedule
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-muted/30 rounded-xl p-8">
            <h2 className="text-xl font-bold mb-6">What You'll Need</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Valid ID & Background Check</p>
                  <p className="text-sm text-muted-foreground">
                    Government-issued ID and clean background check
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Professional Experience</p>
                  <p className="text-sm text-muted-foreground">
                    Proven skills in your service category
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Bank Account</p>
                  <p className="text-sm text-muted-foreground">
                    For receiving payments directly
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Own Equipment & Transport</p>
                  <p className="text-sm text-muted-foreground">
                    Professional tools and reliable transportation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Have questions about becoming a provider?
            </p>
            <Button variant="outline" onClick={() => router.push("/provider/faq")}>
              View Provider FAQ
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
