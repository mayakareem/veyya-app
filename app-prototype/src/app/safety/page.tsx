import Container from "@/components/layout/Container";
import { Shield, CheckCircle, Lock, UserCheck, AlertTriangle, Phone } from "lucide-react";

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Safety & Trust</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your safety and security are our top priorities
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border space-y-8">
          <section>
            <div className="flex items-start gap-4 mb-4">
              <UserCheck className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Verified Providers</h2>
                <p className="text-muted-foreground mb-3">
                  Every service provider on Veyya undergoes a rigorous vetting process:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Identity verification and background checks</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Professional certifications and skills assessment</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Reference checks and work history verification</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ongoing monitoring through customer reviews and ratings</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4 mb-4">
              <Lock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Secure Payments</h2>
                <p className="text-muted-foreground mb-3">
                  Your financial information is protected with industry-leading security:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>PCI-DSS compliant payment processing</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>256-bit SSL encryption for all transactions</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Funds held in escrow until service completion</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fraud detection and prevention systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Privacy Protection</h2>
                <p className="text-muted-foreground mb-3">
                  We take your privacy seriously and comply with all data protection regulations:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>GDPR and Thailand PDPA compliant</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Your data is never sold to third parties</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Minimal data sharing with service providers</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Secure data storage with encryption at rest</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Safety Tips</h2>
                <p className="text-muted-foreground mb-3">
                  Follow these guidelines to ensure a safe experience:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Always book through the Veyya platform</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Never share personal financial information with providers</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Check provider ratings and reviews before booking</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Report any safety concerns immediately to our team</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Emergency Support</h3>
                <p className="text-sm text-red-800 mb-3">
                  If you experience a safety issue during a service, contact our emergency support line immediately:
                </p>
                <p className="text-lg font-bold text-red-900">+66 123 456 789</p>
                <p className="text-xs text-red-700 mt-2">Available 24/7</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Quality Guarantee</h2>
            <p className="text-muted-foreground mb-4">
              We stand behind every service booked through Veyya. If you're not satisfied with your service, contact us within 24 hours and we'll work to make it right through rebooking, partial refunds, or other remedies.
            </p>
            <p className="text-sm text-muted-foreground">
              For more details, see our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
