import { OnboardingData } from "@/app/providers/onboarding/page";
import { CheckCircle2 } from "lucide-react";

type Props = {
  data: OnboardingData;
};

export default function ReviewStep({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Application</h2>
        <p className="text-muted-foreground">
          Please review all information before submitting. You can go back to make changes if needed.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Personal Information
        </h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{data.firstName} {data.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{data.dateOfBirth}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">
              {data.address}, {data.city}, {data.province} {data.postalCode}
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Business Information
        </h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Business Type</p>
              <p className="font-medium capitalize">{data.businessType}</p>
            </div>
            {data.businessType === "registered" && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="font-medium">{data.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registration Number</p>
                  <p className="font-medium">{data.businessRegistrationNumber}</p>
                </div>
              </>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Years of Experience</p>
              <p className="font-medium">{data.yearsOfExperience} years</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Professional Bio</p>
            <p className="font-medium">{data.bio}</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Services ({data.services.length})
        </h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {data.selectedCategories.map((cat) => (
                <span key={cat} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {data.services.map((service, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">฿{service.price}</p>
                    <p className="text-sm text-muted-foreground">{service.duration} mins</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banking */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Banking Information
        </h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Bank Name</p>
              <p className="font-medium">{data.bankName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Name</p>
              <p className="font-medium">{data.accountName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">{data.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Branch</p>
              <p className="font-medium">{data.branchName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Documents Uploaded
        </h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="space-y-2">
            {data.documents.nationalIdFile && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>National ID: {data.documents.nationalIdFile.name}</span>
              </div>
            )}
            {data.documents.businessRegistrationFile && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Business Registration: {data.documents.businessRegistrationFile.name}</span>
              </div>
            )}
            {data.documents.certificationsFile && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Certifications: {data.documents.certificationsFile.name}</span>
              </div>
            )}
            {data.documents.profilePhoto && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Profile Photo: {data.documents.profilePhoto.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">What Happens Next?</h4>
        <ul className="space-y-1 text-sm">
          <li>• Your application will be reviewed within 2-3 business days</li>
          <li>• We may contact you if additional information is needed</li>
          <li>• Once approved, you'll receive login credentials via email</li>
          <li>• You can then access your provider dashboard and start accepting bookings</li>
        </ul>
      </div>
    </div>
  );
}
