import { OnboardingData } from "@/app/providers/onboarding/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

export default function BusinessInfoStep({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Business Information</h2>
        <p className="text-muted-foreground">
          Tell us about your business and professional background
        </p>
      </div>

      <div className="space-y-4">
        <Label>Business Type <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={data.businessType}
          onValueChange={(value: "individual" | "registered") =>
            updateData({ businessType: value })
          }
        >
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual" className="cursor-pointer flex-1">
              <div>
                <p className="font-semibold">Individual/Sole Proprietor</p>
                <p className="text-sm text-muted-foreground">
                  Operating as an individual service provider
                </p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="registered" id="registered" />
            <Label htmlFor="registered" className="cursor-pointer flex-1">
              <div>
                <p className="font-semibold">Registered Business</p>
                <p className="text-sm text-muted-foreground">
                  Company, partnership, or registered entity
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.businessType === "registered" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="businessName">
              Registered Business Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              value={data.businessName}
              onChange={(e) => updateData({ businessName: e.target.value })}
              placeholder="Enter your business name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessRegistrationNumber">
                Business Registration Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessRegistrationNumber"
                value={data.businessRegistrationNumber}
                onChange={(e) =>
                  updateData({ businessRegistrationNumber: e.target.value })
                }
                placeholder="XXX-XXXX-XXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">
                Tax ID Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="taxId"
                value={data.taxId}
                onChange={(e) => updateData({ taxId: e.target.value })}
                placeholder="XXXXXXXXXXXXX"
              />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience">
          Years of Experience <span className="text-red-500">*</span>
        </Label>
        <Input
          id="yearsOfExperience"
          type="number"
          min="0"
          value={data.yearsOfExperience}
          onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
          placeholder="e.g., 5"
        />
        <p className="text-xs text-muted-foreground">
          How many years have you been providing professional services?
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          Professional Bio <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="Tell customers about your expertise, specializations, and what makes your services unique..."
          rows={6}
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">
          {data.bio.length}/500 characters
        </p>
      </div>
    </div>
  );
}
