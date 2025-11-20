import { OnboardingData } from "@/app/providers/onboarding/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

export default function DocumentUploadStep({ data, updateData }: Props) {
  const handleFileChange = (field: keyof OnboardingData["documents"], files: FileList | null) => {
    if (files && files.length > 0) {
      updateData({
        documents: {
          ...data.documents,
          [field]: files[0],
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Document Upload</h2>
        <p className="text-muted-foreground">
          Upload required documents for verification. All files must be clear and readable.
        </p>
      </div>

      <div className="space-y-6">
        {/* National ID */}
        <div className="space-y-2">
          <Label>
            National ID / Passport <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {data.documents.nationalIdFile ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <Upload className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {data.documents.nationalIdFile
                    ? data.documents.nationalIdFile.name
                    : "Upload your National ID or Passport"}
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, JPG, or PNG (Max 5MB)
                </p>
              </div>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("nationalIdFile", e.target.files)}
                className="hidden"
                id="nationalId"
              />
              <Label
                htmlFor="nationalId"
                className="cursor-pointer px-4 py-2 border rounded-md hover:bg-muted"
              >
                Choose File
              </Label>
            </div>
          </div>
        </div>

        {/* Business Registration (conditional) */}
        {data.businessType === "registered" && (
          <div className="space-y-2">
            <Label>
              Business Registration Document <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {data.documents.businessRegistrationFile ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {data.documents.businessRegistrationFile
                      ? data.documents.businessRegistrationFile.name
                      : "Upload your Business Registration"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, JPG, or PNG (Max 5MB)
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("businessRegistrationFile", e.target.files)}
                  className="hidden"
                  id="businessReg"
                />
                <Label
                  htmlFor="businessReg"
                  className="cursor-pointer px-4 py-2 border rounded-md hover:bg-muted"
                >
                  Choose File
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Professional Certifications */}
        <div className="space-y-2">
          <Label>Professional Certifications/Licenses (Optional)</Label>
          <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {data.documents.certificationsFile ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <FileText className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {data.documents.certificationsFile
                    ? data.documents.certificationsFile.name
                    : "Upload any relevant certifications"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Beauty licenses, massage certificates, etc.
                </p>
              </div>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("certificationsFile", e.target.files)}
                className="hidden"
                id="certifications"
              />
              <Label
                htmlFor="certifications"
                className="cursor-pointer px-4 py-2 border rounded-md hover:bg-muted"
              >
                Choose File
              </Label>
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="space-y-2">
          <Label>
            Professional Profile Photo <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {data.documents.profilePhoto ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <Upload className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {data.documents.profilePhoto
                    ? data.documents.profilePhoto.name
                    : "Upload a clear professional photo"}
                </p>
                <p className="text-sm text-muted-foreground">
                  JPG or PNG (Max 2MB)
                </p>
              </div>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("profilePhoto", e.target.files)}
                className="hidden"
                id="profilePhoto"
              />
              <Label
                htmlFor="profilePhoto"
                className="cursor-pointer px-4 py-2 border rounded-md hover:bg-muted"
              >
                Choose File
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Requirements
        </h4>
        <ul className="space-y-1 text-sm">
          <li>• All documents must be valid and not expired</li>
          <li>• Photos must be clear with all text readable</li>
          <li>• Documents in Thai or English (translations may be required)</li>
          <li>• File size limit: 5MB per document</li>
        </ul>
      </div>
    </div>
  );
}
