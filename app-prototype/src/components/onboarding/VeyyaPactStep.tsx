import { OnboardingData } from "@/app/providers/onboarding/page";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle2, Heart, Star, Clock, MessageCircle } from "lucide-react";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

export default function VeyyaPactStep({ data, updateData }: Props) {
  const pactPrinciples = [
    {
      icon: Star,
      title: "Excellence in Service",
      description: "I commit to providing high-quality services that meet or exceed customer expectations on every booking."
    },
    {
      icon: Shield,
      title: "Professionalism & Safety",
      description: "I will maintain professional conduct, respect customer privacy, and adhere to all safety protocols and guidelines."
    },
    {
      icon: Clock,
      title: "Reliability & Punctuality",
      description: "I will honor my commitments, arrive on time, and communicate proactively if any changes are needed."
    },
    {
      icon: MessageCircle,
      title: "Clear Communication",
      description: "I will respond promptly to customer inquiries and keep them informed throughout the service experience."
    },
    {
      icon: Heart,
      title: "Customer Satisfaction",
      description: "I will go the extra mile to ensure customers are satisfied and resolve any issues professionally and promptly."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">The Veyya Pact</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our commitment to excellence and trust. By joining Veyya, you agree to uphold
          these principles that make our platform a trusted marketplace for premium services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 mt-8">
        {pactPrinciples.map((principle, index) => {
          const Icon = principle.icon;
          return (
            <div key={index} className="border rounded-lg p-6 bg-card hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-6 mt-8">
        <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">What You Can Expect from Veyya</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">Guaranteed weekly payouts every Monday</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">24/7 dedicated provider support</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">Access to Veyya Academy training and certifications</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">Fair and transparent dispute resolution process</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">Marketing and promotional support to grow your business</span>
            </li>
          </ul>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptPact"
              checked={data.acceptedPact || false}
              onCheckedChange={(checked) =>
                updateData({ acceptedPact: checked as boolean })
              }
              className="mt-1"
            />
            <Label htmlFor="acceptPact" className="cursor-pointer text-sm leading-relaxed">
              <span className="font-semibold">I accept the Veyya Pact</span>
              <br />
              I understand and agree to uphold these principles as a Veyya provider.
              I commit to delivering excellent service and maintaining the trust our customers place in our platform.
              <span className="text-red-500">*</span>
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptTerms"
              checked={data.acceptedTerms || false}
              onCheckedChange={(checked) =>
                updateData({ acceptedTerms: checked as boolean })
              }
              className="mt-1"
            />
            <Label htmlFor="acceptTerms" className="cursor-pointer text-sm leading-relaxed">
              I have read and agree to the{" "}
              <a href="/terms" target="_blank" className="text-primary hover:underline">
                Terms of Service
              </a>
              ,{" "}
              <a href="/privacy" target="_blank" className="text-primary hover:underline">
                Privacy Policy
              </a>
              , and{" "}
              <a href="/provider-agreement" target="_blank" className="text-primary hover:underline">
                Provider Agreement
              </a>
              <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>

        <div className="bg-muted/50 border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            By submitting this application, you acknowledge that all information provided is accurate and complete.
            Veyya reserves the right to verify all information and may request additional documentation.
            Your application will be reviewed within 2-3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
