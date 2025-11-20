"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Upload,
  FileText,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export default function VerificationPage() {
  const router = useRouter();
  const [uploadedDocs, setUploadedDocs] = useState<{
    id: boolean;
    background: boolean;
    certificate: boolean;
  }>({
    id: false,
    background: false,
    certificate: false
  });

  const allDocsUploaded = uploadedDocs.id && uploadedDocs.background;
  const progress = Object.values(uploadedDocs).filter(Boolean).length / 2 * 100;

  const handleSubmit = () => {
    if (!allDocsUploaded) {
      toast.error("Please upload all required documents");
      return;
    }

    toast.success("Application submitted for review!");

    setTimeout(() => {
      router.push("/provider/onboarding/pending");
    }, 1500);
  };

  const handleDocUpload = (docType: keyof typeof uploadedDocs) => {
    // Simulate file upload
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
    toast.success("Document uploaded successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Step 3 of 4: Verification
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
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Verification & Documents
                  </h1>
                  <p className="text-primary-foreground/90 mt-1">
                    Help us verify your identity and credentials
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Government ID */}
              <div className="border-2 border-dashed rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Government-Issued ID *
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Upload a clear photo of your passport, national ID, or driver's license
                      </p>
                    </div>
                  </div>
                  {uploadedDocs.id && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>

                {!uploadedDocs.id ? (
                  <Button
                    onClick={() => handleDocUpload('id')}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload ID Document
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>ID document uploaded successfully</span>
                  </div>
                )}
              </div>

              {/* Background Check */}
              <div className="border-2 border-dashed rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Background Check Consent *
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We'll conduct a background check to ensure customer safety
                      </p>
                    </div>
                  </div>
                  {uploadedDocs.background && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>

                {!uploadedDocs.background ? (
                  <Button
                    onClick={() => handleDocUpload('background')}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Consent to Background Check
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Background check consent provided</span>
                  </div>
                )}
              </div>

              {/* Professional Certificate (Optional) */}
              <div className="border-2 border-dashed rounded-lg p-6 opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Professional Certificates (Optional)
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Upload relevant certifications to boost your profile
                      </p>
                    </div>
                  </div>
                  {uploadedDocs.certificate && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>

                {!uploadedDocs.certificate ? (
                  <Button
                    onClick={() => handleDocUpload('certificate')}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Certificates
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Certificates uploaded</span>
                  </div>
                )}
              </div>

              {/* What Happens Next */}
              <div className="bg-muted/30 rounded-lg p-6 mt-8">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">What Happens Next?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Our team will review your application within 2-3 business days
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Background check typically takes 3-5 business days
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        You'll receive an email once your profile is approved
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Once approved, you can start receiving bookings immediately
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleSubmit}
                disabled={!allDocsUploaded}
              >
                {allDocsUploaded ? (
                  <>
                    Submit for Review
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Required Documents First
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
