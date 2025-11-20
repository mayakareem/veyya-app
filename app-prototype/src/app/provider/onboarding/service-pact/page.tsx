"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Star,
  Users,
  Heart,
  Award,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

const PACT_SCREENS = [
  {
    id: 1,
    icon: Users,
    title: "Welcome to the Veyya Partner Community",
    content: "At Veyya, we believe in empowering professionals like you to deliver trusted, high-quality services with confidence. Joining Veyya means becoming part of a community built on quality, reliability, and respect.",
    bullets: [],
    checkbox: false,
  },
  {
    id: 2,
    icon: Shield,
    title: "Professional Conduct",
    content: null,
    bullets: [
      "Be on time, well-presented, and ready to work.",
      "Show respect for every customer and their home.",
      "No smoking, rude language, or inappropriate behavior.",
      "Keep all customer details private and confidential."
    ],
    checkbox: true,
    checkboxLabel: "I agree to maintain professionalism at all times."
  },
  {
    id: 3,
    icon: Star,
    title: "Service Quality",
    content: "Delivering Quality Every Time",
    bullets: [
      "Follow the methods and quality standards taught in your training.",
      "Use approved tools and products only.",
      "Confirm customer satisfaction before marking the job complete.",
      "Always leave the space clean and tidy."
    ],
    checkbox: true,
    checkboxLabel: "I agree to maintain Veyya's service quality standards."
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: "Reliability & Accountability",
    content: "Reliability Builds Trust",
    bullets: [
      "Accept only the jobs you can complete on time.",
      "Notify Veyya immediately if you're delayed or unable to attend.",
      "Do not assign your job to others without approval.",
      "Report any accidents or issues within 12 hours."
    ],
    checkbox: true,
    checkboxLabel: "I agree to stay reliable and accountable."
  },
  {
    id: 5,
    icon: Shield,
    title: "Safety & Hygiene",
    content: "Safety First — For You and Your Clients",
    bullets: [
      "Follow Veyya's health, safety, and hygiene guidelines.",
      "Maintain personal cleanliness and proper grooming.",
      "Sanitize all tools before and after each service.",
      "Use protective gear where needed."
    ],
    checkbox: true,
    checkboxLabel: "I agree to follow all safety and hygiene protocols."
  },
  {
    id: 6,
    icon: Star,
    title: "Feedback & Ratings",
    content: "Grow Through Feedback",
    bullets: [
      "Welcome customer feedback as a way to improve.",
      "Keep your average rating above 4.5 stars.",
      "Low ratings or repeated complaints may lead to retraining or suspension."
    ],
    checkbox: true,
    checkboxLabel: "I understand and accept Veyya's feedback policy."
  },
  {
    id: 7,
    icon: Heart,
    title: "Veyya's Commitment to You",
    content: "Veyya Is Committed to You",
    bullets: [
      "Work only with verified customers for your safety and peace of mind.",
      "Ensure transparent and timely payments.",
      "Provide ongoing training and growth opportunities.",
      "Uphold fair platform practices with no hidden penalties.",
      "Offer safety support and handle incidents promptly.",
      "Recognize excellence through the Veyya Excellence Program."
    ],
    checkbox: true,
    checkboxLabel: "I understand Veyya's commitments and my role as a valued partner."
  },
  {
    id: 8,
    icon: Award,
    title: "Your Commitment to Excellence",
    content: "By completing this pact, you confirm that you understand and agree to uphold the Veyya Standard of Service at all times. Non-compliance may result in retraining, temporary suspension, or account removal.",
    bullets: [],
    checkbox: true,
    checkboxLabel: "I accept and agree to the Veyya Standard of Service",
    requiresSignature: true
  }
];

export default function ServicePactPage() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [agreements, setAgreements] = useState<{ [key: number]: boolean }>({});
  const [fullName, setFullName] = useState("");
  const [signature, setSignature] = useState("");

  const totalScreens = PACT_SCREENS.length;
  const progress = ((currentScreen + 1) / totalScreens) * 100;
  const currentPact = PACT_SCREENS[currentScreen];
  const Icon = currentPact.icon;

  const canProceed = () => {
    if (!currentPact.checkbox) return true;
    if (currentPact.requiresSignature) {
      return agreements[currentPact.id] && fullName && signature;
    }
    return agreements[currentPact.id];
  };

  const handleNext = () => {
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleComplete = () => {
    // Store pact acceptance
    const pactData = {
      fullName,
      signature,
      agreements,
      timestamp: new Date().toISOString(),
      ipAddress: "placeholder" // Would be captured server-side
    };

    // In a real app, this would be sent to the backend
    console.log("Service Pact Accepted:", pactData);

    toast.success("Service Pact accepted successfully!");

    // Redirect to next step in onboarding
    setTimeout(() => {
      router.push("/provider/onboarding/verification");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Container className="py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Step {currentScreen + 1} of {totalScreens}
              </p>
              <p className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </p>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Main Card */}
          <div className="bg-card border rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {currentPact.title}
                  </h1>
                  {currentPact.content && currentPact.id !== 8 && (
                    <p className="text-primary-foreground/90 mt-1">
                      {currentPact.content}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Special content for first screen */}
              {currentPact.id === 1 && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentPact.content}
                  </p>
                </div>
              )}

              {/* Special content for final screen */}
              {currentPact.id === 8 && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 dark:text-amber-200">
                    {currentPact.content}
                  </p>
                </div>
              )}

              {/* Bullets */}
              {currentPact.bullets.length > 0 && (
                <ul className="space-y-3">
                  {currentPact.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-base text-foreground">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Signature Fields (Final Screen) */}
              {currentPact.requiresSignature && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full legal name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signature">Digital Signature *</Label>
                    <Input
                      id="signature"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Type your full name to sign"
                      required
                      className="font-signature text-xl"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    />
                    <p className="text-xs text-muted-foreground">
                      By typing your name, you are providing a legal digital signature
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium mb-1">Date: {new Date().toLocaleDateString()}</p>
                    <p>Your acceptance will be recorded with timestamp and IP address for legal verification.</p>
                  </div>
                </div>
              )}

              {/* Checkbox Agreement */}
              {currentPact.checkbox && (
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border-2 border-primary/20">
                  <Checkbox
                    id={`agreement-${currentPact.id}`}
                    checked={agreements[currentPact.id] || false}
                    onCheckedChange={(checked) =>
                      setAgreements({ ...agreements, [currentPact.id]: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`agreement-${currentPact.id}`}
                    className="text-base font-medium cursor-pointer leading-relaxed"
                  >
                    {currentPact.checkboxLabel}
                  </Label>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="p-8 pt-0 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentScreen === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex gap-2">
                {PACT_SCREENS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentScreen
                        ? "w-8 bg-primary"
                        : index < currentScreen
                        ? "w-2 bg-primary/50"
                        : "w-2 bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
                size="lg"
              >
                {currentScreen === totalScreens - 1 ? (
                  <>
                    Complete & Continue
                    <Award className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about the service pact?{" "}
              <a href="/support" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
