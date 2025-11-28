import { OnboardingData } from "@/app/providers/onboarding/page";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Building2 } from "lucide-react";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

export default function BusinessTypeStep({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Let's Get Started</h2>
        <p className="text-muted-foreground">
          Are you applying as an individual or representing a business?
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 mt-8">
        <Label className="text-base">Select your business type (choose one) <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={data.businessType}
          onValueChange={(value: "individual" | "registered") =>
            updateData({ businessType: value })
          }
          className="grid gap-4"
        >
          <div className="relative">
            <RadioGroupItem
              value="individual"
              id="individual"
              className="peer sr-only"
            />
            <Label
              htmlFor="individual"
              className="flex items-start gap-4 border-2 p-6 rounded-lg cursor-pointer transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg mb-1">Individual / Sole Proprietor</p>
                <p className="text-sm text-muted-foreground">
                  I'm an independent service provider operating on my own.
                  I don't have a registered business entity.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <li>• Simpler application process</li>
                  <li>• Personal identification required</li>
                  <li>• Ideal for freelancers and solo professionals</li>
                </ul>
              </div>
            </Label>
          </div>

          <div className="relative">
            <RadioGroupItem
              value="registered"
              id="registered"
              className="peer sr-only"
            />
            <Label
              htmlFor="registered"
              className="flex items-start gap-4 border-2 p-6 rounded-lg cursor-pointer transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg mb-1">Registered Business</p>
                <p className="text-sm text-muted-foreground">
                  I represent a legally registered company, partnership, or business entity.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <li>• Business documentation required</li>
                  <li>• Company registration and tax details needed</li>
                  <li>• Ideal for established businesses and agencies</li>
                </ul>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-muted/50 border rounded-lg p-4 mt-6 max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> You can change your business type later if your circumstances change.
          All information is kept confidential and secure in compliance with Thailand's PDPA.
        </p>
      </div>
    </div>
  );
}
